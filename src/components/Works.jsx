import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  X, 
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
import { worksData } from '../data/projectsData';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalTab, setModalTab] = useState('overview');

  const categories = ['All', 'Full-Stack Web', 'Mobile (Expo)', 'AI & ML', 'IoT Hardware'];
  
  // Escape key and background scroll locking for project inspector modal
  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);


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
        <div className="filter-tabs" role="tablist" aria-label="Project Categories">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === cat}
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
              <button 
                type="button"
                className="work-card group"
                onClick={() => handleOpenModal(work)}
                aria-haspopup="dialog"
                aria-label={`View architecture and deliverables for ${work.title}`}
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
                      <ArrowUpRight className="card-title-icon text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Cyber-Terminal Inspector Modal with Spring Physics */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
          <motion.div 
            key="work-modal-backdrop"
            className="modal-backdrop" 
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.div 
              key="work-modal-box"
              className="modal-box" 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
            <button 
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
              title="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
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
                <h3 id="work-modal-title" className="service-modal-title">{selectedProject.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="service-modal-desc">
              {selectedProject.description}
            </p>

            {/* Interactive Inspector Tab Navigation Bar */}
            <div className="inspector-tab-nav" role="tablist" aria-label="Project Inspector Tabs">
              <button
                type="button"
                onClick={() => setModalTab('overview')}
                className={`inspector-tab-btn ${modalTab === 'overview' ? 'active' : ''}`}
                role="tab"
                aria-selected={modalTab === 'overview'}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Overview & Deliverables</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('architecture')}
                className={`inspector-tab-btn ${modalTab === 'architecture' ? 'active' : ''}`}
                role="tab"
                aria-selected={modalTab === 'architecture'}
              >
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Cyber Terminal</span>
              </button>
              <button
                type="button"
                onClick={() => setModalTab('tech')}
                className={`inspector-tab-btn ${modalTab === 'tech' ? 'active' : ''}`}
                role="tab"
                aria-selected={modalTab === 'tech'}
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
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
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}

    </section>
  );
}
