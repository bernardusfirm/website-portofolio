import type { Metadata } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Bernardus Firman Bagaskara — Graphic Designer & Digital Printing Specialist',
  description:
    'Portofolio profesional Bernardus Firman Bagaskara. Graphic Designer berpengalaman 5+ tahun sejak 2022, menangani 500+ proyek desain branding, promosi, media sosial, dan digital printing.',
  keywords: [
    'Bernardus Firman Bagaskara',
    'Graphic Designer',
    'Digital Printing',
    'Desain Grafis',
    'Branding',
    'Promosi',
    'Media Sosial',
    'CorelDRAW',
    'Photoshop',
    'Illustrator',
    'Premiere Pro',
    'After Effects',
    'CapCut',
  ],
  authors: [{ name: 'Bernardus Firman Bagaskara' }],
  creator: 'Bernardus Firman Bagaskara',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://bernardusfirman.com',
    title: 'Bernardus Firman Bagaskara — Graphic Designer & Digital Printing',
    description:
      'Graphic Designer dengan pengalaman sejak 2022 dan telah mengerjakan 500+ proyek desain branding, promosi, media sosial, dan digital printing.',
    siteName: 'Bernardus Firman Bagaskara Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Bernardus Firman Bagaskara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bernardus Firman Bagaskara — Graphic Designer & Digital Printing',
    description:
      'Graphic Designer dengan pengalaman sejak 2022 dan telah mengerjakan 500+ proyek desain.',
    creator: '@bernardusfirman',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen flex flex-col antialiased selection:bg-[#3682F6] selection:text-white">
        <PortfolioProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
