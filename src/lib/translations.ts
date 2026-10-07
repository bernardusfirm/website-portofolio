export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    expertise: string;
    portfolio: string;
    experience: string;
    contact: string;
    cv: string;
    admin: string;
    talk: string;
  };
  hero: {
    badgeExp: string;
    badgeField: string;
    badgeProjects: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    tagline: string;
    ctaWorks: string;
    ctaCv: string;
    ctaAbout: string;
    statExpVal: string;
    statExpLabel: string;
    statProjVal: string;
    statProjLabel: string;
    statEndVal: string;
    statEndLabel: string;
    statToolsVal: string;
    statToolsLabel: string;
    artDirectorRole: string;
    sinceBadge: string;
  };
  about: {
    breadcrumb: string;
    headline: string;
    headlineHighlight: string;
    summary: string;
    downloadCv: string;
    viewPortfolio: string;
    basedIn: string;
    summaryStat: string;
    ethosBadge: string;
    ethosTitle: string;
    ethos1Title: string;
    ethos1Desc: string;
    ethos2Title: string;
    ethos2Desc: string;
    ethos3Title: string;
    ethos3Desc: string;
    ethos4Title: string;
    ethos4Desc: string;
    toolsBadge: string;
    toolsTitle: string;
    eduBadge: string;
    eduTitle: string;
    certBadge: string;
    certTitle: string;
  };
  cv: {
    breadcrumb: string;
    printBtn: string;
    downloadBtn: string;
    summaryTitle: string;
    workTitle: string;
    internTitle: string;
    eduTitle: string;
    certTitle: string;
    disciplinesTitle: string;
    toolsTitle: string;
    gpaLabel: string;
  };
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    availableBadge: string;
    directTitle: string;
    responseTime: string;
    emailLabel: string;
    phoneLabel: string;
    studioLabel: string;
    localTimeLabel: string;
    socialsTitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailInputLabel: string;
    disciplineLabel: string;
    budgetLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMsg: string;
    sendAnother: string;
  };
  footer: {
    availableBadge: string;
    ctaHeadline: string;
    ctaHighlight: string;
    ctaDesc: string;
    startProject: string;
    navTitle: string;
    socialTitle: string;
    rights: string;
  };
  expertise: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    description: string;
    scopeLabel: string;
    allServicesLink: string;
    softwareBadge: string;
    softwareTitle: string;
    softwareDesc: string;
    workflowBadge: string;
    workflowTitle: string;
    phaseOutputLabel: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      deliverables: string[];
      icon_name: string;
    }>;
    phases: Array<{
      step: string;
      title: string;
      desc: string;
      deliverables: string[];
    }>;
    software: Array<{
      name: string;
      role: string;
      badge: string;
    }>;
  };
  portfolio: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    allProjects: string;
    searchPlaceholder: string;
    viewAllCta: string;
    featuredBadge: string;
    featuredTitle: string;
    featuredHighlight: string;
    backBtn: string;
    clientLabel: string;
    yearLabel: string;
    roleLabel: string;
    challengeTitle: string;
    challengeSubtitle: string;
    approachTitle: string;
    approachSubtitle: string;
    outcomeTitle: string;
    outcomeSubtitle: string;
    zoomHint: string;
    visitSite: string;
    viewBehance: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      expertise: 'Keahlian',
      portfolio: 'Portofolio',
      experience: 'Pengalaman',
      contact: 'Kontak',
      cv: 'CV',
      admin: 'Admin',
      talk: 'Hubungi',
    },
    hero: {
      badgeExp: 'Pengalaman 5+ Tahun',
      badgeField: 'Digital Printing & Branding',
      badgeProjects: '500+ Proyek',
      headlinePart1: 'Visual Design &',
      headlineHighlight: 'Digital Printing',
      headlinePart2: 'Specialist.',
      tagline:
        'Berpengalaman 5+ tahun sebagai desainer grafis dan di bidang digital printing. Menangani proses desain end-to-end dari brief hingga final artwork siap produksi.',
      ctaWorks: 'Lihat Portofolio Desain',
      ctaCv: 'Download CV',
      ctaAbout: 'Tentang Saya →',
      statExpVal: '5+ Thn',
      statExpLabel: 'Pengalaman Kerja',
      statProjVal: '500+',
      statProjLabel: 'Proyek Selesai',
      statEndVal: 'End-to-End',
      statEndLabel: 'Brief s/d Siap Cetak',
      statToolsVal: '6+ Tools',
      statToolsLabel: 'Software & Video',
      artDirectorRole: 'Graphic Designer',
      sinceBadge: 'SEJAK 2022',
    },
    about: {
      breadcrumb: '// TENTANG BERNARDUS FIRMAN BAGASKARA',
      headline: 'Pengalaman',
      headlineHighlight: '5+ Tahun',
      summary:
        'Graphic Designer dengan pengalaman sejak 2022 dan telah mengerjakan 500+ proyek desain untuk kebutuhan branding, promosi, media sosial, dan digital printing. Terbiasa menangani proses desain secara end-to-end, mulai dari menerjemahkan brief menjadi konsep visual, menyusun layout, memilih tipografi dan elemen visual, melakukan revisi, hingga menghasilkan final artwork siap publikasi dan produksi. Menguasai Adobe Photoshop, Adobe Illustrator, CorelDRAW, Adobe Premiere Pro, Adobe After Effects, dan CapCut untuk mengembangkan desain statis maupun konten video. Berorientasi pada ketepatan brief, kualitas visual, konsistensi brand, dan penyelesaian pekerjaan sesuai deadline.',
      downloadCv: 'Lihat Curriculum Vitae',
      viewPortfolio: 'Lihat Portofolio Desain',
      basedIn: 'Trosobo, Sambi, Boyolali, Jawa Tengah',
      summaryStat: '500+ Proyek Branding, Media Sosial & Digital Printing',
      ethosBadge: '// PRINSIP KERJA',
      ethosTitle: 'Prinsip yang memandu setiap karya dan proses produksi.',
      ethos1Title: 'Ketepatan Brief',
      ethos1Desc:
        'Menerjemahkan ide dan kebutuhan klien secara akurat menjadi konsep visual fungsional yang menjawab tujuan komunikasi.',
      ethos2Title: 'Kualitas & Konsistensi Brand',
      ethos2Desc:
        'Menjaga harmoni warna, proporsi tipografi, dan identitas brand di seluruh media fisik maupun digital secara konsisten.',
      ethos3Title: 'Siap Cetak & Produksi',
      ethos3Desc:
        'Memahami spesifikasi teknis digital printing, separasi warna, resolusi, dan bleed sehingga final artwork siap cetak tanpa kendala teknis.',
      ethos4Title: 'Komitmen Deadline',
      ethos4Desc:
        'Bekerja secara disiplin dan terstruktur untuk menyelesaikan proyek secara tepat waktu dengan proses revisi yang efisien.',
      toolsBadge: '// PENGUASAAN SOFTWARE & TOOLS',
      toolsTitle: 'Software desain grafis, digital printing, dan video production.',
      eduBadge: '// PENDIDIKAN FORMAL',
      eduTitle: 'Latar belakang akademis dan pencapaian studi.',
      certBadge: '// SERTIFIKASI & PENGHARGAAN',
      certTitle: 'Sertifikasi kompetensi dan rekognisi desain.',
    },
    cv: {
      breadcrumb: '// CURRICULUM VITAE',
      printBtn: 'Cetak / Simpan PDF',
      downloadBtn: 'Download CV (PDF)',
      summaryTitle: '// Ringkasan Profil',
      workTitle: '// Pengalaman Kerja (Work Experience)',
      internTitle: '// Pengalaman Magang (Internship Experience)',
      eduTitle: '// Pendidikan (Education)',
      certTitle: '// Sertifikasi & Penghargaan (Certifications)',
      disciplinesTitle: '// Disiplin & Spesialisasi',
      toolsTitle: '// Penguasaan Software & Tools',
      gpaLabel: 'IPK / GPA',
    },
    contact: {
      badge: '// INISIASI KOLABORASI',
      title: 'Mari wujudkan desain visual dan kebutuhan',
      titleHighlight: 'cetak Anda.',
      subtitle:
        'Punya kebutuhan proyek branding, media sosial, video promosi, atau digital printing? Kirim pesan melalui formulir di bawah atau hubungi langsung.',
      availableBadge: 'Tersedia untuk Proyek Baru & Konsultasi',
      directTitle: 'Kontak Langsung',
      responseTime: 'Waktu respons: dalam waktu 24 jam.',
      emailLabel: 'Alamat Email',
      phoneLabel: 'Nomor WhatsApp / Telepon',
      studioLabel: 'Lokasi',
      localTimeLabel: 'Waktu Lokal Jakarta (WIB):',
      socialsTitle: 'Jejaring Kreatif',
      formTitle: 'Brief Proyek',
      formSubtitle: 'Isi detail kebutuhan Anda untuk mendapatkan estimasi dan solusi terbaik.',
      nameLabel: 'Nama Anda *',
      emailInputLabel: 'Email Anda *',
      disciplineLabel: 'Kategori Kebutuhan',
      budgetLabel: 'Estimasi Anggaran',
      messageLabel: 'Detail & Tujuan Proyek *',
      messagePlaceholder: 'Ceritakan tentang kebutuhan desain, deadline, dan tujuan visual Anda...',
      submitBtn: 'Kirim Brief Proyek',
      submittingBtn: 'Mengirimkan Brief...',
      successTitle: 'Pesan Terkirim',
      successMsg:
        'Terima kasih! Pesan Anda telah diterima oleh Bernardus Firman Bagaskara dan akan segera dihubungi.',
      sendAnother: 'Kirim pesan lain',
    },
    footer: {
      availableBadge: 'Tersedia untuk Proyek Desain Grafis & Digital Printing',
      ctaHeadline: 'Siap meningkatkan kualitas visual',
      ctaHighlight: 'brand & promosi Anda?',
      ctaDesc:
        'Dari konsep visual, materi promosi, konten media sosial, hingga file siap cetak digital printing berkualitas tinggi.',
      startProject: 'Mulai Diskusi Proyek',
      navTitle: 'Navigasi',
      socialTitle: 'Terhubung',
      rights: 'Hak cipta dilindungi undang-undang.',
    },
    expertise: {
      badge: '// KEAHLIAN & LAYANAN',
      titlePart1: 'Desain yang mengubah ide menjadi',
      titleHighlight: 'visual yang lebih kuat.',
      description:
        'Berfokus pada desain grafis, branding, dan kebutuhan visual untuk membantu bisnis tampil lebih profesional, konsisten, dan mudah dikenali.',
      scopeLabel: 'CAKUPAN',
      allServicesLink: 'Lihat Seluruh Layanan & Alur Kerja',
      softwareBadge: '// SOFTWARE & TOOLS',
      softwareTitle: 'Software yang Dikuasai',
      softwareDesc:
        'Menggunakan perangkat lunak standar industri untuk menghasilkan karya grafis berkualitas tinggi, presisi cetak, hingga konten visual bergerak.',
      workflowBadge: '// ALUR KERJA',
      workflowTitle: 'Proses kerja terarah dari brief hingga file siap produksi.',
      phaseOutputLabel: 'Output Tahapan',
      ctaTitle: 'Punya kebutuhan desain untuk bisnis atau produk Anda?',
      ctaDesc:
        'Mulai dari identitas visual, kemasan produk, materi promosi media sosial, hingga kebutuhan digital printing siap cetak, mari diskusikan bersama.',
      ctaBtn: 'Konsultasikan Kebutuhan Desain',
      cards: [
        {
          id: 'srv-1',
          title: 'Branding & Identitas Visual',
          description:
            'Membangun identitas visual yang konsisten agar sebuah brand terlihat lebih profesional, kuat, dan mudah diingat.',
          deliverables: [
            'Desain & Redesign Logo',
            'Identitas Visual Brand',
            'Pemilihan Warna & Tipografi',
            'Brand Guideline',
            'Stationery & Brand Collateral',
          ],
          icon_name: 'Palette',
        },
        {
          id: 'srv-2',
          title: 'Desain Packaging & Produk',
          description:
            'Membuat desain kemasan dan kebutuhan visual produk yang menarik, informatif, dan siap diproduksi.',
          deliverables: [
            'Desain Packaging Makanan & Minuman',
            'Label Produk & Sticker',
            'Desain Pouch, Box & Paper Bag',
            'Mockup Produk',
            'Artwork Siap Cetak',
          ],
          icon_name: 'Box',
        },
        {
          id: 'srv-3',
          title: 'Desain Media Sosial & Promosi',
          description:
            'Menciptakan visual promosi yang membantu bisnis menyampaikan produk, informasi, dan karakter brand dengan lebih menarik.',
          deliverables: [
            'Instagram Feed & Carousel',
            'Poster Promosi',
            'Menu & Katalog',
            'Banner & Materi Iklan',
            'Konten Visual Media Sosial',
          ],
          icon_name: 'Share2',
        },
        {
          id: 'srv-4',
          title: 'Desain Percetakan & Produksi',
          description:
            'Mempersiapkan desain dengan mempertimbangkan kebutuhan produksi, ukuran, material, hingga hasil cetak.',
          deliverables: [
            'Persiapan File Siap Cetak',
            'Brosur, Flyer & Banner',
            'Kartu Nama & Stationery',
            'Sticker & Merchandise',
            'Persiapan Material & Finishing',
          ],
          icon_name: 'Printer',
        },
        {
          id: 'srv-5',
          title: 'Video & Konten Visual',
          description:
            'Mengembangkan konten visual bergerak untuk kebutuhan promosi dan media digital.',
          deliverables: [
            'Editing Video',
            'Motion Graphic',
            'Video Promosi',
            'Reels & Konten Media Sosial',
            'Animasi Elemen Grafis',
          ],
          icon_name: 'Video',
        },
      ],
      phases: [
        {
          step: '01',
          title: 'Brief & Pemahaman Kebutuhan',
          desc: 'Mendengarkan tujuan proyek, karakter brand, target audiens, dan kebutuhan spesifikasi media yang akan digunakan.',
          deliverables: ['Brief Desain Terarah', 'Referensi Visual & Moodboard', 'Spesifikasi Ukuran & Media'],
        },
        {
          step: '02',
          title: 'Eksplorasi & Konsep Desain',
          desc: 'Mengembangkan ide menjadi alternatif konsep visual awal dengan memperhatikan komposisi, warna, dan hierarki tipografi.',
          deliverables: ['Alternatif Konsep Desain', 'Eksplorasi Warna & Tipografi', 'Layout Awal'],
        },
        {
          step: '03',
          title: 'Revisi & Penyempurnaan',
          desc: 'Menyesuaikan desain berdasarkan masukan untuk memastikan hasil akhir tepat sasaran dan siap digunakan.',
          deliverables: ['Penyempurnaan Detail & Layout', 'Mockup Tampilan Realistis', 'Uji Kontras & Keterbacaan'],
        },
        {
          step: '04',
          title: 'Final Artwork & Siap Produksi',
          desc: 'Menyiapkan berkas final dengan standar siap pakai dan siap cetak sesuai spesifikasi vendor atau kebutuhan digital.',
          deliverables: ['File Siap Cetak (PDF / CMYK)', 'File Master Vektor (AI / CDR / PSD)', 'Aset Digital Siap Pakai (PNG / JPG / MP4)'],
        },
      ],
      software: [
        { name: 'Adobe Photoshop', role: 'Desain Raster & Mockup', badge: 'Ps' },
        { name: 'Adobe Illustrator', role: 'Vektor & Identitas Brand', badge: 'Ai' },
        { name: 'CorelDRAW', role: 'Vektor & Cetak Digital', badge: 'CDR' },
        { name: 'Adobe Premiere Pro', role: 'Editing Video & Promosi', badge: 'Pr' },
        { name: 'Adobe After Effects', role: 'Motion Graphic & Animasi', badge: 'Ae' },
        { name: 'CapCut', role: 'Reels & Konten Medsos', badge: 'CC' },
      ],
    },
    portfolio: {
      badge: '// ARSIP & KARYA PILIHAN',
      title: 'Koleksi',
      titleHighlight: 'Portofolio Desain',
      description:
        'Koleksi karya desain logo & identitas visual, feeds media sosial, banner promosi, serta desain label & packaging untuk berbagai brand dan UMKM.',
      allProjects: 'Semua Proyek',
      searchPlaceholder: 'Cari proyek, tagar, klien...',
      viewAllCta: 'Lihat Semua Proyek',
      featuredBadge: '// 01 · KARYA PILIHAN',
      featuredTitle: 'Karya',
      featuredHighlight: 'Unggulan',
      backBtn: 'Kembali ke Koleksi Portofolio',
      clientLabel: 'Klien',
      yearLabel: 'Tahun',
      roleLabel: 'Peran Desain',
      challengeTitle: '// 01 Tantangan Desain',
      challengeSubtitle: 'Konteks & Kebutuhan',
      approachTitle: '// 02 Pendekatan Desain',
      approachSubtitle: 'Solusi & Eksplorasi Visual',
      outcomeTitle: '// 03 Hasil Akhir',
      outcomeSubtitle: 'Dampak & Implementasi',
      zoomHint: 'Klik gambar untuk memperbesar resolusi tinggi',
      visitSite: 'Kunjungi Website',
      viewBehance: 'Lihat di Behance',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      expertise: 'Expertise',
      portfolio: 'Portfolio',
      experience: 'Experience',
      contact: 'Contact',
      cv: 'CV',
      admin: 'Admin',
      talk: "Let's Talk",
    },
    hero: {
      badgeExp: '5+ Years Experience',
      badgeField: 'Digital Printing & Branding',
      badgeProjects: '500+ Projects',
      headlinePart1: 'Visual Design &',
      headlineHighlight: 'Digital Printing',
      headlinePart2: 'Specialist.',
      tagline:
        'Graphic Designer with hands-on experience since 2022, delivering 500+ projects across branding, promo materials, social media, and digital printing.',
      ctaWorks: 'Explore Design Works',
      ctaCv: 'Download CV',
      ctaAbout: 'About Me →',
      statExpVal: '5+ Yrs',
      statExpLabel: 'Work Experience',
      statProjVal: '500+',
      statProjLabel: 'Projects Delivered',
      statEndVal: 'End-to-End',
      statEndLabel: 'Brief to Final Print',
      statToolsVal: '6+ Tools',
      statToolsLabel: 'Design & Video Suite',
      artDirectorRole: 'Graphic Designer',
      sinceBadge: 'SINCE 2022',
    },
    about: {
      breadcrumb: '// ABOUT BERNARDUS FIRMAN BAGASKARA',
      headline: 'Experience of',
      headlineHighlight: '5+ Years',
      summary:
        'Graphic Designer with hands-on experience since 2022, working on 500+ design projects across branding, promotional materials, social media, and digital printing. Comfortable handling the full design process, from understanding client briefs and developing visual concepts to creating layouts, managing revisions, and delivering final artwork ready for print or digital use. Skilled in Adobe Photoshop, Adobe Illustrator, CorelDRAW, Adobe Premiere Pro, Adobe After Effects, and CapCut. Strong attention to detail with a focus on creating clear, visually appealing designs that meet client needs, maintain brand consistency, and are delivered on time.',
      downloadCv: 'View Curriculum Vitae',
      viewPortfolio: 'Explore Portfolio Works',
      basedIn: 'Trosobo, Sambi, Boyolali, Central Java, Indonesia',
      summaryStat: '500+ Branding, Social Media & Digital Printing Projects',
      ethosBadge: '// WORK PRINCIPLES',
      ethosTitle: 'Core principles guiding every artwork and production workflow.',
      ethos1Title: 'Brief Precision',
      ethos1Desc:
        'Accurately translating client ideas and requirements into functional visual concepts that achieve communication goals.',
      ethos2Title: 'Brand Consistency',
      ethos2Desc:
        'Maintaining harmonious color palettes, typographic hierarchy, and brand identity across physical and digital media.',
      ethos3Title: 'Production & Print Ready',
      ethos3Desc:
        'Deep technical understanding of digital printing parameters, color separations, bleed, and resolutions for zero-error manufacturing.',
      ethos4Title: 'Deadline Commitment',
      ethos4Desc:
        'Disciplined and structured workflow ensuring on-time delivery with streamlined, efficient revision cycles.',
      toolsBadge: '// SOFTWARE & TOOL ARSENAL',
      toolsTitle: 'Graphic design, digital printing, and video production software.',
      eduBadge: '// FORMAL EDUCATION',
      eduTitle: 'Academic background and educational achievements.',
      certBadge: '// CERTIFICATIONS & AWARDS',
      certTitle: 'Professional certifications and design recognitions.',
    },
    cv: {
      breadcrumb: '// CURRICULUM VITAE',
      printBtn: 'Print / Save PDF',
      downloadBtn: 'Download CV (PDF)',
      summaryTitle: '// Profile Summary',
      workTitle: '// Work Experience',
      internTitle: '// Internship Experience',
      eduTitle: '// Education',
      certTitle: '// Certifications & Awards',
      disciplinesTitle: '// Core Disciplines & Specialties',
      toolsTitle: '// Software & Technical Skills',
      gpaLabel: 'GPA',
    },
    contact: {
      badge: '// START COLLABORATION',
      title: "Let's bring your visual design and",
      titleHighlight: 'printing needs to life.',
      subtitle:
        'Need branding, social media content, promotional videos, or digital printing? Drop a message below or contact directly.',
      availableBadge: 'Available for Select Projects & Consultation',
      directTitle: 'Direct Channels',
      responseTime: 'Typical response time: within 24 hours.',
      emailLabel: 'Email Address',
      phoneLabel: 'WhatsApp / Phone Number',
      studioLabel: 'Location',
      localTimeLabel: 'Jakarta Local Time (WIB):',
      socialsTitle: 'Creative Networks',
      formTitle: 'Project Brief',
      formSubtitle: 'Provide project details below to receive a custom solution and estimate.',
      nameLabel: 'Your Name *',
      emailInputLabel: 'Your Email *',
      disciplineLabel: 'Project Category',
      budgetLabel: 'Estimated Budget',
      messageLabel: 'Project Goals & Scope *',
      messagePlaceholder: 'Tell us about your brand, deadlines, and design objectives...',
      submitBtn: 'Submit Project Brief',
      submittingBtn: 'Submitting Brief...',
      successTitle: 'Brief Transmitted',
      successMsg:
        'Thank you! Your message has been received by Bernardus Firman Bagaskara and will be answered shortly.',
      sendAnother: 'Send another message',
    },
    footer: {
      availableBadge: 'Available for Graphic Design & Digital Printing Commissions',
      ctaHeadline: 'Ready to elevate your',
      ctaHighlight: 'visual branding & promo presence?',
      ctaDesc:
        'From visual concepts and promo collateral to social media feeds and high-precision digital printing artwork.',
      startProject: 'Start a Project',
      navTitle: 'Navigation',
      socialTitle: 'Connect',
      rights: 'All rights reserved.',
    },
    expertise: {
      badge: '// EXPERTISE & SERVICES',
      titlePart1: 'Design that transforms ideas into',
      titleHighlight: 'compelling visual impact.',
      description:
        'Focused on graphic design, branding, and visual assets to help businesses appear more professional, consistent, and memorable.',
      scopeLabel: 'SCOPE OF SERVICES',
      allServicesLink: 'View All Services & Workflow',
      softwareBadge: '// TOOLS & SOFTWARE',
      softwareTitle: 'Mastered Software & Tools',
      softwareDesc:
        'Utilizing industry-standard software to produce high-quality graphic assets, print precision, and motion visuals.',
      workflowBadge: '// WORKFLOW',
      workflowTitle: 'Structured workflow from initial brief to production-ready delivery.',
      phaseOutputLabel: 'Phase Deliverables',
      ctaTitle: 'Have a design project for your business or product?',
      ctaDesc:
        'From brand identities and product packaging to social media promotions and digital printing files, let’s talk.',
      ctaBtn: 'Consult Your Design Needs',
      cards: [
        {
          id: 'srv-1',
          title: 'Branding & Visual Identity',
          description:
            'Building consistent visual identities so a brand looks professional, distinctive, and memorable.',
          deliverables: [
            'Logo Design & Redesign',
            'Brand Visual Identity',
            'Color Palette & Typography',
            'Brand Guidelines',
            'Stationery & Brand Collateral',
          ],
          icon_name: 'Palette',
        },
        {
          id: 'srv-2',
          title: 'Packaging & Product Design',
          description:
            'Crafting attractive, informative, and production-ready packaging and product visual assets.',
          deliverables: [
            'Food & Beverage Packaging',
            'Product Labels & Stickers',
            'Pouch, Box & Paper Bag Design',
            'Product Mockups',
            'Production-Ready Artwork',
          ],
          icon_name: 'Box',
        },
        {
          id: 'srv-3',
          title: 'Social Media & Promotional Design',
          description:
            'Creating promotional visuals that help businesses convey products, information, and brand character engagingly.',
          deliverables: [
            'Instagram Feeds & Carousels',
            'Promotional Posters',
            'Menus & Catalogs',
            'Banners & Ad Creatives',
            'Social Media Visual Content',
          ],
          icon_name: 'Share2',
        },
        {
          id: 'srv-4',
          title: 'Print & Production Design',
          description:
            'Preparing designs tailored to production needs, sizing, materials, and print output.',
          deliverables: [
            'Pre-Press & Print-Ready Files',
            'Brochures, Flyers & Banners',
            'Business Cards & Stationery',
            'Stickers & Merchandise',
            'Material & Finishing Preparation',
          ],
          icon_name: 'Printer',
        },
        {
          id: 'srv-5',
          title: 'Video & Visual Content',
          description:
            'Developing motion visual content for promotional and digital media needs.',
          deliverables: [
            'Video Editing',
            'Motion Graphics',
            'Promotional Videos',
            'Reels & Social Video',
            'Graphic Element Animation',
          ],
          icon_name: 'Video',
        },
      ],
      phases: [
        {
          step: '01',
          title: 'Brief & Requirement Discovery',
          desc: 'Listening to project goals, brand personality, target audience, and media specifications to ensure accurate creative direction.',
          deliverables: ['Targeted Design Brief', 'Visual References & Moodboards', 'Size & Media Specifications'],
        },
        {
          step: '02',
          title: 'Exploration & Design Concepts',
          desc: 'Developing ideas into initial visual alternatives, focusing on spatial composition, color harmony, and typographic hierarchy.',
          deliverables: ['Alternative Design Concepts', 'Color & Typography Studies', 'Initial Layouts'],
        },
        {
          step: '03',
          title: 'Revision & Refinement',
          desc: 'Fine-tuning details based on collaborative feedback to guarantee the outcome meets goals and excels on physical or digital media.',
          deliverables: ['Layout & Detail Refinements', 'Realistic Presentation Mockups', 'Contrast & Legibility Checks'],
        },
        {
          step: '04',
          title: 'Final Artwork & Production Handoff',
          desc: 'Preparing final industry-standard files ready for printing (CMYK / high-res) or digital publishing across platforms.',
          deliverables: ['Print-Ready Files (PDF / CMYK)', 'Master Vector Files (AI / CDR / PSD)', 'Ready-to-Use Digital Assets (PNG / JPG / MP4)'],
        },
      ],
      software: [
        { name: 'Adobe Photoshop', role: 'Raster Design & Mockups', badge: 'Ps' },
        { name: 'Adobe Illustrator', role: 'Vector & Brand Identity', badge: 'Ai' },
        { name: 'CorelDRAW', role: 'Vector & Digital Printing', badge: 'CDR' },
        { name: 'Adobe Premiere Pro', role: 'Video Editing & Promo', badge: 'Pr' },
        { name: 'Adobe After Effects', role: 'Motion Graphics & Animation', badge: 'Ae' },
        { name: 'CapCut', role: 'Reels & Social Video', badge: 'CC' },
      ],
    },
    portfolio: {
      badge: '// ARCHIVE & SELECTED WORKS',
      title: 'Portfolio',
      titleHighlight: 'Showcase',
      description:
        'Selected collection of brand identities, logos, social media feeds, promotional banners, and product label & packaging designs.',
      allProjects: 'All Projects',
      searchPlaceholder: 'Search projects, tags, clients...',
      viewAllCta: 'View All Projects',
      featuredBadge: '// 01 · CURATED SELECTION',
      featuredTitle: 'Featured',
      featuredHighlight: 'Works',
      backBtn: 'Back to Selected Works',
      clientLabel: 'Client',
      yearLabel: 'Year',
      roleLabel: 'Design Role',
      challengeTitle: '// 01 The Challenge',
      challengeSubtitle: 'Context & Requirements',
      approachTitle: '// 02 The Approach',
      approachSubtitle: 'Design Solution & Exploration',
      outcomeTitle: '// 03 The Outcome',
      outcomeSubtitle: 'Impact & Implementation',
      zoomHint: 'Click to expand high-res preview',
      visitSite: 'Visit Website',
      viewBehance: 'View on Behance',
    },
  },
};

