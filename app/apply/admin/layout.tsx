import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apply Admin",
  description: "Apply as a Admin to be a part of DADYAMUN'25.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Admin",
    "Admin Application",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Bodrum MUN"
  ],
  openGraph: {
    title: "Apply Admin",
    description: "Apply as a Admin to be a part of DADYAMUN'25.",
    url: "https://www.dadyamun.org/apply/admin",
  },
  twitter: {
    title: "Apply Admin",
    description: "Apply as a Admin to be a part of DADYAMUN'25.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}