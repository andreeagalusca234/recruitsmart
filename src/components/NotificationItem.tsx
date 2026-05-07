import {
  Bell,
  CalendarClock,
  CheckCircle2,
  Clock,
  ListChecks,
  Mail,
  TrendingDown
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types";

const icons: Record<NotificationType, typeof Bell> = {
  DEADLINE: CalendarClock,
  FOLLOW_UP: Mail,
  WARMTH_DECAY: TrendingDown,
  DAILY_LIST: ListChecks,
  WEEKLY_DIGEST: Bell,
  STAGE_CHANGE: CheckCircle2
};

export function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = icons[notification.type] ?? Bell;

  return (
    <div className="flex items-start gap-4 rounded-lg border bg-card p-4">
      <div className={notification.read ? "rounded-md bg-muted p-2 text-muted-foreground" : "rounded-md bg-primary p-2 text-primary-foreground"}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Badge variant={notification.read ? "muted" : "default"}>{notification.type.replaceAll("_", " ")}</Badge>
          {notification.company ? (
            <Badge variant={notification.company.tier === "DREAM" ? "dream" : notification.company.tier === "TARGET" ? "target" : "safety"}>
              {notification.company.name}
            </Badge>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-medium">{notification.message}</p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {formatRelativeDate(notification.createdAt)}
        </p>
      </div>
      {!notification.read ? <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" /> : null}
    </div>
  );
}
