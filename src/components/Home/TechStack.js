import React from 'react';
import styled from 'styled-components';
import text from "../../text.json";

const TechStackContainer = styled.section`
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;

  @media (min-width: 37.5rem) {
    padding: 6rem 2.25rem;
  }

  @media (min-width: 56.25rem) {
    padding: 8rem 6.25rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 100, 100, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 168, 204, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
    
    @media (min-width: 37.5rem) {
      font-size: 2.5rem;
    }
    
    @media (min-width: 56.25rem) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: var(--light);
    font-weight: 500;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (min-width: 37.5rem) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (min-width: 75rem) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 4px;
      height: 20px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: 2px;
    }
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%);
  border: 1px solid #e0e4e9;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--dark);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

function TechStack() {
  const { tech_stack } = text.home;

  return (
    <TechStackContainer>
      <TitleWrapper>
        <h2>{tech_stack.title}</h2>
        <p>{tech_stack.subtitle}</p>
      </TitleWrapper>

      <CategoriesGrid>
        {tech_stack.categories.map((category, index) => (
          <CategoryCard key={index}>
            <h3>{category.name}</h3>
            <TechList>
              {category.technologies.map((tech, techIndex) => (
                <TechBadge key={techIndex}>{tech}</TechBadge>
              ))}
            </TechList>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </TechStackContainer>
  );
}

export default TechStack;

