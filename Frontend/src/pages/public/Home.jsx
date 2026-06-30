import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Code2, Cpu, Gamepad2, ArrowUpRight, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';
import {
  useGetBlogsQuery,
  useGetSettingsQuery,
  useGetProjectsQuery,
  useGetSkillsQuery,
  useGetEducationsQuery,
  useGetExperiencesQuery
} from '../../store/apiSlice';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { data: blogs, isLoading: blogsLoading } = useGetBlogsQuery();
  const { data: settings, isLoading: settingsLoading } = useGetSettingsQuery();
  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: educations, isLoading: eduLoading } = useGetEducationsQuery();
  const { data: experiences, isLoading: expLoading } = useGetExperiencesQuery();

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
  }, []);

  if (settingsLoading || projectsLoading || skillsLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Portfolio Data...</div>;
  }

  // Combine and sort timeline data
  const timelineData = [
    ...(educations?.map(e => ({ ...e, type: 'education' })) || []),
    ...(experiences?.map(e => ({ ...e, type: 'experience' })) || [])
  ].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // Determine Current Project
  const currentProject = projects?.find(p => p.status === 'In Development') || projects?.[0];

  return (
    <div className="">

      {/* 1. LAYERED CINEMATIC HERO */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end pt-24 md:pt-32 pb-6 md:pb-16 overflow-hidden border-b border-[#27272a]">

        {/* BACKGROUND TYPOGRAPHY (Layer 1) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-40">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[50vw] md:text-[18vw] font-black leading-[0.8] tracking-tighter text-[#18181b] whitespace-nowrap"
          >
            GAME
          </motion.h1>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="text-[50vw] md:text-[18vw] font-black leading-[0.8] tracking-tighter text-[#18181b] whitespace-nowrap"
          >
            DEVELOPER
          </motion.h1>
        </div>

        {/* PROFILE IMAGE (Layer 2) */}
        <div className="absolute inset-x-0 bottom-[20vh] md:bottom-0 z-10 flex justify-center pointer-events-none">
          <motion.img
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src="/ProfileNoBG.png"
            alt="Aniket Kumar"
            className="w-[115vw] sm:w-[90vw] max-w-[600px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
          {/* Gradient fade to blend the bottom of the image smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent bottom-0 h-1/2 mt-auto"></div>
        </div>

        {/* FOREGROUND CONTENT (Layer 3) */}
        <div className="container-max relative z-20 flex flex-col items-center text-center mt-auto pb-6 md:pb-10">

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl flex flex-col items-center w-full sm:mb-[30vh] md:mb-0"
          >
            {/* <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-white absolute top-[-340px]">Aniket Kumar</h2> */}

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] sm:text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-6 w-full">
              <span className="px-3 py-1.5 md:py-1 bg-[#18181b] rounded-full border border-[#27272a]">Game Developer</span>
              <span className="px-3 py-1.5 md:py-1 bg-[#18181b] rounded-full border border-[#27272a]">Unity Developer</span>
              <span className="px-3 py-1.5 md:py-1 bg-[#18181b] rounded-full border border-[#27272a]">Gameplay Programmer</span>
            </div>

            {/* <p className="text-lg md:text-xl text-[#a1a1aa] font-medium leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md">
              {settings?.heroContent || "Building robust gameplay systems, designing complex enemy AI, and documenting my journey through technical devlogs."}
            </p> */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto">
              <a href="#projects" className="btn-primary px-8 py-3 md:py-4 w-full sm:w-auto">
                View Projects
              </a>
              <Link to="/blog" className="btn-secondary px-8 py-3 md:py-4 bg-[#0A0A0A]/50 backdrop-blur-md w-full sm:w-auto">
                Read Devlogs
              </Link>
            </div>
          </motion.div>

          {/* Optional Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="grid grid-cols-4 md:grid-cols-4 gap-2 sm:gap-6 md:gap-16 w-full max-w-4xl mx-auto mt-6 pt-6 md:pt-10 border-t border-[#27272a]"
          >
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">{projects?.length || '12'}+</span>
              <span className="text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#71717a] leading-tight">Projects Built</span>
            </div>
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">{experiences?.length ? Math.max(1, new Date().getFullYear() - new Date(experiences[experiences.length - 1].startDate).getFullYear()) : '3'}+</span>
              <span className="text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#71717a] leading-tight">Years Experience</span>
            </div>
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">{blogs?.length || '0'}+</span>
              <span className="text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#71717a] leading-tight">Devlogs</span>
            </div>
            <div className="flex flex-col items-center text-center px-1">
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">5+</span>
              <span className="text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#71717a] leading-tight">Game Jams</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Featured Projects Showcase */}
      {projects && projects.length > 0 && (
        <section id="projects" className="py-32 border-b border-[#27272a] scroll-mt-20">
          <div className="container-max">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 gsap-reveal">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-[#a1a1aa]">
                  <Gamepad2 className="w-4 h-4" /> Showcase
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Featured Projects</h2>
              </div>
              <Link to="/projects" className="btn-secondary">View All Projects</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.featured).slice(0, 3).map((proj) => (
                <Link to={`/projects/${proj.slug}`} key={proj._id} className="group bg-[#111111] border border-[#27272a] rounded-3xl overflow-hidden hover:border-[#3f3f46] transition-all duration-500 shadow-sm flex flex-col">
                  {proj.thumbnail ? (
                    <div className="w-full aspect-[16/9] bg-[#18181b] overflow-hidden border-b border-[#27272a]">
                      <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-[#18181b] flex items-center justify-center border-b border-[#27272a]">
                      <Gamepad2 className="w-12 h-12 text-[#3f3f46]" />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{proj.status}</p>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors">{proj.title}</h3>
                    <p className="text-[#a1a1aa] text-sm mb-6 flex-1 line-clamp-3">{proj.shortDescription}</p>

                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-bold px-2 py-1 bg-[#18181b] border border-[#27272a] rounded text-[#a1a1aa] uppercase tracking-wider">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Command Center (Skills + Active Project) */}
      <section className="py-32 border-b border-[#27272a] bg-[#0A0A0A] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-[0.02] rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container-max relative z-10 gsap-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Technical Arsenal */}
            {skills && skills.length > 0 && (
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-[#a1a1aa] self-start">
                  <Code2 className="w-4 h-4" /> Capabilities
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">Technical Arsenal</h2>
                <p className="text-lg text-[#a1a1aa] leading-relaxed mb-10">
                  My actively developed skill tree, combining core programming logic with specialized game engine expertise.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[...skills].sort((a, b) => b.skillLevel - a.skillLevel).map(skill => (
                    <span key={skill._id} className="px-4 py-2 bg-[#151515] border border-[#27272a] rounded-xl text-sm font-bold text-white shadow-sm flex items-center gap-2 hover:border-[#3f3f46] transition-colors cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Current Project */}
            {currentProject && (
              <div className="lg:col-span-7">
                <div className="bg-[#111111] border border-[#27272a] rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
                  {currentProject.thumbnail && (
                    <div className="absolute inset-0 z-0">
                      <img src={currentProject.thumbnail} alt="Background" className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-luminosity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-[#111111]/40"></div>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full justify-end">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-white self-start">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {currentProject.status}
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">{currentProject.title}</h3>
                    <p className="text-lg text-[#a1a1aa] max-w-xl leading-relaxed mb-10">
                      {currentProject.shortDescription}
                    </p>

                    <div className="space-y-6 max-w-md">
                      {currentProject.techStack?.slice(0, 3).map((tech, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{tech}</span>
                            <span className="text-xs font-bold text-[#71717a] uppercase tracking-wider">Active</span>
                          </div>
                          <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[85%]"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12">
                      <Link to={`/projects/${currentProject.slug}`} className="btn-primary w-full md:w-auto">
                        View Active Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 4. The Quest Log (Timeline) */}
      <section className="py-32 border-b border-[#27272a]">
        <div className="container-max max-w-5xl">
          <div className="text-center mb-20 gsap-reveal">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">The Quest Log</h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto">
              My journey through the game development industry, education, and professional milestones.
            </p>
          </div>

          <div className="relative">
            {/* The Line */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.125rem] md:before:ml-[50%] md:before:-translate-x-[0.5px] before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#3f3f46] before:to-transparent">

              {timelineData.map((item, idx) => (
                <div key={item._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group gsap-reveal">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 ${idx === 0 ? 'bg-white text-black' : 'bg-[#18181b] text-[#a1a1aa]'}`}>
                    {idx === 0 ? <span className="font-black text-xs">Now</span> : (item.type === 'education' ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />)}
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-[#111111] p-8 rounded-3xl border border-[#27272a] group-hover:border-[#3f3f46] transition-colors shadow-sm">
                    <p className="text-[10px] font-bold text-[#71717a] mb-3 uppercase tracking-widest">{new Date(item.startDate).getFullYear()}</p>
                    <h3 className="font-black text-xl md:text-2xl mb-1 text-white">{item.type === 'education' ? item.institution : item.companyName}</h3>
                    <p className="text-sm font-bold text-accent mb-4">{item.type === 'education' ? item.degree : item.role}</p>
                    <p className="text-[#a1a1aa] leading-relaxed font-medium text-sm">{item.description || 'Dedicated time to expanding skillsets and contributing to meaningful projects.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Devlogs */}
      <section className="py-32">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 gsap-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-[#a1a1aa]">
                <Code2 className="w-4 h-4" /> Publishing
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Latest Devlogs</h2>
            </div>
            <Link to="/blog" className="btn-secondary whitespace-nowrap hidden md:inline-flex group">
              View All Posts <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {!blogsLoading && blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gsap-reveal">
              {blogs.slice(0, 3).map((post) => (
                <Link to={`/blog/${post.slug}`} key={post._id} className="group bg-[#111111] border border-[#27272a] rounded-3xl overflow-hidden hover:border-[#3f3f46] transition-all duration-500 shadow-sm flex flex-col">
                  <div className="aspect-[16/9] w-full bg-[#18181b] overflow-hidden border-b border-[#27272a]">
                    <img src={post.featuredImage || 'https://via.placeholder.com/800x450'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">{post.category?.name || 'Devlog'}</p>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[#a1a1aa] italic">No devlogs published yet.</p>
          )}
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="py-32 border-t border-[#27272a] bg-[#000000]">
        <div className="container-max max-w-4xl text-center gsap-reveal">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Explore The Manifesto</h2>
          <p className="text-lg md:text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto">
            Take a deep dive into my design philosophy, toolkit, and the game jams that shaped my skills.
          </p>
          <Link to="/about" className="btn-primary px-10 py-5 text-lg">
            Read My Story
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
