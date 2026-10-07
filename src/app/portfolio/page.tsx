'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { getCategoryDisplayName } from '@/lib/translations';

export default function PortfolioPage() {
  const { projects, categories, language, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || project.category_id === selectedCategory;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle?.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    return getCategoryDisplayName(found ? found.name : catId, language);
  };

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3682F6] uppercase tracking-widest mb-4">
            <span>{t.portfolio.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            {t.portfolio.title}{' '}
            <span className="text-gradient-blue">{t.portfolio.titleHighlight}</span>
          </h1>
          <p className="text-[#E8E8E8] text-base sm:text-lg">
            {t.portfolio.description}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
              }`}
            >
              {t.portfolio.allProjects} ({projects.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                }`}
              >
                {getCategoryDisplayName(cat.name, language)}
              </button>
            ))}
          </div>

          {/* Search & View Mode Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.portfolio.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#3682F6] transition-colors"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#3682F6] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title={language === 'id' ? 'Tampilan Grid' : 'Grid View'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#3682F6] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title={language === 'id' ? 'Tampilan List' : 'Editorial List View'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-zinc-400 text-lg mb-3">
              {language === 'id'
                ? 'Tidak ada proyek yang sesuai dengan kriteria pencarian.'
                : 'No projects found matching your criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono uppercase tracking-wider text-[#3682F6] hover:underline"
            >
              {language === 'id' ? 'Reset filter dan tampilkan semua' : 'Clear filters and view all'}
            </button>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl bg-[#2D2D2D] border border-white/10 hover:border-[#3682F6]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative aspect-[16/11] overflow-hidden bg-[#1A1A1A] block"
                  >
                    <Image
                      src={project.cover_image || '/portfolio/logos/page-1.png'}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#3682F6]" />
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-[11px] font-mono text-[#3682F6] uppercase tracking-wider">
                          {getCategoryName(project.category_id)}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">{project.year}</span>
                      </div>

                      <Link href={`/portfolio/${project.slug}`}>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#3682F6] transition-colors mb-2">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {project.subtitle || project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-mono">
                        {t.portfolio.clientLabel}: {project.client}
                      </span>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="text-xs font-semibold text-zinc-300 group-hover:text-[#3682F6] transition-colors flex items-center gap-1"
                      >
                        <span>{language === 'id' ? 'Lihat Detail' : 'Case Study'}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* LIST / EDITORIAL VIEW */}
        {viewMode === 'list' && (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:px-4 rounded-xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-14 sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                    <Image
                      src={project.cover_image || '/portfolio/logos/page-1.png'}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#3682F6] uppercase tracking-wider">
                      {getCategoryName(project.category_id)}
                    </span>
                    <Link href={`/portfolio/${project.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#3682F6] transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                      {project.subtitle || project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 self-end md:self-center">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-semibold text-white">{project.client}</div>
                    <div className="text-xs font-mono text-zinc-400">{project.year}</div>
                  </div>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#3682F6] text-zinc-300 hover:text-white transition-all text-xs font-mono"
                  >
                    <span>{language === 'id' ? 'Lihat Detail' : 'View Case'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
