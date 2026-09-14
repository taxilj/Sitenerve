export type CompletedProjectStatus = 'Completed Client Project' | 'Founder Portfolio';

export type CompletedProject = {
  id: string;
  name: string;
  category: string;
  status: CompletedProjectStatus;
  description: string;
  features: string[];
  href: string;
  screenshot: string;
  previewLabels: string[];
  ctaLabel: string;
};

export const completedProjects: CompletedProject[] = [
  {
    id: 'redsky-placement',
    name: 'RedSky Placement',
    category: 'Placement & Security Services Website',
    status: 'Completed Client Project',
    description: "A professional website built for RedSky's placement and security service offerings.",
    features: [
      'Security service showcase',
      'Request-a-quote workflow',
      'Client testimonials',
      'WhatsApp & contact support',
    ],
    href: 'https://redskyplacement.in/',
    screenshot: '/images/projects/redskyplacement-screenshot.png',
    previewLabels: ['Services', 'Get Quote', 'Testimonials', 'Contact'],
    ctaLabel: 'View Live Site',
  },
  {
    id: 'taxil-portfolio',
    name: 'Taxil Prajapati',
    category: 'Founder Portfolio',
    status: 'Founder Portfolio',
    description:
      "Taxil Prajapati's personal portfolio showcasing web development, product design, AI integration, and software projects.",
    features: [
      'Project showcase',
      'Skills & experience timeline',
      'AI integration highlights',
      'Direct contact form',
    ],
    href: 'https://taxil.online/',
    screenshot: '/images/projects/taxil-portfolio-screenshot.png',
    previewLabels: ['Projects', 'Experience', 'Skills', 'Contact'],
    ctaLabel: 'View Portfolio',
  },
];
