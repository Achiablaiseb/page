

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';
import { supabase } from '../lib/supabase';

const Login = ({ onLogin }: { onLogin: (u: UserProfile) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (user) {
        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          const userProfile: UserProfile = {
            id: profile.id,
            name: profile.name || user.email || 'User',
            email: profile.email || user.email || '',
            role: profile.role || 'CLIENT',
          };

          // Legacy local storage support if needed, but App.tsx should handle this via onLogin or auth listener
          localStorage.setItem('fre_user', JSON.stringify(userProfile));
          onLogin(userProfile);
          window.location.hash = '#/dashboard';
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Cast motion.div to any to avoid IntrinsicAttributes typing error */}
      <motion.div
        {...({
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        } as any)}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-primary py-12 px-8 text-center text-white">
          <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
          <p className="text-blue-100 opacity-80">Access your construction dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          {error && (
            // Cast motion.div to any to avoid IntrinsicAttributes typing error
            <motion.div
              {...({
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 }
              } as any)}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100"
            >
              <AlertCircle className="shrink-0 w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <button type="button" className="text-primary text-xs font-bold hover:underline">Forgot Password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-800 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Not a client yet? <a href="#/contact" className="text-primary font-bold hover:underline">Request a Quote</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

