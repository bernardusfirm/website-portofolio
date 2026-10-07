'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Award, Briefcase, Sparkles, Layers } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function HeroSection() {
  const { profile, t, language } = usePortfolio();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#3682F6]/12 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Status & Experience Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#3682F6] animate-pulse" />
              <span className="text-zinc-300">{t.hero.badgeExp}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{t.hero.badgeField}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-emerald-400 font-sans font-medium">{t.hero.badgeProjects}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.98] mb-6">
              {t.hero.headlinePart1} <span className="text-gradient-blue">{t.hero.headlineHighlight}</span> {t.hero.headlinePart2}
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-2xl text-zinc-300 font-light max-w-2xl mb-8 leading-relaxed">
              {t.hero.tagline}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
              >
                <span>{t.hero.ctaWorks}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cv"
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition-all"
              >
                <Download className="w-4 h-4 text-[#3682F6]" />
                <span>{t.hero.ctaCv}</span>
              </Link>

              <Link
                href="/about"
                className="px-5 py-4 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                {t.hero.ctaAbout}
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-black text-white mb-0.5">{t.hero.statExpVal}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{t.hero.statExpLabel}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-black text-[#3682F6] mb-0.5">{t.hero.statProjVal}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{t.hero.statProjLabel}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-black text-white mb-0.5">{t.hero.statEndVal}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{t.hero.statEndLabel}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-black text-white mb-0.5">{t.hero.statToolsVal}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{t.hero.statToolsLabel}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Bento Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative"
          >
            <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
              {/* Profile Card Showcase */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#2D2D2D]">
                <Image
                  src={profile.avatar_url || '/profile.jpg'}
                  alt={profile.full_name}
                  fill
                  className="object-cover contrast-110 hover:scale-105 transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                {/* Card overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0A0A0A]/85 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase tracking-widest text-[#3682F6] font-mono font-semibold">
                      {t.hero.artDirectorRole}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">Digital Printing</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {profile.full_name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {profile.tagline}
                  </p>
                </div>
              </div>

              {/* Floating aesthetic badge */}
              <div className="absolute -top-4 -right-4 px-3.5 py-2 rounded-xl bg-[#3682F6] text-white text-xs font-mono font-bold shadow-glow-md flex items-center gap-1.5 animate-bounce">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.sinceBadge}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
