import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

// Typewriter effect hook
const useTypewriter = (quotes, speed = 55, pause = 1800) => {
  const [displayed, setDisplayed] = useState("");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout;
    if (charIdx < quotes[quoteIdx].length) {
      timeout = setTimeout(() => {
        setDisplayed((prev) => prev + quotes[quoteIdx][charIdx]);
        setCharIdx((idx) => idx + 1);
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setCharIdx(0);
        setQuoteIdx((idx) => (idx + 1) % quotes.length);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, quoteIdx, quotes, speed, pause]);

  return displayed;
};

const quotes = [
  "“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”",
  "“Knowledge is like a garden: if it is not cultivated, it cannot be harvested.” — African Proverb",
  "“If you think education is expensive, try ignorance.” — Derek Bok",
  "“The ink of the scholar is more sacred than the blood of the martyr.” — Prophet Muhammad ﷺ",
  "“Learning is a treasure that will follow its owner everywhere.”",
  "“Why did the student eat his homework? Because his teacher said it was a piece of cake!”",
  "“Seek knowledge from the cradle to the grave.” — Prophet Muhammad ﷺ",
  "“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela",
  "“A day without laughter is a day wasted, but a day without learning is a day lost!”",
];

const socials = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "https://facebook.com/",
    color: "hover:text-[#1877F3]",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://instagram.com/",
    color: "hover:text-[#E1306C]",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    url: "https://youtube.com/",
    color: "hover:text-[#FF0000]",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    url: "https://wa.me/919999999999",
    color: "hover:text-[#25D366]",
  },
  {
    name: "Gmail",
    icon: <FaEnvelope />,
    url: "mailto:kakascoachingcenter@gmail.com",
    color: "hover:text-[#EA4335]",
  },
];

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  // GSAP + Lenis for smooth bottom wave animation
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smooth: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.fromTo(
      ref.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );
    return () => lenis.destroy();
  }, []);

  const typewriter = useTypewriter(quotes);

  return (
    <footer
      className="relative w-full bg-gradient-to-br from-[#F8FAFC] via-[#E2E8F0] to-[#fff] pt-12 pb-0 px-2 overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-10 md:gap-0 px-4">
        {/* Left: Logo & Typewriter */}
        <div className="flex flex-col items-center md:items-start gap-3 md:w-1/2">
          <span className="text-2xl font-extrabold text-[#1E3A8A] font-heading tracking-tight">
            Kaka's Coaching Institute
          </span>
          <span className="text-sm text-gray-500 font-medium">
            <span className="inline-block min-h-[1.5em]">
              {typewriter}
              <span className="animate-pulse text-[#FDB913]">|</span>
            </span>
          </span>
        </div>
        {/* Right: Socials & Contact */}
        <div className="flex flex-col items-center md:items-end gap-4 md:w-1/2">
          <div className="flex gap-4 text-2xl">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 text-gray-400 hover:text-[#FDB913] ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            <span className="block">Contact: <a href="mailto:kakascoachingcenter@gmail.com" className="underline hover:text-[#FDB913]">kakascoachingcenter@gmail.com</a></span>
            <span className="block">WhatsApp: <a href="https://wa.me/919999999999" className="underline hover:text-[#25D366]">+91 99999 99999</a></span>
          </div>
        </div>
      </div>
      {/* Bottom copyright */}
      <div className="w-full text-center text-xs text-gray-400 py-6 mt-4 border-t border-[#E5E7EB]">
        &copy; {new Date().getFullYear()} Kaka's Coaching Institute. All rights reserved.
      </div>
      {/* Decorative SVG wave */}
      <div className="absolute left-0 bottom-0 w-full pointer-events-none select-none z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path
            d="M0 80 Q 360 120 720 80 T 1440 80 V120 H0Z"
            fill="#FDB91322"
          />
          <path
            d="M0 100 Q 360 60 720 100 T 1440 100 V120 H0Z"
            fill="#3B82F622"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer