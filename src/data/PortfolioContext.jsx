import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Bio, education, experiences, projects, skills } from "./constants";
import { darkTheme } from "../utils/Themes";

const STORAGE_KEY = "portfolio-customization";

export const defaultPortfolio = {
  bio: Bio,
  skills,
  experiences,
  education,
  projects,
  theme: darkTheme,
  sections: {
    skills: { title: "Skills", description: "Here are the technologies and tools I work with." },
    experience: { title: "Experience", description: "My work experience as a software engineer and working on different companies and projects." },
    projects: { title: "Projects", description: "I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects." },
    education: { title: "Education", description: "My education has been a journey of self-discovery and growth. My educational details are as follows." },
    contact: { title: "Contact", description: "Feel free to reach out to me for any questions or opportunities!" },
  },
};

const PortfolioContext = createContext(null);

const loadPortfolio = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultPortfolio, ...JSON.parse(saved) } : defaultPortfolio;
  } catch {
    return defaultPortfolio;
  }
};

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(loadPortfolio);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  const value = useMemo(() => ({
    portfolio,
    savePortfolio: (next) => setPortfolio(next),
    resetPortfolio: () => setPortfolio(defaultPortfolio),
  }), [portfolio]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return context;
}
