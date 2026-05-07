"use client";

import { useState } from "react";
import { ClipboardList, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parseJobDescription } from "@/lib/ai";

export function JDCaptureForm() {
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<{ extractedSkills: string[]; fitScore: number; gaps: string[] } | null>(null);

  async function parse() {
    setResult(await parseJobDescription(jdText));
  }

  return (
    <form className="max-w-4xl space-y-5 rounded-lg border bg-card p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="job-url">Job URL</Label>
          <Input id="job-url" placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="source-platform">Source platform</Label>
          <Select
            id="source-platform"
            defaultValue="LINKEDIN"
            options={[
              { label: "LinkedIn", value: "LINKEDIN" },
              { label: "Indeed", value: "INDEED" },
              { label: "MyCareer", value: "MYCAREER" },
              { label: "Company site", value: "COMPANY_SITE" },
              { label: "Other", value: "OTHER" }
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="job-title">Job title</Label>
          <Input id="job-title" placeholder="Associate, Strategy" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="jd-text">Job description</Label>
        <Textarea
          id="jd-text"
          className="min-h-[240px]"
          placeholder="Paste the JD here..."
          value={jdText}
          onChange={(event) => setJdText(event.target.value)}
        />
      </div>
      {result ? (
        <div className="grid grid-cols-[120px_1fr] gap-4 rounded-md border bg-muted/40 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Fit score</p>
            <p className="text-3xl font-semibold">{result.fitScore}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Skills:</span> {result.extractedSkills.join(", ")}
            </p>
            <p>
              <span className="font-medium">Gaps:</span> {result.gaps.join(", ")}
            </p>
          </div>
        </div>
      ) : null}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={parse}>
          <Sparkles className="h-4 w-4" />
          Parse preview
        </Button>
        <Button type="button">
          <ClipboardList className="h-4 w-4" />
          Save job
        </Button>
      </div>
    </form>
  );
}
