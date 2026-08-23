import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, Phone, Mail, MapPin, Sparkles, Calculator, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Lock 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050B14] text-slate-300 pt-16 pb-8 border-t border-white/[0.08] overflow-hidden">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* TOP CTA BANNER */}
        <div className="relative mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#091322] via-[#0B1E3B] to-[#091322] border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Electricity Bill Revolution</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Cut Your Electricity Bill by up to 90%?
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Join 1,500+ satisfied homeowners, commercial establishments, and factories across Telangana and Andhra Pradesh with Tier-1 turnkey solar engineering.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link 
                to="/solar-calculator"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#FF5364] via-[#FF7A00] to-[#FFA133] shadow-[0_0_25px_rgba(255,83,100,0.4)] hover:shadow-[0_0_35px_rgba(255,122,0,0.55)] transition-all flex items-center justify-center gap-2 group"
              >
                <Calculator className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>Calculate Solar Savings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a 
                href="tel:+919182445679"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call +91 91824 45679</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-COLUMN RICH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* COLUMN 1: CORPORATE IDENTITY & MCA GOVERNANCE */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#059669] via-[#10B981] to-[#FF5364] p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                <div className="w-full h-full bg-[#091322] rounded-[10px] flex items-center justify-center">
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-extrabold text-xl tracking-tight text-white">
                  <span>Varna</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364] ml-1">
                    Solar
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold">
                  Pvt. Ltd.
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier Solar EPC contractor and Authorized Waaree Channel Partner delivering precision turnkey solar solutions across Hyderabad, Telangana, and Andhra Pradesh.
            </p>

            {/* Corporate Registrations */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-[11px]">
              <div className="text-slate-400 flex items-center justify-between">
                <span>CIN:</span>
                <span className="font-mono text-slate-300 font-semibold">U35105TS2025PTC197488</span>
              </div>
              <div className="text-slate-400 flex items-center justify-between">
                <span>TAN:</span>
                <span className="font-mono text-slate-300 font-semibold">HYDV28422C</span>
              </div>
            </div>

            {/* MCA Director Records */}
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Board of Directors:</div>
              <p>• Mrs. Thade Suvarna Devi <span className="text-emerald-400 font-mono font-semibold">(DIN: 07095392)</span></p>
              <p>• Mr. Thade Soma Sekhar <span className="text-emerald-400 font-mono font-semibold">(DIN: 07095383)</span></p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                100% DISCOM Approved
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400">
                <ShieldCheck className="w-3 h-3" />
                30-Yr Warranty
              </span>
            </div>
          </div>

          {/* COLUMN 2: SOLAR EPC SOLUTIONS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Solar Solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/residential-solar" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Residential Rooftop Solar</span>
                </Link>
              </li>
              <li>
                <Link to="/commercial-solar" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Commercial Solar Systems</span>
                </Link>
              </li>
              <li>
                <Link to="/industrial-solar" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Industrial Power Plants (MW)</span>
                </Link>
              </li>
              <li>
                <Link to="/agriculture-solar" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Agriculture Solar Water Pumps</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Landmark Solar Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Turnkey EPC Engineering</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: GOVT SCHEMES & TOOLS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Govt Schemes &amp; Tools
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/pm-surya-ghar-yojana" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    <span>PM Surya Ghar Yojana</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">₹78k</span>
                </Link>
              </li>
              <li>
                <Link to="/pm-kusum-scheme" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    <span>PM KUSUM Scheme</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">60%</span>
                </Link>
              </li>
              <li>
                <Link to="/solar-calculator" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>38-State Solar Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>About Varna Solar</span>
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Solar Knowledge Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 group">
                  <Lock className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                  <span>Internal Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: HEAD OFFICE & 4 BRANCH LOCATIONS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Offices &amp; Branches
            </h3>
            
            {/* Head Office */}
            <div className="text-xs space-y-1.5">
              <p className="font-bold text-slate-200">Headquarters (Hyderabad):</p>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                8-3-214/7/1A, 2nd Fl, Beside Sri Chaitanya School, Pillar No. 1036, SR Nagar, Hyderabad, TS - 500038
              </p>
              <div className="pt-1 space-y-1">
                <a href="tel:+919182445679" className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 91824 45679</span>
                </a>
                <a href="mailto:info@varnasolar.com" className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>info@varnasolar.com</span>
                </a>
              </div>
            </div>

            {/* 4 Regional Branches Badges */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Regional Branches:</p>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                  <span className="font-semibold text-white">1. Visakhapatnam</span> (AP)
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                  <span className="font-semibold text-white">2. Adilabad</span> (TS)
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                  <span className="font-semibold text-white">3. Vempalli</span> (AP)
                </div>
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                  <span className="font-semibold text-white">4. Tandur</span> (TS)
                </div>
              </div>
            </div>

            {/* DISCOM Badges */}
            <div className="pt-1">
              <p className="text-[10px] text-slate-400 mb-1">Active DISCOM Coverage:</p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">TSSPDCL</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">TSNPDCL</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">APEPDCL</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">APSPDCL</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center flex-wrap gap-2 text-center md:text-left">
            <span>© {currentYear} Varna Solar Pvt. Ltd. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="text-slate-400 font-medium">Authorized Waaree Channel Partner</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/about-us" className="hover:text-white transition-colors">About</Link>
            <Link to="/solar-calculator" className="hover:text-white transition-colors">Calculator</Link>
            <Link to="/pm-surya-ghar-yojana" className="hover:text-white transition-colors">PM Subsidy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
