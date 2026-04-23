"use client";

import { Users, ShieldAlert, FileText, BookOpen, UserCog } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminMenu() {
  const { data: session } = useSession();

  // Hanya tampil untuk admin
  if ((session?.user as { role?: string })?.role !== "admin") return null;

  const adminLinks = [
    { name: "Kelola Data", href: "/dashboard/kelola-data", icon: <Users size={16} /> },
    { name: "Kelola Akun", href: "/dashboard/kelola-akun", icon: <UserCog size={16} /> },
    { name: "Permintaan Login", href: "/dashboard/permintaan-login", icon: <ShieldAlert size={16} /> },
    { name: "Publikasi", href: "/publikasi", icon: <FileText size={16} /> },
    { name: "Azhar Learn", href: "#", icon: <BookOpen size={16} /> },
  ];

  return (
    <div className="container mx-auto px-6 mb-8 mt-2 relative z-20">
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center">
            <ShieldAlert size={16} />
          </div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Pintasan Admin</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 w-full xl:w-auto">
          {adminLinks.map((link, idx) => (
            <Link key={idx} href={link.href}>
              <div 
                className="px-4 py-2 bg-slate-50 hover:bg-amber-500 border border-slate-200 hover:border-amber-500 text-slate-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md"
              >
                {link.icon}
                <span>{link.name}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
