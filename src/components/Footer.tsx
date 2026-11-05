import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="theme-toggle-btn"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <span>© {new Date().getFullYear()} Diego Herrera Rodríguez. Diseñado con</span>
          <Heart size={15} color="#ef4444" fill="#ef4444" />
          <span>en Lima, Perú.</span>
        </p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
          Desarrollado con React 19, TypeScript y Vite.
        </p>
      </div>
    </footer>
  );
};
