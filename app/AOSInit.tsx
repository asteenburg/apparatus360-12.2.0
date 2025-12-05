"use client";

import { useEffect } from "react";

// --- FIX THE TYPESCRIPT ERROR ---
// (Adds AOS to the Window interface so TS stops complaining)
declare global {
  interface Window {
    AOS?: {
      init: (config?: Record<string, any>) => void;
      refresh?: () => void;
      refreshHard?: () => void;
    };
  }
}

export default function AOSInit() {
  useEffect(() => {
    // Only run if window.AOS exists
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({ once: true });
    }
  }, []);

  return null;
}
