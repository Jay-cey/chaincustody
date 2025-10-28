"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-20 md:w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
      <div className="mb-6">
        <Link href="/" className="text-xl font-semibold block px-2 py-1">
          ChainCustody
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/dashboard/upload" className="block px-3 py-2 rounded hover:bg-gray-700">
          Upload Evidence
        </Link>
        <Link href="/dashboard/custody/0x7a8b9c" className="block px-3 py-2 rounded hover:bg-gray-700">
          Sample Custody
        </Link>
      </nav>

      <div className="mt-auto text-xs text-gray-400 px-3 py-2">
        Logged in as: Officer_01
      </div>
    </aside>
  );
}