"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

type GuardianRequest = {
  id: string; // Changed to string (UUID)
  name: string;
  child_name: string; // Correct schema name
  phone: string;
  status: "pending" | "approved" | "rejected";
  created_at: string; // Correct schema name
};

export default function PermintaanLoginPage() {
  const [requests, setRequests] = useState<GuardianRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from Supabase fetch
  const fetchRequests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("guardian_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    const { error } = await supabase
      .from("guardian_requests")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      fetchRequests(); // Refresh data
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <ShieldAlert className="text-amber-500" /> Permintaan Akses Wali
        </h1>
        <p className="text-slate-500 mb-8">Administrasi antrean registrasi manual wali santri untuk portal instansi.</p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-slate-300 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">Tanggal Masuk</th>
                  <th className="p-4">Nama Pendaftar</th>
                  <th className="p-4">Nama Santri</th>
                  <th className="p-4">Kontak (WA)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <motion.tr key={req.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-500">{new Date(req.created_at).toLocaleDateString("id-ID")}</td>
                      <td className="p-4 font-bold text-slate-800">{req.name}</td>
                      <td className="p-4 text-sm text-slate-600">{req.child_name}</td>
                      <td className="p-4 text-sm text-slate-600 font-mono">{req.phone}</td>
                      <td className="p-4">
                        {req.status === "pending" && <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md w-max"><Clock size={12}/> Menunggu</span>}
                        {req.status === "approved" && <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md w-max"><CheckCircle size={12}/> Disetujui</span>}
                        {req.status === "rejected" && <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md w-max"><XCircle size={12}/> Ditolak</span>}
                      </td>
                      <td className="p-4 flex gap-2 justify-center">
                         {req.status === "pending" ? (
                           <>
                              <button onClick={() => handleUpdateStatus(req.id, "approved")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-xs font-bold transition-colors">Setujui</button>
                              <button onClick={() => handleUpdateStatus(req.id, "rejected")} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold transition-colors">Tolak</button>
                           </>
                         ) : (
                           <span className="text-xs text-slate-400 italic">Sudah direviu</span>
                         )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      Belum ada permintaan akses masuk dari Wali Santri.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
