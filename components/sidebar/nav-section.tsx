"use client";

import { Icons } from "../icons";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

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

  return (
    <div className={className}>

      <DesktopNav 
       section={section}
       className='hidden sm:block'
      />

      <MobileNav
       section={section}
       className='sm:hidden'
      />

    </div>
  );
}
