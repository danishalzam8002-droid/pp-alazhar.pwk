"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Database, TrendingUp, Users, BookOpen, LogOut, RefreshCw, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminMenu from '@/components/AdminMenu';

export default function DashboardPublik() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isVerifiedSantri, setIsVerifiedSantri] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
       const role = (session.user as any).role;
       if (role === "santriwan" || role === "santriwati") {
          const verifiedId = localStorage.getItem("verified_session_user");
          if (verifiedId !== session.user.id) {
             router.push("/dashboard/verifikasi");
          } else {
             setIsVerifiedSantri(true);
          }
       } else {
          setIsVerifiedSantri(true); // Non-santri bebas masuk
       }
    }
  }, [status, session, router]);

  const santriData = [
    { name: '2021', jumlah: 850 },
    { name: '2022', jumlah: 920 },
    { name: '2023', jumlah: 1050 },
    { name: '2024', jumlah: 1100 },
    { name: '2025', jumlah: 1180 },
    { name: '2026', jumlah: 1254 },
  ];

  const tingkatData = [
    { name: 'TKIT', value: 150 },
    { name: 'SDIT', value: 450 },
    { name: 'SMP Islam', value: 350 },
    { name: 'MA Unggulan', value: 304 },
  ];

  const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#6366f1'];

  if (status === "loading" || (!isVerifiedSantri && status === "authenticated")) {
     return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      {/* Header Dashboard */}
      <div className="bg-slate-900 border-b-4 border-primary pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                Dashboard Publik Al-Azhar
              </h1>
              <p className="text-slate-300 font-light">
                Visualisasi data empiris seputar demografi dan pencapaian instansi.
              </p>
            </div>
            
            <div className="flex gap-4">
              {session && (
                <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50">
                      {session.user?.image ? (
                        <img src={session.user.image} alt="User" className="w-full h-full rounded-full" />
                      ) : (
                        <User className="text-white w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Masuk Sebagai:</p>
                      <p className="text-sm md:text-base font-bold text-amber-500 leading-none capitalize">
                        {(session.user as any)?.role || "User"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/20 pl-4 ml-2">
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })} 
                      title="Ganti Akun"
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase"
                    >
                      <RefreshCw className="w-4 h-4" /> <span className="hidden md:inline">Ganti Akun</span>
                    </button>
                    <button 
                      onClick={() => signOut({ callbackUrl: "/" })} 
                      title="Keluar"
                      className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase"
                    >
                      <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Keluar</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-center hidden lg:block">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Pembaruan Terakhir</p>
                <p className="text-2xl font-bold text-white leading-none">Hari Ini</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilan Khusus Modul Admin */}
      <div className="-mt-8 relative z-20">
         <AdminMenu />
      </div>

      <div className="container mx-auto px-6 mt-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-semibold text-sm">Total Santri Aktif</span>
              <Users className="text-primary w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800">1,254</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-semibold text-sm">Alumni Terdata</span>
              <Database className="text-amber-500 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800">5,432</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-semibold text-sm">Jumlah Pengajar</span>
              <BookOpen className="text-emerald-500 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800">184</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-semibold text-sm">Rasio Santri/Guru</span>
              <TrendingUp className="text-purple-500 w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800">6.8 <span className="text-lg font-medium text-slate-400">/ 1</span></div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Tren Pertumbuhan Santri (2021-2026)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={santriData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="jumlah" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Proporsi Santri Berdasarkan Jenjang</h3>
            <div className="h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tingkatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tingkatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {tingkatData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-sm font-medium text-slate-600">{entry.name} <span className="text-slate-400 ml-1">({entry.value})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
