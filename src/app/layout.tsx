import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const friz = localFont({
  src: "../components/font/friz-quadrata-std-medium-5870338ec7ef8.otf",
  variable: "--font-friz-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pondok Pesantren Al-Azhar Plered",
  description: "Website resmi Pondok Pesantren Al-Azhar Plered Purwakarta. Mewujudkan generasi Rabbani, cerdas, berintegritas, dan inovatif.",
  keywords: ["Pesantren", "Al-Azhar", "Purwakarta", "Plered", "PPDB", "Sekolah Islam"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${friz.variable} font-sans flex flex-col min-h-screen relative`}>
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
