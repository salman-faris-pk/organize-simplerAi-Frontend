import { NavItem, NavSection, NavSectionItems } from "@/components/sidebar/nav-section";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import { BottomSection } from "@/components/sidebar/bottom-section";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const pipelines: NavSectionItems = {
  label: "Pipelines",
  icon: "layers",
  items: [
    {
      label: "Text Recognition",
      href: "/text-recognition",
      icon: "textSelect",
    },
    {
      label: "Data Extraction",
      href: "/data-extraction",
      icon: "braces",
    },
    {
      label: "Verification",
      href: "/verification",
      icon: "checkCircle",
    },
  ],
};

const organizedData: NavSectionItems = {
  label: "Organized Data",
  icon: "grid",
  items: [
    {
      label: "Receipts",
      href: "/receipts",
      icon: "receipt",
    },
    {
      label: "Invoices",
      href: "/invoices",
      icon: "invoice",
    },
    {
      label: "Card Statements",
      href: "/card-statements",
      icon: "creditCard",
    },
  ],
};

const bottomItems: NavItem[] = [
  {
    label: "Help",
    href: "/help",
    icon: "help",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex">
      <aside className="fixed inset-y-0 z-50 w-16 sm:w-72 bg-transparent overflow-y-auto border-r-2 border-amber-950/4 sm:border-slate-950/4">
        <div className="flex h-full flex-col gap-y-16 sm:gap-y-6 sm:pl-8 sm:pr-6 pb-4">
          <Link href="/dashboard" className="mt-8 flex items-center gap-3 ml-3.5 sm:ml-0">
            <Image
              src="/logo-org.png"
              alt="Organize Simple"
              width={26}
              height={26}
              priority
            />
            <span className="hidden md:block text-2xl font-semibold bg-linear-to-r from-amber-700 via-orange-600 to-rose-800 bg-clip-text text-transparent drop-shadow-md">
              EXTR∆CT∆
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <NavSection className="mt-6" section={pipelines} />
            <NavSection className="mt-10" section={organizedData} />

            <BottomSection
              className="mt-auto"
              username={session?.user?.username ?? "Default"}
              items={bottomItems}
            />
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pl-16.5 sm:pl-72 w-full min-h-screen">{children}</main>
    </div>
  );
}
