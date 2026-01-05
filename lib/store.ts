import { create } from "zustand";

type StepStatus = "inactive" | "active" | "completed";

export const useStepStore = create<{
  current: number;
  status: StepStatus;
}>(() => ({
  current: 0,
  status: "active",
}));
