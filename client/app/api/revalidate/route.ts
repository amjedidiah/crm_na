import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path = typeof body.path === "string" ? body.path : "/";

  revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: path });
}
