import { motion } from 'framer-motion';
import { Activity, Terminal } from 'lucide-react';

const newsItems = [
  { id: 1, type: 'ALERT', text: 'E3 2026 Presentation confirmed for June 12th.', isPriority: true },
  { id: 2, type: 'UPDATE', text: 'Server maintenance scheduled for region US-East.', isPriority: false },
  { id: 3, type: 'INTEL', text: 'New concept art leaked on community Discord.', isPriority: false },
  { id: 4, type: 'ALERT', text: 'Alpha registration is now CLOSED. Thanks for applying.', isPriority: true },
];

const NewsCommandCenter = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Activity className="w-8 h-8 text-[--color-accent] animate-pulse" />
        <h2 className="text-3xl font-bold tracking-wider uppercase text-white">Live <span className="text-[--color-accent]">Feed</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Featured News Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass-panel border border-[rgba(255,0,110,0.3)] relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-[rgba(255,0,110,0.1)] flex items-center justify-center border-b border-l border-[rgba(255,0,110,0.3)]">
            <Terminal className="text-[--color-accent] w-6 h-6" />
          </div>
          <div className="p-8 h-full flex flex-col justify-end min-h-[300px] bg-gradient-to-t from-[rgba(8,11,20,1)] to-transparent relative z-10">
            <span className="text-[--color-accent] text-sm font-bold tracking-widest uppercase mb-2">Top Story // Decrypted</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Next-Gen Rendering Engine Achieves 120 FPS on Mid-Tier Hardware
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl">
              Our engineering team has completely refactored the graphics pipeline. The results exceed all initial projections.
            </p>
            <button className="self-start text-[--color-primary] border-b border-[--color-primary] pb-1 uppercase tracking-wider text-sm font-bold hover:text-white hover:border-white transition-colors">
              Read Full Report
            </button>
          </div>
        </motion.div>

        {/* Ticker / Mini Panels */}
        <div className="flex flex-col gap-4">
          <div className="bg-[--color-surface] border-l-4 border-l-[--color-warning] p-4">
            <h4 className="text-[--color-warning] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[rgba(255,184,0,0.2)] pb-2">
              System Notifications
            </h4>
            <div className="space-y-4">
              {newsItems.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <span className={`font-bold ${item.isPriority ? 'text-[--color-accent]' : 'text-gray-500'}`}>
                    [{item.type}]
                  </span>
                  <p className="text-gray-300 leading-tight">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-grow glass-panel border border-[rgba(0,245,255,0.2)] p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[rgba(0,245,255,0.05)] transition-colors">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[--color-primary] flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-700">
              <div className="w-2 h-2 bg-[--color-primary] rounded-full neon-glow-primary"></div>
            </div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-2">View All Archives</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Access the databanks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCommandCenter;
