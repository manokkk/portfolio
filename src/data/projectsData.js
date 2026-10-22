import { Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const worksData = [
  {
    id: 1,
    title: 'Inspire Holdings Website',
    category: 'Full-Stack Web',
    image: '/images/inspire_website.png',
    description: 'Architecting robust, ultra-fast web platforms and microservices with clean code, RESTful APIs, and DB integrations.',
    blueprint: 'Client (Next.js/React) ➔ API Gateway (NestJS/.NET) ➔ PostgreSQL DB + Redis Cache ➔ Vercel/Render Cloud',
    metrics: [
      { label: 'Sub-second Load', desc: 'SSR & Vercel Edge Optimization', icon: Zap },
      { label: 'Enterprise Security', desc: 'JWT & RBAC Access Layer', icon: ShieldCheck },
      { label: 'Cloud Architecture', desc: 'PostgreSQL + Redis Cache', icon: Sparkles }
    ],
    highlights: [
      'Production-Ready Next.js & React Web App',
      'RESTful/GraphQL API Microservices',
      'Authentication & RBAC Security Layer',
      'Full System & API Documentation'
    ],
    tags: ['Next.js', 'React', 'NestJS', '.NET Framework', 'FastAPI', 'TailwindCSS', 'TypeScript'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 2,
    title: 'Inspire Holdings Admin V2',
    category: 'Full-Stack Web',
    image: '/images/project_confidential_admin.png',
    description: 'Next-generation enterprise administration dashboard providing real-time data analytics, role-based access control (RBAC), and backend system monitoring.',
    blueprint: 'Admin Client (Next.js) ➔ Auth Layer (JWT/RBAC) ➔ NestJS API Engine ➔ Redis Cache + PostgreSQL',
    metrics: [
      { label: 'Real-time Analytics', desc: 'Low-latency Dashboard Feeds', icon: Zap },
      { label: 'Fine-Grained Auth', desc: 'Role-Based Access Control', icon: ShieldCheck },
      { label: 'High Availability', desc: 'Redis Cached State Storage', icon: Sparkles }
    ],
    highlights: [
      'Scalable Next.js & NestJS Admin Engine',
      'JWT Authentication & Fine-Grained Permissions',
      'Redis Dashboard Caching & Analytical Data',
      'Real-time System Audit & Log Streams'
    ],
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'TypeScript'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 3,
    title: 'Inspire Holdings Application V2',
    category: 'Mobile (Expo)',
    image: '/images/inspire_app_v2.png',
    description: 'Cross-platform mobile application for iOS & Android powering Inspire Holdings client services with real-time push notifications, offline storage, and cloud sync.',
    blueprint: 'Mobile App (Expo) ➔ Offline Storage Sync ➔ Cloud API Endpoints ➔ Push Notification Server',
    metrics: [
      { label: 'Native 60 FPS', desc: 'React Native & Expo Suite', icon: Zap },
      { label: 'Offline First', desc: 'AsyncStorage & Zustand Sync', icon: ShieldCheck },
      { label: 'Cross-Platform', desc: 'iOS & Android Dual Build', icon: Sparkles }
    ],
    highlights: [
      'Cross-Platform iOS & Android App Bundle',
      'Offline Caching & State Synchronization',
      'Push Notifications & Mobile Biometrics',
      'App Store & Play Store Ready Deliverables'
    ],
    tags: ['React Native (Expo)', 'TypeScript', 'Supabase', 'Firebase', 'Zustand', 'Mobile'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 4,
    title: 'IamWallet Admin',
    category: 'Full-Stack Web',
    image: '/images/project_confidential_admin.png',
    description: 'Secure fintech administrative engine for IamWallet, managing digital transaction monitoring, wallet balance ledger audits, and user verification workflows.',
    blueprint: 'Admin Dashboard (React) ➔ Ledger Audit Engine (.NET/NestJS) ➔ Redis Cache ➔ PostgreSQL DB',
    metrics: [
      { label: 'Fintech Audit', desc: 'Real-time Ledger Monitoring', icon: Zap },
      { label: 'Secure Pipeline', desc: '.NET & NestJS Microservices', icon: ShieldCheck },
      { label: 'High Throughput', desc: 'Sub-millisecond Redis Caching', icon: Sparkles }
    ],
    highlights: [
      'Full-Stack Fintech Administrative Suite',
      'Real-time Transaction Auditing Engine',
      'High-Throughput Balance Reconciliation',
      'Redis Performance In-Memory Caching'
    ],
    tags: ['NestJS', '.NET Framework', 'React', 'Redis', 'PostgreSQL', 'TypeScript'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 5,
    title: 'IamWallet Application',
    category: 'Mobile (Expo)',
    image: '/images/iamwallet_app.png',
    description: 'Feature-rich mobile fintech wallet (I\'M Pay) for iOS & Android providing secure digital money transfers, smart digital cards, QR payments, investment campaign plans, and real-time transaction tracking.',
    blueprint: 'Mobile Wallet (Expo) ➔ Smart Digital Card Engine ➔ Firebase & Supabase ➔ REST APIs',
    metrics: [
      { label: 'Instant Transfers', desc: 'QR & Digital Card Flow', icon: Zap },
      { label: 'Biometric Auth', desc: 'Encrypted Wallet Vault', icon: ShieldCheck },
      { label: 'Smart Analytics', desc: 'Investment Campaign Tracker', icon: Sparkles }
    ],
    highlights: [
      'Smart Digital Wallet & QR Payment Engine',
      'Investment Campaign & Metric Dashboard',
      'Secure Mobile Payment Flow Integration',
      'Real-time Transaction Tracking System'
    ],
    tags: ['React Native (Expo)', 'Firebase', 'TypeScript', 'Fintech', 'REST API', 'Zustand'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 6,
    title: 'Budget Planner Web',
    category: 'Full-Stack Web',
    image: '/images/budget_planner_web.jpg',
    description: 'Full-stack personal finance and budgeting platform featuring real-time financial tracking, category budget allocations, daily allowance calculations, savings milestone goals, and dynamic cash flow visualizers.',
    blueprint: 'Client (React 19/Vite) ➔ Express REST API ➔ Prisma ORM ➔ PostgreSQL DB + Supabase Auth',
    metrics: [
      { label: 'Real-time Analytics', desc: 'Interactive Recharts & Cashflow Streams', icon: Zap },
      { label: 'Daily Allowance', desc: 'Dynamic Allowance & Savings Engine', icon: ShieldCheck },
      { label: 'Prisma + Supabase', desc: 'PostgreSQL Relational Storage & Auth', icon: Sparkles }
    ],
    highlights: [
      'Interactive Recharts Financial Analytics & Cashflow UI',
      'Express REST Microservice with Prisma ORM & PostgreSQL',
      'Supabase Authentication & Encrypted Session Layer',
      'Savings Milestone Goals with Trash Bin & 7-Day Auto Recovery'
    ],
    tags: ['React 19', 'Vite', 'Express', 'Prisma ORM', 'PostgreSQL', 'Supabase', 'Recharts', 'Framer Motion'],
    projectUrl: 'https://github.com/manokkk/BudgetPlanner'
  },
  {
    id: 7,
    title: 'Budget Planner Application',
    category: 'Mobile (Expo)',
    image: '/images/budget_planner_app.jpg',
    description: 'Cross-platform personal finance mobile application for iOS & Android built with React Native (Expo). Features daily allowance calculations, daily expense history tracking matching web behavior, budget envelopes, savings goals, and offline persistence.',
    blueprint: 'Mobile Client (Expo 54/React Native 0.81) ➔ React Navigation ➔ AsyncStorage ➔ Express API / Supabase',
    metrics: [
      { label: 'Daily Allowance', desc: 'Calculated daily spending limits & history', icon: Zap },
      { label: 'Expo 54 Native', desc: '60 FPS Reanimated & Native Gestures', icon: ShieldCheck },
      { label: 'EAS Android Builds', desc: 'Preview APK & Production AAB Ready', icon: Sparkles }
    ],
    highlights: [
      'Expo 54 & React Native Reanimated Touch Experience',
      'AsyncStorage Offline Persistence & Express REST Client',
      'Supabase Session Token Persistence & User Isolation',
      'Expo EAS Build Pipeline (Android APK & Production AAB)'
    ],
    tags: ['React Native', 'Expo', 'Supabase', 'React 19', 'Reanimated', 'AsyncStorage', 'REST API'],
    projectUrl: 'https://github.com/manokkk/BudgetPlannerMobile'
  },
  {
    id: 8,
    title: 'ISAP — TUPT Thesis Archive',
    category: 'AI & ML',
    image: '/images/project_ai_platform.jpg',
    description: 'ISAP (Intelligent Search & Access Platform) — A role-based digital repository featuring a machine learning semantic search engine and AI-driven thesis improvement module. Reached 90% search accuracy with sub-5-second retrieval times.',
    blueprint: 'Next.js Frontend ➔ FastAPI Microservice ➔ Semantic Search Vector Index ➔ PostgreSQL Storage',
    metrics: [
      { label: '<5s Retrieval', desc: '90% Search Accuracy', icon: Zap },
      { label: 'AI Thesis Module', desc: 'Automated Insight Assistant', icon: ShieldCheck },
      { label: 'Vector Index', desc: 'FastAPI & Semantic Models', icon: Sparkles }
    ],
    highlights: [
      'ML Semantic Search Engine (<5s Retrieval)',
      'AI Thesis Improvement & Analysis Module',
      'Role-Based Digital Archive & Security',
      'Continuous Automated Usability & Performance QA'
    ],
    tags: ['Next.js', 'FastAPI', 'Python', 'ML / Vector Search', 'PostgreSQL', 'Tailwind CSS'],
    projectUrl: 'https://github.com/manokkk'
  },
  {
    id: 9,
    title: 'IoT Embedded Hardware & Telemetry System',
    category: 'IoT Hardware',
    image: '/images/project_iot_hardware.jpg',
    description: 'Real-time micro-controller automation system communicating with backend RESTful APIs for hardware sensor telemetry and remote device execution.',
    blueprint: 'Embedded Boards (Raspberry Pi/ESP32) ➔ Telemetry Ingestion ➔ FastAPI Engine ➔ Docker Container',
    metrics: [
      { label: 'Real-time Telemetry', desc: 'Raspberry Pi & ESP32 Boards', icon: Zap },
      { label: 'Async REST API', desc: 'High-speed FastAPI Ingestion', icon: ShieldCheck },
      { label: 'Containerized', desc: 'Docker Automated Pipeline', icon: Sparkles }
    ],
    highlights: [
      'Micro-Controller Firmware Automation',
      'Asynchronous Telemetry RESTful API',
      'Real-time Sensor Monitoring Stream',
      'Containerized Docker Deployment Pipeline'
    ],
    tags: ['Raspberry Pi', 'ESP32', 'Python', 'FastAPI', 'Docker', 'IoT Telemetry'],
    projectUrl: 'https://github.com/manokkk'
  }
];
