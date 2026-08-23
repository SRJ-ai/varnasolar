import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('varna_admin_auth', 'true');
      navigate('/admin');
    } else {
      alert('Invalid admin credentials. Use admin / admin for demo.');
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-paper">
        <div className="w-full max-w-md bg-paper-card border border-ink/15 p-8 space-y-8">
          <div className="space-y-3">
            <div className="w-11 h-11 border border-ink/20 flex items-center justify-center text-sun">
              <Lock aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h1 className="font-display font-black uppercase tracking-tightest text-2xl">
              Varna Solar Portal
            </h1>
            <p className="text-xs text-ink-mute uppercase tracking-wide">Administrative System Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-username" className="label-mono text-ink-mute mb-2 block">
                Username
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin…"
                className="w-full border border-ink/20 bg-paper-card px-4 py-3 text-sm focus:border-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="label-mono text-ink-mute mb-2 block">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-ink/20 bg-paper-card px-4 py-3 text-sm focus:border-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0"
              />
            </div>
            <button type="submit" className="btn-premium w-full justify-center py-3.5 text-xs uppercase tracking-wider">
              Sign In
              <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      </section>
    </PageTransition>
  );
};
