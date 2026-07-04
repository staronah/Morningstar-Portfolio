import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Sun, Moon, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { developerInfo } from '../data';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is near the top of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-gray-900 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            id="brand-logo"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Star className="w-5 h-5 text-white fill-white/20" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Morning<span className="text-indigo-400">Star</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                id={`nav-link-${item.href.substring(1)}`}
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-sm font-medium transition-colors duration-200 relative py-1 focus:outline-none ${
                  activeSection === item.href.substring(1)
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Controls: Let's Talk CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* CTA Button */}
            <a
              id="header-cta-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center justify-center px-4.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              Let's Talk
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Menu Side Drawer */}
            <motion.div
              id="mobile-drawer-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gray-950 shadow-2xl z-50 p-6 flex flex-col justify-between lg:hidden border-l border-gray-900"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-900">
                  <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                    Menu
                  </span>
                  <button
                    id="mobile-drawer-close-btn"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav id="mobile-drawer-nav" className="flex flex-col space-y-4 pt-6">
                  {navItems.map((item) => (
                    <a
                      id={`mobile-nav-link-${item.href.substring(1)}`}
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-base font-semibold py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                        activeSection === item.href.substring(1)
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.href.substring(1) && (
                        <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse" />
                      )}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-gray-900 space-y-4">
                <a
                  id="mobile-drawer-cta-btn"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md focus:outline-none"
                >
                  Let's Talk
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
