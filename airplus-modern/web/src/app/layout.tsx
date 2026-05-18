import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-brand",
});
import WhatsAppFab from "@/components/WhatsAppFab";
import contactData from "../../public/information/contact.json";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`h-full scroll-smooth ${raleway.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab phone={(contactData as { headOffice?: { whatsapp?: string } }).headOffice?.whatsapp} />
      </body>
    </html>
  );
}
