# Contexto del Proyecto: Portafolio Personal

## 🛠️ Stack Tecnológico
- **Framework/Bundler:** Vite + React.
- **Lenguaje:** TypeScript (Estricto).
- **Estilos:** CSS Modular / Design Tokens (variables.css).
- **Entorno:** Node.js con pnpm.

## 🧠 Reglas de Comportamiento del Agente
1. **Código Limpio:** Mantén los componentes modulares y reutilizables. No generes código espagueti.
2. **TypeScript Estricto:** Asegúrate de tipar correctamente todas las props y estados.
3. **Cero Estilos Inline:** Prohibido usar `style={{...}}`. Usa las clases de CSS o las variables de `variables.css`.
4. **No rompas la estructura:** Respeta la arquitectura de carpetas existente (`src/components`, `src/styles`, etc.).

## 🎨 Sistema de Diseño (Linear/Vercel)
- **Tema:** Dark mode principal con "surface ladder" (fondo zinc #09090b).
- **Acento:** Índigo eléctrico (#6366f1). No usar múltiples colores cromáticos.
- **Tipografía:** Inter para UI (peso máximo 600 en display) y JetBrains Mono para código.
- **Animaciones:** Solo micro-animaciones en hover (elevación de -2px, zoom de 1.02). Nada de scroll-triggered.

## 🧰 Habilidades Globales (Skills)
Tienes acceso a habilidades instaladas globalmente en `~/.agents/skills/`. Úsalas proactivamente cuando la tarea lo requiera:
- Usa `design-taste-frontend` para asegurar un diseño premium y evitar que se vea genérico.
- Usa `awesome-design-md` para extraer paletas de colores y tipografías si se requiere un cambio de estilo.
- Usa `web-design-guidelines` para auditar la accesibilidad y UX de cualquier componente nuevo.
- Usa `playwright` para levantar el servidor local y verificar que el diseño responsive no se rompa (revisar `clientWidth` vs `scrollWidth`).