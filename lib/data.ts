export const siteConfig = {
  name: "Rivaldi",
  fullName: "Rivaldi",
  role: "Software Engineering Student",
  location: "Palembang, Indonesia",
  tagline:
    "Merancang arsitektur backend dan skema database yang tangguh untuk sistem skala nyata.",
  description:
    "Portofolio Rivaldi — spesialis Backend Developer dari Palembang dengan fokus pada ekosistem Laravel, perancangan ERD, dan struktur relasi data.",
  availableForProjects: true,
};

export const heroContent = {
  greeting: "Rivaldi",
  roles: ["Software Developer", "Backend Developer"],
  intro:
    " Merancang dan membangun arsitektur server, skema database, dan logika di balik layar.",
  annotations: [
    { label: "System Architecture", position: "top" },
    { label: "Backend Development", position: "right" },
    { label: "Database Relational", position: "bottom" },
    { label: "REST APIs & Logic", position: "left" },
  ],
};

export const aboutContent = {
  heading: "Tentang Saya",
  statement: "Backend Developer",
  paragraphs: [
    "Sebagai siswa Rekayasa Perangkat Lunak di SMKN 4 Palembang, fokus utama saya ada di balik layar.",
    "Berspesialisasi di ekosistem Laravel dan MySQL, saya terbiasa membangun sistem yang membutuhkan pengelolaan multi-role access control yang aman, integrasi Livewire, serta optimasi query.",
  ],
  currentlyLearning: [
    "Arsitektur backend & optimasi query database",
    "Pola otorisasi dan multi-role access control",
    "Perancangan dokumentasi teknis & ERD sebelum implementasi",
  ],
};

export const timeline = [
  {
    period: "2024 — Sekarang",
    role: "SMKN 4 Palembang",
    subtitle: "Sekolah Menengah Kejuruan — Rekayasa Perangkat Lunak",
    description:
      "Fokus mendalami rekayasa perangkat lunak dengan konsentrasi pada pengembangan logika backend, manajemen basis data relasional (MySQL), dan arsitektur aplikasi berbasis web.",
  },
  {
    period: "2024 — Sekarang",
    role: "Freelance Backend Developer",
    subtitle: "Independen",
    description:
      "Membangun infrastruktur server, skema database, dan API untuk kebutuhan klien dan proyek aplikasi logistik, sebagian besar menggunakan framework Laravel dan arsitektur MVC.",
  },
  {
    period: "2024 — 2025",
    role: "Student Developer",
    subtitle: "Proyek Akademik: Sistem Digital Sekolah",
    description:
      "Merancang alur data dan struktur backend untuk pengelolaan sistem informasi internal di sekolah sebagai bagian dari proyek pengembangan akademik.",
  },
  {
    period: "2026 — Sekarang",
    role: "Eksplorasi Backend",
    subtitle: "Rekayasa Perangkat Lunak / Teknologi",
    description:
      "Mengeksplorasi pembuatan layanan mikro sederhana, optimasi pemrosesan data, dan mendalami penyediaan API yang efisien.",
  },
];

export const journeyContent = {
  heading: "Perjalanan Saya",
  subheading: "Untuk sampai disini.",
  chapters: [
    {
      number: "01",
      title: "Ketertarikan pada Logika",
      body: "Dimulai dari rasa penasaran tentang bagaimana data disimpan dan diproses, hingga menemukan kenyamanan dalam memecahkan masalah logika server.",
    },
    {
      number: "02",
      title: "Membangun Fondasi",
      body: "Dengan mengerjakan proyek-proyek yang berfokus pada logika backend.",
    },
    {
      number: "03",
      title: "Memperdalam Arsitektur",
      body: "Kini, fokus saya murni pada penguatan backend.",
    },
  ],
};

