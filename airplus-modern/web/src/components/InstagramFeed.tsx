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
    <section className="surface-card p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Social</p>
          <h3 className="mt-1 text-xl font-bold md:text-2xl">From our Instagram</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Real updates from the trail at <span className="font-medium text-foreground">@airplusnepal</span>.
          </p>
        </div>
        <a
          href="https://www.instagram.com/airplusnepal/"
          target="_blank"
          rel="noreferrer"
          className="btn-accent px-4 py-2"
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
            className="group overflow-hidden rounded-xl border border-[color:var(--border)] bg-white"
          >
            <div className="relative h-48 sm:h-56">
              <Image
                src={post.media_url || "/information/assets/gallery_1.jpg"}
                alt="Instagram post from Airplusnepal"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-3">
              <p className="text-sm leading-6 text-muted-foreground">{captionPreview(post.caption)}</p>
            </div>
          </a>
        ))}
      </div>

      {source === "fallback" && (
        <p className="mt-3 text-xs text-muted-foreground">
          Live Instagram sync is ready. Add `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN` to enable direct feed updates.
        </p>
      )}
    </section>
  );
}

