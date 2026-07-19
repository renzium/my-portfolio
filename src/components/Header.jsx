import React, { useState } from "react";
import styled from 'styled-components'
import { Navigation } from "@styled-icons/fluentui-system-filled/Navigation";
import Nav from './Nav'
import Sidebar from "./Header/Sidebar";



function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Nav onClick={ toggle } />
      <Sidebar click={ toggle } isOpen={ isOpen }/>
      
    </>
  )
}

export default Header
