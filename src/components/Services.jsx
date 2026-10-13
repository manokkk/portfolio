import React, { useState, useRef } from 'react';
import { 
  Layout, 
  Smartphone, 
  Database, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Code2, 
  Layers, 
  Clock, 
  X, 
  ShieldCheck, 
  Rocket, 
  ChevronRight, 
  Calculator, 
  Server,
  Globe,
  Check,
  RefreshCw
} from 'lucide-react';
import { useScrollPhysics } from '../hooks/useScrollPhysics';

export default function Services({ onRequestInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  
  const { scrollY, viewportH, getElementPhysics } = useScrollPhysics();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);



  const categories = ['All', 'Web & Mobile', 'Cloud & DB', 'Security', 'AI & IoT'];

  const services = [
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

  const handleRequestServiceFromModal = (service) => {
    setSelectedServiceModal(null);
    const topic = service.title;
    const message = `Hi Mico, I would like to inquire about your "${service.title}" service (${service.tagline}).\n\nProject Scope & Key Needs:\n- Deliverables: ${service.deliverables.slice(0, 2).join(', ')}\n- Target Timeline: ${service.timeline}\n\nLet's connect to discuss timing and specifications!`;
    
    if (onRequestInquiry) {
      onRequestInquiry(topic, message);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const headerPhysics = getElementPhysics(headerRef.current, {
    maxLift: 32,
    focalZone: 0.35,
    minOpacity: 0.22
  });

  return (
    <section id="services" ref={sectionRef} className="container-custom py-16 relative">
      
      {/* Header & Filter Tabs with Fade & Lift In/Out */}
      <div 
        ref={headerRef}
        style={{
          opacity: headerPhysics.opacity,
          transform: `translateY(${headerPhysics.translateY}px) scale(${headerPhysics.scale})`,
          transition: 'opacity 0.06s ease-out, transform 0.06s ease-out',
          willChange: 'opacity, transform'
        }}
      >
        <div className="flex flex-col items-start mb-8">
          <h2 className="section-title section-title-glow mb-2">Services & Tech Stack</h2>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-tabs mb-8">
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

      {/* Services Grid (3-column responsive grid matching CSS with Continuous Scroll Physics) */}
      <div className="services-grid">
        {filteredServices.map((service, idx) => {
          const Icon = service.icon;
          const cardPhysics = getElementPhysics(cardRefs.current[idx], {
            col: idx % 3,
            maxLift: 46,
            maxTilt: 5.5,
            focalZone: 0.32,
            minOpacity: 0.20,
            minScale: 0.88
          });

          return (
            <div 
              key={service.id} 
              ref={el => cardRefs.current[idx] = el}
              className="scroll-anchor"
            >
              <div 
                className="service-card group cursor-pointer"
                style={{
                  opacity: cardPhysics.opacity,
                  transform: `translateY(${cardPhysics.totalOffsetY}px) scale(${cardPhysics.scale}) perspective(1000px) rotateX(${cardPhysics.rotateX}deg) rotateY(${cardPhysics.rotateY}deg)`,
                  transition: 'opacity 0.06s ease-out, transform 0.06s ease-out',
                  willChange: 'opacity, transform'
                }}
                onClick={() => setSelectedServiceModal(service)}
              >
                {/* Card Content Top */}
                <div>
                  {/* Header Row: Icon + Badge with Floating Parallax */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="service-icon-box"
                      style={{ 
                        backgroundColor: service.bgGlow,
                        borderColor: service.borderColor,
                        transform: `translateY(${cardPhysics.iconOffsetY}px) rotate(${cardPhysics.iconRot}deg)`,
                        transition: 'transform 0.06s ease-out'
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                    <span 
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                      style={{
                        transform: `translateX(${cardPhysics.tagDrift}px)`,
                        transition: 'transform 0.06s ease-out',
                        display: 'inline-block'
                      }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Arrow */}
                  <h3 className="service-title flex items-center justify-between group-hover:text-sky-300 transition-colors">
                    <span>{service.title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-1" />
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-[11px] font-mono text-sky-400/90 mb-2">{service.tagline}</p>
                  
                  {/* Short Description */}
                  <p className="service-desc mb-4">
                    {service.description}
                  </p>

                  {/* Capabilities checklist */}
                  <div className="service-cap-list">
                    {service.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="service-cap-item">
                        <CheckCircle2 className="service-cap-icon" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Row */}
                <div className="service-card-footer">
                  <div className="service-footer-left">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. {service.timeline}</span>
                  </div>
                  <div className="service-footer-right">
                    <span>View Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Service Detail Modal */}
      {/* ------------------------------------------------------------- */}
      {selectedServiceModal && (
        <div className="modal-backdrop" onClick={() => setSelectedServiceModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedServiceModal(null)}
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="service-modal-header">
              <div 
                className="service-modal-icon-box"
                style={{ 
                  backgroundColor: selectedServiceModal.bgGlow,
                  borderColor: selectedServiceModal.borderColor
                }}
              >
                {React.createElement(selectedServiceModal.icon, { 
                  className: "w-5 h-5", 
                  style: { color: selectedServiceModal.color } 
                })}
              </div>
              <div>
                <span className="service-modal-badge">{selectedServiceModal.badge}</span>
                <h3 className="service-modal-title">{selectedServiceModal.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="service-modal-desc">
              {selectedServiceModal.description}
            </p>

            {/* Architecture Blueprint Box */}
            <div className="blueprint-box">
              <span className="blueprint-label">
                SYSTEM ARCHITECTURE BLUEPRINT
              </span>
              <p className="blueprint-text">
                {selectedServiceModal.architectureBlueprint}
              </p>
            </div>

            {/* Core Deliverables */}
            <div>
              <h4 className="modal-section-title">Core Deliverables & Outputs</h4>
              <div className="deliverables-grid">
                {selectedServiceModal.deliverables.map((del, i) => (
                  <div key={i} className="deliverable-item">
                    <CheckCircle2 className="deliverable-icon" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4 className="blueprint-label" style={{ marginBottom: '0.5rem' }}>LEVERAGED TECHNOLOGIES & TOOLS</h4>
              <div className="tech-pills-wrap">
                {selectedServiceModal.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="modal-footer-row">
              <div className="modal-footer-left">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Timeline: {selectedServiceModal.timeline}</span>
              </div>

              <button
                onClick={() => handleRequestServiceFromModal(selectedServiceModal)}
                className="modal-request-btn"
              >
                <span>REQUEST THIS SERVICE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}


