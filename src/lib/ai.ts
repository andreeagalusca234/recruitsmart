import type { DailyTargetSuggestion } from "@/types";

export async function generateDailyTargets(userId: string): Promise<DailyTargetSuggestion[]> {
  void userId;

  return [
    {
      id: "ai-alixpartners",
      name: "AlixPartners",
      sector: "Turnaround and strategy consulting",
      description: "Consulting firm known for transformation and performance improvement work.",
      size: "2,000+",
      hqLocation: "New York, strong London office",
      careersUrl: "https://www.alixpartners.com/careers/",
      linkedinUrl: "https://www.linkedin.com/company/alixpartners/",
      tier: "TARGET",
      source: "AI_SUGGESTED",
      aiRationale:
        "Strong fit for an LBS MBA targeting strategy work with a bias toward hands-on transformation.",
      vote: "NONE",
      fitScore: 83,
      rationale:
        "Good London presence, MBA-friendly consulting profile, and a practical transformation angle.",
      signals: ["London hiring", "MBA-relevant", "Transformation focus"]
    },
    {
      id: "ai-oliver-wyman",
      name: "Oliver Wyman",
      sector: "Management consulting",
      description: "Global strategy consulting firm with deep financial services work in London.",
      size: "7,000+",
      hqLocation: "New York",
      careersUrl: "https://www.oliverwyman.com/careers.html",
      linkedinUrl: "https://www.linkedin.com/company/oliver-wyman/",
      tier: "DREAM",
      source: "AI_SUGGESTED",
      aiRationale:
        "Maps well to LBS consulting pathways and London financial services strategy exposure.",
      vote: "NONE",
      fitScore: 88,
      rationale:
        "High-signal target for consulting plus strategy roles with visible MBA pathways.",
      signals: ["Consulting", "Financial services", "London office"]
    },
    {
      id: "ai-strategyand",
      name: "Strategy&",
      sector: "Strategy consulting",
      description: "PwC's strategy consulting business with broad corporate strategy work.",
      size: "3,000+",
      hqLocation: "London and global network",
      careersUrl: "https://www.strategyand.pwc.com/gx/en/careers.html",
      linkedinUrl: "https://www.linkedin.com/company/strategyand/",
      tier: "TARGET",
      source: "AI_SUGGESTED",
      aiRationale:
        "A strong middle tier consulting target with LBS-relevant corporate strategy work.",
      vote: "NONE",
      fitScore: 81,
      rationale:
        "Good balance of brand, access, and strategic work for a career switcher.",
      signals: ["Strategy", "PwC network", "MBA entry points"]
    },
    {
      id: "ai-kearney",
      name: "Kearney",
      sector: "Management consulting",
      description: "Global consulting firm with operations and strategy heritage.",
      size: "5,000+",
      hqLocation: "Chicago",
      careersUrl: "https://www.kearney.com/careers",
      linkedinUrl: "https://www.linkedin.com/company/kearney/",
      tier: "TARGET",
      source: "AI_SUGGESTED",
      aiRationale:
        "Strong fit for strategy plus operations roles where prior industry experience can help.",
      vote: "NONE",
      fitScore: 79,
      rationale:
        "A realistic consulting target with broad London client exposure and MBA recruiting channels.",
      signals: ["Operations", "Strategy", "London"]
    },
    {
      id: "ai-lek",
      name: "L.E.K. Consulting",
      sector: "Strategy consulting",
      description: "Strategy consultancy with private equity, healthcare, and consumer work.",
      size: "2,000+",
      hqLocation: "London and Boston",
      careersUrl: "https://www.lek.com/careers",
      linkedinUrl: "https://www.linkedin.com/company/l-e-k-consulting/",
      tier: "DREAM",
      source: "AI_SUGGESTED",
      aiRationale:
        "London heritage and strong strategy positioning make it a high-quality MBA target.",
      vote: "NONE",
      fitScore: 86,
      rationale:
        "A strong brand for pure strategy, especially if the student can build sector stories quickly.",
      signals: ["Pure strategy", "London roots", "PE exposure"]
    },
    {
      id: "ai-cil",
      name: "CIL Management Consultants",
      sector: "Strategy consulting",
      description: "Boutique strategy consultancy focused on growth and investment diligence.",
      size: "250+",
      hqLocation: "London",
      careersUrl: "https://cil.com/careers/",
      linkedinUrl: "https://www.linkedin.com/company/cil-management-consultants/",
      tier: "SAFETY",
      source: "AI_SUGGESTED",
      aiRationale:
        "Boutique route into strategy work with a London base and pragmatic networking path.",
      vote: "NONE",
      fitScore: 74,
      rationale:
        "A useful safety target for strategy exposure, faster networking loops, and direct outreach.",
      signals: ["Boutique", "London HQ", "Growth strategy"]
    },
    {
      id: "ai-elixirr",
      name: "Elixirr",
      sector: "Consulting",
      description: "Challenger consultancy working across strategy, transformation, and innovation.",
      size: "500+",
      hqLocation: "London",
      careersUrl: "https://www.elixirr.com/careers/",
      linkedinUrl: "https://www.linkedin.com/company/elixirr/",
      tier: "SAFETY",
      source: "AI_SUGGESTED",
      aiRationale:
        "Good London boutique option for candidates who want entrepreneurial consulting exposure.",
      vote: "NONE",
      fitScore: 72,
      rationale:
        "Likely easier to build warm paths than MBB while staying close to strategic work.",
      signals: ["Challenger firm", "Entrepreneurial", "London"]
    },
    {
      id: "ai-monitor",
      name: "Monitor Deloitte",
      sector: "Strategy consulting",
      description: "Deloitte's strategy practice with corporate, growth, and transformation work.",
      size: "Global network",
      hqLocation: "London and global network",
      careersUrl: "https://www.deloitte.com/uk/en/careers.html",
      linkedinUrl: "https://www.linkedin.com/company/deloitte/",
      tier: "TARGET",
      source: "AI_SUGGESTED",
      aiRationale:
        "Useful bridge between consulting brand strength and broad post-MBA strategy roles.",
      vote: "NONE",
      fitScore: 80,
      rationale:
        "Good fit for a consulting target list with practical routes into strategy teams.",
      signals: ["Strategy practice", "MBA pathways", "Large network"]
    },
    {
      id: "ai-roland-berger",
      name: "Roland Berger",
      sector: "Management consulting",
      description: "European strategy consultancy with industrial and growth strategy strengths.",
      size: "3,000+",
      hqLocation: "Munich",
      careersUrl: "https://www.rolandberger.com/en/Careers/",
      linkedinUrl: "https://www.linkedin.com/company/rolandberger/",
      tier: "TARGET",
      source: "AI_SUGGESTED",
      aiRationale:
        "European consulting brand that can fit MBA candidates with international positioning.",
      vote: "NONE",
      fitScore: 78,
      rationale:
        "A credible London target where geography and international MBA story can help.",
      signals: ["European brand", "Strategy", "International"]
    },
    {
      id: "ai-occ",
      name: "OC&C Strategy Consultants",
      sector: "Strategy consulting",
      description: "Strategy consultancy with retail, consumer, leisure, and B2B work.",
      size: "800+",
      hqLocation: "London",
      careersUrl: "https://www.occstrategy.com/en/careers",
      linkedinUrl: "https://www.linkedin.com/company/oc&c-strategy-consultants/",
      tier: "DREAM",
      source: "AI_SUGGESTED",
      aiRationale:
        "Strong London strategy brand and a sensible stretch target for LBS MBA networking.",
      vote: "NONE",
      fitScore: 85,
      rationale:
        "High-quality pure strategy target with sector depth and a strong London footprint.",
      signals: ["London HQ", "Strategy", "Consumer expertise"]
    }
  ];
}

