"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/ui/BottomNav";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-sm font-heading">M</span>
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-foreground hidden sm:block">
              MindBridge
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-foreground leading-none">{user.name || "User"}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              size="sm"
              className="font-bold border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>
      
      <BottomNav />
    </div>
  );
}
