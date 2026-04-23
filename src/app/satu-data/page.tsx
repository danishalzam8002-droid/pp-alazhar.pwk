import { Search, Database, FileText, Download, Filter, Eye, Hash } from "lucide-react";
import Link from "next/link";

export default function SatuDataPage() {
  const categories = ["Semua Kategori", "Demografi Santri", "Tenaga Pendidik", "Prestasi Akademik", "Keuangan", "Fasilitas"];
  const datasets = [
    { title: "Tracer Study Alumni Angkatan 2020-2025", category: "Demografi Santri", format: "CSV", views: 1254, downloads: 342, date: "22 April 2026" },
    { title: "Sebaran Asal Daerah Santri 2026", category: "Demografi Santri", format: "JSON", views: 932, downloads: 120, date: "18 April 2026" },
    { title: "Statistik Tenaga Kependidikan & Asatidz", category: "Tenaga Pendidik", format: "Excel", views: 543, downloads: 87, date: "10 April 2026" },
    { title: "Rekapitulasi Juara MTQ & Sains Tingkat Provinsi", category: "Prestasi Akademik", format: "PDF", views: 2410, downloads: 890, date: "02 April 2026" },
    { title: "Laporan Realisasi Alokasi Dana Pendidikan", category: "Keuangan", format: "CSV", views: 890, downloads: 400, date: "28 Maret 2026" },
    { title: "Inventaris Fasilitas Penunjang Akademik", category: "Fasilitas", format: "JSON", views: 420, downloads: 90, date: "15 Maret 2026" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      {/* Header Satu Data */}
      <div className="bg-slate-900 border-b-4 border-amber-500 pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
              <Database className="w-10 h-10 text-amber-500" />
              Satu Data Al-Azhar
            </h1>
            <p className="text-lg text-slate-300 font-light mb-8">
              Katalog himpunan data internal terpadu Pondok Pesantren Al-Azhar yang tersedia untuk publik guna mendukung asas transparansi, tridarma, dan kemudahan riset.
            </p>
            
            {/* Search Bar ala Portal Data */}
            <div className="flex flex-col md:flex-row gap-4 bg-white/10 p-2 md:p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Cari dataset, koleksi, atau entitas data..." 
                  className="w-full pl-12 pr-6 py-4 bg-white rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-amber-500 text-lg"
                />
              </div>
              <button className="bg-amber-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                Temukan Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                <Filter size={20} /> Filter Pencarian
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Kategori Topik</h3>
                  <div className="space-y-2">
                    {categories.map((cat, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary" defaultChecked={i === 0} />
                        <span className={`text-sm ${i === 0 ? "font-bold text-primary" : "text-slate-600 group-hover:text-amber-600"}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Format Berkas</h3>
                  <div className="flex flex-wrap gap-2">
                    {["CSV", "PDF", "JSON", "Excel", "XML"].map(fmt => (
                      <span key={fmt} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md hover:bg-slate-200 cursor-pointer border border-slate-200">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Dataset List */}
          <main className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Hash size={20} className="text-amber-500" /> Katalog Koleksi (245 Dataset)
              </h2>
              <div className="text-sm text-slate-500 flex items-center gap-2">
                Urutkan: 
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 outline-none text-slate-700 font-medium">
                  <option>Terbaru</option>
                  <option>Paling Banyak Diunduh</option>
                  <option>Populer</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {datasets.map((data, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                          {data.category}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border 
                          ${data.format === 'CSV' ? 'bg-green-50 border-green-200 text-green-700' : 
                            data.format === 'JSON' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                            data.format === 'PDF' ? 'bg-red-50 border-red-200 text-red-700' : 
                            'bg-emerald-50 border-emerald-200 text-emerald-700'}
                        `}>
                          {data.format}
                        </span>
                      </div>
                      <Link href="#" className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors block mb-2 leading-tight">
                        {data.title}
                      </Link>
                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                        Dataset ini memuat informasi detail terkait {data.title.toLowerCase()} yang dikumpulkan dan divalidasi oleh Biro Administrasi PP Al-Azhar secara berkala.
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
                        <span className="flex items-center gap-1.5"><FileText size={14} /> Diperbarui: {data.date}</span>
                        <span className="flex items-center gap-1.5"><Eye size={14} /> {data.views} Tayangan</span>
                        <span className="flex items-center gap-1.5"><Download size={14} /> {data.downloads} Unduhan</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 flex md:flex-col gap-2">
                      <button className="flex-grow md:flex-grow-0 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold text-sm transition-colors text-center">
                        Lihat Data
                      </button>
                      <button className="flex-grow md:flex-grow-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                        <Download size={16} /> Unduh
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Dummy */}
            <div className="mt-10 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-400 hover:bg-slate-50 font-bold -tracking-widest">«</button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-md">1</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-50 font-bold">2</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-50 font-bold">3</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-50 font-bold tracking-widest text-lg">...</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-400 hover:bg-slate-50 font-bold -tracking-widest">»</button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
