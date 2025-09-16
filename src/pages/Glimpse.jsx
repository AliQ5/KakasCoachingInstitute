import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Lenis from '@studio-freight/lenis'
import {
  FaVideo, FaImages, FaStar, FaPlayCircle, FaTimes, FaChevronLeft, FaChevronRight, FaFlag, FaAward
} from 'react-icons/fa'
import NavBar from '../components/NavBar'
import Footer from '../sections/Footer'

// --- Professional Color Palette ---
const palette = [
  "#1E293B", // dark blue
  "#00C9FF", // cyan
  "#FDB913", // gold
  "#C471ED", // purple
  "#FF5F6D", // coral
  "#F5F7FA"  // light gray
]

// --- Utility: Random Color from Palette ---
const randomColor = () => palette[Math.floor(Math.random() * palette.length)]

// --- Demo Media Data (Now with mixed gallery for each) ---
const mediaData = [
  {
    id: 1,
    label: 'Independence Day',
    icon: <FaFlag />,
    alt: '14th August Highlights',
    gallery: [
      { type: 'video', src: '/media/independence/1.mp4', poster: '/media/independence/main.png', alt: '14th August Video' },
      ...Array.from({ length: 2 }, (_, i) => ({
        type: 'image',
        src: `/media/independence/${i + 1}.jpeg`,
        alt: `14th August Highlights ${i + 1}`
      })),
      // { type: 'video', src: '/media/sciencefair/clip2.mp4', poster: '/media/sciencefair/clip2-thumb.jpg', alt: 'Science Fair Clip 2' },
    ]
  },
  {
    id: 2,
    label: 'Latest Trends',
    icon: <FaFlag />,
    alt: 'Latest Trends Highlights',
    gallery: [
      { type: 'video', src: '/media/trends/1.mp4', poster: '/media/trends/main.png', alt: '14th August Video' },
      ...Array.from({ length: 8 }, (_, i) => ({
        type: 'image',
        src: `/media/trends/${i + 1}.jpeg`,
        alt: `14th August Highlights ${i + 1}`
      })),
      // { type: 'video', src: '/media/sciencefair/clip2.mp4', poster: '/media/sciencefair/clip2-thumb.jpg', alt: 'Science Fair Clip 2' },
    ]
  },
]

const highlightActivities = [
  { icon: <FaStar />, label: 'Olympiads' },
  { icon: <FaStar />, label: 'Workshops' },
  { icon: <FaStar />, label: 'Trends' },
  { icon: <FaStar />, label: 'Science Fairs' },
  { icon: <FaStar />, label: 'Events' },
  { icon: <FaStar />, label: 'Awards' },
]

// --- Papery Blobs Component ---
let paper
if (typeof window !== "undefined") {
  paper = window.paper
}
const PaperyBlobs = ({ count = 3, width = 400, height = 400, zIndex = 0 }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !paper) return
    paper.setup(ref.current)
    paper.project.clear()
    const paths = []
    for (let i = 0; i < count; i++) {
      const path = new paper.Path.Circle({
        center: [
          Math.random() * width,
          Math.random() * height
        ],
        radius: 80 + Math.random() * 60,
        fillColor: randomColor() + '33',
        opacity: 0.35,
        blendMode: 'multiply'
      })
      path.smooth()
      path.data = { base: path.segments.map(s => s.point.clone()) }
      paths.push(path)
    }
    paper.view.onFrame = (event) => {
      paths.forEach((path) => {
        path.segments.forEach((segment, idx) => {
          const base = path.data.base[idx]
          segment.point.x = base.x + Math.sin(event.time * 0.7 + idx) * 12
          segment.point.y = base.y + Math.cos(event.time * 0.5 + idx) * 12
        })
      })
    }
    return () => {
      paper.project.clear()
      paper.view.onFrame = null
    }
  }, [count, width, height])
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
        filter: 'blur(2px)'
      }}
      aria-hidden="true"
    />
  )
}

