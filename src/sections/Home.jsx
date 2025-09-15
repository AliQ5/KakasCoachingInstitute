import React, { useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import Landing from "../components/Landing";
import Courses from "./Courses";
import Reviews from "./Reviews";
import Enroll from "./Enroll";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const landingRef = useRef(null);
  const coursesRef = useRef(null);
  const reviewsRef = useRef(null);
  const lenisRef = useRef(null);
  const enrollRef = useRef(null);
  const footerRef = useRef(null);

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

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Set initial background color and z-index
    const container = containerRef.current;
    const landing = landingRef.current;
    const courses = coursesRef.current;

    gsap.set(container, { backgroundColor: "#F8FAFC" }); // var(--color-bg-main)
    gsap.set(landing, { zIndex: 2, position: "relative" });
    gsap.set(courses, { zIndex: 1, position: "relative" });

    // Animate background color as we scroll from Landing to Courses
    ScrollTrigger.create({
      trigger: courses,
      start: "top center",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // Blend from var(--color-bg-main) to var(--color-bg-accent)
        const progress = self.progress;
        const from = "#F8FAFC"; // var(--color-bg-main)
        const to = "#E2E8F0"; // var(--color-bg-accent)
        // Simple blend
        const blend = (a, b, t) => {
          const ah = parseInt(a.slice(1), 16);
          const bh = parseInt(b.slice(1), 16);
          const ar = (ah >> 16) & 0xff,
            ag = (ah >> 8) & 0xff,
            ab = ah & 0xff;
          const br = (bh >> 16) & 0xff,
            bg = (bh >> 8) & 0xff,
            bb = bh & 0xff;
          const r = Math.round(ar + (br - ar) * t);
          const g = Math.round(ag + (bg - ag) * t);
          const b_ = Math.round(ab + (bb - ab) * t);
          return `rgb(${r},${g},${b_})`;
        };
        gsap.to(container, {
          backgroundColor: blend(from, to, progress),
          duration: 0.1,
          overwrite: "auto",
        });
      },
    });

    // Example: Add a fade-in effect for the Courses section when it enters viewport
    gsap.fromTo(
      courses,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: courses,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
          once: true,
        },
      }
    );

    // Example: Add a parallax effect to the Reviews section
    if (reviewsRef.current) {
      gsap.to(reviewsRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Clean up
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        transition: "background-color 0.4s",
        overflow: "hidden", // Prevent native scrollbars
      }}
      id="lenis-root"
    >
      <NavBar />
      <div ref={landingRef} id="home">
        <Landing />
      </div>
      <div ref={coursesRef} id="courses">
        <Courses />
      </div>
      <div ref={reviewsRef} id="reviews">
        <Reviews />
      </div>

      <div ref={enrollRef} id="enroll">
       <Enroll />
      </div>

      <div ref={footerRef} id="footer">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
