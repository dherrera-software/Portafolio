import { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface FuturisticCursorProps {
  /** Ilumina la rejilla de fondo cerca del cursor. */
  spotlight?: boolean;
}

const FINE_POINTER = '(pointer: fine) and (hover: hover)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const INTERACTIVE = 'a, button, [role="button"], summary, select, [data-cursor]';
const TEXT_FIELD =
  'input[type="text"], input[type="search"], input[type="email"], input[type="url"], input[type="password"], input[type="number"], input:not([type]), textarea, [contenteditable="true"]';

/** Factores de interpolación por frame de 60 Hz. */
const RING_LERP = 0.2;
const GLOW_LERP = 0.08;
const FRAME_MS = 16.667;
/** Posición de reposo: por debajo de esto el bucle se detiene. */
const SETTLE_DISTANCE = 0.1;
const MAX_RIPPLES = 4;

const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches;

export const FuturisticCursor: React.FC<FuturisticCursorProps> = ({ spotlight = true }) => {
  const [enabled, setEnabled] = useState(hasFinePointer);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [label, setLabel] = useState('');
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);
  const visibleRef = useRef(false);

  // Activar / desactivar si cambia el tipo de puntero (p. ej. tablet + mouse).
  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER);
    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Los listeners se registran una sola vez; el estado visible vive en un ref.
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const motionMedia = window.matchMedia(REDUCED_MOTION);
    let reduced = motionMedia.matches;
    const onMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
    };
    motionMedia.addEventListener('change', onMotionChange);

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    const glow = { x: 0, y: 0 };
    let started = false;
    let raf = 0;
    let last = 0;

    const place = (el: HTMLElement | null, x: number, y: number) => {
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const applyFollowers = () => {
      place(ringRef.current, ring.x, ring.y);
      place(glowRef.current, glow.x, glow.y);

      const spot = spotRef.current;
      if (spot) {
        spot.style.setProperty('--fc-x', `${glow.x}px`);
        spot.style.setProperty('--fc-y', `${glow.y}px`);
      }
    };

    // Lerp independiente de los FPS: 1 - (1 - k)^(dt / 16.67)
    const smooth = (factor: number, dt: number) =>
      reduced ? 1 : 1 - Math.pow(1 - factor, dt / FRAME_MS);

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : FRAME_MS;
      last = now;

      const kRing = smooth(RING_LERP, dt);
      const kGlow = smooth(GLOW_LERP, dt);

      ring.x += (mouse.x - ring.x) * kRing;
      ring.y += (mouse.y - ring.y) * kRing;
      glow.x += (mouse.x - glow.x) * kGlow;
      glow.y += (mouse.y - glow.y) * kGlow;
      applyFollowers();

      const settled =
        Math.abs(mouse.x - ring.x) < SETTLE_DISTANCE &&
        Math.abs(mouse.y - ring.y) < SETTLE_DISTANCE &&
        Math.abs(mouse.x - glow.x) < SETTLE_DISTANCE &&
        Math.abs(mouse.y - glow.y) < SETTLE_DISTANCE;

      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const hide = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
      setHovering(false);
      setTyping(false);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      mouse.x = event.clientX;
      mouse.y = event.clientY;
      place(dotRef.current, mouse.x, mouse.y);

      if (!started) {
        // Primer movimiento: sin "vuelo" desde la esquina.
        started = true;
        ring.x = glow.x = mouse.x;
        ring.y = glow.y = mouse.y;
        applyFollowers();
      }

      show();

      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      setTyping(Boolean(target.closest(TEXT_FIELD)));

      const custom = target.closest<HTMLElement>('[data-cursor]');
      const download = target.closest('.download-cv');
      const project = target.closest('.project-card-link');
      const interactive = target.closest(INTERACTIVE);

      if (custom) {
        setHovering(true);
        setLabel(custom.dataset.cursor ?? '');
      } else if (download) {
        setHovering(true);
        setLabel('Descargar');
      } else if (project) {
        setHovering(true);
        setLabel('Ver');
      } else if (interactive) {
        setHovering(true);
        setLabel('');
      } else {
        setHovering(false);
        setLabel('');
      }
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      setPressed(true);

      if (event.button !== 0) return;

      const id = ++rippleId.current;
      setRipples((list) => [
        ...list.slice(-(MAX_RIPPLES - 1)),
        { id, x: event.clientX, y: event.clientY },
      ]);
    };

    const onUp = () => setPressed(false);

    const onLeave = () => hide();
    const onEnter = () => {
      if (started) show();
    };
    const onBlur = () => {
      hide();
      setPressed(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onBlur);
    root.addEventListener('mouseleave', onLeave);
    root.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
      motionMedia.removeEventListener('change', onMotionChange);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onBlur);
      root.removeEventListener('mouseleave', onLeave);
      root.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const className = [
    'fc-cursor',
    visible && 'is-visible',
    hovering && 'is-hovering',
    label && 'has-label',
    pressed && 'is-pressed',
    typing && 'is-typing',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} aria-hidden="true">
      {spotlight && <div ref={spotRef} className="fc-spotlight" />}

      <div ref={glowRef} className="fc-glow">
        <span />
      </div>

      <div ref={ringRef} className="fc-ring">
        <div className="fc-ring__inner">
          {label && <span className="fc-label">{label}</span>}
        </div>
      </div>

      <div ref={dotRef} className="fc-dot" />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fc-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() =>
            setRipples((list) => list.filter((item) => item.id !== ripple.id))
          }
        />
      ))}
    </div>
  );
};
