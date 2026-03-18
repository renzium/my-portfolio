import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 210mm;
  margin: 20px auto;
  padding: 1.5cm;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  
  @media print {
    margin: 0;
    padding: 1.5cm;
    box-shadow: none;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5568d3;
  }

  @media print {
    display: none;
  }
`;

const PrintButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  z-index: 1000;
  
  &:hover {
    background: #764ba2;
  }

  @media print {
    display: none;
  }
`;

const CVViewer = () => {
  const { cvId } = useParams();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const cv = await import(`../cv_jsons/${cvId}.json`);
        setCvData(cv.default || cv);
        setLoading(false);
      } catch (error) {
        console.error('Error loading CV:', error);
        setLoading(false);
      }
    };

    loadCV();
  }, [cvId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Container>
        <BackButton to="/cvs">← Back to CV List</BackButton>
        <p>Loading CV...</p>
      </Container>
    );
  }

  if (!cvData) {
    return (
      <Container>
        <BackButton to="/cvs">← Back to CV List</BackButton>
        <p>CV not found.</p>
      </Container>
    );
  }

  return (
    <>
      <BackButton to="/cvs">← Back to CV List</BackButton>
      <PrintButton onClick={handlePrint}>🖨️ Print to PDF</PrintButton>
      
      <Container>
        <style>{`
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none; }
            @page { margin: 1.5cm; size: A4; }
          }

          h1 {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 3pt;
            text-align: center;
          }

          h2 {
            font-size: 11pt;
            font-weight: bold;
            margin-top: 8pt;
            margin-bottom: 4pt;
            border-bottom: 1pt solid #000;
            padding-bottom: 1pt;
          }

          .contact {
            font-size: 8pt;
            text-align: center;
            margin-bottom: 6pt;
            line-height: 1.3;
          }

          .summary {
            font-size: 9pt;
            margin-bottom: 6pt;
            text-align: justify;
          }

          .job {
            margin-bottom: 6pt;
          }

          .job-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2pt;
          }

          .job-title {
            font-weight: bold;
            font-size: 10pt;
          }

          .company {
            font-size: 9pt;
          }

          .date {
            font-size: 9pt;
            white-space: nowrap;
          }

          ul {
            margin-left: 15pt;
            margin-bottom: 4pt;
            padding-left: 10pt;
            font-size: 9pt;
          }

          li {
            margin-bottom: 1.5pt;
            text-align: justify;
          }

          .skills {
            columns: 3;
            column-gap: 15pt;
            font-size: 9pt;
            margin-bottom: 6pt;
          }

          .skills > div {
            margin-bottom: 2pt;
          }

          p {
            margin-bottom: 3pt;
            font-size: 9pt;
          }
        `}</style>

        <h1>{cvData.personalInfo.fullName.toUpperCase()}</h1>
        
        <div className="contact">
          {cvData.personalInfo.location} | {cvData.personalInfo.phone} |  {cvData.personalInfo.email} | {cvData.personalInfo.website} | {cvData.personalInfo.linkedin} | {cvData.personalInfo.github}
        </div>

        <div className="summary">
          <strong>{cvData.name}</strong> - {cvData.summary}
        </div>

        <h2>TECHNICAL SKILLS</h2>
        <div className="skills">
          {cvData.technicalSkills.map((skill, index) => (
            <div key={index}>
              <strong>{skill.category}:</strong> {skill.skills}
            </div>
          ))}
        </div>

        <h2>PROFESSIONAL EXPERIENCE</h2>
        {cvData.experience.map((job, index) => (
          <div className="job" key={index}>
            <div className="job-header">
              <div>
                <div className="job-title">{job.title}</div>
                <div className="company">
                  {job.company}{job.website && ` • ${job.website}`}
                </div>
              </div>
              <div className="date">
                {job.startDate} — {job.endDate}{job.location && ` • ${job.location}`}
              </div>
            </div>
            {job.description && <p>{job.description}</p>}
            {job.achievements && job.achievements.length > 0 && (
              <ul>
                {job.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {cvData.projects && cvData.projects.length > 0 && (
          <>
            <h2>KEY PROJECTS</h2>
            {cvData.projects.map((project, index) => (
              <p key={index}>
                <strong>{project.name}</strong>{project.year && ` (${project.year})`} — {project.description}
              </p>
            ))}
          </>
        )}

        <h2>EDUCATION</h2>
        {cvData.education.map((edu, index) => (
          <div className="job-header" key={index}>
            <div>
              <div className="job-title">{edu.degree}</div>
              <div className="company">{edu.institution}</div>
            </div>
            <div className="date">{edu.startYear} — {edu.endYear}</div>
          </div>
        ))}

        <div style={{ textAlign: 'center', fontSize: '8pt', marginTop: '6pt', color: '#666' }}>
          Portfolio: {cvData.personalInfo.website} | LinkedIn: {cvData.personalInfo.linkedin} | GitHub: {cvData.personalInfo.github}
        </div>
      </Container>
    </>
  );
};

export default CVViewer;