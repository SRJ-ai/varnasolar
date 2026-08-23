import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';

const metrics: { label: string; value: string; accent?: boolean }[] = [
  { label: 'Total Capacity', value: '15.4 MW' },
  { label: 'Surya Ghar Subsidy Leads', value: '1,280 Active', accent: true },
  { label: 'DISCOM SLA Rate', value: '100%' },
  { label: 'Pending Inquiries', value: '14' },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('varna_admin_auth');
    navigate('/admin/login');
  };

  return (
    <PageTransition>
      {/* ═══ HEADER ═══ */}
      <section className="w-full bg-paper hairline-b">
        <div className="container-editorial flex flex-col md:flex-row justify-between md:items-center gap-6 py-10">
          <div>
            <p className="label-mono text-sun mb-2">System Status: Optimal</p>
            <h1 className="font-display font-black uppercase tracking-tightest text-3xl md:text-4xl">
              Admin Operation Control
            </h1>
          </div>
          <button onClick={handleLogout} className="btn-outline-premium self-start md:self-auto">
            Sign Out
            <LogOut aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section className="w-full py-12 md:py-16">
        <div className="container-editorial grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-ink/12 divide-y sm:divide-y-0 divide-ink/12 bg-paper-card">
          {metrics.map((m) => (
            <div key={m.label} className={`p-6 space-y-2 ${m.accent ? 'bg-sun-tint' : ''} sm:border-l sm:first:border-l-0 border-ink/12`}>
              <p className="text-xs text-ink-mute uppercase tracking-wide">{m.label}</p>
              <p className="font-display font-black uppercase tracking-tight text-3xl">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};
