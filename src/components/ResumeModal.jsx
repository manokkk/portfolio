import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Briefcase, 
  Download, 
  MapPin, 
  Mail, 
  Phone, 
  Code2, 
  GraduationCap, 
  Check, 
  ExternalLink,
  Layers,
  Database,
  Cloud,
  Server,
  Cpu,
  FolderGit2,
  UserCheck,
  GitBranch
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ResumeModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Escape key and background scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("micogianan28@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("09393191546");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const experiences = [
    {
      period: 'Feb 2026 — May 2026',
      role: 'Full-Stack Developer (Internship)',
      company: 'Inspire Holdings Inc.',
      location: 'Taguig, Philippines',
      bullets: [
        'Spearheaded full-stack web and mobile application development using Next.js, NestJS, .NET Framework, and React Native (Expo), while architecting scalable Supabase and Firebase database solutions with Redis caching to maximize performance.',
        'Championed engineering standards through rigorous code reviews, developer mentorship, and strategic sprint planning to improve code quality, cross-functional collaboration, and on-time milestone delivery.'
      ],
      techStack: ['Next.js', 'NestJS', '.NET Framework', 'React Native (Expo)', 'Supabase', 'Firebase', 'Redis']
    }
  ];

  const projects = [
    {
      title: 'ISAP - TUPT Thesis Archive: Intelligent Search and Access Platform',
      subtitle: 'ML Semantic Search & AI Thesis Repository',
      bullets: [
        'Developed and rigorously validated a machine learning semantic search engine and an AI-driven thesis improvement module within a scalable, role-based digital repository, achieving 90% search accuracy and sub-5-second retrieval times.',
        'Engineered end-to-end testing and continuous quality assurance strategies covering authentication security, data integrity, administrative workflows, and usability to guarantee a reliable, bug-free user experience.'
      ],
      techStack: ['Machine Learning', 'Semantic Search', 'AI Module', 'Role-Based Access', 'E2E Testing & QA']
    },
    {
      title: 'CacheFlow – Cross-Platform Personal Finance & Multi-Account Budget Planner',
      subtitle: 'Web & Mobile Financial Tracking Platform',
      bullets: [
        'Engineered and validated a full-stack financial tracking platform across Web and Mobile applications using Prisma, PostgreSQL, and Supabase JWT authentication, featuring a dynamic multi-wallet ledger (Cash, E-Wallets, and Bank Accounts), automated daily allowance carryovers, and interactive budget analytics.',
        'Implemented end-to-end quality assurance, API security handshakes, and offline-first resilience strategies, validating background queue synchronization, conflict-free data integrity, and responsive cross-device usability under both online and offline conditions.'
      ],
      techStack: ['Web & Mobile', 'Prisma', 'PostgreSQL', 'Supabase JWT', 'Offline-First Sync']
    },
    {
      title: 'NoteQuest — Gamified Productivity & Notes Platform',
      subtitle: 'Cross-Platform RPG Task & Note Management',
      bullets: [
        'Engineered a full-stack task and note management platform across React Native (Expo) and Express/TypeScript using Prisma, PostgreSQL (Supabase), and JWT authentication, featuring a server-authoritative RPG progression engine with 1.5x level scaling, rank tiers, and automated End-of-Day (EOD) EXP settlement and daily task resets.',
        'Created a frictionless user experience with a full-featured, offline-first Guest Mode requiring no mandatory sign-up alongside optional cloud sync, unifying categorized missions (Daily, Weekly, Monthly) and rich-text notes with an automated End-of-Day (EOD) EXP settlement and daily reset system.'
      ],
      techStack: ['React Native (Expo)', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase', 'JWT']
    }
  ];

  const skillCategories = [
    {
      category: 'Frontend & Mobile Development',
      icon: Layers,
      skills: [
        'Next.js',
        'React',
        'React Native (Expo)',
        'MERN Stack',
        'TypeScript'
      ]
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      skills: [
        'NestJS',
        '.NET Framework',
        'Express.js',
        'RESTful APIs',
        'Prisma'
      ]
    },
    {
      category: 'Database Design & Management',
      icon: Database,
      skills: [
        'PostgreSQL',
        'MongoDB',
        'SQL / NoSQL',
        'Supabase',
        'Firebase',
        'Redis'
      ]
    },
    {
      category: 'IoT Development',
      icon: Cpu,
      skills: [
        'Raspberry Pi',
        'ESP32',
        'Python',
        'FastAPI'
      ]
    },
    {
      category: 'Cloud Deployment & DevOps',
      icon: Cloud,
      skills: [
        'Docker',
        'GCP',
        'Vercel',
        'Render'
      ]
    },
    {
      category: 'Version Control & Collaboration',
      icon: GitBranch,
      skills: [
        'Git',
        'GitHub',
        'GitLab',
        'Agile Methodologies',
        'Team Leadership',
        'Code Reviews'
      ]
    }
  ];

  return typeof document !== 'undefined' ? createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="resume-modal-backdrop"
          className="modal-backdrop" 
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <motion.div 
            key="resume-modal-box"
            className="modal-box resume-modal-box" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
        
        {/* Close Button */}
        <button 
          type="button"
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close resume modal"
          title="Close Resume Modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="resume-header">
          <div className="resume-header-top">
            <span className="resume-badge">
              <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
              <span>MICO H. GIANAN — CURRICULUM VITAE</span>
            </span>
          </div>

          <h2 id="resume-modal-title" className="resume-title">Professional Resume</h2>
          <p className="resume-subtitle">
            Adaptable full-stack web and mobile developer specializing in Next.js, NestJS, .NET Framework, and React Native (Expo), leveraging strong problem-solving skills and database expertise to build robust, scalable cross-platform applications.
          </p>

          {/* Quick Contact Bar */}
          <div className="resume-quick-bar">
            <button 
              type="button"
              onClick={handleCopyEmail} 
              className="resume-quick-item"
              aria-label="Copy email address: micogianan28@gmail.com"
              title="Click to copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Mail className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />}
              <span>{copiedEmail ? "Email Copied!" : "micogianan28@gmail.com"}</span>
            </button>

            <button 
              type="button"
              onClick={handleCopyPhone} 
              className="resume-quick-item"
              aria-label="Copy phone number: +63 939 319 1546"
              title="Click to copy phone number"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Phone className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />}
              <span>{copiedPhone ? "Phone Copied!" : "+63 939 319 1546"}</span>
            </button>

            <span className="resume-quick-item">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Taguig City, Philippines</span>
            </span>

            <a 
              href="https://github.com/manokkk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-quick-item"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/manokkk</span>
              <ExternalLink className="w-3 h-3 text-gray-400 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Experience Section */}
        <div className="resume-section">
          <div className="resume-section-header">
            <div className="resume-section-icon">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="resume-section-title">Work & Engineering Experience</h3>
          </div>

          <div className="resume-exp-list">
            {experiences.map((exp, idx) => (
              <div key={idx} className="resume-exp-card">
                <div className="resume-exp-card-header">
                  <div>
                    <h4 className="resume-role-title">{exp.role}</h4>
                    <div className="resume-company-meta">
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="resume-date-badge">{exp.period}</span>
                </div>

                <ul className="resume-exp-bullets">
                  {exp.bullets.map((item, bIdx) => (
                    <li key={bIdx}>{item}</li>
                  ))}
                </ul>

                <div className="resume-tech-row">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="resume-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="resume-section">
          <div className="resume-section-header">
            <div className="resume-section-icon">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <h3 className="resume-section-title">Featured Engineering Projects</h3>
          </div>

          <div className="resume-exp-list">
            {projects.map((proj, idx) => (
              <div key={idx} className="resume-exp-card">
                <div className="resume-exp-card-header">
                  <div>
                    <h4 className="resume-role-title">{proj.title}</h4>
                    <div className="resume-company-meta">
                      <span>{proj.subtitle}</span>
                    </div>
                  </div>
                </div>

                <ul className="resume-exp-bullets">
                  {proj.bullets.map((item, bIdx) => (
                    <li key={bIdx}>{item}</li>
                  ))}
                </ul>

                <div className="resume-tech-row">
                  {proj.techStack.map((tech) => (
                    <span key={tech} className="resume-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Competencies Grid */}
        <div className="resume-section">
          <div className="resume-section-header">
            <div className="resume-section-icon">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="resume-section-title">Core Technical Competencies</h3>
          </div>

          <div className="resume-skills-categories">
            {skillCategories.map((cat, i) => {
              const IconComp = cat.icon;
              return (
                <div key={i} className="resume-skill-cat-box">
                  <div className="resume-skill-cat-title">
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{cat.category}</span>
                  </div>
                  <div className="resume-skill-tags-wrap">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="resume-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education Section */}
        <div className="resume-section">
          <div className="resume-section-header">
            <div className="resume-section-icon">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="resume-section-title">Education & Academic Foundation</h3>
          </div>

          <div className="resume-edu-card">
            <div>
              <h4 className="resume-role-title">Bachelor of Science in Information Technology</h4>
              <p className="resume-company-meta">Major in Software Development & Web Engineering</p>
              <p className="resume-exp-desc" style={{ marginBottom: 0 }}>
                Specialized in full-stack architecture, database management systems, cloud computing, and responsive application design.
              </p>
            </div>
            <span className="resume-date-badge">2022 — 2026</span>
          </div>
        </div>

        {/* References Section */}
        <div className="resume-section" style={{ marginBottom: '1rem' }}>
          <div className="resume-section-header">
            <div className="resume-section-icon">
              <UserCheck className="w-4 h-4" />
            </div>
            <h3 className="resume-section-title">Character Reference</h3>
          </div>

          <div className="resume-edu-card">
            <div>
              <h4 className="resume-role-title">Benedick Cervantes</h4>
              <p className="resume-company-meta">
                <span>benedickcervantes@gmail.com</span>
                <span>•</span>
                <span>0917 843 2759</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="resume-footer">
          <div className="resume-footer-info">
            <span className="resume-footer-location">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Taguig, Philippines • 0939 319 1546</span>
            </span>
            <span className="resume-footer-note">
              Verified Candidate Profile • Available for Immediate Placement
            </span>
          </div>

          <a
            href="/Gianan_Resume_FullStackDev.pdf"
            download="Gianan_Resume_FullStackDev.pdf"
            className="resume-download-cta"
            title="Download PDF version of Mico Gianan's Resume"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF RESUME</span>
          </a>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;
}
