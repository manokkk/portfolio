import React, { useState } from 'react';
import { Code2, Key, Check, RefreshCw, FileText, Sparkles, Copy } from 'lucide-react';

export default function Playground() {
  const [activeTab, setActiveTab] = useState('jwt');
  
  // JWT state
  const [jwtInput, setJwtInput] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUml2ZXJhIiwicm9sZSI6IlNlbmlvciBGdWxsLVN0YWNrIEVuZ2luZWVyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [decodedHeader, setDecodedHeader] = useState({ alg: "HS256", typ: "JWT" });
  const [decodedPayload, setDecodedPayload] = useState({
    sub: "1234567890",
    name: "Alex Rivera",
    role: "Senior Full-Stack Engineer",
    iat: 1516239022
  });

  // JSON state
  const [jsonInput, setJsonInput] = useState('{"status":"success","code":200,"data":{"user":"alex","skills":["React","Node","Kubernetes"]}}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecodeJwt = (tokenStr) => {
    setJwtInput(tokenStr);
    try {
      const parts = tokenStr.split('.');
      if (parts.length === 3) {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        setDecodedHeader(header);
        setDecodedPayload(payload);
      }
    } catch (err) {
      // fallback
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setJsonOutput("⚠️ Invalid JSON syntax: " + err.message);
    }
  };

  const handleCopyOutput = () => {
    const textToCopy = activeTab === 'jwt' ? JSON.stringify(decodedPayload, null, 2) : jsonOutput;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="py-24 relative bg-[#080b12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="badge badge-purple mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Utilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Developer <span className="gradient-text">Sandbox & Tools</span>
          </h2>
          <p className="text-slate-400 text-base mt-2 max-w-lg">
            Test real full-stack web utilities directly in your browser.
          </p>
        </div>

        {/* Card Box */}
        <div className="glass-panel p-6 sm:p-8 border-sky-500/20">
          
          {/* Tool Tab Switcher */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('jwt')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'jwt'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>JWT Token Decoder</span>
              </button>

              <button
                onClick={() => { setActiveTab('json'); handleFormatJson(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'json'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>JSON Formatter & Validator</span>
              </button>
            </div>

            <button
              onClick={handleCopyOutput}
              className="text-xs font-mono text-slate-400 hover:text-sky-300 flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10"
              title="Copy Output"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          {/* JWT Decoder View */}
          {activeTab === 'jwt' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Encoded JWT String:</label>
                <textarea
                  rows={6}
                  value={jwtInput}
                  onChange={(e) => handleDecodeJwt(e.target.value)}
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-200 focus:border-sky-400 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-2">
                  Paste any JSON Web Token above to automatically inspect header & payload parameters.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Decoded Header & Payload:</label>
                <div className="terminal-window text-xs h-48 overflow-y-auto">
                  <div className="terminal-header">
                    <span className="text-[11px] font-mono text-sky-400">decoded_claims.json</span>
                  </div>
                  <pre className="p-4 text-emerald-300 font-mono">
                    <code>
                      {JSON.stringify({ header: decodedHeader, payload: decodedPayload }, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* JSON Formatter View */}
          {activeTab === 'json' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Raw JSON Input:</label>
                <textarea
                  rows={6}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-200 focus:border-purple-400 focus:outline-none"
                />
                <button
                  onClick={handleFormatJson}
                  className="btn-primary glass-button text-xs mt-3 w-full justify-center"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Format & Validate JSON</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Pretty Output:</label>
                <div className="terminal-window text-xs h-48 overflow-y-auto">
                  <div className="terminal-header">
                    <span className="text-[11px] font-mono text-purple-400">formatted_output.json</span>
                  </div>
                  <pre className="p-4 text-purple-200 font-mono">
                    <code>{jsonOutput || "Click Format button..."}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
