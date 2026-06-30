import { motion } from 'framer-motion';
import { useGetSettingsQuery } from '../../store/apiSlice';
import { Trophy, Code2, Monitor } from 'lucide-react';

const About = () => {
  const { data: settings, isLoading } = useGetSettingsQuery();

  const jams = [
    { title: "AI Game Dev Bootcamp", organizer: "Spawnskool", year: "2025" },
    { title: "Racing Game AI Webinar", organizer: "Spawnskool", year: "2025" },
    { title: "Brackeys Game Jam", organizer: "Brackeys", year: "2025.1" },
    { title: "GameEon Studios Unity Jam", organizer: "GameEon", year: "2024" },
    { title: "Infinity Game Jam", organizer: "Infinity", year: "2024" }
  ];

  const tools = [
    { name: "Unity", category: "Game Engine" },
    { name: "C#", category: "Core Language" },
    { name: "Blender", category: "3D Modeling" },
    { name: "Canva", category: "Asset Design" },
    { name: "Git / GitHub", category: "Version Control" },
    { name: "Visual Studio", category: "IDE" }
  ];

  if (isLoading) return <div className="min-h-screen bg-[#09090b]"></div>;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-accent selection:text-black pb-32">

      {/* 1. LAYERED CINEMATIC HEADER */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden border-b border-[#27272a]">

        {/* BACKGROUND TYPOGRAPHY */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-20">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[20vw] font-black leading-[0.8] tracking-tighter text-[#18181b] whitespace-nowrap"
          >
            BEHIND
          </motion.h1>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="text-[20vw] font-black leading-[0.8] tracking-tighter text-[#18181b] whitespace-nowrap"
          >
            THE CODE
          </motion.h1>
        </div>

        <div className="container-max relative z-20 flex flex-col items-center text-center mt-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181b] border border-[#27272a] rounded-full text-xs font-bold uppercase tracking-wider mb-8 text-[#a1a1aa]">
              <Monitor className="w-4 h-4" /> The Developer
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Aniket Kumar</h1>
            <p className="text-xl md:text-2xl text-[#a1a1aa] font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              A deep dive into my philosophy, toolkit, and journey as a gameplay programmer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE MANIFESTO */}
      <section className="pt-24 md:pt-32">
        <div className="container-max max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg md:prose-xl mx-auto prose-p:text-[#a1a1aa] prose-headings:text-white"
          >
            {/* We can use settings.aboutContent if it exists, else fallback */}
            {settings?.aboutContent ? (
              <div dangerouslySetInnerHTML={{ __html: settings.aboutContent }} />
            ) : (
              <>
                <p className="lead text-2xl font-bold text-white mb-8">
                  Games are the ultimate intersection of art, logic, and human psychology. My goal is to build systems that make virtual worlds feel alive.
                </p>
                <p>
                  As a Unity Developer, I specialize in the unseen architecture of video games. While beautiful assets catch the eye, it's the <strong>gameplay programming</strong>—the tight controls, the intelligent enemy AI, and the robust physics systems—that keeps players engaged for hours.
                </p>
                <p>
                  I approach development with an engineering mindset. I believe in writing scalable code architectures that allow designers to tweak mechanics easily without breaking the game. Whether I'm prototyping a chaotic 2D platformer or building a complex 3D maze, I always prioritize <em>"feel"</em> and performance.
                </p>
                <p>
                  Beyond code, I am obsessed with game design theory. I actively participate in game jams to test rapid prototyping skills under pressure, and I document my entire learning process through technical devlogs.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. TOOLKIT & GAME JAMS */}
      <section className="pt-24 md:pt-32 pb-12">
        <div className="container-max max-w-6xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

            {/* Toolkit Bento Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Code2 className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-bold tracking-tight text-white">The Toolkit</h2>
              </div>
              <div className="bg-[#151515] border border-[#27272a] rounded-3xl p-8 shadow-sm">
                <p className="text-[#a1a1aa] mb-8 font-medium">The software and languages I use to bring ideas to life.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tools.map((tool, idx) => (
                    <div key={idx} className="bg-[#18181b] p-4 rounded-2xl border border-[#27272a] hover:border-white/20 transition-colors">
                      <p className="font-bold text-white mb-1">{tool.name}</p>
                      <p className="text-xs text-[#a1a1aa] font-medium uppercase tracking-wider">{tool.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Game Jams */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-bold tracking-tight text-white">Game Jams</h2>
              </div>
              <div className="space-y-4">
                {jams.map((jam, idx) => (
                  <div key={idx} className="bg-[#151515] p-6 rounded-2xl border border-[#27272a] flex justify-between items-center group hover:bg-[#18181b] hover:border-[#3f3f46] transition-all">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-accent transition-colors">{jam.title}</h3>
                      <p className="text-sm text-[#a1a1aa]">{jam.organizer}</p>
                    </div>
                    <div className="bg-[#18181b] px-3 py-1.5 rounded-lg border border-[#27272a] text-xs font-bold text-white">
                      {jam.year}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
