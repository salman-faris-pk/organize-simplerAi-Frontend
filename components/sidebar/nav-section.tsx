"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof Icons;
};

export type NavSectionItems = {
  label: string;
  icon: keyof typeof Icons;
  items: NavItem[];
};

export function NavSection({
  className,
  section,
}: {
  className?: string;
  section: NavSectionItems;
}) {
  const path = usePathname();
  const SectionIcon = Icons[section.icon];

  return (
    <div className={cn("space-y-6 md:space-y-2", className)}>
      <div className="flex items-center px-2">
        <SectionIcon
          width={19}
          height={19}
          strokeWidth={2.5}
          className="stroke-slate-900"
          aria-hidden="true"
        />
        <span className="ml-2 text-lg font-bold text-slate-900/90">
          {section.label}
        </span>
      </div>

      <div className="flex">
        <div className="ml-2.5 w-0.5 bg-slate-300 rounded-full" />
        <ul className="ml-4 space-y-3 md:space-y-1">
          {section.items.map((item) => {
            const Icon = Icons[item.icon];
            const isActive = path === item.href || path.startsWith(item.href + "/");

            return (
              <li key={item.href} className="relative">
                <span
                  className={cn(
                    "absolute -left-5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-colors",
                    isActive ? "bg-slate-800" : "bg-slate-300"
                  )}
                  aria-hidden="true"
                />

                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors",
                    "hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300",
                    isActive && "bg-slate-100"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    width={17}
                    height={17}
                    strokeWidth={2.5}
                    className="stroke-slate-900"
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-slate-800 transition-colors",
                      isActive ? "font-bold" : "font-medium"
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