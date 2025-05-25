import { Montserrat } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${montserrat.variable} ${montserrat.className} from-[#0C0C0C] to-[#1A1A2E] antialiased`}>
        <BackgroundImage />
        <Navbar />
        {children}
      </div>
  );
}
