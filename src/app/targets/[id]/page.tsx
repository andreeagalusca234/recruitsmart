import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, ExternalLink, ListChecks, Plus, UsersRound } from "lucide-react";

import { ChecklistPanel } from "@/components/ChecklistPanel";
import { ContactCard } from "@/components/ContactCard";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { generateActionPlan } from "@/lib/ai";
import { getApplications, getChecklistItems, getCompany, getContacts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function TargetDetailPage({ params }: { params: { id: string } }) {
  const [company, contacts, applications, checklistItems, actionPlan] = await Promise.all([
    getCompany(params.id),
    getContacts(),
    getApplications(),
    getChecklistItems(),
    generateActionPlan(params.id)
  ]);

  if (!company) notFound();

  const companyContacts = contacts.filter((contact) => contact.company.id === company.id);
  const companyApplications = applications.filter((application) => application.job.company.id === company.id);
  const companyChecklist = checklistItems.filter((item) => item.company.id === company.id);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={company.tier === "DREAM" ? "dream" : company.tier === "TARGET" ? "target" : "safety"}>
              {company.tier}
            </Badge>
            <Badge variant="muted">{company.source === "AI_SUGGESTED" ? "AI suggested" : "Manual"}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-semibold">{company.name}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{company.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <FitScoreBadge score={company.fitScore} />
          <Button asChild>
            <Link href={`/targets/${company.id}/add-job`}>
              <Plus className="h-4 w-4" />
              Add job
            </Link>
          </Button>
        </div>
      </div>

      <Tabs
        items={[
          {
            label: "Overview",
            value: "overview",
            content: (
              <div className="grid grid-cols-[1fr_360px] gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company intelligence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{company.aiRationale}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded-md border bg-muted/30 p-4">
                        <p className="text-muted-foreground">Sector</p>
                        <p className="mt-1 font-medium">{company.sector ?? "Pending"}</p>
                      </div>
                      <div className="rounded-md border bg-muted/30 p-4">
                        <p className="text-muted-foreground">HQ / office signal</p>
                        <p className="mt-1 font-medium">{company.hqLocation ?? "Pending"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {company.careersUrl ? (
                        <Button asChild variant="outline">
                          <a href={company.careersUrl} target="_blank" rel="noreferrer">
                            Careers
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : null}
                      {company.linkedinUrl ? (
                        <Button asChild variant="outline">
                          <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                            LinkedIn
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Signals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <UsersRound className="h-4 w-4" />
                        Contacts
                      </span>
                      <span className="font-medium">{companyContacts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <BriefcaseBusiness className="h-4 w-4" />
                        Jobs
                      </span>
                      <span className="font-medium">{companyApplications.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <ListChecks className="h-4 w-4" />
                        Open actions
                      </span>
                      <span className="font-medium">{companyChecklist.filter((item) => !item.completed).length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          },
          {
            label: "Contacts",
            value: "contacts",
            content: companyContacts.length ? (
              <div className="grid grid-cols-3 gap-4">
                {companyContacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">No contacts added yet.</div>
            )
          },
          {
            label: "Jobs",
            value: "jobs",
            content: (
              <div className="space-y-3">
                {companyApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between rounded-lg border bg-card p-4">
                    <div>
                      <p className="font-medium">{application.job.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {application.stage} · deadline {formatDate(application.job.deadline)}
                      </p>
                    </div>
                    <FitScoreBadge score={application.job.fitScore} size="sm" />
                  </div>
                ))}
                {!companyApplications.length ? (
                  <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">No jobs captured yet.</div>
                ) : null}
              </div>
            )
          },
          {
            label: "Action Plan",
            value: "action-plan",
            content: companyChecklist.length ? (
              <ChecklistPanel items={companyChecklist} />
            ) : (
              <div className="space-y-3">
                {actionPlan.map((item, index) => (
                  <div key={item} className="rounded-lg border bg-card p-4 text-sm">
                    <span className="mr-3 rounded-sm bg-muted px-2 py-1 text-xs font-semibold">{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            )
          },
          {
            label: "Notes",
            value: "notes",
            content: (
              <div className="rounded-lg border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  Notes, company hypotheses, interview prep, and outreach drafts will live here in the next iteration.
                </p>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
