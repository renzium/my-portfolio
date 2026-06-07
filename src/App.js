import React, { useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "@styled-icons/fluentui-system-filled/Navigation";
import { Github } from "@styled-icons/bootstrap/Github";
import { Linkedin } from "@styled-icons/bootstrap/Linkedin";
import { Twitter } from "@styled-icons/bootstrap/Twitter";
import { Instagram } from "@styled-icons/fa-brands/Instagram";
import { Facebook } from "@styled-icons/entypo-social/Facebook";

// Pages
import Home from "./components/Home/Home";
import Works from "./components/Works";
import WorkDetail from "./components/WorkDetail";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import CVList from "./components/CVList";
import CVViewer from "./components/CVViewer";

import text from "./text.json";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #09090b; /* Pitch-black dark matrix background */
  color: #f4f4f5;
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NavStyle = styled.nav`
  position: sticky;
  top: 0;
  padding: 1.25rem 2rem;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #18181b;

  .logo {
    font-weight: 800;
    font-size: 1.35rem;
    letter-spacing: -0.05em;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-desktop {
    display: none;
    @media (min-width: 640px) {
      display: flex;
      gap: 2rem;
    }
  }

  .nav-link {
    font-size: 0.95rem;
    font-weight: 500;
    color: #a1a1aa;
    transition: color 0.2s;
    &:hover, &.active {
      color: #f4f4f5;
    }
  }

  .menu-btn {
    color: #f4f4f5;
    width: 1.75rem;
    cursor: pointer;
    @media (min-width: 640px) { display: none; }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #09090b;
  z-index: 90;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transform: ${props => props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const FooterStyle = styled.footer`
  padding: 4rem 2rem;
  background: #09090b;
  border-top: 1px solid #18181b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .socials {
    display: flex;
    gap: 1.5rem;
    a {
      color: #a1a1aa;
      transition: color 0.2s, transform 0.2s;
      svg { width: 1.35rem; height: 1.35rem; }
      &:hover { color: #6366f1; transform: translateY(-2px); }
    }
  }
  p { font-size: 0.85rem; color: #52525b; }
`;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCVRoute = location.pathname.startsWith('/cvs');
  const { social } = text.footer;

  // Explicit security scrubbing: filter out links containing "cv" from menus
  const publicLinks = text.header.nav.filter(link => !link.path.toLowerCase().includes('cv'));

  return (
    <AppContainer>
      {!isCVRoute && (
        <>
          <NavStyle>
            <NavLink to="/" className="logo">Lawrence.U</NavLink>
            <div className="nav-desktop">
              {publicLinks.map(link => (
                <NavLink key={link.path} to={link.path} className="nav-link">
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Navigation className="menu-btn" onClick={() => setIsOpen(!isOpen)} />
          </NavStyle>

          <MobileMenu isOpen={isOpen}>
            {publicLinks.map(link => (
              <NavLink key={link.path} to={link.path} className="text-3xl font-bold text-zinc-400" onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </MobileMenu>
        </>
      )}

      <MainContent>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/works" element={<Works />}/>
          <Route path="/works/detail" element={<WorkDetail />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/cvs" element={<CVList />}/>
          <Route path="/cvs/:cvId" element={<CVViewer />}/>
        </Routes>
      </MainContent>

      {!isCVRoute && (
        <FooterStyle>
          <div className="socials">
            {social.github && <a href={social.github} target="_blank" rel="noreferrer"><Github /></a>}
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer"><Linkedin /></a>}
            {social.twitter && <a href={social.twitter} target="_blank" rel="noreferrer"><Twitter /></a>}
            {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer"><Instagram /></a>}
            {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer"><Facebook /></a>}
          </div>
          <p>Copyright © {new Date().getFullYear()} Lawrence Ughonu. All rights reserved.</p>
        </FooterStyle>
      )}
    </AppContainer>
  );
}

export default App;