export function getCategoryDisplayName(catIdOrName: string, lang: Language): string {
  const mapEn: Record<string, string> = {
    'cat-desain-logo': 'Logo Design',
    'desain-logo': 'Logo Design',
    'Desain Logo': 'Logo Design',
    'cat-desain-feeds': 'Social Media Feeds',
    'desain-feeds': 'Social Media Feeds',
    'Desain Feeds': 'Social Media Feeds',
    'cat-desain-banner': 'Promotional Banners',
    'desain-banner': 'Promotional Banners',
    'Desain Banner': 'Promotional Banners',
    'cat-desain-label-packaging': 'Labels & Packaging',
    'desain-label-packaging': 'Labels & Packaging',
    'Desain Label & Packaging': 'Labels & Packaging',
  };
  const mapId: Record<string, string> = {
    'cat-desain-logo': 'Desain Logo',
    'desain-logo': 'Desain Logo',
    'Logo Design': 'Desain Logo',
    'cat-desain-feeds': 'Desain Feeds',
    'desain-feeds': 'Desain Feeds',
    'Social Media Feeds': 'Desain Feeds',
    'cat-desain-banner': 'Desain Banner',
    'desain-banner': 'Desain Banner',
    'Promotional Banners': 'Desain Banner',
    'cat-desain-label-packaging': 'Desain Label & Packaging',
    'desain-label-packaging': 'Desain Label & Packaging',
    'Labels & Packaging': 'Desain Label & Packaging',
  };
  if (lang === 'en') {
    return mapEn[catIdOrName] || catIdOrName;
  }
  return mapId[catIdOrName] || catIdOrName;
}

