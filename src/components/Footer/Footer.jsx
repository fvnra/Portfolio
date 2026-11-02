const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-8">
      {/* Top — big CTA strip */}
      <div className="border-b border-border py-12 md:py-16 px-4 md:px-6 max-w-container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-label text-ink-3 uppercase tracking-widest mb-2">
              Currently available
            </p>
            <h3
              className="font-grotesk font-bold text-ink"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Open to new opportunities
            </h3>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 text-sm font-medium bg-ink text-paper rounded-lg
              hover:bg-ink/80 transition-all duration-150 active:scale-95 self-start md:self-center"
          >
            Let's talk →
          </a>
        </div>
      </div>

      {/* Bottom — nav + copyright */}
      <div className="py-6 px-4 md:px-6 max-w-container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-grotesk font-bold text-white tracking-tight text-sm">
              Favian Rizqi A<span className="text-accent">.</span>
            </span>
            <span className="text-border mx-2">·</span>
            <span className="font-mono text-label text-ink-3">© {year}</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-label text-ink-3 hover:text-ink uppercase tracking-widest
                  transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-4">
            {["GH", "LI", "TW"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-label text-ink-3 hover:text-ink uppercase tracking-widest
                  transition-colors duration-150"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
