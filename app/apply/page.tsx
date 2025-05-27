import HomeLayout from "@/app/HomeLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to be a part of DADYAMUN'25. Applications opening soon!",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Bodrum MUN"
  ],
  openGraph: {
    title: "Apply",
    description: "Apply to be a part of DADYAMUN'25. Applications opening soon!",
    url: "https://www.dadyamun.org/apply",
  },
  twitter: {
    title: "Apply",
    description: "Apply to be a part of DADYAMUN'25. Applications opening soon!",
    card: "summary_large_image",
  },
};

const Apply = () => {
  return (
    <HomeLayout>

      <h1 className="text-6xl max-sm:text-3xl mt-16 mb-16 max-sm:mt-8 text-center text-[#172D7F] font-bold">Coming Soon</h1>

    </HomeLayout>
  );
};

export default Apply;