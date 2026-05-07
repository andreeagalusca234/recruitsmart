import { OnboardingWizard } from "@/components/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Setup</p>
        <h1 className="mt-1 text-3xl font-semibold">Onboarding</h1>
        <p className="mt-2 text-muted-foreground">
          Five setup steps for persona, goals, TIER framing, CV upload, and confirmation.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
