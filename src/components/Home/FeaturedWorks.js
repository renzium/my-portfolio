import React from 'react'
import styled from 'styled-components'
import * as assests from "../../assets";
import FeaturedWorksCard from "./FeaturedWorksCard";
import HomeStyle from './HomeStyle';
import text from "../../text.json"

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

  h5 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--dark);
    
    @media (min-width: 37.5rem) {
      font-size: 2rem;
    }
  }

  .works-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;

function FeaturedWorks() {
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

export default FeaturedWorks
