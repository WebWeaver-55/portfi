"use client";

import React, { useState } from "react";
import { Code, Sparkles, Laptop, Star, Palette, Rocket } from "lucide-react";

const Hero3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const rotateX = (clientY - innerHeight / 2) / 20;
    const rotateY = (clientX - innerWidth / 2) / 20;

    setRotation({ x: rotateX, y: rotateY });
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const FloatingCard = ({ icon: Icon, title, delay, className }) => (
    <div
      className={`absolute ${className} transition-all duration-700`}
      style={{
        transform: `
          perspective(1000px)
          rotateX(${rotation.x * 0.7}deg)
          rotateY(${rotation.y * 0.7}deg)
          translateZ(50px)
        `,
        animation: `float 6s ease-in-out infinite ${delay}s`,
      }}
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
        <div className="relative px-4 py-3 bg-gray-900 rounded-xl flex items-center gap-3 border border-gray-800 backdrop-blur-xl">
          <Icon className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-medium text-gray-300">{title}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-[100dvh] w-full relative overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* 3D Profile Section */}
          <div className="relative w-full max-w-5xl mx-auto h-64">
            {/* Floating cards */}
            <FloatingCard
              icon={Code}
              title="Clean Code"
              delay={2}
              className="top-2 left-1/4"
            />
            <FloatingCard
              icon={Palette}
              title="Creative Design"
              delay={1}
              className="top-10 right-1/4"
            />
            <FloatingCard
              icon={Laptop}
              title="Responsive"
              delay={2}
              className="bottom-0 left-1/3"
            />
            <FloatingCard
              icon={Rocket}
              title="Performance"
              delay={3}
              className="bottom-10 right-1/4"
            />

            {/* Center profile image */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: ` 
                  translate(-50%, -50%)
                  perspective(1000px)
                  rotateX(${rotation.x}deg)
                  rotateY(${rotation.y}deg)
                  translateZ(100px)
                `,
              }}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-30" />
                <div className="relative h-full rounded-full overflow-hidden border-4 border-blue-500/30 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30" />
                  <img
                    src="/api/placeholder/192/192"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Availability badge */}
          <div
            className="relative transform transition-all duration-500"
            style={{
              transform: `
                perspective(1000px)
                rotateX(${rotation.x * 0.3}deg)
                rotateY(${rotation.y * 0.3}deg)
                translateZ(60px)
              `,
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative px-6 py-3 bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-xl flex items-center gap-4">
                <div className="relative w-3 h-3">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                  <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse" />
                </div>
                <span className="text-md font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Open to New Projects
                </span>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div
            className="max-w-3xl text-center space-y-8"
            style={{
              transform: `
                perspective(1000px)
                rotateX(${rotation.x * 0.2}deg)
                rotateY(${rotation.y * 0.2}deg)
                translateZ(40px)
              `,
            }}
          >
            <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4">
              <span className="block bg-gradient-to-r from-emerald-300 to-sky-500 bg-clip-text text-transparent">
                Tailoring Digitized Experiences
              </span>
              <div className="absolute -inset-x-20 -inset-y-10 blur-3xl opacity-30" />
            </h2>
            <p className="text-gray-400 text-lg px-4 hover:text-white transition-all duration-300 hover:scale-105">
              Turning concepts into outstanding digital experiences through creative design and advanced technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto px-4"
            style={{
              transform: `
                perspective(1000px)
                rotateX(${rotation.x * 0.1}deg)
                rotateY(${rotation.y * 0.1}deg)
                translateZ(20px)
              `,
            }}
          >
            {/* Explore Button */}
            <button className="group relative w-full md:w-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative px-8 py-3 bg-gradient-to-r from-emerald-300 to-sky-500 rounded-xl flex items-center justify-center md:justify-start gap-3 group-hover:bg-opacity-90 transition duration-300">
                <span className="text-white font-semibold text-md group-hover:scale-105 transition-transform duration-300">
                  EXPLORE
                </span>
                <Sparkles className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </button>

            {/* Connect Button */}
            <button
              className="group relative w-full md:w-auto"
              onClick={handleScrollToContact}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-sky-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000" />
              <div className="relative px-8 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center md:justify-start gap-3">
                <span className="text-md text-gray-300 font-semibold group-hover:text-white transition-colors duration-300">
                  LET'S CONNECT
                </span>
                <Star className="w-5 h-5 text-gray-400 group-hover:text-white transform group-hover:rotate-12 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
