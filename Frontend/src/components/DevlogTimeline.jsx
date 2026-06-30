import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const devlogs = [
  { id: 1, milestone: 'Beta Release', date: '2026-10-15', title: 'Multiplayer Servers Live', slug: 'multiplayer-servers-live' },
  { id: 2, milestone: 'AI Upgrade', date: '2026-09-02', title: 'Neural Net NPC Behaviors', slug: 'neural-net-npc' },
  { id: 3, milestone: 'Combat System', date: '2026-07-20', title: 'Melee Overhaul 2.0', slug: 'melee-overhaul-2' },
  { id: 4, milestone: 'Gameplay Prototype', date: '2026-05-10', title: 'First Playable Build', slug: 'first-playable' },
];

const DevlogTimeline = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="flex items-center gap-4 mb-12 border-b border-[rgba(0,245,255,0.2)] pb-4">
        <div className="w-3 h-8 bg-[--color-primary] neon-glow-primary"></div>
        <h2 className="text-3xl font-bold tracking-wider uppercase text-white">Development <span className="text-[--color-primary]">Timeline</span></h2>
      </div>

      <div className="relative border-l-2 border-[rgba(0,245,255,0.3)] ml-4 md:ml-6 space-y-12">
        {devlogs.map((log, index) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Node */}
            <div className="absolute w-4 h-4 rounded-full bg-[--color-background] border-2 border-[--color-primary] -left-[9px] top-1.5 neon-glow-primary z-10" />
            
            {/* Horizontal Line connecting node to card */}
            <div className="absolute h-px w-6 bg-[rgba(0,245,255,0.3)] left-0 top-3.5" />

            <Link to={`/devlog/${log.slug}`} className="block group">
              <div className="glass-panel p-6 rounded-sm border-l-4 border-l-[--color-secondary] group-hover:border-l-[--color-primary] group-hover:bg-[rgba(17,24,39,0.9)] transition-all duration-300 relative overflow-hidden">
                {/* Scanline effect on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[--color-primary] opacity-0 group-hover:opacity-50 group-hover:animate-[scanline_2s_linear_infinite]" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-[rgba(139,92,246,0.1)] text-[--color-secondary] text-xs font-bold tracking-widest uppercase mb-2 md:mb-0 border border-[rgba(139,92,246,0.3)]">
                    {log.milestone}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-[--color-primary]" />
                    {log.date}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[--color-primary] transition-colors mb-2">
                  {log.title}
                </h3>
                
                <div className="flex items-center text-[--color-primary] text-sm font-semibold tracking-wider uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Access Record <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DevlogTimeline;
