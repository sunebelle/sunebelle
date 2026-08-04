"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail, MapPin, ArrowUpRight, BarChart, Server, LayoutDashboard,
  Briefcase, Code, CheckCircle, Terminal, Smartphone, Calendar,
  FileText, Send, User, ChevronRight, Menu, X, Plus, Filter, Trash2
} from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MotionBackground from "@/components/MotionBackground";

export default function Home() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hero Terminal Tab State
  const [activeTerminalTab, setActiveTerminalTab] = useState("schema");

  // Interactive Invoice Generator Demo States
  const [invoices, setInvoices] = useState([
    { id: "INV-001", client: "Acme Corporation", amount: 1250, status: "Paid", date: "2026-08-01" },
    { id: "INV-002", client: "Globex Logistics", amount: 3400, status: "Pending", date: "2026-08-02" },
    { id: "INV-003", client: "Initech Software", amount: 980, status: "Paid", date: "2026-08-03" },
  ]);
  const [demoClient, setDemoClient] = useState("");
  const [demoAmount, setDemoAmount] = useState("");
  const [demoFilter, setDemoFilter] = useState("all");
  const [demoSuccessMsg, setDemoSuccessMsg] = useState("");

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Invoice Calculator
  const totalRevenue = invoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Add Invoice handler
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoClient || !demoAmount) return;

    const amountNum = parseFloat(demoAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newInv = {
      id: `INV-00${invoices.length + 1}`,
      client: demoClient,
      amount: amountNum,
      status: "Pending",
      date: new Date().toISOString().split("T")[0]
    };

    setInvoices([newInv, ...invoices]);
    setDemoClient("");
    setDemoAmount("");
    setDemoSuccessMsg("Invoice successfully generated!");
    setTimeout(() => setDemoSuccessMsg(""), 3000);
  };

  // Toggle invoice status
  const toggleInvoiceStatus = (id: string) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        const nextStatus = inv.status === "Paid" ? "Pending" : "Paid";
        return { ...inv, status: nextStatus };
      }
      return inv;
    }));
  };

  // Delete invoice
  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactSubmitted(false);
    }, 4000);
  };

  const projects = [
    {
      title: "Procurement & Invoice Tracking System",
      projectName: "Billflow",
      description: "A billing dashboard for small businesses to track revenue, invoices, and payments.",
      problem: "Manual tracking of invoices and payments leads to errors and delays",
      solution: "Built a centralized dashboard for managing invoices, payments, and tracking",
      impact: "Improved visibility and reduced manual errors",
      features: ["Automated Invoicing", "Real-time Dashboard", "Payment Tracking"],
      tech: ["React", "Next.js", "Tailwind CSS", "Firebase"],
      link: "https://billflow-64423.web.app/",
      color: "from-indigo-600/30 to-purple-600/30",
      glowColor: "rgba(99,102,241,0.4)",
      image: "/images/billflow.png",
    },
    {
      title: "Elegant Restaurant Platform",
      projectName: "Lumiere",
      description: "A premium digital presence for fine dining establishments.",
      problem: "Restaurants struggle to translate their physical dining experience into a digital format.",
      solution: "Developed a visually immersive platform with seamless reservations and menu showcasing.",
      impact: "Elevated brand perception and increased online booking conversions.",
      features: ["Immersive UI/UX", "Menu Management", "Reservation System"],
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "https://lumiere-five-brown.vercel.app/",
      color: "from-amber-600/30 to-orange-600/30",
      glowColor: "rgba(245,158,11,0.4)",
      image: "/images/lumiere.png",
    },
    {
      title: "Digital Donation Platform",
      projectName: "Kindora",
      description: "A secure donation platform featuring an admin approval flow.",
      problem: "Charities often lack transparency and face friction in collecting digital donations.",
      solution: "Built a streamlined platform with an admin dashboard to verify and approve campaigns.",
      impact: "Increased donor trust and simplified campaign management for administrators.",
      features: ["Admin Approval Workflow", "Secure Payments", "Campaign Tracking"],
      tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      link: "https://kindora.duckdns.org/",
      color: "from-pink-600/30 to-purple-600/30",
      glowColor: "rgba(236,72,153,0.4)",
      image: "/images/kindora.png",
    },
    {
      title: "Artisanal Cafe Experience",
      projectName: "Aura Coffee",
      description: "Modern aesthetic cafe experience website.",
      problem: "Local cafes have generic websites that fail to capture their unique atmosphere.",
      solution: "Designed a high-end, aesthetic web presence focusing on the artisanal coffee journey.",
      impact: "Enhanced local SEO and drove higher foot traffic through a strong digital identity.",
      features: ["Aesthetic Design", "Location Mapping", "Product Showcase"],
      tech: ["React", "Tailwind CSS", "Vercel"],
      link: "https://aura-coffee-liard.vercel.app/",
      color: "from-emerald-600/30 to-teal-600/30",
      glowColor: "rgba(16,185,129,0.4)",
      image: "/images/aura-coffee.png",
    },
  ];

  const solutions = [
    {
      title: "Quotation & Procurement",
      subtitle: "B2B Workflow",
      icon: <BarChart className="w-6 h-6 text-indigo-400" />,
      description: "Streamline B2B workflows with custom procurement pipelines that track quotes and eliminate data entry.",
      badge: "Automation Core"
    },
    {
      title: "Dashboards & Admin Panels",
      subtitle: "Real-time Metrics",
      icon: <LayoutDashboard className="w-6 h-6 text-purple-400" />,
      description: "Centralized operational hubs combining interactive analytics charts with performant grid actions.",
      badge: "High Performance"
    },
    {
      title: "Workflow Automations",
      subtitle: "API Integrations",
      icon: <Server className="w-6 h-6 text-pink-400" />,
      description: "Connect systems, sync invoices, send alerts, and replace repetitive spreadsheet tasks.",
      badge: "100% Custom"
    },
    {
      title: "Premium Web Platforms",
      subtitle: "UX/SEO Optimization",
      icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
      description: "Blazingly fast websites built using modern SEO architecture and fluid micro-interactions.",
      badge: "Vite / NextJS"
    }
  ];

  const reasons = [
    {
      title: "Focus on Business Logic",
      description: "Beautiful design is essential, but it must solve bottlenecks. I study your business processes before writing any code to align features with productivity.",
      icon: <Code className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Enterprise Grade Standards",
      description: "I build maintainable, strongly-typed architectures that scale as you grow, ensuring codebase longevity and minimal technical debt.",
      icon: <Server className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Transparent Collaboration",
      description: "No disappearing acts or unexpected delays. I deliver modular progress updates, clean pull-requests, and transparent timeline estimations.",
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />
    }
  ];

  // Hero Terminal Content
  const terminalContent = {
    schema: `// Procurement Schema definition
interface ProcurementWorkflow {
  id: string;
  requesterId: string;
  department: "Engineering" | "Operations";
  status: "Draft" | "Awaiting_Approval" | "Approved" | "Ordered";
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalCost: number;
}

export function calculateTotal(items: Array<any>): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}`,
    database: `--- Query database for pending approvals
SELECT 
  invoices.id,
  clients.name AS client_name,
  invoices.amount,
  invoices.created_at
FROM invoices
INNER JOIN clients ON invoices.client_id = clients.id
WHERE invoices.status = 'PENDING'
ORDER BY invoices.amount DESC
LIMIT 5;`,
    terminal: `[sunebelle-dev] $ npm run build

▲ Next.js 16.2.11 (Turbopack)
- Route (app)           Size       First Load JS
  ┌ λ /                 4.52 kB          89.2 kB
  └ ○ /_not-found       924 B            83.1 kB
+ First Load JS shared by all    78.4 kB

✓ Compiled successfully in 1.4s (1022 modules)
[sunebelle-dev] $ _`
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">

      {/* 0. NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-4 shadow-2xl" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              sunebelle<span className="text-slate-400">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#solutions" className="hover:text-indigo-400 transition-colors">Solutions</Link>
            <Link href="#bento" className="hover:text-indigo-400 transition-colors">Capabilities</Link>
            <Link href="#projects" className="hover:text-indigo-400 transition-colors">Featured Projects</Link>
            <Link href="#demo" className="hover:text-indigo-400 transition-colors">Interactive Demo</Link>
            <Link href="#services" className="hover:text-indigo-400 transition-colors">Services</Link>
            <Link href="#why-me" className="hover:text-indigo-400 transition-colors">Why Choose Me</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://github.com/sunebelle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all text-sm font-semibold shadow-lg"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-slate-900 px-6 py-8 flex flex-col gap-6 md:hidden z-40"
            >
              <Link
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Solutions
              </Link>
              <Link
                href="#bento"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Capabilities
              </Link>
              <Link
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Featured Projects
              </Link>
              <Link
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Interactive Demo
              </Link>
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#why-me"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Why Choose Me
              </Link>
              <div className="h-px bg-slate-900 w-full" />
              <div className="flex items-center justify-between">
                <a href="https://github.com/sunebelle" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white">
                  <FaGithub className="w-5 h-5" /> @sunebelle
                </a>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DYNAMIC MOTION BACKGROUND */}
      <MotionBackground />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 pt-36 md:pt-44 pb-24 max-w-7xl">

        {/* 1. HERO SECTION */}
        <section className="min-h-[80vh] flex items-center mb-8 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  I build workflows
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-slate-100">
                Hi, I&apos;m Sunebelle. <br />
                I create <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)] font-extrabold">high-efficiency</span> web systems.
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed border-l-2 border-indigo-500 pl-4 py-1">
                {/* Specialized in building automated workflows, management dashboards, and modern business websites that streamline operations. */}
                Specializing in automated workflows, scalable dashboards, and modern business websites, I create solutions that streamline operations, enhance user experience, and drive real business impact.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="#projects"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold transition-all shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center gap-2 group text-sm"
                >
                  Explore Showcase
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="#demo"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold hover:bg-slate-800 hover:border-slate-700 transition-all text-sm flex items-center gap-2"
                >
                  Try Live Simulation
                </Link>
              </div>
            </div>

            {/* Right Interactive Mockup Terminal Column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-3xl" />

              {/* Terminal Frame */}
              <div className="relative glass-panel rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden text-left font-mono text-sm max-w-lg mx-auto">

                {/* Header Window Buttons */}
                <div className="bg-slate-950/80 px-4 py-3 flex items-center justify-between border-b border-slate-900">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-sans">sunebelle-dashboard.ts</span>
                  <div className="w-12" />
                </div>

                {/* Tabs Selector */}
                <div className="flex bg-slate-900/40 border-b border-slate-900/60 text-xs">
                  <button
                    onClick={() => setActiveTerminalTab("schema")}
                    className={`px-4 py-2.5 border-r border-slate-900 font-sans transition-colors ${activeTerminalTab === "schema" ? "bg-slate-950/60 text-indigo-400 border-t-2 border-t-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    workflow.ts
                  </button>
                  <button
                    onClick={() => setActiveTerminalTab("database")}
                    className={`px-4 py-2.5 border-r border-slate-900 font-sans transition-colors ${activeTerminalTab === "database" ? "bg-slate-950/60 text-purple-400 border-t-2 border-t-purple-500" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    query.sql
                  </button>
                  <button
                    onClick={() => setActiveTerminalTab("terminal")}
                    className={`px-4 py-2.5 font-sans transition-colors ${activeTerminalTab === "terminal" ? "bg-slate-950/60 text-pink-400 border-t-2 border-t-pink-500" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    npm run build
                  </button>
                </div>

                {/* Terminal Window Content */}
                <div className="p-5 h-64 overflow-y-auto bg-slate-950/40 text-slate-300 text-xs leading-relaxed">
                  <pre className="whitespace-pre">
                    <code>{terminalContent[activeTerminalTab as keyof typeof terminalContent]}</code>
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. CORE SOLUTIONS */}
        <section id="solutions" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Solutions</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">Bespoke Systems I Build</h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg">
              Operational complexity requires robust solutions. I build lightweight, responsive web dashboards that streamline business logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, index) => (
              <div
                key={index}
                className="glass-card-bright rounded-2xl p-6 md:p-8 card-gradient-border glass-card-bright-hover transition-all duration-355 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-slate-950/5 border border-slate-200/50 flex items-center justify-center">
                      {sol.icon}
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-mono bg-indigo-55 text-indigo-700 rounded-md border border-indigo-200 font-semibold">
                      {sol.badge}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{sol.title}</h3>
                  <div className="text-xs font-medium text-slate-500 mb-4">{sol.subtitle}</div>
                  <p className="text-slate-655 text-sm leading-relaxed">{sol.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CAPABILITIES BENTO GRID */}
        <section id="bento" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Technical Framework</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">Architecture Capabilities</h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg">
              A quick layout review of how systems are structured for performance, scale, and integration.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

            {/* Box 1: Procurement flow visual (Spans 4 columns) */}
            <div className="md:col-span-4 glass-panel rounded-2xl p-6 md:p-8 card-gradient-border flex flex-col justify-between overflow-hidden relative">
              <div className="space-y-4 max-w-md relative z-10">
                <span className="text-xs font-mono text-indigo-400">01 / Procurement pipelines</span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">Automated Purchase Orders</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Connecting request approvals directly with digital suppliers. Minimizing authorization bottlenecks in logistics workflows.
                </p>
              </div>

              {/* Graphical workflow simulation */}
              <div className="mt-8 flex flex-wrap items-center gap-3 relative z-10">
                <div className="px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span>Draft Quote</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                <div className="px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Manager Approved</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                <div className="px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>PO Issued</span>
                </div>
              </div>

              <div className="absolute right-0 bottom-0 w-44 h-44 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />
            </div>

            {/* Box 2: Metrics Preview (Spans 2 columns) */}
            <div className="md:col-span-2 glass-card-bright rounded-2xl p-6 md:p-8 card-gradient-border flex flex-col justify-between relative overflow-hidden group hover:border-slate-300/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-mono text-purple-650">02 / System Efficiency</span>
                <h3 className="text-xl font-bold text-slate-900">Operations</h3>
                <p className="text-slate-655 text-xs leading-relaxed">
                  Automated operations reduce manual entry error rates down to near zero.
                </p>
              </div>

              {/* Simple metrics simulation */}
              <div className="mt-6 space-y-3 relative z-10">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Entry Automation Rate</span>
                  <span className="text-indigo-600 font-bold">96%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: "96%" }} />
                </div>

                <div className="flex justify-between text-xs text-slate-500 pt-2">
                  <span>Speedups</span>
                  <span className="text-purple-600 font-bold">12x Faster</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>

            {/* Box 3: Automated nodes mapping (Spans 2 columns) */}
            <div className="md:col-span-2 glass-card-bright rounded-2xl p-6 md:p-8 card-gradient-border flex flex-col justify-between relative overflow-hidden group hover:border-slate-300/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-mono text-pink-600">03 / Integrations</span>
                <h3 className="text-xl font-bold text-slate-900 font-sans">Synced APIs</h3>
                <p className="text-slate-655 text-xs leading-relaxed">
                  Real-time webhook synchronization connecting payments with administrative ledger tools.
                </p>
              </div>

              {/* Node trigger widget */}
              <div className="mt-6 border border-slate-200/80 bg-slate-50/80 rounded-xl p-3.5 text-[10px] font-mono space-y-2 relative z-10 shadow-sm text-slate-700">
                <div className="flex items-center justify-between text-slate-500">
                  <span>TRIGGER</span>
                  <span className="text-amber-600 font-bold">Invoice Paid</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="text-slate-500">
                  ACTION: <span className="text-indigo-600 font-semibold">Ping Slack webhook</span>
                </div>
                <div className="text-slate-500">
                  ACTION: <span className="text-purple-600 font-semibold">Update CRM Database</span>
                </div>
              </div>
            </div>

            {/* Box 4: Site Performance Metric (Spans 4 columns) */}
            <div className="md:col-span-4 glass-panel rounded-2xl p-6 md:p-8 card-gradient-border flex flex-col justify-between overflow-hidden relative">
              <div className="space-y-4 max-w-md relative z-10">
                <span className="text-xs font-mono text-emerald-400">04 / Performance standards</span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">Blazing Fast Core Web Vitals</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I construct responsive interfaces using static-generation patterns that ensure rapid load times, optimizing SEO discovery.
                </p>
              </div>

              {/* Performance Indicator Ring layout */}
              <div className="mt-6 flex items-center gap-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center font-bold text-sm text-emerald-400">
                    99
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-slate-200">Performance</div>
                    <div className="text-slate-500">LCP 0.8s</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center font-bold text-sm text-indigo-400">
                    100
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-slate-200">SEO Score</div>
                    <div className="text-slate-500">Google Lighthouse</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. FEATURED PROJECTS SHOWCASE */}
        <section id="projects" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Showcase</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">Case Studies & Projects</h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg">
              A detailed inspection of how I approach, model, and deploy client requirements into functional digital platforms.
            </p>
          </div>

          <div className="space-y-24">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >

                {/* Visual Window Mockup Column (Spans 6 columns) */}
                <div className={`lg:col-span-6 relative order-first ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                  <div
                    className="absolute inset-0 blur-3xl opacity-30 rounded-3xl"
                    style={{ backgroundColor: project.glowColor }}
                  />

                  {/* Browser frame Container */}
                  <div className="relative glass-panel rounded-2xl border border-slate-800/60 shadow-2xl overflow-hidden group">
                    {/* macOS Style Bar */}
                    <div className="bg-slate-950/80 px-4 py-3 flex items-center gap-2 border-b border-slate-900">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="mx-auto bg-slate-900/60 border border-slate-800 px-4 py-0.5 rounded-md text-[10px] text-slate-500 font-mono w-44 truncate text-center">
                        {project.link.replace("https://", "")}
                      </div>
                    </div>
                    {/* Image Area */}
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
                      {project.image ? (
                        <>
                          <Image 
                            src={project.image}
                            alt={project.title}
                            fill
                            className={`${project.projectName === "Billflow" || project.projectName === "Kindora"
                              ? "object-contain object-top"
                              : "object-cover object-top"
                              } transition-transform duration-700 group-hover:scale-105`}
                          />
                          <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/0 transition-all duration-500" />
                        </>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Column (Spans 6 columns) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
                      {project.projectName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className="text-xs text-slate-500 font-mono">Case Study</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="h-px bg-slate-900 w-full" />

                  {/* Problem & Solution block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-slate-500 font-semibold uppercase tracking-wider mb-1">Bottleneck</div>
                      <p className="text-slate-300">{project.problem}</p>
                    </div>
                    <div>
                      <div className="text-slate-500 font-semibold uppercase tracking-wider mb-1">Architecture</div>
                      <p className="text-slate-300">{project.solution}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="text-[10px] text-emerald-500/70 font-semibold uppercase tracking-widest mb-1">Business Impact</div>
                    <p className="text-emerald-400 text-xs font-medium">{project.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      Launch Live Website <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE LIVE DEMO - BILLFLOW SIMULATION */}
        <section id="demo" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Secret Weapon</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">Live Dashboard Simulation</h2>
            <p className="text-slate-400 mt-4 text-sm md:text-base">
              Try a live client-side simulation of a billing workflow engine below. Test payment reconciliation toggles, invoice filters, and metrics calculation in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left controller: Generate New Invoices (Spans 4 columns) */}
            <div className="lg:col-span-4 glass-card-bright rounded-2xl p-6 card-gradient-border glass-card-bright-hover transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                Generate Invoice
              </h3>

              <form onSubmit={handleAddInvoice} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Client Enterprise Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Wayne Enterprises"
                    value={demoClient}
                    onChange={(e) => setDemoClient(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Invoice Sum ($ USD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2400"
                    value={demoAmount}
                    onChange={(e) => setDemoAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Generate Invoice PO
                </button>
              </form>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {demoSuccessMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3.5 p-2.5 rounded-lg bg-emerald-50 border border-emerald-250 text-emerald-700 text-[10px] text-center font-medium"
                  >
                    {demoSuccessMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 border-t border-slate-200/60 pt-4 space-y-2.5">
                <h4 className="text-[10px] font-bold font-mono uppercase text-slate-600">Reconciliation Actions</h4>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  1. Click on status badges in the list to switch payments between <span className="text-emerald-600 font-semibold">Paid</span> and <span className="text-amber-600 font-semibold">Pending</span>.<br />
                  2. Watch the stats dashboard recalculate total figures instantly.
                </p>
              </div>
            </div>

            {/* Right: Simulated Dashboard interface (Spans 8 columns) */}
            <div className="lg:col-span-8 glass-panel rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Widget Header bar */}
              <div className="bg-slate-900/60 border-b border-slate-950 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Billflow Live Environment</h3>
                  <p className="text-[9px] text-slate-400">Simulated dashboard for small businesses</p>
                </div>

                {/* Filter Selector tabs */}
                <div className="flex gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-900 text-[9px] font-medium">
                  <button
                    onClick={() => setDemoFilter("all")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${demoFilter === "all" ? "bg-slate-900 text-indigo-400" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    All Invoices
                  </button>
                  <button
                    onClick={() => setDemoFilter("Paid")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${demoFilter === "Paid" ? "bg-slate-900 text-emerald-400" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => setDemoFilter("Pending")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${demoFilter === "Pending" ? "bg-slate-900 text-yellow-400" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {/* Metrics blocks inside simulated widget */}
              <div className="grid grid-cols-3 divide-x divide-slate-950 bg-slate-900/30 border-b border-slate-950">
                <div className="p-4 text-center">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Reconciled Sales</div>
                  <div className="text-sm md:text-base font-bold text-emerald-400 mt-1 font-mono">${totalRevenue.toLocaleString()}</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Awaiting Collection</div>
                  <div className="text-sm md:text-base font-bold text-yellow-500 mt-1 font-mono">${pendingAmount.toLocaleString()}</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Total volume</div>
                  <div className="text-sm md:text-base font-bold text-indigo-400 mt-1 font-mono">
                    ${(totalRevenue + pendingAmount).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Invoice List Panel */}
              <div className="p-6">
                <div className="max-h-60 overflow-y-auto space-y-2.5 pr-2">
                  <AnimatePresence initial={false}>
                    {invoices.filter(inv => demoFilter === "all" || inv.status === demoFilter).length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500">No invoices match selected criteria.</div>
                    ) : (
                      invoices
                        .filter(inv => demoFilter === "all" || inv.status === demoFilter)
                        .map((inv) => (
                          <motion.div
                            key={inv.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-slate-950/65 border border-slate-900 rounded-xl p-3.5 flex items-center justify-between gap-4"
                          >
                            <div className="space-y-0.5">
                              <div className="text-[10px] font-mono text-slate-500">{inv.id} • {inv.date}</div>
                              <div className="text-xs font-bold text-slate-200">{inv.client}</div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-xs font-mono font-bold text-slate-300">${inv.amount.toLocaleString()}</span>

                              <button
                                onClick={() => toggleInvoiceStatus(inv.id)}
                                className={`px-2.5 py-1 rounded-full text-[9px] font-bold font-mono transition-colors border shadow-sm ${inv.status === "Paid"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
                                  }`}
                                title="Click to toggle status"
                              >
                                {inv.status}
                              </button>

                              <button
                                onClick={() => deleteInvoice(inv.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                                title="Delete invoice"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5.5 SERVICES & PRICING SECTION */}
        <section id="services" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Services</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">What I Can Help You With</h2>
            <p className="text-slate-400 mt-4 text-base md:text-lg">
              Tailored development services to take your product from concept to production with premium quality and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Services List Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Service 1 */}
                <div className="glass-panel rounded-2xl p-6 border border-slate-800/60 card-gradient-border hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Landing Pages</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    High-performance landing pages optimized for conversions, fast load times, and perfect SEO. Perfect for campaigns or product launches.
                  </p>
                </div>

                {/* Service 2 */}
                <div className="glass-panel rounded-2xl p-6 border border-slate-800/60 card-gradient-border hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Business Websites</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Custom multi-page web presences tailored to tell your company&apos;s story, capture leads, and establish professional brand authority.
                  </p>
                </div>

                {/* Service 3 */}
                <div className="glass-panel rounded-2xl p-6 border border-slate-800/60 card-gradient-border hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Admin Dashboards</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Internal management panels, real-time analytics hubs, and CRM portals that connect directly to your databases and automate workflows.
                  </p>
                </div>

                {/* Service 4 */}
                <div className="glass-panel rounded-2xl p-6 border border-slate-800/60 card-gradient-border hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Website Redesign</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Revamp legacy sites with modern tech stack upgrades (React/Next.js), blazing fast loading speeds, responsive UI, and enhanced UX.
                  </p>
                </div>

              </div>
            </div>

            {/* Pricing Callout Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-3xl" />
              
              <div className="relative glass-card-bright rounded-2xl p-8 card-gradient-border shadow-2xl text-center glass-card-bright-hover transition-all duration-300">
                <span className="px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-mono tracking-widest uppercase font-semibold">
                  Engagement Model
                </span>
                
                <h3 className="text-xl font-bold text-slate-900 mt-6">Starting from</h3>
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.15)] mt-3">
                  $100<span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">/ project</span>
                </div>
                
                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  Every project is treated with meticulous care, prioritizing performance, user experience, and robust clean code.
                </p>

                <div className="h-px bg-slate-200 my-6" />

                <ul className="space-y-3.5 text-left text-xs text-slate-700 max-w-[280px] mx-auto">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    Clean React / Next.js Architecture
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    Responsive Design (Mobile & Desktop)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                    SEO & Google Lighthouse Optimized
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    1-Month Dedicated Post-Launch Support
                  </li>
                </ul>

                <Link
                  href="#contact"
                  className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] flex items-center justify-center gap-2 text-sm group"
                >
                  Start Your Project
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WHY CHOOSE ME SECTION */}
        <section id="why-me" className="py-16 border-t border-slate-900 scroll-mt-20">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Philosophy</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-100">Why Work With Me?</h2>
            <p className="text-slate-400 mt-4 text-sm md:text-base">
              I treat programming as a core business driver. Redundant workflows cost time; my focus is on optimization.
            {/* I focus on clean UI, fast performance, and real business value. */}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl glass-card-bright border border-slate-200/50 glass-card-bright-hover transition-all duration-355 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-slate-950/5 border border-slate-200/60 flex items-center justify-center mb-6">
                    {reason.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{reason.title}</h3>
                  <p className="text-slate-655 text-xs leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 7. CALL TO ACTION / FOOTER */}
      <footer id="contact" className="relative z-10 border-t border-slate-900 bg-slate-950/80 pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Left footer CTA column (Spans 5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest font-mono">Let&apos;s Connect</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">Ready to scale your business systems?</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Have a manual spreadsheet bottleneck, an API integration task, or require a dashboard built from scratch? Message me.
              </p>

              <div className="space-y-4 pt-4 text-xs">
                <a href="mailto:sunebellee@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors w-fit">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>sunebellee@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>HCMC, Vietnam</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column (Spans 7 columns) */}
            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 md:p-8 border border-slate-800">
              <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400" />
                Send a Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                        required
                      />
                      <User className="w-3.5 h-3.5 text-slate-650 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
                        required
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-650 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Describe your Project / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="We need to build a custom quotation comparison tool with email notifications..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500 text-xs transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  Submit Inquiry
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>

              {/* Submitted Modal Overlay */}
              <AnimatePresence>
                {contactSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-6 text-slate-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-200">Message Received!</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs">
                      Thank you for reaching out. I&apos;ll review your project details and respond via email within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px bg-slate-900 w-full mb-12" />

          {/* Socials & Legal Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-slate-650 text-xs">
              © {new Date().getFullYear()} Sunebelle. All rights reserved. Built for B2B flow automation.
            </div>

            <div className="flex gap-4">
              <a 
                href="https://github.com/sunebelle"
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Sunebelle"
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-500 transition-all hover:-translate-y-0.5"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}
