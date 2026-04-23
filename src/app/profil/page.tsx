import { Building2, History, Target, Users } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Profil Pondok Pesantren</h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto font-light">
          Mengenal lebih dekat institusi pendidikan yang berdedikasi membangun generasi unggul bersendikan nilai-nilai Islam.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <History className="text-amber-500" />
                Sejarah Singkat
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Pondok Pesantren Al-Azhar Plered didirikan dengan cita-cita luhur untuk menjawab tantangan zaman di mana pendidikan karakter sama pentingnya dengan kecerdasan intelektual. Berawal dari sebuah majelis taklim kecil di Plered, kini Al-Azhar telah berkembang menjadi lembaga pendidikan formal dan non-formal yang komprehensif.
              </p>
            </div>
            <div className="bg-slate-100 h-[300px] rounded-2xl relative overflow-hidden flex items-center justify-center">
              {/* Image Placeholder */}
               <img 
                 src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&fit=crop" 
                 alt="Sejarah"
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

          <hr className="my-12 border-slate-200" />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Visi & Misi</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Mencetak santri yang berakhlak mulia, menguasai IPTEK, bertauhid kokoh, dan siap berkontribusi untuk peradaban.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Fasilitas Modern</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Asrama representatif, masjid jami, perpustakaan integrasi digital, ruang kelas kondusif, dan sarana olahraga lengkap.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Tenaga Pendidik</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Diasuh oleh para kyai, asatidz lulusan timur tengah dan universitas terkemuka dalam negeri yang kompeten di bidangnya.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
