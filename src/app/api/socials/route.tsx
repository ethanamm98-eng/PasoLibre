import { NextResponse } from "next/server";

// ⏱ simple in-memory cache
let cache: unknown = null;
let lastFetch = 0;
const CACHE_TIME = 1000 * 60 * 60; // 1 hour

export async function GET() {
  const now = Date.now();

  if (cache && now - lastFetch < CACHE_TIME) {
    return NextResponse.json(cache);
  }

  try {
    // Replace with real API calls later
    const instagramFollowers = 1284;
    const tiktokFollowers = 932;

    // simulate "last week"
    const instagramLastWeek = 1200;
    const tiktokLastWeek = 870;

    const data = {
      instagram: instagramFollowers,
      tiktok: tiktokFollowers,
      growth: {
        instagram: instagramFollowers - instagramLastWeek,
        tiktok: tiktokFollowers - tiktokLastWeek,
      },
    };

    cache = data;
    lastFetch = now;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching social data:", err);
    return NextResponse.json({
      instagram: 1200,
      tiktok: 850,
      growth: {
        instagram: 0,
        tiktok: 0,
      },
    });
  }
}
