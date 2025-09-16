import React from 'react'
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--color-bg-main)]">
      {/* Header Section */}
      <motion.header
        className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 pt-12 pb-8 flex-shrink-0"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.1 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-secondary)] leading-tight text-center"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.2 }}
        >
          Learning Made Fun,<br className="hidden sm:inline" /> Inspiring & Transformative
        </motion.h1>
        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.35 }}
        >
          From Montessori to O - Levels, Islamic (Quran, Tajweed, Nazra).
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.5 }}
        >
          <a
            href="#enroll"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow transition-colors text-base sm:text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <i className="ri-rocket-2-fill text-xl"></i>
            Enroll Now
          </a>
          <a
            href="/Notes"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-[var(--color-primary)] bg-white border border-[var(--color-primary)] hover:bg-[var(--color-bg-accent)] shadow transition-colors text-base sm:text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <i className="ri-book-open-fill text-xl"></i>
            Explore Courses
          </a>
          <a
            href="/Glimpse"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover,#a855f7)] shadow transition-colors text-base sm:text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <i className="ri-eye-2-fill text-xl"></i>
            What's Inside
          </a>
        </motion.div>
      </motion.header>
      {/* Display Section */}
      <motion.section
        className="w-full flex-1 flex items-center justify-center px-4 sm:px-8 md:px-16 pb-12"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.25 }}
      >
        <img
          src="/logo.png"
          alt="Landing"
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl rounded-2xl shadow-lg object-cover"
          style={{ background: "var(--color-bg-light)" }}
        />
      </motion.section>
    </div>
  )
}

export default Landing