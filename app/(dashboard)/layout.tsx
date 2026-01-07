import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { MainNav }  from "@/components/sidebar/mainNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex">
      <MainNav username={session?.user?.username ?? "user"} />
      <main className="md:pl-72 pt-14 md:pt-0 w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
