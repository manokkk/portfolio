import React, { useState } from 'react';
import { Mail, Menu, X, Check } from 'lucide-react';

export default function Navbar({ email = "micogianan28@gmail.com", onOpenResume }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        
        {/* Left: Circled mail icon + email button with instant copy feedback */}
        <button onClick={handleCopyEmail} className="email-pill" title="Click to copy email address">
          <div className="icon-circle">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-white" />}
          </div>
          <span>{copied ? "Copied!" : email}</span>
        </button>

        {/* Right: Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="#works" className="nav-link">Works</a>
          <button onClick={onOpenResume} className="nav-link">Resume</button>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle-btn"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <a href="#works" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Works</a>
          <button 
            onClick={() => { setMobileOpen(false); onOpenResume(); }} 
            className="mobile-nav-link"
          >
            Resume
          </button>
          <a href="#services" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Services</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Contact</a>
        </div>
      )}
    </header>
  );
}
