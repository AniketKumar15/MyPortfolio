import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Terms = () => {
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
    <div className="bg-[#000000] min-h-screen text-white selection:bg-accent selection:text-black pb-32">
      <SEO 
        title="Terms & Conditions | Aniket Kumar"
        description="Terms and conditions for using Aniket Kumar's portfolio and associated services."
      />
      
      {/* 1. Cinematic Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[#27272a]">
        
        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
          <h1 className="text-[20vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
            TERMS
          </h1>
        </div>

        <div className="container-max relative z-10 text-center gsap-reveal">
          <span className="inline-block px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            Legal Documentation
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Terms & Conditions
          </h1>
          <p className="text-xl text-[#a1a1aa] font-medium max-w-2xl mx-auto leading-relaxed">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* 2. Content */}
      <section className="container-content pt-20 gsap-reveal">
        <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-white max-w-none text-[#e4e4e7] leading-relaxed">
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this portfolio and devlog platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use or access this website.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, game assets, source code snippets, and digital downloads, is the property of Aniket Kumar unless explicitly stated otherwise. It is protected by international copyright laws.
          </p>
          
          <h2>3. User Conduct</h2>
          <p>
            You agree to use this site only for lawful purposes. You are strictly prohibited from exploiting, hacking, or attempting to disrupt the services and infrastructure provided. Any malicious activity will result in immediate termination of access and potential legal action.
          </p>

          <h2>4. Use of Code Snippets</h2>
          <p>
            The code snippets provided in the devlogs and tutorials are for educational purposes. You may use them in your own projects, but re-publishing them as your own tutorials without explicit credit is prohibited.
          </p>

          <h2>5. Modifications</h2>
          <p>
            We reserve the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms and Conditions.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Terms;
