import { createClient, isSupabaseConfigured } from './supabase/client';
import {
  Profile,
  Category,
  Project,
  ProjectImage,
  Experience,
  Service,
  SiteSettings,
  ContactMessage,
} from './types';
import {
  initialProfile,
  initialCategories,
  initialProjects,
  initialExperiences,
  initialServices,
  initialSiteSettings,
} from './initial-data';

// Local storage key constants
const STORAGE_KEYS = {
  PROFILE: 'bf_portfolio_profile_v2',
  CATEGORIES: 'bf_portfolio_categories_v2',
  PROJECTS: 'bf_portfolio_projects_v4',
  EXPERIENCES: 'bf_portfolio_experiences_v2',
  SERVICES: 'bf_portfolio_services_v3',
  SETTINGS: 'bf_portfolio_settings_v2',
  MESSAGES: 'bf_portfolio_messages_v2',
};

// Helper for local browser storage fallback
function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e: any) {
    console.warn('Failed to set localStorage', e);
    // If quota exceeded, clean up older cache versions and retry
    try {
      localStorage.removeItem('bf_portfolio_projects');
      localStorage.removeItem('bf_portfolio_projects_v2');
      localStorage.removeItem('bf_portfolio_projects_v3');
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err2) {
      console.warn('localStorage still exceeded after cleanup', err2);
    }
  }
}

// ----------------- PROFILE -----------------
export async function getProfile(): Promise<Profile> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data as Profile;
    } catch (e) {
      console.warn('Supabase profile fetch error, fallback to local', e);
    }
  }
  return getLocalItem<Profile>(STORAGE_KEYS.PROFILE, initialProfile);
}

export async function updateProfile(updated: Partial<Profile>): Promise<Profile> {
  const supabase = createClient();
  const current = await getProfile();
  const merged: Profile = { ...current, ...updated, updated_at: new Date().toISOString() };

  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(merged)
        .select()
        .single();
      if (!error && data) {
        setLocalItem(STORAGE_KEYS.PROFILE, data);
        return data as Profile;
      }
    } catch (e) {
      console.warn('Supabase profile update error, fallback to local', e);
    }
  }

  setLocalItem(STORAGE_KEYS.PROFILE, merged);
  return merged;
}

// ----------------- CATEGORIES -----------------
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch (e) {
      console.warn('Supabase categories fetch error', e);
    }
  }
  const local = getLocalItem<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  const existingIds = new Set(local.map((c) => c.id));
  const missing = initialCategories.filter((c) => !existingIds.has(c.id));
  const list = missing.length > 0 ? [...local, ...missing] : local;
  if (missing.length > 0) {
    setLocalItem(STORAGE_KEYS.CATEGORIES, list);
  }
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveCategory(category: Category): Promise<Category[]> {
  const current = await getCategories();
  const index = current.findIndex((c) => c.id === category.id);
  let updatedList: Category[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = category;
  } else {
    updatedList = [...current, category];
  }
  updatedList.sort((a, b) => a.sort_order - b.sort_order);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('categories').upsert(category);
    } catch (e) {
      console.warn('Supabase category save error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.CATEGORIES, updatedList);
  return updatedList;
}

export async function deleteCategory(id: string): Promise<Category[]> {
  const current = await getCategories();
  const updatedList = current.filter((c) => c.id !== id);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('categories').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase category delete error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.CATEGORIES, updatedList);
  return updatedList;
}

