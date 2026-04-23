import { Upload, Users, FileText, Settings, LayoutDashboard, Search } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen pt-[72px] bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-t border-slate-800">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-bold text-xl tracking-tight">Admin Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Sistem Pengelolaan Data</p>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <a href="#" className="flex items-center gap-3 bg-primary/20 text-white p-3 rounded-lg border border-primary/30">
            <LayoutDashboard size={20} className="text-primary" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors">
            <Users size={20} /> Data Santri
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors">
            <FileText size={20} /> Pendaftar PPDB
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors">
            <Upload size={20} /> Publikasi
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-colors">
            <Settings size={20} /> Pengaturan
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari data..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Pendaftar", count: "124", bg: "bg-blue-500" },
            { title: "Verifikasi Berkas", count: "89", bg: "bg-amber-500" },
            { title: "Santri Aktif", count: "1,200", bg: "bg-emerald-500" },
            { title: "Artikel Publikasi", count: "48", bg: "bg-purple-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold ${stat.bg}`}>
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.count}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Pendaftar PPDB Terbaru</h3>
            <button className="text-sm text-primary font-semibold hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="p-4 font-semibold border-b">Nama Pendaftar</th>
                  <th className="p-4 font-semibold border-b">Program</th>
                  <th className="p-4 font-semibold border-b">Tanggal Daftar</th>
                  <th className="p-4 font-semibold border-b">Status</th>
                  <th className="p-4 font-semibold border-b">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <span className="font-medium text-slate-800">Ahmad Fulan Bin Fulan</span>
                    </td>
                    <td className="p-4 text-slate-600">Reguler (Mondok)</td>
                    <td className="p-4 text-slate-600">23 April 2026</td>
                    <td className="p-4">
                      <span className="bg-amber-100 text-amber-700 font-medium px-2 py-1 rounded text-xs">Menunggu Verifikasi</span>
                    </td>
                    <td className="p-4">
                      <button className="text-primary hover:underline font-medium">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
