import { useGetSettingsQuery } from '../../store/apiSlice';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Mail, Database, Cookie, Lock } from 'lucide-react';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
  const { data: settings } = useGetSettingsQuery();
  const email = "aniket87091@gmail.com";

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
        title="Privacy Policy | Aniket Kumar"
        description="Privacy policy and data handling practices for Aniket Kumar's portfolio."
      />
      
      {/* 1. Cinematic Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[#27272a]">
        
        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
          <h1 className="text-[20vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
            PRIVACY
          </h1>
        </div>

        <div className="container-max relative z-10 text-center gsap-reveal">
          <span className="inline-block px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            Legal Documentation
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Privacy Policy
          </h1>
          <p className="text-xl text-[#a1a1aa] font-medium max-w-2xl mx-auto leading-relaxed">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* 2. Content */}
      <section className="container-content pt-20 gsap-reveal">
        <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-white max-w-none text-[#e4e4e7] leading-relaxed">
          
          <h2>1. Information We Collect</h2>
          <p>
            When you interact with this portfolio and blog, we may collect information you provide directly (such as when submitting a contact form or subscribing to devlog updates). This may include your name, email address, and any project details you choose to share.
          </p>

          <h2>2. Use of Data</h2>
          <p>
            Your data is used solely to respond to your inquiries, provide requested services (like game development collaboration or freelancing), and to maintain the security and performance of this website. We do not sell your personal data to third parties.
          </p>
          
          <h2>3. Cookies and Analytics</h2>
          <p>
            This website may use cookies and similar tracking technologies to analyze traffic and improve your browsing experience. By navigating the site, you consent to this basic telemetry.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard encryption and security measures to protect the information you submit. However, please be aware that no method of digital transmission over the internet is 100% secure.
          </p>

          <h2>5. Contact Me</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact me directly at <a href={`mailto:${email}`}>{email}</a>.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Privacy;
