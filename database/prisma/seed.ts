import {
  ApplicationStage,
  CareerPersona,
  ChecklistSource,
  CompanySource,
  CompanyTier,
  ContactSource,
  JobSourcePlatform,
  NotificationType,
  Prisma,
  PrismaClient,
  VoteStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.meetingNote.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany({
    where: { email: "demo@london.edu" }
  });

  const user = await prisma.user.create({
    data: {
      email: "demo@london.edu",
      name: "Maya Patel",
      careerPersona: CareerPersona.CAREER_SWITCHER,
      targetRole: "Strategy Consultant",
      targetIndustry: "Consulting",
      targetGeography: "London",
      cvUploaded: true,
      onboardingComplete: true
    }
  });

  const companies = await Promise.all(
    [
      {
        name: "McKinsey & Company",
        description: "Global management consulting firm with a major London office.",
        sector: "Management consulting",
        size: "45,000+",
        hqLocation: "New York",
        careersUrl: "https://www.mckinsey.com/careers",
        linkedinUrl: "https://www.linkedin.com/company/mckinsey/",
        tier: CompanyTier.DREAM,
        source: CompanySource.AI_SUGGESTED,
        aiRationale: "Strong MBA pathway and direct fit for strategy consulting ambitions.",
        vote: VoteStatus.UPVOTED
      },
      {
        name: "Boston Consulting Group",
        description: "Strategy consulting firm with broad post-MBA recruiting channels.",
        sector: "Management consulting",
        size: "30,000+",
        hqLocation: "Boston",
        careersUrl: "https://careers.bcg.com/",
        linkedinUrl: "https://www.linkedin.com/company/boston-consulting-group/",
        tier: CompanyTier.DREAM,
        source: CompanySource.AI_SUGGESTED,
        aiRationale: "High fit for strategy roles, London MBA hiring, and alumni access.",
        vote: VoteStatus.NONE
      },
      {
        name: "Bain & Company",
        description: "Consulting firm known for strategy, private equity, and results delivery.",
        sector: "Management consulting",
        size: "19,000+",
        hqLocation: "Boston",
        careersUrl: "https://www.bain.com/careers/",
        linkedinUrl: "https://www.linkedin.com/company/bain-and-company/",
        tier: CompanyTier.DREAM,
        source: CompanySource.AI_SUGGESTED,
        aiRationale: "Strong LBS brand match with a private equity strategy angle.",
        vote: VoteStatus.NONE
      },
      {
        name: "Deloitte",
        description: "Large professional services firm with strategy and transformation practices.",
        sector: "Consulting",
        size: "450,000+",
        hqLocation: "London and global network",
        careersUrl: "https://www.deloitte.com/uk/en/careers.html",
        linkedinUrl: "https://www.linkedin.com/company/deloitte/",
        tier: CompanyTier.TARGET,
        source: CompanySource.MANUAL,
        aiRationale: "Good route into strategy and transformation with broad London hiring.",
        vote: VoteStatus.UPVOTED
      },
      {
        name: "Accenture Strategy",
        description: "Strategy and consulting practice with digital transformation work.",
        sector: "Strategy and technology consulting",
        size: "700,000+",
        hqLocation: "Dublin",
        careersUrl: "https://www.accenture.com/gb-en/careers",
        linkedinUrl: "https://www.linkedin.com/company/accenture/",
        tier: CompanyTier.TARGET,
        source: CompanySource.MANUAL,
        aiRationale: "Practical fit for strategy roles with a digital transformation flavour.",
        vote: VoteStatus.NONE
      },
      {
        name: "EY-Parthenon",
        description: "Strategy consultancy inside EY with corporate and transaction strategy work.",
        sector: "Strategy consulting",
        size: "9,000+",
        hqLocation: "Boston and global network",
        careersUrl: "https://www.ey.com/en_uk/careers",
        linkedinUrl: "https://www.linkedin.com/company/ey-parthenon/",
        tier: CompanyTier.TARGET,
        source: CompanySource.AI_SUGGESTED,
        aiRationale: "Strong strategy brand with MBA-relevant London opportunities.",
        vote: VoteStatus.NONE
      },
      {
        name: "CIL Management Consultants",
        description: "London-based growth strategy and diligence consultancy.",
        sector: "Boutique strategy consulting",
        size: "250+",
        hqLocation: "London",
        careersUrl: "https://cil.com/careers/",
        linkedinUrl: "https://www.linkedin.com/company/cil-management-consultants/",
        tier: CompanyTier.SAFETY,
        source: CompanySource.AI_SUGGESTED,
        aiRationale: "Boutique safety option with direct London networking paths.",
        vote: VoteStatus.NONE
      },
      {
        name: "Elixirr",
        description: "Challenger consultancy focused on strategy, innovation, and transformation.",
        sector: "Boutique consulting",
        size: "500+",
        hqLocation: "London",
        careersUrl: "https://www.elixirr.com/careers/",
        linkedinUrl: "https://www.linkedin.com/company/elixirr/",
        tier: CompanyTier.SAFETY,
        source: CompanySource.MANUAL,
        aiRationale: "Good safety option for entrepreneurial consulting experience.",
        vote: VoteStatus.NONE
      }
    ].map((company) =>
      prisma.company.create({
        data: {
          ...company,
          userId: user.id
        }
      })
    )
  );

  const byName = new Map(companies.map((company) => [company.name, company]));

  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("McKinsey & Company")!.id,
        name: "Aisha Khan",
        role: "Engagement Manager",
        email: "aisha.khan@example.com",
        linkedinUrl: "https://www.linkedin.com/in/aisha-khan-example",
        warmthScore: 4,
        source: ContactSource.MANUAL,
        notes: "LBS alum, open to a coffee chat after exams.",
        lastInteractionAt: new Date("2026-05-01T09:00:00.000Z")
      }
    }),
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("McKinsey & Company")!.id,
        name: "Thomas Reed",
        role: "Associate Partner",
        email: "thomas.reed@example.com",
        linkedinUrl: "https://www.linkedin.com/in/thomas-reed-example",
        warmthScore: 3,
        source: ContactSource.LINKEDIN_PDF,
        notes: "Second-degree connection through consulting club.",
        lastInteractionAt: new Date("2026-04-23T12:00:00.000Z")
      }
    }),
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("Boston Consulting Group")!.id,
        name: "Priya Narayan",
        role: "Project Leader",
        email: "priya.narayan@example.com",
        linkedinUrl: "https://www.linkedin.com/in/priya-narayan-example",
        warmthScore: 5,
        source: ContactSource.MANUAL,
        notes: "Met at LBS consulting trek.",
        lastInteractionAt: new Date("2026-05-04T17:30:00.000Z")
      }
    }),
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("Boston Consulting Group")!.id,
        name: "James Whitmore",
        role: "Principal",
        email: "james.whitmore@example.com",
        linkedinUrl: "https://www.linkedin.com/in/james-whitmore-example",
        warmthScore: 2,
        source: ContactSource.LINKEDIN_PDF,
        notes: "Relevant consumer practice background.",
        lastInteractionAt: new Date("2026-04-10T08:45:00.000Z")
      }
    }),
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("Bain & Company")!.id,
        name: "Sophia Chen",
        role: "Consultant",
        email: "sophia.chen@example.com",
        linkedinUrl: "https://www.linkedin.com/in/sophia-chen-example",
        warmthScore: 3,
        source: ContactSource.MANUAL,
        notes: "Recent MBA hire; useful for interview prep.",
        lastInteractionAt: new Date("2026-04-29T14:15:00.000Z")
      }
    }),
    prisma.contact.create({
      data: {
        userId: user.id,
        companyId: byName.get("Deloitte")!.id,
        name: "Omar Haddad",
        role: "Senior Manager",
        email: "omar.haddad@example.com",
        linkedinUrl: "https://www.linkedin.com/in/omar-haddad-example",
        warmthScore: 4,
        source: ContactSource.MANUAL,
        notes: "Shared strategy project background.",
        lastInteractionAt: new Date("2026-05-02T10:20:00.000Z")
      }
    })
  ]);

  await prisma.meetingNote.createMany({
    data: [
      {
        contactId: contacts[0].id,
        date: new Date("2026-05-01T09:00:00.000Z"),
        notes:
          "Discussed London office staffing, importance of crisp personal story, and referral timing.",
        aiSummary:
          "Aisha suggested applying early, tightening the career-switcher story, and following up with a referral-ready CV.",
        followUpNeeded: true
      },
      {
        contactId: contacts[2].id,
        date: new Date("2026-05-04T17:30:00.000Z"),
        notes: "Talked through case prep cadence and how BCG evaluates London office fit.",
        aiSummary:
          "Focus on structured creativity, sector curiosity, and examples of collaborative leadership.",
        followUpNeeded: false,
        followUpDoneAt: new Date("2026-05-05T08:00:00.000Z")
      }
    ]
  });

  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        userId: user.id,
        companyId: byName.get("McKinsey & Company")!.id,
        title: "Associate, London",
        url: "https://www.mckinsey.com/careers",
        jdText: "Work with client teams to solve strategic and operational problems.",
        sourcePlatform: JobSourcePlatform.COMPANY_SITE,
        deadline: new Date("2026-06-14T23:00:00.000Z"),
        fitScore: 84,
        parsedSkills: ["problem solving", "client leadership", "analytics"]
      }
    }),
    prisma.job.create({
      data: {
        userId: user.id,
        companyId: byName.get("Boston Consulting Group")!.id,
        title: "Consultant, London",
        url: "https://careers.bcg.com/",
        jdText: "Partner with clients on strategy, growth, and transformation questions.",
        sourcePlatform: JobSourcePlatform.LINKEDIN,
        deadline: new Date("2026-06-01T23:00:00.000Z"),
        fitScore: 81,
        parsedSkills: ["strategy", "case leadership", "communication"]
      }
    }),
    prisma.job.create({
      data: {
        userId: user.id,
        companyId: byName.get("Deloitte")!.id,
        title: "Strategy Manager, Monitor Deloitte",
        url: "https://www.deloitte.com/uk/en/careers.html",
        jdText: "Lead market entry and commercial strategy projects for senior clients.",
        sourcePlatform: JobSourcePlatform.MYCAREER,
        deadline: new Date("2026-05-22T23:00:00.000Z"),
        fitScore: 76,
        parsedSkills: ["commercial strategy", "market entry", "leadership"]
      }
    }),
    prisma.job.create({
      data: {
        userId: user.id,
        companyId: byName.get("CIL Management Consultants")!.id,
        title: "Consultant, Growth Strategy",
        url: "https://cil.com/careers/",
        jdText: "Support growth strategy and commercial diligence projects.",
        sourcePlatform: JobSourcePlatform.COMPANY_SITE,
        deadline: new Date("2026-04-15T23:00:00.000Z"),
        fitScore: 73,
        parsedSkills: ["growth strategy", "market research", "due diligence"]
      }
    })
  ]);

  const applications = await Promise.all([
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[0].id,
        stage: ApplicationStage.RESEARCHING,
        stageHistory: [{ stage: ApplicationStage.RESEARCHING, date: "2026-04-25T10:00:00.000Z" }]
      }
    }),
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[1].id,
        stage: ApplicationStage.APPLIED,
        stageHistory: [
          { stage: ApplicationStage.RESEARCHING, date: "2026-04-18T10:00:00.000Z" },
          { stage: ApplicationStage.APPLIED, date: "2026-05-03T10:00:00.000Z" }
        ]
      }
    }),
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[2].id,
        stage: ApplicationStage.INTERVIEW,
        stageHistory: [
          { stage: ApplicationStage.RESEARCHING, date: "2026-04-05T10:00:00.000Z" },
          { stage: ApplicationStage.APPLIED, date: "2026-04-20T10:00:00.000Z" },
          { stage: ApplicationStage.INTERVIEW, date: "2026-05-02T10:00:00.000Z" }
        ]
      }
    }),
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[3].id,
        stage: ApplicationStage.OFFER,
        stageHistory: [
          { stage: ApplicationStage.RESEARCHING, date: "2026-03-15T10:00:00.000Z" },
          { stage: ApplicationStage.APPLIED, date: "2026-03-25T10:00:00.000Z" },
          { stage: ApplicationStage.INTERVIEW, date: "2026-04-08T10:00:00.000Z" },
          { stage: ApplicationStage.OFFER, date: "2026-04-28T10:00:00.000Z" }
        ],
        offerDetails: {
          base: "GBP 92,000",
          signingBonus: "GBP 8,000"
        } satisfies Prisma.InputJsonObject
      }
    })
  ]);

  await prisma.checklistItem.createMany({
    data: [
      {
        userId: user.id,
        companyId: byName.get("McKinsey & Company")!.id,
        applicationId: applications[0].id,
        label: "Send follow-up note to Aisha with revised CV",
        completed: false,
        dueDate: new Date("2026-05-08T12:00:00.000Z"),
        sortOrder: 1,
        source: ChecklistSource.AI_GENERATED
      },
      {
        userId: user.id,
        companyId: byName.get("Boston Consulting Group")!.id,
        applicationId: applications[1].id,
        label: "Finish BCG cover letter proofread",
        completed: true,
        dueDate: new Date("2026-05-06T18:00:00.000Z"),
        sortOrder: 2,
        source: ChecklistSource.CUSTOM
      },
      {
        userId: user.id,
        companyId: byName.get("Deloitte")!.id,
        applicationId: applications[2].id,
        label: "Prepare two market-entry cases before Deloitte interview",
        completed: false,
        dueDate: new Date("2026-05-10T18:00:00.000Z"),
        sortOrder: 3,
        source: ChecklistSource.AI_GENERATED
      },
      {
        userId: user.id,
        companyId: byName.get("CIL Management Consultants")!.id,
        applicationId: applications[3].id,
        label: "Compare CIL offer with target compensation range",
        completed: false,
        dueDate: new Date("2026-05-12T09:00:00.000Z"),
        sortOrder: 4,
        source: ChecklistSource.CUSTOM
      }
    ]
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        companyId: byName.get("McKinsey & Company")!.id,
        type: NotificationType.FOLLOW_UP,
        message: "Follow up with Aisha Khan about McKinsey referral timing.",
        read: false,
        createdAt: new Date("2026-05-07T08:00:00.000Z")
      },
      {
        userId: user.id,
        companyId: byName.get("Deloitte")!.id,
        type: NotificationType.DEADLINE,
        message: "Deloitte interview prep checklist is due this weekend.",
        read: false,
        createdAt: new Date("2026-05-06T18:30:00.000Z")
      },
      {
        userId: user.id,
        type: NotificationType.DAILY_LIST,
        message: "Your daily target list is ready with 10 new suggestions.",
        read: true,
        createdAt: new Date("2026-05-06T07:30:00.000Z")
      }
    ]
  });

  console.log("Seeded RecruitSmart LBS demo data.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
