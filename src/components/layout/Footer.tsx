'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { cvData } from '@/lib/translations';

export default function Footer() {
  const { profile, siteSettings, t, language } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(cvData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-[#3682F6]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Top Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Availability pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{t.footer.availableBadge}</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                {t.footer.ctaHeadline} <span className="text-[#3682F6]">{t.footer.ctaHighlight}</span>
              </h2>

              <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
                {t.footer.ctaDesc}
              </p>
            </div>

            {/* Email copy bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 text-sm font-mono transition-all group"
              >
                <span>{cvData.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400 group-hover:text-[#3682F6] transition-colors" />
                )}
              </button>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-medium text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
              >
                <span>{t.footer.startProject}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick links & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-mono mb-4">
                {t.footer.navTitle}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href="/expertise" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {t.nav.expertise}
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {t.nav.portfolio}
                  </Link>
                </li>
                <li>
                  <Link href="/experience" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {t.nav.experience}
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="text-zinc-300 hover:text-[#3682F6] transition-colors">
                    {language === 'id' ? 'Curriculum Vitae (PDF)' : 'Curriculum Vitae (PDF)'}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-mono mb-4">
                {t.footer.socialTitle}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {siteSettings.social_links.behance && (
                  <li>
                    <a
                      href={siteSettings.social_links.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#3682F6] transition-colors"
                    >
                      <span>Behance</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </li>
                )}
                {siteSettings.social_links.dribbble && (
                  <li>
                    <a
                      href={siteSettings.social_links.dribbble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#3682F6] transition-colors"
                    >
                      <span>Dribbble</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </li>
                )}
                {siteSettings.social_links.instagram && (
                  <li>
                    <a
                      href={siteSettings.social_links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#3682F6] transition-colors"
                    >
                      <span>Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </li>
                )}
                {siteSettings.social_links.linkedin && (
                  <li>
                    <a
                      href={siteSettings.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#3682F6] transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {currentYear} {cvData.name}. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>Trosobo, Sambi, Boyolali · {cvData.phone}</span>
            <Link href="/admin" className="hover:text-zinc-300 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
