-- ==============================================================================
-- DATABASE SCHEMA: BERNARDUSFIRMAN PORTFOLIO
-- Supabase PostgreSQL with Row Level Security (RLS) & Storage Configuration
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');

-- 3. PROFILES TABLE (Single Admin/Owner Profile)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT 'Bernardus Firman',
    title TEXT NOT NULL DEFAULT 'Senior Graphic Designer & Art Director',
    tagline TEXT DEFAULT 'Crafting enduring brand identities, tactile packaging, and visual systems with 8+ years of relentless precision.',
    bio TEXT,
    years_experience INT DEFAULT 8,
    avatar_url TEXT,
    cv_url TEXT,
    location TEXT DEFAULT 'Jakarta, Indonesia (GMT+7)',
    email TEXT DEFAULT 'hello@bernardusfirman.com',
    phone TEXT DEFAULT '+62 812-3456-7890',
    available_for_hire BOOLEAN DEFAULT true,
    availability_note TEXT DEFAULT 'Available for Select Projects & Consultations',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    client TEXT,
    year INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    role TEXT DEFAULT 'Lead Designer & Art Director',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    cover_image TEXT NOT NULL,
    live_url TEXT,
    behance_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    status project_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROJECT IMAGES (Gallery / Multi-image support)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EXPERIENCES TABLE (Career Timeline)
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position TEXT NOT NULL,
    company TEXT NOT NULL,
    company_url TEXT,
    period TEXT NOT NULL,
    location TEXT DEFAULT 'Jakarta, Indonesia',
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    is_current BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EXPERTISE & SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    icon_name TEXT DEFAULT 'Palette',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SITE SETTINGS & SOCIAL LINKS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title TEXT DEFAULT 'Bernardusfirman — Senior Graphic Designer & Art Director',
    site_description TEXT DEFAULT 'Portfolio of Bernardusfirman. 8+ years crafting bespoke brand identities, tactile packaging, editorial design, and visual art direction.',
    accent_color TEXT DEFAULT '#ff5e1e',
    social_links JSONB DEFAULT '{
        "behance": "https://behance.net/bernardusfirman",
        "dribbble": "https://dribbble.com/bernardusfirman",
        "instagram": "https://instagram.com/bernardusfirman",
        "linkedin": "https://linkedin.com/in/bernardusfirman"
    }'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACT INQUIRIES
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    budget_range TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access for website content
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read on project_images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read on site_settings" ON public.site_settings FOR SELECT USING (true);

-- 2. Public Create Access for contact submissions
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 3. Authenticated Admin Full CRUD Access
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION
-- ==============================================================================
-- Run these in Supabase SQL editor to create storage bucket:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);
--
-- CREATE POLICY "Public read portfolio-assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin upload portfolio-assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin update portfolio-assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin delete portfolio-assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');

-- ==============================================================================
-- SEED DATA FOR BERNARDUSFIRMAN (8+ YEARS GRAPHIC DESIGNER)
-- ==============================================================================

-- Categories
INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Brand Identity', 'brand-identity', 'Complete visual identity systems, logos, guidelines, and corporate iconography.', 1),
('22222222-2222-2222-2222-222222222222', 'Packaging Design', 'packaging-design', 'Physical tactile packaging, custom dielines, bottle labels, and premium unboxing.', 2),
('33333333-3333-3333-3333-333333333333', 'Editorial & Print', 'editorial-print', 'High-end publications, art books, annual reports, typography, and exhibition catalogs.', 3),
('44444444-4444-4444-4444-444444444444', 'Art Direction', 'art-direction', 'Creative campaign direction, editorial photography styling, and holistic visual storytelling.', 4),
('55555555-5555-5555-5555-555555555555', 'Digital & UI/UX', 'digital-uiux', 'Design systems, interactive web aesthetics, creative websites, and mobile visual design.', 5)
ON CONFLICT (slug) DO NOTHING;

