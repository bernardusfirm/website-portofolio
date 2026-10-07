'use client';

import React from 'react';
import Link from 'next/link';
import {
  Palette,
  Box,
  Share2,
  Printer,
  Video,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
  Monitor,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6 text-[#3682F6]" />,
  Box: <Box className="w-6 h-6 text-[#3682F6]" />,
  Share2: <Share2 className="w-6 h-6 text-[#3682F6]" />,
  Printer: <Printer className="w-6 h-6 text-[#3682F6]" />,
  Video: <Video className="w-6 h-6 text-[#3682F6]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#3682F6]" />,
  Layers: <Layers className="w-6 h-6 text-[#3682F6]" />,
  Monitor: <Monitor className="w-6 h-6 text-[#3682F6]" />,
};

export default function ExpertisePage() {
  const { t } = usePortfolio();
  const exp = t.expertise;

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-4">
            <span>{exp.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {exp.titlePart1}{' '}
            <span className="text-gradient-blue">{exp.titleHighlight}</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {exp.cards.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#3682F6]/50 group-hover:bg-[#3682F6]/10 transition-colors">
                  {iconMap[srv.icon_name] || <Palette className="w-6 h-6 text-[#3682F6]" />}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#3682F6] transition-colors">
                  {srv.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#3682F6] mb-3 font-semibold">
                  {exp.scopeLabel}
                </div>
                <ul className="space-y-2.5">
                  {srv.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#3682F6] shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Software yang Dikuasai / Mastered Software */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-[#1A1A1A] border border-white/5 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{exp.softwareBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {exp.softwareTitle}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
              {exp.softwareDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {exp.software.map((sw) => (
              <div
                key={sw.name}
                className="p-5 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all flex flex-col items-center text-center group hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-[#3682F6] font-bold text-sm font-mono group-hover:bg-[#3682F6]/10 group-hover:border-[#3682F6]/40 transition-colors">
                  {sw.badge}
                </div>
                <span className="text-sm font-semibold text-white group-hover:text-[#3682F6] transition-colors">
                  {sw.name}
                </span>
                <span className="text-[11px] text-zinc-400 mt-1">
                  {sw.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Phase Creative Process / Workflow */}
        <div className="py-20 border-t border-white/10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{exp.workflowBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {exp.workflowTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exp.phases.map((phase) => (
              <div
                key={phase.step}
                className="relative p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 flex flex-col justify-between hover:border-[#3682F6]/30 transition-all"
              >
                <div>
                  <div className="text-4xl font-mono font-bold text-[#3682F6] mb-6">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{phase.desc}</p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="text-[11px] font-mono uppercase text-zinc-500 mb-2">
                    {exp.phaseOutputLabel}
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    {phase.deliverables.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#1A1A1A] via-[#2D2D2D] to-[#121c2e] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {exp.ctaTitle}
            </h3>
            <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
              {exp.ctaDesc}
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-sm transition-all shadow-glow-sm shrink-0 flex items-center gap-2"
          >
            <span>{exp.ctaBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
