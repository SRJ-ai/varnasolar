import React from 'react';
import { Users, FileText, TrendingUp, ShieldCheck, CheckCircle2, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { PageTransition } from '@/components/common/PageTransition';

export const AdminDashboardPage: React.FC = () => {
  const sampleLeads = [
    { id: 'LD-1042', name: 'K. Venkateswarlu', phone: '+91 98480 11223', city: 'Hyderabad', service: 'Residential 5kW', status: 'Site Visit Scheduled', date: '2026-08-20' },
    { id: 'LD-1041', name: 'Dr. Anita Reddy', phone: '+91 94401 55667', city: 'Visakhapatnam', service: 'Commercial 30kW', status: 'Proposal Sent', date: '2026-08-19' },
    { id: 'LD-1040', name: 'Sri Balaji Rice Mill', phone: '+91 99887 44332', city: 'Nalgonda', service: 'Industrial 100kW', status: 'Converted', date: '2026-08-18' },
    { id: 'LD-1039', name: 'M. Sreenu Farmer', phone: '+91 91234 56789', city: 'Adilabad', service: 'PM KUSUM 7.5HP', status: 'Feasibility Approved', date: '2026-08-18' },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Varna Solar CRM &amp; Admin Hub</h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Live Portal</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Lead pipeline, quotation tracking, and knowledge base management console.</p>
          </div>

          <div className="flex items-center gap-3">
            <WatermelonButton to="/" variant="glass" size="sm">
              View Website
            </WatermelonButton>
            <WatermelonButton to="/admin/login" variant="ghost" size="sm">
              Log Out
            </WatermelonButton>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard variant="dark" className="p-5 space-y-1">
            <div className="text-xs text-slate-400">Total Leads This Month</div>
            <div className="text-2xl sm:text-3xl font-black text-white">128</div>
            <div className="text-[10px] text-emerald-400 font-semibold">+18.4% vs last month</div>
          </GlassCard>

          <GlassCard variant="dark" className="p-5 space-y-1">
            <div className="text-xs text-slate-400">Active Site Audits</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">34</div>
            <div className="text-[10px] text-slate-400">Hyderabad &amp; Vizag</div>
          </GlassCard>

          <GlassCard variant="dark" className="p-5 space-y-1">
            <div className="text-xs text-slate-400">PM Surya Ghar Approvals</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[10px] text-emerald-400">Zero Rejected</div>
          </GlassCard>

          <GlassCard variant="dark" className="p-5 space-y-1">
            <div className="text-xs text-slate-400">Pipeline Deal Value</div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">₹1.84 Cr</div>
            <div className="text-[10px] text-slate-400">9 Active Contracts</div>
          </GlassCard>
        </div>

        {/* Recent Inquiries Table */}
        <GlassCard variant="dark" className="p-6 space-y-4 border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Customer Solar Inquiries</h3>
            <span className="text-xs text-slate-400">Auto-synced from Web &amp; WhatsApp</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3">Inquiry ID</th>
                  <th className="pb-3">Customer Name</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">City</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sampleLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-mono font-semibold text-slate-400">{lead.id}</td>
                    <td className="py-3 font-bold text-white">{lead.name}</td>
                    <td className="py-3 font-mono">{lead.phone}</td>
                    <td className="py-3">{lead.city}</td>
                    <td className="py-3 font-medium text-emerald-400">{lead.service}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-slate-200">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </PageTransition>
  );
};
