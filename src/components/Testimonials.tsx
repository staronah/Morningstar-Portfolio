import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-24 bg-gray-900 relative overflow-hidden border-y border-gray-800/40">
      {/* Visual Ambient Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono">
            Client Words
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Client <span className="text-indigo-400">Testimonials</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-400">
            Hear what industry leaders, engineering heads, and SaaS founders say about collaborating with me.
          </p>
        </div>

        {/* Carousel Visual Frame */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          {/* Main interactive Card */}
          <div className="relative bg-gray-950 rounded-[2.5rem] border border-gray-800 p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[340px] flex flex-col justify-between">
            {/* Visual Big quote mark icon */}
            <div className="absolute top-6 right-8 text-indigo-950/40 pointer-events-none">
              <Quote className="w-20 h-20 rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-left relative z-10 flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Feedback Content */}
                  <p className="font-sans text-base sm:text-lg lg:text-xl text-gray-200 italic leading-relaxed">
                    "{testimonialsData[activeIndex].content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-800/20 mt-6">
                  <img
                    src={testimonialsData[activeIndex].avatar}
                    alt={testimonialsData[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-indigo-900/30"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-white">
                      {testimonialsData[activeIndex].name}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      {testimonialsData[activeIndex].role} &middot; <span className="text-indigo-400 font-semibold">{testimonialsData[activeIndex].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Controls Left/Right Arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8 sm:absolute sm:inset-y-0 sm:left-0 sm:right-0 sm:justify-between sm:mt-0 sm:pointer-events-none">
            
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="p-3 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-indigo-400 shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none sm:pointer-events-auto sm:-translate-x-6"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="p-3 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-indigo-400 shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none sm:pointer-events-auto sm:translate-x-6"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Index Dots */}
          <div className="flex justify-center space-x-1.5 mt-6">
            {testimonialsData.map((_, idx) => (
              <button
                id={`testimonial-dot-${idx}`}
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === idx
                    ? 'w-6 bg-indigo-500'
                    : 'bg-gray-800 hover:bg-indigo-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
