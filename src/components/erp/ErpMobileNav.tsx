"use client";

import React, { useEffect } from "react";
import { ErpSidebar } from "./ErpSidebar";
import { X } from "lucide-react";

interface ErpMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErpMobileNav: React.FC<ErpMobileNavProps> = ({
  isOpen,
  onClose,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#152a45] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        {/* Close Button */}
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Sidebar content */}
        <ErpSidebar onNavigate={onClose} className="h-full" />
      </div>
    </div>
  );
};
