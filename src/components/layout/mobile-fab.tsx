"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide FAB on form pages
  if (
    pathname.includes("/new") ||
    pathname.includes("/edit") ||
    pathname === "/settings"
  ) {
    return null;
  }

  const actions = [
    {
      label: "새 딜",
      href: "/deals/new",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 3h5v5" />
          <path d="M8 3H3v5" />
          <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
          <path d="m15 9 6-6" />
        </svg>
      ),
      color: "from-cyan-500 to-cyan-400",
    },
    {
      label: "새 브랜드",
      href: "/brands/new",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
      ),
      color: "from-cyan-600 to-cyan-500",
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      {/* Action buttons */}
      <div
        className={cn(
          "absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group"
          >
            <span className="bg-[#18181b]/95 backdrop-blur-xl text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </span>
            <div
              className={cn(
                "w-12 h-12 rounded-full bg-gradient-to-r shadow-lg flex items-center justify-center text-white transition-transform active:scale-95",
                action.color
              )}
            >
              {action.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer",
          isOpen && "rotate-45 shadow-cyan-500/50"
        )}
        aria-label={isOpen ? "Close menu" : "Add new"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
