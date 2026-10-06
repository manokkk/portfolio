import React from 'react';
import { User, Code, Globe, Sparkles } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code & Design',
      description: 'Focused on creating responsive, performant, and user-friendly interfaces.',
    },
    {
      icon: Globe,
      title: 'Modern Technology',
      description: 'Utilizing modern web standards, tools, and best practices.',
    },
    {
      icon: Sparkles,
      title: 'Attention to Detail',
      description: 'Crafting thoughtful user experiences with attention to detail.',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <User className="w-4 h-4" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">Building with purpose</h2>
        
        <p className="text-gray-300 text-base max-w-3xl leading-relaxed mb-12">
          This section is dedicated to sharing your background, experience, and what drives your work. You can easily update this text with your personal bio, skillsets, and professional story.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="glass-panel p-6">
                <div className="w-10 h-10 rounded-lg bg-sky-400/10 text-sky-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
