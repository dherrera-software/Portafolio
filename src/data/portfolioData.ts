import type { PersonalInfo, Project, TechCategory, Experience, Education } from '../types/portfolio';

export const PERSONAL_INFO: PersonalInfo = {
  name: "Diego Herrera Rodríguez",
  shortName: "Diego Herrera",
  role: "Desarrollador de Software Full Stack",
  specialization: "Next.js · React · TypeScript",
  location: "Lima, Perú",
  flag: "🇵🇪",
  availability: "Disponible para proyectos y oportunidades",
  about:
    "Desarrollador de software full stack especializado en el ecosistema JavaScript/TypeScript (Next.js, React, Node.js). Experiencia demostrada en el diseño de aplicaciones web escalables, integración de APIs RESTful, maquetación de componentes desde Figma y automatización de despliegues en la nube con Docker y CI/CD. Habilidad comprobada para optimizar tiempos de desarrollo en un 15% y modernizar sistemas heredados aplicando metodologías ágiles como Scrum y Kanban. En mis ratos libres también desarrollo videojuegos.",
  email: "dherrera200106@gmail.com",
  phone: "+51 912 443 022",
  phoneFormatted: "+51 912 443 022",
  whatsappUrl: "https://wa.me/51912443022?text=Hola%20Diego,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar",
  github: "https://github.com/dherrera-software",
  githubUsername: "dherrera-software",
  linkedin: "https://linkedin.com/in/diego-herrera-282b3a432",
  cvUrl: "/CV_Diego_Herrera.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: "fileflow",
    title: "FileFlow",
    subtitle: "Plataforma Web de Conversión Universal de Archivos",
    description:
      "Conversor de archivos de alta fidelidad construido en arquitectura monorepo desacoplada. Procesamiento veloz pensado para ejecutarse 100% sobre Cloudflare Workers con Hono en el backend y React 19 en el frontend. Soporta conversión de más de 35 formatos (documentos, imágenes, audio y datos estructurados: TXT, PDF, HTML, MD, JPG, PNG, CSV, TSV, JSON, XML) con validación MIME, políticas CORS y despliegue CI/CD automatizado.",
    image: "/images/fileflow.png",
    tags: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Vite",
      "Hono",
      "Cloudflare Workers",
      "GitHub Actions",
      "Docker",
      "pnpm"
    ],
    liveUrl: "https://dherrera-software.github.io/FileFlow/",
    githubUrl: "https://github.com/dherrera-software/FileFlow",
    featured: true,
    highlights: [
      "Arquitectura monorepo (pnpm workspaces) con procesamiento seguro de archivos.",
      "Procesamiento serverless en Cloudflare Workers sin dependencias pesadas innecesarias.",
      "Pipeline CI/CD automatizado en GitHub Actions hacia GitHub Pages."
    ]
  },
  {
    id: "pong",
    title: "Pong – Retro Arcade Edition",
    subtitle: "Videojuego Arcade Retro con Estética CRT",
    description:
      "Reinvención nostálgica del clásico arcade con estética CRT interactiva, desarrollado con Phaser 4, TypeScript y Vite. Cuenta con modo 1 jugador contra IA con 4 niveles de dificultad desafiantes (NOOB, MEDIUM, HARD, INFERNO), modo 2 jugadores local, temporizador de 60 segundos con muerte súbita, incremento progresivo de velocidad de pelota, navegación total por teclado y audio persistente.",
    image: "/images/pong.png",
    tags: ["Phaser 4", "TypeScript", "Vite", "HTML5 Canvas", "GitHub Actions", "Web Audio API"],
    liveUrl: "https://dherrera-software.github.io/Pong/",
    githubUrl: "https://github.com/dherrera-software/Pong",
    featured: true,
    highlights: [
      "Motor de física 2D en Phaser 4 con renderizado acelerado en Canvas.",
      "Inteligencia Artificial con 4 modos algorítmicos de respuesta.",
      "Diseño de interfaz retro estilo terminal/CRT y control exclusivo por teclado."
    ]
  },
  {
    id: "pos-aurora",
    title: "Sistema POS Aurora",
    subtitle: "Gestión de Ventas y Distribución Gráfica de Mesas",
    description:
      "Punto de venta integral para restaurantes y comercio con un módulo gráfico interactivo desarrollado sobre HTML5 Canvas para el mapa y estado de mesas en tiempo real. Construido bajo Next.js App Router para una carga inicial ultra rápida y sincronización de inventarios reactiva.",
    image: "",
    tags: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Canvas API", "REST APIs"],
    isPrivate: true,
    featured: false,
    highlights: [
      "Módulo interactivo en Canvas API reduciendo la latencia de renderizado.",
      "Arquitectura App Router para sincronización de inventarios en tiempo real."
    ]
  },
  {
    id: "erp-gestion",
    title: "ERP Interno de Gestión Administrativa",
    subtitle: "Sistema Institucional de Contratos y Salud Ocupacional",
    description:
      "Sistema corporativo para la administración y control de contratos de personal y seguimiento de salud ocupacional. Modelado relacional optimizado en PostgreSQL y MySQL, con tablas dinámicas de alto rendimiento, filtrado multicriterio, paginación server-side y exportación de reportes.",
    image: "",
    tags: ["Next.js", "PrimeReact", "Tailwind CSS", "PostgreSQL", "MySQL", "REST APIs"],
    isPrivate: true,
    featured: false,
    highlights: [
      "Modelos relacionales optimizados en PostgreSQL y MySQL.",
      "Tablas dinámicas con paginación en servidor y reportes administrativos."
    ]
  }
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "Lenguajes",
    items: [
      { name: "TypeScript", badgeUrl: "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" },
      { name: "JavaScript", badgeUrl: "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" },
      { name: "C# (.NET 8)", badgeUrl: "https://img.shields.io/badge/C%23-239120?style=flat&logo=csharp&logoColor=white" },
      { name: "Java", badgeUrl: "https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" },
      { name: "Python", badgeUrl: "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" },
      { name: "PHP", badgeUrl: "https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white" },
      { name: "SQL", badgeUrl: "https://img.shields.io/badge/SQL-4479A1?style=flat&logoColor=white" },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", badgeUrl: "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" },
      { name: "React 19", badgeUrl: "https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB" },
      { name: "Vite", badgeUrl: "https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" },
      { name: "Tailwind CSS", badgeUrl: "https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" },
      { name: "PrimeReact", badgeUrl: "https://img.shields.io/badge/PrimeReact-6366F1?style=flat&logo=primereact&logoColor=white" },
      { name: "HTML5", badgeUrl: "https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" },
      { name: "CSS3", badgeUrl: "https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" },
    ]
  },
  {
    category: "Backend & Bases de Datos",
    items: [
      { name: "Node.js", badgeUrl: "https://img.shields.io/badge/Node.js-5FA04E?style=flat&logo=nodedotjs&logoColor=white" },
      { name: "Express", badgeUrl: "https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" },
      { name: "Hono", badgeUrl: "https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white" },
      { name: "Cloudflare Workers", badgeUrl: "https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat&logo=cloudflare&logoColor=white" },
      { name: "PostgreSQL", badgeUrl: "https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" },
      { name: "MySQL", badgeUrl: "https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white" },
    ]
  },
  {
    category: "DevOps & Herramientas",
    items: [
      { name: "Docker", badgeUrl: "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" },
      { name: "GitHub Actions", badgeUrl: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white" },
      { name: "GitHub Pages", badgeUrl: "https://img.shields.io/badge/GitHub_Pages-222222?style=flat&logo=github&logoColor=white" },
      { name: "Render", badgeUrl: "https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black" },
      { name: "Linux (RedHat)", badgeUrl: "https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black" },
      { name: "Git", badgeUrl: "https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white" },
      { name: "pnpm", badgeUrl: "https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white" },
      { name: "Figma", badgeUrl: "https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white" },
    ]
  },
  {
    category: "Videojuegos & Metodologías",
    items: [
      { name: "Phaser 4", badgeUrl: "https://img.shields.io/badge/Phaser_4-8A2BE2?style=flat&logoColor=white" },
      { name: ".NET 8", badgeUrl: "https://img.shields.io/badge/.NET_8-512BD4?style=flat&logoColor=white" },
      { name: "Scrum & Kanban", badgeUrl: "https://img.shields.io/badge/Agile-Scrum%20%2F%20Kanban-0ea5e9?style=flat" },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Empresoft Peru S.A.C.",
    role: "Practicante de Desarrollo Full Stack",
    period: "2025 – Presente",
    location: "Lima, Perú",
    bullets: [
      "Analicé la lógica de negocio de sistemas legacy y ejecuté la migración hacia arquitecturas web modernas con Next.js, incrementando la mantenibilidad del código en un 20%.",
      "Implementé componentes de interfaz con Next.js y PrimeReact, alcanzando un 100% de precisión visual respecto a los prototipos de Figma.",
      "Gestioné el control de versiones e integración continua utilizando Git y GitHub Flow para despliegues ágiles de nuevas funcionalidades."
    ]
  },
  {
    company: "VAFTEC PERU S.A.C.",
    role: "Practicante Frontend (React.js)",
    period: "2024 – 2025",
    location: "Lima, Perú",
    bullets: [
      "Lideré el desarrollo frontend de la plataforma web Bigsei, garantizando un diseño 100% responsivo para dispositivos móviles y de escritorio.",
      "Diseñé una librería de componentes modulares en React.js, estandarizando la interfaz global y reduciendo los tiempos de desarrollo en un 15%.",
      "Optimicé el rendimiento y la interactividad de la aplicación mediante la gestión eficiente del estado del cliente y la carga diferida de módulos."
    ]
  }
];

export const EDUCATION: Education = {
  institution: "SENATI",
  degree: "Técnico en Ingeniería de Software con Inteligencia Artificial",
  period: "Feb. 2024 – Dic. 2026 (Esperado)",
  location: "Lima, Perú",
  description:
    "Carrera dual enfocada en el desarrollo de software escalable, arquitectura de sistemas, modelado de bases de datos relacionales y no relacionales, POO y algoritmia avanzada.",
  skills: [
    "Estructuras de Datos",
    "Arquitectura de Software",
    "Bases de Datos Relacionales & No Relacionales",
    "POO & Algoritmia",
    "Inteligencia Artificial Aplicada"
  ]
};
