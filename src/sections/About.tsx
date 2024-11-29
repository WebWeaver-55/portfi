"use client";
import React, { useState } from "react";
import { Code, User, Briefcase, GraduationCap } from "lucide-react";

const About3D = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const newRotateY = (x - centerX) / 20;

    setRotateY(newRotateY);
    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${newRotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setRotateY(0);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-950">
      {/* Apply backdrop blur on the background */}
      <div className="absolute inset-0 bg-gray-950 bg-opacity-50 backdrop-blur-md"></div>

      <div
        className="relative w-full max-w-2xl transition-all duration-300 ease-out transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative bg-gradient-to-br from-emerald-300 to-sky-500 rounded-xl p-20 transition-all duration-500 ${
            isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-white">About Me</h2>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
            >
              <User size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Code className="text-white" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Front-End Web Developer
                  </h3>
                  <p className="text-blue-100">6 months of experience</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Briefcase className="text-white" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Current Role
                  </h3>
                  <p className="text-blue-100">Just a Freelancer</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <GraduationCap className="text-white" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Education
                  </h3>
                  <p className="text-blue-100">
                    Bachelor of Computer Applications(BCA)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-white leading-relaxed">
                I&apos;m a passionate front-end developer who loves creating
                beautiful and functional web applications. With expertise in
                React, Next.js, Gsap, and modern web technologies, I focus on
                building scalable solutions that solve real-world problems.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "Gsap",
                  "Three.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/20 text-white rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 transition-all duration-500 ${
            isFlipped ? "opacity-100" : "rotate-y-180 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-white">More About Me</h2>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
            >
              <User size={24} />
            </button>
          </div>

          <div className="space-y-6 text-white">
            <h3 className="text-2xl font-semibold">What Drives Me</h3>
            <p className="leading-relaxed">
              I believe in creating technology that makes a difference. Whether
              it&apos;s improving user experiences or solving complex technical
              challenges, I&apos;m always excited to push the boundaries of
              what&apos;s possible.
            </p>

            <h3 className="text-2xl font-semibold">Outside of Coding</h3>
            <p className="leading-relaxed">
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open-source projects, or sharing my
              knowledge through technical blog posts and mentoring other
              developers.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3">Let's Connect</h3>
              <div className="flex gap-4">
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-all">
                  GitHub
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-all">
                  LinkedIn
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-all">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About3D;
