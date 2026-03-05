import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "@styled-icons/fluentui-system-filled/Navigation";
import text from "../../text.json";

const navLinks = text.header.nav;
console.log(navLinks)

const NavStyle = styled.div`
  position: sticky;
  padding: 1.25rem 0;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .nav-btn {
    display: block;
    width: 1.7rem;
    margin-left: auto;
    margin-right: 1.125rem;
    color: var(--dark);
  }
  .nav-link {
    display: none;
  }
  .logo {
    flex-grow: 1;
    margin-left: 1.125rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 37.5rem) {
    padding: 1.5rem 0;
    .active {
      color: var(--primary);
    }
    .nav-link,
    .logo {
      display: block;
      transition: all 0.3s ease;
      font-size: 1.2rem;
      font-weight: 600;

      &:hover {
        color: var(--primary);
        transform: translateY(-2px);
      }
    }
    .logo {
      flex-grow: 1;
      margin-left: 3.75rem;
    }
    & > a + a {
      margin-left: 2rem;
    }
    .nav-link:last-of-type {
      margin-right: 3.75rem;
    }
    .nav-btn {
      display: none;
    }
  }

  @media (min-width: 50rem) {
    .nav-link,
    .logo {
      font-size: 1.875rem;
    }
  }
`;

const Nav = ({ onClick }) => {
  return (
    <NavStyle>
      {navLinks.map((link, index) =>
        index === 0 ? (
          <NavLink key={link.path} to={link.path} className="logo">
            {link.label}
          </NavLink>
        ) : (
          <NavLink key={link.path} to={link.path} className="nav-link">
            {link.label}
          </NavLink>
        )
      )}
      <Navigation onClick={onClick} className="nav-btn" />
    </NavStyle>
  );
};

export default Nav;
