import styled from "styled-components";
import { NavLink } from "react-router-dom";
import text from "../text.json";

const sidebarLinks = text.header.sidebar;

const SidebarStyle = styled.div`
  padding: 3.125rem 1.125rem;
  font-size: 1.875rem;
  .active {
    color: var(--primary);
  }
  & > a {
    display: block;
    text-shadow: 0 0 1px var(--primary);
    transition: all 0.5s;
    font-size: 1.25rem;
    &:hover {
      text-shadow: 0 0 10px;
    }
  }

  a + a {
    margin-top: 1.5rem;
  }

  a {
    border-bottom: 1px solid var(--light);
    padding-bottom: 1.5rem;
  }

  a:first-child {
    padding-top: 1.875rem;
  }

  position: fixed;
  top: 0;
  bottom: 0;
  background-color: white;
  width: 100%;
  transform: ${(props) =>
    props.showSidebar ? "translateX(0)" : "translateX(-100%)"};
  transition: all 0.5s;
  z-index: 1;
  @media (min-width: 37.5rem) {
    display: none;
  }
`;

const Sidebar = ({ isOpen, click }) => (
  <>
    <SidebarStyle showSidebar={isOpen}>
      {sidebarLinks.map((link) => (
        <NavLink key={link.path} onClick={click} to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </SidebarStyle>
  </>
);

export default Sidebar;
