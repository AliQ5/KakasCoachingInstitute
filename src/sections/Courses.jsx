import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

// --- 3D Study Elements (Kid-friendly, bright, non-interrupting) ---

// ... (3D elements unchanged for brevity)

function Book3D(props) { /* ... */ }
function Pencil3D(props) { /* ... */ }
function Cap3D(props) { /* ... */ }
function Apple3D(props) { /* ... */ }

function LevitatingStudyElements() { /* ... */ }

// --- End 3D Elements ---

const AbstractHexBg = () => { /* ... */ };

// --- DETAILED, HUMOROUS COURSE DATA ---
const courses = [
  {
    key: "Fun_Learn",
    title: "Fun Learn",
    img: "/courses/Fun_Learn.png",
    info: (
      <>
        <span style={{ color: "#FFD600", fontWeight: "bold" }}>Fun Learn</span> at <span style={{ color: "#FF4081", fontWeight: "bold" }}>Kaka's Coaching Institute</span>! Where learning is so fun, you’ll forget you’re actually learning. <br />
        <span style={{ color: "#40C4FF", fontWeight: "bold" }}>Highlights:</span>
        <ul style={{ textAlign: "left", margin: "0.5em 0 0 1.2em", color: "#4CAF50", fontWeight: 500 }}>
          <li><b>Interactive Games</b> that make even math feel like a party 🎉</li>
          <li><b>Creative Projects</b> (glitter glue not included... or is it?)</li>
          <li><b>Friendly Competitions</b> – win, lose, or giggle!</li>
        </ul>
        <span style={{ color: "#FF4081", fontWeight: "bold" }}>Warning:</span> May cause sudden bursts of giggles, “Aha!” moments, and a mysterious craving for more homework.
      </>
    ),
    details: [
      { label: "Ages", value: "5-12" },
      { label: "Duration", value: "1 hour / session" },
      { label: "Schedule", value: "Weekdays & Weekends" },
      { label: "Bonus", value: "Surprise stickers for every milestone!" }
    ]
  },
  {
    key: "Home_Tution",
    title: "Home Tuition",
    img: "/courses/Home_Tution.png",
    info: (
      <>
        <span style={{ color: "#40C4FF", fontWeight: "bold" }}>Home Tuition</span> by <span style={{ color: "#FFD600", fontWeight: "bold" }}>Kaka's Coaching Institute</span>! We bring the classroom to your living room (pajamas allowed). <br />
        <span style={{ color: "#FFD600", fontWeight: "bold" }}>Features:</span>
        <ul style={{ textAlign: "left", margin: "0.5em 0 0 1.2em", color: "#4CAF50", fontWeight: 500 }}>
          <li><b>Personalized Lessons</b> – just you, your books, and maybe your cat.</li>
          <li><b>Flexible Timings</b> (because Netflix can wait... sometimes)</li>
          <li><b>Expert Tutors</b> who can explain algebra and why you should eat your veggies.</li>
        </ul>
        <span style={{ color: "#FF4081", fontWeight: "bold" }}>Bonus:</span> No shoes required. Pajamas encouraged. Learning guaranteed!
      </>
    ),
    details: [
      { label: "Grades", value: "1-12" },
      { label: "Subjects", value: "All major boards" },
      { label: "Timings", value: "Customizable" },
      { label: "Perk", value: "Your couch, your rules!" }
    ]
  },
  {
    key: "Expert_Guaidannce",
    title: "Expert Guidance",
    img: "/courses/Expert_Guaidannce.png",
    info: (
      <>
        <span style={{ color: "#FFD600", fontWeight: "bold" }}>Kaka's Coaching Institute</span> brings you <span style={{ color: "#7C4DFF", fontWeight: "bold" }}>Expert Guidance</span>! Our teachers are so smart, even Google asks them for help.<br />
        <span style={{ color: "#40C4FF", fontWeight: "bold" }}>What you get:</span>
        <ul style={{ textAlign: "left", margin: "0.5em 0 0 1.2em", color: "#4CAF50", fontWeight: 500 }}>
          <li><b>Doubt Solving</b> – no question too silly, no answer too boring.</li>
          <li><b>Exam Strategies</b> – because “winging it” is not a strategy.</li>
          <li><b>Motivation Boosts</b> – pep talks included, pom-poms optional.</li>
        </ul>
        <span style={{ color: "#FF4081", fontWeight: "bold" }}>Result:</span> Ace your studies, impress your goldfish, and maybe even your parents!
      </>
    ),
    details: [
      { label: "For", value: "All students" },
      { label: "Focus", value: "Board/Competitive Exams" },
      { label: "Support", value: "1:1 & Group" },
      { label: "Secret Sauce", value: "Unlimited encouragement!" }
    ]
  },
  {
    key: "Quran_Studies",
    title: "Quran Studies",
    img: "/courses/Quran_Studies.png",
    info: (
      <>
        <span style={{ color: "#FFD600", fontWeight: "bold" }}>Quran Studies</span> with <span style={{ color: "#FF4081", fontWeight: "bold" }}>Kaka's Coaching Institute</span>! Learn, recite, and shine bright.<br />
        <span style={{ color: "#40C4FF", fontWeight: "bold" }}>Includes:</span>
        <ul style={{ textAlign: "left", margin: "0.5em 0 0 1.2em", color: "#4CAF50", fontWeight: 500 }}>
          <li><b>Recitation</b> – melodious, accurate, and maybe even Grammy-worthy.</li>
          <li><b>Understanding</b> – stories, morals, and wisdom (lamps may get jealous).</li>
          <li><b>Memorization</b> – with tips, tricks, and gentle reminders.</li>
        </ul>
        <span style={{ color: "#FFD600", fontWeight: "bold" }}>Bonus:</span> Enlightenment, peace, and a glow brighter than your nightlight.
      </>
    ),
    details: [
      { label: "Ages", value: "All ages" },
      { label: "Levels", value: "Beginner to Advanced" },
      { label: "Sessions", value: "Online & Offline" },
      { label: "Perk", value: "Spiritual sparkle included!" }
    ]
  },
];

