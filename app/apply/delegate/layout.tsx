import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apply Delegate",
  description: "Apply as a Delegate to be a part of DADYAMUN'25.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Delegate",
    "Delegate Application",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Datça MUN"
  ],
  openGraph: {
    title: "Apply Delegate",
    description: "Apply as a Delegate to be a part of DADYAMUN'25.",
    url: "https://www.dadyamun.org/apply/delegate",
  },
  twitter: {
    title: "Apply Delegate",
    description: "Apply as a Delegate to be a part of DADYAMUN'25.",
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