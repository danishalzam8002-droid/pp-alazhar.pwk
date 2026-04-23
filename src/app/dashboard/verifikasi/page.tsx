"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function VerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const role = (session?.user as { role?: string })?.role;

  // Pertanyaan berdasarkan gender
  const questionContext = role === "santriwan" 
    ? { 
        q: "Siapakah nama Musyrif (Pendamping) Asrama Putra Anda saat ini?",
        a: "ustadz ali" 
      }
    : {
        q: "Siapakah nama Musyrifah (Pendamping) Kamar Putri Anda saat ini?",
        a: "ustadzah fatimah"
      };

  useEffect(() => {
    // Apabila bukan santri, redirect keluar, karena ini khusus santri
    if (status === "authenticated" && !["santriwan", "santriwati"].includes(role)) {
      router.push("/dashboard");
    }
    
    // Cek apakah santri ini di sesi ini sudah verified
    if (session?.user) {
      const verifiedUsersId = localStorage.getItem("verified_session_user");
      if (verifiedUsersId === (session.user as { id?: string }).id) {
         router.push("/dashboard"); // Sudah verified
      }
    }
  }, [status, session, role, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === questionContext.a) {
      // Benar, tandai sudah lolos
      if (session?.user) {
         localStorage.setItem("verified_session_user", (session.user as { id?: string }).id || "");
         router.push("/dashboard");
      }
    } else {
      setError("Jawaban Anda salah. Demi keamanan, Anda akan dikeluarkan otomatis.");
      // Kick user out via NextAuth after delay
      setTimeout(() => {
          signOut({ callbackUrl: "/login" });
      }, 3000);
    }
  };

  if (status === "loading" || !session) return <p>Loading...</p>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-900 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl"
      >
        <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Verifikasi Keamanan Akses</h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Sesuai standar protokol asrama, akun santri memerlukan validasi lintas gender tambahan.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
            <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <p className="text-sm font-bold text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <label className="block text-sm font-bold text-slate-300 mb-2 border-l-4 border-amber-500 pl-3">
               Pertanyaan Keamanan: <br/>
               <span className="text-white text-base font-normal mt-1 block">{questionContext.q}</span>
             </label>
             <input 
               type="text" 
               required
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
               className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-amber-500 transition-colors"
               placeholder="Tuliskan jawaban rahasia..."
             />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            Verifikasi Identitas
          </button>
        </form>

        <div className="mt-6 border-t border-slate-700 pt-6">
           <p className="text-xs text-slate-500 text-center">
             Kuis sementara (Mock): <br/>
             {role === "santriwan" ? "Ketik: ustadz ali" : "Ketik: ustadzah fatimah"}
           </p>
        </div>
      </motion.div>
    </div>
  );
}
