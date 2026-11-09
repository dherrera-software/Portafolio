import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileDown, Terminal, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Proyectos', id: 'proyectos', href: '#proyectos' },
    { label: 'Stack Técnico', id: 'stack', href: '#stack' },
    { label: 'Experiencia', id: 'experiencia', href: '#experiencia' },
    { label: 'Formación', id: 'formacion', href: '#formacion' },
    { label: 'Contacto', id: 'contacto', href: '#contacto' },
  ];

  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="navbar-wrapper">
        <div className="container">
          <nav className="navbar" aria-label="Navegación principal">
            <div className="nav-brand-group">
              <button
                type="button"
                className="nav-terminal-trigger"
                onClick={onOpenTerminal}
                aria-label="Abrir Terminal de Comandos (Ctrl + K)"
                title="Abrir Terminal de Comandos (Ctrl + K)"
              >
                <Terminal size={17} />
              </button>
              <a href="#inicio" className="nav-brand" onClick={handleLinkClick}>
                <span>Diego Herrera</span>
                <span className="brand-dot" title="Activo"></span>
              </a>
            </div>

            {/* Desktop and Tablet Navigation Links */}
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                      {isActive && <span className="active-nav-indicator" />}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="nav-actions">
              <button
                type="button"
                onClick={onOpenTerminal}
                className="btn-secondary nav-ctrl-btn"
                title="Abrir Terminal de Comandos (Ctrl + K)"
                aria-label="Abrir Terminal interactiva"
              >
                <Terminal size={15} color="var(--accent)" />
                <span className="code-font" style={{ fontSize: '0.78rem' }}>Ctrl+K</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              >
                {theme === 'dark' ? <Sun size={18} color="#facc15" /> : <Moon size={18} color="#6366f1" />}
              </button>

              <a
                href={PERSONAL_INFO.cvUrl}
                download="CV_Diego_Herrera.pdf"
                className="btn-secondary nav-cv-btn"
                title="Descargar Curriculum Vitae en PDF"
              >
                <FileDown size={16} />
                <span>CV</span>
              </a>

              <button
                type="button"
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="mobile-chevron" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-nav-footer">
              <button
                type="button"
                className="btn-secondary mobile-action-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
              >
                <Terminal size={17} color="var(--accent)" />
                <span>Abrir Terminal</span>
              </button>

              <a
                href={PERSONAL_INFO.cvUrl}
                download="CV_Diego_Herrera.pdf"
                className="btn-primary mobile-action-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileDown size={17} />
                <span>Descargar CV</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
