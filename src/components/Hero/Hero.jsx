export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-start px-4 md:px-6 pb-12 md:pb-16 pt-28 md:min-h-screen md:justify-end md:pt-32 max-w-container mx-auto overflow-hidden"
    >
      {/* Subtle radial glow behind content */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "50vw",
            height: "50vw",
            maxWidth: 600,
            maxHeight: 600,
            background:
              "radial-gradient(ellipse, rgba(37,109,133,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Top meta row */}
      <div
        data-reveal
        className="flex flex-wrap items-center justify-between gap-3 mb-8 text-ink-3 border-b border-border pb-6"
      >
        <span className="font-mono text-label uppercase tracking-widest min-w-0">
          Frontend Engineer — Sukoharjo, ID
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-label uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to Work
          </span>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-0 mb-8 md:mb-12">
        <div data-reveal className="overflow-hidden">
          <h1 className="font-grotesk text-display text-ink leading-none">
            Favian
          </h1>
        </div>
        <div
          data-reveal
          className="overflow-hidden flex items-baseline gap-3 sm:gap-4 md:gap-8"
        >
          <h1
            className="font-grotesk text-display leading-none"
            style={{ WebkitTextStroke: "2px #292a25", color: "transparent" }}
          >
            Rizqi
          </h1>
          <p className="hidden lg:block font-mono text-label text-ink-3 uppercase tracking-widest mb-2 max-w-[180px] leading-relaxed">
            Building interfaces people love
          </p>
        </div>
        <div data-reveal className="flex flex-wrap items-center gap-3 mt-6">
          <div className="h-px flex-1 max-w-[96px] bg-accent" />
          <div className="flex flex-wrap gap-1.5">
            {["React", "Javascript", "Next.js"].map((t) => (
              <span
                key={t}
                className="font-mono text-label text-ink-3 border border-border px-2 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bio + CTAs */}
      <div
        data-reveal
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
      >
        <p className="text-ink-2 leading-[1.8] max-w-sm text-[15px]">
          Saya adalah seorang lulusan S1 Teknik informatika yang masih belajar
          mendalami pemrograman baik dalam web maupun app, dengan penyesuaian
          code yang rapi dan bersih, serta masih belajar tentang automatisasi AI
          ataupun belajar tentang AI
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:justify-end items-stretch sm:items-center">
          <a
            href="#projects"
            className="px-5 py-2.5 text-sm font-medium bg-ink text-paper rounded-lg
              hover:bg-ink/80 transition-all duration-150 active:scale-95"
          >
            View work
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-sm font-medium border border-border text-ink-2
              rounded-lg hover:border-ink/30 hover:text-ink hover:bg-paper-2 transition-all duration-150"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-30">
        <div className="w-4 h-7 rounded-full border border-ink-3 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-ink-3 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Rotating badge */}
      <div className="fixed bottom-8 right-8 hidden lg:flex items-center justify-center">
        <div className="relative w-20 h-20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-spin-slow"
          >
            <defs>
              <path
                id="circle"
                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text fontSize="11.5" fill="#85847d" letterSpacing="3.5">
              <textPath href="#circle">AVAILABLE FOR WORK · 2026 · </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
