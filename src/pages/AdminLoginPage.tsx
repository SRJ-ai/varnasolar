import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { PageTransition } from '@/components/common/PageTransition';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@varnasolar.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <AnimatedBadge variant="obsidian">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Internal Management Console</span>
              </span>
            </AnimatedBadge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400">Authorized Varna Solar executive and CRM staff access only.</p>
          </div>

          <GlassCard variant="dark" className="p-8 space-y-6 border-white/15">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <WatermelonButton type="submit" variant="primary" size="md" fullWidth={true} glow={true} icon={<ArrowRight className="w-4 h-4" />}>
                Enter Admin Portal
              </WatermelonButton>
            </form>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-slate-400 hover:text-emerald-400">
                ← Return to Public Website
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
};
