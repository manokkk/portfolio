import React from 'react';
import { X, Briefcase, Download, CheckCircle2, Award } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const experiences = [
    {
      period: 'February 2026 — May 2026',
      role: 'Full-Stack Developer (Internship)',
      company: 'Inspire Holdings Inc. • Taguig, Philippines',
      summary: 'Primary web & mobile developer using Next.js, NestJS, .NET Framework, and React Native (Expo). Architected database solutions with Supabase/Firebase and integrated Redis caching for performance.'
    },
    {
      period: '2022 — 2026',
      role: 'Project Full-Stack Web & Mobile Developer',
      company: 'Academic & Multidisciplinary Software Projects',
      summary: 'Engineered end-to-end applications and RESTful APIs using React, Laravel, Django, FastAPI, PostgreSQL, and MongoDB.'
    }
  ];

  const skillsList = [
    "Next.js", "NestJS", "React", "React Native (Expo)", ".NET", "FastAPI",
    "PostgreSQL", "MongoDB", "Supabase", "Firebase", "Redis Caching",
    "Docker", "GCP", "Vercel", "Git / GitHub / GitLab"
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span className="card-category">MICO H. GIANAN — CURRICULUM VITAE</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-6">Professional Resume</h3>

        <div className="space-y-6 mb-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-white/20 pl-4 py-1">
              <span className="text-xs font-mono text-gray-400 block mb-1">{exp.period}</span>
              <h4 className="text-base font-bold text-white">{exp.role}</h4>
              <p className="text-xs font-semibold text-gray-300 mb-2">{exp.company}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{exp.summary}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Technical Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <span key={skill} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-gray-300 font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs text-gray-400 font-mono">Taguig, Philippines • 0939 319 1546</span>
          <a
            href="/Gianan_Resume_FullStackDev.pdf"
            download="Gianan_Resume_FullStackDev.pdf"
            className="pill-btn-white text-xs"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PDF RESUME</span>
          </a>
        </div>

      </div>
    </div>
  );
}
