import './styles/globals.css';
import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './components/LandingPage';
import ProjectLauncher from './components/ProjectLauncher';
import MainLayout from './components/MainLayout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  return (
    <ThemeProvider>
      {!isLoggedIn ? (
        <LandingPage onLogin={() => setIsLoggedIn(true)} />
      ) : !currentProject ? (
        <ProjectLauncher onProjectSelect={setCurrentProject} />
      ) : (
        <MainLayout 
          projectName={currentProject} 
          onClose={() => setCurrentProject(null)} 
        />
      )}
    </ThemeProvider>
  );
}
