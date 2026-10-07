'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight, Trophy, GraduationCap } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { cvData } from '@/lib/translations';

export default function ExperiencePage() {
  const { language } = usePortfolio();

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-4">
            <span>// {language === 'id' ? 'KRONOLOGI & PENGALAMAN KERJA' : 'CAREER CHRONOLOGY & MILESTONES'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            {language === 'id' ? 'Pengalaman Sejak' : 'Professional Track'} <span className="text-gradient-blue">2022</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {cvData.summary[language]}
          </p>
        </div>

        {/* Work Timeline */}
        <div className="mb-24">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#3682F6]" />
            <span>{language === 'id' ? 'Pengalaman Kerja Profesional' : 'Professional Work Experience'}</span>
          </h2>

          <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
            {cvData.workExperience.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                    idx === 0
                      ? 'bg-[#3682F6] border-[#3682F6] shadow-glow-sm'
                      : 'bg-[#0A0A0A] border-white/30 group-hover:border-[#3682F6]'
                  }`}
                />

                <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#3682F6] transition-colors">
                          {exp.role[language]}
                        </h3>
                        {idx === 0 && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#3682F6]/20 text-[#3682F6] border border-[#3682F6]/30">
                            {language === 'id' ? 'Aktif' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#3682F6] font-semibold mt-1">
                        <span>@ {exp.company}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 bg-white/5 px-4 py-2 rounded-xl self-start sm:self-auto border border-white/5">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {exp.bullets[language].map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-[#3682F6] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Internship */}
            {cvData.internshipExperience.map((intern, idx) => (
              <div key={`intern-${idx}`} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#0A0A0A] border-white/30 group-hover:border-emerald-400 transition-colors" />

                <div className="p-8 rounded-3xl bg-[#2D2D2D]/70 border border-white/5 hover:border-emerald-400/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block mb-1">
                        {language === 'id' ? 'Pengalaman Magang' : 'Internship Experience'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {intern.role[language]}
                      </h3>
                      <div className="text-sm text-zinc-400 font-semibold mt-1">
                        <span>@ {intern.company}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 bg-white/5 px-4 py-2 rounded-xl self-start sm:self-auto border border-white/5">
                      {intern.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {intern.bullets[language].map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="py-20 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-[#3682F6]" />
              <h2 className="text-2xl font-bold text-white">
                {language === 'id' ? 'Pendidikan' : 'Education'}
              </h2>
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
                <span>GPA: {cvData.education.gpa}</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#3682F6]" />
              <h2 className="text-2xl font-bold text-white">
                {language === 'id' ? 'Sertifikasi & Penghargaan' : 'Certifications & Honors'}
              </h2>
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
      </div>
    </div>
  );
}
