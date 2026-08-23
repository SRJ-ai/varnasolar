import React, { useState } from 'react';
import { FolderGit2, Sparkles, CheckCircle2, ArrowRight, Star, Building2, Factory, Sprout, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ProjectSector } from '@/types/project';

export const ProjectsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.sector === selectedFilter);

  const filterOptions = ['All', 'Residential', 'Commercial', 'Industrial', 'Agriculture'];

  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Projects Portfolio</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>15+ MW Installed • 1,500+ Projects Across Telangana &amp; AP</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Landmark Solar EPC{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Case Studies
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Explore our real-world rooftop solar and captive power plant installations with technical specifications, verified generation stats, and client reviews.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedFilter === opt
                    ? 'bg-emerald-500 text-white shadow-glow-emerald'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID (9 CASE STUDIES) */}
      <section className="py-12 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <GlassCard key={project.id} variant="dark" className="overflow-hidden p-0 border-white/10 flex flex-col justify-between">
              <div className="relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-52 object-cover" 
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050B14]/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {project.systemCapacity}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold">
                  {project.completionYear}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold">{project.sector}</span>
                    <span className="text-slate-400">{project.district}, {project.state}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
                  <p className="text-xs text-slate-300 font-semibold">{project.clientName}</p>
                </div>

                {/* Technical highlights */}
                <div className="space-y-1.5 py-3 border-t border-b border-white/5 text-[11px] text-slate-400">
                  <div><strong>Panels:</strong> {project.panelsUsed}</div>
                  <div><strong>Inverter:</strong> {project.inverterUsed}</div>
                  <div><strong>Annual Gen:</strong> {project.annualGenerationKWh.toLocaleString('en-IN')} kWh/yr</div>
                </div>

                {/* Testimonial quote snippet */}
                {project.testimonial && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-300 italic">
                    "{project.testimonial.quote.slice(0, 110)}..."
                    <div className="mt-1 font-bold text-emerald-400 not-italic">— {project.testimonial.clientName}</div>
                  </div>
                )}

                <div className="pt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Annual Savings</div>
                    <div className="font-bold text-emerald-400 text-sm">₹{(project.annualSavingsINR / 100000).toFixed(1)} Lakhs/yr</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Payback</div>
                    <div className="font-bold text-amber-400 text-sm">{project.paybackYears} Yrs</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};
