import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { Download, ExternalLink, Sparkles, CheckCircle2, Lock } from 'lucide-react';
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
            Haz clic en una tarjeta para abrir la aplicación en vivo o descargar el instalador de FileFlow Desktop en una nueva pestaña.
          </p>
        </div>

        {/* Featured Projects with Live Demo & Direct Card Link */}
        <div className="projects-grid">
          {featuredProjects.map((project: Project) => {
            const primaryUrl = project.liveUrl ?? project.downloadUrl;
            const isDownload = !project.liveUrl && Boolean(project.downloadUrl);

            return (
            <a
              key={project.id}
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              title={`${isDownload ? 'Descargar' : 'Abrir'} ${project.title} (${primaryUrl})`}
            >
              {project.image && (
                <div className="project-image-box">
                  <img
                    src={project.image}
                    alt={`Captura de pantalla de ${project.title}`}
                    loading="lazy"
                  />
                  <div className="project-badge-overlay">
                    {isDownload ? <Download size={13} /> : <ExternalLink size={13} />}
                    <span>{isDownload ? 'Descargar instalador' : 'Demo en vivo'}</span>
                  </div>
                </div>
              )}

              <div className="project-content">
                <div className="project-title-row">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <div className="project-direct-indicator" title={isDownload ? 'Descargar instalador' : 'Abrir proyecto'}>
                    {isDownload ? <Download size={16} /> : <ExternalLink size={16} />}
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
                      {project.ctaLabel ?? (project.id === 'pong' ? '🕹️ Jugar en vivo' : '⚡ Abrir aplicación')}
                    </span>
                    {isDownload ? <Download size={15} /> : <ExternalLink size={15} />}
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
            );
          })}
        </div>

        {/* Secondary / Specialized Projects */}
        {otherProjects.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}>
              Otros Proyectos & Sistemas Empresariales
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Desarrollos orientados a la arquitectura de software, gestión de datos y optimización de flujos operativos.
            </p>

            <div className="secondary-projects-grid">
              {otherProjects.map((project: Project) => (
                <div key={project.id} className="secondary-project-card">
                  <div className="secondary-card-header">
                    <h4 className="secondary-card-title">{project.title}</h4>
                    <span className="secondary-card-badge">
                      <Lock size={12} />
                      <span>Privado / Institucional</span>
                    </span>
                  </div>

                  <p className="secondary-card-subtitle">
                    {project.subtitle}
                  </p>

                  <p className="secondary-card-desc">
                    {project.description}
                  </p>

                  {project.images && project.images.length > 0 && (
                    <div className="project-gallery">
                      {project.images.map((src: string, i: number) => (
                        <img
                          key={`${src}-${i}`}
                          src={src}
                          alt={`Captura ${i + 1} de ${project.title}`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}

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
