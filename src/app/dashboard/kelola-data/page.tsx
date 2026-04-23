"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Check, Users, UserCog, User } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function KelolaDataPage() {
  const [activeTab, setActiveTab] = useState<"siswa" | "pengajar">("siswa");
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // -- Filter State Siswa --
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGender, setFilterGender] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterSchool, setFilterSchool] = useState<string[]>([]);

  // Fetch Data dari Supabase
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data) {
        setStudents(data);
      }
      setIsLoading(false);
    };

    if (activeTab === "siswa") {
      fetchStudents();
    }
  }, [activeTab]);

  // Toggle Function for Checkboxes
  const toggleFilter = (state: string[], setState: any, value: string) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  // Logic Mesin Pencarian & Filter Cerdas
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // 1. Text Search
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Multi-Filter Logic (Jika array kosong berarti bebas / tidak memfilter)
      const matchGender = filterGender.length === 0 || filterGender.includes(student.gender);
      const matchStatus = filterStatus.length === 0 || filterStatus.includes(student.status);
      const matchSchool = filterSchool.length === 0 || filterSchool.includes(student.school);

      return matchSearch && matchGender && matchStatus && matchSchool;
    });
  }, [searchQuery, filterGender, filterStatus, filterSchool, students]);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <DatabaseIcon /> Kelola Entitas Data
        </h1>
        <p className="text-slate-500 mb-8">Pusat kontrol pemilahan data siswa dan dokumen pengajar.</p>

        {/* Tab Navigator */}
        <div className="flex items-center gap-4 border-b border-slate-300 mb-8">
          <button 
            onClick={() => setActiveTab("siswa")}
            className={`px-6 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "siswa" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Users size={18} /> Data Siswa
          </button>
          <button 
            onClick={() => setActiveTab("pengajar")}
            className={`px-6 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "pengajar" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <UserCog size={18} /> Data Pengajar
          </button>
        </div>

        {/* ===================== TAB SISWA ===================== */}
        {activeTab === "siswa" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* KOLOM FILTER (KIRI) */}
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                    <Filter size={18} className="text-amber-500" /> Filter Data
                  </h3>

                  {/* Kategori: Gender */}
                  <div className="mb-5">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Jenis Kelamin</p>
                    <div className="space-y-2">
                      <Checkbox label="Putra" state={filterGender} toggle={() => toggleFilter(filterGender, setFilterGender, "Putra")} />
                      <Checkbox label="Putri" state={filterGender} toggle={() => toggleFilter(filterGender, setFilterGender, "Putri")} />
                    </div>
                  </div>

                  {/* Kategori: Status Kepesantrenan */}
                  <div className="mb-5">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Tipe Program</p>
                    <div className="space-y-2">
                      <Checkbox label="Mondok" state={filterStatus} toggle={() => toggleFilter(filterStatus, setFilterStatus, "Mondok")} />
                      <Checkbox label="Non Mondok" state={filterStatus} toggle={() => toggleFilter(filterStatus, setFilterStatus, "Non Mondok")} />
                    </div>
                  </div>

                  {/* Kategori: Lembaga */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Institusi</p>
                    <div className="space-y-2">
                      <Checkbox label="SDIT Al-Azhar" state={filterSchool} toggle={() => toggleFilter(filterSchool, setFilterSchool, "SDIT Al-Azhar")} />
                      <Checkbox label="SMP Islam Al-Azhar" state={filterSchool} toggle={() => toggleFilter(filterSchool, setFilterSchool, "SMP Islam Al-Azhar")} />
                      <Checkbox label="MA Unggulan Al-Azhar" state={filterSchool} toggle={() => toggleFilter(filterSchool, setFilterSchool, "MA Unggulan Al-Azhar")} />
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* KOLOM HASIL & SEARCH (KANAN) */}
              <div className="w-full lg:w-3/4">
                <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
                  <div className="p-4 text-slate-400"><Search size={20} /></div>
                  <input 
                    type="text" 
                    placeholder="Cari nama santri..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 pl-0 outline-none font-medium text-slate-700"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-4">Nama Siswa</th>
                          <th className="p-4">Gender</th>
                          <th className="p-4">Program</th>
                          <th className="p-4">Institusi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map(student => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 font-semibold text-slate-800 flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${student.gender === 'Putra' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                                  <User size={14} />
                                </div>
                                {student.name}
                              </td>
                              <td className="p-4 text-sm text-slate-600">{student.gender}</td>
                              <td className="p-4 text-sm text-slate-600">
                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${student.status === 'Mondok' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="p-4 text-sm text-slate-600">{student.school}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-400">
                              Tidak ada siswa yang cocok dengan kriteria pencarian dan filter Anda.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-right">
                    Menampilkan <b>{filteredStudents.length}</b> siswa
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ===================== TAB PENGAJAR ===================== */}
        {activeTab === "pengajar" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm">
            <UserCog size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Modul Data Pengajar</h3>
            <p className="text-slate-500">Fitur ini masih dalam tahap konstruksi arsitektur selanjutnya.</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}

// Komponen Pembantu Khusus File Ini
const DatabaseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
);

const Checkbox = ({ label, state, toggle }: { label: string, state: string[], toggle: () => void }) => {
  const isChecked = state.includes(label);
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-primary border-primary text-white' : 'border-slate-300 group-hover:border-primary'}`}>
        {isChecked && <Check size={14} strokeWidth={3} />}
      </div>
      <span className={`text-sm ${isChecked ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{label}</span>
    </label>
  );
};
