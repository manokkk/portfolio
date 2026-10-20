import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Layers } from 'lucide-react';
import { getProjectById, ALL_PROJECTS } from '../data/arkiveProjectsData';
import { ARKIVE_SITE_DIRECTORY } from '../data/arkiveData';
import arkiveLogo from '../assets/arkive/arkive-logo-1024.webp';
import '../styles/arkive.css';

export default function ArkiveProjectDetailPage({ projectId, onNavigate, onNavigateBack }) {
  const project = getProjectById(projectId) || ALL_PROJECTS['proj-1'];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Guarantee instant scroll to top on mount or when project changes
  useLayoutEffect(() => {
    setActiveImageIndex(0);
    setDirection(0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [projectId]);

  const currentImage = project.gallery[activeImageIndex] || project.gallery[0];
  const nextProject = project.nextProjectId ? ALL_PROJECTS[project.nextProjectId] : null;

  const handlePrevImage = () => {
    setDirection(-1);
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
  };

  const handleNextImage = () => {
    setDirection(1);
    setActiveImageIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
  };

  const handleSelectIndex = (idx) => {
    setDirection(idx > activeImageIndex ? 1 : -1);
    setActiveImageIndex(idx);
  };

  // Keyboard navigation for image switcher & escape back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') onNavigateBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project.gallery.length, onNavigateBack]);

  return (
    <div className="arkive-page arkive-detail-page">
      {/* Floating return pill */}
      <button 
        type="button"
        className="arkive-route-badge"
        onClick={() => onNavigate('/')}
        aria-label="Return to portfolio"
      >
        <Compass size={16} aria-hidden="true" />
        <span>Return to Portfolio (/)</span>
      </button>

      {/* Arkive Header Navigation */}
      <header className="arkive-header">
        <div className="arkive-wrap arkive-header-inner">
          <button 
            type="button" 
            className="arkive-brand" 
            onClick={() => onNavigate('/arkive')} 
            aria-label="Arkive Design Studio Home"
          >
            <img src={arkiveLogo} alt="Arkive Design Studio" className="arkive-brand-logo" />
          </button>

          <nav className="arkive-nav" aria-label="Arkive Primary Navigation">
            <button type="button" className="arkive-nav-link-btn" onClick={() => onNavigate('/arkive#home')}>Home</button>
            <button type="button" className="arkive-nav-link-btn" onClick={() => onNavigate('/arkive#studio')}>Studio</button>
            <button type="button" className="arkive-nav-link-btn is-active" onClick={() => onNavigate('/arkive/projects')}>Projects</button>
            <button type="button" className="arkive-nav-link-btn" onClick={() => onNavigate('/arkive#divisions')}>Divisions</button>
            <button type="button" className="arkive-nav-link-btn" onClick={() => onNavigate('/arkive#process')}>Process</button>
            <button type="button" className="arkive-nav-link-btn" onClick={() => onNavigate('/arkive#faq')}>FAQ</button>
            <a href="mailto:info@arkivedesignstudio.com" className="arkive-nav-cta">
              Let's Talk <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      {/* Sub-Header Navigation Bar */}
      <div className="arkive-detail-subnav-bar">
        <div className="arkive-wrap arkive-detail-subnav">
          <button 
            type="button" 
            className="arkive-back-link"
            onClick={onNavigateBack}
            aria-label={`Return to ${project.categoryName} projects`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to {project.categoryName}</span>
          </button>

          <div className="arkive-detail-breadcrumbs" aria-label="Breadcrumb">
            <span>Selected Work</span>
            <span className="crumb-sep">/</span>
            <button 
              type="button" 
              className="crumb-link" 
              onClick={() => onNavigate(`/arkive/projects?category=${project.categoryId}`)}
            >
              {project.categoryName}
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{project.title}</span>
          </div>
        </div>
      </div>

      <main className="arkive-wrap arkive-detail-content" role="main">
        {/* Project Title & Statement Header */}
        <div className="arkive-detail-header">
          <p className="eyebrow">{project.tag}</p>
          <h1 className="arkive-detail-title">{project.title}</h1>
          {project.subtitle && <p className="arkive-detail-subtitle">{project.subtitle}</p>}
        </div>

        {/* 2-Column Editorial Grid: Visual Showcase & Architectural Context */}
        <div className="arkive-detail-grid">
          {/* Main Visual Column */}
          <section className="arkive-detail-visuals" aria-label="Project Visual Presentation">
            <div className="arkive-detail-image-stage">
              {project.gallery.length > 1 && (
                <>
                  <button 
                    type="button" 
                    onClick={handlePrevImage}
                    className="arkive-stage-nav-btn prev"
                    aria-label="Previous project view"
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                  </button>

                  <button 
                    type="button" 
                    onClick={handleNextImage}
                    className="arkive-stage-nav-btn next"
                    aria-label="Next project view"
                  >
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div 
                  key={currentImage.id}
                  className="arkive-detail-slide"
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ 
                    x: { type: 'spring', stiffness: 400, damping: 28 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    const swipeVelocity = 0.2;
                    if (offset.x < -swipeThreshold || velocity.x < -swipeVelocity) {
                      handleNextImage();
                    } else if (offset.x > swipeThreshold || velocity.x > swipeVelocity) {
                      handlePrevImage();
                    }
                  }}
                >
                  <img 
                    src={currentImage.src} 
                    alt={currentImage.title} 
                    className="arkive-detail-img"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Centered Numbered Image Index Selector */}
            {project.gallery.length > 1 && (
              <div className="arkive-detail-gallery-bar">
                <div className="arkive-gallery-indexes" role="tablist" aria-label="Project Image Views">
                  {project.gallery.map((img, idx) => (
                    <button 
                      key={img.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeImageIndex}
                      className={`arkive-gallery-dot-btn ${idx === activeImageIndex ? 'is-active' : ''}`}
                      onClick={() => handleSelectIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Caption */}
            <div className="arkive-detail-image-caption">
              <strong>{currentImage.title}</strong>
            </div>
          </section>

          {/* Context Sidebar */}
          <aside className="arkive-detail-sidebar" aria-label="Project Architectural Details">
            <div className="arkive-detail-lead-block">
              <h2 className="sr-only">Project Narrative</h2>
              <p className="arkive-detail-lead">{project.lead}</p>
              <p className="arkive-detail-desc">{project.desc}</p>
            </div>

            {/* Architectural Focus Badges */}
            <div className="arkive-detail-focus-card">
              <div className="focus-header">
                <Layers size={16} aria-hidden="true" />
                <span>Production &amp; Design Focus</span>
              </div>
              <p className="focus-text">{project.focus}</p>
            </div>

            {/* Technical Metadata Table */}
            <div className="arkive-detail-spec-table">
              <div className="spec-row">
                <span className="spec-label">Location / Context</span>
                <span className="spec-value">{project.location}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Project Typology</span>
                <span className="spec-value">{project.typology}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Deliverables</span>
                <span className="spec-value">{project.deliverables}</span>
              </div>
            </div>

            {/* Contact Callout */}
            <div className="arkive-detail-cta-card">
              <h3>Have a project in need of architectural production?</h3>
              <p>Revit, CAD, 3D visualization, and design development tailored to your firm's standards.</p>
              <a href="mailto:info@arkivedesignstudio.com" className="button-link">
                Discuss Your Project <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>

        {/* Next Project Teaser */}
        {nextProject && (
          <section className="arkive-next-project-banner" aria-label="Next Project">
            <div className="next-label">
              <span>Up Next</span>
              <span className="next-cat">{nextProject.categoryName}</span>
            </div>
            <div className="next-main">
              <h3 className="next-title">{nextProject.title}</h3>
              <p className="next-desc">{nextProject.subtitle || nextProject.lead}</p>
            </div>
            <button 
              type="button" 
              className="next-btn"
              onClick={() => onNavigate(`/arkive/project?id=${nextProject.id}`)}
              aria-label={`Go to next project: ${nextProject.title}`}
            >
              <span>View Project</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </section>
        )}
      </main>

      {/* Architectural Footer */}
      <footer className="arkive-footer">
        <div className="arkive-wrap">
          <div className="arkive-footer-cta">
            <div>
              <div className="eyebrow">Your next project starts here</div>
              <h2>
                Your next project.
                <br />
                Let’s make it happen.
              </h2>
            </div>
            <a 
              href="mailto:info@arkivedesignstudio.com"
              className="arkive-btn-primary"
              aria-label="Contact Arkive team today"
            >
              Let's Talk to Our Team <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="arkive-footer-grid">
            <div>
              <span className="arkive-brand-title">Arkive Design Studio</span>
              <p className="micro" style={{ marginTop: '8px' }}>CREATE &bull; DELIVER &bull; SCALE</p>
              <p style={{ marginTop: '14px', fontSize: '13px' }}>
                Connecting California architectural vision with high-precision Philippine production capability.
              </p>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: '10px' }}>Studio Location</div>
              <p>1409 Pablo Ocampo Sr. Ext, Makati City, Metro Manila</p>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="arkive-btn-link"
                style={{ fontSize: '12px' }}
              >
                View on Google Maps <ArrowUpRight size={12} />
              </a>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: '10px' }}>Say Hello</div>
              <p>
                <a href="mailto:info@arkivedesignstudio.com" style={{ fontWeight: 600 }}>
                  info@arkivedesignstudio.com
                </a>
              </p>
              <p style={{ fontSize: '13px' }}>Pacific &bull; Manila Standard Time</p>
            </div>
          </div>

          {/* Complete Architectural Site Directory */}
          <div className="arkive-footer-directory" aria-label="Arkive Complete Site Directory">
            {ARKIVE_SITE_DIRECTORY.map((col, idx) => (
              <div key={idx} className="arkive-footer-col">
                <span className="arkive-footer-col-title">{col.category}</span>
                <ul className="arkive-footer-links">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx} className="arkive-footer-link-item">
                      {link.isInternal ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate(`/arkive/projects?category=${link.categoryId || 'conceptual'}`);
                            }
                          }}
                          aria-label={`Navigate to ${link.label}`}
                        >
                          <span>{link.label}</span>
                          <span aria-hidden="true" style={{ fontSize: '10px', opacity: 0.6 }}>&rarr;</span>
                        </button>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label} (opens official page)`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight size={12} className="arkive-footer-link-ext-icon" aria-hidden="true" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="arkive-footer-bottom">
            <span>&copy; {new Date().getFullYear()} Arkive Design Studio. Redesigned with architectural fidelity.</span>
            <button 
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', font: 'inherit' }}
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
