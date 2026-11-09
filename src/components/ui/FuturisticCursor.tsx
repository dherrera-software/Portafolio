"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const FuturisticCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Valores del mouse para Framer Motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configuración de la física del resorte (Spring)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Resorte para el anillo exterior
  const ringXSpring = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 1 });
  const ringYSpring = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 1 });

  useEffect(() => {
    // Si es un dispositivo táctil (móvil, tablet), no activar cursor customizado y mantener puntero nativo
    const mediaTouch = window.matchMedia('(pointer: coarse), (hover: none)');
    if (mediaTouch.matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
      if (e.matches) {
        document.body.style.cursor = 'auto';
      }
    };
    mediaTouch.addEventListener('change', handleMediaChange);

    // Solo ocultar el cursor nativo si NO es touch y el componente montó
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isLink = target.closest('a') || target.closest('button');
      const isProject = target.closest('.project-card-link');
      const isCV = target.closest('.download-cv');

      if (isCV) {
        setIsHovering(true);
        setHoverText("Descargar");
      } else if (isProject) {
        setIsHovering(true);
        setHoverText("Ver");
      } else if (isLink) {
        setIsHovering(true);
        setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.style.cursor = 'auto';
      mediaTouch.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className={`custom-cursor-wrapper ${isVisible ? 'visible' : ''}`}>
      {/* 1. Punto central */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Anillo exterior */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'hover-state' : ''}`}
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovering ? 1.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-text"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* 3. Ripple al hacer click */}
      {isClicking && (
        <motion.div
          className="cursor-click-ripple"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
      )}
    </div>
  );
};
