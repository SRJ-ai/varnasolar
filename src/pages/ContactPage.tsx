import React, { useState } from 'react';
import { Phone, Mail, MapPin, Sparkles, Send, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';
import { ServiceTypeInquiry } from '@/types/lead';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    serviceType: 'Residential Rooftop' as ServiceTypeInquiry,
    monthlyBill: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Contact &amp; Branches</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>Hyderabad Headquarters &amp; 4 Regional Branch Offices</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Get in Touch with Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Solar Engineering Experts
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Direct hotline: <strong className="text-white">+91 91824 45679</strong>. Visit our Hyderabad SR Nagar headquarters or connect with our regional branch teams in Vizag, Adilabad, Vempalli, and Tandur.
          </p>
        </div>
      </section>

      {/* CONTACT FORM & HQ DETAILS (2 COLUMNS) */}
      <section className="py-8 pb-20 px-4 sm:px-6 lg:px-12" id="contact-quote">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEAD FORM (7 COLUMNS) */}
          <div className="lg:col-span-7">
            <GlassCard variant="dark" className="p-6 sm:p-8 space-y-6 border-white/15">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Request a Free Solar Quotation &amp; Site Audit</h3>
                <p className="text-xs text-slate-400">Fill out your details and our senior solar engineer will call you back within 2 hours.</p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">Thank You, {formData.fullName || 'Valued Customer'}!</h4>
                  <p className="text-xs text-slate-300">
                    Your inquiry has been registered. Our senior solar consultant will call you at <strong className="text-emerald-400">{formData.phoneNumber}</strong> shortly.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-emerald-400 font-semibold underline pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">City / District *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Hyderabad / Visakhapatnam"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Service Required</label>
                      <select 
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceTypeInquiry })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Residential Rooftop">Residential Rooftop (₹78k Subsidy)</option>
                        <option value="Commercial Solar">Commercial Solar (40% AD)</option>
                        <option value="Industrial Solar">Industrial MW Solar Farm</option>
                        <option value="Agriculture Solar Pump">Agriculture Solar Pump (PM KUSUM)</option>
                        <option value="PM Surya Ghar Consultation">PM Surya Ghar Consultation</option>
                        <option value="AMC & Maintenance">AMC &amp; Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Average Monthly Electricity Bill (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. ₹5,500"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Message / Roof Details (Optional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Describe your property type, terrace area, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <WatermelonButton type="submit" variant="primary" size="lg" fullWidth={true} glow={true} icon={<Send className="w-4 h-4" />}>
                    Submit Solar Quote Request
                  </WatermelonButton>
                </form>
              )}
            </GlassCard>
          </div>

          {/* HEADQUARTERS DIRECT INFO (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard variant="glowing" glowColor="emerald" className="p-6 sm:p-8 space-y-6 border-emerald-500/20">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Head Office (Hyderabad)
                </div>
                <h3 className="text-xl font-bold text-white">Varna Solar Pvt. Ltd.</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  8-3-214/7/1A, 2nd Floor, Beside Sri Chaitanya School, Pillar No: 1036, Sanjeeva Reddy Nagar (SR Nagar), Hyderabad, Telangana - 500038
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                <a href="tel:+919182445679" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 font-semibold p-2 rounded-lg hover:bg-white/5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+91 91824 45679</span>
                </a>

                <a href="mailto:info@varnasolar.com" className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 p-2 rounded-lg hover:bg-white/5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>info@varnasolar.com</span>
                </a>

                <div className="flex items-center gap-3 text-slate-400 p-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </section>

      {/* 4 REGIONAL BRANCH OFFICES GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#091322]/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-10">
          <SectionHeader 
            badge="Regional Presence"
            title="Our 4 Regional Branch Offices"
            highlightText="4 Regional Branch Offices"
            description="Dedicated field engineering and net-metering teams stationed across key districts."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_DATA.branches.filter((b) => !b.isHQ).map((branch) => (
              <GlassCard key={branch.id} variant="dark" className="p-6 space-y-4 border-white/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{branch.state}</div>
                  <h4 className="text-base font-bold text-white">{branch.city}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{branch.address}</p>
                </div>

                <div className="pt-3 border-t border-white/10 text-xs space-y-1">
                  <a href={`tel:${branch.phone}`} className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{branch.phone}</span>
                  </a>
                  <p className="text-[11px] text-slate-400">{branch.workingHours}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
