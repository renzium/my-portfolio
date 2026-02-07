import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const SortButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#667eea' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#5568d3' : '#e0e0e0'};
    transform: translateY(-2px);
  }
`;

const CVGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const CVCard = styled(Link)`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    border-color: #667eea;
  }
`;

const CVTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #667eea;
`;

const CVMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #555;
`;

const CVList = () => {
  const [cvs, setCvs] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Import all JSON files from cv_jsons directory
    const importAll = (r) => {
      return r.keys().map((key) => ({
        ...r(key),
        fileName: key.replace('./', '').replace('.json', '')
      }));
    };

    try {
      const cvFiles = importAll(require.context('../cv_jsons', false, /\.json$/));
      setCvs(cvFiles);
    } catch (error) {
      console.error('Error loading CV files:', error);
    }
  }, []);

  const getMainSkills = (technicalSkills) => {
    if (!technicalSkills || technicalSkills.length === 0) return [];
    
    // Get first 3 skill categories
    return technicalSkills.slice(0, 3).map(skill => skill.category);
  };

  const sortCVs = (cvsArray) => {
    const sorted = [...cvsArray];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return sorted.sort((a, b) => {
          const dateA = a.experience?.[0]?.startDate || '';
          const dateB = b.experience?.[0]?.startDate || '';
          return dateB.localeCompare(dateA);
        });
      case 'skills':
        return sorted.sort((a, b) => {
          const skillsA = a.technicalSkills?.length || 0;
          const skillsB = b.technicalSkills?.length || 0;
          return skillsB - skillsA;
        });
      default:
        return sorted;
    }
  };

  const sortedCVs = sortCVs(cvs);

  return (
    <Container>
      <Title>CV Manager</Title>
      <Subtitle>Manage and view all your CVs in one place</Subtitle>
      
      <Controls>
        <SortButton 
          active={sortBy === 'name'} 
          onClick={() => setSortBy('name')}
        >
          Sort by Name
        </SortButton>
        <SortButton 
          active={sortBy === 'date'} 
          onClick={() => setSortBy('date')}
        >
          Sort by Date
        </SortButton>
        <SortButton 
          active={sortBy === 'skills'} 
          onClick={() => setSortBy('skills')}
        >
          Sort by Skills
        </SortButton>
      </Controls>

      <CVGrid>
        {sortedCVs.map((cv) => (
          <CVCard key={cv.id} to={`/cvs/${cv.id}`}>
            <CVTitle>{cv.name}</CVTitle>
            <CVMeta>
              <strong>{cv.personalInfo?.fullName}</strong>
            </CVMeta>
            <CVMeta>
              {cv.experience?.[0]?.company} • {cv.experience?.[0]?.startDate}
            </CVMeta>
            <SkillTags>
              {getMainSkills(cv.technicalSkills).map((skill, index) => (
                <Tag key={index}>{skill}</Tag>
              ))}
            </SkillTags>
          </CVCard>
        ))}
      </CVGrid>

      {cvs.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No CVs found. Add JSON files to src/cv_jsons/ directory.
        </p>
      )}
    </Container>
  );
};

export default CVList;