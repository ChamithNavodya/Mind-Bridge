import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/">
            <Image
              src="/logo_horizontal.svg"
              alt="MindBridge"
              width={120}
              height={32}
              className="h-6 w-auto"
            />
          </Link>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MindBridge. Empowering mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}
