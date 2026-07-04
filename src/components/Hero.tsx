import { MouseEvent } from 'react';
import { ArrowRight, Download, Award, Briefcase, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { developerInfo } from '../data';
import CyberParticlesBg from './CyberParticlesBg';

export default function Hero() {
  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
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

  // Icons matching the metrics for extra visual delight
  const statIcons = [
    <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-radial from-indigo-50/20 via-white to-white dark:from-indigo-950/10 dark:via-gray-950 dark:to-gray-950"
    >
      {/* Dynamic Cyber Particle Background */}
      <CyberParticlesBg speedMultiplier={0.5} density={35} />

      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content (left side) */}
          <motion.div
            id="hero-content-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            <div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{developerInfo.name}</span> <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="mt-1.5 font-mono text-xs sm:text-sm text-indigo-400 font-semibold tracking-wider uppercase">
                Nickname: Morningstar
              </p>
            </div>

            <p className="font-display text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200">
              {developerInfo.title}
            </p>

            <p className="font-sans text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              {developerInfo.tagline} I craft responsive, high-performance web and mobile products with a minimalist, clean aesthetic.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                id="hero-contact-cta"
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-98"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>

              <a
                id="hero-cv-cta"
                href={developerInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/40 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 active:scale-98"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Hero Visual (right side) */}
          <motion.div
            id="hero-avatar-block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', damping: 20 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Visual background layers */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-indigo-500 dark:from-indigo-700 dark:to-indigo-600 rotate-6 opacity-10 blur-xl pointer-events-none" />

            {/* Custom blob-like frame reminiscent of the Mary design */}
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Styled background container with custom organic-like shape */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-950/20 overflow-hidden shadow-inner border border-indigo-100/20 dark:border-indigo-900/10 transition-all duration-500">
                {/* Organic overlay background ring */}
                <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-2xl" />

                {/* Actual portrait img */}
                <img
                  id="hero-avatar-image"
                  src={developerInfo.avatar}
                  alt={developerInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter saturate-105 transition-transform duration-700 group-hover:scale-103"
                />
              </div>

              {/* Mini tech badge decoration */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-2xl shadow-xl flex items-center space-x-2.5 animate-pulse">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Interactive
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
