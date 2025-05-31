import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apply as a Press Team Member",
  description: "Apply as a Press Team Member to be a part of DADYAMUN'25.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Press",
    "Press Application",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Datça MUN"
  ],
  openGraph: {
    title: "Apply Press",
    description: "Apply as a Press Team Member to be a part of DADYAMUN'25.",
    url: "https://www.dadyamun.org/apply/Press",
  },
  twitter: {
    title: "Apply Press",
    description: "Apply as a Press Team Member to be a part of DADYAMUN'25.",
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