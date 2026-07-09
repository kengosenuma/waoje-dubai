import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const NOTE_RSS_URL = "https://note.com/waoje_dubai/rss";

export async function GET() {
  try {
    const res = await fetch(NOTE_RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ error: "note.com RSS の取得に失敗しました" }, { status: 502 });
    }
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xml);

    const rawItems = parsed?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    const posts = items.map((item: Record<string, unknown>) => ({
      title: String(item.title ?? ""),
      url: String(item.link ?? ""),
      pubDate: String(item.pubDate ?? ""),
      thumbnail: String((item["media:thumbnail"] as string) ?? "").split("?")[0],
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("blog RSS fetch error:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
