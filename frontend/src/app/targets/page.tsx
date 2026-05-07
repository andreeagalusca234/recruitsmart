import { TargetsView } from "@/components/TargetsView";
import { Badge } from "@/components/ui/badge";
import { getCompanies } from "@/lib/data";

export default async function TargetsPage() {
  const companies = await getCompanies();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-accent">Target</p>
          <h1 className="mt-1 text-3xl font-semibold">Company targets</h1>
          <p className="mt-2 text-muted-foreground">Company list with TIER filters, vote state, and fit score shells.</p>
        </div>
        <Badge variant="outline">{companies.length} companies</Badge>
      </div>

      <TargetsView companies={companies} />
    </div>
  );
}
