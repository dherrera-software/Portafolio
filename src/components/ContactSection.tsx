import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, MessageSquare, MapPin, Copy, Check, FileDown, Send } from 'lucide-react';
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
            ¿Tienes un proyecto en mente, una vacante o simplemente deseas conversar sobre tecnología? Estoy disponible para nuevas oportunidades.
          </p>
        </div>

        <div className="contact-grid">
          {/* Email Card with Copy option */}
          <div className="contact-card" style={{ cursor: 'pointer' }} onClick={handleCopyEmail}>
            <div className="contact-icon-circle">
              <Mail size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="contact-info-title">Correo Electrónico</p>
              <p className="contact-info-value">{PERSONAL_INFO.email}</p>
            </div>
            <button
              type="button"
              className="theme-toggle-btn"
              style={{ padding: '0.45rem' }}
              title="Copiar correo"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyEmail();
              }}
            >
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            </button>
          </div>

          {/* WhatsApp / Phone Card */}
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon-circle" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="contact-info-title">WhatsApp / Teléfono</p>
              <p className="contact-info-value">{PERSONAL_INFO.phoneFormatted}</p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon-circle" style={{ background: 'rgba(10, 102, 194, 0.15)', color: '#0a66c2' }}>
              <LinkedinIcon size={22} />
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
              <GithubIcon size={22} />
            </div>
            <div>
              <p className="contact-info-title">GitHub</p>
              <p className="contact-info-value">github.com/{PERSONAL_INFO.githubUsername}</p>
            </div>
          </a>

          {/* Location Card */}
          <div className="contact-card">
            <div className="contact-icon-circle">
              <MapPin size={22} />
            </div>
            <div>
              <p className="contact-info-title">Ubicación</p>
              <p className="contact-info-value">{PERSONAL_INFO.location} {PERSONAL_INFO.flag}</p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="contact-banner">
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)' }}>
            ¿Listo para construir algo extraordinario juntos?
          </h3>
          <p style={{ maxWidth: 580, color: 'var(--text-muted)', fontSize: '1rem' }}>
            Puedes contactarme directamente vía correo electrónico o WhatsApp, o descargar mi currículum en formato PDF para revisarlo con tu equipo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              <span>Descargar Curriculum Vitae</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
