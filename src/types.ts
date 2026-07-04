export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  stats?: { label: string; value: string }[];
  period?: string;
  screenshots?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}
