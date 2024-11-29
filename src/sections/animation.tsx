"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import About3D from "./About";
import { Sparkles } from "lucide-react";

const Hero = (): JSX.Element => {
  const component = useRef(null);
  const firstName = "SHAURYA";
  const lastName = "SEHGAL";
  const tagLine = "CREATIVE WEB DEVELOPER";
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1.5, ease: "power4.out" },
      });

      tl.from(".first-name", {
        x: -200,
        rotationY: -40,
        opacity: 0,
        duration: 1.2,
      })
        .from(
          ".last-name",
          {
            x: 200,
            rotationY: 40,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        )
        .from(
          ".job-title",
          {
            scale: 0,
            opacity: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1.5,
          },
          "-=0.8"
        )
        .to([".first-name", ".last-name"], {
          y: "-=10",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
          stagger: 0.2,
        });

      [".first-name", ".last-name"].forEach((nameClass) => {
        const element = document.querySelector(nameClass);

        element?.addEventListener("mouseenter", () => {
          gsap.to(nameClass, {
            scale: 1.1,
            rotateZ: 2,
            y: -15,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(nameClass, {
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
            duration: 0.4,
          });
        });

        element?.addEventListener("mouseleave", () => {
          gsap.to(nameClass, {
            scale: 1,
            rotateZ: 0,
            y: -10,
            duration: 0.4,
            ease: "power2.in",
            textShadow: "none",
          });
        });
      });

      const jobTitle = document.querySelector(".job-title");
      jobTitle?.addEventListener("mouseenter", () => {
        gsap.to(".job-title", {
          letterSpacing: "0.2em",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      jobTitle?.addEventListener("mouseleave", () => {
        gsap.to(".job-title", {
          letterSpacing: "normal",
          duration: 0.4,
          ease: "power2.in",
        });
      });
    }, component);

    return () => ctx.revert();
  }, []);

  const handleAboutClick = () => {
    setIsAboutVisible(true);
    setIsBlurred(true);
  };

  const handleCloseAbout = () => {
    setIsAboutVisible(false);
    setIsBlurred(false);
  };

  return (
    <section
      ref={component}
      className="min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Name Section */}
      <div className="text-center">
        <h1 className="mb-4 relative">
          <div
            className="first-name hover:cursor-pointer bg-gradient-to-r from-emerald-300 to-sky-500 text-5xl text-transparent bg-clip-text md:text-6xl sm:text-4xl font-extrabold"
          >
            {firstName}
          </div>
          <div
            className="last-name hover:cursor-pointer bg-gradient-to-r from-emerald-300 to-sky-500 text-transparent bg-clip-text text-5xl md:text-8xl sm:text-4xl font-extrabold mt-2"
          >
            {lastName}
          </div>
        </h1>
        <div className="job-title bg-gradient-to-r from-emerald-300 to-sky-500 bg-clip-text text-transparent text-3xl md:text-4xl sm:text-4xl uppercase font-medium tracking-wider mt-4">
          {tagLine}
        </div>
      </div>

      {/* About Button */}
      <button
        onClick={handleAboutClick}
        className="group relative mt-8"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
        <div className="relative px-6 py-3 bg-gradient-to-r from-emerald-300 to-sky-500 rounded-xl flex items-center gap-3 group-hover:bg-opacity-90 transition duration-300">
          <span className="text-white font-semibold text-2xl lg:text-xl group-hover:scale-105 transition-transform duration-300">
            ABOUT ME
          </span>
          <Sparkles className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </button>

      {isAboutVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 sm:mx-2">
            <About3D />
            <button
              onClick={handleCloseAbout}
              className="absolute top-2 right-2 text-white font-bold p-2 rounded-full hover:bg-gray-200 transition"
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;


