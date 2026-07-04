import { Project, Service, Skill, Experience, Testimonial } from './types';
import avatarImg from './assets/images/developer_avatar_1782825370812.jpg';

export const developerInfo = {
  name: 'Lucky Onah',
  title: 'Full-Stack Developer',
  tagline: 'I build high-performance web applications with React & Vite, and beautiful mobile experiences with Flutter.',
  bio: 'I am a passionate Full-Stack Developer specializing in building clean, robust, and scalable solutions. I build fast, interactive web applications using React & Vite, craft fluid mobile experiences with Flutter, and power them with secure Firebase architectures and efficient Cloudinary media management.',
  avatar: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1782831511/mypic_qrmkpe.png',
  cvUrl: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783187454/Onah_Lucky_Chimtem_CV_f3ffs4.pdf',
  stats: [
    { label: 'Projects Completed', value: '50+' },
    { label: 'of building projects', value: '5+' },
    { label: 'Happy Clients', value: '40+' },
  ]
};

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Apps (React & Vite)',
    description: 'Custom, blazing-fast web applications built with React and Vite for optimal performance, smooth interactive transitions, and exceptional scalability.',
    iconName: 'Code'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Apps (Flutter)',
    description: 'Beautiful, natively compiled cross-platform iOS and Android mobile apps designed with Flutter for buttery-smooth fluid interactions.',
    iconName: 'Smartphone'
  }
];

export const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Flutter', level: 92, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Dart', level: 88, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  
  // Backend
  { name: 'Firebase', level: 93, category: 'Backend' },
  { name: 'Node.js', level: 90, category: 'Backend' },
  { name: 'Express', level: 92, category: 'Backend' },
  { name: 'Cloudinary', level: 88, category: 'Backend' },
  
  // Tools
  { name: 'Cloudflare', level: 88, category: 'Tools' },
  { name: 'Vite', level: 95, category: 'Tools' },
  { name: 'Git & GitHub', level: 92, category: 'Tools' }
];

