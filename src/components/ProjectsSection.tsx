import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { ExternalLink, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';

export const ProjectsSection: React.FC = () => {
  const featuredProjects: Project[] = PROJECTS.filter((p) => p.featured);
  const otherProjects: Project[] = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="proyectos">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Portafolio de Trabajo</span>
          </div>
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-desc">
            Haz clic directamente en cualquier tarjeta para abrir la aplicación o juego desplegado en vivo en una nueva pestaña.
          </p>
        </div>

        {/* Featured Projects with Live Demo & Direct Card Link */}
        <div className="projects-grid">
          {featuredProjects.map((project: Project) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              title={`Abrir ${project.title} (${project.liveUrl})`}
            >
              {project.image && (
                <div className="project-image-box">
                  <img
                    src={project.image}
                    alt={`Captura de pantalla de ${project.title}`}
                    loading="lazy"
                  />
                  <div className="project-badge-overlay">
                    <ExternalLink size={13} />
                    <span>Demo en vivo</span>
                  </div>
                </div>
              )}

              <div className="project-content">
                <div className="project-title-row">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <div className="project-direct-indicator" title="Abrir proyecto">
                    <ExternalLink size={18} />
                  </div>
                </div>

                <p className="project-desc">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="project-highlights">
                    {project.highlights.map((h: string, i: number) => (
                      <div key={i} className="project-highlight-item">
                        <CheckCircle2 size={16} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="project-tags">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-footer-actions">
                  <span className="project-live-cue">
                    <span>
                      {project.id === 'pong' ? '🕹️ Jugar en vivo' : '⚡ Abrir aplicación'}
                    </span>
                    <ExternalLink size={15} />
                  </span>

                  {project.githubUrl && (
                    <button
                      type="button"
                      className="project-github-btn"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                      }}
                      title="Ver repositorio en GitHub"
                    >
                      <GithubIcon size={15} />
                      <span>Código</span>
                    </button>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Secondary / Specialized Projects */}
        {otherProjects.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Otros Proyectos & Sistemas Empresariales
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Desarrollos orientados a la arquitectura de software, gestión de datos y optimización de flujos operativos.
            </p>

            <div className="secondary-projects-grid">
              {otherProjects.map((project: Project) => (
                <div key={project.id} className="secondary-project-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{project.title}</h4>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 9999,
                        background: 'var(--bg-surface-elevated)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Lock size={12} />
                      <span>Privado / Institucional</span>
                    </span>
                  </div>

                  <p style={{ color: 'var(--accent)', fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {project.subtitle}
                  </p>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {project.description}
                  </p>

                  <div className="project-tags" style={{ marginBottom: 0 }}>
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
