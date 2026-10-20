import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowLeft, Compass } from 'lucide-react';
import { CATEGORY_DATA } from '../data/arkiveProjectsData';
import { ARKIVE_SITE_DIRECTORY } from '../data/arkiveData';
import arkiveLogo from '../assets/arkive/arkive-logo-1024.webp';
import '../styles/arkive.css';

export default function ArkiveProjectsPage({ 
  initialCategory = 'conceptual', 
  onNavigate, 
  onNavigateBack,
  onNavigateProject
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'conceptual');

  // Sync if initialCategory prop changes
  useEffect(() => {
    if (initialCategory && CATEGORY_DATA[initialCategory]) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const currentData = CATEGORY_DATA[activeCategory] || CATEGORY_DATA.conceptual;

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    if (onNavigate) {
      onNavigate(`/arkive/projects?category=${catId}`);
    }
  };

  const handleOpenProject = (projectId) => {
    if (onNavigateProject) {
      onNavigateProject(projectId, activeCategory);
    } else if (onNavigate) {
      onNavigate(`/arkive/project?id=${projectId}&category=${activeCategory}`);
    }
  };

  return (
    <div className="arkive-page arkive-projects-page">
      {/* Return to Portfolio floating badge */}
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

      {/* Main Standalone Projects Section */}
      <main className="wrap arkive-projects-main-container" role="main" aria-label="Arkive Projects Portfolio">
        
        {/* Top Breadcrumb & Slogan Bar */}
        <div className="arkive-projects-topbar">
          <div className="arkive-projects-nav-trail">
            <button 
              type="button" 
              className="arkive-back-link"
              onClick={onNavigateBack}
              aria-label="Return to Arkive Studio home"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Studio</span>
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-label">02 / Selected Work</span>
          </div>

          <span className="arkive-projects-top-slogan">IDEAS TODAY. SPACES TOMORROW.</span>
        </div>

        {/* Category Sheet Shell */}
        <div className="arkive-projects-sheet-shell">
          <div className="arkive-projects-sheet-grid">
            
            {/* Left Column: Category Metadata & Prototype link */}
            <aside className="arkive-projects-sidebar">
              <div>
                <p className="eyebrow" style={{ marginBottom: '16px' }}>{currentData.eyebrow}</p>
                <h1 className="arkive-projects-category-title">{currentData.title}</h1>
                <p className="arkive-projects-category-desc">{currentData.description}</p>
              </div>

              {/* Category Quick Selector Tabs */}
              <div className="arkive-category-pill-tabs" role="tablist" aria-label="Select Project Category">
                <button 
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'conceptual'}
                  className={`arkive-cat-pill ${activeCategory === 'conceptual' ? 'is-active' : ''}`}
                  onClick={() => handleSelectCategory('conceptual')}
                >
                  Conceptual Design
                </button>
                <button 
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'cafes'}
                  className={`arkive-cat-pill ${activeCategory === 'cafes' ? 'is-active' : ''}`}
                  onClick={() => handleSelectCategory('cafes')}
                >
                  Cafés &amp; Restaurants
                </button>
                <button 
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'prototype'}
                  className={`arkive-cat-pill ${activeCategory === 'prototype' ? 'is-active' : ''}`}
                  onClick={() => handleSelectCategory('prototype')}
                >
                  Prototype
                </button>
              </div>


            </aside>

            {/* Right Column: Project Cards Grid */}
            <section className="arkive-projects-cards-column" aria-label={`${currentData.title} Project Gallery`}>
              <div className="arkive-projects-cards-grid">
                {currentData.projects.map((proj) => (
                  <article key={proj.id} className="arkive-project-item-card">
                    <button 
                      type="button"
                      className="arkive-project-card-btn"
                      onClick={() => handleOpenProject(proj.id)}
                      aria-label={`View ${proj.title} project details`}
                    >
                      <div className="arkive-project-img-frame">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          loading="lazy" 
                        />
                        <span className="arkive-project-badge-action">
                          Click me to view project <ArrowUpRight size={13} aria-hidden="true" />
                        </span>
                      </div>

                      <div className="arkive-project-caption">
                        <h2 className="arkive-project-name">{proj.title}</h2>
                        <span className="micro">{proj.tag}</span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
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
                          onClick={() => handleSelectCategory(link.categoryId || 'conceptual')}
                          aria-label={`Switch category to ${link.label}`}
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
