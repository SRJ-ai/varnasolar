import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { PageTransition } from '@/components/common/PageTransition';
import { BLOGS_DATA } from '@/data/blogsData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const blog = BLOGS_DATA.find((b) => b.slug === slug) || BLOGS_DATA[0];

  return (
    <PageTransition>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Hub</span>
          </Link>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
            {blog.category}
          </span>
        </div>

        {/* Title & Header */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-b border-white/10 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name} 
                className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" 
              />
              <div>
                <div className="font-bold text-white text-sm">{blog.author.name}</div>
                <div className="text-[11px] text-emerald-400">{blog.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {blog.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTimeMinutes} Min Read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={blog.featuredImage} 
            alt={blog.title} 
            className="w-full h-[320px] sm:h-[420px] object-cover" 
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
            💡 {blog.excerpt}
          </div>

          <div className="whitespace-pre-line space-y-4">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Tags:</span>
          {blog.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <GlassCard variant="glowing" glowColor="emerald" className="p-8 text-center space-y-4 mt-12 border-emerald-500/30">
          <h3 className="text-2xl font-bold text-white">Ready to Go Solar with Varna Solar?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get precision engineering, Waaree Tier-1 ALMM panels, and complete PM Surya Ghar ₹78,000 subsidy liaison.
          </p>
          <div className="pt-2">
            <WatermelonButton to="/solar-calculator" variant="primary" size="lg" glow={true} icon={<Calculator className="w-5 h-5" />}>
              Calculate Your Solar Savings Now
            </WatermelonButton>
          </div>
        </GlassCard>

      </article>
    </PageTransition>
  );
};
