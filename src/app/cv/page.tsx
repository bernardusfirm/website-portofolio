'use client';

import React from 'react';
import Link from 'next/link';
import {
  Download,
  Printer,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
  GraduationCap,
  Globe,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { cvData } from '@/lib/translations';

export default function CVPage() {
  const { profile, language, setLanguage, t } = usePortfolio();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Navigation & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-[#3682F6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 text-xs font-mono">
              <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  language === 'id'
                    ? 'bg-[#3682F6] text-white font-bold shadow-glow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Bahasa Indonesia
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-[#3682F6] text-white font-bold shadow-glow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#3682F6]" />
              <span>{t.cv.printBtn}</span>
            </button>

            <a
              href="/cv-bernardusfirman.pdf"
              download="BernardusFirmanBagaskara_CV.pdf"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-glow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.cv.downloadBtn}</span>
            </a>
          </div>
        </div>

        {/* PRINTABLE RESUME SHEET (Matches user's CV layout) */}
        <div className="bg-[#2D2D2D] print:bg-white print:text-black border border-white/10 print:border-none rounded-3xl p-8 sm:p-14 text-zinc-300 shadow-2xl space-y-10">
          {/* Header */}
          <div className="border-b border-white/10 print:border-black/20 pb-8 text-center sm:text-left space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white print:text-black tracking-tight uppercase">
              {cvData.name}
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-[#3682F6] tracking-widest uppercase font-mono">
              {cvData.title}
            </h2>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-zinc-400 print:text-zinc-700 pt-1">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#3682F6]" />
                {cvData.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#3682F6]" />
                {cvData.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3682F6]" />
                {cvData.location}
              </span>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.summaryTitle}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300 print:text-zinc-800 text-justify">
              {cvData.summary[language]}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-6 pt-4 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.workTitle}
            </h3>

            <div className="space-y-6">
              {cvData.workExperience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-base font-bold text-white print:text-black">
                        {exp.role[language]}
                      </span>
                      <span className="text-sm font-semibold text-[#3682F6] ml-2">
                        {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {exp.bullets[language].map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 print:text-zinc-800"
                      >
                        <span className="text-[#3682F6] font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Internship Experience */}
          <div className="space-y-6 pt-4 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.internTitle}
            </h3>

            <div className="space-y-6">
              {cvData.internshipExperience.map((intern, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-base font-bold text-white print:text-black">
                        {intern.role[language]}
                      </span>
                      <span className="text-sm font-semibold text-zinc-400 print:text-zinc-700 ml-2">
                        {intern.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                      {intern.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {intern.bullets[language].map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 print:text-zinc-800"
                      >
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3 pt-4 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.eduTitle}
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-base font-bold text-white print:text-black">
                  {cvData.education.institution}
                </span>
                <span className="text-sm text-zinc-400 print:text-zinc-700 ml-2">
                  {cvData.education.degree[language]}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                {cvData.education.period}
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-semibold">
              {t.cv.gpaLabel}: {cvData.education.gpa}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3 pt-4 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.certTitle}
            </h3>

            <ul className="space-y-2">
              {cvData.certifications.map((cert, cIdx) => (
                <li
                  key={cIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 print:text-zinc-800"
                >
                  <span className="text-[#3682F6] font-bold mt-0.5">•</span>
                  <span>
                    <strong>{cert.title}</strong> – {cert.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Tools */}
          <div className="space-y-3 pt-4 border-t border-white/10 print:border-black/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#3682F6] font-bold">
              {t.cv.toolsTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 print:text-black print:border-black/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
