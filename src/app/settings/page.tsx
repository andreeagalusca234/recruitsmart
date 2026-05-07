import Link from "next/link";
import { RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getUserProfile } from "@/lib/data";

export default async function SettingsPage() {
  const user = await getUserProfile();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Manage</p>
        <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Profile, onboarding reset, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="persona">Persona</Label>
                <Select
                  id="persona"
                  defaultValue={user.careerPersona}
                  options={[
                    { label: "Career switcher", value: "CAREER_SWITCHER" },
                    { label: "Accelerator", value: "ACCELERATOR" },
                    { label: "Geography switcher", value: "GEOGRAPHY_SWITCHER" }
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-role">Role</Label>
                <Input id="target-role" defaultValue={user.targetRole ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-market">Market</Label>
                <Input id="target-market" defaultValue={user.targetGeography ?? ""} />
              </div>
            </div>
            <Button type="button">Save profile</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={user.onboardingComplete ? "default" : "outline"}>
                  {user.onboardingComplete ? "Complete" : "Incomplete"}
                </Badge>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="/onboarding">
                  <RefreshCcw className="h-4 w-4" />
                  Re-run onboarding
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {["Deadline reminders", "Follow-up prompts", "Daily target list", "Weekly digest"].map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <Checkbox defaultChecked />
                  {label}
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
