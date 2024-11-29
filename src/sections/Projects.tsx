"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, ArrowUpRight } from 'lucide-react';
import { Sparkles } from 'lucide-react';

interface Result {
  title: string;
}

interface Project {
  company: string;
  year: string;
  title: string;
  results: Result[];
  skills: string[];
  link: string;
}

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`project-${index}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovered) return;
    
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    setRotation({ x: rotateX, y: rotateY, z: 0 });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  return (
    <div
      id={`project-${index}`}
      className={`
        relative transform transition-all duration-1000
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          resetRotation();
        }}
        onMouseMove={handleMouseMove}
        className="relative perspective-2000 group"
      >
        <div
          className={`
            relative bg-gray-900 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16
            transform-gpu transition-all duration-700 ease-out
            hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]
            ${isHovered ? 'scale-[1.02]' : 'scale-100'}
          `}
          style={{
            transform: `
              rotateX(${rotation.x}deg)
              rotateY(${rotation.y}deg)
              rotateZ(${rotation.z}deg)
              ${isHovered ? 'translateZ(20px)' : ''}
            `,
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 relative">
            <div className="lg:pb-16">
              <div
                className={`
                  inline-flex items-center space-x-2 transform-gpu
                  transition-all duration-500 hover:scale-110
                  ${isHovered ? 'translate-z-20' : ''}
                `}
              >
                <div className="relative overflow-hidden rounded-full px-4 py-1 bg-gradient-to-r from-emerald-500/10 to-sky-500/10">
                  <span className="bg-gradient-to-r from-emerald-300 to-sky-500 text-transparent bg-clip-text font-bold uppercase tracking-widest text-sm">
                    {project.company}
                  </span>
                </div>
                <span className="text-white/60">•</span>
                <span className="bg-gradient-to-r from-emerald-300 to-sky-500 text-transparent bg-clip-text font-bold uppercase tracking-widest text-sm">
                  {project.year}
                </span>
              </div>

              <h3 
                className={`
                  font-serif text-2xl mt-2 md:text-4xl text-white md:mt-5
                  transition-all duration-700 transform-gpu
                  ${isHovered ? 'translate-z-30 text-emerald-300' : ''}
                `}
              >
                {project.title}
              </h3>

              <div className="relative h-px mt-6 mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-white/20" />
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500
                    transition-transform duration-1000
                    ${isHovered ? 'translate-x-0' : '-translate-x-full'}
                  `}
                />
              </div>

              <ul className="flex flex-col gap-4">
                {project.results.map((result, idx) => (
                  <li 
                    key={idx}
                    className={`
                      flex items-center gap-3 text-white/80
                      transform-gpu transition-all duration-500
                    `}
                    style={{
                      transform: isHovered ? `translateX(${idx * 8}px) translateZ(${40 + idx * 10}px)` : 'none',
                      transitionDelay: `${idx * 100}ms`
                    }}
                  >
                    <CheckCircleIcon 
                      className={`
                        transition-all duration-500
                        ${isHovered ? 'text-emerald-400 scale-110 rotate-12' : 'text-white'}
                      `}
                    />
                    <span className="text-sm md:text-base">{result.title}</span>
                  </li>
                ))}
              </ul>

              <div 
                className={`
                  mt-6 flex flex-wrap gap-2
                  transition-all duration-500
                  ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                `}
              >
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 w-full md:w-auto perspective-1000"
              >
                <button 
                  className={`
                    relative overflow-hidden
                    bg-gradient-to-r from-emerald-300 to-sky-500
                    text-gray-900 font-semibold h-12 px-8 rounded-xl
                    transform-gpu transition-all duration-500
                    hover:shadow-lg hover:shadow-emerald-500/25
                    ${isHovered ? 'translate-z-50' : ''}
                    group
                  `}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span>View my site</span>
                    <ArrowUpRight 
                      className={`
                        transform transition-all duration-300
                        ${isHovered ? 'rotate-90' : ''}
                      `}
                    />
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </a>
            </div>

            <div className="relative mt-8 lg:mt-0 perspective-1000">
              <div 
                className={`
                  relative overflow-hidden rounded-xl
                  transform-gpu transition-all duration-700 ease-out
                  ${isHovered ? 'translate-z-40 scale-105 rotate-2' : ''}
                `}
              >
                <img
                  src="/api/placeholder/800/600"
                  alt={project.title}
                  className="w-full rounded-xl shadow-lg"
                />
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-sky-500/20
                    opacity-0 group-hover:opacity-100 transition-opacity duration-700
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const portfolioProjects: Project[] = [
  {
    company: "THE BOMPY's",
    year: "2024",
    title: "Payment Security Web",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    skills: ["React", "Tailwind CSS", "Next.js", "TypeScript", "Node.js"],
    link: "https://yodutu.be/4k7IdSLxh6w",
  },
  {
    company: "The Burgers",
    year: "2024",
    title: "E-Commerce Web",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    skills: ["Vue.js", "SCSS", "Firebase", "JavaScript", "AWS"],
    link: "https://youtu4.be/7hi5zwO75yc",
  },
  {
    company: "Facebook",
    year: "2024",
    title: "Social Media Profile Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    skills: ["React", "GraphQL", "Python", "TensorFlow", "Docker"],
    link: "https://youtu.55be/Z7I5uSRHMHg",
  },
];

const Projects = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 transform transition-all duration-1000">

          <h1 className="font-semibold lg:text-3xl tracking-widest bg-gradient-to-r from-emerald-300 to-sky-500 text-transparent bg-clip-text">
            REAL WORLD RESULTS
            <Sparkles className="absolute right-[260px] -top-8 w-6 h-6 text-sky-400 animate-pulse" />
          </h1>
          <h1 className="font-serif text-3xl md:text-5xl mt-6 text-white relative inline-block">
            FEATURED PROJECTS
          </h1>
        </div>

        <div className="flex flex-col gap-20">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
