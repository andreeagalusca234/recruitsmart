import type {
  Application,
  ChecklistItem,
  Company,
  Contact,
  MeetingNote,
  Notification,
  UserProfile
} from "@/types";

export const demoUser: UserProfile = {
  id: "demo-user",
  email: "demo@london.edu",
  name: "Maya Patel",
  careerPersona: "CAREER_SWITCHER",
  targetRole: "Strategy Consultant",
  targetIndustry: "Consulting",
  targetGeography: "London",
  cvUploaded: true,
  onboardingComplete: true
};

export const demoCompanies: Company[] = [
  {
    id: "company-mckinsey",
    name: "McKinsey & Company",
    description: "Global management consulting firm with a major London office.",
    sector: "Management consulting",
    size: "45,000+",
    hqLocation: "New York",
    careersUrl: "https://www.mckinsey.com/careers",
    linkedinUrl: "https://www.linkedin.com/company/mckinsey/",
    tier: "DREAM",
    source: "AI_SUGGESTED",
    aiRationale: "Strong MBA pathway and direct fit for strategy consulting ambitions.",
    vote: "UPVOTED",
    fitScore: 91
  },
  {
    id: "company-bcg",
    name: "Boston Consulting Group",
    description: "Strategy consulting firm with broad post-MBA recruiting channels.",
    sector: "Management consulting",
    size: "30,000+",
    hqLocation: "Boston",
    careersUrl: "https://careers.bcg.com/",
    linkedinUrl: "https://www.linkedin.com/company/boston-consulting-group/",
    tier: "DREAM",
    source: "AI_SUGGESTED",
    aiRationale: "High fit for strategy roles, London MBA hiring, and alumni access.",
    vote: "NONE",
    fitScore: 89
  },
  {
    id: "company-bain",
    name: "Bain & Company",
    description: "Consulting firm known for strategy, private equity, and results delivery.",
    sector: "Management consulting",
    size: "19,000+",
    hqLocation: "Boston",
    careersUrl: "https://www.bain.com/careers/",
    linkedinUrl: "https://www.linkedin.com/company/bain-and-company/",
    tier: "DREAM",
    source: "AI_SUGGESTED",
    aiRationale: "Strong LBS brand match with a private equity strategy angle.",
    vote: "NONE",
    fitScore: 88
  },
  {
    id: "company-deloitte",
    name: "Deloitte",
    description: "Large professional services firm with strategy and transformation practices.",
    sector: "Consulting",
    size: "450,000+",
    hqLocation: "London and global network",
    careersUrl: "https://www.deloitte.com/uk/en/careers.html",
    linkedinUrl: "https://www.linkedin.com/company/deloitte/",
    tier: "TARGET",
    source: "MANUAL",
    aiRationale: "Good route into strategy and transformation with broad London hiring.",
    vote: "UPVOTED",
    fitScore: 82
  },
  {
    id: "company-accenture",
    name: "Accenture Strategy",
    description: "Strategy and consulting practice with digital transformation work.",
    sector: "Strategy and technology consulting",
    size: "700,000+",
    hqLocation: "Dublin",
    careersUrl: "https://www.accenture.com/gb-en/careers",
    linkedinUrl: "https://www.linkedin.com/company/accenture/",
    tier: "TARGET",
    source: "MANUAL",
    aiRationale: "Practical fit for strategy roles with a digital transformation flavour.",
    vote: "NONE",
    fitScore: 77
  },
  {
    id: "company-eyp",
    name: "EY-Parthenon",
    description: "Strategy consultancy inside EY with corporate and transaction strategy work.",
    sector: "Strategy consulting",
    size: "9,000+",
    hqLocation: "Boston and global network",
    careersUrl: "https://www.ey.com/en_uk/careers",
    linkedinUrl: "https://www.linkedin.com/company/ey-parthenon/",
    tier: "TARGET",
    source: "AI_SUGGESTED",
    aiRationale: "Strong strategy brand with MBA-relevant London opportunities.",
    vote: "NONE",
    fitScore: 80
  },
  {
    id: "company-cil",
    name: "CIL Management Consultants",
    description: "London-based growth strategy and diligence consultancy.",
    sector: "Boutique strategy consulting",
    size: "250+",
    hqLocation: "London",
    careersUrl: "https://cil.com/careers/",
    linkedinUrl: "https://www.linkedin.com/company/cil-management-consultants/",
    tier: "SAFETY",
    source: "AI_SUGGESTED",
    aiRationale: "Boutique safety option with direct London networking paths.",
    vote: "NONE",
    fitScore: 73
  },
  {
    id: "company-elixirr",
    name: "Elixirr",
    description: "Challenger consultancy focused on strategy, innovation, and transformation.",
    sector: "Boutique consulting",
    size: "500+",
    hqLocation: "London",
    careersUrl: "https://www.elixirr.com/careers/",
    linkedinUrl: "https://www.linkedin.com/company/elixirr/",
    tier: "SAFETY",
    source: "MANUAL",
    aiRationale: "Good safety option for entrepreneurial consulting experience.",
    vote: "NONE",
    fitScore: 70
  }
];

export const demoContacts: Contact[] = [
  {
    id: "contact-aisha",
    name: "Aisha Khan",
    role: "Engagement Manager",
    email: "aisha.khan@example.com",
    linkedinUrl: "https://www.linkedin.com/in/aisha-khan-example",
    warmthScore: 4,
    source: "MANUAL",
    notes: "LBS alum, open to a coffee chat after exams.",
    lastInteractionAt: "2026-05-01T09:00:00.000Z",
    company: { id: "company-mckinsey", name: "McKinsey & Company", tier: "DREAM" }
  },
  {
    id: "contact-thomas",
    name: "Thomas Reed",
    role: "Associate Partner",
    email: "thomas.reed@example.com",
    linkedinUrl: "https://www.linkedin.com/in/thomas-reed-example",
    warmthScore: 3,
    source: "LINKEDIN_PDF",
    notes: "Second-degree connection through consulting club.",
    lastInteractionAt: "2026-04-23T12:00:00.000Z",
    company: { id: "company-mckinsey", name: "McKinsey & Company", tier: "DREAM" }
  },
  {
    id: "contact-priya",
    name: "Priya Narayan",
    role: "Project Leader",
    email: "priya.narayan@example.com",
    linkedinUrl: "https://www.linkedin.com/in/priya-narayan-example",
    warmthScore: 5,
    source: "MANUAL",
    notes: "Met at LBS consulting trek.",
    lastInteractionAt: "2026-05-04T17:30:00.000Z",
    company: { id: "company-bcg", name: "Boston Consulting Group", tier: "DREAM" }
  },
  {
    id: "contact-james",
    name: "James Whitmore",
    role: "Principal",
    email: "james.whitmore@example.com",
    linkedinUrl: "https://www.linkedin.com/in/james-whitmore-example",
    warmthScore: 2,
    source: "LINKEDIN_PDF",
    notes: "Relevant consumer practice background.",
    lastInteractionAt: "2026-04-10T08:45:00.000Z",
    company: { id: "company-bcg", name: "Boston Consulting Group", tier: "DREAM" }
  },
  {
    id: "contact-sophia",
    name: "Sophia Chen",
    role: "Consultant",
    email: "sophia.chen@example.com",
    linkedinUrl: "https://www.linkedin.com/in/sophia-chen-example",
    warmthScore: 3,
    source: "MANUAL",
    notes: "Recent MBA hire; useful for interview prep.",
    lastInteractionAt: "2026-04-29T14:15:00.000Z",
    company: { id: "company-bain", name: "Bain & Company", tier: "DREAM" }
  },
  {
    id: "contact-omar",
    name: "Omar Haddad",
    role: "Senior Manager",
    email: "omar.haddad@example.com",
    linkedinUrl: "https://www.linkedin.com/in/omar-haddad-example",
    warmthScore: 4,
    source: "MANUAL",
    notes: "Shared strategy project background.",
    lastInteractionAt: "2026-05-02T10:20:00.000Z",
    company: { id: "company-deloitte", name: "Deloitte", tier: "TARGET" }
  }
];

