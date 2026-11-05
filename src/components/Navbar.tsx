import React, { useState } from 'react';
import { Sun, Moon, Menu, X, FileDown, Terminal } from 'lucide-react';
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

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar" aria-label="Navegación principal">
          <a href="#" className="nav-brand" onClick={handleLinkClick}>
            <div
              className="contact-icon-circle"
              style={{ width: 34, height: 34, borderRadius: 8, cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                onOpenTerminal();
              }}
              title="Abrir Terminal de Comandos (Ctrl+K)"
            >
              <Terminal size={18} />
            </div>
            <span>Diego Herrera</span>
            <span className="brand-dot" title="Activo"></span>
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
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
              onClick={onOpenTerminal}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
              title="Abrir Terminal de Comandos (Ctrl + K)"
            >
              <Terminal size={15} color="var(--accent)" />
              <span className="code-font" style={{ fontSize: '0.78rem' }}>Ctrl+K</span>
            </button>

            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {theme === 'dark' ? <Sun size={19} color="#facc15" /> : <Moon size={19} color="#0284c7" />}
            </button>

            <a
              href={PERSONAL_INFO.cvUrl}
              download="CV_Diego_Herrera.pdf"
              className="btn-secondary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
              title="Descargar Curriculum Vitae en PDF"
            >
              <FileDown size={16} />
              <span>CV</span>
            </a>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
