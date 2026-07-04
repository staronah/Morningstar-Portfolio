/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, Lock, X } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsGallery from './components/ProjectsGallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode] = useState<boolean>(true);
  const [isSplashing, setIsSplashing] = useState<boolean>(true);
  const [showPrivateModal, setShowPrivateModal] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    const handleShowPopup = () => {
      setShowPrivateModal(true);
    };

    window.addEventListener('show-private-github-popup', handleShowPopup);
    return () => {
      window.removeEventListener('show-private-github-popup', handleShowPopup);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-indigo-600/30 font-sans transition-colors duration-300">
      {/* Custom High-Tech Cursor */}
      <CustomCursor />

      {/* Animated Splash Screen */}
      <AnimatePresence mode="wait">
        {isSplashing && (
          <SplashScreen key="splash" onComplete={() => setIsSplashing(false)} />
        )}
      </AnimatePresence>

      {/* Dynamic Navigation Header */}
      <Header darkMode={darkMode} toggleDarkMode={() => {}} />

      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* About Section */}
        <About />

        {/* Skills & Experience Section */}
        <Skills />

        {/* Interactive Projects Gallery Section */}
        <ProjectsGallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Form Section */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Premium Private GitHub Modal Popup */}
      <AnimatePresence>
        {showPrivateModal && (
          <>
            {/* Backdrop */}
            <motion.div
              id="github-private-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivateModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            />

            {/* Modal */}
            <motion.div
              id="github-private-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/5 z-[101] text-center overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                id="close-github-private-modal"
                onClick={() => setShowPrivateModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-950 text-gray-400 hover:text-white transition-colors border border-gray-850 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header/Icon */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <div className="relative">
                  <Github className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 bg-gray-900 p-0.5 rounded-full border border-indigo-500/30 text-indigo-300">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                Repository Private
              </h3>
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                This repository has not been made public yet. Please feel free to request access or inquire for more details.
              </p>

              {/* Action Button */}
              <button
                id="confirm-github-private-modal"
                onClick={() => setShowPrivateModal(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base transition-all shadow-md shadow-indigo-500/10 focus:outline-none active:scale-98"
              >
                Understood
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