// --- Gallery Modal with Carousel (supports images and videos) ---
const GalleryModal = ({ open, onClose, gallery, label }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = gallery?.length || 0

  useEffect(() => {
    setIndex(0)
  }, [gallery])

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotate: dir > 0 ? 12 : -12,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotate: dir < 0 ? 12 : -12,
      transition: { duration: 0.35 }
    })
  }

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line
  }, [open, index, gallery])

  const next = () => {
    setDirection(1)
    setIndex(i => (i + 1) % total)
  }
  const prev = () => {
    setDirection(-1)
    setIndex(i => (i - 1 + total) % total)
  }

  const current = gallery && gallery[index]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl mx-auto bg-gradient-to-br from-[#1E293B] via-[#00C9FF] to-[#C471ED] rounded-3xl shadow-2xl p-0 md:p-8 overflow-hidden flex flex-col items-center"
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92 }}
            onClick={e => e.stopPropagation()}
            style={{
              minHeight: 480,
              boxShadow: '0 0 64px 16px #C471ED55, 0 0 128px 32px #00C9FF33'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/80 rounded-full p-3 text-2xl shadow-lg transition"
              aria-label="Close gallery"
              type="button"
              style={{
                boxShadow: '0 0 16px 4px #FDB91355'
              }}
            >
              <FaTimes />
            </button>
            {/* Carousel */}
            <div className="w-full flex-1 flex flex-col items-center justify-center px-2 md:px-8 py-8">
              <div className="relative w-full flex items-center justify-center">
                {/* Prev Button */}
                <button
                  onClick={e => { e.stopPropagation(); prev() }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-[#FDB913] text-[#1E293B] hover:text-white rounded-full p-3 text-2xl shadow-lg transition"
                  aria-label="Previous media"
                  type="button"
                  style={{
                    boxShadow: '0 0 16px 4px #00C9FF55'
                  }}
                >
                  <FaChevronLeft />
                </button>
                {/* Media with fun transition */}
                <div className="w-full flex items-center justify-center min-h-[340px]">
                  <AnimatePresence custom={direction} initial={false}>
                    {current && current.type === 'image' ? (
                      <motion.img
                        key={current.src}
                        src={current.src}
                        alt={current.alt || `${label} - ${index + 1}`}
                        className="rounded-xl shadow-xl object-contain max-h-[60vh] w-auto mx-auto border-4 border-white/80"
                        style={{
                          background: 'linear-gradient(135deg, #FF5F6D22 0%, #00C9FF22 100%)',
                          maxWidth: '90vw',
                          boxShadow: '0 0 32px 8px #FDB91355, 0 0 64px 16px #C471ED33'
                        }}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.25}
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.x < -80 || velocity.x < -500) next()
                          else if (offset.x > 80 || velocity.x > 500) prev()
                        }}
                      />
                    ) : current && current.type === 'video' ? (
                      <motion.div
                        key={current.src}
                        className="w-full flex items-center justify-center"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30
                        }}
                        style={{ maxWidth: '90vw' }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.25}
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.x < -80 || velocity.x < -500) next()
                          else if (offset.x > 80 || velocity.x > 500) prev()
                        }}
                      >
                        <video
                          src={current.src}
                          poster={current.poster}
                          controls
                          className="rounded-xl shadow-xl object-contain max-h-[60vh] w-auto mx-auto border-4 border-white/80 bg-black"
                          style={{
                            background: 'linear-gradient(135deg, #FF5F6D22 0%, #00C9FF22 100%)',
                            maxWidth: '90vw',
                            boxShadow: '0 0 32px 8px #FDB91355, 0 0 64px 16px #C471ED33'
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                {/* Next Button */}
                <button
                  onClick={e => { e.stopPropagation(); next() }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-[#FDB913] text-[#1E293B] hover:text-white rounded-full p-3 text-2xl shadow-lg transition"
                  aria-label="Next media"
                  type="button"
                  style={{
                    boxShadow: '0 0 16px 4px #C471ED55'
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
              {/* Dots and label */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {gallery && gallery.map((item, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-[#FDB913] scale-125 shadow-lg' : 'bg-white/60'}`}
                    style={{
                      boxShadow: i === index ? '0 0 8px 2px #00C9FF88' : undefined
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-lg font-bold text-white flex items-center gap-2 drop-shadow-lg">
                <FaImages className="text-[#00C9FF]" />
                {label} <span className="text-base font-normal text-white/80">({index + 1}/{total})</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// --- Main Glimpse Component ---
const Glimpse = () => {
  // Modal state for gallery
  const [galleryModal, setGalleryModal] = useState({ open: false, gallery: [], label: '' })

  // Lenis smooth scroll with buttery settings
  useEffect(() => {
    let lenis
    if (typeof window !== "undefined") {
      lenis = new Lenis({
        smooth: true,
        lerp: 0.08,
        duration: 1.2,
        gestureOrientation: 'vertical',
        smoothTouch: true,
        touchMultiplier: 1.5,
        wheelMultiplier: 1.1,
      })
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  // GSAP/Framer Animations on mount
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const letters = heroRef.current.querySelectorAll('.hero-letter')
      gsap.fromTo(
        letters,
        { y: 80, opacity: 0, rotate: -10 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.035,
          duration: 0.9,
          ease: 'power4.out',
          delay: 0.15
        }
      )
    }
    gsap.fromTo(
      '.navbar-fade',
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.05 }
    )
    gsap.fromTo(
      '.footer-fade',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.6 }
    )
  }, [])

  useEffect(() => {
    let ScrollTrigger
    try {
      ScrollTrigger = require('gsap/ScrollTrigger').default
      gsap.registerPlugin(ScrollTrigger)
    } catch (e) {}
    if (!gsap.utils || !gsap.fromTo) return

    gsap.utils.toArray('.media-card').forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.07
        }
      )
    })

    if (highlightRef.current) {
      gsap.fromTo(
        highlightRef.current.children,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: highlightRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  useEffect(() => {
    if (galleryModal.open) {
      const handleKey = (e) => {
        if (e.key === 'Escape') setGalleryModal({ open: false, gallery: [], label: '' })
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [galleryModal.open])

  // --- Responsive font styles ---
  const headingFont = {
    fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', 'Arial', sans-serif",
    fontWeight: 800,
    letterSpacing: '0.01em',
    lineHeight: 1.1,
  }
  const bodyFont = {
    fontFamily: "'Nunito', 'Quicksand', 'Segoe UI', 'Arial', sans-serif",
    fontWeight: 400,
    letterSpacing: '0.01em',
  }

  // --- CTA Button Ripple Effect ---
  const ctaBtnRef = useRef(null)
  useEffect(() => {
    const btn = ctaBtnRef.current
    if (!btn) return
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      btn.style.setProperty('--ripple-x', `${x}px`)
      btn.style.setProperty('--ripple-y', `${y}px`)
    }
    btn.addEventListener('mousemove', handleMouseMove)
    return () => btn.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // --- Card Design: Clean, Centered, Not Hanging ---
  const renderCardPreview = (gallery) => {
    // Show only the first image or video as a clean, centered preview
    const item = gallery[0]
    if (!item) return null
    return (
      <div className="w-full h-56 flex items-center justify-center mt-6 mb-2">
        <div
          className="w-[90%] h-full rounded-xl overflow-hidden shadow-lg border-2 border-[#F5F7FA] bg-[#F5F7FA] flex items-center justify-center"
          style={{
            boxShadow: '0 4px 32px 0 #00C9FF22, 0 8px 32px 0 #C471ED11',
            borderRadius: '1.25rem',
          }}
        >
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              style={{ borderRadius: '1.25rem', width: '100%', height: '100%' }}
              draggable={false}
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-[#1E293B]">
              <img
                src={item.poster}
                alt={item.alt}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85)', borderRadius: '1.25rem' }}
                draggable={false}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'rgba(30,41,59,0.18)',
                  borderRadius: '1.25rem'
                }}
              >
                <FaPlayCircle className="text-white text-4xl drop-shadow-lg" />
              </div>
            </div>
          )}
        </div>
        {gallery.length > 1 && (
          <div
            className="absolute right-6 bottom-6 bg-[#FDB913] text-[#1E293B] px-3 py-1.5 rounded-full shadow-md text-xs font-bold flex items-center gap-2"
            style={{
              zIndex: 30,
              textShadow: '0 0 4px #FDB91344, 0 0 8px #00C9FF33'
            }}
          >
            +{gallery.length - 1} more
          </div>
        )}
      </div>
    )
  }

  // --- Render ---
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1E293B] via-[#00C9FF] to-[#C471ED] overflow-x-hidden">
      {/* Papery Blobs BG */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <PaperyBlobs count={5} width={1920} height={1080} zIndex={0} />
      </div>
      {/* NavBar */}
      <div className="navbar-fade fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      {/* Hero Title */}
      <section className="pt-36 pb-12 flex flex-col items-center justify-center relative z-10" id="main-content">
        <motion.h1
          ref={heroRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center select-none"
          style={{
            ...headingFont,
            background: 'linear-gradient(90deg, #00C9FF, #FDB913, #C471ED, #1E293B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            display: 'inline-block'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          aria-label="Glimpses of Kaka's Coaching Institute"
        >
          Glimpses of Kaka's Coaching Institute
          <span
            className="block w-full h-2 mt-2 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00C9FF, #FDB913, #C471ED)',
              boxShadow: '0 0 16px 4px #FDB91355, 0 0 32px 8px #C471ED33',
              filter: 'blur(0.5px)'
            }}
            aria-hidden="true"
          />
        </motion.h1>
        <p
          className="mt-4 text-lg md:text-xl text-slate-100/90 font-medium text-center max-w-2xl"
          style={bodyFont}
        >
          A vibrant showcase of our coaching journey, activities, and achievements.<br />
          <span className="text-base text-slate-200/80 italic">
            (Warning: May cause sudden inspiration, smiles, and a desire to join!)
          </span>
        </p>
      </section>
      {/* Media Grid */}
      <section className="relative z-10 px-2 md:px-8 max-w-7xl mx-auto">
        <div
          ref={gridRef}
          className="
            grid gap-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            mb-20
            place-items-center
          "
        >
          {mediaData.map((media, idx) => (
            <motion.div
              key={media.id}
              className="media-card relative group shadow-xl bg-white transition-all duration-400 flex flex-col items-center justify-center border border-[#E5E7EB] hover:scale-[1.035] hover:shadow-[0_0_32px_8px_#00C9FF33,0_0_64px_16px_#C471ED22] hover:border-[#00C9FF] cursor-pointer pro-card"
              tabIndex={0}
              aria-label={media.label}
              style={{
                minHeight: 300,
                outline: 'none',
                boxShadow: '0 4px 24px 0 #1E293B11, 0 0 32px 8px #00C9FF11',
                position: 'relative',
                background: '#F5F7FA',
                borderRadius: '1.5rem',
                marginTop: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => {
                setGalleryModal({
                  open: true,
                  gallery: media.gallery,
                  label: media.label
                })
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setGalleryModal({
                    open: true,
                    gallery: media.gallery,
                    label: media.label
                  })
                }
              }}
              role="button"
              aria-pressed="false"
              whileHover={{
                scale: 1.045,
                boxShadow: '0 0 48px 8px #00C9FF44, 0 0 96px 24px #C471ED22'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Papery Blobs behind card */}
              <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
                <PaperyBlobs count={2} width={400} height={320} zIndex={-1} />
              </div>
              {/* Card Top Icon */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 text-4xl text-[#00C9FF] drop-shadow-lg bg-white rounded-full p-3 border-2 border-[#FDB913] shadow"
                initial={{ y: -30, opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 + idx * 0.07, type: "spring", stiffness: 200, damping: 12 }}
                style={{
                  boxShadow: '0 0 12px 2px #FDB91333, 0 0 16px 4px #00C9FF22'
                }}
              >
                {media.icon}
              </motion.div>
              {/* Clean Media Preview */}
              {renderCardPreview(media.gallery)}
              {/* Card Label */}
              <div
                className="
                  absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2
                  rounded-full bg-gradient-to-r from-[#00C9FF] via-[#FDB913] to-[#C471ED] text-white font-extrabold
                  text-base shadow
                  flex items-center gap-2
                  backdrop-blur
                  min-w-[120px] justify-center
                  border border-white/80
                  pro-label
                "
                style={bodyFont}
              >
                <FaImages className="text-[#00C9FF]" />
                {media.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Gallery Modal */}
      <GalleryModal
        open={galleryModal.open}
        onClose={() => setGalleryModal({ open: false, gallery: [], label: '' })}
        gallery={galleryModal.gallery}
        label={galleryModal.label}
      />
      {/* Highlight Row */}
      <section className="relative z-10 mb-20">
        <motion.div
          ref={highlightRef}
          className="flex gap-8 px-4 md:px-12 overflow-x-auto no-scrollbar justify-center items-center"
          drag="x"
          dragConstraints={{ left: -200, right: 0 }}
          dragElastic={0.2}
          whileTap={{ cursor: "grabbing" }}
          style={{ cursor: 'grab' }}
        >
          {highlightActivities.map((act, idx) => (
            <motion.div
              key={act.label}
              className="
                min-w-[180px] h-32 flex flex-col items-center justify-center
                bg-gradient-to-br from-[#00C9FF] via-[#FDB913] to-[#C471ED]
                rounded-2xl shadow-lg mx-2
                text-white text-xl font-bold
                relative group
                transition-all duration-400
                hover:scale-105 focus:scale-105
                outline-none
              "
              tabIndex={0}
              whileHover={{
                scale: 1.09,
                boxShadow: '0 0 32px 8px #C471ED88'
              }}
              whileFocus={{
                scale: 1.09
              }}
              style={{
                fontFamily: headingFont.fontFamily,
                fontWeight: 700,
                textShadow: '0 0 8px #FDB91388, 0 0 16px #00C9FF55'
              }}
              aria-label={act.label}
            >
              <span className="text-3xl mb-2 neon-glow">{act.icon}</span>
              <span>{act.label}</span>
              {/* Neon Glow */}
              <span
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: '0 0 24px 8px #00C9FF55, 0 0 32px 12px #C471ED33',
                  opacity: 0.7
                }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Call to Action */}
      <section className="relative z-10 mb-24 flex justify-center items-center">
        <motion.div
          ref={ctaRef}
          className="w-full max-w-3xl rounded-3xl p-8 md:p-12 flex flex-col items-center shadow-2xl"
          style={{
            background: 'linear-gradient(90deg, #00C9FF, #FDB913, #C471ED, #1E293B)',
            boxShadow: '0 0 64px 8px #C471ED33'
          }}
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 8,
            ease: 'linear'
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white text-center mb-4"
            style={headingFont}
          >
            Ready to be a part of something amazing?
          </h2>
          <p
            className="text-lg md:text-xl text-white/90 text-center mb-8"
            style={bodyFont}
          >
            Join our activities, learn, grow, and shine with Kaka's Coaching Institute!
          </p>
          <motion.button
            ref={ctaBtnRef}
            className="
              relative px-8 py-4 rounded-full text-lg font-bold
              bg-white text-[#1E293B] shadow-lg
              overflow-hidden
              transition-all duration-300
              focus:outline-none
              cta-ripple
              flex items-center justify-center
            "
            style={{
              fontFamily: headingFont.fontFamily,
              boxShadow: '0 0 32px 8px #FDB91355'
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 48px 12px #00C9FF88'
            }}
            whileTap={{ scale: 0.97 }}
            aria-label="Join Now"
            type="button"
          >
            <span className="relative z-10">Join Now</span>
            {/* Ripple Effect */}
            <span
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), #FDB91388 0%, transparent 70%)',
                opacity: 0.5,
                transition: 'background 0.3s'
              }}
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>
      </section>
      {/* Footer */}
      <div className="footer-fade relative z-20">
        <Footer />
      </div>
      {/* Extra: Accessibility skip link */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-black px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      {/* Extra: Responsive styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .cta-ripple:after {
          content: '';
          position: absolute;
          left: var(--ripple-x, 50%);
          top: var(--ripple-y, 50%);
          width: 0;
          height: 0;
          background: radial-gradient(circle, #FDB91388 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: width 0.3s, height 0.3s;
        }
        .cta-ripple:hover:after {
          width: 200px;
          height: 200px;
        }
        @media (max-width: 1024px) {
          .media-card { min-height: 150px !important; }
        }
        @media (max-width: 640px) {
          .media-card { min-height: 90px !important; }
        }
        .pro-card {
          border-radius: 1.5rem;
          border-width: 1.5px;
          overflow: visible !important;
        }
        .pro-label {
          font-size: 1rem;
          letter-spacing: 0.01em;
        }
      `}</style>
    </div>
  )
}

export default Glimpse