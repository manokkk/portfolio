import React, { useState } from 'react';
import CosmicOdyssey3D from './components/CosmicOdyssey3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [prefilledInquiry, setPrefilledInquiry] = useState(null);

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
