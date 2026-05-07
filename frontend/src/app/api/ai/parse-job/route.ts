import { NextResponse } from "next/server";

import { parseJobDescription } from "@/lib/ai";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { jdText?: string };
  const result = await parseJobDescription(body.jdText ?? "");
  return NextResponse.json(result);
}
