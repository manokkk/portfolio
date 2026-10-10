import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Layers, Code, CheckCircle2, X, Server, Zap } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'AI & Full Stack', 'Cloud & DevOps', 'Fintech & Web3'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative bg-grid">
      {/* Background glow */}
      <div className="glow-orb glow-purple top-1/3 right-1/4 w-[400px] h-[400px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="badge badge-purple mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Production <span className="gradient-text">Engineering Projects</span>
          </h2>
          <p className="text-slate-400 text-base mt-3 max-w-2xl">
            A curated showcase of real-world distributed systems, AI automation engines, and cloud platforms built for scale.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel group flex flex-col overflow-hidden hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Card Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="badge badge-cyan text-[10px] backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Metrics Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((m, idx) => (
                      <span key={idx} className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-sky-400 shrink-0" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Architecture</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detailed Architecture & Code Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border-sky-500/30">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-purple">{activeModalProject.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalProject.title}
            </h3>



            {/* Long Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeModalProject.longDescription}
            </p>

            {/* Architecture Highlights */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-sky-400 flex items-center gap-2 mb-3">
                <Server className="w-4 h-4" />
                <span>Architecture & Engineering Highlights</span>
              </h4>
              <ul className="space-y-2">
                {activeModalProject.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Code Snippet */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-purple-400 flex items-center gap-2 mb-3">
                <Code className="w-4 h-4" />
                <span>Core Implementation Snippet</span>
              </h4>
              <div className="terminal-window text-xs">
                <div className="terminal-header">
                  <span className="text-[11px] font-mono text-slate-400">snippet.ts</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sky-200 font-mono">
                  <code>{activeModalProject.sampleCode}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button text-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              <a
                href={activeModalProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary glass-button text-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Demo</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
