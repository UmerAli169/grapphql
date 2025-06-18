"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthGuard } from "@/components/auth/protected/AuthGuard";
import ToastProvider from "@/components/notificiton/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen w-full font-[poppins] bg-[#F9FAFC]`}
      >
        <ToastProvider />
        <Header />
        <main className="flex-grow">
          <AuthGuard
            activeModal={""}
            closeModal={() => {}}
            setActiveModal={() => {}}
          >
            {children}
          </AuthGuard>{" "}
        </main>
        <Footer />
      </body>
    </html>
  );
}
