import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from '../data';
import * as Icons from 'lucide-react';

// Light utility wrapper to render Lucide icons dynamically from data
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Code className={className} />;
  return <IconComponent className={className} />;
};

export default function Services() {
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

  return (
    <section
      id="services"
      className="py-24 bg-gray-900 relative overflow-hidden border-y border-gray-800/40"
    >
      {/* Visual Ambient Gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono"
          >
            Our Offerings
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight"
          >
            My <span className="text-indigo-400">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-gray-400"
          >
            Comprehensive digital solutions tailored to your unique product and business needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              id={`service-card-${service.id}`}
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group p-6 sm:p-8 bg-gray-950/60 rounded-3xl border border-gray-800/40 hover:border-indigo-400/20 shadow-sm hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                {/* Icon framed in a clean indigo box */}
                <div className="w-12 h-12 rounded-2xl bg-indigo-950/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <ServiceIcon name={service.iconName} className="w-5 h-5" />
                </div>

                <h3 className="mt-6 font-display font-bold text-lg sm:text-xl text-white group-hover:text-indigo-400 transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="mt-3 font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Extra micro interaction line indicator */}
              <div className="mt-6 pt-4 border-t border-gray-800/20 flex items-center text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200 cursor-pointer" onClick={() => handleScrollTo('contact')}>
                Learn more
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Action Bar (matches Mary layout but indigo) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            id="services-projects-cta"
            onClick={() => handleScrollTo('projects')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md shadow-indigo-500/5 hover:shadow-lg focus:outline-none"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>

          <button
            id="services-contact-cta"
            onClick={() => handleScrollTo('contact')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-800 hover:border-indigo-500/40 text-gray-300 hover:text-indigo-400 font-medium text-sm transition-all hover:bg-indigo-50/10 focus:outline-none"
          >
            Get in Touch
            <MessageSquare className="w-4 h-4 mr-1.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
