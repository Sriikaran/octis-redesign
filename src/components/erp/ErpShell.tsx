"use client";

import React, { useState } from "react";
import { ErpSidebar } from "./ErpSidebar";
import { ErpTopBar } from "./ErpTopBar";
import { ErpMobileNav } from "./ErpMobileNav";

interface ErpShellProps {
  children: React.ReactNode;
}

export const ErpShell: React.FC<ErpShellProps> = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-stone-100 font-sans text-stone-900 antialiased selection:bg-gold-200 selection:text-brown-900">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
        <ErpSidebar />
      </div>

      {/* Mobile Nav Slide-over */}
      <ErpMobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <ErpTopBar onOpenMobileNav={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};
