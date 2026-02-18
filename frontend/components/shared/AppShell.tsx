"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Map, Clock, BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { SystemStatus } from "./SystemStatus";
import { TEXT } from "@/lib/constants/text";
import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/lib/utils/cn";

interface AppShellProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: TEXT.NAV.DASHBOARD, icon: LayoutDashboard },
  { href: "/map", label: TEXT.NAV.MAP, icon: Map },
  { href: "/history", label: TEXT.NAV.HISTORY, icon: Clock },
  { href: "/analytics", label: TEXT.NAV.ANALYTICS, icon: BarChart },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatcher, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="flex gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SystemStatus status="online" />
            {dispatcher && (
              <div className="text-sm text-muted-foreground">
                {dispatcher.name}
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              {TEXT.NAV.LOGOUT}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">{children}</main>
    </div>
  );
}
