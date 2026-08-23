import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles, Calculator, ArrowRight } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="relative z-50 bg-[#050B14] text-slate-300 border-b border-white/[0.08] text-xs py-2 px-4 sm:px-6 lg:px-12 font-medium">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        
        {/* Left Side: Contact & Location Info */}
        <div className="flex items-center flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
          {/* Phone Hotline */}
          <a 
            href="tel:+919182445679" 
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors group"
            title="Call Varna Solar Hotline"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
              <Phone className="w-3 h-3" />
            </div>
            <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">+91 91824 45679</span>
          </a>

          {/* Email Address */}
          <a 
            href="mailto:info@varnasolar.com" 
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors group"
            title="Send Email"
          >
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10">
              <Mail className="w-3 h-3" />
            </div>
            <span>info@varnasolar.com</span>
          </a>

          {/* Location Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hyderabad, Telangana &amp; AP</span>
          </div>
        </div>

        {/* Right Side: Subsidy Callout & Quick Calculator Link */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* PM Surya Ghar Pulsating Badge */}
          <Link 
            to="/pm-surya-ghar-yojana" 
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all text-emerald-300 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              PM Surya Ghar: <span className="text-emerald-400 font-bold">₹78,000 Subsidy</span>
            </span>
          </Link>

          {/* Quick Calculator Link */}
          <Link 
            to="/solar-calculator" 
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors group"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-semibold">Solar Calculator</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