// Exact CV Experience Data from user's document
export const cvData = {
  name: 'BERNARDUS FIRMAN BAGASKARA',
  title: 'GRAPHIC DESIGNER',
  phone: '0821-3560-2758',
  phoneInternational: '+62 821-3560-2758',
  email: 'bernardusfirman@gmail.com',
  location: 'Trosobo, Sambi, Boyolali',
  summary: {
    en: 'Graphic Designer with hands-on experience since 2022, working on 500+ design projects across branding, promotional materials, social media, and digital printing. Comfortable handling the full design process, from understanding client briefs and developing visual concepts to creating layouts, managing revisions, and delivering final artwork ready for print or digital use. Skilled in Adobe Photoshop, Adobe Illustrator, CorelDRAW, Adobe Premiere Pro, Adobe After Effects, and CapCut. Strong attention to detail with a focus on creating clear, visually appealing designs that meet client needs, maintain brand consistency, and are delivered on time.',
    id: 'Graphic Designer dengan pengalaman sejak 2022 dan telah mengerjakan 500+ proyek desain untuk kebutuhan branding, promosi, media sosial, dan digital printing. Terbiasa menangani proses desain secara end-to-end, mulai dari menerjemahkan brief menjadi konsep visual, menyusun layout, memilih tipografi dan elemen visual, melakukan revisi, hingga menghasilkan final artwork siap publikasi dan produksi. Menguasai Adobe Photoshop, Adobe Illustrator, CorelDRAW, Adobe Premiere Pro, Adobe After Effects, dan CapCut untuk mengembangkan desain statis maupun konten video. Berorientasi pada ketepatan brief, kualitas visual, konsistensi brand, dan penyelesaian pekerjaan sesuai deadline.',
  },
  workExperience: [
    {
      role: {
        en: 'Freelance Graphic Designer',
        id: 'Freelance Graphic Designer',
      },
      company: 'Fastwork',
      period: '2022 – Present',
      bullets: {
        en: [
          'Work on various graphic design projects based on individual client briefs and requirements.',
          'Manage the design process from concept development and revisions to final delivery.',
          'Communicate directly with clients to understand their needs and deliver designs that match their expectations.',
        ],
        id: [
          'Mengerjakan berbagai proyek desain grafis berdasarkan brief dan kebutuhan spesifik klien.',
          'Mengelola seluruh proses desain mulai dari pengembangan konsep hingga revisi dan serah terima akhir.',
          'Berkomunikasi langsung dengan klien untuk memahami kebutuhan dan menghasilkan desain sesuai ekspektasi.',
        ],
      },
    },
    {
      role: {
        en: 'Freelance Graphic Designer',
        id: 'Freelance Graphic Designer',
      },
      company: 'Ruang Pro Digital Printing',
      period: '2023 – 2025',
      bullets: {
        en: [
          'Created branding, promotional, and print designs based on client needs.',
          'Developed visual concepts and layouts from initial briefs through to final artwork.',
          'Prepared production-ready files and ensured accurate sizing and print specifications.',
        ],
        id: [
          'Membuat desain branding, promosi, dan materi cetak sesuai kebutuhan klien.',
          'Mengembangkan konsep visual dan layout dari brief awal hingga final artwork.',
          'Menyiapkan file siap produksi (print-ready) dengan ukuran dan spesifikasi cetak yang akurat.',
        ],
      },
    },
    {
      role: {
        en: 'Graphic Designer & Production',
        id: 'Graphic Designer & Production',
      },
      company: 'Rony Jaya Digital Printing',
      period: '2022 – 2023',
      bullets: {
        en: [
          'Created branding, logo, and promotional designs based on client requirements.',
          'Turned client briefs into practical and visually engaging design concepts.',
          'Handled client communication, revisions, and final artwork preparation.',
          'Supported the production process to ensure designs were printed accurately and met quality standards.',
        ],
        id: [
          'Membuat desain branding, logo, dan materi promosi sesuai kebutuhan klien.',
          'Mengubah brief klien menjadi konsep desain yang praktis, aplikatif, dan menarik secara visual.',
          'Menangani komunikasi dengan klien, revisi desain, serta penyiapan artwork final.',
          'Mendukung proses produksi untuk memastikan hasil cetak akurat dan memenuhi standar mutu.',
        ],
      },
    },
  ],
  internshipExperience: [
    {
      role: {
        en: 'Sales & Operations Intern',
        id: 'Sales & Operations Intern',
      },
      company: 'PT. Asset Ran Investama',
      period: '2026',
      bullets: {
        en: [
          'Assisted with analyzing plant nutritional needs to support healthy growth and crop quality.',
          'Supported Open Farm sales activities through presentations and follow-ups with potential investors.',
          'Maintained investor data and handled sales administration and documentation.',
        ],
        id: [
          'Membantu analisis kebutuhan nutrisi tanaman untuk mendukung pertumbuhan optimal dan kualitas panen.',
          'Mendukung aktivitas penjualan Open Farm melalui presentasi dan follow-up bersama calon investor.',
          'Mengelola database investor serta menangani administrasi dan dokumentasi penjualan.',
        ],
      },
    },
  ],
  education: {
    institution: 'Universitas Sebelas Maret',
    degree: {
      en: 'Diploma III in Agribusiness',
      id: 'Diploma III Agribisnis',
    },
    period: '2023 – 2026',
    gpa: '3.86 / 4.00',
  },
  certifications: [
    {
      title: 'Best Participant – Garden Design',
      issuer: 'Ikatan Arsitektur Lanskap Indonesia',
    },
    {
      title: 'Plant Seed Production',
      issuer: 'Professional Certification Institute (LSP)',
    },
  ],
  tools: [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'CorelDRAW',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'CapCut',
  ],
};
