"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Publikasi", href: "/publikasi" },
    { name: "Katalog Dataset", href: "/satu-data" },
    { name: "Pendaftaran PPDB", href: "/pendaftaran" },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-3 text-slate-800" : "bg-transparent py-5 text-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`p-2 rounded-lg transition-colors ${isScrolled ? "bg-primary text-white" : "bg-white/20 text-white backdrop-blur-md"}`}>
            <GraduationCap className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-normal text-lg md:text-xl leading-none font-friz tracking-wide">Pondok Pesantren</span>
            <span className={`text-sm font-semibold tracking-widest uppercase ${isScrolled ? "text-primary" : "text-white/90"}`}>Al-Azhar</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`hover:text-amber-400 transition-colors relative group py-2 
                ${link.name === "Pendaftaran PPDB" ? "bg-amber-500 text-white px-4 rounded-full font-bold hover:bg-amber-600 hover:text-white" : ""}
              `}
            >
              {link.name}
              {link.name !== "Pendaftaran PPDB" && (
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}

          {/* Authentication State */}
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-amber-500 animate-spin"></div>
          ) : session ? (
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full transition-all group"
            >
              {session.user?.image ? (
                 <img src={session.user.image} alt="User" className="w-6 h-6 rounded-full group-hover:scale-105 transition-transform" />
              ) : (
                <User size={18} className="group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm font-bold truncate max-w-[100px]">{session.user?.name?.split(' ')[0] || "User"}</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all flex items-center gap-2
                ${isScrolled ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white text-white hover:bg-white hover:text-primary"}
              `}
            >
              <User size={18} /> Masuk
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-md text-white shadow-xl border-t border-white/10"
        >
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {status === "authenticated" ? (
              <div className="mt-4 pt-4 border-t border-white/10">
                 <Link 
                   href="/dashboard"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="w-full p-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2 border border-white/20"
                 >
                   {session.user?.image ? (
                     <img src={session.user.image} alt="User" className="w-5 h-5 rounded-full" />
                   ) : (
                     <User size={18} />
                   )}
                   Buka Dashboard
                 </Link>
              </div>
            ) : (
              <Link 
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full p-3 bg-primary text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <User size={18} /> Masuk Portal
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
