"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";


const OptimizedGeometricFlow = () => {
  const [particles, setParticles] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [activeShape, setActiveShape] = useState('square');
  const requestRef = useRef();
  const containerRef = useRef();
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const initialParticles = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: windowWidth / 2,
      y: windowHeight / 2,
      z: Math.random() * 500 - 250,
      size: 3 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      group: i % 3,
      hue: Math.random() * 360,
      orbitRadius: 50 + Math.random() * 100,
      ringOffset: Math.random() * Math.PI * 2,
      verticalAmplitude: 20 + Math.random() * 30,
      horizontalAmplitude: 15 + Math.random() * 25
    }));

    setParticles(initialParticles);
    setCursor({ x: windowWidth / 2, y: windowHeight / 2 });
  }, []);

  const renderShape = (x, y, size, rotation, color, isBackground = false) => {
    const style = {
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: color,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      willChange: 'transform',
    };

    switch (activeShape) {
      case 'triangle':
        return (
          <div
            style={{
              ...style,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: isBackground ? 'blur(2px)' : 'none'
            }}
          />
        );
      case 'rhombus':
        return (
          <div
            style={{
              ...style,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: isBackground ? 'blur(2px)' : 'none'
            }}
          />
        );
      default: // square
        return (
          <div
            style={{
              ...style,
              borderRadius: isBackground ? '4px' : '1px',
              filter: isBackground ? 'blur(2px)' : 'none'
            }}
          />
        );
    }
  };

  const updateParticlePosition = (particle, time, cursor) => {
    const baseAngle = time * particle.speed + particle.phase;
    const ringAngle = baseAngle * 0.5 + particle.ringOffset;
    
    const spiralRadius = particle.orbitRadius * (1 + Math.sin(baseAngle * 0.3) * 0.2);
    const spiralX = Math.cos(ringAngle) * spiralRadius;
    const spiralY = Math.sin(ringAngle) * spiralRadius;
    
    const figureEightX = Math.sin(baseAngle * 2) * particle.horizontalAmplitude;
    const figureEightY = Math.sin(baseAngle) * particle.verticalAmplitude;
    
    const x = cursor.x + spiralX + figureEightX;
    const y = cursor.y + spiralY + figureEightY;
    
    const rotation = (baseAngle * 30) + (Math.atan2(figureEightY, figureEightX) * 180 / Math.PI);
    
    const scale = 0.8 + Math.sin(baseAngle * 0.7) * 0.2;
    
    return { x, y, rotation, scale };
  };

  const lerpValue = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const animate = () => {
      setTime(t => t + 0.016);
      
      cursorRef.current.x = lerpValue(cursorRef.current.x, cursor.x, 0.1);
      cursorRef.current.y = lerpValue(cursorRef.current.y, cursor.y, 0.1);
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const { x, y, rotation, scale } = updateParticlePosition(
            particle,
            time,
            cursorRef.current
          );
          return { ...particle, x, y, rotation, scale };
        })
      );
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [cursor, time]);

  useEffect(() => {
    let isThrottled = false;
    
    const handleMouseMove = (e) => {
      if (isThrottled) return;
      
      isThrottled = true;
      const rect = containerRef.current.getBoundingClientRect();
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      
      setTimeout(() => {
        isThrottled = false;
      }, 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getParticleColor = (particle, isBackground = false) => {
    const baseHue = (particle.hue + time * 10) % 360;
    return isBackground 
      ? `hsla(${baseHue}, 70%, 50%, 0.15)`
      : `hsla(${baseHue}, 85%, 65%, ${0.4 + particle.scale * 0.3})`;
  };

  const BackgroundShape = () => {
    const size = 100;
    const glowColor = `hsla(${(time * 20) % 360}, 70%, 50%, 0.15)`;
    
    return (
      <div
        className="absolute transform-gpu transition-transform duration-300"
        style={{
          left: cursorRef.current.x,
          top: cursorRef.current.y,
          filter: 'blur(2px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: size * 1.5,
            height: size * 1.5,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        {renderShape(0, 0, size, time * 20, glowColor, true)}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
    >
      
      
      <BackgroundShape />
      
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transform-gpu z-[50]"
        >
          {renderShape(
            particle.x,
            particle.y,
            particle.size * particle.scale,
            particle.rotation,
            getParticleColor(particle)
          )}
        </div>
      ))}
    </div>
  );
};

export default OptimizedGeometricFlow;


