import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle, UserCheck, Sparkles, Monitor } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: '⚡ Alex Rivera Interactive Terminal v2.4.0\nType "help" to list available commands, or click quick shortcut chips below.'
    }
  ]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommandSubmit = (cmdToRun) => {
    const command = (cmdToRun || input).trim().toLowerCase();
    if (!command) return;

    const newHistory = [...history, { type: 'input', text: `$ ${command}` }];

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (command === 'date') {
      newHistory.push({ type: 'output', text: new Date().toString() });
    } else if (portfolioData.terminalCommands[command]) {
      newHistory.push({ type: 'output', text: portfolioData.terminalCommands[command] });
    } else if (command.startsWith('echo ')) {
      newHistory.push({ type: 'output', text: command.replace('echo ', '') });
    } else {
      newHistory.push({
        type: 'error',
        text: `zsh: command not found: "${command}". Type "help" to view list of valid commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const quickCmds = ['help', 'about', 'skills', 'projects', 'contact', 'sudo hire', 'clear'];

  return (
    <section id="terminal" className="py-20 relative bg-[#080b12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="badge badge-cyan mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive CLI Shell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Developer <span className="gradient-text">Terminal Playground</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Execute commands in real time to explore system specs, tech stack architecture, or dispatch recruiter notifications.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="terminal-window">
          
          {/* Header Bar */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-sky-400" />
              <span>alex@rivera-mbp: ~ (zsh)</span>
            </div>
            <button
              onClick={() => setHistory([])}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              title="Clear Console History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal History Output */}
          <div 
            className="terminal-body space-y-3 cursor-text font-mono text-sm leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {item.type === 'input' && (
                  <div className="text-sky-400 font-semibold">{item.text}</div>
                )}
                {item.type === 'system' && (
                  <div className="text-emerald-400 border-l-2 border-emerald-500 pl-3 py-1 bg-emerald-500/5 rounded-r">
                    {item.text}
                  </div>
                )}
                {item.type === 'output' && (
                  <div className="text-slate-200 pl-2">{item.text}</div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 pl-2">{item.text}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Command Input Line */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleCommandSubmit(); }}
            className="bg-[#121721] p-3 border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-mono text-sm font-bold pl-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. 'help', 'skills', 'sudo hire')..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-sky-200 placeholder-slate-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 transition-colors"
              title="Execute Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Quick Command Shortcuts */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-mono text-slate-500 mr-2">Quick Commands:</span>
          {quickCmds.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommandSubmit(cmd)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-sky-500/40 text-slate-400 hover:text-sky-300 text-xs font-mono transition-all hover:scale-105"
            >
              {cmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
