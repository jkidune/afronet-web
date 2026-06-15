import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const postType = body?.post_type;
    const slug = body?.post_name;

    revalidatePath("/");

    if (postType === "post") {
      revalidatePath("/news");
      if (slug) revalidatePath(`/news/${slug}`);
    }

    if (postType === "programme") {
      revalidatePath("/programme");
      if (slug) revalidatePath(`/programme/${slug}`);
    }

    return NextResponse.json({ revalidated: true, postType, slug });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
