import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import text from "../../text.json";

// Geometric wireframe animation for the picture placeholder box
const pulseGlow = keyframes`
  0%, 100% { border-color: rgba(99, 102, 241, 0.2); box-shadow: 0 0 0px rgba(99, 102, 241, 0); }
  50% { border-color: rgba(99, 102, 241, 0.6); box-shadow: 0 0 20px rgba(99, 102, 241, 0.15); }
`;

const SectionContainer = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1.5rem;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const WireframeBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 320px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 1.5rem;
  background-color: #141416;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulseGlow} 4s infinite ease-in-out;

  &::before {
    content: "IMAGE_ANIMATION_ZONE";
    font-family: monospace;
    font-size: 0.75rem;
    color: #52525b;
    letter-spacing: 0.1em;
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #18181b;
  @media (min-width: 768px) {
    grid-template-columns: 240px 1fr;
  }
`;

function Home() {
  const hero = text.home.section1;
  const techStack = text.home.tech_stack;

  return (
    <>
      {/* HERO SECTION */}
      <SectionContainer>
        <HeroGrid>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontExtrabold: 800, trackingTight: '-0.03em', margin: 0, color: '#f4f4f5' }}>
              {hero.heading}
            </h1>
            <h2 style={{ fontSize: '1.5rem', color: '#6366f1', fontWeight: 600, margin: 0 }}>
              {hero.subtitle}
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#e4e4e7', margin: 0, lineHeight: 1.5 }}>
              {hero.description}
            </p>
            <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.6 }}>
              {hero.text}
            </p>
            <div style={{ paddingTop: '1rem' }}>
              <Link to="/contact" style={{ display: 'inline-block', backgroundColor: '#f4f4f5', color: '#09090b', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600 }}>
                Let's Work Together
              </Link>
            </div>
          </div>
          {/* Elegant wireframe bounding box placeholder for your future pixel canvas */}
          <WireframeBox />
        </HeroGrid>
      </SectionContainer>

      {/* TECH STACK SECTION */}
      <div style={{ backgroundColor: '#141416', borderTop: '1px solid #18181b', borderBottom: '1px solid #18181b' }}>
        <SectionContainer>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f4f4f5', margin: '0 0 0.5rem' }}>{techStack.title}</h2>
            <p style={{ color: '#a1a1aa', margin: 0 }}>{techStack.subtitle}</p>
          </div>
          <TechGrid>
            {techStack.categories.map((cat, i) => (
              <div key={i} style={{ background: '#09090b', padding: '2rem', borderRadius: '1rem', border: '1px solid #18181b' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#6366f1', margin: '0 0 1.25rem' }}>{cat.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.technologies.map((tech, idx) => (
                    <span key={idx} style={{ background: '#18181b', color: '#e4e4e7', fontSize: '0.85rem', padding: '0.35rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #27272a' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </TechGrid>
        </SectionContainer>
      </div>

      {/* FEATURED WORKS SECTION */}
      <SectionContainer>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '2rem' }}>Featured Work</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {text.home.featured_works.map((work, idx) => (
            <ProjectCard key={idx}>
              <div style={{ background: '#141416', aspectRatio: '16/10', borderRadius: '0.75rem', border: '1px solid #18181b', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#52525b', fontSize: '0.8rem', fontFamily: 'monospace', justifyContent: 'center' }}>
                [{work.image.toUpperCase()}]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                    {work.url !== "#" ? <a href={work.url} target="_blank" rel="noreferrer" style={{ color: '#f4f4f5' }}>{work.title}</a> : work.title}
                  </h3>
                  <span style={{ background: '#27272a', color: '#f4f4f5', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>{work.year}</span>
                </div>
                <div style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 500 }}>{work.topic}</div>
                <p style={{ color: '#a1a1aa', margin: '0.5rem 0 0', lineHeight: 1.6, fontSize: '0.95rem' }}>{work.text}</p>
              </div>
            </ProjectCard>
          ))}
        </div>
      </SectionContainer>

      {/* RECENT POSTS SECTION */}
      <div style={{ backgroundColor: '#141416', borderTop: '1px solid #18181b' }}>
        <SectionContainer>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '2rem' }}>Recent Publications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', width: '100%' }}>
            {text.home.recent_posts.map((post, idx) => (
              <div key={idx} style={{ background: '#09090b', padding: '2rem', borderRadius: '1rem', border: '1px solid #18181b' }}>
                <div style={{ display: 'flex', gap: '1rem', color: '#71717a', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span style={{ color: '#6366f1', fontWeight: 500 }}>{post.topic}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#f4f4f5', margin: '0 0 0.75rem' }}>{post.title}</h3>
                <p style={{ color: '#a1a1aa', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>{post.text}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>
    </>
  );
}

export default Home;