import type { Metadata } from "next";
import { Yatra_One, Work_Sans } from "next/font/google";
import { MainNavigation } from "@/components/MainNavigation";
import FloatingDockDemo from "@/components/floating-dock-demo";
import { IndianCustomCursor } from "@/components/ui/IndianCustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chalo Dekhe Bharat — AI Tourism & Digital Heritage Portal",
  description:
    "Explore the rich culture, grand history, and iconic landmarks of India through immersive AI video museum experiences, 3D interactive globe, and interactive games.",
  keywords: ["India Tourism", "Digital Museum", "Indian Heritage", "AI Video Tourism", "Varanasi", "Taj Mahal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yatraOne.variable} ${workSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#1B1410] text-[#FFF6E9] flex flex-col selection:bg-[#FF6A2B] selection:text-[#1B1410]" suppressHydrationWarning>
        <SmoothScrollProvider>
          <IndianCustomCursor />
          <MainNavigation />
          <main className="flex-1 relative">{children}</main>
          <FloatingDockDemo />
          <footer className="py-6 px-4 text-center text-xs text-[#FFF6E9]/50 border-t border-[#FF6A2B]/10 bg-[#0A0706]">
            <p>© {new Date().getFullYear()} Chalo Dekhe Bharat! All rights reserved.</p>
          </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


