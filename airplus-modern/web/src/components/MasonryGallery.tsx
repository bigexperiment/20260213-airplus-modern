"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function MasonryGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const shuffled = useMemo(() => {
    const arr = Array.from(new Set(images.filter(Boolean)));
    arr.sort((a, b) => a.localeCompare(b));
    return arr;
  }, [images]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {shuffled.map((src) => (
          <button
            key={src}
            type="button"
            className="mb-3 overflow-hidden rounded-xl focus:outline-none group w-full"
            onClick={() => { setActive(src); setOpen(true); }}
          >
            <Image
              src={src}
              alt="Gallery"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform"
            />
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed inset-0 grid place-items-center p-4">
            {active && (
              <Image
                src={active}
                alt="Preview"
                width={1800}
                height={1200}
                sizes="95vw"
                className="max-h-[90svh] h-auto w-auto max-w-[95vw] rounded-xl"
                priority
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
