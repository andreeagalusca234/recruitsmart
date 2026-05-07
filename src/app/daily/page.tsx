import { DailyTargetCard } from "@/components/DailyTargetCard";
import { generateDailyTargets } from "@/lib/ai";

export default async function DailyPage() {
  const suggestions = await generateDailyTargets("demo-user");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">F1 Daily Target List</p>
        <h1 className="mt-1 text-3xl font-semibold">Daily target list</h1>
        <p className="mt-2 text-muted-foreground">
          Swipe-style company suggestions with upvote, downvote, and skip actions.
        </p>
      </div>
      <DailyTargetCard suggestions={suggestions} />
    </div>
  );
}
