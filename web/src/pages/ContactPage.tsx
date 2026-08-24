import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, ExternalLink, BadgeCheck, Building2, CheckCircle2 } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  'w-full border border-ink/20 bg-paper-card px-4 py-3 text-sm text-ink placeholder:text-ink-mute focus:border-sun focus:outline-none transition-colors';
const labelClass = 'label-mono text-ink-mute mb-2 block';

const serviceOptions = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agriculture',
  'Pumping',
  'Street Lighting',
  'EPC',
  'Other',
] as const;

function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Residential' as (typeof serviceOptions)[number],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hq = COMPANY_DATA.branches.find((b) => b.isHQ)!;
  const regional = COMPANY_DATA.branches.filter((b) => !b.isHQ);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formState.fullName.trim() || !formState.phone.trim() || !formState.email.trim()) {
      setError('Please fill in Full Name, Phone and Email.');
      return;
    }
    // Local handleSubmit logic — no backend yet, show success UX
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial pt-10 lg:pt-14 pb-10 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <img src={`${import.meta.env.BASE_URL}images/varna-logo2.png`} alt="Varna Solar" width={120} height={28} className="h-7 w-auto object-contain" loading="eager" />
            <span className="label-mono text-ink-mute hidden sm:inline">Contact &amp; Branches — Hyderabad HQ</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.04 }}
            className="label-mono text-sun mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="headline-hero text-[clamp(2.8rem,8vw,7rem)] max-w-6xl"
          >
            Let&rsquo;s talk
            <br />
            <span className="text-sun">solar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mt-8"
          >
            Free site assessment, DISCOM net-metering and subsidy filing — handled end-to-end. Same-day response, Monday
            to Saturday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            <span className="label-mono inline-flex items-center gap-1.5 border border-sun bg-sun px-3.5 py-2 text-paper">
              <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={1.75} /> Same-day response
            </span>
            <span className="label-mono border border-ink/15 bg-paper px-3.5 py-2 text-ink-soft">Mon–Sat · 9 AM–7 PM IST</span>
            <a
              href={`tel:${COMPANY_DATA.contact.rawPhone}`}
              className="label-mono border border-ink/15 bg-paper-card px-3.5 py-2 text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              {COMPANY_DATA.contact.primaryPhone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM + INFO SIDEBAR ═══ */}
      <section className="w-full hairline-t py-12 md:py-16">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Form — spans 7 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="lg:col-span-7 bg-paper-card border border-ink/12 p-6 md:p-10"
          >
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-black uppercase tracking-tight text-xl md:text-2xl leading-tight">
                  Get in Touch —<br />
                  Request free site <span className="text-sun">survey</span>
                </h2>
                <p className="text-sm text-ink-soft leading-relaxed mt-3 max-w-xl">
                  Tell us about your roof and monthly bill — we&apos;ll size the system, estimate subsidy and payback within hours.
                </p>
              </div>
              <span className="hidden sm:flex w-10 h-10 border border-ink/12 bg-paper-deep items-center justify-center shrink-0">
                <Send aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
              </span>
            </div>

            {submitted && (
              <div role="status" aria-live="polite" className="mb-6 border border-sun/30 bg-sun-tint px-4 py-3 flex items-center gap-3">
                <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-sun shrink-0" strokeWidth={1.75} />
                <p className="text-sm text-ink leading-relaxed break-words min-w-0">
                  Request received — our engineer will call you back on <strong>{formState.phone}</strong> within hours (Mon–Sat).
                </p>
              </div>
            )}
            {error && (
              <div role="alert" aria-live="polite" className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="contact-fullName" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="contact-fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name…"
                  spellCheck={false}
                  className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0`}
                  value={formState.fullName}
                  onChange={(e) => setFormState((s) => ({ ...s, fullName: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 9XXXX XXXXX…"
                    spellCheck={false}
                    className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0`}
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    placeholder="you@example.com…"
                    className={`${inputClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0`}
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-service" className={labelClass}>
                  Service Interested In *
                </label>
                <select
                  id="contact-service"
                  name="service"
                  autoComplete="off"
                  className={`${inputClass} appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation`}
                  value={formState.service}
                  onChange={(e) => setFormState((s) => ({ ...s, service: e.target.value as typeof s.service }))}
                  required
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="label-mono text-ink-mute mt-2 text-[10px]">Residential / Commercial / Industrial / Agriculture / Pumping / Street Lighting / EPC / Other</p>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  autoComplete="off"
                  placeholder="Your location, monthly bill, roof size…"
                  className={`${inputClass} resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation min-w-0 break-words`}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn-premium w-full !py-4">
                Submit Request <Send aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <p className="label-mono text-ink-mute text-[10px] leading-relaxed text-center">
                By submitting, you agree to be contacted by Varna Solar on phone / WhatsApp / email. No spam — one engineer, one timeline.
              </p>
            </form>
          </motion.div>

          {/* Info sidebar — spans 5 */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="lg:col-span-5 flex flex-col gap-0 bg-ink/12 border border-ink/12"
          >
            {/* HQ block */}
            <div className="bg-paper p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black uppercase tracking-tight text-lg">Headquarters</h2>
                <span className="label-mono bg-sun text-paper px-2.5 py-1">HQ · TS</span>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 border border-ink/12 bg-paper-deep flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="label-mono text-ink-mute block mb-1">Office Address</span>
                    <span className="text-sm text-ink leading-relaxed block">{hq.address}</span>
                    <span className="label-mono text-ink-mute block mt-1.5 text-[10px] leading-relaxed">{hq.landmark}</span>
                    <a
                      href={hq.googleMapsUrl ?? mapsUrl(hq.address)}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono inline-flex items-center gap-1.5 text-sun hover:text-ink transition-colors mt-2"
                    >
                      Get Directions <ExternalLink aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 border border-ink/12 bg-paper-deep flex items-center justify-center shrink-0 mt-0.5">
                    <Phone aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
                  </span>
                  <div>
                    <span className="label-mono text-ink-mute block mb-1">Phone — Same-day response</span>
                    <a
                      href={`tel:${COMPANY_DATA.contact.rawPhone}`}
                      className="font-display font-black uppercase tracking-tight text-lg md:text-xl hover:text-sun transition-colors"
                    >
                      {COMPANY_DATA.contact.primaryPhone}
                    </a>
                    <a
                      href={COMPANY_DATA.contact.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono block mt-1 text-sun hover:text-ink transition-colors"
                    >
                      WhatsApp us →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 border border-ink/12 bg-paper-deep flex items-center justify-center shrink-0 mt-0.5">
                    <Mail aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <span className="label-mono text-ink-mute block mb-1">Email</span>
                    <a href={`mailto:${COMPANY_DATA.contact.infoEmail}`} className="text-sm text-ink hover:text-sun transition-colors break-all">
                      {COMPANY_DATA.contact.infoEmail}
                    </a>
                    <span className="label-mono text-ink-mute block mt-1 text-[10px]">We reply within hours — Mon to Sat</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 border border-ink/12 bg-paper-deep flex items-center justify-center shrink-0 mt-0.5">
                    <Clock aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
                  </span>
                  <div>
                    <span className="label-mono text-ink-mute block mb-1">Operating Hours</span>
                    <span className="text-sm text-ink leading-relaxed block">{COMPANY_DATA.contact.operatingHours}</span>
                    <span className="text-xs text-ink-mute leading-relaxed block mt-1">HQ hours: {hq.workingHours} · Branch hours may vary</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-ink/10 pt-4 flex flex-wrap gap-2">
                <span className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-3 py-1.5">
                  <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} /> CIN {COMPANY_DATA.cin}
                </span>
                <span className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-3 py-1.5">
                  <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} /> TAN {COMPANY_DATA.tan}
                </span>
              </div>

              {/* Hyderabad HQ — Map embed */}
              <div className="border-t border-ink/10 pt-6 space-y-3">
                <p className="label-mono text-ink-mute">Headquarters — Hyderabad</p>
                <div className="w-full aspect-[16/10] border border-ink/15 overflow-hidden bg-paper-deep">
                  <iframe
                    title="Varna Solar Hyderabad HQ — SR Nagar, Pillar 1036"
                    src="https://www.google.com/maps?q=8-3-214/7/1A+Pillar+No+1036+SR+Nagar+Hyderabad+500038&z=16&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://share.google/hyy85Y5dUZMvW45M8"
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono inline-flex items-center gap-1.5 text-sun hover:text-ink transition-colors"
                >
                  Open in Google Maps <ExternalLink aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} /> →
                </a>
                <p className="label-mono text-ink-mute text-[10px] leading-relaxed">8-3-214/7/1A, Pillar No: 1036, SR Nagar, Hyderabad 500038 — fallback query embed; share link opens full Google Maps.</p>
              </div>
            </div>

            {/* Branches — inverted */}
            <div className="bg-ink text-paper p-6 md:p-8">
              <p className="label-mono text-sun mb-1">Regional Branches — 4 offices</p>
              <p className="text-xs text-paper/50 leading-relaxed mb-6">Vizag · Adilabad · Vempalli · Tandur — DISCOM-coordinated execution across TS & AP</p>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
                {regional.map((b) => (
                  <div key={b.id} className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center bg-white/[0.04] border border-white/10 p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Building2 aria-hidden="true" className="w-4 h-4 text-sun shrink-0" strokeWidth={1.75} />
                      <span className="font-display font-bold uppercase tracking-tight text-sm truncate min-w-0">{b.city}</span>
                      <span className="label-mono text-paper/40 ml-auto text-[10px] border border-white/10 px-2 py-0.5 shrink-0">{b.state === 'Telangana' ? 'TS' : 'AP'}</span>
                    </div>
                    <p className="text-xs text-paper/60 leading-relaxed line-clamp-2">{b.address}</p>
                    <p className="label-mono text-paper/35 text-[10px] leading-relaxed truncate">{b.landmark}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="label-mono text-paper/40 inline-flex items-center gap-1.5 text-[10px]">
                        <Clock aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} /> {b.workingHours}
                      </span>
                      <a
                        href={b.googleMapsUrl ?? mapsUrl(b.address)}
                        target="_blank"
                        rel="noreferrer"
                        className="label-mono text-sun hover:text-paper transition-colors inline-flex items-center gap-1 text-[10px]"
                      >
                        Get Directions <ExternalLink aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <p className="label-mono text-paper/30 mt-4 text-[10px] leading-relaxed">All branches reachable on {COMPANY_DATA.contact.primaryPhone} · Central coordination from Hyderabad HQ</p>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-8 md:py-10">
        <div className="container-editorial flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="label-mono text-ink-mute max-w-xl leading-relaxed">
            Headquartered in SR Nagar, Hyderabad · Branches across Visakhapatnam, Adilabad, Vempalli and Tandur · TSSPDCL · TSNPDCL · APEPDCL · APSPDCL
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper px-3.5 py-2">
              <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} /> Waaree Channel Partner
            </span>
            <span className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper px-3.5 py-2">
              <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} /> Same-day response
            </span>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
