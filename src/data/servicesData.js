import { 
  Globe, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Cpu 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'web-dev',
    category: 'Web & Mobile',
    icon: Globe,
    color: '#38bdf8',
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    badge: 'Full-Stack Web',
    title: 'Full-Stack Web Applications',
    tagline: 'High-Performance Next.js, NestJS & .NET Solutions',
    description: 'Architecting robust, ultra-fast web platforms and microservices with clean code, RESTful APIs, and DB integrations.',
    timeline: '2 – 4 Weeks',
    capabilities: [
      'Next.js 14 & React Web Applications',
      'NestJS & .NET Microservices Architecture',
      'RESTful & GraphQL API Design',
      'Laravel, Django & FastAPI Backend Systems'
    ],
    deliverables: [
      'Production-Ready Next.js & React Web App',
      'RESTful/GraphQL API Microservices',
      'Authentication & RBAC Security Layer',
      'Full System & API Documentation'
    ],
    techStack: ['Next.js', 'React', 'NestJS', '.NET Framework', 'FastAPI', 'TailwindCSS', 'TypeScript'],
    architectureBlueprint: 'Client (Next.js/React) ➔ API Gateway (NestJS/.NET) ➔ PostgreSQL DB + Redis Cache ➔ Vercel/Render Cloud'
  },
  {
    id: 'mobile-dev',
    category: 'Web & Mobile',
    icon: Smartphone,
    color: '#34d399',
    bgGlow: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    badge: 'Native Mobile',
    title: 'Cross-Platform Mobile Apps',
    tagline: 'iOS & Android Native-Feeling Apps with Expo',
    description: 'Engineering high-performance mobile apps for iOS and Android using React Native & Expo with offline caching.',
    timeline: '3 – 6 Weeks',
    capabilities: [
      'React Native (Expo) Cross-Platform Suite',
      'Offline Caching & State Synchronization',
      'Push Notifications & Mobile Biometric Auth',
      'App Store & Play Store Deployment Ready'
    ],
    deliverables: [
      'Compiled iOS & Android Installation Packages (APK / IPA)',
      'Modular React Native Expo Codebase',
      'Offline Synchronization Engine',
      'Store Submission Guidelines & Assets'
    ],
    techStack: ['React Native', 'Expo', 'Zustand', 'AsyncStorage', 'Tailwind/NativeWind', 'Firebase Auth'],
    architectureBlueprint: 'Mobile App (Expo) ➔ Offline Storage Sync ➔ Cloud API Endpoints ➔ Push Notification Server'
  },
  {
    id: 'cloud-devops',
    category: 'Cloud & DB',
    icon: Database,
    color: '#c084fc',
    bgGlow: 'rgba(192, 132, 252, 0.12)',
    borderColor: 'rgba(192, 132, 252, 0.3)',
    badge: 'Cloud & Infrastructure',
    title: 'Databases, Cloud & DevOps',
    tagline: 'High-Availability DBs, Caching & Containerization',
    description: 'Designing fault-tolerant SQL/NoSQL databases, Redis performance caching layers, and Docker deployment pipelines.',
    timeline: '1 – 3 Weeks',
    capabilities: [
      'PostgreSQL, MongoDB, Supabase & Firebase',
      'Redis Performance In-Memory Caching',
      'Docker Containerization & Multi-stage Builds',
      'GCP, Vercel & Render Cloud Hosting'
    ],
    deliverables: [
      'Optimized Database Schemas & Migrations',
      'Redis Caching Middleware Layer',
      'Dockerized Container Architecture',
      'Automated CI/CD Deployment Scripts'
    ],
    techStack: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Docker', 'GCP', 'Vercel', 'Render'],
    architectureBlueprint: 'Dockerized Container ➔ NGINX Proxy ➔ Redis Memory Cache ➔ PostgreSQL Connection Pool'
  },
  {
    id: 'web-security',
    category: 'Security',
    icon: ShieldCheck,
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    badge: 'Web Security',
    title: 'Website Security & Vulnerability Audits',
    tagline: 'OWASP Protection, SSL, Rate Limiting & Hardening',
    description: 'Securing web applications against OWASP Top 10 threats, implementing JWT authentication, DDoS mitigation, rate limiting, and security header enforcement.',
    timeline: '1 – 2 Weeks',
    capabilities: [
      'OWASP Top 10 Vulnerability Audits & Patching',
      'JWT Auth, Role-Based Access (RBAC) & OAuth2',
      'API Rate Limiting, CORS & Input Sanitization',
      'SSL/TLS Encryption & Security Headers (Helmet)'
    ],
    deliverables: [
      'Comprehensive Security Audit & Patch Report',
      'Hardened Backend API Middleware Pipeline',
      'DDoS & API Rate-Limiting Protection Rules',
      'SSL/TLS & Security Best-Practice Compliance'
    ],
    techStack: ['OWASP', 'JWT', 'HelmetJS', 'Rate Limiter', 'SSL / TLS', 'OAuth2', 'CORS'],
    architectureBlueprint: 'Client ➔ SSL/TLS Tunnel ➔ Rate Limiter Middleware ➔ Input Sanitizer ➔ RBAC API Controller'
  },
  {
    id: 'ai-ml',
    category: 'AI & IoT',
    icon: Sparkles,
    color: '#fbbf24',
    bgGlow: 'rgba(251, 191, 36, 0.12)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    badge: 'AI & Data Engine',
    title: 'AI & Semantic Search Engines',
    tagline: 'Machine Learning, Vector Search & Thesis Archives',
    description: 'Building intelligent semantic search engines, document archives, and high-accuracy vector retrieval APIs.',
    timeline: '2 – 4 Weeks',
    capabilities: [
      'ML Semantic Search Engine (90%+ Accuracy)',
      'Thesis Archive & Intelligent Document Repository',
      'RAG (Retrieval-Augmented Generation) & Vector Embeddings',
      'FastAPI Python Microservices for ML Models'
    ],
    deliverables: [
      'FastAPI ML Microservice API',
      'Semantic Search Vector Index Engine',
      'Role-Based Digital Archive Dashboard',
      'Accuracy Evaluation & Test Benchmark'
    ],
    techStack: ['Python', 'FastAPI', 'Machine Learning', 'Semantic Search', 'PostgreSQL', 'Vector DB'],
    architectureBlueprint: 'User Query ➔ NLP Vector Embedding ➔ Cosine Similarity Search ➔ Sub-5s Ranked Document Retrieval'
  },
  {
    id: 'iot-hardware',
    category: 'AI & IoT',
    icon: Cpu,
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.12)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    badge: 'Embedded Hardware',
    title: 'IoT & Microcontroller Automation',
    tagline: 'Hardware Sensor Telemetry & REST Controller APIs',
    description: 'Programming embedded microcontrollers (ESP32, Raspberry Pi) to communicate with backend APIs for real-time sensor telemetry.',
    timeline: '3 – 5 Weeks',
    capabilities: [
      'Raspberry Pi & ESP32 Embedded Microcontrollers',
      'Real-Time Hardware Sensor Telemetry',
      'FastAPI & Python Async RESTful Hardware APIs',
      'Dockerized Telemetry Processing Services'
    ],
    deliverables: [
      'Microcontroller Firmware & C++/Python Code',
      'Real-Time Telemetry Dashboard API',
      'Hardware Circuit Wiring Diagram',
      'Containerized Data Collector'
    ],
    techStack: ['Raspberry Pi', 'ESP32', 'Python', 'FastAPI', 'WebSockets', 'C++', 'Docker'],
    architectureBlueprint: 'ESP32/Raspberry Pi Sensors ➔ WebSockets / REST API ➔ FastAPI Server ➔ Live Control Dashboard'
  }
];