export const techStack = {
  heading: "Teknologi",
  subheading: "Alat yang digunakan.",
  categories: [
    {
      name: "Backend Frameworks & Logic",
      items: ["Laravel", "PHP", "Livewire", "Node.js", "Express", "REST API"],
    },
    {
      name: "Database & Architecture",
      items: [
        "MySQL",
        "PostgreSQL",
        "Perancangan ERD",
        "Query Optimization",
        "Relational Database Design",
      ],
    },
    {
      name: "Security & Auth",
      items: [
        "Multi-Role Access Control",
        "Laravel Breeze / Jetstream",
        "Autentikasi & Otorisasi API",
      ],
    },
    {
      name: "Tools & Deployment",
      items: ["Git", "GitHub", "VS Code", "Postman", "cPanel"],
    },
  ],
  marquee: [
    "LARAVEL",
    "PHP",
    "MYSQL",
    "DATABASE ARCHITECTURE",
    "REST API",
    "LIVEWIRE",
    "QUERY OPTIMIZATION",
    "GIT",
  ],
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  image: string;
  featured?: boolean;
};
export const projects: Project[] = [
  {
    id: "magangku",
    number: "001",
    name: " MAGANGKU",
    category: "Sistem Manajemen Internal",
    year: "2026",
    description:
      "Sistem Informasi Manajemen PKL/Magang Siswa. Berfokus pada perancangan logika backend dengan 4 peran akses.",
    stack: ["Laravel", "MySQL", "Blade", "Multi-Role Auth"],
    image: "/projects/simagang-placeholder.svg",
    featured: true,
  },
  {
    id: "logistics-app",
    number: "002",
    name: "Aplikasi Logistik Terintegrasi",
    category: "SaaS & Manajemen Data",
    year: "2026",
    description:
      "Aplikasi berbasis web untuk manajemen logistik dan pool order.",
    stack: ["Laravel", "Livewire", "MySQL", "Tailwind CSS"],
    image: "/projects/logistics-os-shipment-tracking.png",
  },
  {
    id: "Eco_bank",
    number: "003",
    name: "Ecobank",
    category: "Pemrosesan Data",
    year: "2026",
    description: "Pemesanan jasa pengangkutan sampah.",
    stack: ["Laravel", "MySQL", "REST Logic"],
    image: "/projects/ecobank-login.png",
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "cert-simplilearn-fullstack",
    title: "Free Full Stack Developer Course",
    issuer: "Simplilearn SkillUp",
    image: "/certificates/simplilearn-fullstack-developer.png",
  },
  {
    id: "cert-freecodecamp-rwd",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    image: "/certificates/freecodecamp-responsive-web-design.png",
    credentialUrl:
      "https://freecodecamp.org/certification/painx_7/responsive-web-design",
  },
  {
    id: "cert-google-gemini",
    title: "Gemini Certified Student — K12",
    issuer: "Google for Education",
    image: "/certificates/google-gemini-certified-student.png",
  },
  {
    id: "cert-gcfglobal-windows",
    title: "Windows Basics",
    issuer: "GCFGlobal",
    image: "/certificates/gcfglobal-windows-basics.jpg",
    credentialUrl: "https://account.gcfglobal.org/verify/Smekvm_ttOzdpKBk",
  },
];

export const contactContent = {
  heading: "Mari Membangun Sesuatu.",
  statement:
    "Butuh bantuan merancang skema database, API, atau sistem backend?",
  subStatement: "Mari diskusikan alur datanya.",
  ctaLabel: "Mulai percakapan",
  email: "rivaldi.dev@gmail.com",
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  socials: [
    { label: "GitHub", href: "https://github.com/line-wdv/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vall7/" },
    { label: "Instagram", href: "https://www.instagram.com/rivaldi.sc/" },
  ],
};

export const navLinks = [
  { label: "Tentang", href: "#about" },
  { label: "Perjalanan", href: "#journey" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "Karya", href: "#work" },
  { label: "Sertifikat", href: "#certificates" },
  { label: "Kontak", href: "#contact" },
];
