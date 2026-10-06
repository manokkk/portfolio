import React, { useState } from 'react';
import { Cpu, Code2, Server, Cloud, Database, Search } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [searchTerm, setSearchTerm] = useState('');

  const skillTabs = [
    { id: 'frontend', label: 'Frontend & UI', icon: Code2, data: portfolioData.skills.frontend },
    { id: 'backend', label: 'Backend & APIs', icon: Server, data: portfolioData.skills.backend },
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, data: portfolioData.skills.cloud },
    { id: 'databases', label: 'Databases & AI', icon: Database, data: portfolioData.skills.databases },
  ];

  const currentCategory = skillTabs.find(t => t.id === activeTab);
  const filteredSkills = currentCategory.data.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skills" className="py-24 relative bg-[#080b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="badge badge-emerald mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Technical <span className="gradient-text-cyan">Proficiency Matrix</span>
          </h2>
          <p className="text-slate-400 text-base mt-3 max-w-xl">
            Battle-tested frameworks, cloud infrastructure tools, and backend paradigms leveraged daily.
          </p>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center bg-white/5 border border-white/10 p-1.5 rounded-2xl">
            {skillTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="glass-panel p-5 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-100 text-sm">{skill.name}</span>
                <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {skill.exp}
                </span>
              </div>
              
              {/* Level Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="glass-panel p-6 border-sky-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white mb-2">Clean Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforcing SOLID principles, modular state management, and strict TypeScript types for long-term codebase health.
            </p>
          </div>

          <div className="glass-panel p-6 border-purple-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white mb-2">High Availability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designing fault-tolerant microservices, horizontal scaling with Kubernetes, and low-latency cache layers.
            </p>
          </div>

          <div className="glass-panel p-6 border-emerald-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white mb-2">AI Integration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leveraging LLMs, RAG vector pipelines, and autonomous agent orchestration to power modern intelligent workflows.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
