"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to check if the 'dark' class is present on the documentElement (<html>).
 * It will read the state after component mounts (hydration) and provide the status.
 */
export const useDarkModeStatus = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // This runs only on the client side after the initial Server Component render.
    if (typeof document !== 'undefined') {
      // Check if the <html> tag has the 'dark' class applied by the layout script
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
    }
  }, []); // Empty dependency array ensures this runs once after mount

  return isDarkMode;
};