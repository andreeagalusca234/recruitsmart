import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";
import type { Contact } from "@/types";

function WarmthDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Warmth score ${score} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < score ? "h-2.5 w-2.5 rounded-full bg-amber-500" : "h-2.5 w-2.5 rounded-full bg-muted"}
        />
      ))}
    </div>
  );
}

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{contact.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{contact.role ?? "Role pending"}</p>
          </div>
          <Badge variant={contact.company.tier === "DREAM" ? "dream" : contact.company.tier === "TARGET" ? "target" : "safety"}>
            {contact.company.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
          <span className="text-sm text-muted-foreground">Warmth</span>
          <WarmthDots score={contact.warmthScore} />
        </div>
        <p className="text-sm text-muted-foreground">Last interaction: {formatRelativeDate(contact.lastInteractionAt)}</p>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/contacts/${contact.id}`}>Open contact</Link>
          </Button>
          {contact.linkedinUrl ? (
            <Button asChild variant="ghost" size="icon">
              <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
