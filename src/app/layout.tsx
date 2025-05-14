import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../assets/images/home/logo.png';
import '../style/main.css';

// Function to generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  // const seoData = await fetchSEOData();
  const lang = typeof window !== 'undefined' && localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; // Default to 'en'
  return {
    title: 'O.HORIZON',
    keywords: "O.HORIZON",
    description: "O.HORIZON",
    openGraph: {
      title: "O.HORIZON",
      description: '',
      url: 'https://o-horizon.vercel.app/',
      siteName: "O.HORIZON",

      images: [
        {
      url: logo.src, // this does not apear in the preview while sharing the page
      width: 1200,
      height: 630,
      alt: 'O.Horizon',
        },
      ],
      type: 'website',
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="root">
      <body className="w-full" suppressHydrationWarning={true}>
        <Header />
        <>{children}</>
        <Footer />
      </body>
    </html>
  );
}
