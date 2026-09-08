import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, ChevronDown } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

/**
 * Generate simulated telemetry data for a project
 */
function generateTelemetry(project) {
  const latencyMs = Math.floor(Math.random() * 18) + 8;
  const isRemed = project.title?.includes('REMED');
  const isVoting = project.title?.includes('OSIS') || project.title?.includes('Voting');

  const endpoint = isRemed
    ? 'POST /api/v2/remedial/submit-answer'
    : isVoting
    ? 'POST /api/v2/ballot/verify'
    : `GET /api/v1/${project.id?.toLowerCase() || 'resource'}`;

  const headers = {
    request: {
      'Host': `api.${(project.id || 'system').toLowerCase()}.kafka.dev`,
      'Method': endpoint.split(' ')[0],
      'Path': endpoint.split(' ')[1],
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ••••••••••••',
      ...(isRemed ? { 'x-zero-trust-hash': 'sha256:9f86d0...c3a5' } : {}),
      ...(isVoting ? { 'x-ballot-token': 'OSIS-K7X9P2 (single-use)' } : {}),
      'x-request-id': `req_${Math.random().toString(36).slice(2, 10)}`,
    },
    response: {
      'Status': '200 OK',
      'Content-Type': 'application/json; charset=utf-8',
      'x-response-time': `${latencyMs}ms`,
      'x-powered-by': 'Laravel Octane',
      'strict-transport-security': 'max-age=31536000; includeSubDomains',
      'x-frame-options': 'DENY',
    },
  };

  const payload = isRemed
    ? {
        status: 'accepted',
        student_id: 'STU-2026-0042',
        subject: 'Matematika',
        score: 78,
        rbac_role: 'student',
        idor_check: 'passed',
        session_hash: '9f86d081884c...',
      }
    : isVoting
    ? {
        status: 'ballot_cast',
        token: 'OSIS-K7X9P2',
        candidate_id: 'CAND-01',
        is_used: true,
        used_at: new Date().toISOString(),
        reuse_attempt: 'blocked (403)',
      }
    : {
        status: 'ok',
        data: { id: 1, type: project.category || 'resource' },
        timestamp: new Date().toISOString(),
      };

  const curlCmd = `curl -X ${endpoint.split(' ')[0]} \\
  '${headers.request.Host}${endpoint.split(' ')[1]}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <TOKEN>' \\${
    isRemed ? "\n  -H 'x-zero-trust-hash: sha256:...' \\" : ''
  }${
    isVoting ? "\n  -H 'x-ballot-token: OSIS-XXXXXX' \\" : ''
  }
  -d '${JSON.stringify(payload, null, 0).slice(0, 80)}...'`;

  return { latencyMs, endpoint, headers, payload, curlCmd };
}

/**
 * InspectWireDrawer
 * Inline collapsible telemetry panel showing simulated HTTP request/response.
 */
export default function InspectWireDrawer({ project, isOpen, onToggle }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('headers');

  const telemetry = useMemo(() => generateTelemetry(project), [project?.id]);

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(telemetry.curlCmd);
    setCopied(true);
    playTactileClick('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      {/* Trigger Button */}
      <button
        onClick={() => {
          playTactileClick('snap');
          onToggle();
        }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink/5 dark:bg-white/5 border border-linen/70 dark:border-white/10 text-[11px] font-mono text-stone hover:text-terracotta hover:border-terracotta/50 transition-all duration-200 cursor-pointer group"
      >
        <Terminal className="w-3 h-3 text-terracotta" />
        <span className="uppercase tracking-wider font-semibold">
          {'<_>'} Inspect Wire
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      {/* Expandable Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-xl bg-[#1a1e22] dark:bg-[#0d0f11] border border-[#2a2f35] text-[11px] font-mono text-gray-300 space-y-3">
              {/* Latency Bar */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold">{telemetry.latencyMs}ms</span>
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-400">TLS 1.3</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-400">HTTP/3</span>
                </div>
                <span className="text-gray-500 text-[10px]">
                  {telemetry.endpoint}
                </span>
              </div>

              {/* Latency visual bar */}
              <div className="relative h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(telemetry.latencyMs * 3, 100)}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 pt-1">
                {['headers', 'payload'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'bg-white/10 text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {activeTab === 'headers' ? (
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[10px] text-cyan-400/80 uppercase tracking-wider block mb-1">
                        Request Headers
                      </span>
                      {Object.entries(telemetry.headers.request).map(([key, val]) => (
                        <div key={key} className="flex gap-2 leading-relaxed">
                          <span className="text-purple-400/90 shrink-0">{key}:</span>
                          <span className="text-gray-300 break-all">{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <span className="text-[10px] text-cyan-400/80 uppercase tracking-wider block mb-1">
                        Response Headers
                      </span>
                      {Object.entries(telemetry.headers.response).map(([key, val]) => (
                        <div key={key} className="flex gap-2 leading-relaxed">
                          <span className="text-green-400/80 shrink-0">{key}:</span>
                          <span className="text-gray-300 break-all">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(telemetry.payload, null, 2)
                      .replace(/"([^"]+)":/g, '<span class="text-purple-400">"$1"</span>:')
                      .split('\n')
                      .map((line, i) => (
                        <div key={i} dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/: "([^"]*)"/, ': <span class="text-amber-300">"$1"</span>')
                            .replace(/: (\d+)/, ': <span class="text-cyan-400">$1</span>')
                            .replace(/: (true|false)/, ': <span class="text-emerald-400">$1</span>')
                        }} />
                      ))
                    }
                  </pre>
                )}
              </div>

              {/* Copy cURL */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] text-gray-500">
                  Wire Inspector v2.0 · Kafka Backend
                </span>
                <button
                  onClick={handleCopyCurl}
                  data-cursor="copy"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/5 hover:border-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy cURL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
