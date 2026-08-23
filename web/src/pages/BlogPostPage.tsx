import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { BLOGS_DATA } from '@/data/blogsData';

function renderMarkdownLike(md: string): React.ReactNode[] {
  const lines = md.trim().split('\n');
  const nodes: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer.filter((l) => l.trim().startsWith('|'));
    if (rows.length >= 2) {
      const headerCells = rows[0].split('|').map((c) => c.trim()).filter(Boolean);
      const bodyRows = rows.slice(2).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));
      nodes.push(
        <div key={`table-${nodes.length}`} className="overflow-x-auto border border-ink/12 my-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink text-paper">
                {headerCells.map((h, j) => (
                  <th key={j} className="text-left font-semibold px-4 py-3 label-mono text-paper/80 normal-case tracking-normal">{h.replace(/\*\*/g, '')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="border-t border-ink/10 hover:bg-sun-tint">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-ink-soft leading-relaxed" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink">$1</strong>') }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableBuffer = [];
  };
  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (line.trim().startsWith('|')) { tableBuffer.push(line); return; }
    if (line.trim() === '---') { flushTable(); nodes.push(<hr key={`hr-${idx}`} className="border-ink/10 my-8" />); return; }
    if (line.trim() === '') { flushTable(); return; }
    flushTable();
    if (line.startsWith('# ')) {
      nodes.push(<h1 key={idx} className="font-display font-black uppercase tracking-tightest text-3xl md:text-4xl leading-none mt-10 mb-6">{line.replace(/^#\s+/, '').replace(/\*\*/g, '')}</h1>);
    } else if (line.startsWith('## ')) {
      const t = line.replace(/^##\s+/, '').replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
      const id = t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      nodes.push(<h2 key={idx} id={id} className="font-display font-black uppercase tracking-tightest text-2xl md:text-3xl leading-none mt-10 mb-4 scroll-mt-24">{t}</h2>);
    } else if (line.startsWith('### ')) {
      nodes.push(<h3 key={idx} className="font-display font-bold uppercase tracking-tight text-lg mt-8 mb-3">{line.replace(/^###\s+/, '').replace(/\*\*/g, '')}</h3>);
    } else if (/^\d+\.\s/.test(line.trim())) {
      nodes.push(<li key={idx} className="ml-6 list-decimal text-ink-soft leading-relaxed" dangerouslySetInnerHTML={{ __html: line.trim().replace(/^\d+\.\s*/, '').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink">$1</strong>').replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-paper-deep border border-ink/10 text-xs">$1</code>') }} />);
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      nodes.push(<li key={idx} className="ml-6 list-disc text-ink-soft leading-relaxed" dangerouslySetInnerHTML={{ __html: line.trim().replace(/^[-•]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink">$1</strong>') }} />);
    } else if (line.trim().startsWith('*') && line.trim().endsWith('*') && line.trim().length < 200) {
      nodes.push(<p key={idx} className="text-sm text-ink-mute italic leading-relaxed border-l-2 border-ink/10 pl-4 my-4">{line.trim().replace(/^\*|\*$/g, '')}</p>);
    } else {
      const html = line
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-paper-deep border border-ink/10 text-xs">$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline decoration-sun underline-offset-4 hover:text-sun">$1</a>');
      if (html.trim()) nodes.push(<p key={idx} className="text-[15px] md:text-[17px] leading-[1.8] text-ink-soft" dangerouslySetInnerHTML={{ __html: html }} />);
    }
  });
  flushTable();
  return nodes;
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOGS_DATA.find((b) => b.slug === slug) || BLOGS_DATA[0];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Number.isFinite(scrolled) ? Math.min(100, Math.max(0, scrolled)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  return (
    <PageTransition>
      {/* Reading progress — hairline sun bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div className="h-full bg-sun transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      {/* ═══ ARTICLE HEADER ═══ */}
      <section className="w-full hairline-b">
        <div className="container-editorial pt-14 pb-12 max-w-[880px]">
          <Link to="/blogs" className="inline-flex items-center gap-2 label-mono text-ink-mute hover:text-sun transition-colors mb-10">
            <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
            <span>Back to Knowledge Hub</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="label-mono bg-sun text-paper px-2.5 py-1">{post.category}</span>
            <span className="label-mono border border-ink/15 px-2.5 py-1">{post.readTimeMinutes} min</span>
          </div>
          <h1 className="headline-section text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.98] mb-8">{post.title}</h1>
          <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-[60ch] mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm border-t border-ink/12 pt-6">
            <span className="inline-flex items-center gap-2 text-ink-soft"><User className="w-4 h-4 text-ink/40" strokeWidth={1.75} />By <strong className="text-ink font-semibold">{post.author.name}</strong> — {post.author.role}</span>
            <span className="inline-flex items-center gap-1.5 text-ink-mute"><Calendar className="w-4 h-4" strokeWidth={1.75} />{post.publishedDate}</span>
            <span className="inline-flex items-center gap-1.5 text-sun font-medium"><Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />{post.readTimeMinutes} min read</span>
          </div>
          {post.featuredImage && (
            <div className="mt-10 overflow-hidden border border-ink/15 aspect-[16/9] bg-paper-deep">
              <img width="400" height="300" src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" loading="eager" onError={(e)=>{ (e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80'; }} />
            </div>
          )}
        </div>
      </section>

      {/* ═══ READ MODE — max-w-[65ch], h2 via font-display, pull-quote border-l-2 sun ═══ */}
      <section className="w-full py-12 md:py-16">
        <article>
          <div className="mx-auto max-w-[65ch] px-6 md:px-0">
            {/* Pull-quote */}
            <blockquote className="border-l-2 border-sun pl-6 py-2 my-10 bg-sun-tint">
              <span className="label-mono text-ink-mute block mb-2">Key takeaway</span>
              <p className="font-display font-bold uppercase tracking-tightest text-lg md:text-xl leading-tight">{post.category}, explained by engineers who install it in Telangana &amp; AP.</p>
            </blockquote>

            {/* TOC */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <nav className="border border-ink/12 bg-paper-card p-6 mb-10">
                <span className="label-mono text-ink-mute block mb-3">On this page</span>
                <ol className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-sm text-ink-soft hover:text-sun underline decoration-ink/20 underline-offset-4">{item.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Body — rendered from markdown-like content */}
            <div className="space-y-0">{renderMarkdownLike(post.content)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 hairline-t">
              {post.tags.map((t) => (
                <span key={t} className="label-mono border border-ink/12 px-3 py-1.5 bg-paper-card text-ink-mute">{t}</span>
              ))}
            </div>

            {/* Footer — back + next */}
            <div className="hairline-t mt-10 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <span className="text-sm text-ink-mute">Published {post.publishedDate} · By {post.author.name}</span>
              <div className="flex gap-3">
                <Link to="/blogs" className="btn-outline-premium !px-6 !py-3 !text-xs">More articles</Link>
                <Link to="/contact" className="btn-premium !px-6 !py-3 !text-xs">Talk to engineer</Link>
              </div>
            </div>

            {/* Related */}
            <div className="mt-14 border border-ink/12 bg-paper-card p-6">
              <span className="label-mono text-ink-mute block mb-4">Continue reading</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BLOGS_DATA.filter((b) => b.slug !== post.slug).slice(0, 2).map((rel) => (
                  <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group border border-ink/10 p-4 hover:bg-sun-tint hover:border-sun/20 transition-colors">
                    <span className="label-mono text-sun text-[10px]">{rel.category} · {rel.readTimeMinutes} min</span>
                    <span className="font-display font-bold uppercase tracking-tight text-sm leading-snug block mt-2 group-hover:text-sun line-clamp-2">{rel.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </PageTransition>
  );
};
