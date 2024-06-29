"use client";

import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      {" "}
      <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
        <NavigationMenu />
        <div className="flex flex-col w-full items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">404! Page not found </h1>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="rounded-lg shadow-lg">
                Go to Projects
              </Button>
            </Link>
            <Link href="/">
              <Button variant="default" className="rounded-lg shadow-lg">
                Notify the developers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
