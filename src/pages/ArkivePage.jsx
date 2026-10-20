import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  X, 
  ArrowLeft, 
  Menu, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { 
  ARKIVE_META, 
  ARKIVE_HIGHLIGHTS, 
  ARKIVE_METRICS, 
  ARKIVE_DIVISIONS, 
  ARKIVE_STEPS, 
  ARKIVE_PROJECTS, 
  ARKIVE_FAQS,
  ARKIVE_SITE_DIRECTORY
} from '../data/arkiveData';
import '../styles/arkive.css';
import conceptualThumb from '../assets/arkive/conceptual-thmbnl-1280.webp';
import cafesThumb from '../assets/arkive/cafes-restaurant-thmbnl-1280.webp';
import arkiveLogo from '../assets/arkive/arkive-logo-1024.webp';
import heroPoster from '../assets/arkive/samsung-poster.webp';
import studioMakati from '../assets/arkive/studio-makati.webp';
import teamCollab from '../assets/arkive/team-collab.webp';

export default function ArkivePage({ onNavigateHome, onNavigateProjects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDivision, setExpandedDivision] = useState('01');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Keyboard navigation for project modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProject) return;
      if (e.key === 'Escape') {
        setActiveProject(null);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  const openProject = useCallback((project) => {
    setActiveProject(project);
    setActiveImageIndex(0);
  }, []);

  const openCategoryModal = useCallback((categoryId) => {
    const project = ARKIVE_PROJECTS.find(p => p.categoryId === categoryId);
    if (project) {
      openProject(project);
    }
  }, [openProject]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="arkive-page">
      {/* Floating Pill Switcher to Return to Developer Portfolio */}
      <motion.button 
        className="arkive-route-badge"
        onClick={onNavigateHome}
        aria-label="Return to Mico's Full Developer Portfolio"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Return to Portfolio (/)</span>
      </motion.button>

      {/* Arkive Header Navigation */}
      <header className="arkive-header">
        <div className="arkive-wrap arkive-header-inner">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="arkive-brand" aria-label="Arkive home">
            <img src={arkiveLogo} alt="Arkive Design Studio" className="arkive-brand-logo" />
          </a>

          <nav className="arkive-nav" aria-label="Arkive Primary Navigation">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#studio" onClick={(e) => { e.preventDefault(); scrollToSection('studio'); }}>Studio</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            <a href="#divisions" onClick={(e) => { e.preventDefault(); scrollToSection('divisions'); }}>Divisions</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>Process</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
            <button 
              type="button"
              className="arkive-nav-cta"
              onClick={() => setIsContactOpen(true)}
              aria-label="Contact Arkive Design Studio team"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              Let's Talk <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </nav>

          <button 
            type="button"
            className="arkive-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: '#fcfcfa', borderBottom: '1px solid var(--line)', padding: '20px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
                <a href="#studio" onClick={(e) => { e.preventDefault(); scrollToSection('studio'); }}>Studio</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
                <a href="#divisions" onClick={(e) => { e.preventDefault(); scrollToSection('divisions'); }}>Divisions</a>
                <a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>Process</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
                <button 
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setIsContactOpen(true); }}
                  className="arkive-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Let's Talk to Our Team <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        {/* Section 00: Architectural Hero */}
        <section id="home" className="arkive-wrap arkive-hero">
          <div className="arkive-hero-lead">
            <div className="eyebrow">
              <span className="status-dot"></span>
              {ARKIVE_META.tagline}
            </div>
            
            <h1>
              {ARKIVE_META.headlineLead}
              <br />
              <em>{ARKIVE_META.headlineSub}</em>
            </h1>

            <div className="arkive-hero-desc">
              <p className="lead">Architectural production that works like part of your team.</p>
              <p className="muted">{ARKIVE_META.description}</p>
            </div>

            <div className="arkive-actions">
              <button 
                type="button"
                className="arkive-btn-primary"
                onClick={() => scrollToSection('projects')}
                aria-label="Explore Arkive architectural projects"
              >
                Explore our work <ArrowUpRight size={17} aria-hidden="true" />
              </button>

              <button 
                type="button"
                className="arkive-btn-link"
                onClick={() => setIsContactOpen(true)}
                aria-label="Open contact consultation"
              >
                Let's Talk to Our Team <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="arkive-hero-visual">
            <img 
              src={heroPoster} 
              alt="Arkive Design Studio Architectural Showcase" 
              loading="eager"
            />
            <div className="arkive-hero-visual-caption">
              <span className="micro">01 / ARCHITECTURAL PRODUCTION</span>
              <span>Revit BIM &bull; Documentation &bull; Visualization</span>
            </div>
          </div>
        </section>

        {/* Section 01: The Studio */}
        <section id="studio" className="arkive-section">
          <div className="arkive-wrap">
            <div className="eyebrow">01 / The studio</div>
            <div className="arkive-section-grid">
              <div>
                <h2>
                  One studio.
                  <br />
                  Connected expertise.
                </h2>
              </div>
              <div className="arkive-body-copy">
                <p>
                  Arkive brings together architectural production, digital solutions, furniture and fit-out, and business process outsourcing.
                </p>
                <p className="muted">
                  Great businesses require more than a single discipline. Our specialist teams work independently or together as one integrated organization, giving your ideas the support they need to take shape.
                </p>
                
                <ul className="arkive-highlights" aria-label="Arkive production highlights">
                  {ARKIVE_HIGHLIGHTS.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metric Counters */}
            <div className="arkive-metrics">
              {ARKIVE_METRICS.map((metric, idx) => (
                <div key={idx} className="arkive-metric-item">
                  <div className="arkive-metric-value">{metric.value}</div>
                  <div className="arkive-metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Selected Work & Categories */}
        <section id="projects" className="arkive-projects-section">
          <div className="arkive-wrap">
            <div className="arkive-section-heading-block">
              <p className="eyebrow">02 / SELECTED WORK</p>
              <h2>Explore our projects.</h2>
              <p className="arkive-section-note">
                Browse our work by category.
                <br />
                Built to grow with the studio.
              </p>
            </div>

            <div className="arkive-category-grid" role="region" aria-label="Project categories">
              {/* Card 1: Conceptual Design */}
              <button
                type="button"
                className="arkive-category-card"
                onClick={() => onNavigateProjects ? onNavigateProjects('conceptual') : openCategoryModal('conceptual')}
                aria-label="Explore Conceptual Design projects"
              >
                <div className="arkive-category-photo">
                  <img 
                    src={conceptualThumb} 
                    alt="Conceptual Design projects" 
                    loading="lazy" 
                  />
                  <span className="arkive-category-action">
                    Click me to explore <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
                <div className="arkive-category-meta">
                  <span className="arkive-category-title">Conceptual Design</span>
                  <span className="micro">08 PROJECTS</span>
                </div>
              </button>

              {/* Card 2: Cafés & Restaurants */}
              <button
                type="button"
                className="arkive-category-card"
                onClick={() => onNavigateProjects ? onNavigateProjects('cafes') : openCategoryModal('cafes')}
                aria-label="Explore Cafés & Restaurants projects"
              >
                <div className="arkive-category-photo">
                  <img 
                    src={cafesThumb} 
                    alt="Cafés and Restaurants projects" 
                    loading="lazy" 
                  />
                  <span className="arkive-category-action">
                    Click me to explore <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
                <div className="arkive-category-meta">
                  <span className="arkive-category-title">Cafés &amp; Restaurants</span>
                  <span className="micro">02 PROJECTS</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 03: Our Divisions */}
        <section id="divisions" className="arkive-section">
          <div className="arkive-wrap">
            <div className="eyebrow">03 / Our divisions</div>
            <div className="arkive-section-grid">
              <div>
                <h2>
                  Four connected
                  <br />
                  divisions.
                </h2>
                <p className="muted" style={{ maxWidth: '380px' }}>
                  Four specialist divisions, connected when your project needs more than one discipline.
                </p>
              </div>

              <div className="arkive-division-list">
                {ARKIVE_DIVISIONS.map((div) => {
                  const isExpanded = expandedDivision === div.id;
                  return (
                    <div key={div.id} className="arkive-division-item">
                      <button 
                        type="button"
                        className="arkive-division-header"
                        onClick={() => setExpandedDivision(isExpanded ? null : div.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle details for ${div.name}`}
                      >
                        <span className="arkive-division-title">
                          <span className="micro">{div.id}</span>
                          <span>{div.name}</span>
                        </span>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="arkive-division-body"
                          >
                            <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                              {div.subtitle}
                            </div>
                            <p>{div.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Process & How We Work */}
        <section id="process" className="arkive-section">
          <div className="arkive-wrap">
            <div className="eyebrow">04 / How we work</div>
            <div className="arkive-section-grid">
              <div>
                <h2>
                  A clear process.
                  <br />
                  A considered result.
                </h2>
              </div>
              <div className="arkive-body-copy">
                <p>
                  Seamless integration. Consistent quality. Reliable delivery. We align with your standards and workflows, becoming an organic extension of your team.
                </p>
              </div>
            </div>

            <div className="arkive-story-photos" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '24px', marginBlock: '36px' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--line)' }}>
                <img src={teamCollab} alt="Arkive team reviewing a project together in the studio" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <span className="micro" style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#ffffff', padding: '4px 10px', borderRadius: '2px', fontSize: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>TEAM COLLABORATION</span>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--line)' }}>
                <img src={studioMakati} alt="Arkive studio workspace in Makati" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <span className="micro" style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#ffffff', padding: '4px 10px', borderRadius: '2px', fontSize: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>INSIDE THE STUDIO / MAKATI</span>
              </div>
            </div>

            <div className="arkive-process-grid">
              {ARKIVE_STEPS.map((step) => (
                <div key={step.number} className="arkive-process-card">
                  <span className="micro">{step.number} / STAGE</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 05: FAQ */}
        <section id="faq" className="arkive-section">
          <div className="arkive-wrap">
            <div className="eyebrow">05 / A few answers</div>
            <div className="arkive-section-grid">
              <div>
                <h2>
                  Good questions.
                  <br />
                  Clear answers.
                </h2>
                <p className="muted" style={{ marginTop: '16px' }}>
                  Have something else in mind?
                </p>
                <button 
                  type="button" 
                  className="arkive-btn-link"
                  onClick={() => setIsContactOpen(true)}
                  style={{ background: 'transparent', cursor: 'pointer' }}
                >
                  Let's Talk to Our Team <ArrowUpRight size={15} />
                </button>
              </div>

              <div>
                {ARKIVE_FAQS.map((faq, idx) => {
                  const isOpened = expandedFaq === idx;
                  return (
                    <div key={idx} className="arkive-faq-item">
                      <button 
                        type="button" 
                        className="arkive-faq-question"
                        onClick={() => setExpandedFaq(isOpened ? null : idx)}
                        aria-expanded={isOpened}
                      >
                        <span>
                          <span className="micro" style={{ marginRight: '14px' }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {faq.question}
                        </span>
                        {isOpened ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      <AnimatePresence>
                        {isOpened && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="arkive-faq-answer"
                          >
                            <p>{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
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
            <button 
              type="button"
              className="arkive-btn-primary"
              onClick={() => setIsContactOpen(true)}
              aria-label="Contact Arkive team today"
            >
              Let's Talk to Our Team <ArrowUpRight size={16} />
            </button>
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
              <p>{ARKIVE_META.location}</p>
              <a 
                href={ARKIVE_META.mapsUrl}
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
                <a href={`mailto:${ARKIVE_META.email}`} style={{ fontWeight: 600 }}>
                  {ARKIVE_META.email}
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
                            if (onNavigateProjects) {
                              onNavigateProjects(link.categoryId || 'conceptual');
                            } else {
                              scrollToSection('projects');
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
            <span>&copy; 2026 Arkive Design Studio. Redesigned with architectural fidelity.</span>
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

      {/* Interactive Project Modal Gallery */}
      <AnimatePresence>
        {activeProject && (
          <div 
            className="arkive-modal-overlay"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div 
              className="arkive-modal-shell"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <button 
                type="button"
                className="arkive-modal-close"
                onClick={() => setActiveProject(null)}
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>

              <div className="arkive-modal-media">
                <div className="arkive-modal-frame">
                  <motion.img 
                    key={activeImageIndex}
                    src={activeProject.images[activeImageIndex]} 
                    alt={`${activeProject.title} view ${activeImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>

                <div className="arkive-modal-nav">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button"
                      className="arkive-modal-btn"
                      onClick={() => setActiveImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length)}
                      aria-label="Previous project photograph"
                    >
                      &larr; Prev
                    </button>
                    <button 
                      type="button"
                      className="arkive-modal-btn"
                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length)}
                      aria-label="Next project photograph"
                    >
                      Next &rarr;
                    </button>
                  </div>

                  <span className="micro">
                    {String(activeImageIndex + 1).padStart(2, '0')} / {String(activeProject.images.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="arkive-modal-copy">
                <div>
                  <div className="eyebrow">{activeProject.categoryName}</div>
                  <h2 id="modal-project-title">{activeProject.title}</h2>
                  <p className="lead">{activeProject.subtitle}</p>
                  <p>{activeProject.lead}</p>
                  <p>{activeProject.description}</p>
                </div>

                <div className="arkive-modal-focus">
                  <strong>Focus:</strong> {activeProject.focus}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Drawer Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div 
            className="arkive-modal-overlay"
            onClick={() => setIsContactOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <motion.div 
              className="arkive-modal-shell"
              style={{ maxWidth: '640px', gridTemplateColumns: '1fr', padding: '40px' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <button 
                type="button"
                className="arkive-modal-close"
                onClick={() => setIsContactOpen(false)}
                aria-label="Close contact modal"
              >
                <X size={18} />
              </button>

              <div className="eyebrow">Direct Engagement</div>
              <h2 id="contact-modal-title" style={{ fontSize: '28px', marginBottom: '8px' }}>
                Let’s Talk to Our Team.
              </h2>
              <p className="muted" style={{ marginBottom: '24px' }}>
                Whether you need dedicated Revit modeling capacity, CAD production, or full architectural visualization support:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a 
                  href={`mailto:${ARKIVE_META.email}?subject=Project%20Inquiry%20from%20Arkive%20Design%20Studio`}
                  className="arkive-btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  <Mail size={16} /> Email: {ARKIVE_META.email}
                </a>
                <a 
                  href={ARKIVE_META.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arkive-btn-link"
                  style={{ justifyContent: 'center' }}
                >
                  <MapPin size={16} /> 1409 Pablo Ocampo Sr. Ext, Makati City
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
