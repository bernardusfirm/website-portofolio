'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Palette,
  Box,
  Share2,
  Printer,
  Video,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6 text-[#3682F6]" />,
  Box: <Box className="w-6 h-6 text-[#3682F6]" />,
  Share2: <Share2 className="w-6 h-6 text-[#3682F6]" />,
  Printer: <Printer className="w-6 h-6 text-[#3682F6]" />,
  Video: <Video className="w-6 h-6 text-[#3682F6]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#3682F6]" />,
};

export default function Disciplines() {
  const { t } = usePortfolio();
  const exp = t.expertise;

  return (
    <section className="py-24 bg-[#1A1A1A] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{exp.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {exp.titlePart1}{' '}
              <span className="text-gradient-blue">{exp.titleHighlight}</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              {exp.description}
            </p>
          </div>

          <Link
            href="/expertise"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#3682F6] transition-colors shrink-0"
          >
            <span>{exp.allServicesLink}</span>
            <ArrowUpRight className="w-4 h-4 text-[#3682F6]" />
          </Link>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exp.cards.map((srv, index) => (
            <motion.div
              key={srv.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#3682F6]/50 group-hover:bg-[#3682F6]/10 transition-colors">
                  {iconMap[srv.icon_name] || <Palette className="w-6 h-6 text-[#3682F6]" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3682F6] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#3682F6] mb-3 font-semibold">
                  {exp.scopeLabel}
                </h4>
                <ul className="space-y-2">
                  {srv.deliverables.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3682F6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
