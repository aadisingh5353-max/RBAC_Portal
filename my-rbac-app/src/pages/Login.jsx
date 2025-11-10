import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Login = ({ loginForm, handleChange, handleLogin, loading, message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Decorative Header */}
        <div className="bg-indigo-600 p-6 text-center">
            <ShieldCheck size={48} className="text-indigo-100 mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-white tracking-tight">RBAC Portal</h2>
            <p className="text-indigo-200 text-sm mt-1">Secure Access Management</p>
        </div>

        <div className="p-8">
          <p className="text-center text-sm text-slate-500 mb-8 bg-slate-50 py-2 rounded-lg border border-slate-200">
            Use <strong>password</strong> for all demo accounts.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleChange}
                placeholder="e.g., admin_user"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              {loading ? (
                  <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Authenticating...
                  </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Error/Success Message */}
          {message && (
              <div className={`mt-6 p-3 rounded-lg text-sm text-center font-medium ${
                  message.includes('Failed') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}>
                  {message}
              </div>
          )}
          
          {/* Credentials Hint */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Demo Credentials</h4>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-pink-50 text-pink-700 py-1.5 rounded-md font-medium border border-pink-100">Admin</div>
                <div className="bg-indigo-50 text-indigo-700 py-1.5 rounded-md font-medium border border-indigo-100">Editor</div>
                <div className="bg-emerald-50 text-emerald-700 py-1.5 rounded-md font-medium border border-emerald-100">Viewer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;