import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToastProvider from "@/components/notificiton/ToastProvider";
import ApolloWrapper from "@/components/providers/ApolloWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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

export const metadata: Metadata = {
  title: "Ladoes Fashion",
  description: "Discover trendy collections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen w-full font-[poppins] bg-[#F9FAFC]`}
      >
        <GoogleOAuthProvider
          clientId="566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com"
          
        >
          <ApolloWrapper>
            <ToastProvider />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ApolloWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
