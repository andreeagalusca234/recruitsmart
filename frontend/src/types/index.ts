export type CareerPersona = "CAREER_SWITCHER" | "ACCELERATOR" | "GEOGRAPHY_SWITCHER";
export type CompanyTier = "DREAM" | "TARGET" | "SAFETY";
export type CompanySource = "AI_SUGGESTED" | "MANUAL";
export type VoteStatus = "UPVOTED" | "DOWNVOTED" | "NONE";
export type ContactSource = "MANUAL" | "LINKEDIN_PDF";
export type JobSourcePlatform = "LINKEDIN" | "INDEED" | "MYCAREER" | "COMPANY_SITE" | "OTHER";
export type ApplicationStage = "RESEARCHING" | "APPLIED" | "INTERVIEW" | "OFFER";
export type ChecklistSource = "AI_GENERATED" | "CUSTOM";
export type NotificationType =
  | "DEADLINE"
  | "FOLLOW_UP"
  | "WARMTH_DECAY"
  | "DAILY_LIST"
  | "WEEKLY_DIGEST"
  | "STAGE_CHANGE";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  careerPersona: CareerPersona;
  targetRole: string | null;
  targetIndustry: string | null;
  targetGeography: string | null;
  cvUploaded: boolean;
  onboardingComplete: boolean;
};

export type Company = {
  id: string;
  name: string;
  description?: string | null;
  sector?: string | null;
  size?: string | null;
  hqLocation?: string | null;
  careersUrl?: string | null;
  linkedinUrl?: string | null;
  tier: CompanyTier;
  source: CompanySource;
  aiRationale?: string | null;
  vote: VoteStatus;
  voteReason?: string | null;
  voteNote?: string | null;
  fitScore?: number | null;
  createdAt?: string;
};

export type Contact = {
  id: string;
  name: string;
  role?: string | null;
  linkedinUrl?: string | null;
  email?: string | null;
  warmthScore: number;
  source: ContactSource;
  notes?: string | null;
  lastInteractionAt?: string | null;
  createdAt?: string;
  company: Pick<Company, "id" | "name" | "tier">;
};

export type MeetingNote = {
  id: string;
  date: string;
  notes: string;
  aiSummary?: string | null;
  followUpNeeded: boolean;
  followUpDoneAt?: string | null;
};

export type Job = {
  id: string;
  companyId: string;
  title: string;
  url?: string | null;
  jdText?: string | null;
  sourcePlatform: JobSourcePlatform;
  deadline?: string | null;
  fitScore?: number | null;
  parsedSkills?: unknown;
  createdAt?: string;
  company?: Pick<Company, "id" | "name" | "tier">;
};

export type Application = {
  id: string;
  stage: ApplicationStage;
  stageHistory: Array<{ stage: ApplicationStage; date: string }>;
  offerDetails?: unknown;
  createdAt?: string;
  updatedAt?: string;
  job: Job & { company: Pick<Company, "id" | "name" | "tier"> };
};

export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string | null;
  sortOrder: number;
  source: ChecklistSource;
  company: Pick<Company, "id" | "name" | "tier">;
  applicationId?: string | null;
};

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  company?: Pick<Company, "id" | "name" | "tier"> | null;
};

export type DailyTargetSuggestion = Company & {
  rationale: string;
  signals: string[];
};
