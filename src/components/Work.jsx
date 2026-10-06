import React from 'react';
import { Folder, ExternalLink } from 'lucide-react';

export default function Work() {
  const projects = [
    {
      title: 'Project Title One',
      category: 'Web Application',
      description: 'A brief description of this project, its goals, and key technologies used.',
      tags: ['React', 'CSS', 'JavaScript'],
    },
    {
      title: 'Project Title Two',
      category: 'Design & Frontend',
      description: 'A clean overview highlighting feature details, responsive layouts, and user interactions.',
      tags: ['UI/UX', 'HTML5', 'Tailwind'],
    },
    {
      title: 'Project Title Three',
      category: 'Full Stack',
      description: 'Detailed summary of another featured project, showcasing functionality and architecture.',
      tags: ['Node.js', 'API', 'Database'],
    },
  ];

  return (
    <section id="work" className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Folder className="w-4 h-4" />
          <span>My Work</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="glass-panel p-6 flex flex-col justify-between hover:border-sky-400/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>View Project Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
