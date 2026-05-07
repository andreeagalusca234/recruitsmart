import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { JDCaptureForm } from "@/components/JDCaptureForm";
import { Button } from "@/components/ui/button";
import { getCompany } from "@/lib/data";

export default async function AddJobPage({ params }: { params: { id: string } }) {
  const company = await getCompany(params.id);

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={`/targets/${params.id}`}>
            <ChevronLeft className="h-4 w-4" />
            Back to company
          </Link>
        </Button>
        <p className="mt-4 text-sm font-medium text-accent">Evaluate</p>
        <h1 className="mt-1 text-3xl font-semibold">Add job description</h1>
        <p className="mt-2 text-muted-foreground">
          Capture a role for {company?.name ?? "this company"} and preview stubbed parsing output.
        </p>
      </div>
      <JDCaptureForm />
    </div>
  );
}
