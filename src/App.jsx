import React, { useState } from 'react';
import { useRouter } from './hooks/useRouter';
import ArkivePage from './pages/ArkivePage';
import ArkiveProjectsPage from './pages/ArkiveProjectsPage';
import ArkiveProjectDetailPage from './pages/ArkiveProjectDetailPage';
import CosmicOdyssey3D from './components/CosmicOdyssey3D';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const { currentPath, getQueryParam, navigate } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [prefilledInquiry, setPrefilledInquiry] = useState(null);

  // Dedicated Project Detail Page (/arkive/project?id=...)
  if (currentPath.toLowerCase().startsWith('/arkive/project') && !currentPath.toLowerCase().startsWith('/arkive/projects')) {
    const projectId = getQueryParam('id') || 'proj-1';
    const categoryParam = getQueryParam('category') || 'conceptual';
    return (
      <ArkiveProjectDetailPage 
        projectId={projectId} 
        onNavigate={(to) => navigate(to)}
        onNavigateBack={() => navigate(`/arkive/projects?category=${categoryParam}`)}
      />
    );
  }

  // Standalone Projects Gallery Page (/arkive/projects?category=...)
  if (currentPath.toLowerCase().startsWith('/arkive/projects')) {
    const categoryParam = getQueryParam('category') || 'conceptual';
    return (
      <ArkiveProjectsPage 
        initialCategory={categoryParam} 
        onNavigate={(to) => navigate(to)}
        onNavigateBack={() => navigate('/arkive#projects')} 
        onNavigateProject={(id, cat) => navigate(`/arkive/project?id=${id}&category=${cat}`)}
      />
    );
  }

  // Arkive Studio Home (/arkive)
  if (currentPath.toLowerCase().startsWith('/arkive')) {
    return (
      <ArkivePage 
        onNavigateHome={() => navigate('/')} 
        onNavigateProjects={(cat) => navigate(`/arkive/projects?category=${cat}`)}
      />
    );
  }

  const handleSelectInquiry = (topic, message) => {
    setPrefilledInquiry({ topic, message });
    setTimeout(() => {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-[#ffffff] font-sans antialiased relative">
      {/* J.A.R.V.I.S. Stark Industries Preloader with Arc Iris Aperture Closing FX */}
      {isLoading && (
        <Preloader 
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* 3D Cosmic Space Odyssey Scrollytelling System */}
      <CosmicOdyssey3D />

      <Navbar 
        email="micogianan28@gmail.com" 
        onOpenResume={() => setIsResumeOpen(true)}
      />
      
      <main className="relative z-10">
        <Hero 
          name="Mico"
          description="a Full-Stack Web & Mobile Developer in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build scalable cross-platform applications."
        />
        <Works />
        <Services onRequestInquiry={handleSelectInquiry} />
        <Contact 
          email="micogianan28@gmail.com" 
          prefilledInquiry={prefilledInquiry}
        />
      </main>

      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
