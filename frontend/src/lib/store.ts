"use client";

import { create } from "zustand";

import type { CompanyTier } from "@/types";

type TargetFilter = CompanyTier | "ALL";

type RecruitmentState = {
  targetTierFilter: TargetFilter;
  setTargetTierFilter: (filter: TargetFilter) => void;
};

export const useRecruitmentStore = create<RecruitmentState>((set) => ({
  targetTierFilter: "ALL",
  setTargetTierFilter: (filter) => set({ targetTierFilter: filter })
}));
