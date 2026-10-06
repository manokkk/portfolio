import React from 'react';
import { History, Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="badge badge-cyan mb-3">
            <History className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 text-base mt-3 max-w-xl">
            Track record of driving technical initiatives, building engineering teams, and scaling products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-sky-500/20 ml-4 sm:ml-8 space-y-12">
          {portfolioData.experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#080b12] border-2 border-sky-400 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all shadow-lg shadow-sky-500/20">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-6 sm:p-8 hover:border-sky-500/40 transition-all">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-sky-400 font-mono">
                      {exp.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2 mb-6">
                  {exp.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.technologies.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
