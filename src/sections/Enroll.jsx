import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots, FaCheckCircle } from "react-icons/fa";
import { gsap } from "gsap";

// 3D Card Component (with lighting) + scroll zoom/fade animation
const GlassCard = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(12px)" }}
      animate={controls}
      className="relative w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-[rgba(253,185,19,0.15)] p-8 md:p-12"
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(30,58,138,0.18), 0 1.5px 8px 0 #FDB91355, 0 0.5px 1.5px 0 #3B82F6aa",
        background:
          "linear-gradient(135deg, #fff 80%, #FDB91322 100%)",
      }}
    >
      {/* 3D Lighting effect */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-yellow-300 via-yellow-100 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none z-0" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-blue-400 via-blue-100 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const inputVariants = {
  focus: { scale: 1.03, boxShadow: "0 0 0 4px #FDB91333" },
  rest: { scale: 1, boxShadow: "0 0 0 0px transparent" },
};

const buttonVariants = {
  rest: { scale: 1, background: "linear-gradient(90deg,#FDB913,#FFD700,#FDB913)", boxShadow: "0 2px 16px 0 #FDB91355" },
  hover: { scale: 1.05, background: "linear-gradient(90deg,#FFD700,#FDB913,#FFD700)", boxShadow: "0 4px 32px 0 #FDB91399" },
  tap: {
    scale: 0.98,
    background: [
      "linear-gradient(90deg,#FDB913,#FFD700,#FDB913)",
      "linear-gradient(90deg,#3B82F6,#FDB913,#3B82F6)",
      "linear-gradient(90deg,#FDB913,#FFD700,#FDB913)",
    ],
    transition: { duration: 0.5, repeat: 1, repeatType: "reverse" },
    boxShadow: "0 0 32px 8px #FDB913cc, 0 0 64px 16px #3B82F6aa",
  },
};

