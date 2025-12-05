// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaClipboardList, FaChartBar, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';

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
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-white">Truck Inspections</span>
        <div className="flex space-x-4">
          {links.map((link) => {
            // Check if the current pathname matches the link's href
            const isActive = pathname === link.href;
            
            const classes = isActive 
              ? "bg-blue-600 text-white font-bold" // Active link styling
              : "text-gray-300 hover:bg-gray-700 hover:text-white";

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