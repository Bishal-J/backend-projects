"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--surface)] text-[var(--foreground)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <span className="text-xl font-semibold text-[var(--accent)] select-none">
                Campers
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            <Link href="/sign-in">
              <button className="px-4 py-2 text-sm rounded-md text-[var(--foreground)] hover:text-[var(--accent)] transition cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-4 py-2 text-sm rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/login">
            <button className="w-full text-left px-4 py-2 rounded-md text-[var(--foreground)] hover:text-[var(--accent)] transition cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full text-left px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