export const experiencesData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Full-Stack Developer',
    company: 'BlueWave Solutions',
    period: '2024 - Present',
    description: 'Directing development of enterprise responsive dashboards and cross-platform mobile apps using React, Vite, and Flutter. Mentoring junior developers, implementing strict code reviews, and optimizing asset delivery pipelines with Cloudinary, resulting in a 40% reduction in load times.',
    tags: ['React', 'Vite', 'Flutter', 'Firebase', 'Cloudinary']
  },
  {
    id: 'exp-2',
    role: 'Frontend & Mobile Engineer',
    company: 'PixelForge Studios',
    period: '2022 - 2024',
    description: 'Collaborated closely with design team to convert complex user flows into elegant mobile apps using Flutter and responsive web dashboards using React. Connected robust serverless backend logic using Firebase.',
    tags: ['React', 'Flutter', 'Dart', 'Firebase', 'Tailwind CSS']
  },
  {
    id: 'exp-3',
    role: 'Junior Web & App Developer',
    company: 'SaaS Launchpad',
    period: '2021 - 2022',
    description: 'Developed and optimized lightweight serverless functions on Firebase. Managed rich multi-media cloud delivery with Cloudinary, and implemented fast web application layouts with React and Vite.',
    tags: ['React', 'Vite', 'Firebase', 'Cloudinary', 'Tailwind CSS']
  }
];

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'NYSC Attendance',
    description: 'A secure web application designed to capture corp members’ face IDs and verify attendance at check-ins using real-time geolocation mapping.',
    longDescription: 'NYSC Attendance is a high-performance administrative web platform designed to automate and protect daily check-in workflows. It pairs precise geolocation telemetry with biometric facial validation to eliminate proxy logs and enforce true physical presence.',
    image: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184661/nyscabj.pages.dev__iPhone_SE_xhcavv.png',
    tags: ['React', 'TypeScript', 'Face ID API', 'Geolocation', 'Tailwind CSS'],
    category: 'Web App',
    githubUrl: 'https://github.com',
    liveUrl: 'https://nyscabj.pages.dev',
    featured: true,
    stats: [
      { label: 'Verify Accuracy', value: '99.6%' },
      { label: 'Check-in Speed', value: '1.2s' },
      { label: 'Active Terminals', value: '450+' }
    ],
    period: '2025 - 2026',
    screenshots: [
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184661/nyscabj.pages.dev__iPhone_SE_xhcavv.png',
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184660/nyscabj.pages.dev__iPhone_SE1_rxpvi1.png'
    ]
  },
  {
    id: 'project-2',
    title: 'NYSC Camp Guide',
    description: 'An interactive camp portal helping corp members easily navigate camp maps, contact officials, access slide lectures and notes, and trigger emergency support.',
    longDescription: 'NYSC Camp is a comprehensive web companion engineered for corp members inside camps. It simplifies the camp experience by hosting digital maps, interactive administrative contact books, instant PowerPoint and document downloads, and instant panic buttons linked to medical/security officers.',
    image: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783172979/nysccamp.pages.dev__iPhone_SE_vosdrs.png',
    tags: ['React', 'Vite', 'Firebase', 'Tailwind CSS', 'Emergency Hub'],
    category: 'Web App',
    githubUrl: 'https://github.com',
    liveUrl: 'https://nysccamp.pages.dev',
    featured: true,
    stats: [
      { label: 'Camp Users', value: '12K+' },
      { label: 'File Downloads', value: '38K+' },
      { label: 'SOS Response', value: '<4s' }
    ],
    period: '2024 - 2026',
    screenshots: [
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783172979/nysccamp.pages.dev__iPhone_SE_vosdrs.png',
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783170723/Screenshot_2026-07-04_133237_gbrag4.png'
    ]
  },
  {
    id: 'project-3',
    title: 'BIU Lecture APP',
    description: 'A mobile companion used for attending live lectures, downloading notes, and checking in to physical classes using geolocation verification and student ID scanning.',
    longDescription: 'The BIU Lecture App streamlines academic schedules and physical class tracking on mobile devices. It lets students instantly access class materials, track lectures, and sign physical attendance sheets via combined GPS telemetry checks and native RFID/Barcode student ID scanning.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mobile Dev', 'ID Card Scan', 'GPS Geolocation', 'Offline Sync'],
    category: 'Mobile',
    githubUrl: 'https://github.com',
    liveUrl: '#',
    featured: true,
    stats: [
      { label: 'Active Students', value: '8K+' },
      { label: 'Scan Accuracy', value: '99.8%' },
      { label: 'Notes Served', value: '120K+' }
    ],
    period: '2021 - Present'
  },
  {
    id: 'project-4',
    title: 'Estate Security',
    description: 'A security solution improving estate safety by recording visitor entry logs, tagging visitors with custom AirTags inside guest ID cards, and securing resident approvals before entry.',
    longDescription: 'Estate Security is a high-performance web platform designed to streamline gate checkpoints and maximize neighborhood protection. The platform automatically records visitor entry logs, tracks guest locations within the estate boundaries using AirTag-enabled ID cards, and sends real-time authorization requests to residents before allowing entry.',
    image: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783182316/estatevip.pages.dev__iPhone_SE_myd7jt.png',
    tags: ['React', 'TypeScript', 'AirTag Tracking', 'Entry Logging', 'Real-time Approvals'],
    category: 'Web App',
    githubUrl: 'https://github.com',
    liveUrl: 'https://estatevip.pages.dev',
    featured: true,
    stats: [
      { label: 'Approval Speed', value: '<45s' },
      { label: 'Tracking Accuracy', value: '100%' },
      { label: 'Monthly Visitors', value: '5.2K' }
    ],
    period: '2026 - Present',
    screenshots: [
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783182316/estatevip.pages.dev__iPhone_SE_myd7jt.png',
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783182316/Screenshot_2026-07-04_172416_f1c0lc.png'
    ]
  },
  {
    id: 'project-5',
    title: 'Printify',
    description: 'An online document printing and delivery service connecting users with the closest local print shops for prompt on-demand document fulfillment and delivery.',
    longDescription: 'Printify is an innovative, high-efficiency web application designed to handle document printing requests entirely online. Users can upload their documents, find the closest available high-quality print shop, customize paper settings, pay, and have their fully printed and bound pages delivered directly to their current coordinate location.',
    image: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184027/printify-6er.pages.dev__iPhone_SE_fglqxq.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Geolocated Shops', 'On-demand Delivery'],
    category: 'Web App',
    githubUrl: 'https://github.com',
    liveUrl: 'https://printify-6er.pages.dev',
    featured: true,
    stats: [
      { label: 'Avg Delivery Time', value: '25 mins' },
      { label: 'Active Shops', value: '180+' },
      { label: 'Satisfaction Rate', value: '99.4%' }
    ],
    period: '2026',
    screenshots: [
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184027/printify-6er.pages.dev__iPhone_SE_fglqxq.png',
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184026/Screenshot_2026-07-04_173350_tkqsfa.png'
    ]
  },
  {
    id: 'project-6',
    title: 'doosseeh-xiv',
    description: 'A bespoke digital storefront for custom-made premium clothing, tailoring, and designer streetwear.',
    longDescription: 'doosseeh-xiv is a stylized, immersive web application built for a custom-designed clothes seller. It allows clients to explore premium lookbooks, choose fabrics, submit custom sizing configurations, and browse curated collections in an editorial-grade luxury user experience.',
    image: 'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184454/doosseeh-xiv.pages.dev__iPhone_SE_hd6wvz.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'E-Commerce', 'Custom Tailoring Layouts'],
    category: 'Web App',
    githubUrl: 'https://github.com',
    liveUrl: 'https://doosseeh-xiv.pages.dev',
    featured: true,
    stats: [
      { label: 'Client Retention', value: '94%' },
      { label: 'Orders Fulfilled', value: '1.8K+' },
      { label: 'Custom Fabrics', value: '45+' }
    ],
    period: '2026',
    screenshots: [
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184454/doosseeh-xiv.pages.dev__iPhone_SE_hd6wvz.png',
      'https://res.cloudinary.com/dxoz4f448/image/upload/v1783184453/Screenshot_2026-07-04_175859_b01mfk.png'
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'SaaSify',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Lucky is an outstanding developer. He turned our complex Figma specifications into clean, highly optimized React code in record time. His attention to responsive details and fluid animations is unmatched.'
  },
  {
    id: 'test-2',
    name: 'David Chen',
    role: 'Founder & CEO',
    company: 'Launchpad Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Working with Lucky was an absolute pleasure. He brought a fantastic blend of technical full-stack expertise and deep design intuition to our product. Our client signups spiked by 35% after launching his redesigned app.'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Engineering Lead',
    company: 'Synthetix Cloud',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Lucky writes incredibly clean, maintainable, and well-documented TypeScript code. He integrated our telemetry feeds seamlessly and built custom Recharts visualizations that look beautiful on both desktop and mobile screens.'
  }
];
