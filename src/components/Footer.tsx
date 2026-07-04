import { MouseEvent } from 'react';
import { Github, Linkedin, Twitter, Star } from 'lucide-react';
import { developerInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
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
    <footer id="main-footer" className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand/Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Star className="w-4 h-4 text-white fill-white/20" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-gray-900 dark:text-white">
              Morning<span className="text-indigo-400">Star</span>
            </span>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              Home
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              Services
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              About
            </a>
            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              Skills
            </a>
            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider font-mono">
              Contact
            </a>
          </nav>

          {/* Copyright info */}
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              &copy; {currentYear} {developerInfo.name}. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
