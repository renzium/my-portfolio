import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { me } from "../../assets";
import HomeStyle from "./HomeStyle";
import text from "../../text.json"

const Section1Style = styled(HomeStyle)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>');
    opacity: 0.1;
  }

  @media (min-width: 37.5rem) {
    padding: 6rem 2.25rem;
  }

  @media (min-width: 56.25rem) {
    padding: 8rem 6.25rem;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  img {
    display: block;
    height: 10rem;
    width: 10rem;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;

    @media (min-width: 37.5rem) {
      height: 12rem;
      width: 12rem;
      margin-bottom: 2rem;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  text-align: center;
  color: white;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    line-height: 1.3;
    word-wrap: break-word;
    hyphens: none;

    @media (min-width: 37.5rem) {
      font-size: 3rem;
      margin-top: 2rem;
    }

    @media (min-width: 56.25rem) {
      font-size: 3.5rem;
    }

    @media (min-width: 75rem) {
      font-size: 4rem;
    }
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 1.25rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    @media (min-width: 37.5rem) {
      font-size: 1.875rem;
    }

    @media (min-width: 56.25rem) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.95;

    @media (min-width: 37.5rem) {
      font-size: 1.125rem;
    }

    @media (min-width: 56.25rem) {
      font-size: 1.25rem;
    }
  }

  button {
    background: white;
    color: #667eea;
    font-weight: 600;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.125rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 2;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      background: #f8f9fa;
    }
  }
  
  a {
    text-decoration: none;
    display: inline-block;
  }
`;

function Section1() {
  const heading = text.home.section1.heading;
  const subtitle = text.home.section1.subtitle;
  
  return (
    <Section1Style>
      <div className="hero-content">
        <img src={me} alt="Lawrence" />
        <h1>{heading}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        <p>{text.home.section1.text}</p>

        <a href="/cv.html" target="_blank" rel="noopener noreferrer">
          <button>Download Resume</button>
        </a>
      </div>
    </Section1Style>
  );
}

export default Section1;
