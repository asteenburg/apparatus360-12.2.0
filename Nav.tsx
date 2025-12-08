// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaClipboardList, FaChartBar, FaCheckCircle, FaClipboardCheck, FaCubes } from 'react-icons/fa';
import { FaCubesStacked } from 'react-icons/fa6';

export default function Nav() {
  const pathname = usePathname();
  
  // Define all your navigation links here
  const links = [
    { href: '/', icon: <FaHome size={20} />, label: 'Home' },
    { href: '/checklist', icon: <FaClipboardList size={20} />, label: 'Checklist' },
    { href: '/dashboard', icon: <FaChartBar size={20} />,label: 'Dashboard' }, 
    // Add other links as needed
  ];

  return (
    <nav className="absolute top-0 left-0 z-50 w-full p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-gray-500"><Link href="/">Truck Inspections</Link></span>
        <div className="flex md:space-x-4 space-x-0 flex-wrap">
          {links.map((link) => {
            // Check if the current pathname matches the link's href
            const isActive = pathname === link.href;
            
            const classes = isActive 
              ? "bg-blue-600 text-white font-bold" // Active link styling
              : "text-gray-600 hover:bg-gray-700 hover:text-white";

            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`px-4 py-2 rounded-lg transition-colors duration-150 ${classes}`}
              >
                {link.icon}
                {/*{link.label}*/}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}