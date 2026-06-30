import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Briefcase, Gamepad2, ArrowRight, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCreateMessageMutation } from '../../store/apiSlice';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Please fill in all required fields.");
        return;
      }
      await createMessage(formData).unwrap();
      toast.success("Transmission successful! Message delivered.");
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      toast.error(err?.data?.message || "Transmission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-accent selection:text-black pb-32">
      
      {/* 1. Cinematic Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[#27272a]">
        
        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-1/2 z-0">
          <h1 className="text-[22vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent uppercase text-center w-full whitespace-nowrap opacity-40">
            CONTACT
          </h1>
        </div>

        <div className="container-max relative z-10 text-center gsap-reveal">
          <span className="inline-block px-4 py-1.5 bg-[#111111] border border-[#27272a] text-accent rounded-full text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            Initiate Link
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Let's Connect.
          </h1>
          <p className="text-xl text-[#a1a1aa] font-medium max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, need a gameplay programmer, or want to collaborate on a game? Establish a connection below.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="container-max pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Info */}
          <div className="gsap-reveal">
            <h3 className="text-3xl font-black mb-10 tracking-tight">Direct Comms</h3>
            
            <div className="space-y-8">
              
              <div className="flex items-center gap-6 p-6 bg-[#0A0A0A] border border-[#27272a] rounded-3xl hover:border-[#3f3f46] transition-colors group">
                <div className="w-14 h-14 rounded-full bg-[#111111] flex items-center justify-center shrink-0 border border-[#27272a] group-hover:border-accent transition-colors">
                  <Briefcase className="w-6 h-6 text-[#a1a1aa] group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-1">Identity</p>
                  <p className="font-black text-xl text-white">Aniket Kumar</p>
                  <p className="text-sm font-medium text-accent">Game Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 bg-[#0A0A0A] border border-[#27272a] rounded-3xl hover:border-[#3f3f46] transition-colors group">
                <div className="w-14 h-14 rounded-full bg-[#111111] flex items-center justify-center shrink-0 border border-[#27272a] group-hover:border-accent transition-colors">
                  <MapPin className="w-6 h-6 text-[#a1a1aa] group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-1">Location Base</p>
                  <p className="font-black text-xl text-white">Noida, India</p>
                  <p className="text-sm font-medium text-[#a1a1aa]">Remote / Relocation</p>
                </div>
              </div>

              <a href="mailto:aniket87091@gmail.com" className="flex items-center gap-6 p-6 bg-[#0A0A0A] border border-[#27272a] rounded-3xl hover:border-accent transition-colors group">
                <div className="w-14 h-14 rounded-full bg-[#111111] flex items-center justify-center shrink-0 border border-[#27272a] group-hover:border-accent transition-colors">
                  <Mail className="w-6 h-6 text-[#a1a1aa] group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest mb-1">Secure Channel</p>
                  <p className="font-black text-xl text-white group-hover:text-accent transition-colors">aniket87091@gmail.com</p>
                  <p className="text-sm font-medium text-[#a1a1aa]">Click to send email</p>
                </div>
              </a>
              
            </div>

            <h3 className="text-3xl font-black mt-16 mb-8 tracking-tight">External Networks</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="flex-1 min-w-[120px] h-16 rounded-2xl bg-[#0A0A0A] border border-[#27272a] flex items-center justify-center hover:bg-[#111111] hover:border-white transition-all text-[#a1a1aa] hover:text-white" title="GitHub">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="flex-1 min-w-[120px] h-16 rounded-2xl bg-[#0A0A0A] border border-[#27272a] flex items-center justify-center hover:bg-[#0077B5]/10 hover:border-[#0077B5] transition-all text-[#a1a1aa] hover:text-[#0077B5]" title="LinkedIn">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="flex-1 min-w-[120px] h-16 rounded-2xl bg-[#0A0A0A] border border-[#27272a] flex items-center justify-center hover:bg-[#fa5c5c]/10 hover:border-[#fa5c5c] transition-all text-[#a1a1aa] hover:text-[#fa5c5c]" title="Itch.io">
                <Gamepad2 className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="gsap-reveal">
            <div className="bg-[#0A0A0A] p-8 md:p-12 rounded-[2rem] border border-[#27272a] shadow-2xl relative overflow-hidden">
              
              {/* Subtle tech background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

              <h3 className="text-3xl font-black mb-8 tracking-tight">Transmission Form</h3>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest">Operator Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-6 py-4 border border-[#27272a] rounded-xl focus:outline-none focus:border-accent bg-[#111111] text-white transition-colors placeholder:text-[#3f3f46]" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest">Return Address (Email)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-6 py-4 border border-[#27272a] rounded-xl focus:outline-none focus:border-accent bg-[#111111] text-white transition-colors placeholder:text-[#3f3f46]" placeholder="john@example.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-6 py-4 border border-[#27272a] rounded-xl focus:outline-none focus:border-accent bg-[#111111] text-white transition-colors placeholder:text-[#3f3f46]" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#71717a] uppercase tracking-widest">Payload (Message)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full px-6 py-4 border border-[#27272a] rounded-xl focus:outline-none focus:border-accent min-h-[180px] bg-[#111111] text-white transition-colors resize-y placeholder:text-[#3f3f46]" placeholder="Describe your project, mission, or inquiry here..."></textarea>
                </div>
                
                <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-xl hover:bg-[#a1a1aa] transition-colors flex items-center justify-center group mt-4 disabled:opacity-50">
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Transmitting...</>
                  ) : (
                    <>Transmit Data <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
