import { useParams, Link } from 'react-router-dom';
import { useGetProjectsQuery } from '../../store/apiSlice';
import { ArrowLeft, ExternalLink, Gamepad2, ChevronRight, TerminalSquare } from 'lucide-react';
import { FaGithub, FaGamepad } from 'react-icons/fa';
import NotFound from './NotFound';
import SEO from '../../components/SEO';

const SingleProject = () => {
  const { slug } = useParams();
  const { data: projects, isLoading } = useGetProjectsQuery();

  if (isLoading) return <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">Loading Database...</div>;

  const project = projects?.find(p => p.slug === slug);
  if (!project) return <NotFound />;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-accent selection:text-black pb-32">
      <SEO 
        title={`${project.title} | Aniket Kumar`}
        description={project.shortDescription || `View details about ${project.title} by Aniket Kumar.`}
        image={project.thumbnail}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.shortDescription,
          "image": project.thumbnail ? [project.thumbnail] : [],
          "author": {
            "@type": "Person",
            "name": "Aniket Kumar"
          },
          "url": window.location.href
        }}
      />

      {/* 1. Cinematic Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end pt-20 border-b border-[#27272a]">
        <div className="absolute inset-0 z-0">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} loading="eager" fetchPriority="high" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="w-full h-full bg-[#18181b] flex items-center justify-center opacity-40">
              <Gamepad2 className="w-32 h-32 text-[#27272a]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent"></div>
        </div>

        <div className="container-max relative z-10 w-full pb-12">
          <Link to="/projects" className="inline-flex items-center text-[#a1a1aa] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
          </Link>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">
            <span className="text-accent">{project.status}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]"></span>
            <span>{project.contribution || 'Developer'}</span>
            {project.startDate && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3f3f46]"></span>
                <span>{new Date(project.startDate).getFullYear()}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="container-max pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: Deep Dive */}
          <div className="lg:col-span-8 space-y-16">

            {/* Overview */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#e4e4e7]">
                {project.longDescription || project.shortDescription}
              </p>
            </div>

            {/* Structured Case Study Sections */}
            {(project.challenges || project.solutions || project.developmentProcess) && (
              <div className="space-y-12 border-t border-[#27272a] pt-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  <TerminalSquare className="w-4 h-4" /> Development Case Study
                </div>

                {project.challenges && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                    <div className="text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">{project.challenges}</div>
                  </div>
                )}

                {project.solutions && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Technical Solutions</h3>
                    <div className="text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">{project.solutions}</div>
                  </div>
                )}

                {project.developmentProcess && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Development Process</h3>
                    <div className="text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">{project.developmentProcess}</div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Horizontal Carousel */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="border-t border-[#27272a] pt-12 overflow-hidden w-full">
                <h3 className="text-2xl font-bold mb-8">Media Gallery</h3>
                
                {/* Horizontal Scroll Container */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth"
                     style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}>
                  {project.galleryImages.map((img, i) => (
                    <div key={i} className="flex-none h-[350px] md:h-[500px] bg-[#09090b] rounded-2xl overflow-hidden border border-[#27272a] snap-center relative group shadow-2xl">
                      <img 
                        src={img} 
                        alt={`Gallery ${i + 1}`} 
                        className="h-full w-auto max-w-none object-contain group-hover:scale-[1.02] transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar Metadata */}
          <div className="lg:col-span-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-8 sticky top-32">

              {/* Primary Actions */}
              <div className="space-y-4 mb-10">
                {project.liveDemoUrl && (
                  <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="w-full btn-primary py-4 justify-center text-center">
                    Play Live Demo
                  </a>
                )}
                {project.itchioUrl && (
                  <a href={project.itchioUrl} target="_blank" rel="noreferrer" className="w-full bg-white text-black py-4 rounded-xl text-sm font-bold flex items-center justify-center hover:bg-[#a1a1aa] transition-colors gap-2">
                    <FaGamepad className="w-5 h-5" /> View on Itch.io
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full bg-[#27272a] text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center hover:bg-[#3f3f46] transition-colors gap-2">
                    <FaGithub className="w-5 h-5" /> View Source Code
                  </a>
                )}
              </div>

              {/* Metadata */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#52525b] mb-3">Role</h4>
                  <p className="font-medium text-[#e4e4e7]">{project.contribution || 'Solo Developer'}</p>
                </div>

                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#52525b] mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs font-bold px-2 py-1 bg-[#27272a] text-[#a1a1aa] rounded uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#52525b] mb-3">Status</h4>
                  <p className="font-medium text-[#e4e4e7]">{project.status}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SingleProject;
