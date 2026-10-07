export const portfolioData = {
  personal: {
    name: "Alex Rivera",
    title: "Senior Full-Stack & AI Systems Engineer",
    tagline: "Architecting resilient distributed cloud systems, modern web apps, & intelligent AI agents.",
    location: "San Francisco, CA • Remote Worldwide",
    status: "Open for High-Impact Roles & Consulting",
    bio: "Passionate Full-Stack Engineer with 7+ years of experience building mission-critical web applications, high-throughput microservices, and AI-driven platforms. Obsessed with clean code architecture, sub-second latency, and delightful developer experiences.",
    avatarUrl: "/images/profile.png",
    email: "alex.rivera.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#resume-download",
    yearsExperience: 7,
    completedProjects: 45,
    openSourceStars: "2.4k+",
    codeLines: "1.2M+"
  },

  stats: [
    { label: "Years Experience", value: "7+", color: "var(--neon-cyan)" },
    { label: "Production Apps", value: "45+", color: "var(--neon-purple)" },
    { label: "Open Source Stars", value: "2.4k", color: "var(--neon-emerald)" },
    { label: "Global Users Served", value: "5M+", color: "var(--neon-amber)" }
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
      { name: "React / Next.js", level: 95, exp: "6 yrs" },
      { name: "TypeScript / ESNext", level: 92, exp: "6 yrs" },
      { name: "HTML5 / Modern CSS / Tailwind", level: 95, exp: "7 yrs" },
      { name: "State Mgt (Zustand, Redux, TanStack Query)", level: 90, exp: "5 yrs" },
      { name: "WebGL / Canvas / UI Animations", level: 82, exp: "3 yrs" }
    ],
    backend: [
      { name: "Node.js / Express / NestJS", level: 92, exp: "7 yrs" },
      { name: "Python (FastAPI, PyTorch, LangChain)", level: 88, exp: "4 yrs" },
      { name: "Go (Golang)", level: 82, exp: "3 yrs" },
      { name: "RESTful APIs / GraphQL / WebSockets", level: 94, exp: "7 yrs" },
      { name: "Microservice Architecture", level: 90, exp: "5 yrs" }
    ],
    cloud: [
      { name: "Docker & Containerization", level: 92, exp: "6 yrs" },
      { name: "Kubernetes & Helm", level: 84, exp: "4 yrs" },
      { name: "AWS / Google Cloud Platform", level: 88, exp: "5 yrs" },
      { name: "CI/CD (GitHub Actions, Terraform)", level: 86, exp: "5 yrs" },
      { name: "Linux Administration & Bash", level: 90, exp: "7 yrs" }
    ],
    databases: [
      { name: "PostgreSQL / TimescaleDB", level: 90, exp: "6 yrs" },
      { name: "Redis & In-Memory Caching", level: 92, exp: "6 yrs" },
      { name: "MongoDB / Vector DBs (Pinecone)", level: 85, exp: "4 yrs" },
      { name: "Prisma / Drizzle ORM", level: 88, exp: "3 yrs" }
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
    about: "Alex Rivera | Senior Full-Stack & AI Systems Engineer\n7+ Years building web platforms, high-scale APIs, & AI workflows.\nBased in San Francisco, CA. Available for remote work worldwide.",
    skills: "TECHNICAL STACK SUMMARY:\n[Frontend] React, Next.js, TypeScript, Tailwind, Canvas/WebGL\n[Backend] Node.js, Python FastAPI, Go, GraphQL, WebSockets\n[Infra] Kubernetes, Docker, AWS, GCP, Redis, CI/CD\n[Databases] PostgreSQL, TimescaleDB, MongoDB, Pinecone",
    projects: "FEATURED PRODUCTION PROJECTS:\n1. Cognito AI — Multi-Agent Workflow Engine\n2. AetherNet — Kubernetes Telemetry Monitor\n3. Orion Analytics — Web3 Algorithmic Trading Platform",
    contact: "CONNECT WITH ALEX:\nEmail: alex.rivera.dev@gmail.com\nGitHub: https://github.com\nLinkedIn: https://linkedin.com\nLocation: San Francisco, CA",
    "sudo hire": "[ACCESS GRANTED] Mico has been notified of your priority recruiter inquiry. Expect a response shortly!"
  }
};
