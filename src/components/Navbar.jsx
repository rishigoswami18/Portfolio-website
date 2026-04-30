import React, { useState } from 'react';
import styled from "styled-components";
import {Link as LinkR} from "react-router-dom";
import {Bio} from "../data/constants";
import {MenuRounded} from "@mui/icons-material";
import { useTheme } from "styled-components";


const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  padding: 0 6px;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  z-index: 101;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  z-index: 102;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  z-index: 101;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 24px 40px;
  background: ${({ theme }) => theme.bg + "F2"};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: 1000;
  backdrop-filter: blur(15px);
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ color: theme.primary }}>&lt;</span>
            Hrishi
            <span style={{ color: theme.primary }}>/&gt;</span>
          </div>
        </NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </NavItems>
        
        <MobileMenu isOpen={isOpen}>
          <NavLink onClick={() => setIsOpen(!isOpen)} href="#about">About</NavLink>
          <NavLink onClick={() => setIsOpen(!isOpen)} href="#skills">Skills</NavLink>
          <NavLink onClick={() => setIsOpen(!isOpen)} href="#experience">Experience</NavLink>
          <NavLink onClick={() => setIsOpen(!isOpen)} href="#projects">Projects</NavLink>
          <NavLink onClick={() => setIsOpen(!isOpen)} href="#education">Education</NavLink>
          <GithubButton
            href={Bio.github}
            target="_blank"
            style={{
              background: theme.primary,
              color: theme.white,
              width: "100%",
              maxWidth: "200px"
            }}
          >
            Github Profile
          </GithubButton>
        </MobileMenu>

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank">
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};




export default Navbar;