"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <header className="w-full bg-[var(--surface)] text-[var(--foreground)] shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with home icon */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Home size={20} className="text-[var(--accent)]" />
              <span className="text-xl font-semibold text-[var(--accent)] select-none">
                Campers
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          {!isAuthPage && (
            <div className="hidden md:flex space-x-4">
              <Link href="/sign-in">
                <button className="px-4 py-2 text-sm rounded-md text-[var(--foreground)] hover:text-[var(--accent)] transition cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-4 py-2 text-sm rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Transparent Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--surface)] shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-[var(--border)]">
          <span className="text-lg font-semibold text-[var(--accent)]">
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col px-4 py-4 space-y-2">
          <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md hover:bg-[var(--accent-light)] text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition cursor-pointer">
              Sign In
            </span>
          </Link>
          <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
            <span className="block px-3 py-2 rounded-md hover:bg-[var(--accent-light)] text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition cursor-pointer">
              Sign Up
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
