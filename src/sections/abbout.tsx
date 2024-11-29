"use client";

import React, { useState, useEffect, useRef, memo } from 'react';
import { User, Mail, Github, Linkedin, Code, Heart, Coffee, Sparkles } from 'lucide-react';

const SocialIcon = memo(({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group/icon relative">
    <Icon 
      className="w-10 h-10 cursor-pointer text-white/80 transition-all duration-300 hover:text-white hover:scale-125 hover:-translate-y-2" 
    />
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full group-hover/icon:-translate-y-2">
      {Icon.name}
    </div>
  </a>
));
const TabButton = memo(({ tab, activeTab, title, Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative px-6 py-2 transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden ${
      activeTab === tab 
        ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm' 
        : 'text-blue-200 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-2 relative z-10">
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      <span>{title}</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-transform duration-300 -translate-x-full group-hover:translate-x-0" />
  </button>
));

const ContentSection = memo(({ active, title, text, Icon }) => (
  <div className={`absolute w-full transition-all duration-500 ${
    active 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-8 pointer-events-none'
  }`}>
    <div className="group/content rounded-2xl p-8 transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10 backdrop-blur-sm border border-white/5">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-white">
        <Icon className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover/content:scale-110 group-hover/content:rotate-12" />
        {title}
      </h2>
      <p className="text-lg text-blue-100 leading-relaxed whitespace-pre-line transition-all duration-300 group-hover/content:translate-x-2">
        {text}
      </p>
    </div>
  </div>
));

const ParticleCanvas = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      hue: Math.random() * 60 + 200,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const updateParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.opacity})`;
        ctx.fill();

        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 70%, 50%, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    updateParticles();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
});

const AnimatedAboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const containerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const content = {
    bio: {
      title: "Who I Am",
      icon: User,
      text: "Hi! I'm Shaurya, a full-stack developer passionate about creating beautiful, functional web experiences. With 6 months of experience in web development, I specialize in React, Node.js, and modern web technologies."
    },
    skills: {
      title: "My Skills",
      icon: Code,
      text: "Frontend: React, Javascript, Tailwind CSS , Gsap , Three.js \nTools: Git"
    },
    interests: {
      title: "Interests",
      icon: Heart,
      text: "When I'm not coding, you can find me exploring new technologies,travelling my state , contributing to open-source projects, or enjoying outdoor photography."
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full p-28 relative overflow-hidden"
      onMouseMove={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
    >
      <ParticleCanvas />

      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      <div
        className="fixed w-8 h-8 pointer-events-none mix-blend-difference z-50"
        style={{
          transform: `translate(${cursorPosition.x - 16}px, ${cursorPosition.y - 16}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="w-full h-full rounded-full bg-white blur-sm" />
      </div>

      <div className={`relative max-w-4xl mx-auto space-y-12 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-56 h-56">
            <div className="absolute w-full h-full rounded-2xl overflow-hidden group/profile">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transition-transform duration-500 group-hover/profile:scale-110">
                <div className="relative transition-transform duration-500 group-hover/profile:rotate-12">
                  <User size={80} className="text-white" />
                  <Sparkles
                    className="absolute -top-4 -right-4 text-yellow-300 animate-pulse"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-500 animate-gradient">
            SHAURYA SEHGAL
          </h1>
          <p className="text-2xl text-blue-200 mb-4">
            FULL STACK DEVELOPER
          </p>
          <div className="flex gap-8 justify-center md:justify-start">
            {[
              { Icon: Mail, href: "mailto:shauryasehgal555@gmail.com" },
              { Icon: Github, href: "https://github.com/WebWeaver-55" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/shaurya-sehgal-701b7a305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
            ].map(({ Icon, href }, index) => (
              <SocialIcon key={index} Icon={Icon} href={href} />
            ))}
          </div>
        </div>
        </div>

        <div className="flex gap-6 justify-center">
          {Object.entries(content).map(([tab, { title, icon: Icon }]) => (
            <TabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              title={title}
              Icon={Icon}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <div className="relative min-h-[200px]">
          {Object.entries(content).map(([tab, { title, text, icon: Icon }]) => (
            <ContentSection
              key={tab}
              active={activeTab === tab}
              title={title}
              text={text}
              Icon={Icon}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedAboutMe;