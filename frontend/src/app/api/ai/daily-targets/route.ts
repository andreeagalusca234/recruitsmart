import { NextResponse } from "next/server";

import { generateDailyTargets } from "@/lib/ai";

export async function GET() {
  const targets = await generateDailyTargets("demo-user");
  return NextResponse.json({ targets });
}
