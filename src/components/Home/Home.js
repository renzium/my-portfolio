import React from 'react'
import styled from "styled-components"
import FeaturedWorks from './FeaturedWorks'
import RecentPost from './RecentPost'
import Section1 from "./Section1"
import TechStack from './TechStack'
import Footer from '../Footer';

const HomeStyle = styled.div`
  hr {
    color: var(--light3);
    margin: 0 3.75rem;
    @media (min-width: 37.5rem) {
      margin: 0 2.25rem;
    }
    @media (min-width: 56.25rem) {
      padding: 0 6.25rem;
    }

    @media (min-width: 50rem) {
      padding: 0 4.25rem;
    }
    @media (min-width: 56.25rem){
      padding: 0 6.25rem;
    }
    @media (min-width: 62.5rem) {
      padding: 0 9.25rem;
    }

  }
`;


function Home() {
  return (
    <>
      <Section1 />
      <TechStack />
      <FeaturedWorks/>
      <RecentPost />
    </>
  );
}

export default Home
