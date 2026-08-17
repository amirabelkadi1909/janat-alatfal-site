import React, { useState, useEffect } from 'react';
import { Lock, Trash2, RefreshCw, LogOut, Search, UserCheck } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) fetchRegistrations(password);
  };

  const fetchRegistrations = async (pass = password) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/admin/registrations`, {
        headers: { 'x-admin-password': pass }
      });
      const data = await response.json();

      if (response.ok) {
        setRegistrations(data);
        setIsAuthenticated(true);
        localStorage.setItem('admin_pass', pass);
      } else {
        setError(data.error || 'Incorrect Password');
      }
    } catch (err) {
      setError('Failed to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      fetchRegistrations(savedPass);
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });

      if (response.ok) {
        setRegistrations(registrations.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete registration.');
      }
    } catch (err) {
      alert('Error deleting registration.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_pass');
    setIsAuthenticated(false);
    setPassword('');
  };

  const filteredRegistrations = registrations.filter(
    (r) =>
      r.child_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.parent_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search)
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-800 border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white text-center mb-2">Studio S&A Admin</h2>
          <p className="text-slate-400 text-xs text-center mb-6">Enter admin password to view registrations</p>

          {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-bold text-center">{error}</div>}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-rose-400 mb-4 text-sm font-semibold"
          />
          <button type="submit" disabled={loading} className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-xl transition-all">
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <UserCheck className="text-rose-400" /> Registration Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-1">Total Submissions: {registrations.length}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => fetchRegistrations()} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by child, parent, or phone..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white outline-none focus:border-rose-400"
          />
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs font-semibold border-collapse">
            <thead className="bg-slate-800/60 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Child Name</th>
                <th className="p-4">Parent Name</th>
                <th className="p-4">Age</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email / Note</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">No registrations found.</td>
                </tr>
              ) : (
                filteredRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">{r.child_name}</td>
                    <td className="p-4 text-slate-300">{r.parent_name}</td>
                    <td className="p-4 text-slate-400">{r.age} yrs</td>
                    <td className="p-4 text-rose-400 font-mono"><a href={`tel:${r.phone}`}>{r.phone}</a></td>
                    <td className="p-4 text-slate-400 max-w-xs truncate">{r.email || r.message || '-'}</td>
                    <td className="p-4 text-slate-500 text-[11px]">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(r.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}