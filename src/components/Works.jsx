import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  X, 
  CheckCircle2, 
  FolderGit2, 
  Globe, 
  Smartphone, 
  Cpu, 
  Database, 
  ArrowRight,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalTab, setModalTab] = useState('overview');

  const categories = ['All', 'Full-Stack Web', 'Mobile (Expo)', 'AI & ML', 'IoT Hardware'];

  const worksData = [
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
      id: 7,
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

  const filteredWorks = activeCategory === 'All'
    ? worksData
    : worksData.filter(item => item.category === activeCategory);

  const handleOpenModal = (work) => {
    setSelectedProject(work);
    setModalTab('overview');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Full-Stack Web':
        return <Globe className="w-5 h-5" style={{ color: '#38bdf8' }} />;
      case 'Mobile (Expo)':
        return <Smartphone className="w-5 h-5" style={{ color: '#34d399' }} />;
      case 'AI & ML':
        return <Cpu className="w-5 h-5" style={{ color: '#c084fc' }} />;
      case 'IoT Hardware':
        return <Database className="w-5 h-5" style={{ color: '#fbbf24' }} />;
      default:
        return <Globe className="w-5 h-5" style={{ color: '#38bdf8' }} />;
    }
  };

  const getDeliverableSpecMeta = (project, index) => {
    const modules = ['01 / FRONTEND', '02 / BACKEND', '03 / SECURITY', '04 / DEPLOYMENT'];
    const statuses = ['● DEPLOYED', '● ACTIVE', '● ENCRYPTED', '● VERIFIED'];
    return {
      module: modules[index % modules.length],
      status: statuses[index % statuses.length]
    };
  };

  const getCategoryGlow = (category) => {
    switch (category) {
      case 'Full-Stack Web':
        return { bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' };
      case 'Mobile (Expo)':
        return { bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' };
      case 'AI & ML':
        return { bg: 'rgba(192, 132, 252, 0.12)', border: 'rgba(192, 132, 252, 0.3)' };
      case 'IoT Hardware':
        return { bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)' };
      default:
        return { bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' };
    }
  };

  return (
    <section id="projects" className="container-custom py-16">
      {/* Header & Filter Tabs */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="section-title section-title-glow">Projects</h2>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Works Grid */}
      <div className="work-grid">
        {filteredWorks.map((work) => {
          return (
            <div key={work.id}>
              <div 
                className="work-card group"
                onClick={() => handleOpenModal(work)}
              >
                <div className="card-img-box">
                  {work.image ? (
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      className="card-img"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12141f] to-[#1a1d2e] p-4 text-center border-b border-white/10 group-hover:from-[#181b2c] group-hover:to-[#22263d] transition-colors">
                      <FolderGit2 className="w-10 h-10 text-sky-400/80 mb-2" />
                      <span className="text-xs font-mono font-semibold text-slate-300 line-clamp-1">{work.title}</span>
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <div>
                    <span className="card-category">
                      {work.category}
                    </span>
                    <div className="card-title-row">
                      <h3 className="card-title" title={work.title}>
                        {work.title}
                      </h3>
                      <ArrowUpRight className="card-title-icon text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Cyber-Terminal Inspector Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="service-modal-header">
              <div 
                className="service-modal-icon-box"
                style={{ 
                  backgroundColor: getCategoryGlow(selectedProject.category).bg,
                  borderColor: getCategoryGlow(selectedProject.category).border
                }}
              >
                {getCategoryIcon(selectedProject.category)}
              </div>
              <div>
                <span className="service-modal-badge">{selectedProject.category}</span>
                <h3 className="service-modal-title">{selectedProject.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="service-modal-desc">
              {selectedProject.description}
            </p>

            {/* Interactive Inspector Tab Navigation Bar */}
            <div className="inspector-tab-nav">
              <button
                onClick={() => setModalTab('overview')}
                className={`inspector-tab-btn ${modalTab === 'overview' ? 'active' : ''}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overview & Deliverables</span>
              </button>
              <button
                onClick={() => setModalTab('architecture')}
                className={`inspector-tab-btn ${modalTab === 'architecture' ? 'active' : ''}`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Cyber Terminal</span>
              </button>
              <button
                onClick={() => setModalTab('tech')}
                className={`inspector-tab-btn ${modalTab === 'tech' ? 'active' : ''}`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Tech Stack</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW & DELIVERABLES */}
            {modalTab === 'overview' && (
              <div>


                {/* Interactive Terminal Spec Matrix Table */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                    <h4 className="modal-section-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Terminal className="w-4 h-4" style={{ color: '#38bdf8' }} />
                      <span>CORE DELIVERABLES & SPECIFICATION MATRIX</span>
                    </h4>
                    <span className="terminal-badge-active" style={{ fontSize: '0.625rem' }}>
                      ● {selectedProject.highlights.length} Verified Modules
                    </span>
                  </div>

                  <div className="spec-table-wrapper">
                    <table className="spec-table">
                      <thead>
                        <tr>
                          <th>MODULE</th>
                          <th>DELIVERABLE SPECIFICATION</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.highlights.map((h, i) => {
                          const meta = getDeliverableSpecMeta(selectedProject, i);
                          return (
                            <tr key={i}>
                              <td>
                                <span className="spec-module-tag">{meta.module}</span>
                              </td>
                              <td>
                                <span className="spec-title-text">{h}</span>
                              </td>
                              <td>
                                <span className="spec-status-active">{meta.status}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CYBER TERMINAL ARCHITECTURE */}
            {modalTab === 'architecture' && (
              <div className="cyber-terminal-window">
                <div className="cyber-terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                    <span className="terminal-title">architecture.topology.ts</span>
                  </div>
                  <span className="terminal-badge-active">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Pipeline Active</span>
                  </span>
                </div>

                <div className="terminal-body">
                  <div className="terminal-comment">// Execution Topology</div>
                  <div className="terminal-flow-box">
                    <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{selectedProject.blueprint}</span>
                  </div>

                  <div className="terminal-comment" style={{ marginTop: '1rem' }}>// System Infrastructure Layers</div>
                  <div className="terminal-layers-grid">
                    <div className="terminal-layer-card">
                      <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>01.</span>
                      <span>Frontend: Client UI & SSR</span>
                    </div>
                    <div className="terminal-layer-card">
                      <span style={{ color: '#818cf8', fontWeight: 'bold' }}>02.</span>
                      <span>Gateway: REST & JWT Auth</span>
                    </div>
                    <div className="terminal-layer-card">
                      <span style={{ color: '#c084fc', fontWeight: 'bold' }}>03.</span>
                      <span>Cache: Redis Low-Latency</span>
                    </div>
                    <div className="terminal-layer-card">
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>04.</span>
                      <span>Database: Relational/Vector</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TECH STACK */}
            {modalTab === 'tech' && (
              <div>
                <h4 className="blueprint-label" style={{ marginBottom: '0.5rem' }}>LEVERAGED TECHNOLOGIES & TOOLS</h4>
                <div className="tech-pills-wrap">
                  {selectedProject.tags.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="blueprint-box" style={{ marginTop: '1rem' }}>
                  <span className="blueprint-label">ENGINEERING & DEPLOYMENT INTEGRITY</span>
                  <p className="service-modal-desc" style={{ marginBottom: 0 }}>
                    Built according to strict software design patterns, type safety (TypeScript), continuous performance optimization, and modular component architecture.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="modal-footer-row" style={{ justifyContent: 'flex-end' }}>
              <a
                href={selectedProject.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-request-btn"
                style={{ textDecoration: 'none' }}
              >
                <span>EXPLORE PROJECT ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
