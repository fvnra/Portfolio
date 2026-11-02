import { useState, useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import Scene3D from "./Scene3D";

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState("loading"); // loading | reveal | exit
  const [progress, setProgress] = useState(0);
  const containerRef = useRef();
  const textRef = useRef();
  const progressRef = useRef();
  const overlayRef = useRef();

  // Simulate loading progress
  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += Math.random() * 12 + 3;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        setTimeout(() => setPhase("reveal"), 300);
      }
      setProgress(Math.min(val, 100));
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Reveal phase — animate text in
  useEffect(() => {
    if (phase !== "reveal") return;
    const tl = gsap.timeline();
    tl.to(progressRef.current, { opacity: 0, duration: 0.3 }).fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );
    // Auto-exit after 3s
    setTimeout(() => setPhase("exit"), 3200);
  }, [phase]);

  // Exit phase — curtain wipe up
  useEffect(() => {
    if (phase !== "exit") return;
    gsap.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 1.1,
      ease: "power4.inOut",
      onComplete: onDone,
    });
  }, [phase, onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#08080f" }}
    >
      {/* 3D Scene — full screen */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #08080f 100%)",
        }}
      />

      {/* Loading bar */}
      {phase === "loading" && (
        <div
          ref={progressRef}
          className="absolute bottom-16 left-0 right-0 px-16"
        >
          <div className="flex justify-between mb-2">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
              Loading
            </span>
            <span className="font-mono text-xs text-white/30">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-px bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-indigo-300 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main reveal text */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-8 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 mb-6">
          Frontend Engineer
        </p>

        {/* Big name */}
        <h1
          className="font-grotesk font-bold text-white leading-none mb-4"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Alex
          <br />
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #6fa6b8 0%, #b9cbbe 40%, #256d85 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Pratama
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-mono text-sm text-white/40 tracking-widest">
          Building things for the web
        </p>

        {/* Enter button */}
        {phase === "reveal" && (
          <button
            onClick={() => setPhase("exit")}
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full
              border border-white/20 text-white/60 text-sm font-medium
              hover:border-white/50 hover:text-white hover:bg-white/5
              transition-all duration-300 pointer-events-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Enter portfolio
            <span
              style={{
                fontFamily: "Material Symbols Outlined",
                fontSize: "18px",
                fontVariationSettings: "'FILL' 0, 'wght' 300",
              }}
            >
              arrow_forward
            </span>
          </button>
        )}
      </div>

      {/* Corner label */}
      <div className="absolute bottom-8 right-8 font-mono text-xs text-white/20 uppercase tracking-widest">
        2026
      </div>
    </div>
  );
}
