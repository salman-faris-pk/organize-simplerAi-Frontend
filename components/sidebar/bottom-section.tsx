"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { NavItem } from "./nav-section";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function BottomSection({
  className,
  username,
  items,
}: {
  className?: string;
  username: string;
  items: NavItem[];
}) {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
 
  return (
    <div className={cn("flex flex-col gap-4 ml-4 sm:ml-0", className)}>
      <ul role="list" className="flex flex-col gap-2">
        {items.map((item) => {
          const Icon = Icons[item.icon];
          const isActive = path === item.href;
          return (
            <li key={item.href}>  
              <div className="sm:hidden py-2">
                <Tooltip open={open === item.href}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        setOpen(open === item.href ? null : item.href)
                      }
                    >
                      <Icon
                        width={19}
                        height={19}
                        strokeWidth={2.5}
                        className="stroke-slate-800"
                      />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent
                    side="right"
                    align="center"
                    className="bg-transparent text-amber-950 border border-amber-100 px-3 py-1.5 text-sm shadow-lg backdrop-blur">
                    <Link
                      href={item.href}
                      className="font-medium"
                      onClick={() => setOpen(null)}
                    >
                      {item.label}
                    </Link>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* LARGE SCREEN */}
              <Link
                href={item.href}
                className={cn(
                  "hidden sm:flex items-center gap-3 rounded-md py-3 sm:px-0 text-slate-800 hover:bg-amber-100/30 transition",
                  isActive && "bg-amber-100/30 font-semibold"
                )}
              >
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={2.5}
                  className="stroke-slate-800"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 sm:border border-slate-200 sm:px-3 py-2 rounded-md">
        <div className="sm:hidden">
          <Tooltip open={open === "user"}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setOpen(open === "user" ? null : "user")}
                className="h-7 w-7 sm:h-10 sm:w-10 rounded-full bg-slate-900 flex items-center justify-center"
              >
                <span className="text-slate-100 font-bold">
                  {username.slice(0, 2).toUpperCase()}
                </span>
              </button>
            </TooltipTrigger>

            <TooltipContent
              side="right"
              align="center"
              className="
                bg-slate-100
                text-amber-950
                border border-amber-100
                px-3 py-3
                text-sm
                shadow-lg
                backdrop-blur
              "
            >

              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                {username.length > 7 ? `${username.slice(0, 7)}…` : username}
                </span>

                <button
                  onClick={() =>
                    signOut({ callbackUrl: "/login" })
                  }
                  className="text-left text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* LARGE SCREEN USER INFO */}
        <div className="hidden sm:flex items-center gap-3 w-full">
          <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-slate-100 font-bold">
              {username.slice(0, 2).toUpperCase()}
            </span>
          </div>

          <span className="text-slate-800 truncate">
            {username.length > 11 ? `${username.slice(0, 11)}…` : username}
            </span>

          <button
            onClick={() =>
              signOut({ callbackUrl: "/login" })
            }
            className="ml-auto rounded p-2 hover:bg-slate-100 transition"
          >
            <Icons.logout className="h-5 w-5 text-slate-800" />
          </button>
        </div>
      </div>
    </div>
  );
}
