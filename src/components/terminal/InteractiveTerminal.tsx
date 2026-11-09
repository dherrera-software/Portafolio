import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CornerDownLeft, ExternalLink, Download } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, TECH_CATEGORIES } from '../../data/portfolioData';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
}

interface OutputEntry {
  id: string;
  command: string;
  response: React.ReactNode;
}

/** Shorter prompt for small screens */
const useShortPrompt = () => {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    setIsSmall(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isSmall ? 'diego:~$' : 'diego@portafolio:~$';
};

export const InteractiveTerminal: React.FC<TerminalProps> = ({ isOpen, onClose, toggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const prompt = useShortPrompt();
  const [history, setHistory] = useState<OutputEntry[]>([
    {
      id: 'init-1',
      command: 'welcome',
      response: (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 600, wordBreak: 'break-word' as const }}>
            Diego Herrera Terminal v1.0.0
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Escribe <span style={{ color: '#f59e0b', fontWeight: 600 }}>help</span> para ver los comandos disponibles o presiona los botones rápidos.
          </p>
        </div>
      ),
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const commandHistory = useRef<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.current.push(rawCmd);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="terminal-help-grid">
            <span style={{ color: '#38bdf8' }}>projects</span> <span>Lista los proyectos con enlaces directos</span>
            <span style={{ color: '#38bdf8' }}>fileflow</span> <span>Abre FileFlow (conversor web) en nueva pestaña</span>
            <span style={{ color: '#38bdf8' }}>pong</span> <span>Abre Pong Retro Arcade en nueva pestaña</span>
            <span style={{ color: '#38bdf8' }}>skills</span> <span>Muestra el stack tecnológico categorizado</span>
            <span style={{ color: '#38bdf8' }}>experience</span> <span>Muestra la experiencia laboral</span>
            <span style={{ color: '#38bdf8' }}>about</span> <span>Resumen del perfil profesional</span>
            <span style={{ color: '#38bdf8' }}>contact</span> <span>Información de contacto directa</span>
            <span style={{ color: '#38bdf8' }}>cv</span> <span>Descarga el CV de Diego en PDF</span>
            <span style={{ color: '#38bdf8' }}>theme</span> <span>Alterna entre Modo Oscuro y Claro</span>
            <span style={{ color: '#38bdf8' }}>clear</span> <span>Limpia la pantalla de la terminal</span>
            <span style={{ color: '#38bdf8' }}>exit</span> <span>Cierra la ventana de la terminal</span>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}>
              Proyectos destacados disponibles:
            </p>
            {PROJECTS.map((p) => (
              <div key={p.id} style={{ marginBottom: '0.6rem' }}>
                <span style={{ color: '#34d399', fontWeight: 600 }}>• {p.title}</span> - {p.subtitle}
                <div style={{ marginTop: '0.2rem' }}>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-project-chip"
                    >
                      <span>Abrir Demo en Vivo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-project-chip"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'fileflow':
        window.open('https://dherrera-software.github.io/FileFlow/', '_blank');
        output = <p style={{ color: '#34d399' }}>Redirigiendo a FileFlow en nueva pestaña...</p>;
        break;

      case 'pong':
        window.open('https://dherrera-software.github.io/Pong/', '_blank');
        output = <p style={{ color: '#34d399' }}>Lanzando Pong – Retro Arcade Edition en nueva pestaña...</p>;
        break;

      case 'skills':
        output = (
          <div>
            {TECH_CATEGORIES.map((cat) => (
              <p key={cat.category} style={{ marginBottom: '0.35rem' }}>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>{cat.category}:</span>{' '}
                <span style={{ color: 'var(--text-muted)' }}>
                  {cat.items.map((i) => i.name).join(', ')}
                </span>
              </p>
            ))}
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{PERSONAL_INFO.about}</p>;
        break;

      case 'experience':
        output = (
          <div>
            <p style={{ color: '#38bdf8', fontWeight: 600 }}>Empresoft Peru S.A.C. (2025 – Presente)</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              Practicante Full Stack · Migración a Next.js (+20% mantenibilidad) y maquetación Figma con 100% de precisión.
            </p>
            <p style={{ color: '#38bdf8', fontWeight: 600 }}>VAFTEC PERU S.A.C. (2024 – 2025)</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Practicante Frontend · Plataforma Bigsei y librería de componentes modulares en React (-15% tiempo de desarrollo).
            </p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div>
            <p>📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} style={{ color: '#38bdf8' }}>{PERSONAL_INFO.email}</a></p>
            <p>📱 WhatsApp: <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e' }}>{PERSONAL_INFO.phoneFormatted}</a></p>
            <p>💼 LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>diego-herrera</a></p>
            <p>🐙 GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>github.com/{PERSONAL_INFO.githubUsername}</a></p>
          </div>
        );
        break;

      case 'cv':
        output = (
          <div>
            <p style={{ color: '#34d399', marginBottom: '0.4rem' }}>Descargando Curriculum Vitae...</p>
            <a
              href={PERSONAL_INFO.cvUrl}
              download="CV_Diego_Herrera.pdf"
              className="terminal-project-chip"
            >
              <Download size={12} />
              <span>Clic aquí si no inició la descarga</span>
            </a>
          </div>
        );
        // Trigger auto download
        {
          const link = document.createElement('a');
          link.href = PERSONAL_INFO.cvUrl;
          link.download = 'CV_Diego_Herrera.pdf';
          link.click();
        }
        break;

      case 'theme':
        toggleTheme();
        output = <p style={{ color: '#a855f7' }}>Tema alternado correctamente (Claro ↔ Oscuro).</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'close':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        output = (
          <p style={{ color: '#ef4444' }}>
            Comando no reconocido: '{rawCmd}'. Escribe <span style={{ color: '#f59e0b', fontWeight: 600 }}>help</span> para ver la lista de comandos.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `entry-${Date.now()}`,
        command: rawCmd,
        response: output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.current.length > 0) {
        const nextIdx =
          historyIndex === -1
            ? commandHistory.current.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory.current[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.current.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.current.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory.current[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const quickCommands = ['help', 'projects', 'fileflow', 'pong', 'skills', 'contact', 'cv', 'theme', 'clear'];

  return (
    <div className="terminal-backdrop" onClick={onClose}>
      <div className="terminal-modal" onClick={(e) => e.stopPropagation()}>
        {/* Window Bar */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <button className="dot-control dot-close" onClick={onClose} title="Cerrar" />
            <button className="dot-control dot-minimize" onClick={onClose} title="Minimizar" />
            <button className="dot-control dot-maximize" title="Maximizar" />
          </div>

          <div className="terminal-title">
            <Terminal size={14} color="#38bdf8" />
            <span>diego@terminal:~$</span>
          </div>

          <div className="terminal-shortcut-hint">Esc para salir</div>
        </div>

        {/* Output Area */}
        <div className="terminal-body">
          {history.map((entry) => (
            <div key={entry.id} className="terminal-line">
              <div className="terminal-prompt-line">
                <span className="terminal-prompt-user">{prompt}</span>
                <span className="terminal-command-echo">{entry.command}</span>
              </div>
              <div className="terminal-output-text">{entry.response}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions Bar */}
        <div className="terminal-suggestions-bar">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Sugerencias:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="terminal-suggestion-chip"
              onClick={() => handleCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="terminal-input-row">
          <span className="terminal-prompt-user">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un comando..."
            autoFocus
          />
          <CornerDownLeft size={16} color="var(--text-subtle)" />
        </div>
      </div>
    </div>
  );
};
