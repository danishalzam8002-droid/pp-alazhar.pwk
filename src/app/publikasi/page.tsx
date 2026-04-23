import { Search, Calendar, User, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PublikasiPage() {
  const news = Array(6).fill(null).map((_, i) => ({
    id: i,
    category: ["Prestasi", "Akademik", "Berita Utama"][i % 3],
    title: "Implementasi Kurikulum Integrasi Tahfiz dan Sains di Al-Azhar " + (i + 1),
    date: `1${i} Mei 2026`,
    image: `https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&fit=crop`
  }));

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Publikasi & Berita</h1>
            <p className="text-lg text-slate-600">Informasi terbaru seputar kegiatan dan prestasi Pondok Pesantren.</p>
          </div>
          <div className="mt-6 md:mt-0 relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="pl-12 pr-6 py-3 w-full md:w-72 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>

        {/* Featured News */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl mb-16 flex flex-col md:flex-row border border-slate-100">
          <div className="md:w-2/3 h-64 md:h-[400px] relative">
            <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">Sorotan</div>
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&fit=crop" alt="Featured" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/3 p-8 md:p-10 flex flex-col justify-center">
            <div className="flex gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> 20 Mei 2026</span>
              <span className="flex items-center gap-1"><User size={14} /> Humas Al-Azhar</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4 hover:text-primary transition-colors cursor-pointer leading-tight">Wisuda Santri Angkatan Ke-7: Menyemai Generasi Rabbani</h2>
            <p className="text-slate-600 mb-6 line-clamp-4">Acara puncak penyerahan ijazah dan penyematan gelar alumni bagi santri angkatan 7 dilangsungkan dengan khidmat. Lebih dari 200 santri lulus dengan nilai membanggakan.</p>
            <button className="text-primary font-bold flex items-center hover:text-amber-500">Baca Selengkapnya <ChevronRight size={18} /></button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md group">
              <div className="h-48 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full z-10">
                  {item.category}
                </div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-sm mb-3 flex items-center gap-1"><Calendar size={14} /> {item.date}</p>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                <Link href="#" className="text-slate-600 font-semibold flex items-center text-sm group-hover:text-amber-500">
                  Selengkapnya <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition-colors">
            Muat Berita Lainnya
          </button>
        </div>
      </div>
    </div>
  );
}
