import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";
import Tilt from 'react-parallax-tilt';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0;
  overflow: hidden;
`;

const GlowBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, ${({ theme }) => theme.primary + '1A'} 0%, rgba(0,0,0,0) 70%);
  z-index: -1;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 16px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 52px;
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  background: linear-gradient(225deg, #854CE6 0%, #B923E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  opacity: 0.85;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 32px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(17, 25, 40, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 30px 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary + '80'};
    box-shadow: 0 20px 40px -15px ${({ theme }) => theme.primary + '4D'};
    transform: translateY(-8px) scale(1.01);
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 22px 28px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 20px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary + '33'};
  padding-bottom: 12px;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 10px;
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + 'D9'};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.primary + '1A'};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
    box-shadow: 0 8px 15px ${({ theme }) => theme.primary + '26'};
    color: ${({ theme }) => theme.text_primary};
    
    ${SkillImage} {
      transform: scale(1.15);
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const Skills = () => {
  return (
    <Container id="skills">
      <GlowBg />
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working on for the
          past 3 years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <Tilt key={`skill-tilt-${index}`}>
              <Skill>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillList>
                  {skill.skills.map((item, index_x) => (
                    <SkillItem key={`skill-item-${index_x}`}>
                      <SkillImage src={item.image} alt={item.name} />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            </Tilt>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};


export default Skills;
