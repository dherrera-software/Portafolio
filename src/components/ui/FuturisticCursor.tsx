"use client"; // Necesario si usas Next.js App Router

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
  // stiffness: qué tan rápido reacciona. damping: qué tanto rebota.
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Un resorte más lento para el anillo exterior (efecto de arrastre)
  const ringXSpring = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 1 });
  const ringYSpring = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 1 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Lógica para detectar qué estamos tocando
      const isLink = target.closest('a') || target.closest('button');
      const isProject = target.closest('.project-card'); // Pon aquí la clase de tus tarjetas
      const isCV = target.closest('.download-cv'); // Clase del botón de CV

      if (isCV) {
        setIsHovering(true);
        setHoverText("Descargar");
      } else if (isProject) {
        setIsHovering(true);
        setHoverText("Ver");
      } else if (isLink) {
        setIsHovering(true);
        setHoverText(""); // Se expande pero sin texto
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

      {/* 1. El Punto Central (Rápido y preciso) */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1, // Desaparece al hacer hover en botones
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. El Anillo Exterior (Lento y elástico) */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'hover-state' : ''}`}
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(56, 189, 248, 0.1)" : "rgba(56, 189, 248, 0)",
          borderColor: isHovering ? "rgba(56, 189, 248, 0)" : "rgba(56, 189, 248, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Texto dinámico dentro del cursor */}
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-text"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* 3. Efecto de Onda al hacer Clic (Ripple) */}
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
          transition={{ duration: 0.4 }}
        />
      )}
    </div>
  );
};