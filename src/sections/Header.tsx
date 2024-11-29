"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const sections = ['home', 'projects', 'about',  'contact'];
      const sectionElements = sections.map(section =>
        document.getElementById(section)
      );

      sectionElements.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          if (position >= top && position < bottom) {
            setActiveSection(sections[index]);
          }
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addSparkle = useCallback((e, itemId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sparkle = {
      id: Date.now(),
      x,
      y,
      itemId,
      size: Math.random() * 10 + 5,
    };

    setSparkles(prev => [...prev, sparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
    }, 1000);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'projects', label: 'PROJECTS', icon: '💼' },
    { id: 'about', label: 'ABOUT', icon: '👋' },
 
    { id: 'contact', label: 'CONTACT', icon: '📧'}
  ];

  return (
    <div>
      <div className="flex justify-center items-center fixed top-6 left-0 right-0 z-50 px-2 py-1">
        <nav className="flex gap-2 p-1 rounded-xl bg-transparent
          backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] 
          transition-all duration-300 ease-in-out transform-gpu group">

          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.1),transparent_70%)]" />
          </div>

          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onMouseMove={(e) => addSparkle(e, item.id)}
              className={`relative px-4 py-2 rounded-lg font-bold overflow-hidden group/item transition-all duration-200
                ${activeSection === item.id ? 'scale-105' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative rounded-lg  p-0.5 group-hover/item:bg-gray-900/80 transition-all duration-300">
                <div className="relative z-10 flex items-center gap-2">
                  <motion.span
                    className="text-lg"
                    animate={{
                      scale: hoveredItem === item.id ? [1, 1.15, 1] : 1,
                      rotate: hoveredItem === item.id ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm font-black tracking-wider bg-clip-text text-transparent
                    bg-gradient-to-r from-white via-cyan-200 to-white">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}

          <AnimatePresence>
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute pointer-events-none"
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 1.8 }}
                exit={{ opacity: 0 }}
                style={{
                  width: sparkle.size,
                  height: sparkle.size,
                  left: sparkle.x,
                  top: sparkle.y,
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 80%)',
                  borderRadius: '50%',
                }}
              />
            ))}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
};

export default Header;
