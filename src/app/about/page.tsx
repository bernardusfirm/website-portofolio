'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Download,
  ArrowUpRight,
  Award,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { cvData } from '@/lib/translations';

export default function AboutPage() {
  const { profile, t, language } = usePortfolio();

  const philosophyPoints = [
    {
      num: '01',
      title: t.about.ethos1Title,
      desc: t.about.ethos1Desc,
    },
    {
      num: '02',
      title: t.about.ethos2Title,
      desc: t.about.ethos2Desc,
    },
    {
      num: '03',
      title: t.about.ethos3Title,
      desc: t.about.ethos3Desc,
    },
    {
      num: '04',
      title: t.about.ethos4Title,
      desc: t.about.ethos4Desc,
    },
  ];

  const toolCategories = [
    { name: 'Adobe Photoshop', category: language === 'id' ? 'Desain Raster & Retouching' : 'Raster Graphics & Retouching', level: 'Master' },
    { name: 'Adobe Illustrator', category: language === 'id' ? 'Desain Vektor & Logo' : 'Vector Art & Identity', level: 'Master' },
    { name: 'CorelDRAW', category: language === 'id' ? 'Digital Printing & Produksi Cetak' : 'Digital Printing & Production', level: 'Master' },
    { name: 'Adobe Premiere Pro', category: language === 'id' ? 'Editing Video & Konten' : 'Video Editing & Grading', level: 'Advanced' },
    { name: 'Adobe After Effects', category: language === 'id' ? 'Motion Graphics & Animasi' : 'Motion Graphics & Visual FX', level: 'Advanced' },
    { name: 'CapCut', category: language === 'id' ? 'Video Pendek, Reels & TikTok' : 'Short-form Video & Reels', level: 'Advanced' },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Breadcrumb */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-4">
          <span>{t.about.breadcrumb}</span>
        </div>

        {/* Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
              {t.about.headline} <span className="text-gradient-blue">{t.about.headlineHighlight}</span>{' '}
              {language === 'id' ? 'di Desain Grafis & Digital Printing.' : 'in Graphic Design & Digital Printing.'}
            </h1>

            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>{cvData.summary[language]}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                href="/cv"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-medium text-sm transition-all shadow-glow-sm"
              >
                <Download className="w-4 h-4" />
                <span>{t.about.downloadCv}</span>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition-all"
              >
                <span>{t.about.viewPortfolio}</span>
                <ArrowUpRight className="w-4 h-4 text-[#3682F6]" />
              </Link>
            </div>
          </div>

          {/* Profile Image & Meta Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#2D2D2D] p-3 shadow-2xl">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt={cvData.name}
                  fill
                  className="object-cover contrast-110 hover:scale-105 transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 rounded-xl bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10">
                    <div className="text-xs font-mono text-[#3682F6] uppercase tracking-wider mb-1">
                      {cvData.title} · {cvData.location}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {t.about.summaryStat}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience Section (From Authentic CV) */}
        <div className="py-20 border-t border-white/10">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>// {language === 'id' ? 'PENGALAMAN KERJA TERVERIFIKASI' : 'AUTHENTIC WORK EXPERIENCE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {language === 'id'
                ? 'Rekam jejak profesional menangani 500+ proyek desain & digital printing.'
                : 'Proven track record delivering 500+ design & digital printing projects.'}
            </h2>
          </div>

          <div className="space-y-6">
            {cvData.workExperience.map((exp, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role[language]}
                    </h3>
                    <span className="text-sm font-semibold text-[#3682F6]">
                      @ {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {exp.bullets[language].map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#3682F6] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Internship */}
            {cvData.internshipExperience.map((intern, idx) => (
              <div
                key={`intern-${idx}`}
                className="p-8 rounded-3xl bg-[#2D2D2D]/70 border border-white/5 hover:border-[#3682F6]/30 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#3682F6] tracking-widest">
                      {language === 'id' ? 'Pengalaman Magang' : 'Internship Experience'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {intern.role[language]}
                    </h3>
                    <span className="text-sm font-semibold text-zinc-400">
                      @ {intern.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 self-start sm:self-auto">
                    {intern.period}
                  </span>
                </div>

                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {intern.bullets[language].map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Row */}
        <div className="py-20 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-2">
                <span>{t.about.eduBadge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{t.about.eduTitle}</h3>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  {cvData.education.institution}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {cvData.education.period}
                </span>
              </div>
              <div className="text-sm text-[#3682F6] font-semibold">
                {cvData.education.degree[language]}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                <span>{t.cv.gpaLabel}: {cvData.education.gpa}</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-2">
                <span>{t.about.certBadge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{t.about.certTitle}</h3>
            </div>

            <div className="space-y-4">
              {cvData.certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4"
                >
                  <Award className="w-5 h-5 text-[#3682F6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Arsenal */}
        <div className="py-20 border-t border-white/10">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{t.about.toolsBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.about.toolsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((tool) => (
              <div
                key={tool.name}
                className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{tool.name}</h4>
                  <span className="text-xs text-zinc-400 font-mono">{tool.category}</span>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#3682F6]/15 text-[#3682F6] border border-[#3682F6]/30">
                  {tool.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Principles */}
        <div className="py-20 border-t border-white/10">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{t.about.ethosBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.about.ethosTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPoints.map((item) => (
              <div
                key={item.num}
                className="p-8 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all"
              >
                <div className="text-3xl font-mono font-bold text-[#3682F6] mb-4">
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
