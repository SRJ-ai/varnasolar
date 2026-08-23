import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';

const ease = [0.16, 1, 0.3, 1] as const;

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-paper">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-xl mx-auto text-center space-y-8"
        >
          <h1 className="headline-hero text-[clamp(6rem,20vw,14rem)] leading-none">
            404<span className="text-sun">.</span>
          </h1>
          <p className="text-base text-ink-soft leading-relaxed max-w-sm mx-auto">
            This page could not be found on the Varna Solar server.
          </p>
          <Link to="/" className="btn-premium inline-flex">
            <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
            Return to Home
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
};
