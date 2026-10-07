'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function CareerJourneyTeaser() {
  const { experiences, language } = usePortfolio();

  return (
    <section className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>// 03 · {language === 'id' ? 'REKAM JEJAK KERJA' : 'TRACK RECORD'}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'id' ? 'Pengalaman Kerja' : 'Career Experience'} <span className="text-gradient-blue">{language === 'id' ? 'Terverifikasi' : 'Timeline'}</span>
            </h2>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#3682F6] transition-colors group"
          >
            <span>{language === 'id' ? 'Lihat Semua Pengalaman & Sertifikasi' : 'Full Career Timeline & Certifications'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#3682F6] transition-colors">
                    {exp.position}
                  </h3>
                  {exp.is_current && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#3682F6]/20 text-[#3682F6] border border-[#3682F6]/30">
                      {language === 'id' ? 'Aktif' : 'Active'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="font-semibold text-zinc-200">{exp.company}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm font-mono text-zinc-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  {exp.period}
                </span>
                <Link
                  href="/experience"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-[#3682F6] transition-all"
                  aria-label="View details in experience page"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
