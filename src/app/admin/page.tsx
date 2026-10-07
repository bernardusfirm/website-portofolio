'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  FolderKanban,
  User,
  Tags,
  Briefcase,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  LogOut,
  ExternalLink,
  Check,
  AlertCircle,
  Eye,
  GripVertical,
  X,
  FileText,
  Mail,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { uploadFile, getContactMessages } from '@/lib/data-service';
import { Project, Category, Experience, ProjectImage, ContactMessage } from '@/lib/types';

type AdminTab = 'overview' | 'profile' | 'projects' | 'categories' | 'experiences' | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    profile,
    categories,
    projects,
    experiences,
    siteSettings,
    isAdmin,
    setIsAdmin,
    updateProfile,
    saveProject,
    deleteProject,
    saveCategory,
    deleteCategory,
    saveExperience,
    deleteExperience,
    updateSiteSettings,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(profile);

  // Site Settings Form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // Project Modal & Form state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    client: '',
    year: new Date().getFullYear(),
    role: 'Senior Graphic Designer',
    category_id: categories[0]?.id || '',
    tags: [],
    cover_image: '',
    images: [],
    live_url: '',
    behance_url: '',
    featured: false,
    sort_order: 1,
    status: 'published',
  });
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Category Modal & Form
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    sort_order: 1,
  });

  // Experience Modal & Form
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expForm, setExpForm] = useState<Partial<Experience>>({
    position: '',
    company: '',
    company_url: '',
    period: '',
    location: 'Jakarta, Indonesia',
    description: '',
    achievements: [],
    is_current: false,
    sort_order: 1,
  });
  const [achievementInput, setAchievementInput] = useState('');

  // Check Auth
  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, router]);

  // Sync profile & settings
  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  // Fetch messages
  useEffect(() => {
    getContactMessages().then((msgs) => setContactMessages(msgs));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    router.push('/');
  };

  // ----------------- PROFILE HANDLERS -----------------
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    showToast('Profile & bio successfully saved and updated!');
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file, 'profile');
      setProfileForm((prev) => ({ ...prev, avatar_url: url }));
      showToast('Avatar uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file, 'cv');
      setProfileForm((prev) => ({ ...prev, cv_url: url }));
      showToast('CV uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // ----------------- PROJECT HANDLERS -----------------
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      id: `proj-${Date.now()}`,
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      challenge: '',
      solution: '',
      results: '',
      client: '',
      year: new Date().getFullYear(),
      role: 'Lead Designer & Art Director',
      category_id: categories[0]?.id || '',
      tags: ['Branding', 'Typography'],
      cover_image:
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      images: [],
      live_url: '',
      behance_url: '',
      featured: false,
      sort_order: projects.length + 1,
      status: 'published',
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({ ...proj });
    setIsProjectModalOpen(true);
  };

  const handleProjectCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadFile(file, 'projects');
      setProjectForm((prev) => ({ ...prev, cover_image: url }));
      showToast('Project cover image uploaded!');
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleProjectGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploading(true);
      const newImages: ProjectImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadFile(file, 'projects');
        newImages.push({
          id: `img-${Date.now()}-${i}`,
          project_id: projectForm.id || '',
          image_url: url,
          caption: `${file.name.replace(/\.[^/.]+$/, '')}`,
          sort_order: (projectForm.images?.length || 0) + i + 1,
        });
      }
      setProjectForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
      showToast(`${newImages.length} image(s) added to gallery!`);
    } catch (err: any) {
      alert(err.message || 'Gallery upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (imgId: string) => {
    setProjectForm((prev) => ({
      ...prev,
      images: prev.images?.filter((img) => img.id !== imgId),
    }));
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.cover_image) {
      alert('Please enter a project title and cover image.');
      return;
    }

    const slug =
      projectForm.slug?.trim() ||
      projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalProject: Project = {
      id: projectForm.id || `proj-${Date.now()}`,
      title: projectForm.title,
      slug,
      subtitle: projectForm.subtitle || '',
      description: projectForm.description || '',
      challenge: projectForm.challenge || '',
      solution: projectForm.solution || '',
      results: projectForm.results || '',
      client: projectForm.client || 'Internal Project',
      year: Number(projectForm.year) || 2026,
      role: projectForm.role || 'Senior Graphic Designer',
      category_id: projectForm.category_id || categories[0]?.id || '',
      tags: projectForm.tags || [],
      cover_image: projectForm.cover_image,
      images: projectForm.images || [],
      live_url: projectForm.live_url || '',
      behance_url: projectForm.behance_url || '',
      featured: Boolean(projectForm.featured),
      sort_order: Number(projectForm.sort_order) || 1,
      status: projectForm.status || 'published',
    };

    await saveProject(finalProject);
    setIsProjectModalOpen(false);
    showToast(`Project "${finalProject.title}" saved successfully!`);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      await deleteProject(id);
      showToast(`Project "${title}" deleted.`);
    }
  };

  // ----------------- CATEGORY HANDLERS -----------------
  const handleSaveCategoryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;
    const slug =
      categoryForm.slug?.trim() ||
      categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat: Category = {
      id: categoryForm.id || `cat-${Date.now()}`,
      name: categoryForm.name,
      slug,
      description: categoryForm.description || '',
      sort_order: Number(categoryForm.sort_order) || 1,
    };
    await saveCategory(newCat);
    setIsCategoryModalOpen(false);
    showToast(`Category "${newCat.name}" saved!`);
  };

  // ----------------- EXPERIENCE HANDLERS -----------------
  const handleSaveExpForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.position || !expForm.company) return;
    const newExp: Experience = {
      id: expForm.id || `exp-${Date.now()}`,
      position: expForm.position,
      company: expForm.company,
      company_url: expForm.company_url || '',
      period: expForm.period || '2024 — Present',
      location: expForm.location || 'Jakarta, Indonesia',
      description: expForm.description || '',
      achievements: expForm.achievements || [],
      is_current: Boolean(expForm.is_current),
      sort_order: Number(expForm.sort_order) || 1,
    };
    await saveExperience(newExp);
    setIsExpModalOpen(false);
    showToast(`Experience at "${newExp.company}" saved!`);
  };

  // ----------------- SETTINGS HANDLERS -----------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settingsForm);
    showToast('Site settings & social links updated!');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0A0A0A] text-zinc-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#3682F6] text-white text-xs font-mono shadow-glow-md">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#3682F6]">
                PORTFOLIO CONTROL CENTER
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-1">Admin Dashboard</h1>
            <p className="text-xs text-zinc-400">
              Manage content, projects, media assets, categories, and settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#3682F6]" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Bio & Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Tags className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'experiences'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#3682F6] text-white shadow-glow-sm font-bold'
                : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site & Messages ({contactMessages.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Total Projects
                </span>
                <div className="text-4xl font-bold text-white mt-2 mb-1">{projects.length}</div>
                <span className="text-xs text-[#3682F6]">
                  {projects.filter((p) => p.featured).length} Featured on Home
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Disciplines / Categories
                </span>
                <div className="text-4xl font-bold text-white mt-2 mb-1">{categories.length}</div>
                <span className="text-xs text-zinc-400">All Active</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Years Experience
                </span>
                <div className="text-4xl font-bold text-white mt-2 mb-1">
                  {profile.years_experience}+
                </div>
                <span className="text-xs text-emerald-400">Active Designer</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Inquiries Received
                </span>
                <div className="text-4xl font-bold text-white mt-2 mb-1">
                  {contactMessages.length}
                </div>
                <span className="text-xs text-zinc-400">Total Leads</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Quick Management Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={openNewProjectModal}
                  className="p-4 rounded-xl bg-white/5 hover:bg-[#3682F6]/20 border border-white/10 hover:border-[#3682F6]/40 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-[#3682F6]">
                      + Add New Project
                    </span>
                    <Plus className="w-4 h-4 text-[#3682F6]" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Upload cover, multi-image gallery, and case study details.
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="p-4 rounded-xl bg-white/5 hover:bg-[#3682F6]/20 border border-white/10 hover:border-[#3682F6]/40 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-[#3682F6]">
                      Edit Bio & Photos
                    </span>
                    <User className="w-4 h-4 text-[#3682F6]" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Update profile picture, bio statement, and CV PDF.
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-4 rounded-xl bg-white/5 hover:bg-[#3682F6]/20 border border-white/10 hover:border-[#3682F6]/40 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-[#3682F6]">
                      View Inquiries
                    </span>
                    <Mail className="w-4 h-4 text-[#3682F6]" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    Review messages submitted via the public contact form.
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PROFILE & BIO ================= */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Designer Profile & Bio</h2>
                  <p className="text-xs text-zinc-400">
                    Edits here are automatically reflected on Home, About, and CV pages.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>

              {/* Photo & CV Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Profile Avatar / Photo
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                      {profileForm.avatar_url && (
                        <Image
                          src={profileForm.avatar_url}
                          alt={profileForm.full_name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#3682F6]" />
                        <span>{isUploading ? 'Uploading...' : 'Upload New Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        Supports JPG, PNG, WEBP. Max 10MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CV PDF Upload */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Curriculum Vitae (PDF File)
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono cursor-pointer transition-colors">
                        <FileText className="w-3.5 h-3.5 text-[#3682F6]" />
                        <span>{isUploading ? 'Uploading...' : 'Upload CV (PDF)'}</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={handleCvUpload}
                        />
                      </label>
                      {profileForm.cv_url && (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> PDF Linked
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or enter public PDF URL"
                      value={profileForm.cv_url || ''}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, cv_url: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.full_name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, full_name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={profileForm.years_experience}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        years_experience: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Location & Timezone
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  Headline Tagline
                </label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  Complete Biography
                </label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  Availability Note
                </label>
                <input
                  type="text"
                  value={profileForm.availability_note}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, availability_note: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                />
              </div>
            </div>
          </form>
        )}

        {/* ================= TAB 3: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Project Showcase</h2>
                <p className="text-xs text-zinc-400">
                  Create, edit, reorder, or feature projects. Drag or adjust sort order.
                </p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="rounded-3xl bg-[#2D2D2D] border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase text-zinc-400">
                      <th className="py-4 px-6">Order</th>
                      <th className="py-4 px-6">Project</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Year / Client</th>
                      <th className="py-4 px-6">Featured</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {projects.map((proj) => {
                      const cat = categories.find((c) => c.id === proj.category_id);
                      return (
                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 font-mono text-zinc-400">
                            #{proj.sort_order}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                                <Image
                                  src={proj.cover_image || '/portfolio/logos/page-1.png'}
                                  alt={proj.title}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-white">{proj.title}</div>
                                <div className="text-xs text-zinc-500 font-mono">/{proj.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-xs font-mono text-[#3682F6]">
                            {cat?.name || 'General'}
                          </td>
                          <td className="py-4 px-6 text-xs">
                            <div className="text-zinc-200">{proj.client}</div>
                            <div className="text-zinc-500 font-mono">{proj.year}</div>
                          </td>
                          <td className="py-4 px-6">
                            {proj.featured ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#3682F6]/20 text-[#3682F6] border border-[#3682F6]/30">
                                Featured
                              </span>
                            ) : (
                              <span className="text-xs text-zinc-600 font-mono">Standard</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/portfolio/${proj.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                title="Preview Page"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => openEditProjectModal(proj)}
                                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                title="Edit Project"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CATEGORIES ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Categories & Disciplines</h2>
                <p className="text-xs text-zinc-400">
                  Manage portfolio filter categories and their display sequence.
                </p>
              </div>
              <button
                onClick={() => {
                  setCategoryForm({
                    id: `cat-${Date.now()}`,
                    name: '',
                    slug: '',
                    description: '',
                    sort_order: categories.length + 1,
                  });
                  setIsCategoryModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[#3682F6]">
                        Order #{cat.sort_order}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">/{cat.slug}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setCategoryForm(cat);
                        setIsCategoryModalOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete category "${cat.name}"?`)) {
                          await deleteCategory(cat.id);
                          showToast(`Category "${cat.name}" removed.`);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: EXPERIENCES ================= */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Career Experience Timeline</h2>
                <p className="text-xs text-zinc-400">
                  Update positions, studios, and achievements for the 8-year career timeline.
                </p>
              </div>
              <button
                onClick={() => {
                  setExpForm({
                    id: `exp-${Date.now()}`,
                    position: '',
                    company: '',
                    period: '2024 — Present',
                    location: 'Jakarta, Indonesia',
                    description: '',
                    achievements: [],
                    is_current: false,
                    sort_order: experiences.length + 1,
                  });
                  setIsExpModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-2xl bg-[#2D2D2D] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#3682F6]">#{exp.sort_order}</span>
                      <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                      {exp.is_current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#3682F6]/20 text-[#3682F6]">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {exp.company} · {exp.location} · {exp.period}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => {
                        setExpForm(exp);
                        setIsExpModalOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete experience "${exp.position}"?`)) {
                          await deleteExperience(exp.id);
                          showToast(`Experience removed.`);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: SETTINGS & INQUIRIES ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-12">
            {/* Contact Messages Table */}
            <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Client Inquiries & Briefs</h2>
                <p className="text-xs text-zinc-400">
                  Submissions sent via public contact page.
                </p>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs font-mono border border-dashed border-white/10 rounded-2xl">
                  No client messages received yet. Test by submitting through the contact page.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="py-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="font-bold text-white text-sm">
                          {msg.name} ({msg.email})
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {new Date(msg.created_at || Date.now()).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-[#3682F6] font-mono">
                        Discipline: {msg.subject} · Budget: {msg.budget_range}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links & SEO Settings */}
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="p-8 rounded-3xl bg-[#2D2D2D] border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">SEO & Social Links</h2>
                    <p className="text-xs text-zinc-400">
                      Configure public social profiles and meta tags.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Site Title (SEO)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.site_title}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, site_title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Brand Accent Color Hex
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settingsForm.accent_color}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, accent_color: e.target.value })
                        }
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.accent_color}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, accent_color: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white">Social Network Profiles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">
                        Behance URL
                      </label>
                      <input
                        type="text"
                        value={settingsForm.social_links.behance || ''}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            social_links: {
                              ...settingsForm.social_links,
                              behance: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">
                        Dribbble URL
                      </label>
                      <input
                        type="text"
                        value={settingsForm.social_links.dribbble || ''}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            social_links: {
                              ...settingsForm.social_links,
                              dribbble: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="text"
                        value={settingsForm.social_links.instagram || ''}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            social_links: {
                              ...settingsForm.social_links,
                              instagram: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        value={settingsForm.social_links.linkedin || ''}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            social_links: {
                              ...settingsForm.social_links,
                              linkedin: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ================= PROJECT MODAL ================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-4xl w-full my-8 bg-[#2D2D2D] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Fill out project meta, high-res cover, problem/solution case study, and gallery images.
            </p>

            <form onSubmit={handleSaveProjectForm} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="auto-generated-from-title"
                    value={projectForm.slug || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, slug: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Category Discipline
                  </label>
                  <select
                    value={projectForm.category_id || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, category_id: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-sm text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={projectForm.client || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, client: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Year Completed
                  </label>
                  <input
                    type="number"
                    value={projectForm.year || 2026}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, year: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={projectForm.role || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Subtitle / Quick Summary
                </label>
                <input
                  type="text"
                  value={projectForm.subtitle || ''}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, subtitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Cover Image URL / Upload *
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                    {projectForm.cover_image && (
                      <Image
                        src={projectForm.cover_image}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      value={projectForm.cover_image || ''}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, cover_image: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-mono cursor-pointer transition-colors">
                      <Upload className="w-3 h-3 text-[#3682F6]" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProjectCoverUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Multi-image Gallery */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Project Gallery Images (Multi-image Support)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#3682F6]/20 text-[#3682F6] border border-[#3682F6]/30 text-xs font-mono cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>Upload Images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleProjectGalleryUpload}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 min-h-[100px]">
                  {projectForm.images && projectForm.images.length > 0 ? (
                    projectForm.images.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-white/10 group"
                      >
                        <Image src={img.image_url || '/portfolio/logos/page-1.png'} alt="" fill unoptimized className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(img.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 hover:bg-red-500 text-white transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-6 text-xs text-zinc-500 font-mono">
                      No gallery images uploaded yet. Click &apos;Upload Images&apos; above.
                    </div>
                  )}
                </div>
              </div>

              {/* Case Study Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    The Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.challenge || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, challenge: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    The Solution
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.solution || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, solution: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    The Results
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.results || ''}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, results: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white resize-none"
                  />
                </div>
              </div>

              {/* Tags & Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        tags: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Branding, Packaging, 3D"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>

                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase text-zinc-300">
                    <input
                      type="checkbox"
                      checked={Boolean(projectForm.featured)}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded accent-[#3682F6]"
                    />
                    <span>Featured on Homepage</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-zinc-400">Order:</span>
                    <input
                      type="number"
                      value={projectForm.sort_order || 1}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          sort_order: Number(e.target.value),
                        })
                      }
                      className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#3682F6] hover:bg-[#2563eb] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-glow-sm"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CATEGORY MODAL ================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#2D2D2D] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Category Details</h2>
            <form onSubmit={handleSaveCategoryForm} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name || ''}
                  onChange={(e) =>
                    setCategoryForm({ ...categoryForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={categoryForm.slug || ''}
                  onChange={(e) =>
                    setCategoryForm({ ...categoryForm, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={categoryForm.description || ''}
                  onChange={(e) =>
                    setCategoryForm({ ...categoryForm, description: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={categoryForm.sort_order || 1}
                  onChange={(e) =>
                    setCategoryForm({
                      ...categoryForm,
                      sort_order: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3682F6] text-white text-xs font-mono font-bold uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EXPERIENCE MODAL ================= */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#2D2D2D] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsExpModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Experience Details</h2>
            <form onSubmit={handleSaveExpForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.position || ''}
                    onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.company || ''}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Period
                  </label>
                  <input
                    type="text"
                    placeholder="2022 — Present"
                    value={expForm.period || ''}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={expForm.location || ''}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={expForm.description || ''}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-zinc-300">
                  <input
                    type="checkbox"
                    checked={Boolean(expForm.is_current)}
                    onChange={(e) => setExpForm({ ...expForm, is_current: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#3682F6]"
                  />
                  <span>Current Position</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-zinc-400">Order:</span>
                  <input
                    type="number"
                    value={expForm.sort_order || 1}
                    onChange={(e) =>
                      setExpForm({ ...expForm, sort_order: Number(e.target.value) })
                    }
                    className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3682F6] text-white text-xs font-mono font-bold uppercase"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
