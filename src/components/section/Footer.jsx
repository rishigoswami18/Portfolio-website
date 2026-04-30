import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import {
  FacebookRounded,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";

const FooterContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h2`
  font-weight: 800;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 1px;
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  list-style: none;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    font-size: 14px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 24px;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
    color: white;
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Hrishi</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.facebook} target="_blank">
            <FacebookRounded />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="_blank">
            <Twitter />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="_blank">
            <LinkedIn />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="_blank">
            <Instagram />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>&copy; {new Date().getFullYear()} Hrishikesh Giri. All rights reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
