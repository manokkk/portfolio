import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Database, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  Globe 
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Services({ onRequestInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const categories = ['All', 'Web & Mobile', 'Cloud & DB', 'Security', 'AI & IoT'];
  
  // Escape key and background scroll locking for service inspection modal
  useEffect(() => {
    if (!selectedServiceModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedServiceModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedServiceModal]);

  const services = servicesData;

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

  return (
    <section id="services" className="container-custom py-16 relative">
      
      {/* Header & Filter Tabs */}
      <div>
        <div className="flex flex-col items-start mb-8">
          <h2 className="section-title section-title-glow mb-2">Services & Tech Stack</h2>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-tabs mb-8" role="tablist" aria-label="Service Categories">
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

      {/* Services Grid (3-column responsive grid matching CSS) */}
      <div className="services-grid">
        {filteredServices.map((service) => {
          const Icon = service.icon;

          return (
            <div key={service.id}>
              <button 
                type="button"
                className="service-card group cursor-pointer"
                onClick={() => setSelectedServiceModal(service)}
                aria-haspopup="dialog"
                aria-label={`View details and architecture blueprint for ${service.title}`}
              >
                {/* Card Content Top */}
                <div>
                  {/* Header Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="service-icon-box"
                      style={{ 
                        backgroundColor: service.bgGlow,
                        borderColor: service.borderColor
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
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

              </button>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Service Detail Modal */}
      {/* Detailed Service Inspection Modal with Spring Physics */}
      <AnimatePresence>
        {selectedServiceModal && (
          <motion.div 
            key="service-modal-backdrop"
            className="modal-backdrop" 
            onClick={() => setSelectedServiceModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.div 
              key="service-modal-box"
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
              onClick={() => setSelectedServiceModal(null)}
              aria-label="Close service details"
              title="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
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
                <h3 id="service-modal-title" className="service-modal-title">{selectedServiceModal.title}</h3>
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
                type="button"
                onClick={() => handleRequestServiceFromModal(selectedServiceModal)}
                className="modal-request-btn"
              >
                <span>REQUEST THIS SERVICE</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}


