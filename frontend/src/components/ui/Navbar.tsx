"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScroll(20);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo_horizontal.svg"
              alt="MindBridge"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <Link 
              href="#how-it-works" 
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="font-semibold shadow-md shadow-primary/10">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
