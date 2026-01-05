import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileFAB } from "@/components/layout/mobile-fab";
import { HelpButton } from "@/components/help-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-cyan-950/5">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-white/[0.08] bg-background/80 backdrop-blur-xl px-4 md:flex">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
          <ThemeToggle />
        </header>
        <div className="p-4 md:p-6 pb-24 md:pb-6">{children}</div>
      </main>
      <MobileNav />
      <MobileFAB />
      <HelpButton />
    </SidebarProvider>
  );
}
