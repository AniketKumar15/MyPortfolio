import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaGamepad, FaBriefcase, FaEnvelope, FaDiscord, FaYoutube } from 'react-icons/fa';
import { useGetSettingsQuery, useGetCategoriesQuery } from '../store/apiSlice';

const Footer = () => {
  const { data: settings } = useGetSettingsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const socials = settings?.socialLinks || {};

  return (
    <footer className="bg-black text-white pt-24 pb-0 overflow-hidden relative">

      {/* Massive Background Brand Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center -translate-y-[20%] z-0">
        <h1 className="text-[25vw] font-black leading-none tracking-tighter bg-gradient-to-b from-[#27272a]/40 to-transparent bg-clip-text text-transparent uppercase text-center w-full">
          ANIKET
        </h1>
      </div>

      <div className="container-max relative z-10">

        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-20">

          {/* Brand & Profile Column */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#18181b]">
                <img src={settings?.profileImage || "/Profile.png"} alt="Aniket Kumar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">Aniket Kumar</h2>
                <p className="text-[#71717a] text-[10px] font-bold uppercase tracking-widest mt-0.5">GAME DEVELOPER</p>
              </div>
            </div>

            <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 max-w-sm">
              Unity Game Developer documenting game development. AI systems, gameplay mechanics, devlogs, tutorials, and the journey of building indie games.
            </p>

            {/* Dynamic Social Links */}
            <div className="flex items-center gap-3">
              <a href={socials.github || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href={socials.linkedin || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href={socials.itchio || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaGamepad className="w-4 h-4" />
              </a>
              <a href={socials.portfolio || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href={settings?.email ? `mailto:${settings.email}` : "#"} className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaEnvelope className="w-4 h-4" />
              </a>
              {/* <a href={socials.discord || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all">
                <FaDiscord className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">NAVIGATION</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Home</Link></li>
                <li><Link to="/blog" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Blog</Link></li>
                <li><Link to="/about" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">CATEGORIES</h4>
              <ul className="space-y-4">
                {categories && categories.length > 0 ? (
                  categories.slice(0, 5).map(cat => (
                    <li key={cat._id || cat.slug}>
                      <Link to={`/blog?category=${cat.slug || cat.name.toLowerCase()}`} className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="text-[#a1a1aa] text-xs font-medium">Loading...</span></li>
                )}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">RESOURCES</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/disclaimer" className="text-[#a1a1aa] hover:text-white text-xs font-medium transition-colors">Disclaimer</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">CONTACT</h4>
              <ul className="space-y-4">
                <li className="text-[#a1a1aa] text-xs font-medium">{settings?.location || "Noida, India"}</li>
                <li className="text-[#a1a1aa] text-xs font-medium">{settings?.email || "aniket87091@gmail.com"}</li>
              </ul>

              <div className="mt-8 space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#71717a]">AVAILABLE FOR:</h4>
                <ul className="space-y-1">
                  <li className="text-[#a1a1aa] text-xs font-medium">Freelance</li>
                  <li className="text-[#a1a1aa] text-xs font-medium">Collaboration</li>
                  <li className="text-[#a1a1aa] text-xs font-medium">Game Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
          <p className="text-[#52525b] text-[11px] font-bold tracking-wider">
            © {new Date().getFullYear()} Aniket Kumar. Engineered with precision.
          </p>
          <div className="flex items-center gap-2 text-[#52525b] text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            SYSTEM: ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;