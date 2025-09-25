"use client";

import { Mail, Phone, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--surface)] text-[var(--foreground)] border-t border-[var(--muted)] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">
            Campers
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Explore, connect, and enjoy the outdoors. Campers helps you discover
            new destinations and build unforgettable experiences in nature.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-[var(--accent)] mb-6">
            Contact Us
          </h2>
          <form className="bg-[var(--background)] p-6 rounded-lg shadow-sm space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent)]"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-[var(--muted)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent)]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-[var(--muted)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-3 text-[var(--accent)]"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-[var(--muted)] bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 rounded-md bg-[var(--accent)] text-white font-medium shadow hover:opacity-90 hover:shadow-md transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-[var(--muted)] text-center py-4 text-sm text-[var(--muted)]">
        © {new Date().getFullYear()} Campers. All rights reserved.
      </div>
    </footer>
  );
}
