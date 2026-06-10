import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Grain from "@/components/shared/Grain";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["opsz"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Choudhary — Full-Stack Engineer & AI Systems Builder",
  description:
    "Full-stack engineer building RAG-powered LLM systems and production web platforms. GenAI internship, paid client delivery, five-model deepfake detection — shipped, not demoed.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <Grain />
      </body>
    </html>
  );
}
