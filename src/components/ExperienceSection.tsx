import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experiencia">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Trayectoria Profesional</span>
          </div>
          <h2 className="section-title">Experiencia Laboral</h2>
          <p className="section-desc">
            Participación en proyectos reales de desarrollo frontend y full stack, modernización de arquitecturas y optimización de flujos de trabajo.
          </p>
        </div>

        <div className="experience-timeline">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="timeline-badge">
                    <Calendar size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                    {exp.period}
                  </span>
                  <span className="timeline-badge">
                    <MapPin size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="timeline-bullets">
                {exp.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="timeline-bullet-item">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

