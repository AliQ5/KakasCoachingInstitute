// To use GSAP and Framer Motion for smooth, snappy, and modern animations, install them with:
// npm install gsap framer-motion

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FaStar,
  FaHome,
  FaTrophy,
  FaMobileAlt,
  FaQuestionCircle,
  FaMedal,
  FaSun,
  FaUserGraduate,
  FaUserTie,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
} from "react-icons/fa";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Responsive queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

const stories = [
  {
    name: "Ayesha Khan",
    icon: <FaUserGraduate className="text-pink-400" />,
    title: "Excellent Guidance",
    text: "I received great support and guidance throughout the course. The teaching style was clear and very helpful.",
    highlights: [
      { label: "Personal Attention", value: "The teacher made sure to address all my questions and concerns." },
      { label: "Positive Environment", value: "The classes were always encouraging and motivating." },
    ],
    rating: 5,
    color: "from-pink-200 via-yellow-100 to-pink-100",
    speechColor: "bg-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    name: "Fatima Noor",
    icon: <FaUserTie className="text-blue-400" />,
    title: "Math Olympiad Competition for Kids",
    text: "My child participated in the Math Olympiad and benefited greatly from the coaching. The sessions were interactive and fun.",
    highlights: [
      { label: "Academic & School Studies", value: "The program helped my child improve in school and build confidence." },
    ],
    rating: 5,
    color: "from-yellow-100 via-blue-100 to-pink-100",
    speechColor: "bg-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    name: "Fatima Noor",
    icon: <FaUserTie className="text-blue-400" />,
    title: "Math Olympiad Competition for Kids",
    text: "My child participated in the Math Olympiad and benefited greatly from the coaching. The sessions were interactive and fun.",
    highlights: [
      { label: "Academic & School Studies", value: "The program helped my child improve in school and build confidence." },
    ],
    rating: 5,
    color: "from-yellow-100 via-blue-100 to-pink-100",
    speechColor: "bg-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    name: "Fatima Noor",
    icon: <FaUserTie className="text-blue-400" />,
    title: "Math Olympiad Competition for Kids",
    text: "My child participated in the Math Olympiad and benefited greatly from the coaching. The sessions were interactive and fun.",
    highlights: [
      { label: "Academic & School Studies", value: "The program helped my child improve in school and build confidence." },
    ],
    rating: 5,
    color: "from-yellow-100 via-blue-100 to-pink-100",
    speechColor: "bg-blue-100",
    iconBg: "bg-blue-100",
  },
];

// Top icons row, now with react-icons
const topIcons = [
  {
    icon: <FaHome className="text-yellow-400" />,
    label: "Home Tuition",
  },
  {
    icon: <FaTrophy className="text-pink-400" />,
    label: "Student Trophies",
  },
  {
    icon: <FaMobileAlt className="text-blue-400" />,
    label: "Mobile & Zoom Class batches",
    sub: "Help is not far, excel!",
  },
  {
    icon: <FaQuestionCircle className="text-green-400" />,
    label: "Fun & Intuitive Quids",
  },
  {
    icon: <FaMedal className="text-indigo-400" />,
    label: "B.d. & Olympiads",
    sub: "Exams & Eiditions",
  },
  {
    icon: <FaSun className="text-yellow-300" />,
    label: "Bright Future",
  },
];

// Custom hook for scroll-triggered fade/zoom animation for any element
const useScrollFadeZoom = (refs, options = {}) => {
  useEffect(() => {
    if (!refs.current || !refs.current.length) return;
    const elements = refs.current;
    elements.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, scale: 0.92, y: 32 });
      }
    });

    const handleScroll = () => {
      elements.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const triggerPoint = window.innerHeight * (options.amount || 0.85);
        if (rect.top < triggerPoint) {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: 0.08 * i,
            ease: "expo.out",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [refs, options.amount]);
};

