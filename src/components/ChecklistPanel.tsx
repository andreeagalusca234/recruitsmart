"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import type { ChecklistItem } from "@/types";

export function ChecklistPanel({ items }: { items: ChecklistItem[] }) {
  const [localItems, setLocalItems] = useState(items);

  const sorted = useMemo(
    () => [...localItems].sort((a, b) => Number(a.completed) - Number(b.completed) || a.sortOrder - b.sortOrder),
    [localItems]
  );

  function toggle(id: string) {
    setLocalItems((value) =>
      value.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  }

  function move(id: string, direction: -1 | 1) {
    setLocalItems((value) => {
      const next = [...value].sort((a, b) => a.sortOrder - b.sortOrder);
      const index = next.findIndex((item) => item.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.length) return value;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, order) => ({ ...item, sortOrder: order + 1 }));
    });
  }

  return (
    <div className="space-y-3">
      {sorted.map((item) => (
        <div key={item.id} className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <Checkbox
            checked={item.completed}
            onChange={() => toggle(item.id)}
            aria-label={`Mark ${item.label} complete`}
            className="mt-1"
          />
          <div className="min-w-0 flex-1">
            <p className={item.completed ? "text-sm text-muted-foreground line-through" : "text-sm font-medium"}>
              {item.label}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant={item.company.tier === "DREAM" ? "dream" : item.company.tier === "TARGET" ? "target" : "safety"}>
                {item.company.name}
              </Badge>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(item.dueDate)}
              </span>
              <Badge variant="muted">{item.source === "AI_GENERATED" ? "AI" : "Custom"}</Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button type="button" variant="ghost" size="icon" title="Move up" onClick={() => move(item.id, -1)}>
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" title="Move down" onClick={() => move(item.id, 1)}>
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