-- Profile
INSERT INTO public.profiles (
    id, full_name, title, tagline, bio, years_experience, 
    avatar_url, cv_url, location, email, phone, available_for_hire, availability_note
) VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Bernardus Firman Bagaskara',
    'Graphic Designer',
    'Berpengalaman 5+ tahun sebagai desainer grafis dan di bidang digital printing.',
    'Graphic Designer dengan pengalaman sejak 2022 dan telah mengerjakan 500+ proyek desain untuk kebutuhan branding, promosi, media sosial, dan digital printing. Terbiasa menangani proses desain secara end-to-end, mulai dari menerjemahkan brief menjadi konsep visual, menyusun layout, memilih tipografi dan elemen visual, melakukan revisi, hingga menghasilkan final artwork siap publikasi dan produksi. Menguasai Adobe Photoshop, Adobe Illustrator, CorelDRAW, Adobe Premiere Pro, Adobe After Effects, dan CapCut untuk mengembangkan desain statis maupun konten video. Berorientasi pada ketepatan brief, kualitas visual, konsistensi brand, dan penyelesaian pekerjaan sesuai deadline.',
    5,
    '/profile.jpg',
    '/cv-bernardusfirman.pdf',
    'Indonesia · Available for Remote & Onsite',
    'hello@bernardusfirman.com',
    '+62 812-3456-7890',
    true,
    'Terbuka untuk proyek branding, promosi, video, dan digital printing'
) ON CONFLICT DO NOTHING;

-- Services
INSERT INTO public.services (title, slug, description, deliverables, icon_name, sort_order) VALUES
('Visual Identity Systems', 'visual-identity', 'Holistic brand design that scales across physical and digital touchpoints with enduring authority.', ARRAY['Logo Architecture', 'Brand Guidelines & Manual', 'Custom Type Specimen', 'Stationery & Collateral', 'Sub-brand Ecosystems'], 'Sparkles', 1),
('Packaging & Structural Design', 'packaging-design', 'Sensory, sustainable, and shelf-stopping packaging that connects deeply with discerning consumers.', ARRAY['Bespoke Dieline Engineering', 'Finishing & Foil Specifications', 'Sustainable Material Sourcing', 'Label Systems & Barcode compliance', '3D Photorealistic Renders'], 'Box', 2),
('Editorial & Book Design', 'editorial-design', 'Artisanal publications and corporate monographs engineered with refined typographic rhythm.', ARRAY['Coffee Table Art Books', 'Annual Reports & Lookbooks', 'Typography Hierarchy & Layout', 'Print Production Supervision', 'Specialty Binding Direction'], 'BookOpen', 3),
('Creative Art Direction', 'art-direction', 'Concept ideation and visual leadership for high-impact commercial campaigns and photo shoots.', ARRAY['Campaign Concept Moodboards', 'On-set Photography Direction', 'Set & Prop Curation', 'Color Grading & Retouching Guidance', 'Social Campaign Toolkits'], 'Layers', 4),
('Digital Experiences & UI', 'digital-experiences', 'Tactile, minimalist digital interfaces and design systems rooted in graphic design discipline.', ARRAY['Responsive Web Design', 'Figma Design System Components', 'Interactive Micro-animations', 'Design Token Specifications', 'Creative Frontend Collaboration'], 'Monitor', 5);

-- Experiences
INSERT INTO public.experiences (position, company, company_url, period, location, description, achievements, is_current, sort_order) VALUES
('Head of Brand & Visual Design', 'Studio KINETIK', 'https://studiokinetik.com', '2022 — Present', 'Jakarta, Indonesia', 'Directing all brand strategy and visual execution for regional clients across FMCG, lifestyle hospitality, and FinTech.', ARRAY['Spearheaded rebrand for 14 national brands resulting in an average 38% brand equity uplift', 'Built and led an agile multidisciplinary team of 7 designers, illustrators, and 3D artists', 'Secured 3 DFA (Design For Asia) nominations and multiple Behance Featured Curations'], true, 1),
('Senior Visual Identity Designer', 'Monolith Creative Lab', 'https://monolithcreative.co', '2019 — 2022', 'Singapore / Remote', 'Conceptualized high-impact visual identities, custom typography, and retail packaging for international clients.', ARRAY['Crafted award-winning packaging architecture for sustainable coffee pioneer Kopi Terra', 'Established design token system bridging print visual guidelines with digital interfaces', 'Delivered 30+ brand identity projects across APAC region'], false, 2),
('Mid-Weight Graphic Designer', 'Vektor Studio', 'https://vektorstudio.id', '2017 — 2019', 'Bandung, Indonesia', 'Responsible for editorial publication, event spatial identities, and promotional packaging.', ARRAY['Designed identity and spatial signage for Bandung Contemporary Art Biennial 2018', 'Collaborated closely with offset print masters on luxury foil stamping and tactile paper stocks'], false, 3),
('Junior Designer & Typographer', 'Artisan Type & Press', 'https://artisantype.com', '2016 — 2017', 'Jakarta, Indonesia', 'Immersed in classical grid systems, editorial layouts, poster design, and identity fundamentals.', ARRAY['Mastered grid systems, kerning nuances, and offset CMYK color separations', 'Assisted in publication of 12 art and architectural monographs'], false, 4);

