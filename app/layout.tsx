import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Derek Haase — Creative Developer',
  description: 'Creative developer specializing in motion graphics, animation, and digital advertising for brands like Airwick, Coca-Cola, Verizon, and Google.',
  openGraph: {
    title: 'Derek Haase — Creative Developer',
    description: 'Motion graphics, animation & digital advertising.',
    url: 'https://www.derek23.com',
    siteName: 'Derek Haase',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
