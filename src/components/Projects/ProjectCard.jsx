export default function ProjectCard({ project, featured = false }) {
  return (
    <article
      className={`group relative flex flex-col rounded-3xl overflow-hidden border border-outline-variant/30
        hover:border-primary/20 transition-all duration-500 hover:-translate-y-2
        hover:shadow-[0_24px_48px_-12px_rgba(37,109,133,0.2)] bg-surface-container-lowest
        ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden bg-surface-container ${featured ? "h-64" : "h-48"}`}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Category + number floating */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span
            className="font-mono text-xs bg-surface/90 backdrop-blur-sm
            text-on-surface px-2.5 py-1 rounded-full border border-outline-variant/30"
          >
            {project.category}
          </span>
          <span
            className="font-mono text-xs bg-primary/90 backdrop-blur-sm
            text-on-primary px-2.5 py-1 rounded-full"
          >
            #{String(project.id).padStart(2, "0")}
          </span>
        </div>

        {/* Hover action overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3
          opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
        >
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-on-primary text-primary
              text-sm font-medium shadow-lg hover:bg-primary-50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              open_in_new
            </span>
            Demo
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm
              text-white border border-white/30 text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-base">code</span>
            Code
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-grotesk font-semibold text-on-surface text-lg group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span
            className="material-symbols-outlined text-outline-variant group-hover:text-primary
            transition-all duration-300 group-hover:rotate-45 text-xl shrink-0"
          >
            arrow_outward
          </span>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-lg
                bg-primary/8 text-primary border border-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
