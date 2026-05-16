"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type InstagramPost = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
};

type FeedResponse = {
  ok: boolean;
  source: "instagram" | "fallback";
  posts: InstagramPost[];
};

function captionPreview(caption?: string): string {
  if (!caption) return "See the latest trail updates from Airplusnepal.";
  return caption.length > 110 ? `${caption.slice(0, 110)}...` : caption;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [source, setSource] = useState<"instagram" | "fallback" | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/instagram", { cache: "no-store" });
        const data = (await res.json()) as FeedResponse;
        if (cancelled) return;
        setPosts(data.posts || []);
        setSource(data.source);
      } catch {
        if (cancelled) return;
        setPosts([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!posts.length) return null;

  return (
    <section className="border-t border-[color:var(--border)] pt-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">From our Instagram</h3>
          <p className="mt-1 text-sm text-slate-800">
            Real updates from the trail at <span className="font-medium">@airplusnepal</span>.
          </p>
        </div>
        <a
          href="https://www.instagram.com/airplusnepal/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#e86f11] px-4 py-2 text-sm font-semibold text-white"
        >
          View Profile
        </a>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl bg-white"
          >
            <div className="relative h-56">
              <Image
                src={post.media_url || "/information/assets/gallery_1.jpg"}
                alt="Instagram post from Airplusnepal"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-3">
              <p className="text-sm leading-6 text-slate-800">{captionPreview(post.caption)}</p>
            </div>
          </a>
        ))}
      </div>

      {source === "fallback" && (
        <p className="mt-3 text-xs text-slate-600">
          Live Instagram sync is ready. Add `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN` to enable direct feed updates.
        </p>
      )}
    </section>
  );
}

