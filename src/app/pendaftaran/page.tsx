import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PendaftaranPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Penerimaan Santri Baru</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bergabunglah bersama kami membentuk generasi Rabbani yang berakhlak mulia, cerdas, dan siap menghadapi tantangan masa depan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Program Mondok */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col relative overflow-hidden group hover:border-amber-500 transition-colors">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">Favorit</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Program Reguler (Mondok)</h2>
            <p className="text-slate-500 mb-6 font-medium border-b border-slate-100 pb-6">
              Santri menetap di asrama dengan pembinaan karakter 24 jam penuh. Pilihan jenjang: SMP Islam & MA Unggulan.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              {["Tahfiz Al-Qur'an Intensif", "Bimbingan Kitab Kuning", "Program Bahasa Arab & Inggris", "Ekstrakurikuler Wajib & Pilihan"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/pendaftaran/form" className="w-full py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-amber-500 transition-colors flex justify-center items-center gap-2">
              Daftar Program Mondok <ChevronRight size={18} />
            </Link>
          </div>

          {/* Program Non-Mondok */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col hover:border-primary transition-colors">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Program Full Day (Non-Mondok)</h2>
            <p className="text-slate-500 mb-6 font-medium border-b border-slate-100 pb-6">
              Pembelajaran dari pagi hingga sore hari. Tersedia untuk jenjang TKIT, SDIT, dan SMP Islam.
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
              {["Pembiasaan Ibadah Harian", "Hafalan Juz 30 Bertahap", "Sistem Antar-Jemput (Opsional)", "Makan Siang Bergizi"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/pendaftaran/form" className="w-full py-4 rounded-xl font-bold bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors flex justify-center items-center gap-2">
              Daftar Program Full Day <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        {/* Alur Pendaftaran */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12 border-b-4 border-amber-500 inline-block pb-2">Alur Pendaftaran</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            {[
              { num: 1, title: "Isi Formulir", desc: "Mengisi data diri secara online" },
              { num: 2, title: "Bayar Biaya", desc: "Transfer biaya formulir" },
              { num: 3, title: "Ujian Seleksi", desc: "Test akademik & baca Alquran" },
              { num: 4, title: "Pengumuman", desc: "Menunggu hasil kelulusan" },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 w-full md:w-48 bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm ring-2 ring-primary/20">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
