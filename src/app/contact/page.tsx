'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { submitContactMessage } from '@/lib/data-service';
import { cvData } from '@/lib/translations';

export default function ContactPage() {
  const { profile, siteSettings, language, t } = usePortfolio();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: language === 'id' ? 'Branding & Identitas Visual' : 'Branding & Visual Identity',
    budget_range: language === 'id' ? '< Rp 1.000.000' : '< $100',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jakartaTime, setJakartaTime] = useState('');

  // Live Jakarta GMT+7 Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setJakartaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(cvData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    budget_range: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        budget_range: form.budget_range,
        message: form.message,
      };

      // 1. Kirim via API Route Server untuk pengiriman email otomatis ke inbox
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (apiErr) {
        console.warn('API contact email fetch warning:', apiErr);
      }

      // 2. Simpan ke database / local storage agar tetap terekam di Admin Dashboard
      await submitContactMessage(payload);

      setSubmittedData({ ...payload });
      setIsSuccess(true);
      setForm({
        name: '',
        email: '',
        subject: language === 'id' ? 'Branding & Identitas Visual' : 'Branding & Visual Identity',
        budget_range: language === 'id' ? '< Rp 1.000.000' : '< $100',
        message: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-4">
            <span>{t.contact.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            {t.contact.title} <span className="text-gradient-blue">{t.contact.titleHighlight}</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Timezone */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status card */}
            <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/10 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{t.contact.availableBadge}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.contact.directTitle}</h3>
                <p className="text-xs text-zinc-400">
                  {t.contact.responseTime}
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-zinc-500">{t.contact.emailLabel}</span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-mono text-white">{cvData.email}</span>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-zinc-500">{t.contact.phoneLabel}</span>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-mono text-white">
                  {cvData.phoneInternational} ({cvData.phone})
                </div>
              </div>

              {/* Location & Timezone */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-zinc-500">{t.contact.studioLabel}</span>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <MapPin className="w-4 h-4 text-[#3682F6]" />
                    <span>{cvData.location}, Jawa Tengah, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{t.contact.localTimeLabel} {jakartaTime || 'Loading...'} (GMT+7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="p-6 rounded-3xl bg-[#2D2D2D] border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
                {t.contact.socialsTitle}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {siteSettings.social_links.behance && (
                  <a
                    href={siteSettings.social_links.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-[#3682F6] text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-between"
                  >
                    <span>Behance</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {siteSettings.social_links.dribbble && (
                  <a
                    href={siteSettings.social_links.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-[#3682F6] text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-between"
                  >
                    <span>Dribbble</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {siteSettings.social_links.instagram && (
                  <a
                    href={siteSettings.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-[#3682F6] text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-between"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {siteSettings.social_links.linkedin && (
                  <a
                    href={siteSettings.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-[#3682F6] text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-between"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#2D2D2D] border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">{t.contact.formTitle}</h3>
            <p className="text-sm text-zinc-400 mb-8">
              {t.contact.formSubtitle}
            </p>

            {isSuccess ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-[#3682F6]/10 border border-[#3682F6]/30 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-[#3682F6] text-white flex items-center justify-center mx-auto shadow-glow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">{t.contact.successTitle}</h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.successMsg}
                  </p>
                </div>

                {/* Direct Forward Actions */}
                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/6282135602758?text=${
                      submittedData
                        ? encodeURIComponent(
                            `Halo Mas Firman, saya baru saja mengirim brief proyek dari website portofolio:\n\n` +
                              `• Nama: ${submittedData.name}\n` +
                              `• Email: ${submittedData.email}\n` +
                              `• Kategori: ${submittedData.subject}\n` +
                              `• Estimasi Budget: ${submittedData.budget_range}\n\n` +
                              `Detail Pesan:\n"${submittedData.message}"`
                          )
                        : ''
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all shadow-glow-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'id' ? 'Kirim Salinan via WhatsApp' : 'Send Copy via WhatsApp'}</span>
                  </a>

                  <a
                    href={
                      submittedData
                        ? `mailto:${cvData.email}?subject=${encodeURIComponent(
                            `[Brief Proyek] ${submittedData.subject} - dari ${submittedData.name}`
                          )}&body=${encodeURIComponent(
                            `Nama: ${submittedData.name}\nEmail: ${submittedData.email}\nKategori: ${submittedData.subject}\nBudget: ${submittedData.budget_range}\n\nPesan:\n${submittedData.message}`
                          )}`
                        : `mailto:${cvData.email}`
                    }
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <Mail className="w-4 h-4 text-[#3682F6]" />
                    <span>{language === 'id' ? 'Buka di Aplikasi Email' : 'Open in Email Client'}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors underline"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      {t.contact.emailInputLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      {t.contact.disciplineLabel}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#3682F6] transition-colors"
                    >
                      <option value="Branding & Logo Design">
                        {language === 'id' ? 'Desain Branding & Logo' : 'Branding & Logo Design'}
                      </option>
                      <option value="Digital Printing & Print Collateral">
                        {language === 'id' ? 'Digital Printing & Materi Cetak' : 'Digital Printing & Print Collateral'}
                      </option>
                      <option value="Social Media & Promo Design">
                        {language === 'id' ? 'Desain Promosi & Media Sosial' : 'Social Media & Promo Design'}
                      </option>
                      <option value="Video Editing & Reels">
                        {language === 'id' ? 'Editing Video & Konten Reels/TikTok' : 'Video Editing & Reels/TikTok'}
                      </option>
                      <option value="Packaging & Label Design">
                        {language === 'id' ? 'Desain Kemasan & Label Produk' : 'Packaging & Label Design'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      {t.contact.budgetLabel}
                    </label>
                    <select
                      value={form.budget_range}
                      onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#3682F6] transition-colors"
                    >
                      {language === 'id' ? (
                        <>
                          <option value="Rp 500.000 — Rp 1.500.000">Rp 500.000 — Rp 1.500.000</option>
                          <option value="Rp 1.500.000 — Rp 3.500.000">Rp 1.500.000 — Rp 3.500.000</option>
                          <option value="Rp 3.500.000 — Rp 7.000.000">Rp 3.500.000 — Rp 7.000.000</option>
                          <option value="Rp 7.000.000+">Rp 7.000.000+</option>
                        </>
                      ) : (
                        <>
                          <option value="$100 — $300">$100 — $300</option>
                          <option value="$300 — $700">$300 — $700</option>
                          <option value="$700 — $1,500">$700 — $1,500</option>
                          <option value="$1,500+">$1,500+</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-sm transition-all shadow-glow-sm hover:shadow-glow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t.contact.submittingBtn}</span>
                  ) : (
                    <>
                      <span>{t.contact.submitBtn}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
