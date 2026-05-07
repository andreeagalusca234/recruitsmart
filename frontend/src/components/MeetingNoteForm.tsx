"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summariseMeetingNotes } from "@/lib/ai";

export function MeetingNoteForm() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState<string[]>([]);

  async function previewSummary() {
    const result = await summariseMeetingNotes(notes);
    setSummary(result);
  }

  return (
    <form className="space-y-4 rounded-lg border bg-card p-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="meeting-date">Date</Label>
          <Input id="meeting-date" type="date" defaultValue="2026-05-07" />
        </div>
        <label className="flex items-end gap-2 pb-2 text-sm">
          <Checkbox />
          Follow-up needed
        </label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="meeting-notes">Notes</Label>
        <Textarea
          id="meeting-notes"
          placeholder="Capture context, advice, referral signals, and next steps..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
      {summary.length ? (
        <div className="rounded-md border bg-muted/40 p-4">
          <p className="text-sm font-medium">AI summary preview</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={previewSummary}>
          <Sparkles className="h-4 w-4" />
          Preview summary
        </Button>
        <Button type="button">Save note</Button>
      </div>
    </form>
  );
}
