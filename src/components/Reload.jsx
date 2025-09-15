import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRocket, FaBook, FaGraduationCap, FaMagic } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Colorful palette from design system
const PALETTE = [
  "#FDB913", // Sunny Gold/Orange
  "#FF5F6D", // Vibrant Pink
  "#C471ED", // Purple
  "#00C9FF", // Blue
  "#92FE9D", // Green
  "#1E3A8A", // Deep Blue
  "#FDE68A", // Light Gold
  "#F3F4F6", // Light Gray
  "#F59E42", // Orange
  "#F43F5E", // Red
];

const GRADIENTS = [
  {
    colors: ["#FDB913", "#FF5F6D", "#C471ED", "#00C9FF", "#92FE9D"],
    direction: "135deg",
  },
  {
    colors: ["#FF5F6D", "#FDB913", "#00C9FF", "#C471ED", "#FDE68A"],
    direction: "45deg",
  },
  {
    colors: ["#C471ED", "#00C9FF", "#FDB913", "#FF5F6D", "#F59E42"],
    direction: "120deg",
  },
  {
    colors: ["#00C9FF", "#92FE9D", "#C471ED", "#FDB913", "#F43F5E"],
    direction: "160deg",
  },
  {
    colors: ["#FF5F6D", "#C471ED", "#92FE9D", "#FDB913", "#1E3A8A"],
    direction: "200deg",
  },
  {
    colors: ["#FDE68A", "#F59E42", "#F43F5E", "#00C9FF", "#C471ED"],
    direction: "100deg",
  },
];

