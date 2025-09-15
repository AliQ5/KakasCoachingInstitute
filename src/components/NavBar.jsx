import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

// --- Transition Overlay Component ---
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

const NAV_LINKS = [
  { label: "Home", type: "scroll", target: "home" },
  { label: "Courses & Offerings", type: "scroll", target: "courses" },
  { label: "Our Notes", type: "route", target: "/Notes" },
  { label: "Reviews", type: "scroll", target: "reviews" },
  { label: "Contact", type: "scroll", target: "enroll" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // For mobile menu open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  // For transition overlay
  const [showTransition, setShowTransition] = useState(false);
  const transitionTimeout = useRef(null);

  // Expose state to rest of nav (for legacy code in mobile menu)
  NavBar._mobileOpen = mobileOpen;
  NavBar._setMobileOpen = setMobileOpen;

  // Helper for handling nav link clicks
  const handleNavClick = (link) => (e) => {
    if (link.type === "scroll") {
      e.preventDefault();
      // If not on home page, navigate to home and scroll after navigation
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: link.target } });
        setMobileOpen(false);
      } else {
        // Already on home, scroll directly
        if (link.target === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToSection(link.target);
        }
        setMobileOpen(false);
      }
    } else if (link.type === "route") {
      e.preventDefault();
      setMobileOpen(false);
      // Play transition overlay, then navigate
      setShowTransition(true);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        navigate(link.target);
        setShowTransition(false);
      }, 420); // Duration matches overlay animation
    }
  };

  // Listen for navigation to home with scrollTo state
  React.useEffect(() => {
    if (
      location.pathname === "/" &&
      location.state &&
      location.state.scrollTo
    ) {
      const sectionId = location.state.scrollTo;
      // Use a timeout to ensure the section is rendered
      setTimeout(() => {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToSection(sectionId);
        }
      }, 100);
      // Clean up scrollTo state so it doesn't scroll again on re-render
      window.history.replaceState(
        { ...window.history.state, usr: { ...location.state, scrollTo: undefined } },
        ""
      );
    }
    // eslint-disable-next-line
  }, [location.pathname, location.state]);

  // Cleanup transition timeout on unmount
  React.useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  return (
    <div>
      <TransitionOverlay show={showTransition} />
      <nav
        className="sticky top-4 z-50 mx-auto w-[98%] sm:w-[90%] md:w-[85%] bg-[var(--color-bg-light)] rounded-full shadow-md border border-[var(--color-border)] flex items-center justify-between py-2 px-3 sm:py-3 sm:px-6"
        style={{
          fontFamily: "var(--font-body)",
        }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <motion.img
            src="/logo.png"
            alt="Kaka's Coaching Institute"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
          />
          <motion.span
            className="text-lg sm:text-xl font-bold"
            style={{
              color: "var(--color-secondary)",
              fontFamily: "var(--font-heading)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            Kaka's Coaching Institute
          </motion.span>
        </motion.div>
        {/* Hamburger Menu for Mobile */}
        <motion.div
          className="flex sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-secondary)] hover:text-[var(--color-primary)] focus:outline-none"
            aria-label="Open main menu"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen((open) => !open)}
            animate={{ backgroundColor: mobileOpen ? "rgba(253,185,19,0.08)" : "rgba(0,0,0,0)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              initial={false}
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </motion.svg>
          </motion.button>
        </motion.div>
        {/* Nav Links - Desktop */}
        <motion.ul
          className="hidden sm:flex items-center gap-4 md:gap-8 text-[var(--color-text-main)] text-base font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          {NAV_LINKS.map((link, idx) => (
            <motion.li
              key={link.label}
              whileHover={{ scale: 1.08, color: "var(--color-primary)" }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <a
                href={
                  link.type === "route"
                    ? link.target
                    : link.label === "Home"
                    ? "#"
                    : `#${link.target}`
                }
                className="hover:text-[var(--color-primary)] transition-colors"
                onClick={handleNavClick(link)}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
        {/* Enroll Now Button - Desktop */}
        <motion.a
          href="#"
          className="hidden sm:inline-block ml-4 md:ml-6 px-4 md:px-5 py-2 rounded-lg font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow text-sm md:text-base"
          style={{
            fontFamily: "var(--font-heading)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06, boxShadow: "0 4px 24px 0 rgba(253,185,19,0.18)" }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.5 }}
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== "/") {
              navigate("/", { state: { scrollTo: "enroll" } });
            } else {
              scrollToSection("enroll");
            }
          }}
        >
          Enroll Now
        </motion.a>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              className="sm:hidden absolute top-full left-0 w-full bg-[var(--color-bg-light)] border-t border-[var(--color-border)] shadow-md rounded-b-xl px-4 py-3"
              initial={{ opacity: 0, y: -30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ zIndex: 100 }}
            >
              <motion.ul
                className="flex flex-col gap-3 text-[var(--color-text-main)] text-base font-medium"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                }}
              >
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <a
                      href={
                        link.type === "route"
                          ? link.target
                          : link.label === "Home"
                          ? "#"
                          : `#${link.target}`
                      }
                      className="block w-full py-1 hover:text-[var(--color-primary)] transition-colors"
                      onClick={handleNavClick(link)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 10 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                >
                  <a
                    href="#"
                    className="block w-full mt-2 px-4 py-2 rounded-full font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow text-center "
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname !== "/") {
                        navigate("/", { state: { scrollTo: "enroll" } });
                        setMobileOpen(false);
                      } else {
                        scrollToSection("enroll");
                        setMobileOpen(false);
                      }
                    }}
                  >
                    Enroll Now
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default NavBar;