export const demoMeetingNotes: Record<string, MeetingNote[]> = {
  "contact-aisha": [
    {
      id: "note-aisha-1",
      date: "2026-05-01T09:00:00.000Z",
      notes:
        "Discussed London office staffing, importance of crisp personal story, and referral timing.",
      aiSummary:
        "Aisha suggested applying early, tightening the career-switcher story, and following up with a referral-ready CV.",
      followUpNeeded: true,
      followUpDoneAt: null
    }
  ],
  "contact-priya": [
    {
      id: "note-priya-1",
      date: "2026-05-04T17:30:00.000Z",
      notes: "Talked through case prep cadence and how BCG evaluates London office fit.",
      aiSummary:
        "Focus on structured creativity, sector curiosity, and examples of collaborative leadership.",
      followUpNeeded: false,
      followUpDoneAt: "2026-05-05T08:00:00.000Z"
    }
  ]
};

export const demoApplications: Application[] = [
  {
    id: "app-mck-associate",
    stage: "RESEARCHING",
    stageHistory: [{ stage: "RESEARCHING", date: "2026-04-25T10:00:00.000Z" }],
    createdAt: "2026-04-25T10:00:00.000Z",
    updatedAt: "2026-05-01T09:00:00.000Z",
    job: {
      id: "job-mck-associate",
      companyId: "company-mckinsey",
      title: "Associate, London",
      url: "https://www.mckinsey.com/careers",
      jdText: "Work with client teams to solve strategic and operational problems.",
      sourcePlatform: "COMPANY_SITE",
      deadline: "2026-06-14T23:00:00.000Z",
      fitScore: 84,
      parsedSkills: ["problem solving", "client leadership", "analytics"],
      company: { id: "company-mckinsey", name: "McKinsey & Company", tier: "DREAM" }
    }
  },
  {
    id: "app-bcg-consultant",
    stage: "APPLIED",
    stageHistory: [
      { stage: "RESEARCHING", date: "2026-04-18T10:00:00.000Z" },
      { stage: "APPLIED", date: "2026-05-03T10:00:00.000Z" }
    ],
    createdAt: "2026-04-18T10:00:00.000Z",
    updatedAt: "2026-05-03T10:00:00.000Z",
    job: {
      id: "job-bcg-consultant",
      companyId: "company-bcg",
      title: "Consultant, London",
      url: "https://careers.bcg.com/",
      jdText: "Partner with clients on strategy, growth, and transformation questions.",
      sourcePlatform: "LINKEDIN",
      deadline: "2026-06-01T23:00:00.000Z",
      fitScore: 81,
      parsedSkills: ["strategy", "case leadership", "communication"],
      company: { id: "company-bcg", name: "Boston Consulting Group", tier: "DREAM" }
    }
  },
  {
    id: "app-deloitte-strategy",
    stage: "INTERVIEW",
    stageHistory: [
      { stage: "RESEARCHING", date: "2026-04-05T10:00:00.000Z" },
      { stage: "APPLIED", date: "2026-04-20T10:00:00.000Z" },
      { stage: "INTERVIEW", date: "2026-05-02T10:00:00.000Z" }
    ],
    createdAt: "2026-04-05T10:00:00.000Z",
    updatedAt: "2026-05-02T10:00:00.000Z",
    job: {
      id: "job-deloitte-strategy",
      companyId: "company-deloitte",
      title: "Strategy Manager, Monitor Deloitte",
      url: "https://www.deloitte.com/uk/en/careers.html",
      jdText: "Lead market entry and commercial strategy projects for senior clients.",
      sourcePlatform: "MYCAREER",
      deadline: "2026-05-22T23:00:00.000Z",
      fitScore: 76,
      parsedSkills: ["commercial strategy", "market entry", "leadership"],
      company: { id: "company-deloitte", name: "Deloitte", tier: "TARGET" }
    }
  },
  {
    id: "app-cil-consultant",
    stage: "OFFER",
    stageHistory: [
      { stage: "RESEARCHING", date: "2026-03-15T10:00:00.000Z" },
      { stage: "APPLIED", date: "2026-03-25T10:00:00.000Z" },
      { stage: "INTERVIEW", date: "2026-04-08T10:00:00.000Z" },
      { stage: "OFFER", date: "2026-04-28T10:00:00.000Z" }
    ],
    offerDetails: { base: "GBP 92,000", signingBonus: "GBP 8,000" },
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-04-28T10:00:00.000Z",
    job: {
      id: "job-cil-consultant",
      companyId: "company-cil",
      title: "Consultant, Growth Strategy",
      url: "https://cil.com/careers/",
      jdText: "Support growth strategy and commercial diligence projects.",
      sourcePlatform: "COMPANY_SITE",
      deadline: "2026-04-15T23:00:00.000Z",
      fitScore: 73,
      parsedSkills: ["growth strategy", "market research", "due diligence"],
      company: { id: "company-cil", name: "CIL Management Consultants", tier: "SAFETY" }
    }
  }
];

