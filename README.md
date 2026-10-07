# Bernardusfirman — Senior Graphic Designer & Art Director Portfolio

A modern, high-performance, and minimalist personal portfolio website created for **Bernardusfirman**, a Senior Graphic Designer & Art Director with **8+ years of professional practice**.

Built with a monochrome aesthetic, Swiss modernist typographic rhythm, and bold electric orange accents (`#ff5e1e`), featuring a public showcase and an **authenticated Admin Dashboard** powered by Supabase.

---

## 🌟 Key Features

### Public Website
- **Home (`/`)**: High-impact editorial hero section, availability status pill, 8+ years experience credentials, floating quick stats, client marquee ticker, curated bento projects grid, core disciplines overview, and career trajectory teaser.
- **About (`/about`)**: Narrative of Bernardus's 8-year evolution, 4 design philosophy pillars (Typographic Rigor, Tactile Materiality, Modernist Reductive Logic, Systems Over Silos), full profile photo, and comprehensive software/tool proficiency matrix.
- **Disciplines & Services (`/expertise`)**: Breakdown of 5 core creative offerings (Brand Identity Systems, Packaging Design, Editorial & Book Design, Creative Art Direction, Digital & UI/UX), key deliverables checklist, and a 4-phase creative process methodology.
- **Portfolio Gallery (`/portfolio`)**: Multi-category filter pills, live search bar (queries titles, clients, and tags), dynamic project count, and a dual-view switcher (Bento Grid vs. Editorial List).
- **Portfolio Detail (`/portfolio/[slug]`)**: Case study presentation with client, year, role, tags, live/Behance links, three-stage challenge/solution/results analysis, high-res multi-image gallery with an interactive fullscreen Lightbox viewer, and previous/next project navigation.
- **Experience (`/experience`)**: Chronological 8-year career timeline (2016–Present) detailing positions, design studios, and specific milestones, alongside awards won (Red Dot Design Award, Tokyo TDC, DFA Bronze) and trusted client list.
- **Contact (`/contact`)**: Project inquiry brief form with budget and discipline selection, live Jakarta (GMT+7) local time clock, click-to-copy email, phone, studio location, and creative network links.
- **Download CV (`/cv`)**: Dedicated curriculum vitae page with a clean printable layout (`window.print()`) and direct PDF download button.

### Admin Dashboard (`/admin`)
- **Supabase Authentication**: Secure login at `/admin/login` using Supabase Auth with an instant **1-Click Demo Access** button for local development and review.
- **Overview Analytics**: Project counts, featured items, active categories, and total contact briefs received.
- **Profile & Bio Management**: Real-time editor for full name, title, tagline, biography, years of experience, avatar photo upload, and CV PDF upload.
- **Project Management (Full CRUD)**:
  - Create and edit projects with custom slugs, subtitles, client, year, role, and tags.
  - Featured on homepage toggle and custom sort order index.
  - Multi-image gallery uploader with caption support.
  - Structured fields for Context/Challenge, Design Solution, and Measurable Results.
- **Category & Discipline Management**: Add, update, and reorder filter categories.
- **Career Experience Management**: Add, update, or remove job positions and key accomplishments.
- **Client Inquiries & Settings**: View messages submitted through the public contact form, update site title, brand accent color hex, and social media URLs (Behance, Dribbble, Instagram, LinkedIn).
- **Instant Reactive Sync**: Updates made in the dashboard immediately reflect on public pages.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth (Email & Password)
- **Storage**: Supabase Storage (`portfolio-assets` bucket) with file size (10MB) and MIME type validation
- **Deployment**: Vercel

---

## 📁 Project Structure

```
d:/portofolio/
├── public/                     # Static assets (CV PDF, icons, public assets)
│   └── cv-bernardusfirman.pdf
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── about/page.tsx      # About page
│   │   ├── admin/
│   │   │   ├── login/page.tsx  # Admin login
│   │   │   └── page.tsx        # Comprehensive Admin Dashboard
│   │   ├── contact/page.tsx    # Contact inquiry & live timezone
│   │   ├── cv/page.tsx         # Curriculum Vitae & print layout
│   │   ├── experience/page.tsx # 8Y career timeline & awards
│   │   ├── expertise/page.tsx  # Services & 4-phase process
│   │   ├── portfolio/
│   │   │   ├── [slug]/page.tsx # Project case study & lightbox
│   │   │   └── page.tsx        # Portfolio gallery & filters
│   │   ├── globals.css         # Dark theme & electric orange styling
│   │   ├── layout.tsx          # Root layout & SEO meta tags
│   │   ├── page.tsx            # Homepage
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── components/
│   │   ├── home/               # HeroSection, FeaturedWorks, Disciplines, etc.
│   │   └── layout/             # Navbar, Footer
│   ├── context/
│   │   └── PortfolioContext.tsx# Reactive state management
│   └── lib/
│       ├── data-service.ts     # Supabase DB/Storage sync & resilient local fallback
│       ├── initial-data.ts     # Rich seed data for Bernardusfirman
│       ├── types.ts            # TypeScript interfaces
│       └── supabase/
│           ├── client.ts       # Browser Supabase client
│           └── server.ts       # Server-side Supabase client
├── supabase/
│   └── schema.sql              # Complete PostgreSQL schema, RLS policies & seed data
├── .env.example                # Environment variables template
├── .env.local                  # Local environment file
├── next.config.mjs             # Next.js configuration (Remote images)
├── tailwind.config.ts          # Tailwind theme & color tokens
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18.17+ or v20+ recommended)
- **npm**, **yarn**, or **pnpm**

### 2. Installation
```bash
# Clone or navigate to the directory
cd d:/portofolio

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

For immediate offline/local demonstration, the application includes a **resilient local fallback layer** that allows full viewing, editing, and photo uploading without requiring live Supabase credentials.

To enable live cloud persistence, fill in your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Setup & Row Level Security (RLS)

1. Create a new project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository, paste its contents into the editor, and click **Run**.
   - This sets up the `profiles`, `categories`, `projects`, `project_images`, `experiences`, `services`, `site_settings`, and `contact_messages` tables.
   - It enables **Row Level Security (RLS)** with public read access and authenticated admin write/update/delete permissions.
   - It populates the database with Bernardusfirman's realistic graphic design portfolio and case studies.
4. Set up the **Storage Bucket**:
   - Go to **Storage** > **Create new bucket**.
   - Name it `portfolio-assets` and enable **Public bucket**.
   - Under bucket policies, allow `SELECT` for public, and `INSERT`, `UPDATE`, `DELETE` for authenticated users.

---

## 🔐 Admin Authentication

1. Navigate to `/admin/login`.
2. **Standard Auth**: Sign in with an email and password configured in Supabase Auth.
3. **Demo Quick Access**: Click the **"One-Click Instant Admin Access (Demo)"** button to enter the dashboard immediately during local evaluation.

---

## ☁️ Deployment to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your custom domain or `https://your-app.vercel.app`)
5. Click **Deploy**. Vercel will automatically build the static and dynamic pages.

---

## 📄 License & Credits
Designed and engineered for **Bernardusfirman**.
Designed with Swiss modernist typographic principles and modern web standards.
