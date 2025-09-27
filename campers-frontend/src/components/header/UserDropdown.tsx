"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { CircleUser } from "lucide-react";

export default function UserDropdown() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {user && (
          <>
            {user?.photo ? (
              <Image
                src={`/users/${user.photo}`}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <CircleUser size={24} />
            )}

            <span className="text-sm font-medium text-[var(--foreground)]">
              {user.name}
            </span>
          </>
        )}
      </button>

      {open && user && (
        <div className="absolute right-0 mt-2 w-40 bg-[var(--surface)] border border-[var(--muted)] shadow-md rounded-md z-50">
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