const hexGrid = [
  [null, 0, null],
  [1, null, 2],
  [null, 3, null],
];

const hexVariants = {
  initial: { scale: 0.85, opacity: 0, y: 40 },
  animate: (i) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      delay: 0.15 + i * 0.13,
    },
  }),
  fadeIn: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }
  },
  fadeOut: {
    opacity: 0,
    y: 40,
    scale: 0.85,
    transition: { duration: 0.5 }
  }
};

const imgVariants = {
  rest: { scale: 1, rotate: 0, filter: "brightness(1)", boxShadow: "0 8px 32px 0 rgba(255,214,0,0.10), 0 2px 8px 0 rgba(255,64,129,0.08)" },
  hover: {
    scale: 1.18,
    rotate: -6,
    filter: "brightness(1.12) drop-shadow(0 0 24px #FFD600)",
    boxShadow: "0 12px 48px 0 rgba(255,214,0,0.18), 0 4px 16px 0 rgba(64,196,255,0.13)",
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
  tap: {
    scale: 0.97,
    rotate: 2,
    filter: "brightness(1.05)",
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

// --- GSAP + FRAMER-MOTION ZOOM FADE MODAL ---
const modalVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: 80,
    filter: "blur(8px)",
    transition: { duration: 0.35, ease: [0.4, 0.2, 0.2, 1] }
  }
};

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: options.threshold || 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.threshold]);
  return inView;
}

