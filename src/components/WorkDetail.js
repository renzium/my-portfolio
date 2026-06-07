// src/components/WorkDetail.js
import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import * as assets from "../assets";
import text from "../text.json";

const Wrapper = styled.div`
  background-color: white;
  padding: 0.7rem 1.25rem 1.375rem;
  border-radius: 0.25rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 1.875rem;
  }
  p {
    font-weight: 400;
    line-height: 1.5rem;
    margin: 0.75rem 0 1.25rem;

    & > span {
      display: inline-block;
    }
    span + span {
      margin-left: 3rem;
    }
  }

  .image-gallery {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  img {
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  p > span:first-child {
    font-weight: 400;
    background: var(--primary, #667eea);
    color: white;
    height: 1.5625rem;
    padding: 0.2rem 0.75rem;
    border-radius: 0.75rem;
  }
  p > span:last-child {
    color: var(--light, #718096);
  }
  @media (min-width: 37.5rem) {
    padding: 4rem 2rem;
    h2 {
      font-size: 2.5rem;
      line-height: 1.2;
    }
    h2 + p, p + p {
      margin-top: 1.875rem;
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-4px);
  }
`;

function WorkDetail() {
  // Assuming your route sets up a path like "/works/:projectId"
  const { projectId } = useParams();

  // Find the specific project matching the URL or fallback to the first one
  const projectData = text.home.featured_works.find(work => work.image === projectId) || text.home.featured_works[0];

  const getImage = (imageName) => {
    const imageMap = {
      'sqe-app': assets.sqeApp,
      'paka-app': assets.pakaApp,
      'invoice-validator': assets.invoiceValidator,
      'swiftbranding': assets.swiftbranding,
      'digifigs': assets.digifigs
    };
    return imageMap[imageName] || assets.digifigs;
  };

  const getAllImages = (imageName) => {
    const imageMap = {
      'sqe-app': assets.sqeScreenshots || [assets.sqeApp],
      'paka-app': assets.pakaScreenshots || [assets.pakaApp],
      'invoice-validator': [assets.invoiceValidator],
      'swiftbranding': [assets.swiftbranding],
      'digifigs': [assets.digifigs]
    };
    return imageMap[imageName] || [getImage(imageName)];
  };

  if (!projectData) return <Wrapper><p>Project not found.</p></Wrapper>;

  const screenshots = getAllImages(projectData.image);

  return (
    <Wrapper>
      <BackLink to="/works">← Back to Projects</BackLink>
      <h2>{projectData.title}</h2>
      <p>
        <span>{projectData.year}</span>
        <span>{projectData.topic}</span>
      </p>
      <p>{projectData.text}</p>
      
      <div className="image-gallery">
        {screenshots.map((imgUrl, idx) => (
          <img key={idx} src={imgUrl} alt={`${projectData.title} screenshot ${idx + 1}`} />
        ))}
      </div>
    </Wrapper>
  );
}

export default WorkDetail;