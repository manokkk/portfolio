import React, { useState } from 'react';
import { ArrowUpRight, X, ExternalLink, CheckCircle2, FolderGit2 } from 'lucide-react';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Full-Stack Web', 'Mobile (Expo)', 'AI & ML', 'IoT Hardware'];

  const worksData = [
    {
      id: 1,
      title: 'Inspire Holdings Website',
      category: 'Full-Stack Web',
      image: '/images/inspire_website.png',
      description: 'Full-stack corporate enterprise web platform for Inspire Holdings, built with responsive architecture, optimized server-side rendering, and modern user interface components.',
      highlights: [
        'Built full-stack web application leveraging Next.js, React, and Tailwind CSS',
        'Optimized server-side page rendering, SEO, and web performance metrics',
        'Integrated responsive component architecture and dynamic content workflows'
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 2,
      title: 'Inspire Holdings Admin V2',
      category: 'Full-Stack Web',
      image: '/images/project_confidential_admin.png',
      description: 'Next-generation enterprise administration dashboard providing real-time data analytics, role-based access control (RBAC), and backend system monitoring.',
      highlights: [
        'Architected scalable admin portal using Next.js, NestJS, and PostgreSQL',
        'Implemented secure JWT authentication and fine-grained permissions system',
        'Integrated Redis caching for low-latency dashboard state & analytical data'
      ],
      tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 3,
      title: 'Inspire Holdings Application V2',
      category: 'Mobile (Expo)',
      image: '/images/inspire_app_v2.png',
      description: 'Cross-platform mobile application for iOS & Android powering Inspire Holdings client services with real-time push notifications, offline storage, and cloud sync.',
      highlights: [
        'Engineered cross-platform mobile apps with React Native & Expo framework',
        'Integrated real-time database architecture using Supabase & Firebase',
        'Delivered native mobile performance with seamless multi-device support'
      ],
      tags: ['React Native (Expo)', 'TypeScript', 'Supabase', 'Firebase', 'Mobile'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 4,
      title: 'IamWallet Admin',
      category: 'Full-Stack Web',
      image: '/images/project_confidential_admin.png',
      description: 'Secure fintech administrative engine for IamWallet, managing digital transaction monitoring, wallet balance ledger audits, and user verification workflows.',
      highlights: [
        'Designed full-stack admin suite using NestJS, .NET Framework, and React',
        'Implemented real-time transaction auditing and balance reconciliation',
        'Integrated Redis caching for high throughput transaction processing'
      ],
      tags: ['NestJS', '.NET', 'React', 'Redis', 'PostgreSQL'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 5,
      title: 'IamWallet Application',
      category: 'Mobile (Expo)',
      image: '/images/iamwallet_app.png',
      description: 'Feature-rich mobile fintech wallet (I\'M Pay) for iOS & Android providing secure digital money transfers, smart digital cards, QR payments, investment campaign plans, and real-time transaction tracking.',
      highlights: [
        'Developed iOS & Android mobile app using React Native (Expo) & TypeScript',
        'Engineered Smart Digital Wallet interface with card & QR payment flows',
        'Integrated Investment Campaign modules with real-time financial metrics'
      ],
      tags: ['React Native (Expo)', 'Firebase', 'TypeScript', 'Fintech', 'REST API'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 6,
      title: 'ISAP — TUPT Thesis Archive: Intelligent Search & Access Platform',
      category: 'AI & ML',
      image: '/images/project_ai_platform.jpg',
      description: 'A role-based digital repository featuring a machine learning semantic search engine and AI-driven thesis improvement module. Reached 90% search accuracy with sub-5-second retrieval times.',
      highlights: [
        'ML Semantic Search Engine achieving sub-5s retrieval times & 90% accuracy',
        'Role-based digital repository with secure authentication & data integrity',
        'Continuous QA strategies across security, performance, and usability testing'
      ],
      tags: ['Next.js', 'FastAPI', 'Python', 'ML / Semantic Search', 'PostgreSQL'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 7,
      title: 'IoT Embedded Hardware & Telemetry System',
      category: 'IoT Hardware',
      image: '/images/project_iot_hardware.jpg',
      description: 'Real-time micro-controller automation system communicating with backend RESTful APIs for hardware sensor telemetry and remote device execution.',
      highlights: [
        'Programmed embedded controllers on Raspberry Pi and ESP32 boards',
        'Engineered fast asynchronous RESTful APIs using Python and FastAPI',
        'Docker containerized deployment pipeline'
      ],
      tags: ['Raspberry Pi', 'ESP32', 'Python', 'FastAPI', 'Docker'],
      projectUrl: 'https://github.com/manokkk'
    }
  ];

  const filteredWorks = activeCategory === 'All'
    ? worksData
    : worksData.filter(item => item.category === activeCategory);

  const handleOpenModal = (work) => {
    setSelectedProject(work);
    setActiveImage(work.images?.[0] || work.image);
  };

  return (
    <section id="projects" className="container-custom py-16">
      <h2 className="section-title">Works & Projects</h2>

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

      {/* Works Grid */}
      <div className="work-grid">
        {filteredWorks.map((work) => (
          <div 
            key={work.id} 
            className="work-card group"
            onClick={() => handleOpenModal(work)}
          >
            <div className="card-img-box">
              {work.image ? (
                <img src={work.image} alt={work.title} className="card-img" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12141f] to-[#1a1d2e] p-4 text-center border-b border-white/10 group-hover:from-[#181b2c] group-hover:to-[#22263d] transition-colors">
                  <FolderGit2 className="w-10 h-10 text-sky-400/80 mb-2" />
                  <span className="text-xs font-mono font-semibold text-slate-300 line-clamp-1">{work.title}</span>
                </div>
              )}
            </div>
            <div className="card-content">
              <span className="card-category">{work.category}</span>
              <h3 className="card-title flex items-center justify-between">
                <span>{work.title}</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 shrink-0" />
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-box max-w-2xl overflow-x-hidden" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <span className="card-category mb-2 block">{selectedProject.category}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>

            {/* Modal Image Showcase with Multi-image gallery support */}
            <div className="mb-6 w-full">
              {activeImage || selectedProject.image ? (
                <div 
                  className="w-full rounded-2xl overflow-hidden bg-[#0a0b12] border border-white/10 flex items-center justify-center p-3 text-center"
                  style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img 
                    src={activeImage || selectedProject.image} 
                    alt={selectedProject.title} 
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      margin: '0 auto',
                      display: 'block'
                    }}
                    className="rounded-lg shadow-xl" 
                  />
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                  <FolderGit2 className="w-12 h-12 text-sky-400 mb-3" />
                  <span className="text-sm font-mono font-bold text-white mb-1">{selectedProject.title}</span>
                  <span className="text-xs text-slate-400 font-mono">Image upload pending</span>
                </div>
              )}

              {/* Thumbnails Gallery Slider for Multi-image projects */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="flex gap-2.5 justify-center mt-3">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all bg-slate-950 p-1 ${
                        activeImage === img 
                          ? 'border-sky-400 scale-105 shadow-md shadow-sky-500/20' 
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                      title={`Screen ${idx + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-white mb-3">Key Project Deliverables & Impact</h4>
              <ul className="space-y-2 list-none p-0 m-0">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((t) => (
                <span key={t} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <a
                href={selectedProject.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn-white text-xs"
              >
                <span>VIEW PROJECT ARCHIVE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
