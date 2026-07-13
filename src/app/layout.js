import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./ui/Footer";
import AppNavbar from "./ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HireLoop",
  description: "A job protal",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-screen flex-col bg-zinc-950 text-white antialiased">

        <AppNavbar></AppNavbar>
        {/* Main content wrapper takes up all remaining vertical space */}
        <main className="w-full flex-1">{children}</main>

        {/* Footer sits perfectly at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
