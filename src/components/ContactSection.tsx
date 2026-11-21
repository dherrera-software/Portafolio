import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, MapPin, Copy, Check, FileDown, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contacto">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Ponte en Contacto</span>
          </div>
          <h2 className="section-title">Hablemos</h2>
          <p className="section-desc">
            ¿Tienes una vacante, un proyecto o quieres conversar sobre tecnología? Escríbeme.
          </p>
        </div>

        <div className="contact-grid">
          {/* Email Card with Copy option - Accessible Semantic Button */}
          <button
            type="button"
            className="contact-card contact-card-btn"
            onClick={handleCopyEmail}
            aria-label="Copiar correo electrónico al portapapeles"
          >
            <div className="contact-icon-circle">
              <Mail size={20} />
            </div>
            <div className="contact-info-text">
              <p className="contact-info-title">Correo Electrónico</p>
              <p className="contact-info-value">{PERSONAL_INFO.email}</p>
            </div>
            <div className="contact-copy-indicator" title="Copiar correo">
              {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
            </div>
          </button>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon-circle contact-icon-linkedin">
              <LinkedinIcon size={20} />
            </div>
            <div>
              <p className="contact-info-title">LinkedIn</p>
              <p className="contact-info-value">in/diego-herrera-282b3a432</p>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon-circle">
              <GithubIcon size={20} />
            </div>
            <div>
              <p className="contact-info-title">GitHub</p>
              <p className="contact-info-value">github.com/{PERSONAL_INFO.githubUsername}</p>
            </div>
          </a>

          {/* Location Card */}
          <div className="contact-card">
            <div className="contact-icon-circle">
              <MapPin size={20} />
            </div>
            <div>
              <p className="contact-info-title">Ubicación</p>
              <p className="contact-info-value">{PERSONAL_INFO.location}</p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="contact-banner">
          <h3 className="contact-banner-title">
            ¿Buscas un practicante o desarrollador junior? Hablemos.
          </h3>
          <p className="contact-banner-desc">
            Estoy disponible para prácticas profesionales y puestos junior. Escríbeme por correo o LinkedIn.
          </p>
          <div className="contact-banner-actions">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-primary">
              <Send size={18} />
              <span>Enviar Correo Directo</span>
            </a>
            <a
              href={PERSONAL_INFO.cvUrl}
              download="CV_Diego_Herrera.pdf"
              className="btn-secondary"
            >
              <FileDown size={18} />
              <span>Descargar CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
