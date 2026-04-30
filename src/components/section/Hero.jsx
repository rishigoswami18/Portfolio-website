import React from 'react'
import styled from 'styled-components';
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/portfolio2.jpg";
import HeroBgAnimation from "../HeroBgAnimation";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 56px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  margin-bottom: 12px;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 48px;
  }

  @media (max-width: 640px) {
    font-size: 40px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 28px;
  }

  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

const Span = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  background: linear-gradient(225deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubTitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-top: 24px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 16px;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 250px;
  text-align: center;
  padding: 16px 0;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  box-shadow: 0 10px 20px rgba(133, 76, 230, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(133, 76, 230, 0.5);
    filter: brightness(1.1);
  }

  @media (max-width: 640px) {
    padding: 14px 0;
    font-size: 16px;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 110%;
    height: 110%;
    background: radial-gradient(circle, ${({ theme }) => theme.primary + '33'} 0%, transparent 70%);
    z-index: -1;
  }
`;

const Img = styled.img`
  border-radius: 30px;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.primary + '33'};
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const Hero = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>
              <ResumeButton href={Bio.resume} target="_blank">
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt perspective={1000}>
                  <ImgContainer>
                    <Img src={HeroImg} alt={Bio.name} />
                  </ImgContainer>
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;