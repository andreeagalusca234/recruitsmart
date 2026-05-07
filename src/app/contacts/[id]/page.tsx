import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail } from "lucide-react";

import { MeetingNoteForm } from "@/components/MeetingNoteForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContact } from "@/lib/data";
import { formatDate, formatRelativeDate } from "@/lib/utils";

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const contact = await getContact(params.id);
  if (!contact) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/contacts">
            <ChevronLeft className="h-4 w-4" />
            Back to contacts
          </Link>
        </Button>
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <Badge variant={contact.company.tier === "DREAM" ? "dream" : contact.company.tier === "TARGET" ? "target" : "safety"}>
              {contact.company.name}
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold">{contact.name}</h1>
            <p className="mt-2 text-muted-foreground">{contact.role ?? "Role pending"}</p>
          </div>
          {contact.email ? (
            <Button asChild variant="outline">
              <a href={`mailto:${contact.email}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[360px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Warmth score</span>
              <span className="font-semibold">{contact.warmthScore}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Source</span>
              <Badge variant="muted">{contact.source.replaceAll("_", " ")}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Last interaction</p>
              <p className="mt-1 font-medium">{formatRelativeDate(contact.lastInteractionAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Notes</p>
              <p className="mt-1">{contact.notes ?? "No notes yet."}</p>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Meeting notes timeline</h2>
            <p className="mt-1 text-sm text-muted-foreground">Capture conversations and stubbed AI summaries.</p>
          </div>
          <div className="space-y-3">
            {contact.meetingNotes.map((note) => (
              <div key={note.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{formatDate(note.date)}</p>
                  {note.followUpNeeded ? <Badge variant="target">Follow-up needed</Badge> : <Badge variant="muted">No follow-up</Badge>}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{note.notes}</p>
                {note.aiSummary ? (
                  <div className="mt-3 rounded-md border bg-muted/40 p-3 text-sm">{note.aiSummary}</div>
                ) : null}
              </div>
            ))}
            {!contact.meetingNotes.length ? (
              <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">No meeting notes captured yet.</div>
            ) : null}
          </div>
          <MeetingNoteForm />
        </section>
      </div>
    </div>
  );
}
