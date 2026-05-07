import { NotificationItem } from "@/components/NotificationItem";
import { Badge } from "@/components/ui/badge";
import { getNotifications } from "@/lib/data";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unread = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-accent">Rank</p>
          <h1 className="mt-1 text-3xl font-semibold">Notification centre</h1>
          <p className="mt-2 text-muted-foreground">Deadlines, follow-ups, warmth decay, and digest placeholders.</p>
        </div>
        <Badge variant={unread ? "default" : "outline"}>{unread} unread</Badge>
      </div>

      <div className="max-w-4xl space-y-3">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
