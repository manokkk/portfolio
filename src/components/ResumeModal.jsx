import React, { useState } from 'react';
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
  Cpu
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ResumeModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

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
      summary: 'Primary web & mobile developer using Next.js, NestJS, .NET Framework, and React Native (Expo). Architected database solutions with Supabase/Firebase and integrated Redis caching for performance.',
      techStack: ['Next.js', 'NestJS', '.NET Framework', 'React Native (Expo)', 'Supabase', 'Firebase', 'Redis']
    },
    {
      period: '2022 — 2026',
      role: 'Project Full-Stack Web & Mobile Developer',
      company: 'Academic & Multidisciplinary Software Projects',
      location: 'Taguig, Philippines',
      summary: 'Engineered end-to-end applications and RESTful APIs using React, Laravel, Django, FastAPI, PostgreSQL, and MongoDB.',
      techStack: ['React', 'Laravel', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB']
    }
  ];

  const skillCategories = [
    {
      category: 'Frontend & Mobile Development',
      icon: Layers,
      skills: [
        'React.JS',
        'Next.JS',
        'React Native',
        'React Redux',
        'MERN Stack',
        'HTML',
        'CSS',
        'Web Applications'
      ]
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      skills: [
        'Laravel Framework',
        'NestJS',
        '.NET Framework',
        'REST APIs',
        'API',
        'Software Development',
        'Systems Development'
      ]
    },
    {
      category: 'Programming Languages',
      icon: Code2,
      skills: [
        'JavaScript Programming',
        'Python Programming',
        'PHP Programming',
        'Java Programming',
        'C# Programming',
        'C++ Programming',
        'SQL Query Language'
      ]
    },
    {
      category: 'Databases & Storage',
      icon: Database,
      skills: [
        'Postgresql',
        'MongoDB',
        'Supabase',
        'Firebase',
        'PhpMyAdmin',
        'Database Systems',
        'Redis Caching'
      ]
    },
    {
      category: 'Cloud, DevOps & Pipelines',
      icon: Cloud,
      skills: [
        'Amazon Web Services',
        'Docker Software',
        'Pipelines',
        'CI/CD',
        'DevOps',
        'Deployment',
        'Git Version Control System',
        'Version Control',
        'Debugging',
        'Troubleshooting'
      ]
    },
    {
      category: 'IoT, Hardware & AI Systems',
      icon: Cpu,
      skills: [
        'Raspberry PI',
        'ESP32',
        'Claude Opus',
        'Automation',
        'Information Technology'
      ]
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box resume-modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close Resume Modal">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="resume-header">
          <div className="resume-header-top">
            <span className="resume-badge">
              <Briefcase className="w-3.5 h-3.5" />
              <span>MICO H. GIANAN — CURRICULUM VITAE</span>
            </span>
            <div className="resume-status-indicator">
              <span className="resume-status-dot"></span>
              <span>Available for Roles</span>
            </div>
          </div>

          <h2 className="resume-title">Professional Resume</h2>
          <p className="resume-subtitle">
            Full-Stack Web & Mobile Developer specializing in high-performance web applications, cross-platform mobile engineering, and resilient backend architectures.
          </p>

          {/* Quick Contact Bar */}
          <div className="resume-quick-bar">
            <button 
              onClick={handleCopyEmail} 
              className="resume-quick-item"
              title="Click to copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-sky-400" />}
              <span>{copiedEmail ? "Email Copied!" : "micogianan28@gmail.com"}</span>
            </button>

            <button 
              onClick={handleCopyPhone} 
              className="resume-quick-item"
              title="Click to copy phone number"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-sky-400" />}
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

                <p className="resume-exp-desc">{exp.summary}</p>

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
        <div className="resume-section" style={{ marginBottom: '1rem' }}>
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

      </div>
    </div>
  );
}
