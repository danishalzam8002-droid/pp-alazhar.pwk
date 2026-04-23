"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Trophy, Building2, ChevronRight, Database } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState({ santri: 0, alumni: 0, prestasi: 0 });
  const [activeTab, setActiveTab] = useState("Visi");

  // Animate stats
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        santri: Math.floor((1200 / steps) * step),
        alumni: Math.floor((5400 / steps) * step),
        prestasi: Math.floor((320 / steps) * step),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ santri: 1200, alumni: 5400, prestasi: 320 });
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=900&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 text-center text-white mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-normal font-friz leading-tight tracking-tight">
              Membangun Generasi <br className="hidden md:block" />
              <span>Rabbani & Inovatif</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 font-light max-w-2xl mx-auto">
              Menyeimbangkan keunggulan ilmu pengetahuan, adab Islami, dan wawasan global di Pondok Pesantren Al-Azhar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/pendaftaran" 
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-normal text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Pendaftaran Santri Baru <ArrowRight size={20} />
              </Link>
              <Link 
                href="/profil" 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-normal text-lg transition-colors flex items-center justify-center gap-2"
              >
                Jelajahi Profil
              </Link>
            </div>
          </motion.div>
        </div>
        

      </section>

      {/* Info Stats Section */}
      <section className="py-16 md:py-24 bg-white relative z-30 -mt-10 rounded-t-[3rem] shadow-2xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Building2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Sejak 2002</h3>
              <p className="text-slate-500">Berpengalaman Penuh</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-4xl font-extrabold text-slate-800 tabular-nums">{stats.santri}+</h3>
              <p className="text-slate-500">Santri Aktif</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <GraduatesIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-4xl font-extrabold text-slate-800 tabular-nums">{stats.alumni}+</h3>
              <p className="text-slate-500">Alumni Tersebar</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-4xl font-extrabold text-slate-800 tabular-nums">{stats.prestasi}+</h3>
              <p className="text-slate-500">Prestasi Diraih</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Pendidikan & Tentang (Interactive Tabs) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row mb-12 items-end justify-between">
            <div>
              <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-2">TENTANG AL-AZHAR</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-friz">Lembaga Unggulan</h3>
            </div>
            <Link href="/profil" className="hidden md:flex items-center text-primary font-semibold hover:text-amber-500 transition-colors">
              Lihat Profil Lengkap <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="flex bg-white rounded-lg p-1 shadow-sm w-max border border-slate-100">
                 {["Visi", "Misi", "Keunggulan"].map((tab) => (
                   <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-md font-semibold transition-all ${
                      activeTab === tab ? "bg-primary text-white shadow-md" : "text-slate-600 hover:text-primary"
                    }`}
                   >
                     {tab}
                   </button>
                 ))}
               </div>
               
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 min-h-[200px]">
                 {activeTab === "Visi" && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <h4 className="text-2xl font-bold text-slate-800">Menuju Generasi Emas</h4>
                     <p className="text-slate-600 leading-relaxed text-lg">Mewujudkan generasi Muslim yang berakhlakul karimah, berwawasan global, unggul dalam ilmu pengetahuan dan teknologi, serta berjiwa kemandirian yang kuat sesuai ajaran Ahlussunnah Wal Jamaah.</p>
                   </motion.div>
                 )}
                 {activeTab === "Misi" && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <h4 className="text-2xl font-bold text-slate-800">Pendidikan Karakter & Prestasi</h4>
                     <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
                       <li>Menerapkan kurikulum terintegrasi antara ilmu agama dan umum.</li>
                       <li>Meningkatkan kualitas tenaga pendidik profesional.</li>
                       <li>Mengembangkan minat, bakat, dan keterampilan santri.</li>
                     </ul>
                   </motion.div>
                 )}
                 {activeTab === "Keunggulan" && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <h4 className="text-2xl font-bold text-slate-800">Fasilitas & Ekosistem</h4>
                     <p className="text-slate-600 leading-relaxed text-lg">Dilengkapi dengan fasilitas asrama moderen, laboratorium bahasa & sains, perpustakaan luas, serta program ekstrakurikuler yang beragam untuk menunjang kompetensi tingkat nasional dan internasional.</p>
                   </motion.div>
                 )}
               </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&fit=crop" 
                alt="Pondok Pesantren Al-Azhar" 
                className="rounded-3xl shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Publikasi Terbaru */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-2">PUBLIKASI</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-friz">Berita Seputar Pesantren</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-lg group"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Akademik
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-[GANTI_SAMA_BERITA_${item}]?w=600&fit=crop`} 
                    alt={`Berita ${item}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-slate-400 text-sm mb-3">12 April 2026</p>
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">Juara Pertama Lomba Musabaqoh Tilawatil Qur'an Tingkat Provinsi</h4>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                    Prestasi gemilang kembali ditorehkan santri Al-Azhar dengan meraih juara pertama pada MTQ tingkat provinsi tahun ini, membuktikan kualitas pembinaan...
                  </p>
                  <Link href="/publikasi" className="text-primary font-semibold flex items-center group-hover:text-amber-500">
                    Baca Selengkapnya <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/publikasi" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Lihat Semua Publikasi
            </Link>
          </div>
        </div>
      </section>

      {/* Satu Data Highlight */}
      <section className="py-20 bg-slate-900 border-t-4 border-amber-500 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-white">
              <h2 className="text-sm font-bold text-amber-500 tracking-widest uppercase mb-2">TRANSPARANSI YAYASAN</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-6 font-friz">Visualisasi & Data<br />Pondok Pesantren Terpusat</h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
                Sebagai bentuk komitmen kami terhadap tata kelola manajemen institusi yang baik, kami menyajikan "Satu Data Al-Azhar", di mana Anda dapat melihat statistik *real-time* pesantren secara transparan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2">
                  <Database size={20} /> Lihat Dashboard
                </Link>
                <Link href="/satu-data" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2">
                  Katalog Dataset Penuh
                </Link>
              </div>
            </div>
            
            {/* Visual Illusion of Dashboard */}
            <div className="md:w-1/2 w-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl skew-x-[-5deg] rotate-y-[-10deg] transform transition-transform hover:skew-x-0 hover:rotate-y-0 duration-700">
                 <div className="flex justify-between items-center mb-6">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">satudata.alazhar.sch.id</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="h-16 bg-white/10 rounded-xl relative overflow-hidden">
                     <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-amber-500/50"></div>
                   </div>
                   <div className="h-16 bg-white/10 rounded-xl relative overflow-hidden">
                     <div className="absolute left-0 bottom-0 top-0 w-3/4 bg-primary/50"></div>
                   </div>
                 </div>
                 <div className="h-32 bg-white/10 rounded-xl w-full flex items-end gap-2 p-4">
                    <div className="w-1/6 bg-blue-400 h-[20%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-blue-400 h-[40%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-amber-400 h-[30%] rounded-t-sm animate-pulse"></div>
                    <div className="w-1/6 bg-blue-400 h-[70%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-blue-400 h-[60%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-blue-400 h-[90%] rounded-t-sm"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Pendaftaran Terakhir */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Menjadi Bagian dari Kami?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Pendaftaran Santri Baru Tahun Ajaran 2026/2027 telah dibuka! Segera daftarkan diri Anda dan raih masa depan gemilang bersama Al-Azhar.
          </p>
          <Link 
            href="/pendaftaran" 
            className="inline-block px-10 py-5 bg-amber-500 text-white font-bold text-xl rounded-full hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)]"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

// Komponen Ikon Lulusan
const GraduatesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
