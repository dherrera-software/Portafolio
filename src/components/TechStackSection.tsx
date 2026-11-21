import React from 'react';
import { TECH_CATEGORIES } from '../data/portfolioData';
import { Cpu, Code2, Server, Wrench } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Uso diario':
        return <Code2 size={20} color="var(--accent)" />;
      case 'Con experiencia':
        return <Wrench size={20} color="#f59e0b" />;
      case 'Conocimientos base':
        return <Server size={20} color="#10b981" />;
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
            Tecnologías organizadas según mi nivel de experiencia con cada una.
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

