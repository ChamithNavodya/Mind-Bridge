"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageSquare, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Requests", icon: MessageSquare, href: "/requests" },
  { label: "Payments", icon: CreditCard, href: "/payments" },
  { label: "Profile", icon: User, href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6 transition-all", isActive ? "text-primary stroke-[2.5px] scale-110" : "text-muted-foreground")} />
              <span className={cn("text-[10px] font-bold tracking-wide uppercase transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
