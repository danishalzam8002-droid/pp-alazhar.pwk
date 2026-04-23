"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { UserCog, UserPlus, Search, Edit2, Trash2, Shield, Save, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminMenu from "@/components/AdminMenu";

interface UserAccount {
  id: string;
  username: string;
  password_hash: string;
  name: string;
  role: string;
}

interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default function KelolaAkunPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [notification, setNotification] = useState<Notification>({ show: false, message: "", type: "success" });
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "wali"
  });

  const router = useRouter();

  useEffect(() => {
    // Initial fetch
    fetchUsers();

    // REAL-TIME SUBSCRIPTION
    const channel = supabase
      .channel('realtime_users')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'users', filter: 'role=eq.wali' }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setUsers(prev => [...prev, payload.new as UserAccount].sort((a,b) => a.name.localeCompare(b.name)));
          } else if (payload.eventType === 'UPDATE') {
            setUsers(prev => prev.map(u => u.id === payload.new.id ? payload.new as UserAccount : u));
          } else if (payload.eventType === 'DELETE') {
            setUsers(prev => prev.filter(u => u.id === payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUsers = async () => {
    // Hanya loading di awal saja
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "wali") 
      .order("name", { ascending: true });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (editingUser) {
      const { error } = await supabase
        .from("users")
        .update({
          username: formData.username,
          password_hash: formData.password,
          name: formData.name
        })
        .eq("id", editingUser.id);
      
      if (error) {
        showToast("Gagal memperbarui akun: " + error.message, "error");
      } else {
        showToast("Akun " + formData.name + " berhasil diperbarui!", "success");
      }
    } else {
      const { error } = await supabase
        .from("users")
        .insert([{
          username: formData.username,
          password_hash: formData.password,
          name: formData.name,
          role: "wali"
        }]);
      
      if (error) {
        showToast("Gagal membuat akun: " + error.message, "error");
      } else {
        showToast("Akun baru berhasil dibuat!", "success");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus akun ini secara permanen?")) {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);
      
      if (error) {
        showToast("Gagal menghapus akun: " + error.message, "error");
      } else {
        showToast("Akun telah dihapus secara permanen.", "success");
      }
    }
  };

  const openModal = (user: UserAccount | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        password: user.password_hash,
        name: user.name,
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: "",
        password: "",
        name: "",
        role: "wali"
      });
    }
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <AdminMenu />
      
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <UserCog className="text-amber-500" size={32} />
              Kelola Akun Wali Santri
            </h1>
            <p className="text-slate-500 mt-1">Manajemen akses portal khusus orang tua / wali santri Al-Azhar.</p>
          </div>
          
          <button 
            onClick={() => openModal()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Tambah Akun Baru
          </button>
        </div>

        {/* Stats & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau username..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm font-bold text-slate-500">
             <Shield className="text-amber-500" size={16} /> Total: {users.length} Wali Santri
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Nama Lengkap</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Username</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Password (Plain)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin text-amber-500" size={32} />
                        <p className="text-slate-400 font-bold">Memuat data akun...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={user.id} 
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-extrabold text-slate-800">{user.name}</p>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono font-bold">
                          {user.username}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-400 text-sm">{user.password_hash}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md w-max">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Aktif (Wali)
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => openModal(user)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Akun"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Akun"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-slate-400 font-bold">
                      Tidak ada akun wali santri ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="bg-slate-800 p-6 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {editingUser ? <Edit2 size={20}/> : <UserPlus size={20}/>}
                  {editingUser ? "Edit Akun Wali" : "Tambah Akun Wali"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap Wali</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: H. Ahmad Subarjo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Username / Email</label>
                  <input 
                    type="text" 
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="username_wali"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password Akun</label>
                  <input 
                    type="text" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="min. 6 karakter"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-amber-500 transition-all font-mono"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-3 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20}/>}
                    {editingUser ? "Simpan Perubahan" : "Buat Akun Sekarang"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
      {/* Toast Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`fixed top-10 right-10 z-[200] p-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border ${
              notification.type === "success" 
                ? "bg-slate-900 text-white border-emerald-500/50" 
                : "bg-red-950 text-red-100 border-red-500/50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              notification.type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
            }`}>
              {notification.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider opacity-60">Pemberitahuan</p>
              <p className="text-sm font-bold">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
