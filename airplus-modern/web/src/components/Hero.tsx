"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  primaryHref: string;
  secondaryHref: string;
};

export default function Hero({ title, subtitle, image, primaryHref, secondaryHref }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/72 via-black/38 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/55 to-transparent" />
      <Image
        src={image}
        alt="Himalayan landscape"
        width={2400}
        height={1200}
        className="w-full h-[56svh] object-cover"
        priority
      />
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="p-6 md:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl text-balance text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]"
          >
            <Balancer>{title}</Balancer>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
            className="mt-2 md:mt-3 max-w-2xl text-base md:text-xl text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          >
            <Balancer>{subtitle}</Balancer>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link href={primaryHref} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">Explore Treks</Link>
            <Link href={secondaryHref} className="px-5 py-2.5 rounded-full border border-white/40 bg-black/20 text-white hover:bg-black/35 transition">Cultural Tours</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

