import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from "styled-components";
import { PortfolioProvider, usePortfolio } from "./data/PortfolioContext";
import { BrowserRouter } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Hero from "./components/section/Hero";
import Skills  from './components/section/Skills';
import Earth from './components/canvas/Earth';
import Experience from './components/section/Experience';
import Education from './components/section/Education';
import StartCanvas from "./components/canvas/Stars";
import Projects from './components/section/Projects';
import Contact from './components/section/Contact';
import Footer from './components/section/Footer';


const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(133, 76, 230, 0.05) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.05) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 99%, 0 100%);
`;

function PortfolioApp() {
  const { portfolio } = usePortfolio();
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === "#admin");

  useEffect(() => {
    const handleHashChange = () => setIsAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAdmin) return <AdminPanel />;

  return (
    <ThemeProvider theme={portfolio.theme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <StartCanvas />
          <Hero />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects />
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App
