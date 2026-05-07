"use client";

import { CompanyCard } from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { useRecruitmentStore } from "@/lib/store";
import type { Company, CompanyTier } from "@/types";

const filters: Array<{ label: string; value: CompanyTier | "ALL" }> = [
  { label: "All", value: "ALL" },
  { label: "Dream", value: "DREAM" },
  { label: "Target", value: "TARGET" },
  { label: "Safety", value: "SAFETY" }
];

export function TargetsView({ companies }: { companies: Company[] }) {
  const { targetTierFilter, setTargetTierFilter } = useRecruitmentStore();
  const visibleCompanies =
    targetTierFilter === "ALL" ? companies : companies.filter((company) => company.tier === targetTierFilter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            type="button"
            variant={targetTierFilter === filter.value ? "default" : "outline"}
            onClick={() => setTargetTierFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {visibleCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
