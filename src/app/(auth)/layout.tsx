import { buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Acme Inc",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:text-black dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#09090b] dark:bg-white" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "w-fit p-0 text-background"
            )}
          >
            <Icons.logo />
            <span className="hidden xl:inline ml-2 text-lg ">Acme Inc</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This forum has changed the school into a place where I can
              learn better than ever before. &rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}
