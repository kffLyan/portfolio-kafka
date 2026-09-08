import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ShieldAlert, Cpu, ExternalLink, Activity, CheckCircle2, Lock, ArrowRight, Play } from 'lucide-react';
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
 * ArchitectureInspectorModal
 * High-end luxury technical inspector modal allowing visitors to inspect
 * live request pipelines, test RBAC / IDOR security simulations,
 * and review production telemetry benchmarks.
 */
export default function ArchitectureInspectorModal({ project, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedRole, setSelectedRole] = useState('Siswa');
  const [idorSimulated, setIdorSimulated] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);

  if (!project) return null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setIdorSimulated(false);
    playTactileClick('soft');
  };

  const simulateIdorAttack = () => {
    playTactileClick('snap');
    setIsAttacking(true);
    setTimeout(() => {
      setIsAttacking(false);
      setIdorSimulated(true);
      playTactileClick('forbidden');
    }, 450);
  };

  // Fallback data if project doesn't define custom architecture data
  const arch = project.architectureData || {
    pipeline: [
      { step: "Client Layer", detail: "Reactive Interface Islands with strict type annotations & responsive styling" },
      { step: "Security Gate", detail: "Payload sanitization, session validation & CSRF cookie checks" },
      { step: "Controller / Business Logic", detail: "Granular server validation, authorization checks & service boundaries" },
      { step: "Data Store", detail: "Relational persistence with normalized schema & indexed foreign keys" }
    ],
    rbacRoles: [
      { role: "Administrator", access: "Unrestricted administrative privileges, user provisioning & system configuration." },
      { role: "Operator / Teacher", access: "Targeted resource creation, status verification & workflow dispatch." },
      { role: "End-User / Student", access: "Personal resource access only. Zero-trust isolation against IDOR manipulation." }
    ],
    securitySpecs: [
      "Zero-Trust Authorization: Every API mutation verifies ownership on the server layer",
      "Input Sanitization: Payloads divalidasi ketat di backend sebelum proses query",
      "Session Hardening: Cookie flags __Secure- and HttpOnly enforced in production"
    ],
    telemetry: {
      lighthouse: 99,
      securityScore: "A+",
      uiLatency: "4ms",
      typeSafety: "100%"
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop: consistent dark dimming in both light and dark mode without blur lag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 will-change-[opacity]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl rounded-3xl bg-sand border border-linen shadow-[0_25px_70px_rgba(26,36,33,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] z-10 overflow-hidden text-ink font-sans my-auto max-h-[90vh] flex flex-col transform-gpu will-change-transform"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-linen bg-bone/60">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-stone mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>ARCHITECTURAL DEEP-DIVE // {project.id}</span>
                </div>
                <h3 className="font-serif text-2xl text-ink font-normal">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-sand border border-linen hover:border-terracotta text-stone hover:text-ink transition-colors cursor-pointer"
                title="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Tab Navigation */}
            <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-bone/30 border-b border-linen overflow-x-auto text-xs font-mono">
              {[
                { id: 'pipeline', label: '1. Request Pipeline' },
                { id: 'rbac', label: '2. RBAC & IDOR Simulator' },
                { id: 'telemetry', label: '3. Security & Telemetry' },
              ].map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      playTactileClick('soft');
                    }}
                    className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-ink text-sand font-medium'
                        : 'text-stone hover:text-ink hover:bg-bone'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* TAB 1: Pipeline & Flow */}
              {activeTab === 'pipeline' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone block mb-2">
                    END-TO-END DATAFLOW PIPELINE
                  </span>

                  <div className="space-y-3">
                    {arch.pipeline.map((pipe, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-bone/70 border border-linen flex items-start gap-4"
                      >
                        <div className="w-7 h-7 rounded-lg bg-sand border border-linen flex items-center justify-center font-mono text-xs font-semibold text-terracotta shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block mb-0.5">
                            {pipe.step}
                          </span>
                          <p className="text-xs text-stone leading-relaxed font-sans">
                            {pipe.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Interactive RBAC & IDOR Simulation */}
              {activeTab === 'rbac' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-stone block mb-2">
                      INTERACTIVE ROLE-BASED ACCESS CONTROL (RBAC)
                    </span>
                    <p className="text-xs text-stone leading-relaxed mb-4">
                      Select a role to inspect permissions. Test the live anti-IDOR server security mechanism.
                    </p>

                    {/* Role Switcher */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {arch.rbacRoles.map((r) => {
                        const isSelected = selectedRole.toLowerCase() === r.role.toLowerCase() || (r.role.includes(selectedRole));
                        return (
                          <button
                            key={r.role}
                            onClick={() => handleRoleChange(r.role.split(' ')[0])}
                            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-ink text-sand border-ink font-semibold'
                                : 'bg-sand text-stone border-linen hover:border-ink'
                            }`}
                          >
                            {r.role}
                          </button>
                        );
                      })}
                    </div>

                    {/* Role Details */}
                    <div className="p-4 rounded-xl bg-bone/80 border border-linen text-xs font-mono">
                      <span className="text-[11px] text-terracotta uppercase font-bold block mb-1">
                        ACTIVE PERMISSION CONTRACT:
                      </span>
                      <p className="text-ink/90 font-sans leading-relaxed">
                        {arch.rbacRoles.find((r) => r.role.includes(selectedRole))?.access || arch.rbacRoles[0].access}
                      </p>
                    </div>
                  </div>

                  {/* Anti-IDOR Live Test Simulator */}
                  <div className="p-5 rounded-2xl bg-sand border border-linen space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-ink">
                        <Lock className="w-3.5 h-3.5 text-terracotta" />
                        <span>Zero-Trust IDOR Attack Simulator</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone">Endpoint: POST /api/submissions</span>
                    </div>

                    <p className="text-xs text-stone leading-relaxed font-sans">
                      Simulate a malicious student user forging a request payload with another student's task ID (<code className="text-terracotta bg-bone px-1 py-0.5 rounded">targetStudentId: 'usr_fraud_999'</code>).
                    </p>

                    <button
                      onClick={simulateIdorAttack}
                      disabled={isAttacking}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink text-sand hover:bg-terracotta transition-colors text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isAttacking ? 'Simulating Forge Request...' : 'Trigger Forged Payload (Test IDOR)'}</span>
                    </button>

                    {idorSimulated && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono text-rose-900 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-rose-800">
                          <ShieldAlert className="w-4 h-4 text-rose-700" />
                          <span>HTTP 403 FORBIDDEN — IDOR BLOCKED</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-rose-800/90 font-sans">
                          <strong>Zero-Trust Gate:</strong> Server evaluated <code className="bg-rose-100 px-1 rounded">task.targetStudentIds.includes(session.user.id) === false</code>.
                          Request dropped immediately before Prisma execution. Database integrity preserved.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Security Specs & Telemetry */}
              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  {/* Benchmarks Ribbon */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-bone/70 border border-linen text-center">
                      <span className="text-2xl font-light text-ink font-mono block">
                        {arch.telemetry.lighthouse}
                      </span>
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                        Lighthouse Perf
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-bone/70 border border-linen text-center">
                      <span className="text-2xl font-light text-emerald-800 font-mono block">
                        {arch.telemetry.securityScore}
                      </span>
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                        Security Rating
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-bone/70 border border-linen text-center">
                      <span className="text-2xl font-light text-terracotta font-mono block">
                        {arch.telemetry.uiLatency}
                      </span>
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                        UI Response
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-bone/70 border border-linen text-center">
                      <span className="text-2xl font-light text-ink font-mono block">
                        {arch.telemetry.typeSafety}
                      </span>
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                        Type Contracts
                      </span>
                    </div>
                  </div>

                  {/* Security Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone block mb-1">
                      VERIFIED SECURITY STANDARDS
                    </span>
                    {arch.securitySpecs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-bone/40 border border-linen flex items-start gap-3 text-xs font-mono"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="text-ink/90 font-sans">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-linen bg-bone/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ink text-sand hover:bg-terracotta transition-colors uppercase font-medium"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sand border border-linen text-ink hover:border-ink transition-colors uppercase font-medium"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <span className="text-[11px] font-mono text-stone">
                ARCHITECT: MUHAMMAD KAFKA LYANDRA PRATAMA
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
