"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckSquare,
  ContactRound,
  Gauge,
  ListTodo,
  Settings,
  Sparkles
} from "lucide-react";

import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Setup",
    tone: "bg-slate-400",
    links: [{ href: "/onboarding", label: "Onboarding", icon: Sparkles }]
  },
  {
    label: "Target",
    tone: "bg-rose-500",
    links: [
      { href: "/dashboard", label: "Dashboard", icon: Gauge },
      { href: "/targets", label: "Targets", icon: Building2 },
      { href: "/daily", label: "Daily list", icon: ListTodo }
    ]
  },
  {
    label: "Identify",
    tone: "bg-amber-500",
    links: [{ href: "/contacts", label: "Contacts", icon: ContactRound }]
  },
  {
    label: "Evaluate",
    tone: "bg-emerald-500",
    links: [{ href: "/pipeline", label: "Pipeline", icon: BriefcaseBusiness }]
  },
  {
    label: "Rank",
    tone: "bg-blue-500",
    links: [{ href: "/notifications", label: "Notifications", icon: Bell }]
  },
  {
    label: "Manage",
    tone: "bg-slate-600",
    links: [{ href: "/settings", label: "Settings", icon: Settings }]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 border-r bg-white">
      <div className="flex h-full flex-col">
        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              RS
            </div>
            <div>
              <p className="text-sm font-semibold">RecruitSmart LBS</p>
              <p className="text-xs text-muted-foreground">MBA recruitment co-pilot</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {groups.map((group) => (
            <div key={group.label} className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <span className={cn("h-2 w-2 rounded-full", group.tone)} />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</p>
              </div>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t p-4">
          <div className="rounded-lg border bg-muted/40 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckSquare className="h-4 w-4 text-emerald-600" />
              Demo mode
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Credentials auth and AI calls are stubbed.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
