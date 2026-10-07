'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { getCategoryDisplayName } from '@/lib/translations';

export default function FeaturedWorks() {
  const { projects, categories, language, t } = usePortfolio();

  // Get featured projects or top 4
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const displayList = featured.length > 0 ? featured : projects.slice(0, 4);

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    return getCategoryDisplayName(found ? found.name : catId, language);
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-3">
              <span>{t.portfolio.featuredBadge}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              {t.portfolio.featuredTitle}{' '}
              <span className="text-gradient-blue">{t.portfolio.featuredHighlight}</span>
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#3682F6] transition-colors group"
          >
            <span>
              {t.portfolio.viewAllCta} ({projects.length})
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-[#2D2D2D] border border-white/10 hover:border-[#3682F6]/50 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Frame */}
              <Link
                href={`/portfolio/${project.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A] block"
              >
                <Image
                  src={project.cover_image || '/portfolio/logos/page-1.png'}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Hover overlay badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-[#3682F6]" />
                </div>
              </Link>

              {/* Content Description */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono font-medium text-[#3682F6] uppercase tracking-wider">
                      {getCategoryName(project.category_id)}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.year} · {project.client}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/portfolio/${project.slug}`}>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#3682F6] transition-colors mb-2">
                      {project.title}
                    </h3>
                  </Link>

                  {/* Subtitle / Description */}
                  <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.subtitle || project.description}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-xs font-semibold text-zinc-300 group-hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <span>{language === 'id' ? 'Lihat Detail' : 'View Case'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#3682F6]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