const useFunIcons = (refs, triggerZoom) => {
  useEffect(() => {
    refs.current.forEach((ref, i) => {
      if (ref) {
        // Initial state for zoom
        gsap.set(ref, { scale: 0.7, opacity: 0, y: 32 });
      }
    });
    if (triggerZoom) {
      refs.current.forEach((ref, i) => {
        if (ref) {
          gsap.to(ref, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.09 * i,
            ease: "expo.out",
            overwrite: "auto",
          });
          // Playful floating, bobbing, and scaling
          gsap.to(ref, {
            y: "+=10",
            scale: 1.05 + 0.03 * Math.sin(i),
            rotate: i % 2 === 0 ? 6 : -6,
            repeat: -1,
            yoyo: true,
            duration: 2 + i * 0.18,
            ease: "sine.inOut",
          });
          gsap.to(ref, {
            scale: 1.08,
            repeat: -1,
            yoyo: true,
            duration: 2.5 + i * 0.13,
            delay: 0.5 + i * 0.1,
            ease: "sine.inOut",
          });
        }
      });
    }
  }, [refs, triggerZoom]);
};

const carouselFadeVariants = {
  enter: {
    opacity: 0,
    scale: 0.98,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.32 },
      scale: { duration: 0.22 },
    },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
    },
  },
};

