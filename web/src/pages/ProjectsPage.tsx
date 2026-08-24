import React, { useState } from 'react';
import { PageTransition } from '@/components/common/PageTransition';
import { PROJECTS_DATA } from '@/data/projectsData';
import { COMPANY_DATA } from '@/data/companyData';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

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
              
              <div className="mt-auto pt-4 border-t border-ink/10 flex flex-col gap-3 text-sm">
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                  <div>
                    <span className="text-ink-mute block mb-0.5">Client</span>
                    <strong className="text-ink leading-snug">{p.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-ink-mute block mb-0.5">Annual Savings</span>
                    <strong className="text-ink leading-snug">₹{p.annualSavingsINR.toLocaleString()}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-ink-mute block mb-0.5">Technology</span>
                    <strong className="text-ink leading-snug">{p.panelsUsed} <br/> {p.inverterUsed}</strong>
                  </div>
                </div>
                
                {p.keyTechnicalHighlights && (
                  <ul className="list-disc pl-4 text-xs text-ink-soft flex flex-col gap-1 mt-1">
                    {p.keyTechnicalHighlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
                
                {p.testimonial && (
                  <div className="mt-2 p-3 bg-paper-deep border-l-2 border-sun text-xs italic text-ink-soft leading-relaxed">
                    "{p.testimonial.quote}"
                  </div>
                )}
                
                <a 
                  href={COMPANY_DATA.contact.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-ink bg-paper text-ink hover:bg-ink hover:text-paper font-display font-bold uppercase tracking-tight transition-colors text-sm w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  Request Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
