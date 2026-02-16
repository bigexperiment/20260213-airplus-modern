"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function MasonryGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryItems = useMemo(() => {
    const arr = Array.from(new Set(images.filter(Boolean)));
    arr.sort((a, b) => a.localeCompare(b));
    return arr.map((src, index) => ({
      src,
      caption: captionFor(src, index),
    }));
  }, [images]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % galleryItems.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryItems.length, open]);

  const canNavigate = galleryItems.length > 1;
  const activeItem = galleryItems[activeIndex];

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {galleryItems.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="mb-3 overflow-hidden rounded-xl focus:outline-none group w-full border border-white/10 bg-black/10"
            onClick={() => openAt(index)}
          >
            <Image
              src={item.src}
              alt={item.caption}
              width={1200}
              height={900}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform"
            />
            <div className="px-2.5 py-2 text-left">
              <div className="text-xs text-foreground/90 line-clamp-1">{item.caption}</div>
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/85" />
          <Dialog.Content
            className="fixed inset-0 p-3 md:p-6 flex flex-col"
            onPointerDown={() => setOpen(false)}
          >
            <Dialog.Title className="sr-only">
              Nepal gallery viewer
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Full-screen gallery with next and previous controls.
            </Dialog.Description>
            <div
              className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <div className="text-sm md:text-base truncate">{activeItem?.caption}</div>
                <div className="text-xs text-white/70">{activeIndex + 1} / {galleryItems.length}</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 hover:bg-black/50"
                aria-label="Close gallery"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-3 flex-1 relative grid place-items-center">
              {activeItem && (
                <Image
                  src={activeItem.src}
                  alt={activeItem.caption}
                  width={1800}
                  height={1200}
                  sizes="95vw"
                  className="max-h-[78svh] h-auto w-auto max-w-[96vw] rounded-xl"
                  onPointerDown={(e) => e.stopPropagation()}
                  priority
                />
              )}

              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white hover:bg-black/55"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % galleryItems.length)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white hover:bg-black/55"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 text-center text-xs text-white/70" onPointerDown={(e) => e.stopPropagation()}>
              Swipe not required: use arrows or tap next/previous.
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function captionFor(src: string, index: number): string {
  const key = src.split("/").pop()?.toLowerCase() || "";
  const known: Record<string, string> = {
    "gallery_1.jpg": "Annapurna morning trail colors",
    "gallery_2.jpg": "Mountain village life on route",
    "gallery_3.jpg": "Classic ridgeline trekking views",
    "gallery_4.jpg": "Historic city and temple atmosphere",
    "gallery_5.jpg": "Pokhara lakeside and valley panorama",
    "gallery_6.jpg": "Chitwan jungle and wildlife moments",
    "gallery_7.jpg": "Cultural streets and local markets",
    "gallery_8.jpg": "Adventure day across Nepal terrain",
  };
  return known[key] || `Nepal gallery moment ${index + 1}`;
}
