import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="formacion" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>Formación Académica</span>
          </div>
          <h2 className="section-title">Educación</h2>
          <p className="section-desc">
            Base teórica y práctica en ingeniería de software, arquitectura de sistemas e inteligencia artificial.
          </p>
        </div>

        <div className="education-box">
          <div className="timeline-header">
            <div>
              <h3 className="timeline-role">{EDUCATION.institution}</h3>
              <p className="timeline-company" style={{ fontSize: '1.1rem' }}>{EDUCATION.degree}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="timeline-badge">
                <Calendar size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {EDUCATION.period}
              </span>
              <span className="timeline-badge">
                <MapPin size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {EDUCATION.location}
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            {EDUCATION.description}
          </p>

          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Competencias Técnicas Clave:
          </h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {EDUCATION.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--bg-surface-elevated)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                <CheckCircle size={14} color="var(--accent)" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

