import { useGetBlogsQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const BlogList = () => {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();

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
  }, [blogs]);

  if (isLoading) return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
      Loading Devlogs...
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-red-500">
      Failed to load devlogs.
    </div>
  );

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white text-center">
        <div>
          <BookOpen className="w-16 h-16 text-[#27272a] mx-auto mb-6" />
          <h1 className="text-4xl font-black mb-4">No Logs Found</h1>
          <p className="text-[#a1a1aa] font-medium">The archive is currently empty. Check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-accent selection:text-black pb-32">
      <SEO 
        title="Devlogs & Articles | Aniket Kumar"
        description="Read my latest devlogs, technical articles, and updates on game development."
      />
      
      {/* 1. MASSIVE HERO HEADER */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[#27272a]">
        
        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
          <h1 className="text-[22vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
            DEVLOG
          </h1>
        </div>

        <div className="container-max relative z-10 text-center gsap-reveal">
          <span className="inline-block px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            Development Archive
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Latest Logs
          </h1>
          <p className="text-xl text-[#a1a1aa] font-medium max-w-2xl mx-auto leading-relaxed">
            Deep-dives into game development, architecture, tools, and the journey of building digital worlds.
          </p>
        </div>
      </section>

      {/* 2. ARCHIVE GRID */}
      <section className="container-max pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {blogs?.map((blog, index) => {
            // Masonry-like sizing: first item spans full 12, next two 6, rest 4
            let spanClass = "md:col-span-4";
            if (index === 0) spanClass = "md:col-span-12";
            else if (index === 1 || index === 2) spanClass = "md:col-span-6";

            const isLarge = index === 0;

            return (
              <article key={blog._id} className={`group gsap-reveal ${spanClass}`}>
                <Link to={`/blog/${blog.slug}`} className={`block h-full flex flex-col ${isLarge ? 'md:grid md:grid-cols-12 md:gap-12 md:items-center' : ''}`}>
                  
                  {/* Thumbnail */}
                  <div className={`bg-[#0A0A0A] border border-[#27272a] overflow-hidden mb-6 relative ${isLarge ? 'md:col-span-7 md:mb-0 rounded-3xl aspect-[16/9]' : 'rounded-2xl aspect-[4/3] flex-shrink-0'}`}>
                    <img 
                      src={blog.featuredImage || 'https://via.placeholder.com/800x600/0A0A0A/3f3f46?text=No+Image'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-3 rounded-full flex items-center shadow-2xl">
                        Read Log <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex flex-col flex-1 ${isLarge ? 'md:col-span-5' : ''}`}>
                    <div className="flex gap-2 items-center text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-4">
                      <span className="text-accent">{blog.category?.name || 'Article'}</span>
                      <span className="w-1 h-1 rounded-full bg-[#3f3f46]"></span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <h2 className={`${isLarge ? 'text-4xl md:text-5xl leading-tight' : 'text-2xl leading-snug'} font-black mb-4 text-white group-hover:text-accent transition-colors`}>
                      {blog.title}
                    </h2>
                    
                    <p className="text-[#a1a1aa] font-medium leading-relaxed line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto pt-4 flex items-center text-sm font-bold text-white group-hover:text-accent transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </Link>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default BlogList;
