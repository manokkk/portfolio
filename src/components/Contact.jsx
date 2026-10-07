import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ExternalLink, MessageSquare, MailCheck } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Contact({ email = "micogianan28@gmail.com" }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: 'Full-Stack Web Development', message: '' });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("09393191546");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${form.topic} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);

    try {
      // Free Web3Forms endpoint dispatches submission to email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2d3d385f-99ed-4118-b15d-a73846db72d3', // Web3Forms Access Key for micogianan28@gmail.com
          name: form.name,
          email: form.email,
          subject: `[Portfolio Inquiry] ${form.topic} - ${form.name}`,
          message: `Sender Name: ${form.name}\nSender Email: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`,
          from_name: form.name
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        triggerMailtoFallback();
        setSubmitted(true);
      }
    } catch (err) {
      triggerMailtoFallback();
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container-custom">
        
        {/* 2-Column Grid */}
        <div className="contact-grid">
          
          {/* Left Column: Headline, Bio & Interactive Contact Cards */}
          <div className="contact-info-col">
            <span className="card-category mb-2">GET IN TOUCH</span>
            <h2 className="section-title mb-3" style={{ fontSize: '2.5rem' }}>
              Let's build something extraordinary.
            </h2>
            <p className="hero-description text-left mb-6" style={{ fontSize: '1rem', maxWidth: '500px' }}>
              Have a project in mind, a full-stack engineering position, or a mobile app opportunity? Reach out directly or send a message.
            </p>

            {/* Availability pill */}
            <div className="status-badge mb-6" style={{ width: 'fit-content', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              <span className="status-dot"></span>
              <span>Available for Full-Stack, Web & Mobile Projects</span>
            </div>

            {/* Stack of Interactive Info Cards */}
            <div className="contact-cards-stack">
              
              {/* Email Card */}
              <div className="contact-info-card" onClick={handleCopyEmail} title="Click to copy email">
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <Mail className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <span className="contact-card-label">EMAIL ADDRESS</span>
                    <span className="contact-card-val">{email}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-400 flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Phone Card */}
              <div className="contact-info-card" onClick={handleCopyPhone} title="Click to copy phone number">
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="contact-card-label">PHONE / WHATSAPP</span>
                    <span className="contact-card-val">+63 939 319 1546</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-400 flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Location Card */}
              <div className="contact-info-card" style={{ cursor: 'default' }}>
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="contact-card-label">LOCATION</span>
                    <span className="contact-card-val">Taguig City, Philippines</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">GMT +8</span>
              </div>

              {/* GitHub Card */}
              <a 
                href="https://github.com/manokkk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-info-card"
              >
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <GithubIcon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <span className="contact-card-label">GITHUB PROFILE</span>
                    <span className="contact-card-val">github.com/manokkk</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>

            </div>
          </div>

          {/* Right Column: Sleek Message Form Box */}
          <div className="form-box">
            {submitted ? (
              <div className="form-success-card text-left items-start">
                
                {/* 1. Headline */}
                <h3 className="section-title text-left mb-3" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
                  Message Transmitted.
                </h3>

                {/* 2. Description */}
                <p className="hero-description text-left mb-8" style={{ fontSize: '0.95rem', maxWidth: '480px', lineHeight: '1.6' }}>
                  Thank you, <strong className="text-white font-bold">{form.name}</strong>! Your inquiry regarding <span className="text-emerald-400 font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">{form.topic}</span> has been dispatched to Mico's primary inbox.
                </p>

                {/* Action Buttons */}
                <div className="success-action-row">
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: 'Full-Stack Web Development', message: '' }); }}
                    className="btn-success-item btn-success-white"
                  >
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                  <a
                    href="#works"
                    className="btn-success-item btn-success-outline"
                  >
                    <span>EXPLORE PROJECTS</span>
                  </a>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2" style={{ marginBottom: '2.5rem' }}>
                  <MessageSquare className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-bold text-white">Direct Inquiry Form</h3>
                </div>

                <div className="form-group">
                  <label className="form-label">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Connor"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PROJECT TYPE / TOPIC</label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="form-select"
                  >
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Mobile App (Expo)">Mobile App Development</option>
                    <option value="Database & APIs">Database Architecture & REST APIs</option>
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    <option value="Consulting & Advice">Consulting & Project Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">YOUR MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your web, mobile, or engineering requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" disabled={submitting} className="pill-btn-white w-full justify-center mt-2 disabled:opacity-75">
                  {submitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
