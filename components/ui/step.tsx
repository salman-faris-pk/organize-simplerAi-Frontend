"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";


export type StepType = {
  number: number;
  title: string;
};

type StepStatus = "inactive" | "active" | "completed";

type StepProps = {
  step: StepType;
  current: number;
  status?: StepStatus;
};


export function Step({ step, current, status }: StepProps) {

  let derivedStatus: StepStatus = status ?? "inactive";

  if (current > step.number) derivedStatus = "completed";
  if (current === step.number) derivedStatus = "active";
  if (current < step.number) derivedStatus = "inactive";

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={derivedStatus}
        variants={circleVariants}
        transition={{ duration: 0.2 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border-2"
      >
        <AnimatePresence mode="wait">
          {derivedStatus === "completed" ? (
            <CheckIcon key="check" />
          ) : (
            <motion.span
              key="number"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-xl font-semibold"
            >
              {step.number}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={derivedStatus}
        variants={labelVariants}
        transition={{ duration: 0.2 }}
        className={cn(
          "mt-2 w-16 h-6 flex items-center justify-center text-center text-xs leading-tight",
          derivedStatus === "active" ? "font-bold" : "font-semibold"
        )}
      >
        {step.title}
      </motion.div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}


const circleVariants = {
  inactive: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1", 
    color: "#cbd5e1",
  },
  active: {
    backgroundColor: "#ffffff",
    borderColor: "#0f172a",
    color: "#0f172a",
  },
  complete: {
    backgroundColor: "#ffffff",
    borderColor: "#475569", 
    color: "#475569",
  },
};

const labelVariants = {
  inactive: {
    color: "#cbd5e1",
  },
  active: {
    color: "#0f172a",
  },
  complete: {
    color: "#475569",
  },
};
