"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function AuthHeader() {
  return (
    <header className="w-full bg-[var(--surface)] text-[var(--foreground)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-[var(--accent)] select-none"
          >
            <Home size={20} />
            <span>Campers</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
