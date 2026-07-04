import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Real-time coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for a fluid, lagging trail effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Check if the user is on a touch device
    const checkTouchDevice = () => {
      const match = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(match);
    };
    
    checkTouchDevice();

    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Global listener for interactive elements to scale up reticle
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over buttons, links, clickable items, or inputs
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.interactive') !== null ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Global body cursor hide class
    document.body.classList.add('cursor-none-global');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.classList.remove('cursor-none-global');
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-500 overflow-hidden">
      {/* Outer Reticle Ring */}
      <motion.div
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          borderColor: isHovered ? 'rgba(129, 140, 248, 0.8)' : 'rgba(129, 140, 248, 0.3)',
          backgroundColor: isHovered ? 'rgba(129, 140, 248, 0.08)' : 'rgba(129, 140, 248, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute w-8 h-8 rounded-full border-2 pointer-events-none flex items-center justify-center"
      >
        {/* Subtle interior radar lines when hovering */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full animate-ping border border-indigo-400/20" />
        )}
      </motion.div>

      {/* Inner Active Dot */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.6 : 1.0,
          backgroundColor: isHovered ? '#818cf8' : '#6366f1',
        }}
        className="absolute w-2 h-2 rounded-full pointer-events-none shadow-[0_0_10px_rgba(99,102,241,0.6)]"
      />
    </div>
  );
}
