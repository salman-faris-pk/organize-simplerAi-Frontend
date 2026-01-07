"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icons } from "../icons";
import { NavSection, NavSectionItems, NavItem } from "./nav-section";
import { BottomSection } from "./bottom-section";

const pipelines: NavSectionItems = {
  label: "Pipelines",
  icon: "layers",
  items: [
    {
      label: "Text Recognition",
      href: "/text-recognition",
      icon: "textSelect",
    },
    { label: "Data Extraction", href: "/data-extraction", icon: "braces" },
    { label: "Verification", href: "/verification", icon: "checkCircle" },
  ],
};

const organizedData: NavSectionItems = {
  label: "Organized Data",
  icon: "grid",
  items: [
    { label: "Receipts", href: "/receipts", icon: "receipt" },
    { label: "Invoices", href: "/invoices", icon: "invoice" },
    {
      label: "Card Statements",
      href: "/card-statements",
      icon: "creditCard",
    },
  ],
};

const bottomItems: NavItem[] = [
  { label: "Help", href: "/help", icon: "help" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

const sidebarVariants = {
  hidden: {
    x: -320,
    transition: {
      type: "tween" as const,
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const mobileHeaderVariants = {
  hidden: {
    y: -80,
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function MainNav({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="md:hidden fixed top-3 left-3 right-3 z-50 flex h-14 items-center justify-between
            rounded-xl border border-amber-200 bg-amber-50/95 px-4 shadow-sm backdrop-blur"
            variants={mobileHeaderVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo-org.png"
                alt="Extracta"
                width={24}
                height={24}
              />
              <span className="text-lg font-semibold">EXTR∆CT∆</span>
            </Link>

            <button onClick={() => setOpen(true)}>
              <Icons.menu className="h-6 w-6 text-slate-800" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

     {/**mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-65 bg-amber-50 border-r md:hidden"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex h-full flex-col gap-y-6 px-4 pb-4">
                <div className="mt-6 flex items-center justify-between">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <Image
                      src="/logo-org.png"
                      alt="Extracta"
                      width={28}
                      height={28}
                    />
                    <span className="text-2xl font-semibold bg-linear-to-r from-amber-700 via-orange-600 to-rose-800 bg-clip-text text-transparent">
                      EXTR∆CT∆
                    </span>
                  </Link>

                  <button onClick={() => setOpen(false)}>
                    <Icons.chevronleft className="h-6 w-6 text-slate-800" />
                  </button>
                </div>

                <div className="w-full border-b border-b-amber-900/20 mb-2" />

                <nav className="flex flex-1 flex-col">
                  <NavSection section={pipelines} />
                  <NavSection className="mt-10" section={organizedData} />

                  <BottomSection
                    className="mt-auto"
                    username={username}
                    items={bottomItems}
                  />
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/** Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:block md:w-72 md:border-r md:bg-amber-50/25">
        <div className="flex h-full flex-col gap-y-6 px-6 pb-4">
          <div className="mt-6 flex items-center gap-3">
            <Image src="/logo-org.png" alt="Extracta" width={28} height={28} />
            <span className="text-2xl font-semibold bg-linear-to-r from-amber-700 via-orange-600 to-rose-800 bg-clip-text text-transparent">
              EXTR∆CT∆
            </span>
          </div>

          <nav className="flex flex-1 flex-col mt-10 md:mt-2">
            <NavSection section={pipelines} />
            <NavSection className="mt-20 md:mt-10" section={organizedData} />

            <BottomSection
              className="mt-auto"
              username={username}
              items={bottomItems}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}