// --- CourseHex: On click, open modal with GSAP/Framer transition ---
function CourseHex({ course, idx, isMobile, onClick }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { threshold: 0.18 });

  // Make images bigger and closer
  const imgSize = isMobile ? 180 : 280;
  const hexWidth = isMobile ? 260 : 380;
  const hexHeight = isMobile ? 220 : 320;

  // Brighter, playful hexagon background
  const playfulHexBg = {
    width: hexWidth,
    height: isMobile ? 180 : 260,
    clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
    background: "linear-gradient(135deg, #FFD600 60%, #40C4FF 100%)",
    border: isMobile ? "3px solid #FF4081" : "5px solid #FFD600",
    boxShadow: "0 8px 32px 0 rgba(255,214,0,0.13), 0 2px 8px 0 rgba(64,196,255,0.10)",
    zIndex: 1,
    transition: "border 0.3s",
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex items-center justify-center relative"
      style={{
        minWidth: isMobile ? 0 : hexWidth,
        minHeight: isMobile ? 0 : hexHeight,
        zIndex: 2,
        margin: isMobile ? "0" : "-32px 0",
      }}
      variants={hexVariants}
      initial="fadeOut"
      animate={inView ? "fadeIn" : "fadeOut"}
      transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
    >
      <motion.div
        className="group cursor-pointer flex flex-col items-center outline-none focus:ring-2 focus:ring-[#FFD600]"
        tabIndex={0}
        onClick={() => onClick(course)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") onClick(course);
        }}
        style={{
          outline: "none",
          width: hexWidth,
          minHeight: hexHeight,
          position: "relative",
        }}
        aria-label={`Open details for ${course.title}`}
      >
        {/* Hexagon background */}
        <motion.div
          className="absolute"
          style={playfulHexBg}
          whileHover={{
            borderColor: "#40C4FF",
            boxShadow: "0 16px 64px 0 rgba(64,196,255,0.13), 0 4px 16px 0 rgba(255,214,0,0.13)",
            transition: { duration: 0.3 },
          }}
        />
        {/* Animated Image */}
        <motion.img
          src={course.img}
          alt={course.title}
          className="object-contain z-10 select-none"
          style={{
            width: imgSize,
            height: imgSize,
            userSelect: "none",
            background: "none",
            border: "none",
            borderRadius: 0,
            position: "relative",
            marginTop: isMobile ? 20 : 30,
            marginBottom: isMobile ? 0 : 10,
            transition: "box-shadow 0.3s",
          }}
          draggable={false}
          variants={imgVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          animate="rest"
        />
        {/* Title */}
        <motion.div
          className="mt-6 text-2xl sm:text-3xl font-extrabold text-center drop-shadow"
          style={{
            color: "#FF4081",
            letterSpacing: "0.01em",
            zIndex: 2,
            textShadow: "0 2px 8px #FFD600",
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive, var(--font-heading)",
          }}
        >
          {course.title}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// --- MODAL COMPONENT with GSAP/Framer/LENIS ---
function CourseModal({ open, course, onClose, isMobile }) {
  const modalRef = useRef(null);

  // GSAP zoom/fade in/out
  useEffect(() => {
    if (open && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.7, opacity: 0, y: 80, filter: "blur(8px)" },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out"
        }
      );
      // Smooth scroll to modal
      const lenis = new Lenis();
      setTimeout(() => {
        lenis.scrollTo(modalRef.current, { offset: -80, duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
      }, 120);
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !course) return null;

  // Responsive modal width
  const modalWidth = isMobile ? "95vw" : "480px";
  const modalMaxWidth = isMobile ? "98vw" : "540px";
  const modalPadding = isMobile ? "1.2rem" : "2.2rem";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.22 } }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
        style={{ pointerEvents: "auto" }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="relative flex flex-col items-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: modalWidth,
            maxWidth: modalMaxWidth,
            background: "linear-gradient(135deg, #FFFDE7 60%, #B2FF59 100%)",
            borderRadius: "2.2rem",
            boxShadow: "0 12px 48px 0 rgba(255,214,0,0.18), 0 4px 16px 0 rgba(64,196,255,0.13)",
            border: "4px solid #FFD600",
            padding: modalPadding,
            zIndex: 200,
            cursor: "auto",
            position: "relative",
            overflow: "visible"
          }}
          onClick={e => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: "#FF4081",
              cursor: "pointer",
              zIndex: 10,
              fontWeight: 700,
              lineHeight: 1,
              filter: "drop-shadow(0 2px 8px #FFD600)",
              transition: "color 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.color = "#FFD600")}
            onMouseOut={e => (e.currentTarget.style.color = "#FF4081")}
          >
            ×
          </button>
          {/* Image */}
          <img
            src={course.img}
            alt={course.title}
            style={{
              width: isMobile ? 120 : 180,
              height: isMobile ? 120 : 180,
              objectFit: "contain",
              marginBottom: isMobile ? 12 : 18,
              marginTop: isMobile ? 0 : 8,
              borderRadius: "1.2rem",
              boxShadow: "0 4px 24px #FFD60044",
              background: "white"
            }}
            draggable={false}
          />
          {/* Title */}
          <div
            className="text-2xl sm:text-3xl font-extrabold text-center"
            style={{
              color: "#FF4081",
              letterSpacing: "0.01em",
              textShadow: "0 2px 8px #FFD600",
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive, var(--font-heading)",
              marginBottom: isMobile ? 10 : 16,
              marginTop: 0
            }}
          >
            <span className="bg-gradient-to-r from-[#FFD600] via-[#40C4FF] to-[#FF4081] bg-clip-text text-transparent drop-shadow-lg">
              {course.title}
            </span>
          </div>
          {/* Info */}
          <div
            style={{
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive, var(--font-body)",
              color: "#4CAF50",
              fontWeight: 500,
              fontSize: isMobile ? "1.08rem" : "1.18rem",
              textAlign: "center",
              marginBottom: isMobile ? 10 : 18,
              lineHeight: 1.7,
              maxWidth: "100%",
              wordBreak: "break-word"
            }}
          >
            {course.info}
          </div>
          {/* Details Table */}
          <div
            style={{
              width: "100%",
              margin: "0.5em 0 0 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <table style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 0.5em",
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive, var(--font-body)",
              fontSize: isMobile ? "1.01rem" : "1.12rem",
              color: "#7C4DFF",
              background: "none"
            }}>
              <tbody>
                {course.details && course.details.map((row, i) => (
                  <tr key={i}>
                    <td style={{
                      fontWeight: 700,
                      color: "#FFD600",
                      paddingRight: "1em",
                      textAlign: "right",
                      whiteSpace: "nowrap"
                    }}>{row.label}:</td>
                    <td style={{
                      color: "#4CAF50",
                      fontWeight: 500,
                      textAlign: "left"
                    }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const Courses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { /* nothing to cleanup for Lenis here */ };
  }, []);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 350);
  };

  return (
    <section className="w-full min-h-screen bg-[#FFFDE7] flex flex-col items-center py-12 px-2 sm:px-0 relative overflow-hidden">
      <AbstractHexBg />
      {/* Levitating 3D study elements (now arranged on corners with some gap) */}
      <LevitatingStudyElements />
      {/* Abstract, animated, modern heading */}
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-16 tracking-tight relative z-10"
        style={{
          color: "#FF4081",
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive, var(--font-heading)",
          letterSpacing: "0.01em",
          textShadow: "0 4px 24px #FFD600",
        }}
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.4, 0.2, 0.2, 1] }}
      >
        <span className="bg-gradient-to-r from-[#FFD600] via-[#40C4FF] to-[#FF4081] bg-clip-text text-transparent drop-shadow-lg">
          Our Courses & Offerings
        </span>
      </motion.h2>

      {/* Hexagon Pattern Grid */}
      <div
        className="w-full flex flex-col items-center justify-center relative z-10"
        style={{ minHeight: "600px" }}
      >
        {/* Desktop/Tablet Hex Pattern */}
        <div className="hidden sm:grid grid-rows-3 grid-cols-3 gap-y-8 gap-x-8 relative">
          {hexGrid.map((row, rowIdx) =>
            row.map((courseIdx, colIdx) => {
              if (courseIdx === null) {
                return <div key={`empty-${rowIdx}-${colIdx}`} />;
              }
              const course = courses[courseIdx];
              // Index for animation stagger
              const idx = rowIdx * 3 + colIdx;
              return (
                <div
                  key={course.key}
                  style={{
                    gridRow: rowIdx + 1,
                    gridColumn: colIdx + 1,
                  }}
                  className="flex items-center justify-center relative"
                >
                  <CourseHex course={course} idx={idx} isMobile={false} onClick={handleOpenModal} />
                </div>
              );
            })
          )}
        </div>
        {/* Mobile: Stack vertically, spaced out */}
        <div className="flex flex-col sm:hidden w-full items-center mt-4 gap-10 relative z-10">
          {courses.map((course, idx) => (
            <CourseHex key={course.key + "-mobile"} course={course} idx={idx} isMobile={true} onClick={handleOpenModal} />
          ))}
        </div>
      </div>
      {/* Modal */}
      <CourseModal open={modalOpen} course={selectedCourse} onClose={handleCloseModal} isMobile={isMobile} />
      {/* Playful floating sparkles for extra kid magic */}
      <SparkleLayer />
    </section>
  );
};

// Playful sparkle layer for extra kid magic (brighter, more fun)
function SparkleLayer() {
  const sparkleCount = 14;
  const sparkleColors = [
    "#FFD600", "#FF4081", "#40C4FF", "#00E676", "#FF1744", "#7C4DFF", "#B388FF"
  ];
  const sparkles = Array.from({ length: sparkleCount });
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${8 + (i * 7) % 85}%`,
            top: `${6 + (i * 13) % 88}%`,
            width: 14 + (i % 3) * 8,
            height: 14 + (i % 2) * 8,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${sparkleColors[i % sparkleColors.length]} 70%, transparent 100%)`,
            opacity: 0.22 + (i % 4) * 0.09,
            filter: "blur(0.5px)",
            zIndex: 0,
          }}
          animate={{
            y: [0, -22 - (i % 3) * 10, 0],
            opacity: [0.22, 0.38, 0.22],
          }}
          transition={{
            duration: 2.8 + (i % 3) * 1.1,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.19,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default Courses;