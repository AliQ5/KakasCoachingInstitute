import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calculator, PenTool, Atom, MoonStar, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import { useNavigate } from "react-router-dom";

// --- Transition Overlay Component (copied from NavBar.jsx) ---
const TransitionOverlay = React.forwardRef(({ show }, ref) => (
  <AnimatePresence>
    {show && (
      <motion.div
        ref={ref}
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ opacity: 0, scaleY: 0.98 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 1.02 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background:
            "linear-gradient(120deg, #fdb913 0%, #fdf6fb 60%, #a5b4fc 100%)",
          mixBlendMode: "normal",
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              "linear-gradient(120deg, #fdb913 0%, #fdf6fb 60%, #a5b4fc 100%)",
            opacity: 0.96,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ delay: 0.08, duration: 0.25 }}
        >
          <motion.img
            src="/logo.png"
            alt="Kaka's Coaching Institute"
            className="h-16 w-16 object-contain drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));

// --- Subject Data ---
const SUBJECTS = [
  {
    name: "English",
    color: "bg-blue-100",
    icon: BookOpen,
    description: "Fun notes with ABC doodles and stories",
    route: "/Notes/English",
  },
  {
    name: "Mathematics",
    color: "bg-yellow-100",
    icon: Calculator,
    description: "Equations, numbers, and problem-solving notes",
    route: "/Notes/Mathematics",
  },
  {
    name: "Urdu",
    color: "bg-orange-100",
    icon: PenTool,
    description: "Beautiful Urdu handwriting and poetry notes",
    route: "/Notes/Urdu",
  },
  {
    name: "Science",
    color: "bg-green-100",
    icon: Atom,
    description: "Diagrams, experiments, and discovery notes",
    route: "/Notes/Science",
  },
  {
    name: "Islamic Studies",
    color: "bg-purple-100",
    icon: MoonStar,
    description: "Quran verses, hadiths, and Islamic history notes",
    route: "/Notes/Islamic-Studies",
  },
];

// --- SectionHeader ---
const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    className="relative mb-10 flex flex-col items-center"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold text-center font-display bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
      Our Notes
    </h1>
    <div className="relative mt-3">
      <div className="h-2 w-32 rounded-full bg-gradient-to-r from-blue-200 via-fuchsia-200 to-yellow-200 blur-sm" />
      <Sparkles
        className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-300 drop-shadow-lg"
        size={28}
        strokeWidth={1.5}
      />
    </div>
    <p className="mt-4 text-lg text-slate-600 max-w-xl text-center font-medium">
      Explore our colorful, easy-to-understand notes for every subject. Tap a card to start learning!
    </p>
  </motion.div>
);

// --- NoteCard ---
const NoteCard = React.forwardRef(({ subject, idx, onClick }, ref) => {
  const Icon = subject.icon;
  return (
    <motion.div
      ref={ref}
      className={`
        group relative flex flex-col items-center justify-between
        ${subject.color} rounded-2xl shadow-lg px-6 py-8
        transition-all duration-200
        hover:shadow-2xl hover:scale-[1.045]
        border-2 border-transparent hover:border-yellow-300
        cursor-pointer
        min-h-[220px]
        select-none
        overflow-hidden
      `}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.12 + idx * 0.09,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        boxShadow: "0 8px 32px 0 rgba(253,185,19,0.18)",
        y: -8,
        scale: 1.05,
        transition: { type: "spring", stiffness: 220, damping: 18 },
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onClick && onClick(e);
        }
      }}
    >
      <div className="flex items-center justify-center mb-4">
        <span
          className={`
            flex items-center justify-center rounded-full
            bg-white/80 shadow-inner
            w-16 h-16
            border-2 border-white
            group-hover:shadow-yellow-200 group-hover:shadow-lg
            transition
          `}
        >
          <Icon className="text-blue-400 group-hover:text-yellow-400" size={36} strokeWidth={2.2} />
        </span>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2 text-center drop-shadow-sm">
        {subject.name}
      </h2>
      <p className="text-slate-600 text-center text-base font-medium">
        {subject.description}
      </p>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.18 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #fde68a 0%, #fdf6fb 60%, transparent 100%)",
        }}
      />
    </motion.div>
  );
});

