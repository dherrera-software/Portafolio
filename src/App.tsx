import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FuturisticCursor } from './components/ui/FuturisticCursor';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { Terminal } from 'lucide-react';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard shortcut Ctrl+K or Cmd+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Futuristic Custom Cursor with HUD Reticle */}
      <FuturisticCursor />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Ambient Cybernetic Lighting */}
      <div className="bg-ambient-glow" aria-hidden="true">
        <div className="glow-circle-1" />
        <div className="glow-circle-2" />
        <div className="glow-circle-3" />
        <div className="cyber-grid-overlay" />
      </div>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <main id="main-content">
        <Hero />
        <ProjectsSection />
        <TechStackSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating Quick Terminal Button */}
      <button
        type="button"
        className="terminal-floating-btn"
        onClick={() => setIsTerminalOpen(true)}
        title="Abrir Terminal de Comandos (Ctrl + K)"
        aria-label="Terminal interactiva"
      >
        <Terminal size={17} />
        <span>Terminal</span>
      </button>

      {/* Interactive Developer Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
