'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-6 py-3 flex items-center bg-primary text-neutral shadow-md">
      {/* Logo from /public/logo.png */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Rentwell Logo" width={140} height={36} />
        <h1 className="ml-3 font-bold text-xl text-accent">Rentwell</h1>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Nav links */}
      <nav className="hidden md:flex space-x-6">
        <Link
          href="/superuser"
          className={`hover:text-accent transition-colors ${
            pathname.startsWith("/superuser") ? "font-semibold text-accent" : ""
          }`}
        >
          Superuser
        </Link>
        <Link
          href="/client"
          className={`hover:text-accent transition-colors ${
            pathname.startsWith("/client") ? "font-semibold text-accent" : ""
          }`}
        >
          Client
        </Link>
        <Link
          href="/renter"
          className={`hover:text-accent transition-colors ${
            pathname.startsWith("/renter") ? "font-semibold text-accent" : ""
          }`}
        >
          Renter
        </Link>
      </nav>

      {/* Notifications + User menu */}
      <div className="ml-6 flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative hover:text-accent transition-colors" aria-label="Notifications">
          🔔
          <span className="absolute -top-1 -right-2 bg-accent text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* User avatar */}
        <div className="flex items-center space-x-2 cursor-pointer hover:text-accent transition-colors">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="font-medium">DJ</span>
        </div>
      </div>
    </header>
  );
}