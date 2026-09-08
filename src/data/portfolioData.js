export const PERSONAL_INFO = {
  name: "Muhammad Kafka Lyandra Pratama",
  nickname: "Kafka",
  monogram: "K",
  title: "Software Engineer & Backend Developer",
  school: "SMK Budi Bakti Ciwidey",
  major: "Pengembangan Perangkat Lunak dan Gim (PPLG / RPL)",
  gradYear: "2024 – 2027 (Kelas 12, Ketua Kelas)",
  status: "Available for Software Engineering & Backend Roles / Prakerin",
  location: "Ciwidey, Kab. Bandung, Indonesia (WIB / UTC+7)",
  email: "kafkalyandra@gmail.com",
  instagram: "https://www.instagram.com/mkyandra_/",
  instagramHandle: "@mkyandra_",
  github: "https://github.com/kffLyan",
  linkedin: "https://www.linkedin.com/in/muhammad-kafka-lyandra-pratama-357153394/",
  leadership: "Ketua Kelas XII RPL & Wakil Ketua Komisi D MPK",
  heroHeadline: [
    "Halo, Saya Kafka.",
    "Backend & Software Engineer."
  ],
  heroBio: "Siswa SMK Budi Bakti Ciwidey jurusan PPLG / RPL yang berfokus pada rekayasa backend, arsitektur database relasional, keamanan multi-role RBAC & anti-IDOR, serta pengembangan aplikasi modern menggunakan Laravel, Next.js, dan cloud PostgreSQL.",
  philosophy: "Rekayasa perangkat lunak sejati bertumpu pada keandalan sistem, keamanan zero-trust, dan struktur backend yang kokoh. Saya membangun API yang bersih, skema database teroptimasi, dan logika server yang tahan uji untuk kebutuhan produksi nyata.",
  profileDetails: {
    fullName: "Muhammad Kafka Lyandra Pratama",
    nickname: "Kafka",
    school: "SMK Budi Bakti Ciwidey",
    major: "Pengembangan Perangkat Lunak dan Gim (PPLG / RPL)",
    classGrade: "Kelas XII (Tahun Ajaran 2024 – 2027)",
    roles: [
      "Ketua Kelas XII RPL",
      "Wakil Ketua Komisi D MPK SMK Budi Bakti Ciwidey"
    ],
    status: "Terbuka untuk Prakerin / Magang Industri & Kolaborasi Software Engineering",
    location: "Ciwidey, Kab. Bandung, Jawa Barat (WIB / UTC+7)",
    focus: "Backend Architecture, RESTful API, Database Design, RBAC & Anti-IDOR Security",
    coreStacks: ["Laravel (PHP)", "Next.js 16", "PostgreSQL (Neon)", "MySQL", "Prisma ORM", "TypeScript", "C++", "Python"],
    achievements: [
      "Juara 2 LKS Pemrograman C++ Tingkat Sekolah (Aplikasi Kasir Berbasis Logika)",
      "Programmer IoT Teaching Factory (TEFA) Smart Parking bersama Mitra Industri",
      "Arsitek Backend SI REMED v2 (Zero IDOR) & E-Voting OSIS v2 (Token Kriptografis)"
    ]
  }
};

export const METRICS = [
  {
    value: 6,
    suffix: "+",
    label: "Production Repos",
    detail: "Backend APIs, Database Architectures & IoT Systems"
  },
  {
    value: 2,
    suffix: "nd",
    label: "LKS C++ Winner",
    detail: "2nd Place in Algorithmic Logic & Cashier Software Engineering at BBC"
  },
  {
    value: 100,
    suffix: "%",
    label: "Type-Safe & RBAC",
    detail: "Zero-trust server-side defense, anti-IDOR & strict session security"
  }
];

