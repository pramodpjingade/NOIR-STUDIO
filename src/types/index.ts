export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Creative Direction' | 'Interactive 3D' | 'Motion Identity' | 'Editorial Commerce';
  year: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  aspectRatio: string;
  stats: { label: string; value: string };
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  tools: string[];
}
