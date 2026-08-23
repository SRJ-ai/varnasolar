import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Zap, IndianRupee, Leaf, Building2, X, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { PROJECTS_DATA } from '@/data/projectsData';
import { COMPANY_DATA } from '@/data/companyData';
import type { ProjectCaseStudy } from '@/types/project';

const ease = [0.16, 1, 0.3, 1] as const;

const SECTORS = ['All', 'Industrial', 'Commercial', 'Residential', 'Agriculture'] as const;
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80';

function formatSavings(inr: number): string {
  if (inr >= 10000000) return `₹${(inr / 10000000).toFixed(2)} Cr/yr`;
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(1)}L/yr`;
  if (inr >= 1000) return `₹${(inr / 1000).toFixed(0)}k/yr`;
  return `₹${inr.toLocaleString('en-IN')}/yr`;
}

function getProjectImages(p: ProjectCaseStudy): string[] {
  if (p.galleryImages && p.galleryImages.length >= 1) return p.galleryImages;
  return [p.imageUrl];
}

function isAssamDual(p: ProjectCaseStudy): boolean {
  return !!p.galleryImages && p.galleryImages.length >= 2;
}

export const ProjectsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);

  const filteredProjects = selectedSector === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.sector === selectedSector);
  const featuredCount = PROJECTS_DATA.filter((p) => p.isFeatured).length;

  const closeModal = useCallback(() => setActiveProject(null), []);
  const openModal = useCallback((p: ProjectCaseStudy) => setActiveProject(p), []);

  // body scroll lock + Esc
  useEffect(() => {
    if (!activeProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeProject, closeModal]);

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
            <img width="400" height="300" src="/images/varna-logo2.png" alt="Varna Solar" className="h-7 w-auto object-contain" />
            <span className="label-mono text-ink-mute hidden sm:inline">Portfolio — 9 case studies · {featuredCount} featured · 15+ MW executed</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.04 }}
            className="label-mono text-sun mb-4"
          >
            Portfolio — 9 case studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="headline-hero text-[clamp(2.8rem,8vw,7rem)] max-w-6xl"
          >
            Built work,
            <br />
            <span className="text-sun">not promises.</span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-10">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md"
            >
              Nine live installations across Telangana, Andhra Pradesh and Assam — residential, commercial, industrial and agricultural. Filter by category or explore the full portfolio.
            </motion.p>

            {/* Sector Filters — sharp editorial */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.28 }}
              className="flex flex-wrap gap-px bg-ink/12 border border-ink/12"
            >
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    selectedSector === sector ? 'bg-ink text-paper' : 'bg-paper text-ink-mute hover:bg-sun-tint hover:text-ink'
                  }`}
                  aria-pressed={selectedSector === sector}
                >
                  {sector}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <span className="label-mono text-ink-mute py-1">Partner context:</span>
            <span className="label-mono border border-ink/12 bg-paper-card px-3 py-1.5 text-ink-soft">30 enterprise &amp; PSU clients</span>
            <span className="label-mono border border-ink/12 bg-paper-card px-3 py-1.5 text-ink-soft">NTPC · BHEL · GMR · ITC · AAI · TGGENCO</span>
            <Link to="/why-choose-us" className="label-mono border border-ink/15 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors">
              Why choose us →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECT GRID — sharp bordered grid ═══ */}
      <section className="w-full hairline-t py-12 md:py-16">
        <div className="container-editorial">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-ink-mute py-20 text-lg">No projects found for this sector yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-ink/12">
              {filteredProjects.map((project, idx) => {
                const dual = isAssamDual(project);
                const imgs = getProjectImages(project);
                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, ease, delay: (idx % 3) * 0.06 }}
                    onClick={() => openModal(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(project);
                      }
                    }}
                    className="group border-r border-b border-ink/12 flex flex-col bg-paper-card hover:bg-white transition-colors cursor-pointer text-left"
                  >
                    <div className="relative overflow-hidden w-full border-b border-ink/12 bg-paper-deep">
                      {dual ? (
                        <div className="grid grid-cols-2 gap-px bg-ink/12 aspect-[16/10]">
                          {imgs.slice(0, 2).map((src, i) => (
                            <div key={i} className="relative overflow-hidden bg-paper-deep">
                              <img width="400" height="300"
                                src={src}
                                alt={`${project.title} ${i + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 absolute inset-0"
                                onError={(e) => {
                                  const img = e.currentTarget as HTMLImageElement;
                                  if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
                                }}
                              />
                              {/* keep aspect via container */}
                              <div className="aspect-[8/10] w-full" aria-hidden />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="aspect-[16/10] w-full relative overflow-hidden">
                          <img width="400" height="300"
                            src={project.imageUrl}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
                            }}
                          />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 label-mono bg-paper border border-ink/12 px-2.5 py-1 text-ink-soft">
                        {project.sector}
                      </span>
                      <span className="absolute top-3 right-3 bg-paper px-3 py-1 label-mono text-ink border border-ink/15">
                        {project.systemCapacity}
                      </span>
                      {project.isFeatured && (
                        <span className="absolute bottom-3 left-3 label-mono bg-sun text-paper px-2.5 py-1 border border-sun">Featured</span>
                      )}
                    </div>

                    <div className="flex flex-col flex-grow p-6 md:p-7 gap-4">
                      <h2 className="font-display font-black uppercase tracking-tight text-base md:text-lg leading-tight line-clamp-2 group-hover:text-sun transition-colors">
                        {project.title}
                      </h2>

                      <div className="space-y-2">
                        <p className="inline-flex items-center gap-1.5 text-xs text-ink-mute leading-relaxed">
                          <Building2 aria-hidden="true" className="w-3.5 h-3.5 text-sun shrink-0" strokeWidth={1.75} />
                          <span className="font-medium text-ink-soft line-clamp-1">{project.clientName}</span>
                        </p>
                        <p className="inline-flex items-center gap-1.5 text-xs text-ink-mute leading-relaxed">
                          <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-sun shrink-0" strokeWidth={1.75} />
                          {project.location}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-4 mt-2 border-t border-ink/10">
                        <div>
                          <span className="label-mono text-ink-mute block mb-1 text-[10px]">Annual Savings</span>
                          <span className="font-display font-black uppercase tracking-tight text-sm leading-none flex items-center gap-1">
                            <IndianRupee aria-hidden="true" className="w-3 h-3" strokeWidth={2} />
                            {formatSavings(project.annualSavingsINR).replace('₹', '')}
                          </span>
                        </div>
                        <div>
                          <span className="label-mono text-ink-mute block mb-1 text-[10px]">Generation</span>
                          <span className="font-display font-black uppercase tracking-tight text-sm leading-none flex items-center gap-1">
                            <Zap aria-hidden="true" className="w-3 h-3 text-sun" strokeWidth={1.75} />
                            {(project.annualGenerationKWh / 1000).toFixed(0)}k kWh
                          </span>
                        </div>
                        <div>
                          <span className="label-mono text-ink-mute block mb-1 text-[10px]">CO₂ Offset</span>
                          <span className="font-display font-black uppercase tracking-tight text-sm leading-none flex items-center gap-1">
                            <Leaf aria-hidden="true" className="w-3 h-3 text-sun" strokeWidth={1.75} />
                            {project.co2OffsetTonnesPerYear}t
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="label-mono text-ink-mute text-[10px]">
                          {project.systemTopology} · {project.completionYear}
                        </span>
                        <span className="inline-flex items-center gap-1 label-mono text-ink-soft group-hover:text-sun transition-colors">
                          View details <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="label-mono text-ink-mute">
              Showing {filteredProjects.length} of {PROJECTS_DATA.length} projects
              {selectedSector !== 'All' ? ` · Filtered by "${selectedSector}"` : ' · All sectors'}
            </p>
            <span className="hidden sm:inline text-ink/20">—</span>
            <span className="label-mono text-ink-mute">
              {PROJECTS_DATA.filter((p) => p.isFeatured).length} featured · {PROJECTS_DATA.length - PROJECTS_DATA.filter((p) => p.isFeatured).length} standard
            </span>
          </div>
        </div>
      </section>

      {/* ═══ PARTNER LOGOWALL CONTEXT ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-10 md:py-14 overflow-hidden">
        <div className="container-editorial">
          <p className="label-mono text-ink-mute mb-4">Trusted by leading organisations — project partner context</p>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-3 pr-3">
                {COMPANY_DATA.clientLogos.slice(0, 12).map((client) => (
                  <div
                    key={`${dup}-${client.id}`}
                    className="shrink-0 w-[160px] h-[72px] bg-paper-card border border-ink/10 flex items-center justify-center px-4 py-2"
                    title={client.name}
                  >
                    {client.logoUrl ? (
                      <img width="400" height="300"
                        src={client.logoUrl}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-8 max-w-[130px] w-auto h-auto object-contain grayscale opacity-70"
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.style.display = 'none';
                          const fb = t.nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <span
                      style={{ display: client.logoUrl ? 'none' : 'block' }}
                      className="font-display font-black uppercase tracking-tight text-xs text-ink-soft text-center leading-tight"
                    >
                      {client.logoPlaceholderText}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="label-mono text-ink-mute mt-4">30 partners — NTPC · BHEL · GMR · ITC · AAI · Indian Railways · TGGENCO and more</p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-black uppercase tracking-tightest leading-[0.92] text-[clamp(1.7rem,4vw,3rem)]">
              <span className="bg-sun text-paper px-2.5 py-1.5 leading-none inline box-decoration-clone">WANT YOUR ROOF ON<br />THIS PAGE?</span>
            </h2>
            <p className="text-sm text-paper/60 leading-relaxed max-w-xl mt-4">
              Free site assessment, DISCOM net-metering and subsidy filing — end-to-end. Talk to an engineer today.
            </p>
          </div>
          <Link to="/contact" className="btn-premium !bg-sun !border-sun hover:!bg-paper hover:!border-paper hover:!text-ink shrink-0">
            Request a quote <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </section>

      {/* ═══ VIEW DETAILS MODAL ═══ */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-[6px]"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-3xl bg-paper-card border border-ink/15 rounded-none overflow-hidden flex flex-col max-h-[85vh] overflow-y-auto"
            >
              {/* Close X */}
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-paper border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors"
              >
                <X aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
              </button>

              {/* Image carousel */}
              <div className="w-full border-b border-ink/12 bg-paper-deep">
                {isAssamDual(activeProject) ? (
                  <div className="flex gap-px bg-ink/12 overflow-x-auto snap-x snap-mandatory scrollbar-none overscroll-contain" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
                    {getProjectImages(activeProject)
                      .slice(0, 2)
                      .map((src, i) => (
                        <div key={i} className="relative aspect-[4/3] flex-shrink-0 w-[88%] sm:w-1/2 snap-center overflow-hidden bg-paper-deep">
                          <img width="400" height="300"
                            src={src}
                            alt={`${activeProject.title} ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
                            }}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img width="400" height="300"
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
                      }}
                    />
                    <span className="absolute top-4 left-4 label-mono bg-paper border border-ink/12 px-2.5 py-1 text-ink-soft">{activeProject.sector}</span>
                    <span className="absolute top-4 right-12 bg-paper px-3 py-1 label-mono text-ink border border-ink/15">{activeProject.systemCapacity}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                {/* Location + title */}
                <div>
                  <p className="inline-flex items-center gap-1.5 label-mono text-sun mb-2">
                    <MapPin aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {activeProject.location}
                  </p>
                  <h3 className="font-display font-black uppercase tracking-tight text-xl md:text-2xl leading-tight text-ink">{activeProject.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed mt-2">
                    {activeProject.clientName} · {activeProject.district}, {activeProject.state} · {activeProject.systemTopology} · {activeProject.completionYear}
                  </p>
                </div>

                {/* Sharp detail card */}
                <div className="border border-ink/12 bg-paper rounded-none divide-y divide-ink/12">
                  <div className="grid grid-cols-1">
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                      <span className="label-mono text-ink-mute">System Capacity</span>
                      <span className="font-display font-black uppercase tracking-tight text-sm text-ink text-right">{activeProject.systemCapacity}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                      <span className="label-mono text-ink-mute">Annual Generation</span>
                      <span className="font-display font-black uppercase tracking-tight text-sm text-ink text-right">
                        {activeProject.slug === '300-solar-street-lights-assam' ? 'Solar Powered LED' : `${activeProject.annualGenerationKWh.toLocaleString('en-IN')} kWh/yr`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                      <span className="label-mono text-ink-mute">Estimated Savings</span>
                      {activeProject.slug === '300-solar-street-lights-assam' ? (
                        <span className="font-display font-black uppercase tracking-tight text-sm text-emerald-600 text-right">100% Grid-Free Operation</span>
                      ) : (
                        <span className="font-display font-black uppercase tracking-tight text-sm text-emerald-600 text-right">{formatSavings(activeProject.annualSavingsINR)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                      <span className="label-mono text-ink-mute">Government Subsidy / Policy</span>
                      <span className="font-display font-bold uppercase tracking-tight text-xs md:text-sm text-ink text-right max-w-[60%] leading-tight">
                        {activeProject.policyOrSubsidyApplied}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-sun-tint border border-ink/10 p-5 md:p-6">
                  <p className="font-display text-sm md:text-[15px] leading-relaxed text-ink">
                    <span className="text-sun font-black">“</span>
                    {activeProject.testimonial.quote}
                    <span className="text-sun font-black">”</span>
                  </p>
                  <p className="label-mono text-ink-mute mt-3">
                    — {activeProject.testimonial.clientName}
                    {activeProject.testimonial.designation ? ` · ${activeProject.testimonial.designation}` : ''}
                    {activeProject.testimonial.organization && activeProject.testimonial.organization !== activeProject.testimonial.clientName
                      ? ` · ${activeProject.testimonial.organization}`
                      : ''}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/919182445679?text=${encodeURIComponent(`Hello Varna Solar, I am interested in similar ${activeProject.title} in ${activeProject.location}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-mono text-xs uppercase tracking-widest px-6 py-4 border border-[#25D366] hover:bg-[#1fb255] hover:border-[#1fb255] transition-colors w-full"
                >
                  <MessageSquare aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
                  Request Similar Project via WhatsApp
                </a>

                <p className="label-mono text-ink-mute text-center text-[10px]">Replies via WhatsApp Business · +91 91824 45679 · Mon–Sat 9AM–7PM IST</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
