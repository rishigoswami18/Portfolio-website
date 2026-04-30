import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 52px;
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 700px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 600;
  margin: 32px 0;
  padding: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary + '11'};
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
  }
  
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary};
    color: ${theme.white};
    box-shadow: 0 4px 12px ${theme.primary + '4D'};
    &:hover {
      background: ${theme.primary};
      filter: brightness(1.1);
    }
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary + '33'};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton
            active={toggle === "all"}
            onClick={() => setToggle("all")}
          >
            All
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web app"}
            onClick={() => setToggle("web app")}
          >
            Web Apps
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "android app"}
            onClick={() => setToggle("android app")}
          >
            Android Apps
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "machine learning"}
            onClick={() => setToggle("machine learning")}
          >
            Machine Learning
          </ToggleButton>
        </ToggleButtonGroup>

        <CardContainer>
          {toggle === "all" &&
            projects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