-- Projects
INSERT INTO public.projects (
    id, title, slug, subtitle, description, challenge, solution, results,
    client, year, role, category_id, tags, cover_image, live_url, behance_url, featured, sort_order
) VALUES
(
    '66666666-1111-1111-1111-111111111111',
    'AURA Botanicals',
    'aura-botanicals',
    'Sensory skincare brand identity and tactile packaging architecture',
    'A luxury organic skincare brand rooted in botanical purity and Scandinavian minimalism. We developed an authoritative identity balancing scientific clinical precision with organic warmth.',
    'AURA needed to stand out in an oversaturated clean beauty market without relying on generic green leaves or sterile white bottles.',
    'Designed a custom serif logotype with subtle leaf-stem ligatures, paired with embossed raw cardboard cartons, warm amber apothecary glass, and a monochromatic labeling hierarchy with orange holographic hot-stamp accents.',
    'Achieved 180% sales over target during launch month; featured in Wallpaper* and Monocle Design Directory.',
    'Aura Living Ltd.', 2025, 'Creative Director & Packaging Architect',
    '22222222-2222-2222-2222-222222222222',
    ARRAY['Branding', 'Packaging', 'Sustainable Materials', '3D Rendering', 'Art Direction'],
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    'https://aurabotanicals.example.com',
    'https://behance.net/gallery/aura-botanicals',
    true, 1
),
(
    '66666666-2222-2222-2222-222222222222',
    'KINETIK Sound Lab',
    'kinetik-sound-lab',
    'Sonic experimental acoustics brand identity & visual system',
    'An avant-garde acoustics laboratory creating high-end studio monitoring speakers. The visual identity translates sound frequencies into dynamic geometric grids and tactile print materials.',
    'Translating invisible sound engineering and psychoacoustics into a striking, contemporary physical and digital brand.',
    'Developed a mathematical grid identity where typography reacts to soundwave parameters. Designed matte black anodized aluminum badges, editorial manuals on heavy recycled paper, and a dynamic motion toolkit.',
    'Red Dot Design Award Winner 2024 for Brand Experience.',
    'Kinetik Acoustics GmbH', 2024, 'Lead Brand Identity Designer',
    '11111111-1111-1111-1111-111111111111',
    ARRAY['Visual Identity', 'Typography', 'Audio Branding', 'Editorial', 'Motion System'],
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    'https://kinetiksound.example.com',
    'https://behance.net/gallery/kinetik-sound-lab',
    true, 2
),
(
    '66666666-3333-3333-3333-333333333333',
    'TERRA Coffee Roasters',
    'terra-coffee-roasters',
    'Single-origin coffee packaging and retail environmental branding',
    'Comprehensive brand and packaging ecosystem for an artisanal specialty roaster sourcing beans directly from volcanic archipelagos.',
    'Communicating origin elevation, soil chemistry, and tasting notes in an intuitive, collector-worthy packaging system.',
    'Created a modular label matrix using color-coded topographic contours, blind letterpress embossing on cotton stock, and compostable aluminum-free pouches with custom orange pull-tabs.',
    'Exported to 12 countries; increased direct-to-consumer subscription retention by 42%.',
    'Terra Origin Holdings', 2024, 'Lead Packaging & Identity Designer',
    '22222222-2222-2222-2222-222222222222',
    ARRAY['Packaging', 'Print Collateral', 'Brand Guidelines', 'Typography', 'Illustration'],
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    'https://terracoffee.example.com',
    'https://behance.net/gallery/terra-coffee',
    true, 3
),
(
    '66666666-4444-4444-4444-444444444444',
    'Forma Monograph 08',
    'forma-monograph-08',
    'Contemporary architectural publication and typographic curation',
    'A 320-page hardcover publication documenting brutalist and tropical modernism architecture across Southeast Asia.',
    'Harmonizing high-contrast monochrome photography with dense architectural drawings and essays in three languages.',
    'Architected an 8-column layout grid system with exposed Swiss binding, black cloth cover with orange silkscreened spine, and dual paper stock transitions (gloss art paper for photography, uncoated cream for essays).',
    'Stock sold out in 3 weeks; archived in the Tokyo Typography Directors Club Annual 2024.',
    'Forma Architectural Collective', 2023, 'Editorial Designer & Art Director',
    '33333333-3333-3333-3333-333333333333',
    ARRAY['Editorial', 'Book Design', 'Swiss Typography', 'Print Production', 'Monograph'],
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    'https://formapress.example.com',
    'https://behance.net/gallery/forma-monograph-08',
    true, 4
),
(
    '66666666-5555-5555-5555-555555555555',
    'NOIR Fashion Lookbook 2025',
    'noir-fashion-lookbook',
    'Campaign art direction, model styling guidance & spatial catalogue',
    'Seasonal creative direction and lookbook for an avant-garde monochrome streetwear label based in Tokyo and Jakarta.',
    'Creating a cinematic narrative that felt neither too dystopian nor overly commercial.',
    'Structured a high-contrast editorial concept captured in industrial concrete brutalist spaces, offset by stark orange floodlit accents and minimalist typography.',
    'Generated 2.4M impressions across digital platforms and led to wholesale placement in Dover Street Market.',
    'Noir Studios International', 2025, 'Creative Director & Stylist Direction',
    '44444444-4444-4444-4444-444444444444',
    ARRAY['Art Direction', 'Photography Direction', 'Lookbook', 'Fashion', 'Print'],
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    'https://noir-studio.example.com',
    'https://behance.net/gallery/noir-fashion-lookbook',
    false, 5
),
(
    '66666666-6666-6666-6666-666666666666',
    'VORTEX Interactive Design System',
    'vortex-interactive-design-system',
    'Digital UI design system for generative audio visualizer',
    'A comprehensive UI/UX and visual system for a digital generative sound synthesizer and real-time visual canvas.',
    'Balancing complex DSP audio parameters with an ultra-clean, minimalist interface usable by both sound designers and novice musicians.',
    'Built an obsidian-black dark interface with neon orange cursor interactions, tactile rotary knob graphics, and vector waveform visualizers.',
    'Selected as Best Web App UI on Awwwards (Site of the Day nominee).',
    'Vortex Audio Works', 2025, 'Senior Product Designer & Art Director',
    '55555555-5555-5555-5555-555555555555',
    ARRAY['UI/UX Design', 'Design System', 'Figma', 'Interactive', 'Motion Graphics'],
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    'https://vortexaudio.example.com',
    'https://behance.net/gallery/vortex-interactive',
    false, 6
)
ON CONFLICT (slug) DO NOTHING;

-- Project Gallery Images
INSERT INTO public.project_images (project_id, image_url, caption, sort_order) VALUES
('66666666-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80', 'Amber glass dropper bottles with blind debossed tactile cotton labels', 1),
('66666666-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80', 'Sustainable outer shipping carton with orange security seal typography', 2),
('66666666-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80', 'Complete brand identity guidelines and color palette swatch books', 3),

('66666666-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80', 'Acoustic studio monitor housing with laser-etched typographic badge', 1),
('66666666-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80', 'Dynamic soundwave generative posters in silk-screen orange and black', 2),

('66666666-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80', 'Single-origin coffee bag series with metallic foil stamped lot numbers', 1),
('66666666-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', 'Tasting notes card system for specialty brew cafe locations', 2)
ON CONFLICT DO NOTHING;
