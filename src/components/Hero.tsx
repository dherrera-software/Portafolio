import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, FileDown, Mail, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export const Hero: React.FC = () => {
  const highlights = [
    { label: 'Enfoque Principal', value: 'Next.js & TypeScript', sub: 'Arquitectura escalable' },
    { label: 'Conversión FileFlow', value: '35+ Formatos', sub: 'Cloudflare Workers + Hono' },
    { label: 'Precisión Figma', value: '100% Fidelidad', sub: 'PrimeReact & Tailwind' },
    { label: 'Videojuegos Web', value: 'Phaser 4 Engine', sub: 'IA propia & estética CRT' },
  ];

  return (
    <section className="hero-section" id="inicio">
      <div className="container">
        <div className="hero-status-pill">
          <span className="status-indicator"></span>
          <span>{PERSONAL_INFO.availability}</span>
        </div>

        <h1 className="hero-title">
          Hola, soy <span className="text-gradient">{PERSONAL_INFO.shortName}</span>
        </h1>

        <div className="hero-role">
          <span>{PERSONAL_INFO.role}</span>
          <span className="hero-role-dot">•</span>
          <span className="code-font hero-role-spec">{PERSONAL_INFO.specialization}</span>
        </div>

        <p className="hero-bio">{PERSONAL_INFO.about}</p>

        <div className="hero-actions">
          <a href="#proyectos" className="btn-primary">
            <span>Ver Proyectos</span>
            <ArrowUpRight size={18} />
          </a>

          <a
            href={PERSONAL_INFO.cvUrl}
            download="CV_Diego_Herrera.pdf"
            className="btn-secondary download-cv"
            title="Descargar Curriculum Vitae en PDF"
          >
            <FileDown size={18} />
            <span>Descargar CV</span>
          </a>

          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-whatsapp"
            title="Escribir por WhatsApp"
          >
            <MessageSquare size={18} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Senior Engineering KPI Cards */}
        <div className="hero-metrics-grid">
          {highlights.map((h, i) => (
            <div key={i} className="hero-metric-card">
              <div className="metric-header">
                <span className="metric-label">{h.label}</span>
                <Sparkles size={13} className="metric-icon" />
              </div>
              <div className="metric-value">{h.value}</div>
              <div className="metric-sub">{h.sub}</div>
            </div>
          ))}
        </div>

        <div className="hero-meta">
          <div className="hero-meta-item">
            <MapPin size={17} className="meta-accent-icon" />
            <span>{PERSONAL_INFO.location} {PERSONAL_INFO.flag}</span>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-meta-item"
          >
            <GithubIcon size={17} />
            <span className="code-font">{PERSONAL_INFO.githubUsername}</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-meta-item hero-meta-linkedin"
          >
            <LinkedinIcon size={17} />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hero-meta-item"
          >
            <Mail size={17} className="meta-accent-icon" />
            <span>{PERSONAL_INFO.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
