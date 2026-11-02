import { useState } from "react";
import { projects } from "../../data/projects";

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("Semua");

  const categories = ["Semua", ...new Set(projects.map((p) => p.category))];
  const filtered =
    filter === "Semua"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-section px-4 md:px-6 max-w-container mx-auto"
    >
      {/* Section marker — dark */}
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <span className="font-mono text-label text-on-dark-2 uppercase tracking-widest">
          03
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <span className="font-mono text-label text-on-dark-2 uppercase tracking-widest">
          Work
        </span>
      </div>

      {/* Header + filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
        <h2 className="font-grotesk text-title text-on-dark">Selected work</h2>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="px-3 py-1.5 font-mono text-label uppercase tracking-widest rounded-md transition-all duration-150"
              style={
                filter === c
                  ? { background: "#f7f5f0", color: "#292a25" }
                  : {
                      color: "#b9cbbe",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Desktop hover preview */}
        <div
          className={`fixed right-12 top-1/2 -translate-y-1/2 w-72 h-52 rounded-2xl overflow-hidden
          pointer-events-none transition-all duration-300 z-40 shadow-2xl hidden lg:block
          ${hovered !== null ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {hovered !== null && (
            <>
              <img
                src={filtered[hovered]?.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <p className="text-white/90 text-xs leading-relaxed line-clamp-3">
                  {filtered[hovered]?.description}
                </p>
              </div>
            </>
          )}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Main row */}
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="group py-5 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4
                  items-center cursor-pointer transition-all duration-200 select-none"
                style={
                  hovered === i || expanded === i
                    ? {
                        background: "rgba(255,255,255,0.05)",
                        marginLeft: "-1rem",
                        marginRight: "-1rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        borderRadius: "0.75rem",
                      }
                    : {}
                }
              >
                <div className="hidden md:block md:col-span-1">
                  <span className="font-mono text-label text-on-dark-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-5 flex items-center gap-3">
                  <span className="md:hidden font-mono text-label text-on-dark-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-grotesk font-semibold text-base md:text-lg transition-colors duration-200"
                    style={{
                      color:
                        hovered === i || expanded === i ? "#6fa6b8" : "#f7f5f0",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Tags desktop */}
                <div className="md:col-span-3 hidden md:flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-label text-on-dark-2 px-2 py-0.5 rounded-md"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links desktop */}
                <div className="md:col-span-3 hidden md:flex gap-3 justify-end items-center">
                  {[
                    { label: "Demo", href: project.demo },
                    { label: "Code", href: project.repo },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-label text-on-dark-2 hover:text-on-dark uppercase tracking-widest
                        flex items-center gap-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {l.label}{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_outward
                      </span>
                    </a>
                  ))}
                </div>

                {/* Mobile toggle */}
                <div className="md:hidden flex items-center justify-between gap-2">
                  <div className="flex gap-1 flex-wrap">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-label text-on-dark-2 px-2 py-0.5 rounded-md"
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`text-on-dark-2 transition-transform duration-200 font-mono text-sm
                    ${expanded === i ? "rotate-180 inline-block" : ""}`}
                  >
                    ↓
                  </span>
                </div>
              </div>

              {/* Mobile accordion */}
              {expanded === i && (
                <div
                  className="md:hidden pb-5 px-1"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <p className="text-on-dark-2 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    {[
                      { label: "Demo", href: project.demo },
                      { label: "Code", href: project.repo },
                    ].map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-label text-on-dark-2 hover:text-on-dark uppercase tracking-widest
                          flex items-center gap-1 transition-colors"
                      >
                        {l.label}{" "}
                        <span className="material-symbols-outlined text-sm">
                          arrow_outward
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
