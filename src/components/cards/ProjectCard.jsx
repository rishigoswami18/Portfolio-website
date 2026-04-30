import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
    border: 1px solid ${({ theme }) => theme.primary + "80"};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 12px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + "15"};
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 2px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.5;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;

const Button = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 700;
  text-align: center;
  margin-top: auto;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    filter: brightness(1.2);
    transform: scale(1.02);
  }
`;

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <Image src={project.image} alt={project.title} />
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>
      <Members>
        {project.member?.map((member, index) => (
          <Avatar key={index} src={member.img} alt={member.name} />
        ))}
      </Members>
      <Button href={project.github} target="_blank">
        View Project
      </Button>
    </Card>
  );
};

export default ProjectCard;

