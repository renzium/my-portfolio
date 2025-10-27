import React from 'react'
import styled from 'styled-components'
import * as assests from "../assets";
import FeaturedWorksCard from './Home/FeaturedWorksCard'
import text from "../text.json"

const Wrapper = styled.div`
  padding: 4rem 1.5rem;
  background: white;
  position: relative;

  @media (min-width: 37.5rem) {
    padding: 6rem 2.25rem;
  }

  @media (min-width: 56.25rem) {
    padding: 8rem 6.25rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--dark);
    text-align: center;
    
    @media (min-width: 37.5rem) {
      font-size: 3rem;
      margin-bottom: 3rem;
    }
  }

  .subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: var(--light);
    margin-bottom: 4rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .works-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;

function Works() {
  const getImage = (imageName) => {
    // Map image names to actual image exports
    const imageMap = {
      'sqe-app': assests.sqeApp,
      'paka-app': assests.pakaApp,
      'invoice-validator': assests.invoiceValidator,
      'swiftbranding': assests.swiftbranding,
      'digifigs': assests.digifigs
    };
    return imageMap[imageName] || assests.digifigs;
  };

  const getAllImages = (imageName) => {
    // Return all screenshots for each app
    const imageMap = {
      'sqe-app': assests.sqeScreenshots || [assests.sqeApp],
      'paka-app': assests.pakaScreenshots || [assests.pakaApp],
      'invoice-validator': [assests.invoiceValidator],
      'swiftbranding': [assests.swiftbranding],
      'digifigs': [assests.digifigs]
    };
    return imageMap[imageName] || [getImage(imageName)];
  };

  return (
    <Wrapper>
      <h1>My Projects</h1>
      <p className="subtitle">
        A collection of my recent work showcasing skills in React Native, web development, and AI integration.
      </p>
      <div className="works-container">
        {text.home.featured_works.map((item, index) => (
          <FeaturedWorksCard
            key={item.title + item.year}
            url={item.url}
            image={getImage(item.image)}
            images={getAllImages(item.image)}
            title={item.title}
            year={item.year}
            topic={item.topic}
            text={item.text.substring(0,250) + "..."}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default Works
