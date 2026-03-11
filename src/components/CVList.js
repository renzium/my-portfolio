import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CVList.css';

function CVList() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cvsPerPage = 10;

  useEffect(() => {
    const loadAllCVs = async () => {
      try {
        // Import all CV JSON files from the cv_jsons directory
        const cvContext = require.context('../cv_jsons', false, /\.json$/);
        const cvList = [];

        cvContext.keys().forEach((key) => {
          const cvData = cvContext(key);
          const fileName = key.replace('./', '').replace('.json', '');
          
          // Extract company and role from ID
          const { company, role } = extractCompanyAndRole(cvData.id || fileName);
          
          cvList.push({
            id: cvData.id || fileName,
            name: cvData.name || 'Untitled CV',
            company,
            role,
            skills: extractSkills(cvData),
            fileName
          });
        });

        // Sort by company name
        cvList.sort((a, b) => a.company.localeCompare(b.company));
        
        setCvs(cvList);
        setLoading(false);
      } catch (error) {
        console.error('Error loading CVs:', error);
        setLoading(false);
      }
    };

    loadAllCVs();
  }, []);

  // Extract company and role from ID like "cleo-senior-frontend-react-native"
  const extractCompanyAndRole = (id) => {
    if (!id) return { company: 'Unknown', role: 'Unknown' };
    
    // Split by hyphens
    const parts = id.split('-');
    
    // Common role keywords to help identify where role starts
    const roleKeywords = ['senior', 'junior', 'mid', 'lead', 'staff', 'principal', 
                         'frontend', 'backend', 'fullstack', 'full', 'software', 
                         'engineer', 'developer', 'architect', 'manager'];
    
    let roleStartIndex = -1;
    
    // Find where the role likely starts
    for (let i = 0; i < parts.length; i++) {
      if (roleKeywords.includes(parts[i].toLowerCase())) {
        roleStartIndex = i;
        break;
      }
    }
    
    if (roleStartIndex === -1) {
      // Couldn't find role keywords, assume first 1-2 words are company
      const company = parts.slice(0, Math.min(2, parts.length)).join(' ');
      const role = parts.slice(Math.min(2, parts.length)).join(' ');
      return {
        company: formatName(company),
        role: formatName(role) || 'Position'
      };
    }
    
    const company = parts.slice(0, roleStartIndex).join(' ');
    const role = parts.slice(roleStartIndex).join(' ');
    
    return {
      company: formatName(company) || 'Company',
      role: formatName(role) || 'Position'
    };
  };

  // Format name: capitalize first letter of each word
  const formatName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Extract skills from CV for search
  const extractSkills = (cvData) => {
    const skills = [];
    
    // Get skills from technicalSkills array
    if (cvData.technicalSkills && Array.isArray(cvData.technicalSkills)) {
      cvData.technicalSkills.forEach(skillGroup => {
        if (skillGroup.skills) {
          skills.push(skillGroup.skills.toLowerCase());
        }
      });
    }
    
    // Get from summary
    if (cvData.summary) {
      skills.push(cvData.summary.toLowerCase());
    }
    
    return skills.join(' ');
  };

  // Filter CVs based on search term
  const filteredCvs = cvs.filter(cv => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      cv.company.toLowerCase().includes(search) ||
      cv.role.toLowerCase().includes(search) ||
      cv.name.toLowerCase().includes(search) ||
      cv.skills.includes(search)
    );
  });

  // Pagination logic
  const indexOfLastCv = currentPage * cvsPerPage;
  const indexOfFirstCv = indexOfLastCv - cvsPerPage;
  const currentCvs = filteredCvs.slice(indexOfFirstCv, indexOfLastCv);
  const totalPages = Math.ceil(filteredCvs.length / cvsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading) {
    return <div className="cv-list-loading">Loading CVs...</div>;
  }

  return (
    <div className="cv-list-container">
      <div className="cv-list-header">
        <h1>My CV Collection</h1>
        <p className="cv-count">
          {filteredCvs.length} {filteredCvs.length === 1 ? 'CV' : 'CVs'} 
          {searchTerm && ` (filtered from ${cvs.length} total)`}
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
         <input
          type="text"
          placeholder="Search by company, role, or skills (e.g., 'React', 'Senior', 'Google')..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')} 
            className="clear-search"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* CV List */}
      {filteredCvs.length === 0 ? (
        <div className="no-results">
          <p>No CVs found matching "{searchTerm}"</p>
          <button onClick={() => setSearchTerm('')} className="reset-button">
            Clear Search
          </button>
        </div>
      ) : (
        <>
          <div className="cv-grid">
            {currentCvs.map((cv) => (
              <Link
                to={`/cvs/${cv.fileName}`}
                key={cv.id}
                className="cv-card"
              >
                <div className="cv-card-header">
                  <h2 className="company-name">{cv.company}</h2>
                  <span className="cv-badge">CV</span>
                </div>
                <h3 className="role-name">{cv.role}</h3>
                <p className="cv-description">{cv.name}</p>
                <div className="cv-card-footer">
                  <span className="view-link">View CV →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Previous
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next →
              </button>
            </div>
          )}

          <div className="pagination-info">
            Showing {indexOfFirstCv + 1}-{Math.min(indexOfLastCv, filteredCvs.length)} of {filteredCvs.length}
          </div>
        </>
      )}
    </div>
  );
}

export default CVList;