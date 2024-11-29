"use client";
import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: "RAHUL SARDHANA",
    role: "Product Designer",
    image: "/api/placeholder/100/100",
    text: "This product completely transformed how we work. The interface is intuitive and the features are powerful.",
    rating: 5,
    offset: 0.3
  },
  {
    name: "ARYAN MEHTA",
    role: "Tech Lead",
    image: "assesta\bundle\starter-template\src\assets\images\ftpro.jpg",
    text: "Absolutely outstanding service. The team went above and beyond to ensure our success.",
    rating: 5,
    offset: 0.5
  },
  {
    name: "TUSHAR BAG",
    role: "Marketing Director",
    image: "/api/placeholder/100/100",
    text: "Game-changing platform that delivered beyond our expectations. Highly recommended!",
    rating: 5,
    offset: 0.7
  }
];

const TestimonialsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    const scrollPosition = Math.min(window.scrollY, 1000);
    window.requestAnimationFrame(() => {
      setScrollY(scrollPosition);
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    window.requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  const calculateCardTransform = useCallback((index, mousePosition) => {
    if (hoveredIndex !== index) return 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    const card = document.getElementById(`card-${index}`);
    if (!card) return 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = Math.min(Math.max((mousePosition.x - centerX) / 25, -10), 10);
    const deltaY = Math.min(Math.max((mousePosition.y - centerY) / 25, -10), 10);

    return `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.05, 1.05, 1.05)`;
  }, [hoveredIndex]);

  return (
    <div className="relative min-h-screen p-8">
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12 sticky top-8 z-10">
          <h2 className="text-6xl font-bold relative inline-block">
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-500 drop-shadow-2xl">
              What Our Clients Say
            </span>
            <Sparkles className="absolute -right-8 -top-8 w-6 h-6 text-sky-400 animate-pulse" />
          </h2>
        </div>

        <div className="flex flex-col space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              id={`card-${index}`}
              className="group relative w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: `translateY(${Math.min(scrollY * testimonial.offset, 100)}px)`,
                transition: 'transform 0.3s ease-out',
                willChange: 'transform'
              }}
            >
              <div
                className={`
                  relative rounded-xl p-8
                  transform transition-all duration-300 ease-out
                  hover:shadow-2xl hover:shadow-emerald-500/20
                  border border-white/10
                  group-hover:border-emerald-500/30
                  bg-gradient-to-br from-white/10 via-white/5 to-transparent
                  backdrop-blur-xl
                  will-change-transform
                `}
                style={{
                  transform: calculateCardTransform(index, mousePosition)
                }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-300/35 to-sky-500/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-spin-slow blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-spin-slow" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full ring-2 ring-white/50 relative z-10 object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {testimonial.name}
                        </h3>
                        <p className="text-sky-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:scale-110 transition-transform"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    {testimonial.text}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;