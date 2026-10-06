import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#ffffff] font-sans antialiased">
      <Navbar 
        email="micogianan28@gmail.com" 
        onOpenResume={() => setIsResumeOpen(true)}
      />
      
      <main>
        <Hero 
          name="Mico"
          description="a Full-Stack Web & Mobile Developer in Taguig, Philippines. Specializing in Next.js, NestJS, .NET Framework, and React Native (Expo) to build scalable cross-platform applications."
        />
        <Works />
        <Services />
        <Contact email="micogianan28@gmail.com" />
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
