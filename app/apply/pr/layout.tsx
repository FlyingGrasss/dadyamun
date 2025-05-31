import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apply as a Public Relations Team Member",
  description: "Apply as a Public Relations Team Member to be a part of DADYAMUN'25.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Public Relations",
    "Public Relations Application",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Datça MUN"
  ],
  openGraph: {
    title: "Apply Public Relations",
    description: "Apply as a Public Relations Team Member to be a part of DADYAMUN'25.",
    url: "https://www.dadyamun.org/apply/Public Relations",
  },
  twitter: {
    title: "Apply Public Relations",
    description: "Apply as a Public Relations Team Member to be a part of DADYAMUN'25.",
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