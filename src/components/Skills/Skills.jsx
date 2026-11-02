import { skills } from "../../data/skills";

export default function Skills() {
  const allSkills = Object.values(skills).flat();

  return (
    <section
      id="skills"
      className="py-section px-4 md:px-6 max-w-container mx-auto border-t border-border"
    >
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
          02
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
          Stack
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left — sticky heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-grotesk text-title text-ink">
            Technologies
            <br />I work with
          </h2>
          <p className="text-ink-3 mt-4 text-sm leading-relaxed">
            Tools dan teknologi yang saya gunakan setiap hari — dari ide ke
            production.
          </p>
          {/* Count badge */}
          <div className="mt-8 inline-flex items-center gap-2 border border-border rounded-full px-3 py-1.5">
            <span className="font-grotesk font-bold text-2xl text-ink">
              {allSkills.length}
            </span>
            <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
              Technologies
            </span>
          </div>
        </div>

        {/* Right — skill rows */}
        <div className="lg:col-span-8">
          {Object.entries(skills).map(([category, items], ci) => (
            <div
              key={category}
              className={`py-6 ${ci < Object.keys(skills).length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                <div className="sm:col-span-3 flex items-start pt-0.5">
                  <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
                    {category}
                  </span>
                </div>
                <div className="sm:col-span-9 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="group flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
                        border border-border text-ink-2 bg-paper
                        hover:bg-accent-2 hover:border-accent/20 hover:text-accent
                        transition-all duration-150 cursor-default"
                    >
                      <img
                        src={skill.icon}
                        alt=""
                        className="h-4 w-4 object-contain"
                        loading="lazy"
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        className="mt-16 overflow-hidden border-y border-border py-3 bg-paper-2"
        style={{
          marginLeft: "calc(-1 * max(1rem, (100vw - 1100px) / 2 + 1rem))",
          marginRight: "calc(-1 * max(1rem, (100vw - 1100px) / 2 + 1rem))",
        }}
      >
        <div className="flex w-max marquee">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-2 font-mono text-label text-ink-3 px-5 uppercase tracking-widest whitespace-nowrap"
            >
              <img
                src={skill.icon}
                alt=""
                className="h-3.5 w-3.5 object-contain"
                loading="lazy"
              />
              {skill.name}
              <span className="mx-4 text-border select-none">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
