export const portfolioData = {
  personal: {
    name: "Mico H. Gianan",
    title: "Full-Stack Web & Mobile Developer",
    tagline: "Building scalable cross-platform mobile apps, modern web apps, & resilient cloud backends.",
    location: "Taguig City, Philippines",
    status: "Available for Full-Stack, Web & Mobile Roles",
    bio: "Full-Stack Web & Mobile Developer specializing in React.js, Next.js, React Native, NestJS, .NET Framework, and Laravel. Experienced with AWS, Docker, PostgreSQL, Supabase, Firebase, and IoT microcontrollers.",
    avatarUrl: "/Copy_of_GIANAN__Mico_H._0335-removebg-preview.png",
    email: "micogianan28@gmail.com",
    github: "https://github.com/manokkk",
    linkedin: "https://linkedin.com",
    resumeUrl: "/Gianan_Resume_FullStackDev.pdf",
    yearsExperience: "4+",
    completedProjects: "15+",
    openSourceStars: "40+",
    codeLines: "250k+"
  },

  stats: [
    { label: "Active Stacks", value: "6+", color: "var(--neon-cyan)" },
    { label: "Production Apps", value: "10+", color: "var(--neon-purple)" },
    { label: "API Endpoints Built", value: "120+", color: "var(--neon-emerald)" },
    { label: "Client Satisfaction", value: "100%", color: "var(--neon-amber)" }
  ],

  projects: [
    {
      id: "cognito-ai",
      title: "Cognito AI — Multi-Agent Workflow Engine",
      category: "AI & Full Stack",
      featured: true,
      image: "/images/project_ai_platform.jpg",
      description: "Enterprise visual orchestrator for autonomous AI agents. Features graph-based execution pipelines, LLM prompt chaining, human-in-the-loop validation, and real-time streaming diagnostics.",
      longDescription: "Cognito AI solves complex LLM orchestration by enabling developers to build, test, and deploy multi-agent agentic workflows visually. Built with React, TypeScript, Python FastAPI, WebSockets, and Redis.",
      techStack: ["React", "TypeScript", "Python", "FastAPI", "Redis", "Docker", "WebSockets"],
      metrics: ["345k daily requests", "99.9% execution reliability", "50% latency drop"],
      githubUrl: "https://github.com/example/cognito-ai",
      demoUrl: "https://cognito-ai-demo.example.com",
      architectureHighlights: [
        "Distributed task queues powered by Redis and Celery worker pools",
        "Sub-100ms real-time event broadcasting over WebSocket channels",
        "Custom node graph canvas renderer supporting 500+ dynamic nodes",
        "Strict Schema Validation for AI JSON output payload structures"
      ],
      sampleCode: `// Agent Workflow Dispatcher Snippet
export async function executeAgentGraph(workflowId, contextPayload) {
  const runner = new AgentGraphRunner({
    maxConcurrent: 8,
    timeoutMs: 30000,
  });
  
  runner.on('node:step', (event) => {
    broadcastTelemetry(workflowId, event);
  });
  
  return await runner.process(workflowId, contextPayload);
}`
    },
    {
      id: "aethernet-k8s",
      title: "AetherNet — K8s Infrastructure Telemetry",
      category: "Cloud & DevOps",
      featured: true,
      image: "/images/project_cloud_ops.jpg",
      description: "Low-overhead Kubernetes cluster health monitor with P99 latency sparklines, automated anomaly detection, microservice dependency graphing, and instant eBPF packet inspection.",
      longDescription: "AetherNet provides real-time visibility into cloud-native microservices. It automatically traces RPC calls between pods, computes dynamic error budget burns, and alerts devops teams before outages occur.",
      techStack: ["Go", "React", "Prometheus", "eBPF", "Kubernetes", "GraphQL", "TailwindCSS"],
      metrics: ["Monitors 1,000+ pods", "< 1% CPU overhead", "Instant Slack alerts"],
      githubUrl: "https://github.com/example/aethernet",
      demoUrl: "https://aethernet-demo.example.com",
      architectureHighlights: [
        "Kernel-level packet capturing using Linux eBPF probes",
        "High-performance Go gRPC telemetry collector pipeline",
        "Virtualised canvas graph rendering for 1,000+ microservice pods",
        "Time-series data compression with custom downsampling filters"
      ],
      sampleCode: `// eBPF Telemetry Ingest Buffer (Go)
package telemetry

type ClusterMonitor struct {
	MetricsChan chan PodMetric
	Prometheus  *prometheus.Registry
}

func (cm *ClusterMonitor) IngestProbe(event Event) {
	cm.MetricsChan <- PodMetric{
		PodID:     event.PodID,
		LatencyNs: event.DurationNs,
		StatusCode: event.Code,
	}
}`
    },
    {
      id: "orion-trading",
      title: "Orion Analytics — Algorithmic Web3 Trading",
      category: "Fintech & Web3",
      featured: true,
      image: "/images/project_fintech_analytics.jpg",
      description: "Ultra-fast Web3 DEX liquidity aggregator and algorithmic crypto trading portal. Includes live orderbook depth visualizer, arbitrage bot simulator, and interactive backtesting charts.",
      longDescription: "Orion Analytics processes high-frequency market depth feeds from multiple decentralized exchanges, executing smart routing strategies with sub-second execution speeds.",
      techStack: ["React", "Ethers.js", "Node.js", "TimescaleDB", "Rust", "WebSockets"],
      metrics: ["$45M total routed volume", "< 120ms trade routing", "Zero slippage loss"],
      githubUrl: "https://github.com/example/orion-analytics",
      demoUrl: "https://orion-demo.example.com",
      architectureHighlights: [
        "Rust core engine for concurrent orderbook state synchronization",
        "WebSockets feed processing 10,000 depth updates per second",
        "Lightweight Canvas-rendered candlestick charts with zero frame drop",
        "Non-custodial smart contract wallet execution via Ethers.js"
      ],
      sampleCode: `// Rust Orderbook Matching Stub
pub fn calculate_optimal_route(
    buy_orders: &[Order],
    sell_orders: &[Order],
    amount: u128
) -> RoutingResult {
    let mut accumulated = 0u128;
    let mut best_execution = RoutingResult::default();
    // High speed memory buffer traversal...
    best_execution
}`
    }
  ],

  skills: {
    frontend: [
      { name: "React.JS & Next.JS", level: 95, exp: "4 yrs" },
      { name: "React Native (Expo Mobile)", level: 90, exp: "3 yrs" },
      { name: "React Redux & State Mgt", level: 88, exp: "3 yrs" },
      { name: "MERN Stack Development", level: 92, exp: "4 yrs" },
      { name: "HTML & CSS / Modern UI", level: 95, exp: "4 yrs" }
    ],
    backend: [
      { name: "Laravel Framework & PHP", level: 90, exp: "3 yrs" },
      { name: "NestJS & Node.js", level: 88, exp: "3 yrs" },
      { name: ".NET Framework & C#", level: 86, exp: "2 yrs" },
      { name: "Python Programming (FastAPI)", level: 88, exp: "3 yrs" },
      { name: "Java Programming & C++", level: 84, exp: "3 yrs" },
      { name: "REST APIs & Systems Dev", level: 94, exp: "4 yrs" }
    ],
    cloud: [
      { name: "Amazon Web Services (AWS)", level: 85, exp: "2 yrs" },
      { name: "Docker Software & Containers", level: 88, exp: "3 yrs" },
      { name: "CI/CD & Deployment Pipelines", level: 86, exp: "3 yrs" },
      { name: "Git Version Control System", level: 94, exp: "4 yrs" },
      { name: "Troubleshooting & Debugging", level: 92, exp: "4 yrs" }
    ],
    databases: [
      { name: "PostgreSQL & Database Systems", level: 92, exp: "4 yrs" },
      { name: "MongoDB & Supabase", level: 90, exp: "3 yrs" },
      { name: "Firebase & Redis Caching", level: 88, exp: "3 yrs" },
      { name: "SQL Query Language & PhpMyAdmin", level: 94, exp: "4 yrs" }
    ],
    hardware: [
      { name: "Raspberry PI & ESP32", level: 88, exp: "3 yrs" },
      { name: "Claude Opus & AI Automation", level: 92, exp: "2 yrs" }
    ]
  },

  experiences: [
    {
      period: "2023 — Present",
      role: "Lead Full-Stack & AI Engineer",
      company: "Nexus Automation Tech",
      location: "San Francisco, CA",
      description: "Spearheading the core AI agent workflow platform. Leading a team of 6 engineers across React frontend, Python LLM microservices, and Kubernetes deployment pipelines.",
      highlights: [
        "Architected real-time streaming LLM pipeline serving 500k+ monthly active requests",
        "Reduced frontend bundle size by 42% through smart code-splitting and asset optimization",
        "Introduced automated e2e testing, increasing deployment frequency from weekly to daily"
      ],
      technologies: ["React", "TypeScript", "Python", "FastAPI", "Kubernetes", "Redis"]
    },
    {
      period: "2021 — 2023",
      role: "Senior Software Engineer",
      company: "CloudScale Systems",
      location: "Austin, TX (Remote)",
      description: "Built high-availability cloud monitoring dashboards and microservices infrastructure.",
      highlights: [
        "Engineered real-time telemetry pipeline in Go and React handling 10M events/day",
        "Migrated legacy monolithic backend to scalable gRPC microservices",
        "Mentored junior developers and authored company engineering style guidelines"
      ],
      technologies: ["Go", "React", "GraphQL", "PostgreSQL", "Docker", "AWS"]
    },
    {
      period: "2019 — 2021",
      role: "Full-Stack Web Developer",
      company: "Vanguard Interactive Studio",
      location: "New York, NY",
      description: "Developed interactive web applications, client dashboards, and e-commerce platforms.",
      highlights: [
        "Built 20+ responsive web interfaces for high-profile client applications",
        "Optimized database queries resulting in a 65% speedup in page loading times"
      ],
      technologies: ["JavaScript", "Node.js", "Vue.js", "Express", "MongoDB", "CSS3"]
    }
  ],

  terminalCommands: {
    help: "Available commands:\n  • about      - Brief bio and background summary\n  • skills     - Core technical stack breakdown\n  • projects   - View top production projects\n  • contact    - Get email and social contact details\n  • sudo hire  - Dispatch instant recruiter priority access\n  • cat resume - Print summary resume details\n  • clear      - Clear terminal screen history\n  • date       - Show current system date & time",
    about: "Mico H. Gianan | Full-Stack Web & Mobile Developer\nBuilding scalable cross-platform mobile apps, modern web platforms & APIs.\nBased in Taguig City, Philippines.",
    skills: "TECHNICAL STACK SUMMARY:\n[Frontend & Mobile] React.JS, Next.JS, React Native, React Redux, MERN Stack, HTML, CSS\n[Backend & Languages] Laravel, NestJS, .NET, Python, PHP, Java, C#, C++, REST APIs\n[Databases & Storage] PostgreSQL, MongoDB, Supabase, Firebase, PhpMyAdmin, Redis\n[Cloud & DevOps] AWS, Docker Software, CI/CD Pipelines, Git Version Control\n[Hardware & AI] Raspberry Pi, ESP32, Claude Opus, Automation",
    projects: "FEATURED PRODUCTION PROJECTS:\n1. Inspire Holdings Inc. — Web Platform & Admin Suite\n2. IamWallet — Mobile Application & Web Admin\n3. ISAP — TUPT Thesis Digital Archive & Search Engine\n4. IoT Embedded Hardware & Telemetry System",
    contact: "CONNECT WITH MICO:\nEmail: micogianan28@gmail.com\nPhone: +63 939 319 1546\nGitHub: https://github.com/manokkk\nLocation: Taguig City, Philippines",
    "sudo hire": "[ACCESS GRANTED] Mico has been notified of your priority recruiter inquiry. Expect a response shortly!"
  }
};
