"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ThumbsDown, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import type { Company, CompanyTier, VoteStatus } from "@/types";

const tierVariant: Record<CompanyTier, "dream" | "target" | "safety"> = {
  DREAM: "dream",
  TARGET: "target",
  SAFETY: "safety"
};

export function CompanyCard({ company }: { company: Company }) {
  const [vote, setVote] = useState<VoteStatus>(company.vote);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={tierVariant[company.tier]}>{company.tier}</Badge>
            <Badge variant="muted">{company.source === "AI_SUGGESTED" ? "AI suggested" : "Manual"}</Badge>
          </div>
          <CardTitle className="leading-snug">{company.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{company.sector ?? "Sector pending"}</p>
        </div>
        <FitScoreBadge score={company.fitScore} size="sm" />
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {company.description ?? company.aiRationale ?? "Company intelligence will appear here."}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant={vote === "UPVOTED" ? "default" : "outline"}
            aria-label="Upvote company"
            title="Upvote"
            onClick={() => setVote(vote === "UPVOTED" ? "NONE" : "UPVOTED")}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={vote === "DOWNVOTED" ? "destructive" : "outline"}
            aria-label="Downvote company"
            title="Downvote"
            onClick={() => setVote(vote === "DOWNVOTED" ? "NONE" : "DOWNVOTED")}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground">Vote: {vote.toLowerCase()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-between">
          <Link href={`/targets/${company.id}`}>
            Open intelligence card
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
