import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/componets/footer/Footer";
import {  Navbar } from "@/componets/headar/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Money Management",
  description: "Amazan Store Create",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <div id="blure">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
