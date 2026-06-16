export type Project = {
  slug: string;
  client: string;
  tags: string[];
  thumbnail: string;
  thumbnailBg: string;
  videos: string[];
  logo: string;
  description: string;
};

const v = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/video/clients/${slug}/${String(i + 1).padStart(2, '0')}.mp4`);

export const PROJECTS: Project[] = [
  {
    slug: 'airwick',
    client: 'Air Wick',
    tags: ['Social', 'Display', 'Motion'],
    thumbnail: '/images/thumbnails/Airwick.png',
    thumbnailBg: '#1e3d2f',
    videos: v('airwick', 5),
    logo: '/images/logos/airwick.png',
    description: 'Seasonal social campaigns and digital display ads across multiple Air Wick product lines.',
  },
  {
    slug: 'mastercard',
    client: 'Mastercard',
    tags: ['Display', 'Social', 'Motion'],
    thumbnail: '/images/thumbnails/MC_logo.svg',
    thumbnailBg: '#000000',
    videos: v('mastercard', 4),
    logo: '/images/logos/mastercard.svg',
    description: 'Multi-format digital advertising across sports, entertainment, and lifestyle verticals.',
  },
  {
    slug: 'resolve',
    client: 'Google / DaVinci Resolve',
    tags: ['Social', 'Motion'],
    thumbnail: '/images/thumbnails/Resolve_google.png',
    thumbnailBg: '#ffffff',
    videos: v('resolve', 4),
    logo: '/images/logos/resolve.png',
    description: 'Animated slide series for DaVinci Resolve product education, produced for Google.',
  },
  {
    slug: 'verizon',
    client: 'Verizon',
    tags: ['Display', 'OLA', 'Social'],
    thumbnail: '/images/thumbnails/VZ_logo_white.svg',
    thumbnailBg: '#000000',
    videos: v('verizon', 4),
    logo: '/images/logos/verizon.svg',
    description: 'Bayou campaign — full suite of digital display, OLA, and social formats for Verizon home internet.',
  },
  {
    slug: 'coke',
    client: 'Coca-Cola',
    tags: ['Social', 'Display'],
    thumbnail: '/images/thumbnails/COKE.png',
    thumbnailBg: '#e8001b',
    videos: v('coke', 4),
    logo: '/images/logos/coke.png',
    description: "Summer BBQ campaign — animated display ads and social content for Coke's seasonal push.",
  },
  {
    slug: 'finish',
    client: 'Finish',
    tags: ['Social', 'Display', 'Motion'],
    thumbnail: '/images/thumbnails/Finish.png',
    thumbnailBg: '#0a0f1e',
    videos: v('finish', 4),
    logo: '/images/logos/finish.png',
    description: 'Animated social and display campaigns for Finish dishwasher detergent across seasonal themes.',
  },
  {
    slug: 'vmlyr',
    client: 'VMLY&R',
    tags: ['Corporate', 'Motion'],
    thumbnail: '/images/thumbnails/VML.png',
    thumbnailBg: '#000000',
    videos: v('vmlyr', 3),
    logo: '/images/logos/vmlyr.png',
    description: 'Agency production work for VMLY&R — animated brand and corporate content.',
  },
  {
    slug: 'wolters',
    client: 'Wolters Kluwer',
    tags: ['Corporate', 'Motion'],
    thumbnail: '/images/thumbnails/Wolters_Kluwer.png',
    thumbnailBg: '#000000',
    videos: v('wolters', 4),
    logo: '/images/logos/wolters.png',
    description: "Corporate brand motion series for Wolters Kluwer's global marketing refresh.",
  },
  {
    slug: 'mavenlink',
    client: 'Mavenlink',
    tags: ['Social', 'Motion'],
    thumbnail: '/images/thumbnails/Mavenlink.png',
    thumbnailBg: '#000000',
    videos: v('mavenlink', 3),
    logo: '/images/logos/mavenlink.png',
    description: "Animated product marketing and social content for Mavenlink's B2B platform.",
  },
  {
    slug: 'usbank',
    client: 'US Bank',
    tags: ['Display', 'Social'],
    thumbnail: '/images/thumbnails/US_Bank.png',
    thumbnailBg: '#ffffff',
    videos: v('usbank', 4),
    logo: '/images/logos/usbank.png',
    description: 'Digital display and social campaigns for US Bank across checking, savings, and lifestyle verticals.',
  },
  {
    slug: 'lysol',
    client: 'Lysol',
    tags: ['Social', 'Motion'],
    thumbnail: '/images/thumbnails/lysol.png',
    thumbnailBg: '#ffffff',
    videos: v('lysol', 4),
    logo: '/images/logos/lysol.png',
    description: 'Social video and display creative for Lysol across multiple product campaigns.',
  },
  {
    slug: 'woolite',
    client: 'Woolite',
    tags: ['Social', 'Display'],
    thumbnail: '/images/thumbnails/Woolite.png',
    thumbnailBg: '#5b72c4',
    videos: v('woolite', 3),
    logo: '/images/logos/woolite.png',
    description: "Social and digital display campaign for Woolite's fabric care product line.",
  },
  {
    slug: 'ridx',
    client: 'Rid-X',
    tags: ['Social', 'Display'],
    thumbnail: '/images/thumbnails/Rid-X_Logo.png',
    thumbnailBg: '#a8c8e8',
    videos: v('ridx', 4),
    logo: '/images/logos/ridx.png',
    description: 'Social infeed and story format campaigns for Rid-X septic treatment products.',
  },
];
