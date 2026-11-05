import React from 'react';
import { TECH_CATEGORIES } from '../data/portfolioData';
import { Cpu, Code2, Layout, Server, Wrench, Gamepad2 } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Lenguajes':
        return <Code2 size={20} color="var(--accent)" />;
      case 'Frontend':
        return <Layout size={20} color="#38bdf8" />;
      case 'Backend & Bases de Datos':
        return <Server size={20} color="#10b981" />;
      case 'DevOps & Herramientas':
        return <Wrench size={20} color="#f59e0b" />;
      case 'Videojuegos & Metodologías':
        return <Gamepad2 size={20} color="#a855f7" />;
      default:
        return <Cpu size={20} color="var(--accent)" />;
    }
  };

  return (
    <section id="stack" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>Habilidades & Tecnologías</span>
          </div>
          <h2 className="section-title">Stack Técnico</h2>
          <p className="section-desc">
            Conjunto de lenguajes, frameworks, bases de datos y herramientas que empleo activamente para construir soluciones robustas y escalables.
          </p>
        </div>

        <div>
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.category} className="stack-category-card">
              <div className="stack-category-header">
                {getCategoryIcon(cat.category)}
                <span>{cat.category}</span>
              </div>

              <div className="badges-wrapper">
                {cat.items.map((item) => (
                  <div key={item.name} className="tech-badge-item" title={item.name}>
                    <img
                      src={item.badgeUrl}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

