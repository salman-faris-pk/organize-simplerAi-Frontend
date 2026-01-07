"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { NavItem } from "./nav-section";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

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
  return (
    <div className={className}>
      <div className="flex mb-4 md:mb-0">
        <ul role="list" className="mt-1">
          {items.map((item, index) => {
            const Icon = Icons[item.icon];
            return (
              <Link
                className="flex items-center ml-1 my-4 md:my-3"
                key={index}
                href={item.href}
              >
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={2.5}
                  className="inline-block stroke-slate-900"
                />
                <span
                  className={cn(
                    path === item.href ? "font-bold text-amber-800" : "font-medium text-slate-800",
                    "ml-2"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      <div
        className={cn(
          className,
          "flex items-center border rounded-md border-slate-200 py-3 px-2.5 -ml-2"
        )}
      >
        <div className="rounded-full bg-slate-900 h-10 w-10 flex flex-none items-center justify-center">
          <span className="text-slate-100 font-bold">
            {`${username.slice(0, 1).toUpperCase()}${username.slice(1, 2)}`}
          </span>
        </div>
        <span className="ml-2 text-slate-800 text-ellipsis overflow-hidden">
          {username.length > 11 ? username.slice(0, 11) : username}
        </span>
        <div
          onClick={() => {
            signOut({
              callbackUrl: "/login",
            });
          }}
          className="ml-auto p-2 hover:cursor-pointer hover:bg-slate-100 hover:rounded"
        >
          <Icons.logout className="h-5 w-5 text-slate-800 hover:text-slate-600" />
        </div>
      </div>
    </div>
  );
}