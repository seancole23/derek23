export type Project = {
  slug: string;
  client: string;
  tags: string[];
  cover: string;
  video: string;
  logo: string;
  logoExt: 'png' | 'svg';
  description: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'airwick',
    client: 'Air Wick',
    tags: ['Social', 'Display', 'Motion'],
    cover: '/images/covers/airwick.jpg',
    video: '/video/clients/airwick.mp4',
    logo: '/images/logos/airwick.png',
    logoExt: 'png',
    description: 'Seasonal social campaigns and digital display ads across multiple Air Wick product lines.',
  },
  {
    slug: 'coke',
    client: 'Coca-Cola',
    tags: ['Social', 'Display'],
    cover: '/images/covers/coke.jpg',
    video: '/video/clients/coke.mp4',
    logo: '/images/logos/coke.png',
    logoExt: 'png',
    description: "Summer BBQ campaign — animated display ads and social content for Coke's seasonal push.",
  },
  {
    slug: 'verizon',
    client: 'Verizon',
    tags: ['Display', 'OLA', 'Social'],
    cover: '/images/covers/verizon.jpg',
    video: '/video/clients/verizon.mp4',
    logo: '/images/logos/verizon.svg',
    logoExt: 'svg',
    description: 'Bayou campaign — full suite of digital display, OLA, and social formats for Verizon home internet.',
  },
  {
    slug: 'resolve',
    client: 'Google / DaVinci Resolve',
    tags: ['Social', 'Motion'],
    cover: '/images/covers/resolve.jpg',
    video: '/video/clients/resolve.mp4',
    logo: '/images/logos/resolve.png',
    logoExt: 'png',
    description: 'Animated slide series for DaVinci Resolve product education, produced for Google.',
  },
  {
    slug: 'mastercard',
    client: 'Mastercard',
    tags: ['Display', 'Social', 'Motion'],
    cover: '/images/covers/mastercard.jpg',
    video: '/video/clients/mastercard.mp4',
    logo: '/images/logos/mastercard.svg',
    logoExt: 'svg',
    description: 'Multi-format digital advertising across sports, entertainment, and lifestyle verticals.',
  },
  {
    slug: 'mavenlink',
    client: 'Mavenlink',
    tags: ['Social', 'Motion'],
    cover: '/images/covers/mavenlink.jpg',
    video: '/video/clients/mavenlink.mp4',
    logo: '/images/logos/mavenlink.png',
    logoExt: 'png',
    description: "Animated product marketing and social content for Mavenlink's B2B platform.",
  },
  {
    slug: 'wolters',
    client: 'Wolters Kluwer',
    tags: ['Corporate', 'Motion'],
    cover: '/images/covers/wolters.jpg',
    video: '/video/clients/wolters.mp4',
    logo: '/images/logos/wolters.png',
    logoExt: 'png',
    description: "Corporate brand motion series for Wolters Kluwer's global marketing refresh.",
  },
  {
    slug: 'woolite',
    client: 'Woolite',
    tags: ['Social', 'Display'],
    cover: '/images/covers/woolite.jpg',
    video: '/video/clients/woolite.mp4',
    logo: '/images/logos/woolite.png',
    logoExt: 'png',
    description: "Social and digital display campaign for Woolite's fabric care product line.",
  },
];
