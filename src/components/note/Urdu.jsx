import React, { useState } from 'react';
import NavBar from '../NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaCrown, FaFeatherAlt, FaBookOpen, FaRocket, FaStar, FaLeaf, FaChessKnight, FaGlobe, FaMagic, FaGraduationCap } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { GiRomanToga } from 'react-icons/gi';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import gsap from 'gsap';

// Responsive utility hook
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Icon set for each class (I-X)
const classIcons = [
  <FaFeatherAlt className="text-3xl sm:text-4xl md:text-5xl text-yellow-400 drop-shadow" />,      // I
  <FaBookOpen className="text-3xl sm:text-4xl md:text-5xl text-blue-400 drop-shadow" />,           // II
  <FaRocket className="text-3xl sm:text-4xl md:text-5xl text-orange-400 drop-shadow" />,           // III
  <FaStar className="text-3xl sm:text-4xl md:text-5xl text-amber-400 drop-shadow" />,              // IV
  <FaLeaf className="text-3xl sm:text-4xl md:text-5xl text-green-400 drop-shadow" />,              // V
  <FaChessKnight className="text-3xl sm:text-4xl md:text-5xl text-purple-400 drop-shadow" />,      // VI
  <FaGlobe className="text-3xl sm:text-4xl md:text-5xl text-sky-400 drop-shadow" />,               // VII
  <FaMagic className="text-3xl sm:text-4xl md:text-5xl text-pink-400 drop-shadow" />,              // VIII
  <FaCrown className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 drop-shadow" />,            // IX
  <FaGraduationCap className="text-3xl sm:text-4xl md:text-5xl text-indigo-500 drop-shadow" />,    // X
];

// Helper: Roman numerals for classes I-X
const romanNumerals = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'
];

// Now, getPaperImages expects classNum as Roman numeral string, e.g. 'I', 'II', etc.
const getPaperImages = (classNum) => {
  // For demo, all classes have 10 images
  const images = [];
  for (let i = 1; i <= 10; i++) {
    images.push(`/papers/urdu/${classNum}/${i}.jpg`);
  }
  return images;
};

// Card animation variants
const cardVariants = {
  initial: { opacity: 0, y: 60, scale: 0.9, filter: 'blur(8px)' },
  animate: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 120,
      damping: 18
    }
  }),
  hover: {
    scale: 1.07,
    boxShadow: '0 12px 36px 0 rgba(253,185,19,0.22), 0 2px 12px 0 rgba(30,58,138,0.10)',
    rotate: [0, 2, -2, 0],
    transition: { duration: 0.5, yoyo: Infinity }
  }
};

// Abstract animated background using Framer Motion
const AnimatedBackground = () => (
  <motion.div
    className="absolute inset-0 -z-10 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-yellow-400 via-blue-400 to-orange-300 rounded-full blur-3xl opacity-40"
      style={{ top: '-3rem', left: '-4rem' }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0]
      }}
      transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
    />
    <motion.div
      className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 via-yellow-200 to-orange-200 rounded-full blur-2xl opacity-30"
      style={{ bottom: '-2rem', right: '-3rem' }}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, -360, 0]
      }}
      transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
    />
  </motion.div>
);

// Animated Download Button for single file
const AnimatedDownloadButton = ({ href, filename }) => {
  const [downloading, setDownloading] = useState(false);

  // Animation for the download icon
  const downloadVariants = {
    idle: { rotate: 0, scale: 1 },
    downloading: {
      rotate: [0, 20, -20, 0],
      scale: [1, 1.2, 1],
      transition: { repeat: 2, duration: 0.7 }
    },
    done: { scale: [1, 1.3, 1], color: "#22c55e", transition: { duration: 0.5 } }
  };

  // Animation for the button background
  const buttonVariants = {
    idle: { background: "linear-gradient(90deg, #FDB913 0%, #3B82F6 100%)" },
    downloading: {
      background: [
        "linear-gradient(90deg, #FDB913 0%, #3B82F6 100%)",
        "linear-gradient(270deg, #3B82F6 0%, #FDB913 100%)",
        "linear-gradient(90deg, #FDB913 0%, #3B82F6 100%)"
      ],
      transition: { duration: 1.2, repeat: Infinity, ease: "linear" }
    },
    done: { background: "linear-gradient(90deg, #22c55e 0%, #3B82F6 100%)" }
  };

  const [state, setState] = useState("idle");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    setState("downloading");

    // Simulate download animation
    setTimeout(() => {
      // Actually trigger download
      const link = document.createElement('a');
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setState("done");
      setTimeout(() => {
        setState("idle");
        setDownloading(false);
      }, 900);
    }, 1200);
  };

  return (
    <motion.button
      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow font-semibold text-xs sm:text-base transition-all duration-200 focus:outline-none"
      style={{
        color: "#fff",
        background: "linear-gradient(90deg, #FDB913 0%, #3B82F6 100%)",
        position: "relative",
        overflow: "hidden"
      }}
      variants={buttonVariants}
      animate={state}
      whileHover={{ scale: 1.07, boxShadow: '0 0 0 4px #FDB91333, 0 2px 12px 0 #1E3A8A22' }}
      whileTap={{ scale: 0.96 }}
      onClick={handleDownload}
      disabled={downloading}
    >
      <motion.span
        variants={downloadVariants}
        animate={state}
        className="text-lg sm:text-xl"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FaDownload />
      </motion.span>
      {state === "downloading" ? (
        <span>Downloading...</span>
      ) : state === "done" ? (
        <span>Downloaded!</span>
      ) : (
        <span>Download</span>
      )}
    </motion.button>
  );
};

