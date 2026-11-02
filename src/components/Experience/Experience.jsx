import { experience } from "../../data/skills";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-section px-4 md:px-6 max-w-container mx-auto border-t border-border"
    >
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
          04
        </span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
          Experience
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left — sticky */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-grotesk text-title text-ink">
            Where I've
            <br />
            worked
          </h2>
          <p className="text-ink-3 mt-4 text-sm leading-relaxed">
            Perjalanan karir saya.
          </p>
          <div className="mt-8 flex flex-col gap-2">
            <div className="font-mono text-label text-ink-3 uppercase tracking-widest">
              Total experience
            </div>
            <div className="font-grotesk font-bold text-4xl text-ink">
              4+ yrs
            </div>
          </div>
        </div>

        {/* Right — timeline list */}
        <div className="lg:col-span-8 divide-y divide-border">
          {experience.map((item, i) => (
            <div
              key={item.id}
              className="group py-6 md:py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 md:gap-4
                hover:bg-paper-2 -mx-4 px-4 md:-mx-6 md:px-6 rounded-xl transition-colors duration-200"
            >
              {/* Period col */}
              <div className="sm:col-span-3 flex sm:flex-col gap-2 sm:gap-1">
                <span className="font-mono text-label text-ink-3 uppercase tracking-widest">
                  {item.period}
                </span>
                {item.current && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-label text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Current
                  </span>
                )}
              </div>

              {/* Content col */}
              <div className="sm:col-span-9">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="font-grotesk font-semibold text-ink text-lg leading-tight">
                    {item.title}
                  </h3>
                  {i === 0 && (
                    <span className="shrink-0 font-mono text-label border border-accent/30 text-accent bg-accent/5 px-2 py-0.5 rounded-md">
                      Latest
                    </span>
                  )}
                </div>
                <p className="font-mono text-label text-ink-3 uppercase tracking-widest mb-3">
                  {item.company}
                </p>
                <p className="text-ink-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
