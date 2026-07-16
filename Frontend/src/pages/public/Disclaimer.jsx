import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, Info, Shield, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Disclaimer = () => {
  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-accent selection:text-black pb-32">
      <SEO 
        title="Disclaimer | Aniket Kumar"
        description="Legal disclaimer regarding the content and projects hosted on this portfolio."
      />

      {/* 1. Cinematic Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[#27272a]">

        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
          <h1 className="text-[18vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
            DISCLAIMER
          </h1>
        </div>

        <div className="container-max relative z-10 text-center gsap-reveal">
          <span className="inline-block px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            Legal Documentation
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Disclaimer
          </h1>
          <p className="text-xl text-[#a1a1aa] font-medium max-w-2xl mx-auto leading-relaxed">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* 2. Content */}
      <section className="container-content pt-20 gsap-reveal">
        <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-white max-w-none text-[#e4e4e7] leading-relaxed">

          <h2>Accuracy of Information</h2>
          <p>
            The information provided on this website, including devlogs, tutorials, and project timelines, is for general informational and educational purposes only. Game development is an iterative and volatile process; projected release dates, features, and code implementations are estimates and subject to change without notice.
          </p>

          <h2>Professional Liability</h2>
          <p>
            While I strive to provide accurate and optimized code within my tutorials and devlogs, I make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the code for your specific projects. Any reliance you place on such information is therefore strictly at your own risk.
          </p>

          <h2>External Links</h2>
          <p>
            This website may contain links to external websites that are not provided or maintained by or in any way affiliated with me. Please note that I do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <h2>Game Assets & Third Party Tools</h2>
          <p>
            Any third-party game engines (e.g., Unity), tools, or assets mentioned or displayed on this site are the trademarks and property of their respective owners. Their inclusion does not imply endorsement or affiliation.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