// Carousel for images
const PaperCarousel = ({ images, onClose }) => {
  const [idx, setIdx] = useState(0);

  // Make preview images big
  // Responsive: adjust max image height based on screen size
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  let maxImgHeight = '80vh'; // Make preview big
  if (isMobile) maxImgHeight = '60vh';
  else if (isTablet) maxImgHeight = '70vh';

  // GSAP entry animation
  React.useEffect(() => {
    gsap.fromTo(
      '.carousel-img',
      { scale: 0.8, opacity: 0, filter: 'blur(8px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out' }
    );
  }, [idx]);

  // Download all papers as zip (simulate for demo)
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [allDownloaded, setAllDownloaded] = useState(false);

  const handleDownloadAll = async () => {
    if (downloadingAll) return;
    setDownloadingAll(true);
    setAllDownloaded(false);

    // Simulate download animation
    setTimeout(() => {
      images.forEach((img) => {
        const link = document.createElement('a');
        link.href = img;
        link.download = img.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      setAllDownloaded(true);
      setTimeout(() => {
        setDownloadingAll(false);
        setAllDownloaded(false);
      }, 1200);
    }, 1200);
  };

  // Download button color/animation for "Download All"
  const allButtonVariants = {
    idle: { background: "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)" },
    downloading: {
      background: [
        "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)",
        "linear-gradient(270deg, #FDB913 0%, #3B82F6 100%)",
        "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)"
      ],
      transition: { duration: 1.2, repeat: Infinity, ease: "linear" }
    },
    done: { background: "linear-gradient(90deg, #22c55e 0%, #3B82F6 100%)" }
  };

  const allIconVariants = {
    idle: { rotate: 0, scale: 1 },
    downloading: {
      rotate: [0, 20, -20, 0],
      scale: [1, 1.2, 1],
      transition: { repeat: 2, duration: 0.7 }
    },
    done: { scale: [1, 1.3, 1], color: "#22c55e", transition: { duration: 0.5 } }
  };

  let allState = "idle";
  if (downloadingAll) allState = "downloading";
  if (allDownloaded) allState = "done";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-4 md:p-6 max-w-3xl w-[98vw] sm:w-[90vw] flex flex-col items-center"
        initial={{ scale: 0.8, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xl sm:text-2xl text-gray-500 hover:text-primary transition"
          onClick={onClose}
        >
          <MdClose />
        </button>
        <div className="relative w-full flex items-center justify-center">
          {images.length > 1 && (
            <button
              className="absolute left-0 z-10 text-2xl sm:text-3xl text-primary hover:scale-110 transition"
              onClick={() => setIdx((idx - 1 + images.length) % images.length)}
              aria-label="Previous"
            >
              <BsArrowLeftCircle />
            </button>
          )}
          <img
            src={images[idx]}
            alt={`Paper ${idx + 1}`}
            className="carousel-img rounded-lg sm:rounded-xl shadow-lg mx-auto object-contain"
            style={{
              maxHeight: maxImgHeight,
              width: '100%',
              boxShadow: '0 0 0 8px rgba(253,185,19,0.08), 0 2px 16px 0 rgba(30,58,138,0.10)'
            }}
          />
          {images.length > 1 && (
            <button
              className="absolute right-0 z-10 text-2xl sm:text-3xl text-primary hover:scale-110 transition"
              onClick={() => setIdx((idx + 1) % images.length)}
              aria-label="Next"
            >
              <BsArrowRightCircle />
            </button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-3 sm:mt-4 gap-2 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500">
            {idx + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            <AnimatedDownloadButton
              href={images[idx]}
              filename={images[idx].split('/').pop()}
            />
            <motion.button
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow font-semibold text-xs sm:text-base transition-all duration-200 focus:outline-none"
              style={{
                color: "#fff",
                background: "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)",
                position: "relative",
                overflow: "hidden"
              }}
              variants={allButtonVariants}
              animate={allState}
              whileHover={{ scale: 1.07, boxShadow: '0 0 0 4px #3B82F633, 0 2px 12px 0 #FDB91322' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDownloadAll}
              disabled={downloadingAll}
            >
              <motion.span
                variants={allIconVariants}
                animate={allState}
                className="text-lg sm:text-xl"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaDownload />
              </motion.span>
              {downloadingAll ? (
                <span>Downloading All...</span>
              ) : allDownloaded ? (
                <span>All Downloaded!</span>
              ) : (
                <span>Download All</span>
              )}
            </motion.button>
          </div>
        </div>
        {images.length > 1 && (
          <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const urdu = () => {
  // Instead of openClass as a number, we use the Roman numeral string (e.g. 'I', 'II', ...)
  const [openClass, setOpenClass] = useState(null);

  // Responsive: adjust grid columns based on screen size
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isLaptop = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let gridCols = 'grid-cols-1';
  if (isTablet) gridCols = 'grid-cols-2';
  else if (isLaptop) gridCols = 'grid-cols-3';
  else if (isDesktop) gridCols = 'grid-cols-5';

  // When a card is clicked, pass the Roman numeral string (e.g. 'I', 'II', ...)
  const handleCardClick = (roman) => {
    setOpenClass(roman);
  };

  // Download all papers for a class (Roman numeral string)
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [allDownloaded, setAllDownloaded] = useState(false);

  const handleDownloadAllPapers = (roman) => {
    if (downloadingAll) return;
    setDownloadingAll(true);
    setAllDownloaded(false);

    const images = getPaperImages(roman);

    setTimeout(() => {
      images.forEach((img) => {
        const link = document.createElement('a');
        link.href = img;
        link.download = img.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      setAllDownloaded(true);
      setTimeout(() => {
        setDownloadingAll(false);
        setAllDownloaded(false);
      }, 1200);
    }, 1200);
  };

  // Abstract animated border for card
  const CardBorder = ({ children, className }) => (
    <motion.div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl ${className}`}
      whileHover={{ boxShadow: '0 0 0 8px #FDB91355, 0 12px 36px 0 #1E3A8A22' }}
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={false}
        animate={{
          background: [
            'linear-gradient(135deg, #FDB913 0%, #1E3A8A 100%)',
            'linear-gradient(225deg, #3B82F6 0%, #FDB913 100%)',
            'linear-gradient(135deg, #FDB913 0%, #1E3A8A 100%)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.15 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  // Download All button color/animation for card
  const allButtonVariants = {
    idle: { background: "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)" },
    downloading: {
      background: [
        "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)",
        "linear-gradient(270deg, #FDB913 0%, #3B82F6 100%)",
        "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)"
      ],
      transition: { duration: 1.2, repeat: Infinity, ease: "linear" }
    },
    done: { background: "linear-gradient(90deg, #22c55e 0%, #3B82F6 100%)" }
  };

  const allIconVariants = {
    idle: { rotate: 0, scale: 1 },
    downloading: {
      rotate: [0, 20, -20, 0],
      scale: [1, 1.2, 1],
      transition: { repeat: 2, duration: 0.7 }
    },
    done: { scale: [1, 1.3, 1], color: "#22c55e", transition: { duration: 0.5 } }
  };

  let allState = "idle";
  if (downloadingAll) allState = "downloading";
  if (allDownloaded) allState = "done";

  return (
    <div className="relative min-h-screen py-6 sm:py-10 md:py-12 px-2 sm:px-4 md:px-8 bg-bg-main font-body">
      <NavBar />
      <AnimatedBackground />
      <motion.h1
        className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-secondary mb-2 sm:mb-3 text-center tracking-tight drop-shadow"
        initial={{ opacity: 0, y: -40, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.01em' }}
        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
      >
        <span className="bg-gradient-to-r from-primary via-bright-blue to-secondary bg-clip-text text-transparent flex items-center justify-center gap-2 sm:gap-3">
          <GiRomanToga className="inline-block text-amber-400 text-3xl xs:text-4xl sm:text-5xl drop-shadow" />
          Papers<span className="ml-1 sm:ml-2 text-xl sm:text-3xl align-middle">|</span>
          <span className="text-lg sm:text-2xl font-bold text-bright-blue">The Professional Edition</span>
        </span>
      </motion.h1>
      <motion.p
        className="text-base xs:text-lg sm:text-xl text-text-muted text-center mb-6 sm:mb-10 font-medium"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <span role="img" aria-label="wink">😉</span> 
        Unlock your inner exam ninja! Download, practice, and maybe even impress your teacher (or at least your pet).
      </motion.p>
      <motion.div
        className={`grid ${gridCols} gap-5 sm:gap-8 md:gap-10 max-w-full sm:max-w-4xl md:max-w-7xl mx-auto`}
        initial="initial"
        animate="animate"
      >
        {romanNumerals.map((roman, i) => (
          <motion.div
            key={roman}
            custom={i}
            variants={cardVariants}
            whileHover="hover"
            className="cursor-pointer"
            onClick={() => handleCardClick(roman)}
          >
            <CardBorder className="bg-bg-light p-4 xs:p-5 sm:p-7 flex flex-col items-center justify-center group transition-all duration-300 relative hover:scale-[1.04]">
              {/* Icon and Roman numeral */}
              <motion.div
                className="relative flex flex-col items-center justify-center mb-2 sm:mb-4"
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{
                  scale: [1, 1.09, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + i,
                  ease: "easeInOut"
                }}
              >
                <span className="mb-1">
                  {classIcons[i]}
                </span>
                {/* Animated Roman numeral */}
                <motion.span
                  className="text-3xl xs:text-4xl sm:text-5xl font-black text-primary drop-shadow-lg tracking-wider"
                  initial={{ textShadow: '0 0 0 #FDB913' }}
                  animate={{
                    textShadow: [
                      '0 0 0 #FDB913',
                      '0 0 24px #FDB91388, 0 0 8px #1E3A8A44',
                      '0 0 0 #FDB913'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.2, ease: "easeInOut" }}
                >
                  {roman}
                </motion.span>
                {/* Abstract animated shape */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-primary via-bright-blue to-secondary opacity-30 blur-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 8 + i, ease: "linear" }}
                />
              </motion.div>
              <div className="text-base sm:text-lg font-bold text-text-main mb-1 tracking-wide flex items-center gap-1 sm:gap-2">
                Class {roman}
                <span className="inline-block animate-bounce text-primary text-lg sm:text-xl">★</span>
              </div>
              <div className="text-xs sm:text-sm text-text-muted mb-2 sm:mb-4 text-center italic">
                Download exam papers for <span className="font-semibold text-secondary">
                  {
                    // Remove '/note/' and any leading/trailing slashes, then format (no S/)
                    window.location.pathname
                      .replace(/^\/?note\/?/i, '') // remove leading /note/ or note/
                      .replace(/^\//, '') // remove any leading slash
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())
                  }
                </span> - Class {roman} <br />
                <span className="text-xs text-bright-blue">Ace it, don't just pass it!</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <motion.button
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg font-semibold text-xs sm:text-base group-hover:shadow-2xl transition-all duration-200"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #FDB913 0%, #3B82F6 100%)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.07, boxShadow: '0 0 0 4px #FDB91333, 0 2px 12px 0 #1E3A8A22' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(roman);
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="text-lg sm:text-xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaDownload />
                  </motion.span>
                  View & Download
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg font-semibold text-xs sm:text-base group-hover:shadow-2xl transition-all duration-200"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #3B82F6 0%, #FDB913 100%)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  variants={allButtonVariants}
                  animate={allState}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.07, boxShadow: '0 0 0 4px #3B82F633, 0 2px 12px 0 #FDB91322' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadAllPapers(roman);
                  }}
                  disabled={downloadingAll}
                >
                  <motion.span
                    variants={allIconVariants}
                    animate={allState}
                    className="text-lg sm:text-xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaDownload />
                  </motion.span>
                  {downloadingAll ? (
                    <span>Downloading All...</span>
                  ) : allDownloaded ? (
                    <span>All Downloaded!</span>
                  ) : (
                    <span>Download All Papers</span>
                  )}
                </motion.button>
              </div>
              {/* Decorative floating badge */}
              <motion.div
                className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-primary via-bright-blue to-secondary opacity-30 blur-md"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 45, -45, 0]
                }}
                transition={{ repeat: Infinity, duration: 7 + i, ease: "linear" }}
              />
            </CardBorder>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {openClass && (
          <PaperCarousel
            images={getPaperImages(openClass)}
            onClose={() => setOpenClass(null)}
          />
        )}
      </AnimatePresence>
      {/* Ultra-modern abstract floating shapes */}
      <motion.div
        className="fixed bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-tr from-primary via-bright-blue to-secondary rounded-full blur-2xl opacity-20 pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -10, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 45, -45, 0]
        }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />
      <motion.div
        className="fixed top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-secondary via-primary to-bright-blue rounded-full blur-2xl opacity-20 pointer-events-none"
        animate={{
          x: [0, -20, 10, 0],
          y: [0, -15, 10, 0],
          scale: [1, 1.08, 1],
          rotate: [0, -30, 30, 0]
        }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      />
    </div>
  );
};

export default urdu;