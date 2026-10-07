'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  Category,
  Project,
  Experience,
  Service,
  SiteSettings,
} from '@/lib/types';
import {
  getProfile,
  getCategories,
  getProjects,
  getExperiences,
  getServices,
  getSiteSettings,
  updateProfile as apiUpdateProfile,
  saveProject as apiSaveProject,
  deleteProject as apiDeleteProject,
  saveCategory as apiSaveCategory,
  deleteCategory as apiDeleteCategory,
  saveExperience as apiSaveExperience,
  deleteExperience as apiDeleteExperience,
  updateSiteSettings as apiUpdateSiteSettings,
} from '@/lib/data-service';
import {
  initialProfile,
  initialCategories,
  initialProjects,
  initialExperiences,
  initialServices,
  initialSiteSettings,
} from '@/lib/initial-data';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Language, translations, Translations } from '@/lib/translations';

interface PortfolioContextType {
  profile: Profile;
  categories: Category[];
  projects: Project[];
  experiences: Experience[];
  services: Service[];
  siteSettings: SiteSettings;
  isLoading: boolean;
  isAdmin: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  setIsAdmin: (val: boolean) => void;
  refreshAll: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  saveExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdminState] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('id');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bf_lang', lang);
    }
  };

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    if (typeof window !== 'undefined') {
      if (val) {
        localStorage.setItem('bf_admin_auth', 'true');
      } else {
        localStorage.removeItem('bf_admin_auth');
      }
    }
  };

  const refreshAll = async () => {
    try {
      const [prof, cats, projs, exps, servs, sets] = await Promise.all([
        getProfile(),
        getCategories(),
        getProjects(),
        getExperiences(),
        getServices(),
        getSiteSettings(),
      ]);
      setProfile(prof);
      setCategories(cats);
      setProjects(projs);
      setExperiences(exps);
      setServices(servs);
      setSiteSettings(sets);
    } catch (e) {
      console.warn('Error loading portfolio data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check local session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bf_portfolio_categories');
      localStorage.removeItem('bf_portfolio_projects');
      localStorage.removeItem('bf_portfolio_projects_v2');
      localStorage.removeItem('bf_portfolio_projects_v3');
      const savedAuth = localStorage.getItem('bf_admin_auth') === 'true';
      setIsAdminState(savedAuth);
      const savedLang = localStorage.getItem('bf_lang') as Language;
      if (savedLang === 'id' || savedLang === 'en') {
        setLanguageState(savedLang);
      }
    }

    // Always load data from localStorage / Supabase on mount
    refreshAll();

    // Check Supabase Auth session if configured
    const supabase = createClient();
    if (supabase && isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAdminState(true);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAdminState(true);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const handleUpdateProfile = async (data: Partial<Profile>) => {
    const updated = await apiUpdateProfile(data);
    setProfile(updated);
  };

  const handleSaveProject = async (project: Project) => {
    const updated = await apiSaveProject(project);
    setProjects(updated);
  };

  const handleDeleteProject = async (id: string) => {
    const updated = await apiDeleteProject(id);
    setProjects(updated);
  };

  const handleSaveCategory = async (cat: Category) => {
    const updated = await apiSaveCategory(cat);
    setCategories(updated);
  };

  const handleDeleteCategory = async (id: string) => {
    const updated = await apiDeleteCategory(id);
    setCategories(updated);
  };

  const handleSaveExperience = async (exp: Experience) => {
    const updated = await apiSaveExperience(exp);
    setExperiences(updated);
  };

  const handleDeleteExperience = async (id: string) => {
    const updated = await apiDeleteExperience(id);
    setExperiences(updated);
  };

  const handleUpdateSiteSettings = async (data: Partial<SiteSettings>) => {
    const updated = await apiUpdateSiteSettings(data);
    setSiteSettings(updated);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        categories,
        projects,
        experiences,
        services,
        siteSettings,
        isLoading,
        isAdmin,
        language,
        setLanguage,
        t: translations[language],
        setIsAdmin,
        refreshAll,
        updateProfile: handleUpdateProfile,
        saveProject: handleSaveProject,
        deleteProject: handleDeleteProject,
        saveCategory: handleSaveCategory,
        deleteCategory: handleDeleteCategory,
        saveExperience: handleSaveExperience,
        deleteExperience: handleDeleteExperience,
        updateSiteSettings: handleUpdateSiteSettings,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
