import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "DADYAMUN'25",
    template: "%s | DADYAMUN'25" // Dynamic title for child pages
  },
  description: "Join DADYAMUN'25 in Bodrum on 25-27 Haziran 2025 for a premier Model UN experience. Debate, diplomacy, and leadership await!",
  keywords: [
    "MUN conference", 
    "Bodrum MUN", 
    "DADYAMUN", 
    "Model United Nations", 
    "Turkey MUN 2025", 
    "youth leadership"
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
    title: "DADYAMUN'25 | Bodrum Model United Nations",
    description: "25-27 Haziran 2025 | Experience diplomacy and debate at Bodrum's premier MUN conference.",
    url: "https://www.dadyamun.org",
    siteName: "DADYAMUN'25",
    images: [
      {
        url: "https://www.dadyamun.org/og-image.jpg", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "DADYAMUN'25 - Bodrum Model United Nations Conference",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["info@dadyamun.org"], // Update contact email
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DADYAMUN'25 | Bodrum Model United Nations",
    description: "25-27 Haziran 2025 | Join Turkey's leading MUN conference in Bodrum.",
    images: ["https://www.dadyamun.org/og-image.jpg"], // Same as OG image
    creator: "@dadyamun", // Add if Twitter handle exists
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
  manifest: "/manifest.webmanifest" // PWA support
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden max-w-screen`}>
      <body className={`overflow-x-hidden max-w-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}