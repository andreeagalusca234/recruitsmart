import { Bell, BriefcaseBusiness, Building2, ListChecks } from "lucide-react";

import { ChecklistPanel } from "@/components/ChecklistPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplications, getChecklistItems, getCompanies, getNotifications, getUserProfile } from "@/lib/data";

export default async function DashboardPage() {
  const [user, companies, applications, checklistItems, notifications] = await Promise.all([
    getUserProfile(),
    getCompanies(),
    getApplications(),
    getChecklistItems(),
    getNotifications()
  ]);

  const openTasks = checklistItems.filter((item) => !item.completed).length;
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-accent">Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold">Welcome back, {user.name?.split(" ")[0] ?? "MBA"}</h1>
          <p className="mt-2 text-muted-foreground">
            Prioritised recruitment actions across targets, contacts, deadlines, and applications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tracked companies", value: companies.length, icon: Building2 },
          { label: "Applications", value: applications.length, icon: BriefcaseBusiness },
          { label: "Open checklist items", value: openTasks, icon: ListChecks },
          { label: "Unread notifications", value: unreadNotifications, icon: Bell }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-md bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Master checklist</h2>
            <p className="mt-1 text-sm text-muted-foreground">F15 placeholder sorted by urgency and pipeline impact.</p>
          </div>
          <ChecklistPanel items={checklistItems} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s operating rhythm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Review the daily target list, refresh any warm contacts, then move the highest-impact application forward.</p>
            <div className="rounded-md border bg-muted/40 p-4">
              <p className="font-medium text-foreground">Suggested order</p>
              <ol className="mt-2 list-decimal space-y-2 pl-5">
                <li>Clear overdue follow-ups.</li>
                <li>Vote on 10 target suggestions.</li>
                <li>Update pipeline stages after outreach.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
