const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const tsCode = fs.readFileSync(path.join(__dirname, '../src/lib/initial-data.ts'), 'utf8');
const jsCode = ts.transpileModule(tsCode, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
const fn = new Function('module', 'exports', jsCode);
fn(mod, mod.exports);

const { initialProfile, initialCategories, initialProjects, initialExperiences, initialServices, initialSiteSettings } = mod.exports;

function sqlEscape(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'number' || typeof str === 'boolean') return str.toString();
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function sqlArray(arr) {
  if (!arr || !arr.length) return "ARRAY[]::TEXT[]";
  return 'ARRAY[' + arr.map(s => sqlEscape(s)).join(', ') + ']';
}

let sql = `-- ==============================================================================
-- SYNC COMPLETE REAL PORTFOLIO (32 PROYEK, 4 KATEGORI, PENGALAMAN & LAYANAN ASLI)
-- ==============================================================================

-- 1. Ubah tipe kolom ID menjadi TEXT agar string ID didukung penuh
ALTER TABLE public.project_images DROP CONSTRAINT IF EXISTS project_images_project_id_fkey;
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_category_id_fkey;

ALTER TABLE public.categories ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.projects ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.projects ALTER COLUMN category_id TYPE TEXT;
ALTER TABLE public.project_images ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.project_images ALTER COLUMN project_id TYPE TEXT;
ALTER TABLE public.experiences ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.services ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.site_settings ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.profiles ALTER COLUMN id TYPE TEXT;

ALTER TABLE public.projects ADD CONSTRAINT projects_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;
ALTER TABLE public.project_images ADD CONSTRAINT project_images_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

-- 2. Hapus data dummy template lama
DELETE FROM public.project_images;
DELETE FROM public.projects;
DELETE FROM public.categories;
DELETE FROM public.experiences;
DELETE FROM public.services;
DELETE FROM public.profiles;

-- 3. Masukkan Profil Asli Bernardus Firman
INSERT INTO public.profiles (
  id, full_name, title, tagline, bio, years_experience, avatar_url, cv_url,
  location, email, phone, available_for_hire, availability_note
) VALUES (
  ${sqlEscape(initialProfile.id)},
  ${sqlEscape(initialProfile.full_name)},
  ${sqlEscape(initialProfile.title)},
  ${sqlEscape(initialProfile.tagline)},
  ${sqlEscape(initialProfile.bio)},
  ${initialProfile.years_experience},
  ${sqlEscape(initialProfile.avatar_url)},
  ${sqlEscape(initialProfile.cv_url)},
  ${sqlEscape(initialProfile.location)},
  ${sqlEscape(initialProfile.email)},
  ${sqlEscape(initialProfile.phone)},
  ${initialProfile.available_for_hire ? 'true' : 'false'},
  ${sqlEscape(initialProfile.availability_note)}
);

-- 4. Masukkan 4 Kategori Asli
INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
`;

const catRows = initialCategories.map(c => 
  `(${sqlEscape(c.id)}, ${sqlEscape(c.name)}, ${sqlEscape(c.slug)}, ${sqlEscape(c.description)}, ${c.sort_order})`
);
sql += catRows.join(',\n') + ';\n\n';

sql += `-- 5. Masukkan 32 Proyek Asli
INSERT INTO public.projects (
  id, title, slug, subtitle, description, challenge, solution, results,
  client, year, role, category_id, tags, cover_image, live_url, behance_url,
  featured, sort_order, status
) VALUES
`;

const projRows = initialProjects.map(p => {
  return `(` + [
    sqlEscape(p.id),
    sqlEscape(p.title),
    sqlEscape(p.slug),
    sqlEscape(p.subtitle),
    sqlEscape(p.description),
    sqlEscape(p.challenge),
    sqlEscape(p.solution),
    sqlEscape(p.results),
    sqlEscape(p.client),
    p.year || 2024,
    sqlEscape(p.role),
    sqlEscape(p.category_id),
    sqlArray(p.tags),
    sqlEscape(p.cover_image),
    sqlEscape(p.live_url),
    sqlEscape(p.behance_url),
    p.featured ? 'true' : 'false',
    p.sort_order || 0,
    sqlEscape(p.status || 'published')
  ].join(', ') + `)`;
});

sql += projRows.join(',\n') + ';\n\n';

// 6. Project Images
const allImages = [];
for (const p of initialProjects) {
  if (p.images && p.images.length) {
    for (const img of p.images) {
      allImages.push({
        id: img.id,
        project_id: p.id,
        image_url: img.image_url,
        caption: img.caption || '',
        sort_order: img.sort_order || 1
      });
    }
  }
}

if (allImages.length) {
  sql += `-- 6. Masukkan Gambar Galeri Proyek (${allImages.length} foto)
INSERT INTO public.project_images (id, project_id, image_url, caption, sort_order) VALUES
`;
  const imgRows = allImages.map(img => 
    `(${sqlEscape(img.id)}, ${sqlEscape(img.project_id)}, ${sqlEscape(img.image_url)}, ${sqlEscape(img.caption)}, ${img.sort_order})`
  );
  sql += imgRows.join(',\n') + ';\n\n';
}

// 7. Experiences
sql += `-- 7. Masukkan Pengalaman Kerja Asli
INSERT INTO public.experiences (id, position, company, company_url, period, location, description, achievements, is_current, sort_order) VALUES
`;
const expRows = initialExperiences.map((e, idx) => {
  return `(` + [
    sqlEscape(e.id || `exp-${idx + 1}`),
    sqlEscape(e.position),
    sqlEscape(e.company),
    sqlEscape(e.company_url),
    sqlEscape(e.period),
    sqlEscape(e.location),
    sqlEscape(e.description),
    sqlArray(e.achievements),
    e.is_current ? 'true' : 'false',
    e.sort_order || (idx + 1)
  ].join(', ') + `)`;
});
sql += expRows.join(',\n') + ';\n\n';

// 8. Services
sql += `-- 8. Masukkan Layanan Asli
INSERT INTO public.services (id, title, slug, description, deliverables, icon_name, sort_order) VALUES
`;
const servRows = initialServices.map((s, idx) => {
  return `(` + [
    sqlEscape(s.id || `serv-${idx + 1}`),
    sqlEscape(s.title),
    sqlEscape(s.slug),
    sqlEscape(s.description),
    sqlArray(s.deliverables),
    sqlEscape(s.icon_name),
    s.sort_order || (idx + 1)
  ].join(', ') + `)`;
});
sql += servRows.join(',\n') + ';\n\n';

// 9. Site Settings
if (initialSiteSettings) {
  sql += `-- 9. Masukkan Pengaturan Situs
DELETE FROM public.site_settings;
INSERT INTO public.site_settings (id, site_title, site_description, accent_color, social_links) VALUES (
  ${sqlEscape(initialSiteSettings.id || 'settings-1')},
  ${sqlEscape(initialSiteSettings.site_title)},
  ${sqlEscape(initialSiteSettings.site_description)},
  ${sqlEscape(initialSiteSettings.accent_color)},
  '${JSON.stringify(initialSiteSettings.social_links).replace(/'/g, "''")}'::jsonb
);
\n\n`;
}

sql += `-- 10. Pastikan hak akses terbuka untuk publik & admin
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
`;

const outPath = path.join(__dirname, '../supabase/seed_real_portfolio.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Successfully written complete seed to', outPath);
