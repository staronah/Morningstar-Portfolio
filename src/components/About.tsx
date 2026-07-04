import { ArrowRight, Code, Layout, Layers, Cpu, Compass, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { developerInfo } from '../data';

export default function About() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const skillBlocks = [
    {
      title: 'Frontend',
      icon: <Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['React', 'Flutter', 'TypeScript', 'Dart', 'Tailwind CSS'],
    },
    {
      title: 'Backend',
      icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['Firebase', 'Cloudinary', 'Node.js', 'Express'],
    },
    {
      title: 'Tools',
      icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      skills: ['Cloudflare', 'Vite', 'Git & GitHub'],
    },
  ];

  const gridImages = [
    {
      label: 'Professional',
      url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Creative',
      url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Developer',
      url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80',
    },
    {
      label: 'Mobile',
      url: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Visual Ambient Blur */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Grid Visual representation of Mary's style (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            {/* Visual Grid of 4 Images */}
            <div className="grid grid-cols-2 gap-4 max-w-[420px] mx-auto relative">
              {gridImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-850 shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
                  />
                  {/* Glass Label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-white uppercase bg-indigo-900/60 backdrop-blur-xs py-1 px-2.5 rounded-lg border border-white/10">
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Central Floating badge equivalent to mockup but beautiful indigo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-gradient-to-r from-indigo-600 to-indigo-600 text-white rounded-2xl p-4.5 text-center shadow-xl shadow-indigo-500/20 border border-indigo-400/20 flex items-center justify-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-lg sm:text-xl leading-none">5+ Years</p>
                  <p className="text-xs font-medium text-indigo-100 mt-0.5 uppercase tracking-wider font-mono">of building projects</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* About Content block (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono">
              About Me
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              A Developer Centered On <span className="text-indigo-400">Craftsmanship</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
              {developerInfo.bio}
            </p>

            {/* Structured Skill blocks matching the lists in mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {skillBlocks.map((block, idx) => (
                <div
                  id={`about-skill-block-${idx}`}
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/20 flex flex-col space-y-2.5"
                >
                  <div className="flex items-center space-x-2 pb-1 border-b border-gray-800/40">
                    {block.icon}
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                      {block.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {block.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium text-gray-300 bg-gray-800 py-1 px-2 rounded-lg border border-gray-800/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center space-x-4 pt-6">
              <button
                id="about-view-portfolio-btn"
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg focus:outline-none"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>

              <button
                id="about-contact-btn"
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-800 hover:border-indigo-500/40 text-gray-300 hover:text-indigo-400 font-medium text-sm transition-all hover:bg-indigo-50/10 focus:outline-none"
              >
                Contact Me
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
