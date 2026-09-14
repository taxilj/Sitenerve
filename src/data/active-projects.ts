export type ProjectStatus = 'Active Development' | 'Prototype / Active Development';

export type ActiveProject = {
  id: string;
  name: string;
  category: string;
  status: ProjectStatus;
  description: string;
  features: string[];
  href: string;
  screenshot: string;
  previewLabels: string[];
  disclaimer: string;
  ctaLabel: string;
};

export const activeProjects: ActiveProject[] = [
  {
    id: 'compex',
    name: 'COMPEX',
    category: 'Industrial Electronics Sourcing Platform',
    status: 'Active Development',
    description:
      'A business-focused electronics sourcing platform that helps users search exact manufacturer part numbers, explore component information, submit BOM requirements, and request sourcing support.',
    features: [
      'Exact MPN search',
      'Component catalogue',
      'Manufacturer browsing',
      'BOM sourcing workflow',
      'Request-for-quote flow',
      'Electronics procurement workflow',
    ],
    href: 'https://compex-frontend.vercel.app/',
    screenshot: '/images/projects/compex-screenshot.png',
    previewLabels: ['MPN Search', 'Component Catalogue', 'BOM Upload', 'Request a Quote'],
    disclaimer:
      'Active software project under continuous development — not a completed production marketplace. Stock, pricing, lead time, and supplier availability are not guaranteed.',
    ctaLabel: 'Open Live Preview',
  },
  {
    id: 'oeminventory',
    name: 'OEMInventory',
    category: 'B2B Electronics Inventory & RFQ Platform',
    status: 'Prototype / Active Development',
    description:
      'A B2B electronics inventory and procurement workflow platform designed around inventory search, BOM mapping, RFQ management, supplier workflows, customer workflows, and admin operations.',
    features: [
      'Inventory search',
      'BOM upload and AI field mapping',
      'RFQ workflow',
      'Customer portal',
      'Supplier portal',
      'Admin and operations workflow',
      'Electronics procurement dashboard',
    ],
    href: 'https://oeminventory.vercel.app/',
    screenshot: '/images/projects/oeminventory-screenshot.png',
    previewLabels: ['Inventory Search', 'BOM Field Mapping', 'RFQ Workflow', 'Supplier Portal'],
    disclaimer:
      'Prototype / Active Development — the live application contains mock/demo procurement data. Inventory quantities, QC, landed cost, and availability shown are not verified production data.',
    ctaLabel: 'Open Live Preview',
  },
];
