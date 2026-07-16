import { useParams, Link } from 'react-router-dom';
import { useGetBlogsQuery, useGetSettingsQuery } from '../../store/apiSlice';
import { ArrowLeft, LinkIcon, Share } from 'lucide-react';
import SEO from '../../components/SEO';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SingleBlog = () => {
  const { slug } = useParams();
  const { data: allBlogs, isLoading } = useGetBlogsQuery();
  const { data: settings } = useGetSettingsQuery();
  const socials = settings?.socialLinks || {};

  const blogIndex = allBlogs?.findIndex(b => b.slug === slug);
  const blog = allBlogs?.[blogIndex];
  const nextBlog = blogIndex !== undefined && blogIndex > 0 ? allBlogs[blogIndex - 1] : null;
  const prevBlog = blogIndex !== undefined && blogIndex < allBlogs?.length - 1 ? allBlogs[blogIndex + 1] : null;

  const relatedBlogs = allBlogs?.filter(b => b.category?._id === blog?.category?._id && b._id !== blog?._id).slice(0, 2);

  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef(null);

  useGSAP(() => {
    const reveals = gsap.utils.toArray('.gsap-reveal');
    reveals.forEach((element) => {
      gsap.from(element, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, [blog]);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TOC Generation
  useEffect(() => {
    if (contentRef.current && blog) {
      const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      const parsedHeadings = elements.map((el) => {
        if (!el.id) {
          el.id = el.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        return {
          id: el.id,
          text: el.innerText,
          level: Number(el.tagName.replace('H', ''))
        };
      });
      setHeadings(parsedHeadings);
    }
  }, [blog]);

  // Active TOC tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('h2, h3');
      elements.forEach((elem) => observer.observe(elem));
    }
    return () => observer.disconnect();
  }, [headings]);

  if (isLoading || !allBlogs) return <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">Loading...</div>;
  if (!blog) return <div className="min-h-screen bg-[#000000] flex items-center justify-center text-[#a1a1aa]">Article not found.</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white selection:bg-accent selection:text-black pb-24">
      <SEO 
        title={`${blog.title} | Aniket Kumar`}
        description={blog.excerpt || `Read ${blog.title} by Aniket Kumar.`}
        image={blog.featuredImage || settings?.profileImage}
        type="article"
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt || blog.createdAt}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": blog.title,
          "image": [
            blog.featuredImage || settings?.profileImage || "https://aniket-kumar.vercel.app/ProfileNoBG.png"
          ],
          "datePublished": blog.createdAt,
          "dateModified": blog.updatedAt || blog.createdAt,
          "author": [{
            "@type": "Person",
            "name": "Aniket Kumar",
            "url": "https://aniket-kumar.vercel.app"
          }]
        }}
      />

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-150"
        style={{ width: `${progress * 100}%` }}
      />

      <article>
        {/* 1. Cinematic Hero */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-end pt-20 border-b border-[#27272a] overflow-hidden">

          {/* Massive Background Text */}
          <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
            <div className="text-[20vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
              {blog.category?.name || 'ARTICLE'}
            </div>
          </div>

          <div className="absolute inset-0 z-10">
            {blog.featuredImage ? (
              <img src={blog.featuredImage} alt={blog.title} loading="eager" fetchPriority="high" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
            ) : (
              <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center opacity-40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent"></div>
          </div>

          <div className="container-max relative z-20 w-full pb-16 gsap-reveal">
            <div className="max-w-[900px]">
              <Link to="/blog" className="inline-flex items-center text-[#a1a1aa] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-10 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Logs
              </Link>

              <div className="flex items-center gap-3 text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-4">
                <span className="px-3 py-1.5 bg-[#111111] border border-[#27272a] rounded-full text-accent">{blog.category?.name || 'Article'}</span>
                <span className="px-3 py-1.5 bg-[#111111] border border-[#27272a] rounded-full text-white">{blog.readingTime || 5} min read</span>
                <span className="px-3 py-1.5 bg-[#111111] border border-[#27272a] rounded-full text-[#a1a1aa]">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.1] drop-shadow-2xl">
                {blog.title}
              </h1>

              {/* {blog.excerpt && (
                <p className="text-xl md:text-2xl text-[#a1a1aa] leading-relaxed mb-10 font-medium">
                  {blog.excerpt}
                </p>
              )} */}
            </div>
          </div>
        </section>

        {/* 2. Main Content & Layout Grid */}
        <div className="container-max pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24 relative items-start">

            {/* Main Content Column */}
            <div className="max-w-[820px] w-full mx-auto lg:ml-auto lg:mr-0">

              {/* Author Bio Banner (Top) */}
              <div className="flex items-center gap-4 py-8 mb-12 border-b border-[#27272a] gsap-reveal">
                <div className="w-14 h-14 rounded-full bg-[#111111] border border-[#27272a] flex items-center justify-center font-bold text-lg overflow-hidden">
                  <img src="/Profile.png" alt="Aniket Kumar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Aniket Kumar</p>
                  <p className="text-xs font-bold text-accent uppercase tracking-widest">Game Developer</p>
                </div>
              </div>

              {/* Prose Content */}
              <div
                ref={contentRef}
                className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-white prose-img:rounded-2xl max-w-none text-[#e4e4e7] mb-24 gsap-reveal leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Author Bio Footer */}
              <div className="bg-[#0A0A0A] border border-[#27272a] rounded-3xl p-8 mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left gsap-reveal">
                <div className="w-24 h-24 flex-shrink-0 rounded-full bg-[#111111] border border-[#27272a] overflow-hidden">
                  <img src="/Profile.png" alt="Aniket Kumar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-2xl mb-1 text-white">Aniket Kumar</h3>
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Game Developer</p>
                  <p className="text-[#a1a1aa] leading-relaxed mb-6">
                    Building digital worlds, documenting game architecture, and sharing technical deep-dives into Unity and indie game development.
                  </p>
                  <div className="flex gap-4 justify-center sm:justify-start">
                    <a href={socials.github || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#a1a1aa] hover:text-white transition-colors">GitHub</a>
                    <a href={socials.linkedin || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#a1a1aa] hover:text-white transition-colors">LinkedIn</a>
                    <a href={socials.itchio || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#a1a1aa] hover:text-white transition-colors">Itch.io</a>
                  </div>
                </div>
              </div>

              {/* Next/Prev Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 gsap-reveal">
                {prevBlog ? (
                  <Link to={`/blog/${prevBlog.slug}`} className="group p-8 bg-[#0A0A0A] border border-[#27272a] rounded-3xl hover:border-accent transition-colors">
                    <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-3 block">Previous Log</span>
                    <h4 className="font-bold text-xl text-white group-hover:text-accent transition-colors line-clamp-2">{prevBlog.title}</h4>
                  </Link>
                ) : <div />}

                {nextBlog ? (
                  <Link to={`/blog/${nextBlog.slug}`} className="group p-8 bg-[#0A0A0A] border border-[#27272a] rounded-3xl hover:border-accent transition-colors text-right flex flex-col items-end">
                    <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-3 block">Next Log</span>
                    <h4 className="font-bold text-xl text-white group-hover:text-accent transition-colors line-clamp-2">{nextBlog.title}</h4>
                  </Link>
                ) : <div />}
              </div>

            </div>

            {/* Sticky Sidebar */}
            <div className="hidden lg:block relative h-full">
              <div className="sticky top-32 space-y-12 gsap-reveal">

                {/* Share Section */}
                <div className="bg-[#0A0A0A] border border-[#27272a] p-6 rounded-3xl">
                  <h4 className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-4">Share Log</h4>
                  <div className="flex gap-3">
                    <button onClick={handleCopyLink} className="flex-1 py-3 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all" title="Copy Link">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all" title="Share on Twitter">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-[#0A0A0A] border border-[#27272a] p-6 rounded-3xl">
                    <h4 className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-4">Contents</h4>
                    <nav className="space-y-4">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block text-sm font-medium transition-colors ${activeId === h.id ? 'text-accent' : 'text-[#a1a1aa] hover:text-white'
                            } ${h.level === 3 ? 'ml-4 text-xs' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </article>

      {/* Related Articles Strip (Full width bg) */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="border-t border-[#27272a] pt-24 mt-12">
          <div className="container-max gsap-reveal">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">More from <span className="text-accent">{blog.category?.name || 'this category'}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {relatedBlogs.map(rb => (
                <Link key={rb._id} to={`/blog/${rb.slug}`} className="group flex flex-col">
                  <div className="aspect-[16/9] bg-[#0A0A0A] rounded-3xl overflow-hidden border border-[#27272a] mb-6 relative">
                    {rb.featuredImage ? (
                      <img src={rb.featuredImage} alt={rb.title} className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#3f3f46]">No Image</div>
                    )}
                  </div>
                  <h3 className="font-black text-3xl group-hover:text-accent transition-colors line-clamp-2 leading-tight">{rb.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleBlog;
