import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { resolveRevalidationTags } from "@/lib/revalidation-tags";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const postType: string | undefined = body?.post_type;
  const slug: string | undefined = body?.slug;

  const tags = resolveRevalidationTags(postType, slug);

  for (const tag of tags) {
    revalidateTag(tag, {});
  }

  return NextResponse.json({ ok: true, revalidated: true, tags, slug: slug ?? null });
}
