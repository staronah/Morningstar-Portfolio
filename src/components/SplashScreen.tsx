import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import CyberParticlesBg from './CyberParticlesBg';

interface SplashScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Systems...');
  const [randomChars, setRandomChars] = useState<string[]>(() =>
    Array.from({ length: 11 }, () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*!?";
      return chars[Math.floor(Math.random() * chars.length)];
    })
  );

  // High-speed matrix/scramble letter randomized generator
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*!?";
    const scrambleInterval = setInterval(() => {
      setRandomChars(() =>
        Array.from({ length: 11 }, () => chars[Math.floor(Math.random() * chars.length)])
      );
    }, 45); // Update characters very fast (45ms) for a premium hacker/digital vibe

    return () => clearInterval(scrambleInterval);
  }, []);

  useEffect(() => {
    const textSequence = [
      { threshold: 25, text: 'Mapping Developer Coordinates...' },
      { threshold: 55, text: 'Igniting MorningStar Engine...' },
      { threshold: 80, text: 'Deploying Scalable UI Components...' },
      { threshold: 95, text: 'Polishing Fluid Animations...' },
    ];

    const duration = 5000; // Exact duration in ms
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(computedProgress);

      const currentText = textSequence.find(seq => computedProgress >= seq.threshold)?.text;
      if (currentText) {
        setLoadingText(currentText);
      }

      if (computedProgress >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 30); // Higher frequency for smooth resolution

    return () => clearInterval(interval);
  }, [onComplete]);

  const targetWord = "MORNINGSTAR";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 bg-gray-950 z-100 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Cyber Particle Background */}
      <CyberParticlesBg speedMultiplier={1.8} density={45} />

      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center text-center max-w-sm px-4 space-y-8 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          {/* Main glowing ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-indigo-600/30 rounded-full opacity-30 blur-2xl animate-pulse" />
          
          {/* High-tech capsule displaying scramble matrix letters */}
          <div className="relative px-6 py-4.5 rounded-2xl bg-gray-900/80 border border-gray-800/80 text-white flex items-center justify-center shadow-2xl min-w-[280px]">
            {/* Character list */}
            <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 font-mono text-2xl sm:text-3xl font-black tracking-wider select-none">
              {targetWord.split('').map((char, index) => {
                const isResolved = progress >= (index + 1) * 8.5;
                const displayChar = isResolved ? char : randomChars[index];
                return (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-100 ${
                      isResolved
                        ? 'text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.7)] font-black scale-100'
                        : 'text-indigo-600/50 font-semibold scale-95 opacity-70 animate-pulse'
                    }`}
                  >
                    {displayChar}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
