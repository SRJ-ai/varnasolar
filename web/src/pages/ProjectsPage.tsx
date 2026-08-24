import React, { useState } from 'react';
import { PageTransition } from '@/components/common/PageTransition';
import { PROJECTS_DATA } from '@/data/projectsData';

const SECTORS = ['All', 'Industrial', 'Commercial', 'Residential', 'Agriculture'] as const;

export const ProjectsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  
  const filteredProjects = selectedSector === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.sector === selectedSector);

  return (
    <PageTransition>
      <div className="container-editorial py-12">
        <h1 className="text-4xl font-black mb-8">Projects</h1>
        
        <div className="flex gap-2 mb-8 flex-wrap">
          {SECTORS.map(sector => (
            <button 
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-4 py-2 border ${selectedSector === sector ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
            >
              {sector}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => (
            <div key={p.id} className="border border-ink/15 p-4 flex flex-col gap-4">
              <img src={p.imageUrl} alt={p.title} className="w-full aspect-video object-cover bg-ink/5" loading="lazy" />
              <div>
                <span className="text-xs font-mono bg-ink/10 px-2 py-1">{p.sector}</span>
                <h2 className="font-bold text-lg mt-2 leading-tight">{p.title}</h2>
                <p className="text-sm text-ink-soft">{p.location} · {p.systemCapacity}</p>
              </div>
              
              {/* ponytail: Native HTML details instead of heavy framer-motion modal. Add modal when details tag is insufficient. */}
              <details className="mt-auto pt-4 border-t border-ink/10 cursor-pointer">
                <summary className="font-mono text-xs text-sun hover:underline">View Details</summary>
                <div className="pt-3 flex flex-col gap-2 text-sm">
                  <p><strong>Client:</strong> {p.clientName}</p>
                  <p><strong>Generation:</strong> {p.annualGenerationKWh.toLocaleString()} kWh/yr</p>
                  <p><strong>Savings:</strong> ₹{p.annualSavingsINR.toLocaleString()}/yr</p>
                  <p><strong>Offset:</strong> {p.co2OffsetTonnesPerYear} tonnes CO₂</p>
                  <p className="italic text-ink-soft mt-2">"{p.testimonial.quote}"</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
