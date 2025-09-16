import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import logo from "/logo.png";
import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";



// --- Premium, Playful, and Professional Palette for Kids ---
const PALETTE = {
  primary: "#FFB800",         // Gold
  primary_hover: "#E6A700",
  accent: "#FF5E5B",          // Coral Red
  accent2: "#3EC6E0",         // Sky Blue
  accent3: "#7ED957",         // Green
  accent4: "#A259FF",         // Purple
  dark: "#232946",            // Deep Navy
  light: "#F4F6FB",           // Off White
  white: "#FFFFFF",
  border: "#E0E6ED",
};

const EMAILJS_SERVICE_ID = "service_f28d11u";
const EMAILJS_TEMPLATE_ID = "template_u8fvpph";
const EMAILJS_PUBLIC_KEY = "UkMD8VM6ToAAvb2Jf";

const fields = [
  {
    id: "child_name",
    label: "Child's Full Name",
    type: "text",
    placeholder: "For e.g: Ali",
    required: true,
  },
  {
    id: "guardian_name",
    label: "Guardian's Name",
    type: "text",
    placeholder: "For e.g: Ahmed",
    required: true,
  },
  {
    id: "contact_no",
    label: "Contact Number",
    type: "tel",
    placeholder: "+92 300 1234567",
    required: true,
  },
  {
    id: "email",
    label: "Email (optional)",
    type: "email",
    placeholder: "guardian@example.com",
    required: false,
  },
  {
    id: "message",
    label: "Message (optional)",
    type: "textarea",
    placeholder: "Any allergies, concerns, or just say hi 👋",
    required: false,
  },
];

// --- Confetti Burst Animation (Premium, Colorful) ---
function ConfettiBurst() {
  const confettiColors = [
    PALETTE.primary,
    PALETTE.accent,
    PALETTE.accent2,
    PALETTE.accent3,
    PALETTE.accent4,
  ];
  const confettiCount = 22;
  const confetti = Array.from({ length: confettiCount });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            scale: 1.3,
            x: 160 * Math.cos((i / confettiCount) * 2 * Math.PI),
            y: 160 * Math.sin((i / confettiCount) * 2 * Math.PI) - 40,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1.2,
            delay: 0.1 + i * 0.025,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            width: 18 + (i % 2) * 6,
            height: 18 + (i % 3) * 4,
            borderRadius: "50%",
            background: confettiColors[i % confettiColors.length],
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            border: "2px solid #fff",
          }}
        />
      ))}
    </div>
  );
}

