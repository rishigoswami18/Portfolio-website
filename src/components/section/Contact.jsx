import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0;
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

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-top: 28px;
  gap: 16px;
  backdrop-filter: blur(10px);
`;

const ContactTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + '33'};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + '33'};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  background: ${({ theme }) => theme.primary};
  background: linear-gradient(
    225deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  padding: 14px 16px;
  margin-top: 8px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(133, 76, 230, 0.3);
    filter: brightness(1.1);
  }
`;

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_dsynqzn",
        "template_8t5qov6",
        form.current,
        "MI3lvtmMhzou3mpA2"
      )
      .then(
        (result) => {
          alert("Message Sent!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message: " + error.text);
        }
      );
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            type="email"
            placeholder="Your Email"
            name="from_email"
            required
          />
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            required
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            required
          />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={4}
            required
          />
          <ContactButton type="submit">Send Message</ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
