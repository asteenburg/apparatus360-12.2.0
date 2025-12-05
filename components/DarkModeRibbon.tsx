"use client";

// Import the hook using the named export 'useDarkModeStatus'
import { useDarkModeStatus } from './useDarkModeStatus'; 

// CRITICAL: Must use 'export default function' to ensure the component returns ReactNode (JSX or null)
export default function DarkModeRibbon() {
  const isDarkMode = useDarkModeStatus();

  // If not in dark mode, return null (a valid ReactNode), not 'void'.
  if (!isDarkMode) {
    return null;
  }

  return (
    // Ribbon styling: Fixed position at the top, styled for visibility
    <div 
      data-aos="fade-down"
      className="fixed top-0 left-0 w-full z-80 bg-yellow-400 text-gray-900 shadow-xl p-2 text-center text-sm font-semibold transform translate-y-0 transition duration-5000 ease-in-out"
    >
      <i className="fa-solid fa-moon mr-2"></i>
      You are currently viewing this page in **Dark Mode** (System Preference).
    </div>
  );
}