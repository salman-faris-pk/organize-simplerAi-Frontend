"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { NavSectionItems } from "./nav-section";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MobileNav({
  section,
  className,
}: {
  section: NavSectionItems;
  className?: string;
}) {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={className}>
      <ul role="list" className="space-y-1">
        {section.items.map((item) => {
          const Icon = Icons[item.icon];
          const isActive = path === item.href;

          return (
            <li key={item.href} className="flex justify-center my-5">
              <Tooltip open={open === item.href}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      setOpen(open === item.href ? null : item.href)
                    }
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      isActive
                        ? "bg-amber-100/50"
                        : "hover:bg-slate-100"
                    )}
                  >
                    <Icon
                      width={19}
                      height={19}
                      strokeWidth={2.5}
                      className={cn(
                        isActive
                          ? "stroke-amber-700"
                          : "stroke-slate-900"
                      )}
                    />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="right"
                  align="center"
                  className="bg-transparent text-amber-950 border border-amber-100 px-3 py-1.5 text-sm shadow-lg backdrop-blur"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(null)}
                  >
                    {item.label}
                  </Link>
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

