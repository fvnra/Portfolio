import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [expanded, setExpanded] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const islandRef = useRef();
  const menuRef = useRef();

  // Detect scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Animate island expand/collapse
  useEffect(() => {
    if (!menuRef.current) return;
    if (expanded) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -8, scaleY: 0.8, transformOrigin: "top center" },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.35, ease: "back.out(1.4)" },
      );
    }
  }, [expanded]);

  // Island pill animation on hover
  const handleMouseEnter = (label) => {
    setHovered(label);
    gsap.to(islandRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () => {
    setHovered(null);
    gsap.to(islandRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      {/* ── Dynamic Island pill ── */}
      <div
        ref={islandRef}
        className="pointer-events-auto w-full max-w-[calc(100vw-2rem)] md:max-w-2xl"
        style={{
          willChange: "transform",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
        }}
      >
        {/* Main pill */}
        <div
          className="relative flex w-full items-center justify-between gap-2 px-2 py-2 sm:px-3 rounded-2xl md:rounded-[22px] transition-all duration-300"
          style={{
            background: scrolled ? "rgba(8,8,12,0.98)" : "rgba(8,8,12,0.94)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 14px 35px rgba(0,0,0,0.22)",
          }}
        >
          {/* Logo dot */}
          <a
            href="#hero"
            className="flex shrink-0 items-center gap-2 px-2 py-1.5 rounded-xl
              hover:bg-white/5 transition-colors duration-150 group"
            onMouseEnter={() => handleMouseEnter("logo")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-grotesk font-bold text-white text-sm tracking-tight">
              Favian <span className="text-accent/80">Portfolio</span>
            </span>
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* Desktop nav links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5 mx-2">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => handleMouseEnter(l.label)}
                  onMouseLeave={handleMouseLeave}
                  className="relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                    background: isActive
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                  }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-accent" />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* CTA */}
          <a
            href="#contact"
            onMouseEnter={() => handleMouseEnter("contact")}
            onMouseLeave={handleMouseLeave}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200 active:scale-95 ml-1"
            style={{
              background: hovered === "contact" ? "#e5e5e5" : "#ffffff",
              color: "#08080c",
            }}
          >
            Contact
            <span className="text-xs opacity-60">↗</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Close menu" : "Open menu"}
            aria-expanded={expanded}
            aria-controls="mobile-navigation"
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full
              text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 ml-1"
          >
            <div className="flex flex-col gap-[5px] w-4">
              <span
                className={`block h-px bg-current rounded-full transition-all duration-300
                ${expanded ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-px bg-current rounded-full transition-all duration-300
                ${expanded ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px bg-current rounded-full transition-all duration-300
                ${expanded ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* ── Mobile dropdown — expands from island ── */}
        {expanded && (
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(18,18,24,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div className="p-3 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setExpanded(false)}
                  className="px-4 py-2.5 rounded-xl text-sm transition-colors duration-150"
                  style={{
                    color:
                      active === l.href ? "#ffffff" : "rgba(255,255,255,0.5)",
                    background:
                      active === l.href
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <div className="h-px bg-white/5 my-1" />
              <a
                href="#contact"
                onClick={() => setExpanded(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-white text-center"
                style={{ background: "rgba(37,109,133,0.85)" }}
              >
                Contact ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