export const demoChecklistItems: ChecklistItem[] = [
  {
    id: "check-1",
    label: "Send follow-up note to Aisha with revised CV",
    completed: false,
    dueDate: "2026-05-08T12:00:00.000Z",
    sortOrder: 1,
    source: "AI_GENERATED",
    company: { id: "company-mckinsey", name: "McKinsey & Company", tier: "DREAM" }
  },
  {
    id: "check-2",
    label: "Finish BCG cover letter proofread",
    completed: true,
    dueDate: "2026-05-06T18:00:00.000Z",
    sortOrder: 2,
    source: "CUSTOM",
    company: { id: "company-bcg", name: "Boston Consulting Group", tier: "DREAM" },
    applicationId: "app-bcg-consultant"
  },
  {
    id: "check-3",
    label: "Prepare two market-entry cases before Deloitte interview",
    completed: false,
    dueDate: "2026-05-10T18:00:00.000Z",
    sortOrder: 3,
    source: "AI_GENERATED",
    company: { id: "company-deloitte", name: "Deloitte", tier: "TARGET" },
    applicationId: "app-deloitte-strategy"
  },
  {
    id: "check-4",
    label: "Compare CIL offer with target compensation range",
    completed: false,
    dueDate: "2026-05-12T09:00:00.000Z",
    sortOrder: 4,
    source: "CUSTOM",
    company: { id: "company-cil", name: "CIL Management Consultants", tier: "SAFETY" },
    applicationId: "app-cil-consultant"
  }
];

export const demoNotifications: Notification[] = [
  {
    id: "notification-1",
    type: "FOLLOW_UP",
    message: "Follow up with Aisha Khan about McKinsey referral timing.",
    read: false,
    createdAt: "2026-05-07T08:00:00.000Z",
    company: { id: "company-mckinsey", name: "McKinsey & Company", tier: "DREAM" }
  },
  {
    id: "notification-2",
    type: "DEADLINE",
    message: "Deloitte interview prep checklist is due this weekend.",
    read: false,
    createdAt: "2026-05-06T18:30:00.000Z",
    company: { id: "company-deloitte", name: "Deloitte", tier: "TARGET" }
  },
  {
    id: "notification-3",
    type: "DAILY_LIST",
    message: "Your daily target list is ready with 10 new suggestions.",
    read: true,
    createdAt: "2026-05-06T07:30:00.000Z",
    company: null
  }
];
