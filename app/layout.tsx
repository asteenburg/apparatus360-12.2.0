import type { Metadata } from "next";
import Nav from '@/app/Nav'; // Ensure this path is correct: usually '@/components/Nav'
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AOSInit from "./AOSInit"; // Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apparatus360",
  description: "Comprehensive solution for truck inspections and fleet management.",
  other: {
    "aos-stylesheet":
      '<link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* 1. RENDER NAV BAR AT THE TOP (First child of body) */}
        <Nav /> 
        
        {/* 2. Wrap children in a div for padding, and render AFTER Nav */}
        <div className="0"> 
          {children}
        </div>
        
        {/* 3. Cleanup/Utility Components */}
        <AOSInit />
        <Script
          src="https://kit.fontawesome.com/1c8d5e03c9.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}