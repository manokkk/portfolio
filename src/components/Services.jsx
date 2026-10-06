import React, { useState } from 'react';
import { Layout, Smartphone, Database, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      icon: Layout,
      title: 'Full-Stack Web Development',
      description: 'Building robust, high-performance web applications using Next.js, NestJS, .NET Framework, and MERN stack with RESTful API integration.',
      capabilities: [
        'Next.js & React Web Apps',
        'NestJS & .NET Microservices',
        'RESTful & GraphQL API Design',
        'Laravel, Django & FastAPI'
      ]
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Cross-Platform Mobile Apps',
      description: 'Engineering native-feeling mobile applications for iOS and Android using React Native with Expo framework.',
      capabilities: [
        'React Native (Expo) Architecture',
        'Offline Caching & State Sync',
        'Push Notifications & Mobile Auth',
        'App Store & Play Store Ready'
      ]
    },
    {
      id: 3,
      icon: Database,
      title: 'Databases, Cloud & DevOps',
      description: 'Architecting scalable SQL/NoSQL databases with Redis caching, containerization, and cloud deployment pipelines.',
      capabilities: [
        'PostgreSQL, MongoDB, Supabase, Firebase',
        'Redis Performance Caching',
        'Docker Containerization',
        'GCP, Vercel & Render Cloud Hosting'
      ]
    }
  ];

  return (
    <section id="services" className="container-custom py-16">
      <h2 className="section-title">Services & Tech Stack</h2>

      {/* 3-Column Responsive Grid */}
      <div className="services-grid">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = activeService === service.id;
          return (
            <div 
              key={service.id} 
              className={`service-card ${isSelected ? 'border-white bg-[#1c1d26]' : ''}`}
              onClick={() => setActiveService(isSelected ? null : service.id)}
            >
              <div className="service-icon-box">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc mb-4">{service.description}</p>

              {/* Capabilities checklist */}
              <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                {service.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