// --- Main Announcements Component ---
const Announcements = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}),
  });

  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const primaryBtnRef = useRef(null);

  // GSAP bounce + ripple on hover for primary CTA
  const handlePrimaryHover = () => {
    if (primaryBtnRef.current) {
      gsap.to(primaryBtnRef.current, {
        y: -6,
        scale: 1.06,
        duration: 0.16,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(primaryBtnRef.current, { y: 0, scale: 1, duration: 0.16 });
        },
      });
      // Ripple effect
      const btn = primaryBtnRef.current;
      const ripple = document.createElement("span");
      ripple.className =
        "absolute left-1/2 top-1/2 pointer-events-none rounded-full bg-white/40";
      ripple.style.width = ripple.style.height = "110px";
      ripple.style.transform = "translate(-50%, -50%) scale(0)";
      ripple.style.opacity = "0.7";
      ripple.style.transition = "transform 0.5s, opacity 0.5s";
      btn.appendChild(ripple);
      setTimeout(() => {
        ripple.style.transform = "translate(-50%, -50%) scale(1.2)";
        ripple.style.opacity = "0";
      }, 10);
      setTimeout(() => {
        if (btn.contains(ripple)) btn.removeChild(ripple);
      }, 500);
    }
  };

  // GSAP glow on input focus
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.classList.contains("gsap-glow")) {
        gsap.to(e.target, {
          boxShadow: `0 0 0 4px ${PALETTE.accent2}55, 0 2px 8px ${PALETTE.primary}33`,
          borderColor: PALETTE.accent2,
          duration: 0.22,
        });
      }
    };
    const handleBlur = (e) => {
      if (e.target.classList.contains("gsap-glow")) {
        gsap.to(e.target, {
          boxShadow: "0 1px 4px 0 rgba(31,38,135,0.08)",
          borderColor: PALETTE.border,
          duration: 0.22,
        });
      }
    };
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  // EmailJS submit handler
  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        data,
        EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      reset();
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  // Save for Later: just clear form and show a toast (could be improved)
  const handleSaveForLater = (e) => {
    e.preventDefault();
    reset();
    setErrorMsg("Form saved locally (not really, just cleared for demo!)");
    setTimeout(() => setErrorMsg(""), 2000);
  };

  // --- UI ---
  return (
    <>
      <NavBar />
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center py-8 px-2 font-inter"
        style={{
          background: `linear-gradient(135deg, ${PALETTE.light} 0%, ${PALETTE.accent2} 100%)`,
        }}
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row gap-10 items-stretch">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:w-1/2 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-2 md:px-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Kaka's Coaching Institute Logo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-xl bg-white border-4 border-white"
                draggable={false}
              />
              <span className="text-3xl md:text-4xl font-extrabold font-poppins text-[var(--primary)]" style={{ color: PALETTE.primary }}>
                Kaka's Coaching
              </span>
            </div>
            <h1
              className="font-poppins font-extrabold text-3xl md:text-5xl mb-3 leading-tight"
              style={{
                color: PALETTE.dark,
                textShadow: `0 2px 0 ${PALETTE.primary}33, 0 4px 12px ${PALETTE.accent2}22`,
              }}
            >
              Premium Toddler Home-Schooling Intake
            </h1>
            <p className="font-inter text-lg md:text-xl text-[#232946] mb-6 max-w-lg">
              <span className="font-bold" style={{ color: PALETTE.accent }}>
                Unlock your child's potential
              </span>
              <span className="ml-1">with a playful, safe, and world-class learning environment. <span className="inline-block animate-bounce">🎒</span></span>
            </p>
            <ul className="flex flex-wrap gap-3 mb-6">
              <li className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow text-sm font-semibold text-[#232946] border border-[#E0E6ED]">
                <span className="text-lg" style={{ color: PALETTE.accent3 }}>🧩</span> Play-based Learning
              </li>
              <li className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow text-sm font-semibold text-[#232946] border border-[#E0E6ED]">
                <span className="text-lg" style={{ color: PALETTE.accent2 }}>🌈</span> Safe & Inclusive
              </li>
              <li className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow text-sm font-semibold text-[#232946] border border-[#E0E6ED]">
                <span className="text-lg" style={{ color: PALETTE.accent4 }}>👨‍👩‍👧‍👦</span> Family Friendly
              </li>
              <li className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow text-sm font-semibold text-[#232946] border border-[#E0E6ED]">
                <span className="text-lg" style={{ color: PALETTE.primary }}>⭐</span> Premium Care
              </li>
            </ul>
            <div className="mt-auto text-xs text-[#232946] opacity-80 pt-6">
              <span className="inline-flex items-center gap-1">
                <span className="text-[1.1em]" style={{ color: PALETTE.accent2 }}>🔒</span>
                Secure
              </span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-[1.1em]" style={{ color: PALETTE.accent3 }}>🧑‍💻</span>
                GDPR-friendly
              </span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-[1.1em]" style={{ color: PALETTE.accent }}>🍪</span>
                No cookie monsters
              </span>
            </div>
          </motion.div>
          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative md:w-1/2 w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-5 md:p-10 flex flex-col gap-6 border border-[#E0E6ED]"
          >
            <AnimatePresence>
              {success && (
                <>
                  <ConfettiBurst />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 40 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="text-5xl mb-2">🎉</div>
                    <div className="font-poppins font-bold text-2xl md:text-3xl text-center" style={{ color: PALETTE.accent2 }}>
                      Thank you!<br />We’ll contact you within 48 hours 🚀
                    </div>
                    <button
                      type="button"
                      className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#FFB800] via-[#3EC6E0] to-[#A259FF] text-white font-bold shadow-lg hover:from-[#E6A700] hover:to-[#7ED957] transition"
                      onClick={() => setSuccess(false)}
                    >
                      Submit another response
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            {!success && (
              <>
                <div className="flex flex-col gap-4">
                  {fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-1">
                      <label
                        htmlFor={field.id}
                        className="font-poppins font-semibold text-base md:text-lg"
                        style={{ color: PALETTE.dark }}
                      >
                        {field.label}
                        {field.required && (
                          <span className="ml-1" style={{ color: PALETTE.primary }}>
                            *
                          </span>
                        )}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.id}
                          {...register(field.id, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          placeholder={field.placeholder}
                          rows={3}
                          className={`rounded-2xl px-4 py-3 bg-[#F4F6FB] border border-[#E0E6ED] focus:outline-none focus:ring-2 focus:ring-[${PALETTE.accent2}] transition-all duration-200 font-inter text-[#232946] resize-none shadow-sm gsap-glow ${
                            errors[field.id] ? "border-red-400" : ""
                          }`}
                        />
                      ) : (
                        <input
                          id={field.id}
                          type={field.type}
                          {...register(field.id, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                            pattern:
                              field.type === "email"
                                ? {
                                    value:
                                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/,
                                    message: "Invalid email address",
                                  }
                                : field.type === "tel"
                                ? {
                                    value: /^\+?\d[\d\s\-]{7,}$/,
                                    message: "Invalid phone number",
                                  }
                                : undefined,
                          })}
                          placeholder={field.placeholder}
                          className={`rounded-2xl px-4 py-3 bg-[#F4F6FB] border border-[#E0E6ED] focus:outline-none focus:ring-2 focus:ring-[${PALETTE.accent2}] transition-all duration-200 font-inter text-[#232946] shadow-sm gsap-glow ${
                            errors[field.id] ? "border-red-400" : ""
                          }`}
                        />
                      )}
                      {errors[field.id] && (
                        <span className="text-xs text-red-600 font-medium">
                          {errors[field.id].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {errorMsg && (
                  <div className="text-sm text-red-600 font-medium mt-2">{errorMsg}</div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                  <button
                    ref={primaryBtnRef}
                    type="submit"
                    className="relative overflow-hidden bg-gradient-to-r from-[#FFB800] via-[#3EC6E0] to-[#A259FF] text-white rounded-full px-8 py-3 font-bold hover:from-[#E6A700] hover:to-[#7ED957] transition focus:outline-none focus:ring-2 focus:ring-[#3EC6E0] shadow-lg"
                    onMouseEnter={handlePrimaryHover}
                    disabled={isSubmitting}
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Apply Now — Reserve Spot"}
                  </button>
                  <button
                    type="button"
                    className="border-2 border-[#3EC6E0] text-[#3EC6E0] rounded-full px-8 py-3 hover:bg-[#3EC6E0] hover:text-white transition font-inter font-semibold shadow"
                    onClick={handleSaveForLater}
                    disabled={isSubmitting}
                  >
                    Save for Later
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcements;