import React from "react";
import styled from "styled-components";
import { Facebook } from "@styled-icons/entypo-social/Facebook";
import { Instagram } from "@styled-icons/fa-brands/Instagram";
import { Twitter } from "@styled-icons/fa-brands/Twitter";
import { Linkedin } from "@styled-icons/bootstrap/Linkedin";
import {Github} from "@styled-icons/bootstrap/Github";
import { NavLink } from "react-router-dom";
const FooterStyle = styled.div`
  
  display: flex;
  width:100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 9.375rem; */
  margin-top: atuo;
  margin-bottom:0;
  

  height: 11.375rem;
div{
  display:flex;
}
  div > a {
    display:block;
    width: 1.875rem;
    height: 1.875rem;
  }
  div > a + a {
    margin-left: 2.25rem;
  }
  p {
    margin-top: 2rem;
    font-size: 0.875rem;
  }
  svg{
    height:100%;
    width: 100%;
  }
`;
function Footer() {
  return (
    <FooterStyle>
      <div>
        <a href="https://github.com/bykelaw">
          <Github />
        </a>
        <a href="https://www.linkedin.com/in/lawrence-ughonu">
          <Linkedin />
        </a>
        <a href="https://twitter.com/mr_chiblaw">
          <Twitter />
        </a>
        <a href="https://www.instagram.com/ughonulawrence">
          <Instagram />
        </a>
        <a href="https://web.facebook.com/lawrence.chibikem">
          <Facebook />
        </a>
      </div>
      <p>Copyright ©2021 All rights reserved </p>
    </FooterStyle>
  );
}

export default Footer;
