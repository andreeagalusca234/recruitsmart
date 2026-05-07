import { NextResponse } from "next/server";

import { generateActionPlan } from "@/lib/ai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId") ?? "demo-company";
  const checklistItems = await generateActionPlan(companyId);
  return NextResponse.json({ checklistItems });
}