// Fade-left animation for text inside card
const fadeLeftText = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1], // fast at start, slow at end
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const Reviews = () => {
  const iconRefs = useRef([]);
  const [iconsZoomed, setIconsZoomed] = useState(false);

  const controls = useAnimation();
  const sectionRef = useRef(null);

  // Refs for scroll-animated elements
  const cardRefs = useRef([]);
  const headingRef = useRef(null);
  const dotsRef = useRef([]);

  // Responsive queries for cardsToShow
  const isXL = useMediaQuery("(min-width: 1280px)");
  const isMD = useMediaQuery("(min-width: 768px)");
  const isSM = useMediaQuery("(min-width: 640px)");

  // For top icons, we keep the GSAP playful zoom/fade
  // For cards, heading, and dots, we add scroll fade/zoom

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        controls.start("visible");
        setIconsZoomed(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  useFunIcons(iconRefs, iconsZoomed);

  // Scroll fade/zoom for heading
  useScrollFadeZoom({ current: [headingRef.current] }, { amount: 0.92 });

  // Scroll fade/zoom for carousel cards
  useScrollFadeZoom(cardRefs, { amount: 0.92 });

  // Scroll fade/zoom for dots
  useScrollFadeZoom(dotsRef, { amount: 0.97 });

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.09,
        duration: 0.45,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  // Carousel logic
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  // Responsive: show 1 on mobile, 2 on md, 3 on xl
  const cardsToShow = isXL ? 3 : isMD ? 2 : 1;

  // Carousel auto-advance
  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4200);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [index, isAuto, cardsToShow]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) =>
      (prev - cardsToShow + stories.length) % stories.length
    );
    setIsAuto(false);
  }, [cardsToShow]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + cardsToShow) % stories.length);
    setIsAuto(false);
  }, [cardsToShow]);

  // For dot navigation
  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setIsAuto(false);
  };

  // For expanding/collapsing cards
  const [expandedCard, setExpandedCard] = useState(null);

  // Get visible stories for carousel
  const getVisibleStories = () => {
    let arr = [];
    for (let i = 0; i < cardsToShow; i++) {
      arr.push(stories[(index + i) % stories.length]);
    }
    return arr;
  };

  // Responsive max-height for cards
  const getCardMaxHeight = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return "340px";
      if (window.innerWidth >= 768) return "320px";
      return "260px";
    }
    return "320px";
  };

  // Listen for resize to force re-render for maxHeight
  // Not needed anymore, as cardsToShow is now fully responsive via useMediaQuery

  // --- RENDER ---
  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full py-8 md:py-16 bg-[#F8FAFC] overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      style={{
        width: "100vw",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top icons row */}
      <div
        className="flex flex-wrap justify-center gap-5 md:gap-8 mb-8 md:mb-14 px-2 md:px-0"
        style={{
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        {topIcons.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center min-w-[80px] md:min-w-[100px] select-none"
            ref={el => (iconRefs.current[idx] = el)}
            custom={idx}
            // Remove Framer fadeUp, GSAP handles zoom/fade
            initial={false}
            animate={false}
            style={{
              flex: "1 1 80px",
              maxWidth: "120px",
              minWidth: isSM ? "100px" : "80px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white shadow-md mb-2"
              style={{
                boxShadow: "0 4px 16px 0 rgba(0,0,0,0.07)",
                transition: "transform 0.2s",
                width: isXL ? 64 : isMD ? 56 : 48,
                height: isXL ? 64 : isMD ? 56 : 48,
                minWidth: isXL ? 64 : isMD ? 56 : 48,
                minHeight: isXL ? 64 : isMD ? 56 : 48,
              }}
            >
              {item.icon}
            </div>
            <span
              className="text-xs md:text-sm font-semibold text-gray-700 text-center leading-tight"
              style={{
                fontSize: isXL ? 16 : isMD ? 14 : 12,
                lineHeight: 1.2,
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              {item.label}
            </span>
            {item.sub && (
              <span
                className="text-[10px] text-gray-400 text-center leading-tight"
                style={{
                  fontSize: isXL ? 12 : isMD ? 11 : 10,
                  width: "100%",
                  wordBreak: "break-word",
                }}
              >
                {item.sub}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Carousel Card */}
      <motion.div
        className="max-w-5xl mx-auto rounded-3xl bg-white/90 shadow-xl px-2 sm:px-4 md:px-8 py-7 md:py-12 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        <motion.h2
          ref={headingRef}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-7 text-center"
          initial={false}
          animate={false}
          style={{
            opacity: 0,
            transform: "scale(0.96) translateY(24px)",
            fontSize: isXL ? 32 : isMD ? 24 : 18,
            width: "100%",
            wordBreak: "break-word",
          }}
        >
          Hear from Our Valued Parents
        </motion.h2>
        <div className="relative flex items-center justify-center" style={{ width: "100%" }}>
          {/* Carousel Arrows */}
          <button
            aria-label="Previous"
            className="absolute left-0 z-10 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/80 shadow hover:bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handlePrev}
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              width: isXL ? 48 : isMD ? 40 : 36,
              height: isXL ? 48 : isMD ? 40 : 36,
              minWidth: isXL ? 48 : isMD ? 40 : 36,
              minHeight: isXL ? 48 : isMD ? 40 : 36,
            }}
          >
            <FaChevronLeft className="text-lg md:text-xl text-gray-500" style={{ fontSize: isXL ? 28 : isMD ? 22 : 18 }} />
          </button>
          <button
            aria-label="Next"
            className="absolute right-0 z-10 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/80 shadow hover:bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleNext}
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              width: isXL ? 48 : isMD ? 40 : 36,
              height: isXL ? 48 : isMD ? 40 : 36,
              minWidth: isXL ? 48 : isMD ? 40 : 36,
              minHeight: isXL ? 48 : isMD ? 40 : 36,
            }}
          >
            <FaChevronRight className="text-lg md:text-xl text-gray-500" style={{ fontSize: isXL ? 28 : isMD ? 22 : 18 }} />
          </button>
          {/* Carousel Slides */}
          <div
            className="w-full flex justify-center items-stretch gap-4 sm:gap-6 md:gap-8 xl:gap-10 overflow-hidden"
            style={{
              width: "100%",
              maxWidth: "100vw",
              boxSizing: "border-box",
              gap: isXL ? 40 : isMD ? 32 : isSM ? 24 : 12,
              flexWrap: "nowrap",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleStories().map((story, i) => {
                const cardIdx = (index + i) % stories.length;
                const isExpanded = expandedCard === cardIdx;
                // Responsive card width
                let cardWidth = "100%";
                if (cardsToShow === 2) cardWidth = "48%";
                if (cardsToShow === 3) cardWidth = "32%";
                return (
                  <motion.div
                    key={story.name + i + index + direction}
                    className={`flex-1 min-w-0 flex flex-col items-center text-center bg-white/95 rounded-2xl shadow-lg px-3 sm:px-4 py-5 sm:py-6 mx-1 transition-all duration-300 cursor-pointer`}
                    custom={direction}
                    variants={carouselFadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.32 },
                      scale: { duration: 0.22 },
                    }}
                    style={{
                      minWidth: 0,
                      maxWidth: cardWidth,
                      flexBasis: cardWidth,
                      width: cardWidth,
                      maxHeight: isExpanded
                        ? "1000px"
                        : getCardMaxHeight(),
                      overflow: "hidden",
                      boxShadow: isExpanded
                        ? "0 8px 32px 0 rgba(0,0,0,0.13)"
                        : "0 4px 16px 0 rgba(0,0,0,0.09)",
                      zIndex: isExpanded ? 2 : 1,
                      position: "relative",
                      margin: isXL ? "0 20px" : isMD ? "0 12px" : "0 4px",
                      boxSizing: "border-box",
                      minHeight: isExpanded ? "320px" : "auto",
                    }}
                    onClick={() =>
                      setExpandedCard(isExpanded ? null : cardIdx)
                    }
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    ref={el => (cardRefs.current[i] = el)}
                  >
                    <motion.div
                      className={`relative mb-3 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg ${story.iconBg} transition-all duration-200`}
                      style={{
                        marginTop: isExpanded ? "10px" : "0",
                        marginBottom: isExpanded ? "18px" : "12px",
                        width: isXL ? 96 : isMD ? 80 : 64,
                        height: isXL ? 96 : isMD ? 80 : 64,
                        minWidth: isXL ? 96 : isMD ? 80 : 64,
                        minHeight: isXL ? 96 : isMD ? 80 : 64,
                      }}
                    >
                      <span
                        className="text-3xl sm:text-4xl md:text-5xl"
                        style={{
                          fontSize: isXL ? 48 : isMD ? 36 : 28,
                        }}
                      >
                        {story.icon}
                      </span>
                    </motion.div>
                    <h3
                      className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-1"
                      style={{
                        fontSize: isXL ? 22 : isMD ? 18 : 15,
                        width: "100%",
                        wordBreak: "break-word",
                      }}
                    >
                      {story.name}
                    </h3>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(story.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" style={{ fontSize: isXL ? 22 : isMD ? 18 : 15 }} />
                      ))}
                    </div>
                    {/* Only show info if expanded */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? 8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        pointerEvents: isExpanded ? "auto" : "none",
                      }}
                    >
                      <div className="mb-2">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-gray-600 bg-gray-100"
                          style={{
                            fontSize: isXL ? 15 : isMD ? 13 : 11,
                          }}
                        >
                          {story.title}
                        </span>
                      </div>
                      {/* Animate text and highlights with fade-left on card change */}
                      <AnimatePresence mode="wait" initial={false} custom={direction}>
                        {isExpanded && (
                          <motion.div
                            key={cardIdx + "-text"}
                            custom={direction}
                            variants={fadeLeftText}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{ width: "100%" }}
                          >
                            <motion.p
                              className="text-gray-600 mb-3"
                              style={{
                                minHeight: 24,
                                fontSize: isXL ? 17 : isMD ? 15 : 13,
                              }}
                            >
                              {story.text}
                            </motion.p>
                            <ul
                              className="text-left text-sm text-gray-500 space-y-1 mb-2 px-2"
                              style={{
                                fontSize: isXL ? 15 : isMD ? 13 : 12,
                              }}
                            >
                              {story.highlights.map((h, hi) => (
                                <motion.li
                                  key={hi}
                                  initial={{ opacity: 0, x: -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 16 }}
                                  transition={{
                                    delay: 0.12 + hi * 0.05,
                                    duration: 0.22,
                                    ease: [0.4, 0, 0.2, 1],
                                  }}
                                >
                                  <span className="font-semibold">{h.label}:</span> {h.value}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    {/* Show a "Show More"/"Show Less" indicator */}
                    <div className="mt-2">
                      <span
                        className="text-xs text-blue-400 font-semibold select-none"
                        style={{
                          fontSize: isXL ? 14 : isMD ? 13 : 12,
                        }}
                      >
                        {isExpanded ? "Show Less ▲" : "Show More ▼"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        {/* Carousel Dots */}
        <div
          className="flex justify-center mt-6 gap-2"
          style={{
            width: "100%",
            gap: isXL ? 12 : isMD ? 8 : 6,
          }}
        >
          {stories.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to story ${i + 1}`}
              className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-150 ${
                i === index ? "bg-blue-400" : "bg-gray-300"
              }`}
              style={{
                outline: "none",
                border: "none",
                boxShadow: i === index ? "0 0 0 2px #60a5fa" : "none",
                width: isXL ? 16 : isMD ? 13 : 11,
                height: isXL ? 16 : isMD ? 13 : 11,
                minWidth: isXL ? 16 : isMD ? 13 : 11,
                minHeight: isXL ? 16 : isMD ? 13 : 11,
                padding: 0,
              }}
              onClick={() => goTo(i)}
              ref={el => (dotsRef.current[i] = el)}
            >
              <FaCircle className="w-2 h-2" style={{ fontSize: isXL ? 10 : isMD ? 8 : 7 }} />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Reviews;