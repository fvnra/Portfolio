const facts = [{ n: "4+", label: "Years of experience" }];

export default function About() {
  return (
    <section
      id="about"
      className="py-section px-4 md:px-6 max-w-container mx-auto"
    >
      {/* Section marker — dark version */}
      <div className="flex items-center gap-4 mb-10 md:mb-16">
        <span className="font-mono text-label text-on-dark-2 uppercase tracking-widest">
          01
        </span>
        <div className="flex-1 h-px bg-dark-border" />
        <span className="font-mono text-label text-on-dark-2 uppercase tracking-widest">
          About
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left — stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div
            className="grid grid-cols-1 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {facts.map((f, i) => (
              <div
                key={f.label}
                className="p-4 md:p-6 flex flex-col justify-between min-h-[110px] md:min-h-[130px]"
                style={{
                  background:
                    i === 0
                      ? "rgba(37,109,133,0.18)"
                      : "rgba(255,255,255,0.04)",
                }}
              >
                <span className="font-grotesk font-bold text-3xl md:text-4xl text-on-dark">
                  {f.n}
                </span>
                <span className="font-mono text-label text-on-dark-2 uppercase tracking-widest leading-tight mt-2">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text */}
        <div className="lg:col-span-8 flex flex-col gap-8 justify-start">
          <h2 className="font-grotesk text-title text-on-dark">
            Saya percaya kode yang baik
            <br className="hidden md:block" /> adalah bentuk tulisan yang baik.
          </h2>

          <div className="space-y-4 text-on-dark-2 leading-[1.8] text-[15px]">
            <p>
              Saya mulai tertarik dengan pemrograman sejak usia 19 tahun,
              diawali dengan mempelajari HTML dan CSS. Setelah itu, saya
              melanjutkan pendidikan di Universitas Duta Bangsa (UDB), Program
              Studi Teknik Informatika.
            </p>
            <p>
              Selama empat tahun, saya memiliki pengalaman bekerja di luar
              bidang pemrograman. Dalam dua tahun terakhir, saya kembali
              mendalami dunia pemrograman melalui perkuliahan dan berbagai
              project pribadi. Saat ini, saya terus mengembangkan kemampuan dan
              terbuka untuk mempelajari teknologi baru.
            </p>
          </div>

          {/* Quote */}
          <blockquote
            className="pl-4 text-on-dark-2 text-sm italic leading-relaxed"
            style={{ borderLeft: "2px solid rgba(37,109,133,0.7)" }}
          >
            "Make it work, make it right, make it fast." — Kent Beck
          </blockquote>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/cv.pdf"
              download
              className="px-5 py-2.5 text-sm font-medium text-dark rounded-lg
                flex items-center gap-2 transition-all duration-150 active:scale-95"
              style={{ background: "#f7f5f0" }}
            >
              <span className="material-symbols-outlined text-base">
                download
              </span>
              Download CV
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#f7f5f0",
              }}
            >
              Say hello
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