const ICONS = [
  { icon: FaRocket, name: "rocket" },
  { icon: FaBook, name: "book" },
  { icon: FaGraduationCap, name: "cap" },
  { icon: FaMagic, name: "magic" },
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const subText = [
  "Learn. Grow. Shine.",
  "Ignite Your Curiosity.",
  "Unleash Your Potential.",
  "Where Learning is Fun!",
];
const subTextColor = [
  "text-yellow-300",
  "text-pink-300",
  "text-blue-200",
  "text-green-200",
];

const Reload = ({ children }) => {
  const [show, setShow] = useState(true);
  const [gradient, setGradient] = useState(getRandom(GRADIENTS));
  const [progress, setProgress] = useState(0);
  const [lenisLoaded, setLenisLoaded] = useState(false);
  const [icons, setIcons] = useState(() =>
    ICONS.map((icon, i) => ({
      ...icon,
      color: getRandom(PALETTE),
      id: i,
    }))
  );
  const [subtextIdx, setSubtextIdx] = useState(0);

  // Animate progress bar
  useEffect(() => {
    if (!show) return;
    let current = 0;
    let interval = setInterval(() => {
      current += Math.random() * 18 + 7;
      if (current >= 100) {
        current = 100;
        setProgress(current);
        clearInterval(interval);
        setTimeout(() => setShow(false), 700);
      } else {
        setProgress(current);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [show]);

  // Animate subtext cycling
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setSubtextIdx((idx) => (idx + 1) % subText.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [show]);

  // Animate gradient background with react-spring
  const spring = useSpring({
    from: { backgroundPosition: "0% 50%" },
    to: { backgroundPosition: "100% 50%" },
    config: { duration: 2200 },
    loop: { reverse: true },
  });

  // Enable Lenis after loading
  useEffect(() => {
    if (!show && !lenisLoaded && typeof window !== "undefined") {
      import("@studio-freight/lenis").then(({ default: Lenis }) => {
        if (!window.__lenis) {
          window.__lenis = new Lenis({
            smooth: true,
            lerp: 0.08,
            direction: "vertical",
          });
          function raf(time) {
            window.__lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }
        setLenisLoaded(true);
      });
    }
  }, [show, lenisLoaded]);

  // Show a toast when loading completes (for demo)
  useEffect(() => {
    if (!show && progress === 100) {
      toast.success("Welcome to Kaka's Coaching Institute!", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  }, [show, progress]);

  // Gradient CSS for background
  const gradientStyle = {
    background: `linear-gradient(${gradient.direction}, ${gradient.colors.join(
      ", "
    )})`,
    backgroundSize: "300% 300%",
    backgroundPosition: spring.backgroundPosition,
    transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
    filter: "blur(0px)",
  };

  // Font classes
  const titleFont =
    "font-extrabold tracking-tight text-white drop-shadow-lg";
  const taglineFont =
    "font-medium text-lg md:text-xl text-blue-100/90 drop-shadow-md";

  // For animated text transitions
  const textVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.7 + i * 0.18,
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
    exit: { opacity: 0, y: -40, scale: 0.95, filter: "blur(8px)", transition: { duration: 0.5 } },
  };

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
            style={{ pointerEvents: "auto" }}
          >
            {/* Animated Gradient Background */}
            <animated.div
              className="absolute inset-0 w-full h-full"
              style={gradientStyle}
            >
              <div className="absolute inset-0 bg-black/60" />
            </animated.div>

            {/* Centered Content */}
            <div className="relative flex flex-col items-center justify-center z-10 w-full px-4">
              {/* Animated Bar Loader */}
              <div className="w-full max-w-md mx-auto flex flex-col items-center">
                <BarLoader
                  color={getRandom(PALETTE)}
                  width={"100%"}
                  height={8}
                  speedMultiplier={1.2}
                  loading={true}
                  cssOverride={{
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    background: `linear-gradient(90deg, ${PALETTE.join(",")})`,
                  }}
                  progress={progress}
                />
                <motion.div
                  className="w-full flex justify-between items-center px-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                >
                  <span className="text-xs text-white/80 font-mono">
                    Loading...
                  </span>
                  <span className="text-xs text-white/80 font-mono">
                    {Math.round(progress)}%
                  </span>
                </motion.div>
              </div>

              {/* Animated Study Icons */}
              <div className="flex flex-row gap-4 mt-2 mb-4">
                {icons.map((icon, i) => {
                  const Icon = icon.icon;
                  return (
                    <motion.span
                      key={icon.id}
                      className="text-3xl md:text-4xl"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1.1,
                        color: icon.color,
                        filter: `drop-shadow(0 0 12px ${icon.color}88) drop-shadow(0 0 24px #fff4)`,
                        transition: {
                          delay: 0.8 + i * 0.13,
                          duration: 0.7,
                          type: "spring",
                          stiffness: 180,
                          damping: 14,
                        },
                      }}
                    >
                      <Icon />
                    </motion.span>
                  );
                })}
              </div>

              {/* Tagline Reveal with animated text transitions */}
              <motion.div
                className="mt-2 flex flex-col items-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.18,
                      delayChildren: 0.7,
                    },
                  },
                  exit: {},
                }}
              >
                <motion.h1
                  className={`text-3xl md:text-5xl ${titleFont} bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}
                  custom={0}
                  variants={textVariants}
                >
                  Kaka&apos;s Coaching Institute
                </motion.h1>
                <motion.p
                  className={`mt-2 ${taglineFont} bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 bg-clip-text text-transparent`}
                  custom={1}
                  variants={textVariants}
                >
                  Empowering Your Future with Knowledge
                </motion.p>
                {/* Animated subtext with color cycling */}
                <motion.div
                  className="mt-3 min-h-[2.5rem]"
                  initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      delay: 1.2,
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                  }}
                  exit={{ opacity: 0, y: -24, scale: 0.95, filter: "blur(8px)", transition: { duration: 0.5 } }}
                >
                  <motion.span
                    key={subText[subtextIdx]}
                    className={`block text-xl md:text-2xl font-semibold ${subTextColor[subtextIdx % subTextColor.length]} drop-shadow`}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.7,
                        ease: "easeOut",
                      },
                    }}
                    exit={{ opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.4 } }}
                  >
                    {subText[subtextIdx]}
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main site content */}
      <div className={show ? "overflow-hidden h-screen" : ""}>{children}</div>
    </>
  );
};

export default Reload;
