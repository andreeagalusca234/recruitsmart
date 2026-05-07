import { KanbanBoard } from "@/components/KanbanBoard";
import { getApplications } from "@/lib/data";

export default async function PipelinePage() {
  const applications = await getApplications();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">F12 Pipeline</p>
        <h1 className="mt-1 text-3xl font-semibold">Application pipeline</h1>
        <p className="mt-2 text-muted-foreground">
          Basic kanban board for Researching, Applied, Interview, and Offer stages.
        </p>
      </div>
      <KanbanBoard applications={applications} />
    </div>
  );
}
