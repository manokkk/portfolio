import React, { useState } from 'react';
import { ArrowUpRight, X, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full-Stack Web', 'AI & ML', 'Mobile (Expo)', 'IoT Hardware'];

  const worksData = [
    {
      id: 1,
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
      id: 2,
      title: 'Inspire Holdings Enterprise Web & Mobile Suite',
      category: 'Full-Stack Web',
      image: '/images/project_cloud_ops.jpg',
      description: 'Cross-platform web and mobile solutions for enterprise operations, featuring Supabase & Firebase database architecture integrated with Redis caching for performance.',
      highlights: [
        'Built full-stack applications utilizing Next.js, NestJS, and .NET Framework',
        'Cross-platform mobile apps built with React Native (Expo)',
        'Redis caching strategic integration for high throughput & low latency'
      ],
      tags: ['Next.js', 'NestJS', 'React Native (Expo)', '.NET', 'Redis', 'Supabase'],
      projectUrl: 'https://github.com/manokkk'
    },
    {
      id: 3,
      title: 'IoT Embedded Hardware & Telemetry System',
      category: 'IoT Hardware',
      image: '/images/project_fintech_analytics.jpg',
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

  return (
    <section id="works" className="container-custom py-16">
      <h2 className="section-title">Selected Works</h2>

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
            className="work-card"
            onClick={() => setSelectedProject(work)}
          >
            <div className="card-img-box">
              <img src={work.image} alt={work.title} className="card-img" />
            </div>
            <div className="card-content">
              <span className="card-category">{work.category}</span>
              <h3 className="card-title flex items-center justify-between">
                <span>{work.title}</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <span className="card-category mb-2 block">{selectedProject.category}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>

            <div className="rounded-xl overflow-hidden mb-6 h-64 bg-slate-900">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-white mb-3">Key Project Deliverables & Impact</h4>
              <ul className="space-y-2">
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
