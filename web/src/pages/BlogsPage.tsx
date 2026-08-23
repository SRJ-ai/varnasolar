import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { BLOGS_DATA } from '@/data/blogsData';

const ease = [0.16, 1, 0.3, 1] as const;

export const BlogsPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial pt-14 pb-12">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="label-mono text-sun mb-6">Knowledge Hub — Telangana &amp; AP · {BLOGS_DATA.length} articles</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(2.8rem,8vw,7.5rem)] max-w-6xl">
            Solar<br /><span className="text-sun">insights.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mt-10">
            In-depth guides on net metering, MNRE subsidies, sizing, pumps and maintenance — written by engineers who install it.
          </motion.p>
        </div>
      </section>

      {/* ═══ ARTICLE INDEX — hairline editorial rows (index mono + display title + excerpt + arrow) ═══ */}
      <section className="w-full hairline-t py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex items-center justify-between mb-8">
            <span className="label-mono text-ink-mute">{BLOGS_DATA.length} entries — all categories</span>
            <span className="hidden md:inline label-mono text-ink/30">Category · Read time · Author · Date</span>
          </div>
          <div className="border-t border-ink/12">
            {BLOGS_DATA.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: (i % 4) * 0.06 }}>
                <Link to={`/blog/${post.slug}`} className="group grid grid-cols-[auto_1fr] lg:grid-cols-[64px_1fr_300px_48px] items-start gap-x-6 gap-y-3 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2">
                  <span className="label-mono text-ink-mute group-hover:text-sun transition-colors pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="label-mono text-sun">{post.category}</span>
                      <span className="text-xs text-ink-mute">{post.readTimeMinutes} min read</span>
                      <span className="hidden sm:inline text-xs text-ink/30">·</span>
                      <span className="hidden sm:inline text-xs text-ink-mute">{post.publishedDate}</span>
                    </div>
                    <h2 className="font-display font-black uppercase tracking-tightest text-xl md:text-[1.75rem] leading-[0.95] mb-3 group-hover:text-sun transition-colors line-clamp-3">{post.title}</h2>
                    <p className="text-sm md:text-[15px] text-ink-soft leading-relaxed line-clamp-2 max-w-[62ch]">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[11px] border border-ink/10 px-2 py-1 text-ink-mute bg-paper-card">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col gap-1 self-center border-l border-ink/12 pl-6 min-w-0">
                    <span className="text-sm font-medium leading-tight truncate">{post.author.name}</span>
                    <span className="text-xs text-ink-mute leading-tight">{post.author.role}</span>
                    <span className="label-mono text-ink/30 mt-2">{post.publishedDate}</span>
                  </div>
                  <ArrowRight aria-hidden="true" className="w-6 h-6 justify-self-end self-center text-ink/30 group-hover:text-sun group-hover:translate-x-1 transition-all shrink-0" strokeWidth={1.75} />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-premium">Ask an engineer <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            <Link to="/solar-calculator" className="btn-outline-premium">Run your numbers</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
