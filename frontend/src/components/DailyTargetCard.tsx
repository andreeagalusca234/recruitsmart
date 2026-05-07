"use client";

import { useMemo, useState } from "react";
import { RotateCcw, ThumbsDown, ThumbsUp, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import type { DailyTargetSuggestion } from "@/types";

export function DailyTargetCard({ suggestions }: { suggestions: DailyTargetSuggestion[] }) {
  const [index, setIndex] = useState(0);
  const [actions, setActions] = useState<Array<{ id: string; action: string }>>([]);
  const current = suggestions[index];
  const completed = index >= suggestions.length;
  const remaining = Math.max(suggestions.length - index, 0);

  const actionSummary = useMemo(
    () => ({
      upvoted: actions.filter((action) => action.action === "upvoted").length,
      downvoted: actions.filter((action) => action.action === "downvoted").length,
      skipped: actions.filter((action) => action.action === "skipped").length
    }),
    [actions]
  );

  function record(action: string) {
    if (!current) return;
    setActions((value) => [...value, { id: current.id, action }]);
    setIndex((value) => value + 1);
  }

  if (completed || !current) {
    return (
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Daily list complete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border bg-emerald-50 p-4 text-center">
              <p className="text-2xl font-semibold text-emerald-700">{actionSummary.upvoted}</p>
              <p className="text-xs text-emerald-800">Upvoted</p>
            </div>
            <div className="rounded-md border bg-rose-50 p-4 text-center">
              <p className="text-2xl font-semibold text-rose-700">{actionSummary.downvoted}</p>
              <p className="text-xs text-rose-800">Downvoted</p>
            </div>
            <div className="rounded-md border bg-slate-50 p-4 text-center">
              <p className="text-2xl font-semibold text-slate-700">{actionSummary.skipped}</p>
              <p className="text-xs text-slate-600">Skipped</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIndex(0);
              setActions([]);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Review again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{remaining} suggestions remaining</span>
        <span>
          {index + 1} of {suggestions.length}
        </span>
      </div>
      <Card className="shadow-soft">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={current.tier === "DREAM" ? "dream" : current.tier === "TARGET" ? "target" : "safety"}>
                {current.tier}
              </Badge>
              <Badge variant="muted">{current.sector}</Badge>
            </div>
            <CardTitle className="text-2xl leading-tight">{current.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{current.description}</p>
          </div>
          <FitScoreBadge score={current.fitScore} />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-md border bg-muted/40 p-4">
            <p className="text-sm font-medium">Rationale</p>
            <p className="mt-2 text-sm text-muted-foreground">{current.rationale}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {current.signals.map((signal) => (
              <Badge key={signal} variant="outline">
                {signal}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button type="button" variant="outline" onClick={() => record("downvoted")}>
              <ThumbsDown className="h-4 w-4" />
              Downvote
            </Button>
            <Button type="button" variant="secondary" onClick={() => record("skipped")}>
              <X className="h-4 w-4" />
              Skip
            </Button>
            <Button type="button" onClick={() => record("upvoted")}>
              <ThumbsUp className="h-4 w-4" />
              Upvote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
