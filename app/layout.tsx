import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";


// Initialize the montserrat Display serif font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  // You can use specific weights if needed
  style: ["normal", "italic"]
});


export const metadata: Metadata = {
  title: {
    default: "DADYAMUN'25",
    template: "%s | DADYAMUN'25" // Dynamic title for child pages
  },
  description: "Join DADYAMUN'25 in Datça on 25-27 Haziran 2025 for a premier Model UN experience. Debate, diplomacy, and leadership await!",
  keywords: [
    "MUN", 
    "Dadya Model United Nations",
    "DADYAMUN'25",
    "DADYAMUN", 
    "Model United Nations", 
    "Turkey MUN 2025"
  ],
  
  // Favicons (update paths if needed)
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },

  // OpenGraph (Social Media Previews)
  openGraph: {
    title: "DADYAMUN'25 | Dadya Model United Nations",
    description: "25-27 Haziran 2025 | Experience diplomacy and debate at Datça's premier MUN conference.",
    url: "https://www.dadyamun.org",
    siteName: "DADYAMUN'25",
    images: [
      {
        url: "https://www.dadyamun.org/opengraph-image.jpg", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "DADYAMUN'25 - Dadya Model United Nations Conference",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["dadyamun2424@gmail.com"], // Update contact email
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DADYAMUN'25 | Dadya Model United Nations",
    description: "25-27 Haziran 2025 | Join Turkey's leading MUN conference in Datça.",
    images: ["https://www.dadyamun.org/opengraph-image.jpg"], // Same as OG image
  },

  // Technical SEO
  metadataBase: new URL("https://www.dadyamun.org"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden max-w-screen scroll-smooth`}>
      <body className={`overflow-x-hidden max-w-screen ${montserrat.variable} ${montserrat.className} antialiased`} style={{ scrollbarWidth: "none" }} >
        <BackgroundImage />
        <Navbar />
        {children}
        <h3 className="text-white text-center min-[1800px]:text-xl">© 2025 DADYAMUN, All Rights Reserved. <br className="sm:hidden" /> <a href="https://portfolio-psi-lime-12.vercel.app" target="_blank" className="underline cursor-pointer">Emre Bozkurt</a></h3>
        <Analytics />
      </body>
    </html>
  );
}