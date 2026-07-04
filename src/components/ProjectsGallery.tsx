import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, Tag, BarChart3, ChevronRight, ChevronLeft, Image as ImageIcon, Layers } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activeModalImgIndex, setActiveModalImgIndex] = useState<number>(0);

  React.useEffect(() => {
    setActiveModalImgIndex(0);
  }, [selectedProject]);

  const categories = ['All', 'Web App', 'Mobile'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  React.useEffect(() => {
    const handleShowLightbox = (e: Event) => {
      const customEvent = e as CustomEvent<{ screenshots: string[]; index?: number }>;
      if (customEvent.detail && customEvent.detail.screenshots) {
        setLightboxImages(customEvent.detail.screenshots);
        setActiveLightboxIndex(customEvent.detail.index || 0);
        setIsLightboxOpen(true);
      }
    };

    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ project: Project }>;
      if (customEvent.detail && customEvent.detail.project) {
        const p = projectsData.find(proj => proj.id === customEvent.detail.project.id);
        if (p) {
          setSelectedProject(p);
          const element = document.getElementById('projects');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('show-project-lightbox', handleShowLightbox);
    window.addEventListener('show-project-modal', handleOpenModal);
    return () => {
      window.removeEventListener('show-project-lightbox', handleShowLightbox);
      window.removeEventListener('show-project-modal', handleOpenModal);
    };
  }, []);

  const handlePrivateGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('show-private-github-popup'));
  };

  return (
    <section id="projects" className="py-24 bg-gray-950 relative overflow-hidden border-y border-gray-900/40">
      {/* Visual Ambient Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-400/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono">
            My Portfolio
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Interactive <span className="text-indigo-400">Projects</span> Gallery
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-400">
            Explore recent digital solutions built for modern responsiveness, high performance, and robust architecture.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`project-category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative focus:outline-none ${
                selectedCategory === cat
                  ? 'text-white shadow-md shadow-indigo-500/15'
                  : 'text-gray-400 hover:text-indigo-400 bg-gray-900 border border-gray-800'
              }`}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-indigo-500 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          id="projects-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-gray-900 rounded-3xl border border-gray-800/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 text-left flex flex-col h-full"
              >
                {/* Visual Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 uppercase bg-gray-950/95 backdrop-blur-xs py-1.5 px-3 rounded-full border border-gray-800 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Glassmorphic Interaction Overlay */}
                  <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl bg-gray-900 text-white border border-gray-850 text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Project Details
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-indigo-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Inline list tags */}
                  <div className="mt-6 pt-4 border-t border-gray-800/20 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium text-gray-300 bg-gray-850 py-0.5 px-2 rounded-md border border-gray-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono font-bold text-indigo-400 self-center">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Project Detail Modal Dialog */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Blurred Dark Backdrop */}
              <motion.div
                id="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
              />

              {/* Modal Core Container */}
              {(() => {
                const modalScreenshots = selectedProject.screenshots && selectedProject.screenshots.length > 0
                  ? selectedProject.screenshots
                  : [selectedProject.image];
                
                const currentImg = modalScreenshots[activeModalImgIndex] || selectedProject.image;

                return (
                  <motion.div
                    id="modal-content"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className="fixed inset-x-4 bottom-4 top-24 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:right-auto sm:w-[90vw] sm:max-w-xl sm:h-[80vh] bg-gray-900 rounded-[2rem] shadow-2xl z-50 overflow-hidden border border-gray-800 flex flex-col justify-between"
                  >
                    {/* Top Header Bar */}
                    <div className="p-5 border-b border-gray-800/60 bg-gray-950 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/85 py-1 px-2.5 rounded-md border border-indigo-900/30">
                          {selectedProject.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-white mt-1.5 leading-tight">
                          {selectedProject.title}
                        </h3>
                      </div>
                      <button
                        id="close-project-modal"
                        onClick={() => setSelectedProject(null)}
                        className="p-2 rounded-full bg-gray-850 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors border border-gray-800/40 focus:outline-none"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Central Image Showcase Stage */}
                    <div className="flex-grow w-full flex items-center justify-center relative p-6 bg-gray-950/50">
                      {/* Left Navigation Arrow */}
                      {modalScreenshots.length > 1 && (
                        <button
                          id="prev-modal-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalImgIndex((prev) => (prev === 0 ? modalScreenshots.length - 1 : prev - 1));
                          }}
                          className="absolute left-4 p-2.5 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800/50 backdrop-blur-md transition-all focus:outline-none cursor-pointer z-10"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}

                      {/* Display Image in Original Ratio fitted to Stage */}
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <img
                          src={currentImg}
                          alt={`${selectedProject.title} screenshot`}
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-[48vh] sm:max-h-[50vh] object-contain rounded-xl shadow-lg border border-gray-800/10"
                        />
                      </div>

                      {/* Right Navigation Arrow */}
                      {modalScreenshots.length > 1 && (
                        <button
                          id="next-modal-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalImgIndex((prev) => (prev === modalScreenshots.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-4 p-2.5 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800/50 backdrop-blur-md transition-all focus:outline-none cursor-pointer z-10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Dots / Thumbnail Indicators Bar */}
                    {modalScreenshots.length > 1 && (
                      <div className="w-full flex justify-center items-center py-3 bg-gray-950/80 border-t border-gray-800/30 gap-2">
                        {modalScreenshots.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveModalImgIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                              idx === activeModalImgIndex
                                ? 'bg-indigo-500 w-6'
                                : 'bg-gray-700 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Footer Links & Actions Bar */}
                    <div className="p-5 bg-gray-950 border-t border-gray-850 flex items-center justify-between">
                      {modalScreenshots.length > 1 ? (
                        <span className="font-mono text-xs text-indigo-400 font-semibold bg-indigo-950/30 py-1.5 px-3 rounded-lg border border-indigo-900/10">
                          Image {activeModalImgIndex + 1} of {modalScreenshots.length}
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center space-x-3">
                        {selectedProject.githubUrl && (
                          <a
                            id="modal-github-link"
                            href={selectedProject.githubUrl}
                            onClick={handlePrivateGithubClick}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-gray-800 text-gray-300 hover:text-indigo-400 font-medium text-xs sm:text-sm transition-all focus:outline-none cursor-pointer bg-gray-900/60 hover:bg-gray-900"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        )}

                        {selectedProject.id === 'project-3' ? (
                          <button
                            id="modal-not-available-btn"
                            onClick={() => window.dispatchEvent(new CustomEvent('show-not-available-popup'))}
                            className="inline-flex items-center justify-center px-4.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm transition-all shadow-md focus:outline-none"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live App
                          </button>
                        ) : selectedProject.liveUrl && (
                          <a
                            id="modal-live-link"
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm transition-all shadow-md focus:outline-none"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live App
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </>
          )}
        </AnimatePresence>

        {/* Immersive Screenshots Lightbox Popup */}
        <AnimatePresence>
          {isLightboxOpen && lightboxImages.length > 0 && (
            <>
              {/* Backdrop */}
              <motion.div
                id="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLightboxOpen(false)}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200]"
              />

              {/* Lightbox Container / Absolute Overlays */}
              <div id="lightbox-ui-wrapper" className="fixed inset-0 z-[201] flex flex-col justify-between pointer-events-none">
                
                {/* Top Header Controls Bar */}
                <div className="w-full flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 to-transparent pointer-events-auto">
                  <div className="text-left">
                    <h4 className="font-display font-bold text-white text-base sm:text-lg">
                      {selectedProject?.title || 'Project Screenshots'}
                    </h4>
                    <p className="font-mono text-xs text-indigo-400">
                      Image {activeLightboxIndex + 1} of {lightboxImages.length}
                    </p>
                  </div>

                  <button
                    id="close-lightbox"
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-2.5 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white transition-all border border-gray-800/60 focus:outline-none cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Central Active Image Stage */}
                <div className="flex-grow w-full flex items-center justify-center relative px-4 sm:px-16">
                  {/* Left Navigation Arrow */}
                  <button
                    id="prev-lightbox-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 sm:left-8 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800/50 hover:border-indigo-500/30 backdrop-blur-md transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Centered Image Container */}
                  <div className="max-w-full max-h-[60vh] sm:max-h-[65vh] flex items-center justify-center pointer-events-auto">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeLightboxIndex}
                        src={lightboxImages[activeLightboxIndex]}
                        alt="Project Showcase"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-[60vh] sm:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-gray-800/30"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Right Navigation Arrow */}
                  <button
                    id="next-lightbox-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 sm:right-8 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800/50 hover:border-indigo-500/30 backdrop-blur-md transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Bottom Thumbnail Strip Indicator Bar */}
                <div className="w-full flex flex-col items-center p-4 pb-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-auto">
                  <div className="flex items-center space-x-3 overflow-x-auto py-1 max-w-full no-scrollbar">
                    {lightboxImages.map((img, idx) => (
                      <button
                        id={`thumbnail-btn-${idx}`}
                        key={idx}
                        onClick={() => setActiveLightboxIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 focus:outline-none cursor-pointer ${
                          idx === activeLightboxIndex
                            ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/20'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumb ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