export async function parseJobDescription(jdText: string) {
  void jdText;

  return {
    extractedSkills: ["case problem solving", "stakeholder management", "market sizing", "Excel modelling"],
    fitScore: 78,
    gaps: ["Add one quantified transformation story", "Strengthen sector-specific examples"]
  };
}

export async function generateActionPlan(companyId: string) {
  void companyId;

  return [
    "Map two LBS alumni in the London office",
    "Draft a sector-specific why consulting answer",
    "Complete one case drill focused on profitability",
    "Add deadline and referral owner to the pipeline"
  ];
}

export async function composOutreachMessage(contactId: string, tone: "warm" | "direct" | "curious" = "warm") {
  void contactId;

  return `Hi, I am an LBS MBA exploring post-MBA strategy roles in London. I noticed your path into consulting and would value 15 minutes to learn how your team thinks about MBA hires. I can work around your schedule. Tone: ${tone}.`;
}

export const composeOutreachMessage = composOutreachMessage;

export async function summariseMeetingNotes(notes: string) {
  void notes;

  return [
    "Contact recommended applying early and tailoring the office rationale.",
    "Strong emphasis on concise consulting stories with measurable impact.",
    "Follow up with a thank-you note and one specific question about team fit."
  ];
}

export async function parseLinkedInPDF(fileBuffer: ArrayBuffer | Uint8Array) {
  void fileBuffer;

  return {
    name: "Alex Morgan",
    role: "Engagement Manager",
    company: "Sample Consulting Firm",
    linkedinUrl: "https://www.linkedin.com/in/sample-profile",
    email: null,
    warmthScore: 2
  };
}

export async function suggestContactSearchInstructions(companyId: string) {
  void companyId;

  return [
    "Search LinkedIn for: London Business School MBA company name consultant London",
    "Filter by current company and location: London Area",
    "Prioritise alumni, second-degree connections, and MBA campus ambassadors",
    "Save three profiles and add outreach notes to the contact tracker"
  ];
}
