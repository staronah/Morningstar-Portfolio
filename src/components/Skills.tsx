import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit, Calendar, GraduationCap, ChevronRight, BookOpen, Github, ExternalLink } from 'lucide-react';
import { skillsData, projectsData } from '../data';

export default function Skills() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'Frontend' | 'Backend' | 'Tools'>('Frontend');

  const categories: ('Frontend' | 'Backend' | 'Tools')[] = ['Frontend', 'Backend', 'Tools'];

  const filteredSkills = skillsData.filter(s => s.category === selectedSkillCategory);

  const handlePrivateGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('show-private-github-popup'));
  };

  return (
    <section id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase font-mono">
            Journey & Expertise
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Skills & <span className="text-indigo-400">Experience</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-gray-400">
            A comprehensive look at my professional timeline, architectural skillset, and developer workflow.
          </p>
        </div>

        {/* Dual Main Content Grid (Left: Experience, Right: Skills) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Experience Column (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-900">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                <FolderGit className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Projects built over time
              </h3>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l border-gray-800 space-y-12">
              {projectsData.map((project, idx) => (
                <motion.div
                  id={`project-timeline-item-${project.id}`}
                  key={project.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Node Point with hover glow */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-indigo-400 bg-gray-950 group-hover:scale-120 group-hover:bg-indigo-400 transition-all duration-300 shadow-sm shadow-indigo-500/10" />

                  {/* Period badge & Category tag */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.period}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase bg-gray-900 py-0.5 px-2 rounded-md border border-gray-800/40">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <h4 
                      onClick={() => window.dispatchEvent(new CustomEvent('show-project-modal', { detail: { project } }))}
                      className="font-display font-bold text-lg text-white group-hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h4>
                    
                    {/* Action links */}
                    <div className="flex items-center space-x-2.5 ml-2 z-10">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          onClick={handlePrivateGithubClick}
                          className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-indigo-400 transition-colors"
                          title="View Live Site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p 
                    onClick={() => window.dispatchEvent(new CustomEvent('show-project-modal', { detail: { project } }))}
                    className="font-sans text-sm sm:text-base text-gray-300 mt-2 leading-relaxed cursor-pointer hover:text-gray-200 transition-colors"
                  >
                    {project.description}
                  </p>

                  {/* Skills tags used during project */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium text-gray-400 bg-gray-900 py-1 px-2 rounded-lg border border-gray-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-900">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/40 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Technical Mastery
              </h3>
            </div>

            {/* Skill category Selector Pills */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  id={`skill-cat-btn-${cat.toLowerCase()}`}
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono transition-all duration-200 border ${
                    selectedSkillCategory === cat
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10'
                      : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-indigo-500/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill Bars with interactive layout */}
            <div className="p-6 bg-gray-900/40 rounded-3xl border border-gray-800/20 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkillCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {filteredSkills.map((skill, sIdx) => (
                    <div id={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, '-')}`} key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm font-bold text-gray-200">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs font-semibold text-indigo-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Track */}
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        {/* Interactive fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Extra interactive footer message */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/10 flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                <strong>Continuous Learning:</strong> Currently deep diving into modern cloud hosting optimizations, micro-frontends, and server-side model integrations with custom Node endpoints.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
