type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
};

type InstagramApiResponse = {
  data?: InstagramMedia[];
};

const fallbackPosts: InstagramMedia[] = [
  {
    id: "fallback-1",
    caption: "Trail moments from Nepal with the Airplusnepal team.",
    media_type: "IMAGE",
    media_url: "/information/assets/gallery_1.jpg",
    permalink: "https://www.instagram.com/airplusnepal/",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    caption: "Mountain mornings, local paths, and real trekking stories.",
    media_type: "IMAGE",
    media_url: "/information/assets/gallery_2.jpg",
    permalink: "https://www.instagram.com/airplusnepal/",
    timestamp: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    caption: "A quick look at life on the route in the Himalayas.",
    media_type: "IMAGE",
    media_url: "/information/assets/gallery_3.jpg",
    permalink: "https://www.instagram.com/airplusnepal/",
    timestamp: new Date().toISOString(),
  },
];

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return Response.json({ ok: true, source: "fallback", posts: fallbackPosts });
  }

  try {
    const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
    const endpoint = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=6`;
    const res = await fetch(endpoint, {
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      return Response.json({ ok: true, source: "fallback", posts: fallbackPosts });
    }

    const json = (await res.json()) as InstagramApiResponse;
    const posts = (json.data || [])
      .filter((item) => !!item.permalink)
      .slice(0, 6)
      .map((item) => ({
        ...item,
        media_url: item.media_url || item.thumbnail_url,
      }));

    if (posts.length === 0) {
      return Response.json({ ok: true, source: "fallback", posts: fallbackPosts });
    }

    return Response.json({ ok: true, source: "instagram", posts });
  } catch {
    return Response.json({ ok: true, source: "fallback", posts: fallbackPosts });
  }
}

