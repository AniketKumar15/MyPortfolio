import { useGetProjectsQuery } from '../../store/apiSlice';
import { ArrowRight, Gamepad2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaGithub, FaGamepad } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsList = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();

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
  }, [projects]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#000000] text-white">Initializing Projects...</div>;

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-secondary bg-[#000000]">
        <p>No projects have been published yet.</p>
      </div>
    );
  }

  // Sort projects by order, or fallback to chronological
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  // Find the single Hero project
  const heroProject = sortedProjects.find(p => p.isHero) || sortedProjects[0];

  // The rest go to the archive
  const archiveProjects = sortedProjects.filter(p => p._id !== heroProject?._id);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-accent selection:text-black pb-32">

      {/* ========================================================= */}
      {/* 1. MASSIVE HERO FEATURE */}
      {/* ========================================================= */}
      {heroProject && (
        <section className="relative w-full min-h-[90vh] md:min-h-[85vh] flex items-end pt-24 border-b border-[#27272a] overflow-hidden">

          {/* Massive Background Text */}
          <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-[40%] z-0">
            <h1 className="text-[20vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
              SHOWCASE
            </h1>
          </div>

          <div className="absolute inset-0 z-10">
            {heroProject.thumbnail ? (
              <img
                src={heroProject.thumbnail}
                alt={heroProject.title}
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
            ) : (
              <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center opacity-40">
                <Gamepad2 className="w-32 h-32 text-[#27272a]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-transparent"></div>
          </div>

          <div className="container-max relative z-20 w-full pb-16 md:pb-24 gsap-reveal">
            <div className="max-w-4xl">

              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Featured Showcase
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none drop-shadow-2xl">
                {heroProject.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <Link to={`/projects/${heroProject.slug}`} className="btn-primary px-8 py-4 text-base">
                  View Project
                </Link>

                {heroProject.liveDemoUrl && (
                  <a href={heroProject.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-secondary px-8 py-4 text-base flex items-center">
                    Play Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                )}

                <div className="flex gap-2 ml-auto sm:ml-4">
                  {heroProject.githubUrl && (
                    <a href={heroProject.githubUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all">
                      <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                  {heroProject.itchioUrl && (
                    <a href={heroProject.itchioUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all">
                      <FaGamepad className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 2. PROJECT ARCHIVE (TWO COLUMN) */}
      {/* ========================================================= */}
      {archiveProjects.length > 0 && (
        <section className="pt-24 md:pt-32">
          <div className="container-max">

            <div className="mb-16 border-b border-[#27272a] pb-6 flex items-end justify-between gsap-reveal">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Project Archive</h2>
                <p className="text-[#a1a1aa] font-medium text-lg">All released games, prototypes, and tools.</p>
              </div>
              <div className="hidden md:block text-[#52525b] font-bold text-sm tracking-widest uppercase">
                {archiveProjects.length} Projects
              </div>
            </div>

            {/* Clean 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {archiveProjects.map((proj) => (
                <div key={proj._id} className="group flex flex-col gsap-reveal">

                  {/* Huge Clean Thumbnail */}
                  <Link to={`/projects/${proj.slug}`} className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-[#0A0A0A] border border-[#27272a] mb-8 relative block">
                    {proj.thumbnail ? (
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal opacity-70 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-30">
                        <Gamepad2 className="w-16 h-16 text-[#a1a1aa]" />
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-3 rounded-full flex items-center shadow-2xl">
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>

                  {/* Clean Metadata */}
                  <div className="flex-1 flex flex-col px-2">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="text-3xl font-black text-white leading-tight group-hover:text-accent transition-colors">
                        <Link to={`/projects/${proj.slug}`}>{proj.title}</Link>
                      </h3>
                      <span className="px-3 py-1.5 bg-[#111111] text-white border border-[#27272a] rounded-md text-[10px] font-bold uppercase tracking-widest shrink-0">
                        {proj.status}
                      </span>
                    </div>

                    <p className="text-[#a1a1aa] font-medium leading-relaxed mb-8 line-clamp-2 text-lg">
                      {proj.shortDescription}
                    </p>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-1 bg-[#111111] border border-[#27272a] text-[#a1a1aa] rounded uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                        {proj.techStack?.length > 3 && (
                          <span className="text-[10px] font-bold px-2 py-1 text-[#52525b] uppercase tracking-wider">
                            +{proj.techStack.length - 3} More
                          </span>
                        )}
                      </div>

                      {/* Icons */}
                      <div className="flex gap-3">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all" title="GitHub">
                            <FaGithub className="w-4 h-4" />
                          </a>
                        )}
                        {proj.itchioUrl && (
                          <a href={proj.itchioUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#111111] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all" title="Itch.io">
                            <FaGamepad className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default ProjectsList;
