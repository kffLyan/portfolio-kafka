import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Cpu, ShieldCheck, Layers, LayoutGrid, Rows3 } from 'lucide-react';
import { PROJECTS, CERTIFICATES, TECH_STACK } from '../data/portfolioData';
import TokenSandbox from './TokenSandbox';
import ArchitectureInspectorModal from './ArchitectureInspectorModal';
import { playTactileClick } from '../utils/audio';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/**
 * EditorialShowcaseCard
 * Ultra-smooth, hardware-accelerated stacking card with dynamic depth pinning.
 * Stacks naturally like an archival card deck with zero stutter and solid 60 FPS performance.
 */
function EditorialShowcaseCard({ project, index = 0, total = 6, onInspect }) {
  const topOffset = 80 + index * 12;

  return (
    <div 
      style={{
        position: 'sticky',
        top: `${topOffset}px`,
        zIndex: index + 10,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
      className="mb-16 sm:mb-24 rounded-3xl bg-bone border border-linen p-6 sm:p-10 shadow-[0_8px_36px_rgba(26,36,33,0.07)] dark:shadow-[0_18px_52px_rgba(0,0,0,0.55)] hover:shadow-[0_14px_48px_rgba(26,36,33,0.12)] dark:hover:shadow-[0_22px_60px_rgba(0,0,0,0.7)] transition-shadow duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full">
          <div>
            {/* Metadata Header */}
            <div className="flex items-center justify-between text-xs font-mono text-stone pb-3 mb-4 border-b border-linen/70">
              <span className="font-semibold text-terracotta">
                SYSTEM // {project.id}
              </span>
              <span>{project.year} &bull; {project.role}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <h3 className="font-serif text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                {project.title}
              </h3>
              {project.featured && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta border border-terracotta/30 uppercase font-semibold">
                  Flagship
                </span>
              )}
            </div>

            <span className="inline-block text-xs font-mono text-stone/90 uppercase tracking-wider mb-3">
              {project.category}
            </span>

            <p className="text-sm text-stone leading-relaxed mb-5 font-sans">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-sand border border-linen text-ink/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links & Key Metric */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-4 border-t border-linen/70">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playTactileClick('soft')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ink text-sand hover:bg-terracotta transition-colors uppercase tracking-wider font-semibold"
                >
                  <span>Live Deploy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playTactileClick('soft')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sand border border-linen text-ink hover:border-terracotta transition-colors uppercase tracking-wider font-semibold"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Repo</span>
                </a>
              )}

              {/* High-End Technical Inspector Trigger Button */}
              <button
                onClick={() => {
                  playTactileClick('snap');
                  onInspect(project);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-terracotta/10 border border-terracotta/40 text-terracotta hover:bg-terracotta hover:text-sand transition-colors uppercase font-semibold tracking-wider cursor-pointer"
                title="Inspect Architecture, Dataflow & RBAC"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Architecture Spec ⚡</span>
              </button>

              <span className="text-[11px] text-stone font-mono font-medium ml-auto">
                {project.metric}
              </span>
            </div>

            {/* Embedded Token Sandbox for OSIS Voting Project */}
            {project.title.includes('OSIS') && (
              <TokenSandbox />
            )}
          </div>
        </div>

        {/* Right Preview Image Column */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-sand border border-linen/90 p-2 sm:p-2.5 shadow-inner">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-sand uppercase tracking-wider bg-ink/80 px-2.5 py-1 rounded backdrop-blur-sm">
                VERIFIED ARCHITECTURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * EditorialGridCard
 * Luxury 2-column magazine grid view
 */
function EditorialGridCard({ project, onInspect }) {
  return (
    <div className="rounded-3xl bg-bone border border-linen p-6 flex flex-col justify-between shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:shadow-md dark:hover:shadow-[0_16px_44px_rgba(0,0,0,0.6)] transition-shadow">
      <div>
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-linen">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-ink/80 text-sand px-2 py-0.5 rounded text-[10px] font-mono uppercase">
            {project.year}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-stone mb-1">
          <span>{project.id} // {project.category}</span>
          <span className="text-terracotta">{project.metric}</span>
        </div>

        <h3 className="font-serif text-2xl text-ink font-normal mb-2">
          {project.title}
        </h3>

        <p className="text-xs text-stone leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-sand border border-linen text-stone">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-linen/70 text-xs font-mono">
        <button
          onClick={() => {
            playTactileClick('snap');
            onInspect(project);
          }}
          className="inline-flex items-center gap-1 text-terracotta hover:underline font-semibold cursor-pointer"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Spec ⚡</span>
        </button>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-ink hover:text-terracotta font-medium flex items-center gap-1">
              <span>Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-stone hover:text-ink">
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * TechnicalMatrixView
 * High-density executive technical ledger
 */
function TechnicalMatrixView({ projects, onInspect }) {
  return (
    <div className="rounded-3xl bg-bone border border-linen overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-sand border-b border-linen text-stone uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6 font-medium">ID</th>
              <th className="py-3.5 px-6 font-medium">Platform / Repo</th>
              <th className="py-3.5 px-6 font-medium">Category</th>
              <th className="py-3.5 px-6 font-medium">Core Stack</th>
              <th className="py-3.5 px-6 font-medium text-right">Architecture & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-linen">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-sand/60 transition-colors">
                <td className="py-4 px-6 text-terracotta font-bold">{p.id}</td>
                <td className="py-4 px-6">
                  <span className="font-serif text-base text-ink font-medium block">
                    {p.title}
                  </span>
                  <span className="text-[11px] text-stone">{p.role} &bull; {p.year}</span>
                </td>
                <td className="py-4 px-6 text-stone/90 uppercase">{p.category}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {p.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-sand border border-linen text-ink/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        playTactileClick('snap');
                        onInspect(p);
                      }}
                      className="px-2.5 py-1 rounded bg-terracotta/10 text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-sand transition-colors font-semibold cursor-pointer"
                    >
                      Spec ⚡
                    </button>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-ink hover:text-terracotta">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-stone hover:text-ink">
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Showcase Component
 * Strictly 3 Core Tabs:
 * 1. Selected Works (Curated Showcase, Grid, or Ledger)
 * 2. Certifications & Honors
 * 3. Tech Stack & Proficiency
 */
export default function Showcase() {
  const [activeTab, setActiveTab] = useState('works');
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' | 'grid' | 'table'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [inspectingProject, setInspectingProject] = useState(null);

  const tabs = [
    { id: 'works', label: 'Selected Works' },
    { id: 'certs', label: 'Certifications & Honors' },
    { id: 'stack', label: 'Tech Stack & Proficiency' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    playTactileClick('snap');
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'fullstack') return p.tags.some(t => t.includes('Next') || t.includes('Laravel') || t.includes('Prisma'));
    if (categoryFilter === 'iot') return p.category.includes('Embedded') || p.category.includes('IoT');
    if (categoryFilter === 'ai') return p.category.includes('Vision') || p.category.includes('AI');
    return true;
  });

  return (
    <section id="works" className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
      {/* Live Architecture Inspector Modal */}
      <ArchitectureInspectorModal
        project={inspectingProject}
        isOpen={Boolean(inspectingProject)}
        onClose={() => setInspectingProject(null)}
      />

      {/* Header & Tab Controller */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 pb-6 border-b border-linen">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-2">
            02 // BACKEND ARCHITECTURES & SOFTWARE REPOSITORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ink font-normal tracking-tight">
            Engineered Software & Systems
          </h2>
        </div>

        {/* 3-Tab Switcher with layoutId Spring */}
        <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-full bg-bone border border-linen self-start md:self-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-sand' : 'text-stone hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="showcase-active-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 240, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Controller for Selected Works: Category Filters & Presentation Switcher */}
      {activeTab === 'works' && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-linen/70">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: `All Repos (${PROJECTS.length})` },
              { id: 'fullstack', label: 'Backend & RBAC' },
              { id: 'iot', label: 'IoT & Telemetry' },
              { id: 'ai', label: 'Computer Vision' },
            ].map((f) => {
              const isSelected = categoryFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setCategoryFilter(f.id);
                    playTactileClick('soft');
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-ink text-sand border-ink'
                      : 'bg-bone text-stone border-linen hover:border-ink hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Presentation Switcher (Showcase vs Grid vs Table) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-bone border border-linen self-end sm:self-auto">
            {[
              { id: 'showcase', label: 'Showcase', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'grid', label: 'Grid', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
              { id: 'table', label: 'Ledger', icon: <Rows3 className="w-3.5 h-3.5" /> },
            ].map((m) => {
              const isCurrent = viewMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setViewMode(m.id);
                    playTactileClick('soft');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-sand text-ink font-semibold shadow-sm border border-linen'
                      : 'text-stone hover:text-ink'
                  }`}
                  title={`Switch to ${m.label} presentation`}
                >
                  {m.icon}
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content Panels */}
      <AnimatePresence mode="wait">
        {/* TAB 1: Selected Works */}
        {activeTab === 'works' && (
          <motion.div
            key={`tab-works-${viewMode}-${categoryFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* View Mode 1: Silky Smooth Stacking Card Deck */}
            {viewMode === 'showcase' && (
              <div className="relative pb-12">
                {filteredProjects.map((project, idx) => (
                  <EditorialShowcaseCard
                    key={project.id}
                    project={project}
                    index={idx}
                    total={filteredProjects.length}
                    onInspect={setInspectingProject}
                  />
                ))}
              </div>
            )}

            {/* View Mode 2: Editorial 2-Column Magazine Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                  <EditorialGridCard
                    key={project.id}
                    project={project}
                    onInspect={setInspectingProject}
                  />
                ))}
              </div>
            )}

            {/* View Mode 3: Executive Technical Ledger / Matrix */}
            {viewMode === 'table' && (
              <TechnicalMatrixView
                projects={filteredProjects}
                onInspect={setInspectingProject}
              />
            )}
          </motion.div>
        )}

        {/* TAB 2: Certifications & Honors */}
        {activeTab === 'certs' && (
          <motion.div
            key="tab-certs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="p-8 rounded-2xl bg-bone/70 border border-linen/80 flex flex-col justify-between hover:border-terracotta/50 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone mb-4">
                    <span>{cert.issuer}</span>
                    <span className="text-ink/80">{cert.date}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal mb-3">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-stone leading-relaxed mb-4">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-sand border border-linen text-stone"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-linen/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone">ID: {cert.credentialId}</span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playTactileClick('soft')}
                    className="inline-flex items-center gap-1.5 text-terracotta hover:underline font-medium"
                  >
                    <span>Verification</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Tech Stack with Ratings */}
        {activeTab === 'stack' && (
          <motion.div
            key="tab-stack"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {TECH_STACK.map((group, gIdx) => (
              <div
                key={gIdx}
                className="p-8 rounded-2xl bg-bone/60 border border-linen/80"
              >
                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-1">
                    {group.category}
                  </h3>
                  <p className="text-xs text-stone">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ 
                        y: -3, 
                        scale: 1.03,
                        transition: { type: 'spring', stiffness: 400, damping: 15 } 
                      }}
                      onMouseEnter={() => playTactileClick('soft')}
                      className="px-3.5 py-2 rounded-xl bg-sand border border-linen hover:border-terracotta/80 text-xs font-mono text-ink shadow-[0_2px_8px_rgba(26,36,33,0.02)] flex items-center gap-2 cursor-default select-none transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70"></span>
                      <span className="font-semibold">{skill.name}</span>
                      {skill.rating && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bone text-terracotta font-semibold">
                          {skill.rating}
                        </span>
                      )}
                      <span className="text-[10px] text-stone/80 pl-1 border-l border-linen">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
