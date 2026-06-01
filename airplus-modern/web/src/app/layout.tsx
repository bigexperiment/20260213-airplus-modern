import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import contactData from "../../public/information/contact.json";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AirPlus Nepal — Travels & Treks",
  description:
    "Simple, well-planned treks and cultural tours across Nepal with clear local support.",
  metadataBase: new URL("https://airplusnepal.com"),
  icons: { icon: "/logo-mark.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab phone={(contactData as { headOffice?: { whatsapp?: string } }).headOffice?.whatsapp} />
      </body>
    </html>
  );
}
