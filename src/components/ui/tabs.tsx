"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

export function Tabs({ items, defaultValue }: { items: TabItem[]; defaultValue?: string }) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);
  const current = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-md border bg-card p-1">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setActive(item.value)}
            className={cn(
              "focus-ring min-w-28 rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition",
              active === item.value && "bg-primary text-primary-foreground shadow-sm"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