const Enroll = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSent(true);
      gsap.fromTo(
        ".enroll-success",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1,0.6)" }
      );
      setTimeout(() => setSent(false), 3500);
    }
  }, [isSubmitSuccessful]);

  const onSubmit = (data) => {
    emailjs
      .send(
        "service_hudmhek",
        "template_wg79uob",
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_contact: data.user_contact,
          user_address: data.user_address,
          user_message: data.user_message,
        },
        "UkMD8VM6ToAAvb2Jf"
      )
      .then(
        () => {
          reset();
        },
        (error) => {
          alert("Something went wrong. Please try again.");
        }
      );
  };

  // Section scroll animation (zoom/fade in)
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const sectionControls = useAnimation();

  useEffect(() => {
    if (sectionInView) {
      sectionControls.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [sectionInView, sectionControls]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      animate={sectionControls}
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-[#E2E8F0] to-[#fff] py-16 px-2"
      id="enroll"
      style={{
        perspective: 1200,
        overflow: "hidden",
      }}
    >
      <GlassCard>
        <motion.h2
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
          className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-2 text-center font-heading"
        >
          Enroll Now
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-8 text-center"
        >
          Join <span className="font-bold text-[#FDB913]">Kaka's Coaching Institute</span> and ignite your learning journey!
        </motion.p>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <motion.div
              whileFocus="focus"
              whileHover="focus"
              variants={inputVariants}
              className="relative"
            >
              <label className=" text-[#1E3A8A] font-semibold mb-1 flex items-center gap-2">
                <FaUser className="text-[#FDB913]" /> Name
              </label>
              <input
                {...register("user_name", { required: "Name is required" })}
                className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#FDB913] text-gray-900 font-medium shadow-sm transition-all`}
                placeholder="Your Name"
                autoComplete="off"
              />
              {errors.user_name && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.user_name.message}</span>
              )}
            </motion.div>
            {/* Email */}
            <motion.div
              whileFocus="focus"
              whileHover="focus"
              variants={inputVariants}
              className="relative"
            >
              <label className=" text-[#1E3A8A] font-semibold mb-1 flex items-center gap-2">
                <FaEnvelope className="text-[#3B82F6]" /> Email
              </label>
              <input
                {...register("user_email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-gray-900 font-medium shadow-sm transition-all`}
                placeholder="you@email.com"
                autoComplete="off"
              />
              {errors.user_email && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.user_email.message}</span>
              )}
            </motion.div>
            {/* Contact */}
            <motion.div
              whileFocus="focus"
              whileHover="focus"
              variants={inputVariants}
              className="relative"
            >
              <label className="text-[#1E3A8A] font-semibold mb-1 flex items-center gap-2">
                <FaPhone className="text-[#60A5FA]" /> Contact
              </label>
              <input
                {...register("user_contact", {
                  required: "Contact is required",
                  minLength: { value: 7, message: "Too short" },
                })}
                className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] text-gray-900 font-medium shadow-sm transition-all`}
                placeholder="Phone Number"
                autoComplete="off"
              />
              {errors.user_contact && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.user_contact.message}</span>
              )}
            </motion.div>
            {/* Address */}
            <motion.div
              whileFocus="focus"
              whileHover="focus"
              variants={inputVariants}
              className="relative"
            >
              <label className="text-[#1E3A8A] font-semibold mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#FDB913]" /> Address
              </label>
              <input
                {...register("user_address", { required: "Address is required" })}
                className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#FDB913] text-gray-900 font-medium shadow-sm transition-all`}
                placeholder="Your Address"
                autoComplete="off"
              />
              {errors.user_address && (
                <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.user_address.message}</span>
              )}
            </motion.div>
          </div>
          {/* Message */}
          <motion.div
            whileFocus="focus"
            whileHover="focus"
            variants={inputVariants}
            className="relative"
          >
            <label className=" text-[#1E3A8A] font-semibold mb-1 flex items-center gap-2">
              <FaCommentDots className="text-[#3B82F6]" /> Message
            </label>
            <textarea
              {...register("user_message", { required: "Message is required" })}
              className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-gray-900 font-medium shadow-sm transition-all resize-none min-h-[90px]`}
              placeholder="Tell us about your learning goals..."
              autoComplete="off"
            />
            {errors.user_message && (
              <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.user_message.message}</span>
            )}
          </motion.div>
          {/* Submit Button */}
          <motion.div className="flex justify-center pt-2">
            <motion.button
              type="submit"
              className="relative px-8 py-3 rounded-full font-bold text-lg text-white shadow-lg bg-gradient-to-r from-[#FDB913] via-[#FFD700] to-[#FDB913] hover:from-[#FFD700] hover:to-[#FDB913] focus:outline-none focus:ring-4 focus:ring-[#FDB91355] transition-all overflow-hidden"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              style={{
                letterSpacing: "0.04em",
                boxShadow: "0 2px 16px 0 #FDB91355",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Send</span>
                <FaCheckCircle className="text-white drop-shadow" />
              </span>
              {/* Cool animated "energy" effect */}
              <motion.span
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0], scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, #FFD70088 0%, #FDB91300 80%)",
                  filter: "blur(8px)",
                  zIndex: 1,
                }}
              />
            </motion.button>
          </motion.div>
        </form>
        {/* Success Animation */}
        <AnimatePresence>
          {sent && (
            <motion.div
              className="enroll-success fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center border-2 border-[#FDB913]">
                <FaCheckCircle className="text-[#FDB913] text-5xl mb-2 drop-shadow-lg animate-bounce" />
                <span className="text-xl font-bold text-[#1E3A8A]">Thank you for enrolling!</span>
                <span className="text-[#374151] text-sm mt-1">We&apos;ll get in touch soon.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
      {/* 3D floating shapes for extra flair */}
      <motion.div
        className="hidden md:block absolute left-8 top-8 z-0"
        initial={{ y: -60, rotate: 0, scale: 0.7, opacity: 0 }}
        whileInView={{ y: [0, 20, 0], rotate: [0, 360], scale: [0.7, 1, 0.7], opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          filter: "drop-shadow(0 8px 32px #FDB91388)",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDB913" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <ellipse cx="32" cy="32" rx="28" ry="16" fill="url(#grad1)" />
        </svg>
      </motion.div>
      <motion.div
        className="hidden md:block absolute right-8 bottom-8 z-0"
        initial={{ y: 60, rotate: 0, scale: 0.7, opacity: 0 }}
        whileInView={{ y: [0, -20, 0], rotate: [0, -360], scale: [0.7, 1, 0.7], opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          filter: "drop-shadow(0 8px 32px #3B82F688)",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <defs>
            <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="20" fill="url(#grad2)" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default Enroll;

/*
Install these libraries:
npm install react-hook-form emailjs-com framer-motion gsap react-icons
# (Lenis is already in your project, Tailwind is assumed to be set up)
*/