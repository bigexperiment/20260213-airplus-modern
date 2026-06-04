import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFab from "@/components/WhatsAppFab";
import contactData from "../../public/information/contact.json";
import Footer from "@/components/Footer";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og-image";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_OG_TITLE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/logo-mark.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
    images: [
      {
        url: "/og/share.jpg?v=4",
        secureUrl: "/og/share.jpg?v=4",
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: `${SITE_NAME} — Explore Nepal. Live the adventure.`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
    images: ["/og/share.jpg?v=4"],
  },
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
