"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, FileUp, MapPin, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const steps = [
  { label: "Persona", icon: BriefcaseBusiness },
  { label: "Goals", icon: Target },
  { label: "TIER", icon: MapPin },
  { label: "CV", icon: FileUp },
  { label: "Confirm", icon: CheckCircle2 }
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const ActiveIcon = steps[step].icon;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="rounded-lg border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Step {step + 1} of 5</p>
            <h1 className="mt-1 text-2xl font-semibold">{steps[step].label}</h1>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground">
            <ActiveIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        {step === 0 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Choose your career persona</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                This tunes how the product prioritises targets, outreach, and checklist actions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["CAREER_SWITCHER", "Career switcher", "Changing industry or function"],
                ["ACCELERATOR", "Accelerator", "Continuing on a faster track"],
                ["GEOGRAPHY_SWITCHER", "Geography switcher", "Moving market or region"]
              ].map(([value, label, helper]) => (
                <label key={value} className="rounded-lg border p-4 hover:border-primary">
                  <input type="radio" name="persona" value={value} defaultChecked={value === "CAREER_SWITCHER"} className="sr-only" />
                  <span className="font-medium">{label}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{helper}</span>
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Set target goals</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep this concise; the assistant will use it to sort companies and tasks later.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-role">Target role</Label>
                <Input id="target-role" defaultValue="Strategy Consultant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-industry">Industry</Label>
                <Input id="target-industry" defaultValue="Consulting" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-geography">Geography</Label>
                <Input id="target-geography" defaultValue="London" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Primary optimisation</Label>
              <Select
                id="priority"
                defaultValue="network"
                options={[
                  { label: "Warm network access", value: "network" },
                  { label: "Highest brand fit", value: "brand" },
                  { label: "Fastest application momentum", value: "momentum" }
                ]}
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">TIER framework</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                RecruitSmart LBS organises the job search into Target, Identify, Evaluate, and Rank.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                ["Target", "Pick dream, target, and safety companies."],
                ["Identify", "Find contacts, openings, and referral paths."],
                ["Evaluate", "Score fit, gaps, and application readiness."],
                ["Rank", "Prioritise actions across deadlines and warmth."]
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg border bg-muted/30 p-4">
                  <Badge variant="outline">{title}</Badge>
                  <p className="mt-3 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Upload CV</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                CV parsing is intentionally stubbed for the MVP scaffold.
              </p>
            </div>
            <label className="grid min-h-48 place-items-center rounded-lg border border-dashed bg-muted/30 p-8 text-center">
              <FileUp className="mb-3 h-8 w-8 text-muted-foreground" />
              <span className="font-medium">Drop CV or browse</span>
              <span className="mt-1 text-sm text-muted-foreground">PDF, DOCX, or plain text placeholder</span>
              <input type="file" className="sr-only" />
            </label>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Confirm setup</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your demo profile is ready to use with seeded consulting targets and placeholder AI support.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Persona</p>
                <p className="mt-1 font-medium">Career switcher</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="mt-1 font-medium">Strategy consulting</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Market</p>
                <p className="mt-1 font-medium">London</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
          Back
        </Button>
        <Button type="button" onClick={() => setStep((value) => Math.min(value + 1, steps.length - 1))}>
          {step === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