export const PROJECTS = [
  {
    id: "01",
    title: "SI REMED v2",
    category: "Academic Platform & Exam Remedial Coordination",
    year: "2026",
    role: "Sole Backend & Fullstack Engineer",
    description: "Centralized remedial examination platform with multi-role RBAC, server-side IDOR defense, and isolated dictionary-state feedback loops preventing UI cross-talk.",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "NextAuth v5", "Zod", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    metric: "Multi-Role RBAC / Zero IDOR",
    liveUrl: "https://si-remed-v2.vercel.app/",
    githubUrl: "https://github.com/kffLyan/SI-REMED-v2",
    featured: true,
    hasCaseStudy: true,
    architectureData: {
      pipeline: [
        { step: "Client Layer", detail: "Next.js 16 App Router + Tailwind CSS + Isolated Dictionary Form States" },
        { step: "Session & RBAC", detail: "NextAuth v5 (AUTH_TRUST_HOST + HTTPS __Secure- Cookies) with Role Checks" },
        { step: "API Gate & Zod", detail: "Server Actions + Strict Zod Payload Validation + Server-Side Deadline Comparison" },
        { step: "Data & ORM", detail: "Prisma Client (Deep Includes + P2002 Unique Handler) on Neon Serverless PostgreSQL" }
      ],
      rbacRoles: [
        { role: "Admin", access: "Full CRUD on Teachers, Students, Classes, Majors & Master Course Data." },
        { role: "Guru", access: "Create Targeted Tasks (targetStudentIds), Review/Approve Submissions, Isolated Feedback." },
        { role: "Siswa", access: "Restricted to Personal Targeted Tasks. Anti-IDOR enforced: cannot submit unassigned task IDs." }
      ],
      securitySpecs: [
        "Anti-IDOR Defense: Server verifies session.user.id in targetStudentIds before commit",
        "Anti-Bounce Session: Reactive useEffect with redirect:false on NextAuth signIn",
        "Zero-Leak State: Keyed dictionary Record<string, string> prevents feedback text bleeding"
      ],
      telemetry: {
        lighthouse: 99,
        securityScore: "A+",
        uiLatency: "4ms",
        typeSafety: "100%"
      }
    }
  },
  {
    id: "02",
    title: "OSIS E-Voting Platform v2",
    category: "Democratic Voting & Expiring Token Security",
    year: "2026",
    role: "Backend & Fullstack Developer (Tim Sangkuriang)",
    description: "Digital student council voting platform featuring single-use expiring cryptographic token logic to prevent ballot duplication and guarantee vote integrity.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop",
    metric: "Single-Use Expiring Tokens",
    liveUrl: "https://github.com/kffLyan/osis-voting",
    githubUrl: "https://github.com/kffLyan/osis-voting",
    featured: true,
    architectureData: {
      pipeline: [
        { step: "Voter Client", detail: "Next.js + Tailwind CSS with live real-time token state listener" },
        { step: "Cryptographic Gate", detail: "Single-use 6-character entropy token generation with SHA-256 seed" },
        { step: "Supabase Edge Rule", detail: "Atomic transaction checking token expiration timestamp <= 60s" },
        { step: "Ballot Ledger", detail: "Vote incremented and token permanently purged/marked 403 Forbidden" }
      ],
      rbacRoles: [
        { role: "Panitia OSIS", access: "Generate token batches, monitor real-time ballot tally percentage." },
        { role: "Pemilih (Siswa)", access: "Single-use token consumption. Re-voting blocked by irreversible 403 state." }
      ],
      securitySpecs: [
        "Single-Use Invalidation: Immediate token deletion upon vote receipt",
        "60s Ephemeral Window: Prevents token harvesting and delayed ballot hijacking",
        "Double-Vote Protection: Zero client trust; verification performed inside Edge Function"
      ],
      telemetry: {
        lighthouse: 98,
        securityScore: "A+",
        uiLatency: "8ms",
        typeSafety: "100%"
      }
    }
  },
  {
    id: "03",
    title: "SI REMED v1 (Monolith)",
    category: "Relational Database & Academic Workflow",
    year: "2025",
    role: "Solo Backend & Fullstack Developer",
    description: "First-generation remedial management system engineered using clean MVC architecture, normalized MySQL schema, and reactive Alpine.js UI islands.",
    tags: ["Laravel", "PHP", "MySQL", "Alpine.js", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    metric: "Normalized Relational DB",
    liveUrl: "https://github.com/kffLyan/Si-REMED-v1",
    githubUrl: "https://github.com/kffLyan/Si-REMED-v1"
  },
  {
    id: "04",
    title: "TEFA Smart Parking IoT",
    category: "Embedded Systems & Hardware Telemetry",
    year: "2025",
    role: "IoT Programmer (Teaching Factory BBC x Mitra Industri)",
    description: "Automated real-time parking space monitoring system integrating ultrasonic sensor logic, hardware relays, and automated occupancy telemetry.",
    tags: ["Embedded C++", "Microcontroller", "Ultrasonic Sensors", "Relay Control"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    metric: "Hardware Telemetry Loop",
    liveUrl: null,
    githubUrl: "https://github.com/kffLyan"
  },
  {
    id: "05",
    title: "HandTracking Computer Vision",
    category: "Human-Computer Interaction & AI Vision",
    year: "2025",
    role: "Solo Systems Developer",
    description: "Real-time hand landmark detection and gesture tracking software built using OpenCV and MediaPipe algorithms for interactive touchless input.",
    tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    metric: "Real-Time 30+ FPS Tracking",
    liveUrl: "https://github.com/kffLyan/HandTracking",
    githubUrl: "https://github.com/kffLyan/HandTracking"
  },
  {
    id: "06",
    title: "Landing Page SPMB BBC",
    category: "School Admissions & High Conversion Web",
    year: "2025",
    role: "Fullstack Developer (Team)",
    description: "Interactive school admission landing page designed to communicate vocational programs with high conversion CTA flows and responsive architecture.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    metric: "High Conversion CTA Flow",
    liveUrl: "https://github.com/kffLyan/Landing-Page-SPMB",
    githubUrl: "https://github.com/kffLyan/Landing-Page-SPMB"
  }
];

export const CERTIFICATES = [
  {
    id: "cert-1",
    title: "Juara 2 LKS Pemrograman C++",
    issuer: "SMK Budi Bakti Ciwidey",
    date: "Tahun 2024",
    credentialId: "LKS-BBC-CPP-2024",
    url: "https://github.com/kffLyan",
    description: "Meraih Juara 2 dalam Lomba Kompetensi Siswa (LKS) tingkat sekolah bidang pemrograman, merancang aplikasi kasir berbasis logika dan algoritma C++ murni.",
    skills: ["Algoritma C++", "Logika Kasir & Perhitungan", "Arsitektur Konsol"]
  },
  {
    id: "cert-2",
    title: "Teaching Factory (TEFA) IoT Programmer",
    issuer: "SMK Budi Bakti Ciwidey x Mitra Industri",
    date: "Tahun 2025",
    credentialId: "TEFA-IOT-BBC-2025",
    url: "https://github.com/kffLyan",
    description: "Penghargaan sebagai Programmer IoT dalam proyek Teaching Factory (TEFA), membangun sistem Smart Parking berbasis mikrokontroler dan sensor ultrasonik.",
    skills: ["Smart Parking IoT", "Hardware Interfacing", "Ultrasonic Telemetry"]
  },
  {
    id: "cert-3",
    title: "Kelas Industri Digital (KIDi) IoT Specialist",
    issuer: "Pelatihan Online KIDi & Workshop Industri",
    date: "Tahun 2024",
    credentialId: "KIDI-IOT-WORKSHOP-2024",
    url: "https://github.com/kffLyan",
    description: "Pelatihan hands-on dan workshop kelas industri digital: otomatisasi lampu berbasis aplikasi dan kendali aktuator garasi pintar.",
    skills: ["Otomatisasi Relay", "Smart Garage Actuators", "Protokol IoT"]
  }
];

export const TECH_STACK = [
  {
    category: "Backend & Systems Architecture",
    description: "Server-side logic, API contracts, and computational runtimes",
    skills: [
      { name: "Laravel (PHP)", rating: "9/10", level: "Expert Framework" },
      { name: "PHP (Modern & OOP)", rating: "8/10", level: "MVC & Clean Architecture" },
      { name: "Next.js 16 (App Router)", rating: "6/10", level: "Server Actions & API Routes" },
      { name: "C++", rating: "7/10", level: "Algorithms & LKS 2nd Place" },
      { name: "Python", rating: "7/10", level: "Computer Vision & Scripting" },
      { name: "Java", rating: "6/10", level: "OOP Foundations" }
    ]
  },
  {
    category: "Databases & Security Engineering",
    description: "Data integrity, relational models, and zero-trust protection",
    skills: [
      { name: "MySQL", rating: "8/10", level: "Relational Schema & 3NF" },
      { name: "PostgreSQL (Neon)", rating: "7/10", level: "Serverless Cloud Database" },
      { name: "Prisma ORM", rating: "7/10", level: "Type-Safe Relational Queries" },
      { name: "NextAuth v5 & RBAC", rating: "7/10", level: "Multi-Role Session Security" },
      { name: "Zero-Trust & Anti-IDOR", rating: "8/10", level: "Server-Side Authorization" }
    ]
  },
  {
    category: "Frontend Architecture & Interfaces",
    description: "Component isolation, reactive state, and styling ergonomics",
    skills: [
      { name: "HTML5 / Semantic Web", rating: "8/10", level: "Accessible & Clean Structure" },
      { name: "CSS3 / Modern CSS", rating: "8/10", level: "Logical Layouts & Flex/Grid" },
      { name: "React & TypeScript", rating: "6/10", level: "Strict Props & Type Contracts" },
      { name: "Tailwind CSS", rating: "8/10", level: "Utility Token Systems" },
      { name: "Alpine.js", rating: "7/10", level: "Lightweight Reactive Islands" },
      { name: "JavaScript (ESNext)", rating: "6/10", level: "Async/Await & DOM Events" }
    ]
  },
  {
    category: "Infrastructure, IoT & Workflow",
    description: "Hardware interfacing, versioning, and cloud deployments",
    skills: [
      { name: "Git & GitHub", rating: "9/10", level: "Trunk-Based Workflow & Collaboration" },
      { name: "Vercel Deployment", rating: "7/10", level: "Serverless & HTTPS Cookies" },
      { name: "Embedded IoT", rating: "7/10", level: "Smart Parking & Actuator Control" },
      { name: "Debugging & Error Tracing", rating: "8/10", level: "Prisma P2002 & NextAuth SRE" }
    ]
  }
];

export const INITIAL_GUESTBOOK = [
  {
    id: "gb-1",
    name: "Rifqi Pratama",
    role: "Lead Developer, Tim Sangkuriang",
    message: "Implementasi token kadaluarsa 1x pakai di OSIS Voting v2 sangat solid dan berhasil mengeliminasi potensi double-vote di sekolah.",
    timestamp: "2026-03-02T10:15:00Z"
  },
  {
    id: "gb-2",
    name: "Guru Pembimbing RPL",
    role: "Staff Pengajar, SMK Budi Bakti Ciwidey",
    message: "Arsitektur SI REMED v2 menunjukkan pemahaman mendalam tentang keamanan backend, mitigasi IDOR, dan validasi server-side yang matang.",
    timestamp: "2026-02-18T14:42:00Z"
  },
  {
    id: "gb-3",
    name: "Ketua OSIS SMK BBC",
    role: "Mitra Pengguna, E-Voting BBC",
    message: "Sistem e-voting yang dikembangkan sangat membantu transparansi dan kecepatan rekapitulasi suara pemilihan ketua OSIS!",
    timestamp: "2026-01-20T08:30:00Z"
  }
];
