"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { CalendarDays, GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { formatDate } from "@/lib/utils";
import type { Application, ApplicationStage } from "@/types";

const columns: Array<{ stage: ApplicationStage; label: string; helper: string }> = [
  { stage: "RESEARCHING", label: "Researching", helper: "Triage and warm paths" },
  { stage: "APPLIED", label: "Applied", helper: "Submitted and waiting" },
  { stage: "INTERVIEW", label: "Interview", helper: "Prep and follow-up" },
  { stage: "OFFER", label: "Offer", helper: "Decision and negotiation" }
];

function ApplicationCard({ application }: { application: Application }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
    data: { type: "application" }
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg border bg-white p-4 shadow-sm transition ${
        isDragging ? "z-20 cursor-grabbing opacity-80 shadow-soft" : "cursor-grab"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug">{application.job.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{application.job.company.name}</p>
        </div>
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="space-y-2">
          <Badge variant={application.job.company.tier === "DREAM" ? "dream" : application.job.company.tier === "TARGET" ? "target" : "safety"}>
            {application.job.company.tier}
          </Badge>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(application.job.deadline)}
          </p>
        </div>
        <FitScoreBadge score={application.job.fitScore} size="sm" />
      </div>
    </div>
  );
}

function KanbanColumn({
  stage,
  label,
  helper,
  applications
}: {
  stage: ApplicationStage;
  label: string;
  helper: string;
  applications: Application[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-[520px] rounded-lg border p-4 transition ${
        isOver ? "border-primary bg-primary/5" : "bg-muted/35"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">{label}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <Badge variant="outline">{applications.length}</Badge>
      </div>
      <div className="space-y-3">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
        {!applications.length ? (
          <div className="rounded-md border border-dashed bg-white/70 p-4 text-sm text-muted-foreground">
            Drop applications here.
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function KanbanBoard({ applications: initialApplications }: { applications: Application[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const byStage = useMemo(() => {
    const grouped = new Map<ApplicationStage, Application[]>();
    columns.forEach((column) => grouped.set(column.stage, []));
    applications.forEach((application) => {
      grouped.get(application.stage)?.push(application);
    });
    return grouped;
  }, [applications]);

  function onDragEnd(event: DragEndEvent) {
    const overStage = event.over?.id as ApplicationStage | undefined;
    if (!overStage || !columns.some((column) => column.stage === overStage)) return;

    setApplications((value) =>
      value.map((application) =>
        application.id === event.active.id
          ? {
              ...application,
              stage: overStage,
              stageHistory: [...application.stageHistory, { stage: overStage, date: new Date().toISOString() }]
            }
          : application
      )
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.stage}
            stage={column.stage}
            label={column.label}
            helper={column.helper}
            applications={byStage.get(column.stage) ?? []}
          />
        ))}
      </div>
    </DndContext>
  );
}
