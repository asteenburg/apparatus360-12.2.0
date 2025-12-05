"use client";

import { useEffect } from "react";
import InfoCard from "./InfoCard"; 
import Hero from "./Hero"; 
import MobileInfoCard from "./MobileInfoCard"; // <-- 1. IMPORTED NEW MOBILE COMPONENT
import Footer from "./Footer";



export default function HomePage() {
  // ⬇ Keeps your custom JS exactly the same, but using React
  useEffect(() => {
    const button = document.getElementById("user-menu-button");
    const menu = document.getElementById("user-menu");

    if (!button || !menu) return;

    const toggleMenu = () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));

      menu.classList.toggle("opacity-100", !open);
      menu.classList.toggle("scale-100", !open);
      menu.classList.toggle("opacity-0", open);
      menu.classList.toggle("scale-95", open);
      menu.classList.toggle("pointer-events-none", open);
    };

    button.addEventListener("click", toggleMenu);

    const clickHandler = (e: any) => {
      if (!menu.contains(e.target) && !button.contains(e.target)) {
        if (button.getAttribute("aria-expanded") === "true") toggleMenu();
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      button.removeEventListener("click", toggleMenu);
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="bg-gray-100 m-0 min-h-screen overflow-x-hidden">
      
      <InfoCard />
      <Hero />

      <MobileInfoCard /> 
<Footer />
    </div>
  );
}