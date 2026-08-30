'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Superuser", href: "/superuser" },
  { name: "Client", href: "/client" },
  { name: "Renter", href: "/renter" },
  { name: "Virtual Assistant", href: "/va" },
  { name: "Support Staff", href: "/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 text-xl font-extrabold text-primary border-b border-gray-100 flex items-center space-x-2">
        <span>Rentwell</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
        Rentwell Portal v1.0
      </div>
    </aside>
  );
}