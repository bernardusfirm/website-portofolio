'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Building,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { getCategoryDisplayName } from '@/lib/translations';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { projects, categories, language, t } = usePortfolio();

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-40 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-white mb-4">
          {language === 'id' ? 'Proyek Tidak Ditemukan' : 'Project Not Found'}
        </h1>
        <p className="text-zinc-400 mb-8">
          {language === 'id'
            ? 'Karya yang Anda cari mungkin telah dipindahkan atau dihapus.'
            : 'The project you are looking for does not exist or has been removed.'}
        </p>
        <Link
          href="/portfolio"
          className="px-6 py-3 rounded-xl bg-[#3682F6] text-white font-medium text-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.portfolio.backBtn}</span>
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === project.category_id);
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Gallery images combined with cover image
  const allImages = [
    {
      id: 'cover',
      image_url: project.cover_image,
      caption: `${project.title} — Key Visual & Presentation`,
      sort_order: 0,
    },
    ...(project.images || []),
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) => (prev! > 0 ? prev! - 1 : allImages.length - 1))
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) => (prev! < allImages.length - 1 ? prev! + 1 : 0))
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[75vh]">
              <Image
                src={allImages[activeImageIndex].image_url || '/portfolio/logos/page-1.png'}
                alt={allImages[activeImageIndex].caption || project.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            {allImages[activeImageIndex].caption && (
              <p className="text-zinc-300 text-sm font-mono mt-4 text-center">
                {allImages[activeImageIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-[#3682F6] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.portfolio.backBtn}</span>
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3682F6]/15 border border-[#3682F6]/30 text-[#3682F6] text-xs font-mono uppercase tracking-wider mb-4">
              <span>{getCategoryDisplayName(category?.name || 'Desain Logo', language)}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              {project.subtitle || project.description}
            </p>
          </div>

          {/* Quick Meta Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#2D2D2D] border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                <Building className="w-3.5 h-3.5 text-[#3682F6]" /> {t.portfolio.clientLabel}
              </span>
              <span className="font-semibold text-white">{project.client}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#3682F6]" /> {t.portfolio.yearLabel}
              </span>
              <span className="font-semibold text-white">{project.year}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                <UserCheck className="w-3.5 h-3.5 text-[#3682F6]" /> {t.portfolio.roleLabel}
              </span>
              <span className="font-semibold text-white text-right">{project.role}</span>
            </div>

            {(project.live_url || project.behance_url) && (
              <div className="pt-2 flex flex-col gap-2">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-[#3682F6] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <span>{t.portfolio.visitSite}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.behance_url && (
                  <a
                    href={project.behance_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-[#3682F6] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <span>{t.portfolio.viewBehance}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hero Cover Image with zoom trigger */}
        <div
          onClick={() => setActiveImageIndex(0)}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 cursor-zoom-in group border border-white/10"
        >
          <Image
            src={project.cover_image || '/portfolio/logos/page-1.png'}
            alt={project.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-102 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5 text-[#3682F6]" />
            <span>{t.portfolio.zoomHint}</span>
          </div>
        </div>

        {/* Problem & Solution Case Study */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-8 sm:p-12 rounded-3xl bg-[#2D2D2D] border border-white/10 shadow-lg">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#3682F6] mb-2 font-semibold">
              {t.portfolio.challengeTitle}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.portfolio.challengeSubtitle}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.challenge || project.description}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#3682F6] mb-2 font-semibold">
              {t.portfolio.approachTitle}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.portfolio.approachSubtitle}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.solution ||
                (language === 'id'
                  ? 'Merancang solusi visual yang terintegrasi dengan mempertimbangkan estetika, konsistensi brand, serta kemudahan produksi.'
                  : 'Engineered an integrated visual and material framework balancing form, brand consistency, and production suitability.')}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#3682F6] mb-2 font-semibold">
              {t.portfolio.outcomeTitle}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t.portfolio.outcomeSubtitle}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.results ||
                (language === 'id'
                  ? 'Meningkatkan daya tarik visual brand, memperkuat pengenalan identitas, dan siap diaplikasikan pada berbagai media fisik maupun digital.'
                  : 'Elevated brand perception, amplified identity recognition, and delivered production-ready files across physical and digital media.')}
            </p>
          </div>
        </div>

        {/* Multi-image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              {language === 'id' ? (
                <>
                  Dokumentasi & <span className="text-gradient-blue">Detail Visual</span>
                </>
              ) : (
                <>
                  Visual System & <span className="text-gradient-blue">Artwork Showcase</span>
                </>
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => setActiveImageIndex(i + 1)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1A1A] cursor-zoom-in border border-white/10"
                >
                  <Image
                    src={img.image_url || '/portfolio/logos/page-1.png'}
                    alt={img.caption || `${project.title} detail ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-xs font-mono text-zinc-200">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-20 pb-10 border-b border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 mr-2">
            {language === 'id' ? 'Kategori & Tagar:' : 'Tagged Disciplines:'}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Next & Previous Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all flex items-center gap-4 group"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-[#3682F6] group-hover:-translate-x-1 transition-all shrink-0" />
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                {language === 'id' ? 'Proyek Sebelumnya' : 'Previous Case'}
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#3682F6] transition-colors">
                {prevProject.title}
              </h4>
            </div>
          </Link>

          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5 hover:border-[#3682F6]/40 transition-all flex items-center justify-between gap-4 group text-right"
          >
            <div className="w-full">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                {language === 'id' ? 'Proyek Selanjutnya' : 'Next Case'}
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#3682F6] transition-colors">
                {nextProject.title}
              </h4>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#3682F6] group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
