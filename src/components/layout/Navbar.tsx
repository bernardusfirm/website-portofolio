'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ShieldCheck, Download, Globe } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { profile, isAdmin, language, setLanguage, t } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.expertise, href: '/expertise' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.experience, href: '/experience' },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center font-bold text-lg text-white group-hover:border-[#3682F6] group-hover:text-[#3682F6] transition-all duration-300">
            BF<span className="text-[#3682F6]">.</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-wider uppercase text-white group-hover:text-[#3682F6] transition-colors">
              {profile.full_name || 'Bernardus Firman Bagaskara'}
            </span>
            <span className="block text-[11px] text-zinc-400 font-mono tracking-tight">
              {profile.title || 'Graphic Designer'} · {profile.years_experience}+Y Exp
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#2D2D2D]/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors rounded-full ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-[#3682F6]/20 border border-[#3682F6]/50 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'id'
                  ? 'bg-[#3682F6] text-white font-bold shadow-glow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-[#3682F6] text-white font-bold shadow-glow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Download CV button */}
          <Link
            href="/cv"
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
          >
            <Download className="w-3.5 h-3.5 text-[#3682F6]" />
            <span>CV</span>
          </Link>

          {/* Admin link */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all bg-white/[0.02]"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#3682F6]" />
            <span>{t.nav.admin}</span>
            {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
          </Link>

          {/* Let's Talk CTA */}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-[#3682F6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-full transition-all shadow-glow-sm hover:shadow-glow-md"
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center rounded-lg bg-white/5 border border-white/10 p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 rounded ${
                language === 'id' ? 'bg-[#3682F6] text-white font-bold' : 'text-zinc-400'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded ${
                language === 'en' ? 'bg-[#3682F6] text-white font-bold' : 'text-zinc-400'
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/cv"
            className="p-2 text-zinc-300 hover:text-white rounded-lg border border-white/10"
            title="Download CV"
          >
            <Download className="w-4 h-4 text-[#3682F6]" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-300 hover:text-white rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#3682F6]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#1A1A1A] border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm uppercase tracking-wider py-2 font-medium transition-colors ${
                    isActive(link.href) ? 'text-[#3682F6] font-bold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/cv"
                  className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-300 p-2.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#3682F6]" />
                    Curriculum Vitae (PDF)
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-300 p-2.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#3682F6]" />
                    {t.nav.admin}
                  </span>
                  {isAdmin && <span className="text-[10px] text-emerald-400">Authenticated</span>}
                </Link>

                <Link
                  href="/contact"
                  className="w-full text-center text-xs uppercase tracking-wider font-semibold bg-[#3682F6] text-white py-3 rounded-xl mt-1 shadow-glow-sm"
                >
                  {t.nav.talk}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
