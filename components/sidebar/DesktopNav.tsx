"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { NavSectionItems } from "./nav-section";

export function DesktopNav({section,className}: {className:string; section: NavSectionItems}) {
  
  const path = usePathname();
  const SectionIcon = Icons[section.icon];

  return (
    <div className={className}>
      <div className="sm:flex items-center hidden">
        <SectionIcon
          width={19}
          height={19}
          strokeWidth={2.5}
          className="stroke-slate-900"
        />
        <span className="ml-2 text-lg font-bold text-slate-900/90">
          {section.label}
        </span>
      </div>

      <div className="flex mt-2">
        <div className="ml-2.5 w-0.5 bg-slate-300 rounded-full" />
        <ul role="list" className="ml-4">
          {section.items.map((item) => {
            const Icon = Icons[item.icon];
            const isActive = path === item.href;

            return (
              <li key={item.href} className="relative my-3">
                <span
                  className={cn(
                    isActive ? "bg-slate-800" : "bg-slate-300",
                    "absolute -left-5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
                  )}
                />

                <Link href={item.href} className="flex items-center gap-2">
                  <Icon
                    width={17}
                    height={17}
                    strokeWidth={2.5}
                    className="stroke-slate-900"
                  />
                  <span
                    className={cn(
                      isActive ? "font-bold" : "font-medium",
                      "text-slate-800"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
