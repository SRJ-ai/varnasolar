import React from 'react';
import { Sun, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { PageTransition } from '@/components/common/PageTransition';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md space-y-6">
          <div className="relative mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#FF5364] via-[#FF7A00] to-[#10B981] p-1 shadow-[0_0_35px_rgba(255,83,100,0.4)] flex items-center justify-center">
            <div className="w-full h-full bg-[#091322] rounded-[22px] flex items-center justify-center">
              <Sun className="w-12 h-12 text-amber-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white">404</h1>
            <h2 className="text-lg font-bold text-slate-200">Solar Route Not Found</h2>
            <p className="text-xs text-slate-400">
              The page you are looking for might have been moved, renamed, or is currently undergoing solar engineering upgrades.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <WatermelonButton to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return to Home
            </WatermelonButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
