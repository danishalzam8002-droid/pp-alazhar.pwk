"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogIn, Check, X, Users, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"wali" | "siswa">("wali");
  
  // State untuk form permintaan Wali Santri
  const [showWaliModal, setShowWaliModal] = useState(false);
  const [waliForm, setWaliForm] = useState({ name: "", childName: "", phone: "" });
  const [waliSuccess, setWaliSuccess] = useState(false);

  const router = useRouter();

  // Reset error when switching tabs
  useEffect(() => {
    setError("");
    setUsername("");
    setPassword("");
  }, [loginType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(`Kredensial ${loginType === "wali" ? "Wali/Admin" : "Kartu Jajan"} tidak ditemukan!`);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitWaliRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const currentRequests = JSON.parse(localStorage.getItem("guardian_requests") || "[]");
    
    // Simpan data wali yang meminta login dengan status "pending"
    const newRequest = {
      id: Date.now(),
      ...waliForm,
      status: "pending",
      date: new Date().toLocaleDateString("id-ID")
    };
    
    localStorage.setItem("guardian_requests", JSON.stringify([...currentRequests, newRequest]));
    setWaliSuccess(true);
    
    setTimeout(() => {
      setShowWaliModal(false);
      setWaliSuccess(false);
      setWaliForm({ name: "", childName: "", phone: "" });
    }, 3000);
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full mix-blend-screen filter blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 md:p-8 glass-dark rounded-2xl z-10 mx-4 border border-white/20 shadow-2xl relative"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-friz text-amber-500 mb-2">Portal Masuk</h1>
          <p className="text-slate-300 text-sm">Pilih jenis akun untuk mengakses sistem informasi bersangkutan.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900/80 border border-slate-700/50 p-1 rounded-xl mb-6 shadow-inner relative z-20">
          <button 
            type="button"
            onClick={() => setLoginType("wali")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 relative ${loginType === "wali" ? "bg-primary text-white shadow-[0_0_15px_rgba(30,58,138,0.3)] border border-primary/50 z-10" : "text-slate-400 hover:text-white"}`}
          >
            <Users size={16} /> Wali & Admin
          </button>
          <button 
            type="button"
            onClick={() => setLoginType("siswa")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 relative ${loginType === "siswa" ? "bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)] border border-amber-500/50 z-10" : "text-slate-400 hover:text-white"}`}
          >
            <GraduationCap size={16} /> Siswa
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={loginType}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider ml-1">
                  {loginType === "wali" ? "Nama Pengguna Wali/Admin" : "Nomor Kartu Jajan Santri"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {loginType === "wali" ? <User size={18} className="text-slate-400" /> : <Lock size={18} className="text-slate-400" />}
                  </div>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-500"
                    placeholder={loginType === "wali" ? "Contoh: admin / wali" : "Contoh: santriwan / 12345"}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider ml-1">KATA SANDI (PASSWORD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 px-4 font-bold rounded-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 text-white relative z-10 ${loginType === "wali" ? "bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(30,58,138,0.5)]" : "bg-amber-600 hover:bg-amber-700 shadow-[0_0_15px_rgba(217,119,6,0.5)]"}`}
          >
            {isLoading ? "Memproses..." : (
              <>
                <LogIn size={20} /> Entri ke Dashboard
              </>
            )}
          </button>
        </form>

        {/* Ekstra Opsi Hanya untuk Wali */}
        {loginType === "wali" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-700 flex-1"></div>
              <span className="text-xs text-slate-400 font-medium uppercase">Atau</span>
              <div className="h-px bg-slate-700 flex-1"></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              type="button"
              className="mt-6 w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 relative z-10"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z"/>
              </svg> Lanjutkan dengan Google
            </button>
          </motion.div>
        )}

        {loginType === "wali" ? (
          <p className="text-center text-xs text-slate-400 mt-8 relative z-10">
            Wali santri belum punya akses? <button onClick={() => setShowWaliModal(true)} className="text-amber-500 hover:underline inline font-bold">Ajukan Permintaan Login Wali</button>
          </p>
        ) : (
          <p className="text-center text-xs text-slate-400 mt-8 relative z-10">
            Kartu Jajan tertinggal/hilang? Harap hubungi pengurus asrama.
          </p>
        )}
      </motion.div>

      {/* Modal Permintaan Wali */}
      {showWaliModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-600 rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-[110]"
          >
            {waliSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Permintaan Terkirim!</h3>
                <p className="text-slate-400 text-sm">
                  Pengajuan akun Anda telah dikirim ke Admin. Silakan tunggu konfirmasi melalui WhatsApp yang Anda cantumkan.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
                  <h3 className="text-lg font-bold text-white">Formulir Permintaan Akses Wali</h3>
                  <button onClick={() => setShowWaliModal(false)} className="text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={submitWaliRequest} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-300 font-bold uppercase mb-1 block">Nama Wali Pendaftar</label>
                    <input type="text" required value={waliForm.name} onChange={e => setWaliForm({...waliForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none focus:border-amber-500" placeholder="Contoh: Bapak Hendra" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold uppercase mb-1 block">Nama Lengkap Santri</label>
                    <input type="text" required value={waliForm.childName} onChange={e => setWaliForm({...waliForm, childName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none focus:border-amber-500" placeholder="Nama anak yang mondok" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-bold uppercase mb-1 block">Nomor WhatsApp Aktif</label>
                    <input type="tel" required value={waliForm.phone} onChange={e => setWaliForm({...waliForm, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm outline-none focus:border-amber-500" placeholder="0812xxxxxxxx" />
                  </div>
                  <button type="submit" className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors relative z-10">
                    Kirim Permohonan
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
