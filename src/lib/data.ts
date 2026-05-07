import "server-only";

import type {
  Application,
  ChecklistItem,
  Company,
  Contact,
  MeetingNote,
  Notification,
  UserProfile
} from "@/types";

import {
  demoApplications,
  demoChecklistItems,
  demoCompanies,
  demoContacts,
  demoMeetingNotes,
  demoNotifications,
  demoUser
} from "@/lib/demo-data";
import { prisma } from "@/lib/db";

const toIso = (value?: Date | string | null) => (value ? new Date(value).toISOString() : null);

function normalizeJsonArray(value: unknown): Array<{ stage: Application["stage"]; date: string }> {
  return Array.isArray(value)
    ? value.map((item) => ({
        stage: String((item as { stage?: string }).stage ?? "RESEARCHING") as Application["stage"],
        date: String((item as { date?: string }).date ?? new Date().toISOString())
      }))
    : [];
}

export async function getUserProfile(): Promise<UserProfile> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: demoUser.email }
    });

    if (!user) return demoUser;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      careerPersona: user.careerPersona,
      targetRole: user.targetRole,
      targetIndustry: user.targetIndustry,
      targetGeography: user.targetGeography,
      cvUploaded: user.cvUploaded,
      onboardingComplete: user.onboardingComplete
    };
  } catch {
    return demoUser;
  }
}

export async function getCompanies(): Promise<Company[]> {
  try {
    const companies = await prisma.company.findMany({
      orderBy: [{ tier: "asc" }, { name: "asc" }]
    });

    if (!companies.length) return demoCompanies;

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      sector: company.sector,
      size: company.size,
      hqLocation: company.hqLocation,
      careersUrl: company.careersUrl,
      linkedinUrl: company.linkedinUrl,
      tier: company.tier,
      source: company.source,
      aiRationale: company.aiRationale,
      vote: company.vote,
      voteReason: company.voteReason,
      voteNote: company.voteNote,
      fitScore: null,
      createdAt: toIso(company.createdAt) ?? undefined
    }));
  } catch {
    return demoCompanies;
  }
}

export async function getCompany(id: string): Promise<Company | null> {
  const companies = await getCompanies();
  return companies.find((company) => company.id === id) ?? null;
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const contacts = await prisma.contact.findMany({
      include: { company: true },
      orderBy: [{ company: { name: "asc" } }, { warmthScore: "desc" }]
    });

    if (!contacts.length) return demoContacts;

    return contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      role: contact.role,
      email: contact.email,
      linkedinUrl: contact.linkedinUrl,
      warmthScore: contact.warmthScore,
      source: contact.source,
      notes: contact.notes,
      lastInteractionAt: toIso(contact.lastInteractionAt),
      createdAt: toIso(contact.createdAt) ?? undefined,
      company: {
        id: contact.company.id,
        name: contact.company.name,
        tier: contact.company.tier
      }
    }));
  } catch {
    return demoContacts;
  }
}

export async function getContact(id: string): Promise<(Contact & { meetingNotes: MeetingNote[] }) | null> {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        company: true,
        meetingNotes: { orderBy: { date: "desc" } }
      }
    });

    if (contact) {
      return {
        id: contact.id,
        name: contact.name,
        role: contact.role,
        email: contact.email,
        linkedinUrl: contact.linkedinUrl,
        warmthScore: contact.warmthScore,
        source: contact.source,
        notes: contact.notes,
        lastInteractionAt: toIso(contact.lastInteractionAt),
        createdAt: toIso(contact.createdAt) ?? undefined,
        company: {
          id: contact.company.id,
          name: contact.company.name,
          tier: contact.company.tier
        },
        meetingNotes: contact.meetingNotes.map((note) => ({
          id: note.id,
          date: toIso(note.date) ?? new Date().toISOString(),
          notes: note.notes,
          aiSummary: note.aiSummary,
          followUpNeeded: note.followUpNeeded,
          followUpDoneAt: toIso(note.followUpDoneAt)
        }))
      };
    }
  } catch {
    // Fall through to fixture lookup.
  }

  const fallback = demoContacts.find((contact) => contact.id === id);
  if (!fallback) return null;
  return { ...fallback, meetingNotes: demoMeetingNotes[id] ?? [] };
}

export async function getApplications(): Promise<Application[]> {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: { company: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    if (!applications.length) return demoApplications;

    return applications.map((application) => ({
      id: application.id,
      stage: application.stage,
      stageHistory: normalizeJsonArray(application.stageHistory),
      offerDetails: application.offerDetails,
      createdAt: toIso(application.createdAt) ?? undefined,
      updatedAt: toIso(application.updatedAt) ?? undefined,
      job: {
        id: application.job.id,
        companyId: application.job.companyId,
        title: application.job.title,
        url: application.job.url,
        jdText: application.job.jdText,
        sourcePlatform: application.job.sourcePlatform,
        deadline: toIso(application.job.deadline),
        fitScore: application.job.fitScore,
        parsedSkills: application.job.parsedSkills,
        createdAt: toIso(application.job.createdAt) ?? undefined,
        company: {
          id: application.job.company.id,
          name: application.job.company.name,
          tier: application.job.company.tier
        }
      }
    }));
  } catch {
    return demoApplications;
  }
}

export async function getChecklistItems(): Promise<ChecklistItem[]> {
  try {
    const items = await prisma.checklistItem.findMany({
      include: { company: true },
      orderBy: [{ completed: "asc" }, { sortOrder: "asc" }, { dueDate: "asc" }]
    });

    if (!items.length) return demoChecklistItems;

    return items.map((item) => ({
      id: item.id,
      label: item.label,
      completed: item.completed,
      dueDate: toIso(item.dueDate),
      sortOrder: item.sortOrder,
      source: item.source,
      applicationId: item.applicationId,
      company: {
        id: item.company.id,
        name: item.company.name,
        tier: item.company.tier
      }
    }));
  } catch {
    return demoChecklistItems;
  }
}

export async function getNotifications(): Promise<Notification[]> {
  try {
    const notifications = await prisma.notification.findMany({
      include: { company: true },
      orderBy: { createdAt: "desc" }
    });

    if (!notifications.length) return demoNotifications;

    return notifications.map((notification) => ({
      id: notification.id,
      type: notification.type,
      message: notification.message,
      read: notification.read,
      createdAt: toIso(notification.createdAt) ?? new Date().toISOString(),
      company: notification.company
        ? {
            id: notification.company.id,
            name: notification.company.name,
            tier: notification.company.tier
          }
        : null
    }));
  } catch {
    return demoNotifications;
  }
}