// --- NotesGrid ---
const NotesGrid = ({ onCardClick }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    // GSAP floating animation for each card
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: "+=18",
          repeat: -1,
          yoyo: true,
          duration: 2.2 + i * 0.18,
          ease: "sine.inOut",
          delay: i * 0.13,
        });
      }
    });
  }, []);

  return (
    <motion.div
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10
        w-full max-w-5xl mx-auto
        z-10
      "
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.13,
          },
        },
      }}
    >
      {SUBJECTS.map((subject, idx) => (
        <NoteCard
          key={subject.name}
          subject={subject}
          idx={idx}
          ref={el => (cardRefs.current[idx] = el)}
          onClick={() => onCardClick(subject)}
        />
      ))}
    </motion.div>
  );
};

// --- BackgroundDecorations ---
const BackgroundDecorations = () => {
  const decoRefs = useRef([]);

  useEffect(() => {
    // Animate floating for each decoration
    decoRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: "+=24",
          repeat: -1,
          yoyo: true,
          duration: 3.2 + i * 0.5,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
        gsap.to(el, {
          rotate: "+=8",
          repeat: -1,
          yoyo: true,
          duration: 4.5 + i * 0.7,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      }
    });
  }, []);

  // Decorations: stars, clouds, sparkles, hexagons
  return (
    <>
      {/* Star */}
      <svg
        ref={el => (decoRefs.current[0] = el)}
        className="absolute top-10 left-8 w-10 h-10 text-yellow-200 opacity-80 drop-shadow-lg"
        fill="none"
        viewBox="0 0 40 40"
      >
        <polygon
          points="20,3 24,15 37,15 26,23 30,36 20,28 10,36 14,23 3,15 16,15"
          fill="currentColor"
        />
      </svg>
      {/* Cloud */}
      <svg
        ref={el => (decoRefs.current[1] = el)}
        className="absolute bottom-16 left-1/4 w-24 h-12 text-blue-100 opacity-70"
        viewBox="0 0 64 32"
        fill="none"
      >
        <ellipse cx="20" cy="20" rx="20" ry="12" fill="currentColor" />
        <ellipse cx="44" cy="16" rx="16" ry="10" fill="currentColor" />
      </svg>
      {/* Sparkle */}
      <svg
        ref={el => (decoRefs.current[2] = el)}
        className="absolute top-24 right-16 w-8 h-8 text-fuchsia-200 opacity-80"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z"
          fill="currentColor"
        />
      </svg>
      {/* Hexagon Outline */}
      <svg
        ref={el => (decoRefs.current[3] = el)}
        className="absolute bottom-10 right-10 w-16 h-16 text-purple-200 opacity-30"
        fill="none"
        viewBox="0 0 48 48"
      >
        <polygon
          points="24,4 44,14 44,34 24,44 4,34 4,14"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      {/* Small Star */}
      <svg
        ref={el => (decoRefs.current[4] = el)}
        className="absolute top-1/2 left-4 w-6 h-6 text-yellow-100 opacity-60"
        fill="none"
        viewBox="0 0 24 24"
      >
        <polygon
          points="12,2 13,8 20,8 14,12 16,20 12,15 8,20 10,12 4,8 11,8"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

// --- Main Page Component ---
const OurNotesPage = () => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Handles card click: show transition, then navigate
  const handleCardClick = subject => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      navigate(subject.route);
    }, 480); // slightly longer than overlay transition for smoothness
  };

  return (
    <>
      <TransitionOverlay show={showTransition} />
      <div
        ref={containerRef}
        className="
          relative min-h-screen w-full
          flex flex-col items-center
          overflow-x-hidden
          bg-gradient-to-br from-blue-50 via-fuchsia-50 to-yellow-50
          pb-24
        "
        style={{
          // fallback for browsers without Tailwind
          background:
            "linear-gradient(120deg, #e0e7ff 0%, #fdf6fb 60%, #fef9c3 100%)",
        }}
      >
        {/* NavBar added here */}
        <div className="w-full">
          <NavBar />
        </div>
        {/* Background Decorations */}
        <BackgroundDecorations />

        {/* Content */}
        <main className="relative z-10 w-full flex flex-col items-center px-4 pt-20 md:pt-28">
          <SectionHeader />
          <NotesGrid onCardClick={handleCardClick} />
        </main>
        {/* Footer added at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default OurNotesPage;