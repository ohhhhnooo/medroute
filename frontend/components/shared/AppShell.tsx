"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Map, Clock, BarChart, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/lib/utils/cn";
import { TEXT } from "@/lib/constants/text";

interface AppShellProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: TEXT.NAV.DASHBOARD, icon: LayoutDashboard },
  { href: "/map", label: TEXT.NAV.MAP, icon: Map },
  { href: "/history", label: TEXT.NAV.HISTORY, icon: Clock },
  { href: "/analytics", label: TEXT.NAV.ANALYTICS, icon: BarChart },
];

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatcher, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} onClick={onItemClick}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {dispatcher && (
        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-3 rounded-lg bg-white/5 mb-2">
            <p className="text-xs text-white/50">Диспетчер</p>
            <p className="text-sm font-medium text-white">{dispatcher.name}</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5"
          >
            <LogOut className="size-4 mr-3" />
            {TEXT.NAV.LOGOUT}
          </Button>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col fixed h-screen">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <Logo />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
              <SidebarContent onItemClick={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
