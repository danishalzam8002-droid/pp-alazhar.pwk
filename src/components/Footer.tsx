import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">PP. Al-Azhar</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Mencetak generasi Rabbani yang unggul dalam ilmu pengetahuan, berakhlak mulia, dan siap memimpin peradaban di masa depan.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full hover:bg-amber-500 hover:text-white transition-colors text-xs font-bold">
              FB
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full hover:bg-amber-500 hover:text-white transition-colors text-xs font-bold">
              IG
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full hover:bg-amber-500 hover:text-white transition-colors text-xs font-bold">
              YT
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Tautan Cepat</h4>
          <ul className="space-y-2">
            <li><Link href="/profil" className="hover:text-amber-400 transition-colors">Profil Pesantren</Link></li>
            <li><Link href="/publikasi" className="hover:text-amber-400 transition-colors">Berita & Pengumuman</Link></li>
            <li><Link href="/pendaftaran" className="hover:text-amber-400 transition-colors">Informasi Pendaftaran</Link></li>
            <li><Link href="/akademik" className="hover:text-amber-400 transition-colors">Program Akademik</Link></li>
            <li><Link href="/kontak" className="hover:text-amber-400 transition-colors">Hubungi Kami</Link></li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Unit Pendidikan</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-amber-400 transition-colors">TKIT Al-Azhar</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">SDIT Al-Azhar</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">SMP Islam Al-Azhar</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">MA Unggulan Al-Azhar</Link></li>
            <li><Link href="#" className="hover:text-amber-400 transition-colors">Pondok Pesantren</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Kontak Kami</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Kp. Warungkandang RT.19/RW.04, Ds. Sindangsari, Kec. Plered, Kab. Purwakarta, Jawa Barat</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-sm">+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-sm">info@alazhar-plered.sch.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Yayasan Al-Azhar Plered Purwakarta. All rights reserved.</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          Made with <span className="text-red-500">♥</span> for continuous excellence.
        </p>
      </div>
    </footer>
  );
}