// ----------------- PROJECTS -----------------
export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*), images:project_images(*)')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Project[];
    } catch (e) {
      console.warn('Supabase projects fetch error', e);
    }
  }

  // Load from local storage v4, or migrate from older keys if available
  let local = getLocalItem<Project[] | null>(STORAGE_KEYS.PROJECTS, null);
  if (!local || !Array.isArray(local) || local.length === 0) {
    const v3 = getLocalItem<Project[] | null>('bf_portfolio_projects_v3', null);
    if (v3 && Array.isArray(v3) && v3.length > 0) {
      local = v3;
    }
  }

  if (!local || !Array.isArray(local) || local.length === 0) {
    local = [...initialProjects];
    setLocalItem(STORAGE_KEYS.PROJECTS, local);
    return local.sort((a, b) => a.sort_order - b.sort_order);
  }

  // Sanitize and self-heal: guarantee no project has empty cover_image or missing fields
  const initialMap = new Map(initialProjects.map((p) => [p.id, p]));
  const localMap = new Map(local.map((p) => [p.id, p]));
  const sanitizedList: Project[] = [];

  for (const proj of local) {
    const init = initialMap.get(proj.id);
    let cover = proj.cover_image;
    // Repair empty or corrupt cover image
    if (!cover || typeof cover !== 'string' || cover.trim() === '') {
      cover = init?.cover_image || '/portfolio/logos/page-1.png';
    }
    sanitizedList.push({
      ...proj,
      cover_image: cover,
      images: proj.images && proj.images.length > 0 ? proj.images : (init?.images || []),
    });
  }

  // Add any initial projects that might be missing
  for (const init of initialProjects) {
    if (!localMap.has(init.id)) {
      sanitizedList.push(init);
    }
  }

  sanitizedList.sort((a, b) => a.sort_order - b.sort_order);
  setLocalItem(STORAGE_KEYS.PROJECTS, sanitizedList);
  return sanitizedList;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<Project[]> {
  const current = await getProjects();
  const index = current.findIndex((p) => p.id === project.id);
  
  // Guarantee cover_image is valid
  let coverImage = project.cover_image;
  if (!coverImage || typeof coverImage !== 'string' || coverImage.trim() === '') {
    const init = initialProjects.find((p) => p.id === project.id);
    coverImage = init?.cover_image || '/portfolio/logos/page-1.png';
  }

  const projectWithTime: Project = {
    ...project,
    cover_image: coverImage,
    updated_at: new Date().toISOString(),
  };

  let updatedList: Project[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = projectWithTime;
  } else {
    updatedList = [...current, projectWithTime];
  }
  updatedList.sort((a, b) => a.sort_order - b.sort_order);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      // Exclude nested objects before upserting into projects table
      const { images, category, ...projectData } = projectWithTime;
      await supabase.from('projects').upsert(projectData);

      // Upsert project images if present
      if (images && images.length > 0) {
        await supabase.from('project_images').delete().eq('project_id', project.id);
        await supabase.from('project_images').insert(
          images.map((img, i) => ({
            id: img.id,
            project_id: project.id,
            image_url: img.image_url,
            caption: img.caption || '',
            sort_order: img.sort_order ?? i,
          }))
        );
      }
    } catch (e) {
      console.warn('Supabase project save error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.PROJECTS, updatedList);
  return updatedList;
}

export async function deleteProject(id: string): Promise<Project[]> {
  const current = await getProjects();
  const updatedList = current.filter((p) => p.id !== id);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase project delete error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.PROJECTS, updatedList);
  return updatedList;
}

// ----------------- EXPERIENCES -----------------
export async function getExperiences(): Promise<Experience[]> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Experience[];
    } catch (e) {
      console.warn('Supabase experiences fetch error', e);
    }
  }
  return getLocalItem<Experience[]>(STORAGE_KEYS.EXPERIENCES, initialExperiences);
}

export async function saveExperience(exp: Experience): Promise<Experience[]> {
  const current = await getExperiences();
  const index = current.findIndex((e) => e.id === exp.id);
  let updatedList: Experience[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = exp;
  } else {
    updatedList = [...current, exp];
  }
  updatedList.sort((a, b) => a.sort_order - b.sort_order);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('experiences').upsert(exp);
    } catch (e) {
      console.warn('Supabase experience save error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.EXPERIENCES, updatedList);
  return updatedList;
}

export async function deleteExperience(id: string): Promise<Experience[]> {
  const current = await getExperiences();
  const updatedList = current.filter((e) => e.id !== id);

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('experiences').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase experience delete error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.EXPERIENCES, updatedList);
  return updatedList;
}

// ----------------- SERVICES -----------------
export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Service[];
    } catch (e) {
      console.warn('Supabase services fetch error', e);
    }
  }
  return getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
}

// ----------------- SITE SETTINGS -----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data as SiteSettings;
    } catch (e) {
      console.warn('Supabase settings fetch error', e);
    }
  }
  return getLocalItem<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const merged: SiteSettings = {
    ...current,
    ...settings,
    updated_at: new Date().toISOString(),
  };

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('site_settings').upsert(merged);
    } catch (e) {
      console.warn('Supabase settings update error', e);
    }
  }

  setLocalItem(STORAGE_KEYS.SETTINGS, merged);
  return merged;
}

// ----------------- CONTACT MESSAGES -----------------
export async function submitContactMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<boolean> {
  const newMessage: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from('contact_messages').insert(newMessage);
      return true;
    } catch (e) {
      console.warn('Supabase message insert error, storing locally', e);
    }
  }

  const existing = getLocalItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  setLocalItem(STORAGE_KEYS.MESSAGES, [newMessage, ...existing]);
  return true;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as ContactMessage[];
    } catch (e) {
      console.warn('Supabase messages fetch error', e);
    }
  }
  return getLocalItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
}

// ----------------- FILE & IMAGE UPLOAD -----------------
export async function uploadFile(
  file: File,
  folder: 'projects' | 'profile' | 'cv' = 'projects'
): Promise<string> {
  // 1. Validation: file size limit (15MB)
  const maxBytes = 15 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error('File size exceeds the 15MB limit.');
  }

  // 2. Validation: MIME types
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'application/pdf',
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File format not supported. Please upload JPG, PNG, WEBP, SVG, or PDF.');
  }

  const supabase = createClient();
  if (supabase && isSupabaseConfigured()) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn('Supabase storage upload failed, attempting local server upload', err);
    }
  }

  // 3. Local API upload to save directly into public/uploads
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const json = await res.json();
      if (json.url) {
        return json.url;
      }
    }
  } catch (err) {
    console.warn('Local API upload failed, falling back to canvas compression', err);
  }

  // 4. Fallback: compress image via canvas (<100KB) so base64 doesn't crash localStorage
  if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new (window as any).Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(reader.result as string);
          }
        };
        img.onerror = () => resolve(reader.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  // Final fallback
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
