import React from "react";
import styled from "styled-components";
import HomeStyle from "./HomeStyle";
import ImageGallery from "./ImageGallery";

const FeaturedStyle = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }

  @media (min-width: 37.5rem) {
    display: grid;
    grid-template-columns: ${props => props.hasImage ? '200px 1fr' : '1fr'};
    gap: 2rem;
  }

  h2 {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.3;
    margin-bottom: 1rem;
    color: var(--dark);
    
    @media (min-width: 37.5rem) {
      font-size: 1.875rem;
    }
  }

  p {
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #4a5568;
  }


  .image-container {
    @media (min-width: 37.5rem) {
      display: flex;
      flex-direction: column;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1rem 0;
  }

  .tag {
    padding: 0.375rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .year-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #fff;
    border: 2px solid var(--primary);
    border-radius: 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 0.75rem;
  }
`;

function FeaturedWorksCard({ image, title, year, topic, text, url, images }) {
  // Don't show image for backend projects
  const shouldShowImage = !title.toLowerCase().includes('validator') && !title.toLowerCase().includes('invoice');

  return (
    <FeaturedStyle hasImage={shouldShowImage}>
      <div className="image-container">
        {shouldShowImage && images && images.length > 0 ? (
          <ImageGallery images={images} />
        ) : shouldShowImage && image ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} alt={title} />
          </a>
        ) : null}
      </div>
      <div>
        <span className="year-badge">{year}</span>
        <h2>{title}</h2>
        <div className="tags">
          <span className="tag">{topic}</span>
        </div>
        <p>{text}</p>
      </div>
    </FeaturedStyle>
  );
}

export default FeaturedWorksCard;
