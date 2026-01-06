"use client";
import { useStepStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import MultiStep from "./multi-steps";
import Link from "next/link";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

export function TopMainContent({
  title,
  displayUploadButton = false,
  step = undefined,
}: {
  title: string;
  displayUploadButton?: boolean;
  step?: number;
}) {
  useEffect(() => {
    useStepStore.setState(() => ({
      current: step ?? 0,
      status: "active",
    }));
  }, [step]);

  return (
    <div className="h-32 relative md:ml-10 flex-none flex items-end justify-center">
      <h1
        className={cn(
          step !== undefined ? "text-4xl lg:text-3xl" : "text-4xl lg:text-4xl",
          "mb-6 ml-10 absolute left-0 bottom-0"
        )}
      >
        {title}
      </h1>
      {step !== undefined && <MultiStep />}
      {displayUploadButton && (
        <Link
          className={cn(
            buttonVariants(),
            "mb-4 mr-4 absolute right-0 bottom-0"
          )}
          href={"/upload"}
        >
          <Icons.upload
            width={18}
            height={18}
            className="mr-2 stroke-slate-100"
          />
          Upload Files
        </Link>
      )}
    </div>
  );
}
