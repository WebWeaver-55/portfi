"use client";
import React, { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted.....");
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-24 lg:px-48 py-24">
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent mb-4 relative inline-block
                         hover:scale-110 transform transition-all duration-500 cursor-pointer
                         after:content-[''] after:absolute after:-bottom-2 after:left-0 
                         after:w-full after:h-1 after:bg-gradient-to-r 
                         after:from-emerald-300 after:to-sky-400
                         after:origin-left after:scale-x-0 hover:after:scale-x-100
                         after:transition-transform after:duration-500
                         hover:skew-x-2 hover:skew-y-1"
          >
            Let's Connect
            <Sparkles className="absolute -right-[20px] -top-8 w-6 h-6 text-sky-400 animate-pulse" />
          </h2>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-gray-400 text-base sm:text-lg hover:text-white transition-all duration-300 hover:scale-105">
            Ready to bring your ideas to life? Drop me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Form Section */}
          <div
            className="bg-gray-900 rounded-2xl p-6 sm:p-8 border-2 border-gray-800 
                          hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] 
                          transition-all duration-500"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border-2 border-gray-700
                           hover:border-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           focus:border-sky-500 focus:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border-2 border-gray-700
                           hover:border-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           focus:border-sky-500 focus:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Your Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border-2 border-gray-700 h-32
                           hover:border-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           focus:border-sky-500 focus:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                           transition-all duration-300"
                  placeholder="Tell me about your project..."
                />
              </div>
              {/* Enhanced Submit Button with Liquid Effect */}
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 p-1
                         transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]
                         active:scale-95"
              >
                <div
                  className="relative rounded-lg bg-gray-950 px-8 py-4 transition-all duration-500
                             group-hover:bg-opacity-0"
                >
                  <div className="relative flex items-center justify-center gap-3 text-white">
                    <Send className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12" />
                    <span className="font-bold transition-transform duration-500 group-hover:translate-y-0.5">
                      Send Message
                    </span>
                    <ArrowRight
                      className="h-6 w-6 transform transition-transform duration-500 
                                       group-hover:translate-x-2 group-hover:rotate-12"
                    />
                  </div>
                </div>
              </button>
            </form>
          </div>

          {/* Contact Cards */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="group cursor-pointer">
              <div
                className="bg-gray-900 rounded-xl p-6 md:p-8 border-2 border-gray-800
                           transform-gpu transition-all duration-500 ease-out
                           hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]
                           hover:-translate-y-2 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-emerald-400 to-sky-400 p-4 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-emerald-400">
                      Email Me
                    </h3>
                    <p className="text-gray-400 group-hover:text-white">
                      shauryasehgal555@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group cursor-pointer">
              <div
                className="bg-gray-900 rounded-xl p-6 md:p-8 border-2 border-gray-800
                           transform-gpu transition-all duration-500 ease-out
                           hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]
                           hover:-translate-y-2 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-emerald-400 to-sky-400 p-4 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-sky-400">
                      Call Me
                    </h3>
                    <p className="text-gray-400 group-hover:text-white">
                      +91 8218200174
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group cursor-pointer mt-24">
              <div
                className="bg-gray-900 rounded-xl p-6 md:p-8 border-2 border-gray-800 
                           transform-gpu transition-all duration-500 ease-out
                           hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]
                           hover:-translate-y-2 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-emerald-400 to-sky-400 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-emerald-400">
                      Location
                    </h3>
                    <p className="text-gray-400 group-hover:text-white">
                      Dehradun, Uttarakhand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              {[
                { Icon: Github, url: "https://github.com/WebWeaver-55" },
                { Icon: Linkedin, url: "https://linkedin.com" },
              ].map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 p-3 md:p-4 rounded-lg border-2 border-gray-800 
                              hover:border-sky-500 hover:scale-110 transition-all duration-500"
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
