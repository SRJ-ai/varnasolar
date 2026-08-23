import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { BLOGS_DATA } from '@/data/blogsData';

export const BlogsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Government Subsidies', 'Residential Guides', 'Commercial Solar', 'Maintenance & Tech', 'Agriculture Pumps'];

  const filteredBlogs = selectedCategory === 'All'
    ? BLOGS_DATA
    : BLOGS_DATA.filter((b) => b.category === selectedCategory);

  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Knowledge Hub</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>Solar Engineering Insights &amp; Policy Guides</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Solar Knowledge Base &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Expert Articles
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Practical guides on PM Surya Ghar subsidy claims, net-metering regulations, commercial tax depreciation, and preventative panel maintenance.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-glow-emerald'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS LISTING */}
      <section className="py-12 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <GlassCard key={blog.id} variant="dark" className="overflow-hidden p-0 border-white/10 flex flex-col justify-between">
              <Link to={`/blog/${blog.slug}`} className="block relative group overflow-hidden">
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050B14]/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                  {blog.category}
                </div>
              </Link>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span>{blog.publishedDate}</span>
                  </div>
                  
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-lg font-bold text-white leading-snug hover:text-emerald-400 transition-colors">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name} 
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <span className="text-xs font-semibold text-slate-300">{blog.author.name}</span>
                  </div>

                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Read Guide</span> <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};
