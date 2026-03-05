import React from "react";
import styled from "styled-components";
import { Facebook } from "@styled-icons/entypo-social/Facebook";
import { Instagram } from "@styled-icons/fa-brands/Instagram";
import { Twitter } from "@styled-icons/fa-brands/Twitter";
import { Linkedin } from "@styled-icons/bootstrap/Linkedin";
import { Github } from "@styled-icons/bootstrap/Github";
import text from "../text.json";

const { social } = text.footer;

const FooterStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  div {
    display: flex;
    gap: 2rem;
  }

  div > a {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px) scale(1.1);
    }
  }

  p {
    margin-top: 2rem;
    font-size: 0.875rem;
    opacity: 0.9;
  }

  svg {
    height: 100%;
    width: 100%;
    padding: 0.5rem;
  }
`;

function Footer() {
  return (
    <FooterStyle>
      <div>
        {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer"><Github /></a>}
        {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /></a>}
        {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer"><Twitter /></a>}
        {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer"><Instagram /></a>}
        {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer"><Facebook /></a>}
      </div>
      <p>Copyright ©{new Date().getFullYear()} All rights reserved</p>
    </FooterStyle>
  );
}

export default Footer;
