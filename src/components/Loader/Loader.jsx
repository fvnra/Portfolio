import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import LoaderScene from "./LoaderScene";

export default function Loader({ onReveal }) {
  const sceneRef = useRef();
  const wrapRef = useRef();
  const hudRef = useRef();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const steps = [12, 28, 45, 60, 75, 88, 100];
      let i = 0;
      const tick = () => {
        if (i < steps.length) {
          setPct(steps[i++]);
          setTimeout(tick, 180 + Math.random() * 220);
        } else {
          setTimeout(triggerExit, 400);
        }
      };
      tick();
    }, 2100);
    return () => clearTimeout(t);
  }, []);

  const triggerExit = () => {
    // HUD fade out
    gsap.to(hudRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.45,
      ease: "power2.in",
    });

    // Zoom kamera — setelah HUD mulai fade
    setTimeout(() => {
      sceneRef.current?.startZoom(afterZoom);
    }, 200);
  };

  const afterZoom = () => {
    // Panggil onReveal dulu — App mulai mount & animate main content
    onReveal?.();

    // Loader fade out BERSAMAAN dengan main content fade in
    // Sedikit delay supaya main content sempat di-set initial state dulu
    gsap.to(wrapRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      delay: 0.05,
    });
  };

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 9999, background: "#292a25" }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Suspense fallback={null}>
          <LoaderScene ref={sceneRef} />
        </Suspense>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, #292a25 100%)",
        }}
      />

      {/* HUD */}
      <div
        ref={hudRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-3 pb-12">
          <p
            className="font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Portfolio — 2026
          </p>
          <div className="flex flex-col items-center gap-2 w-36">
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #256d85, #b9cbbe)",
                }}
              />
            </div>
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              {String(pct).padStart(3, "0")}%
            </span>
          </div>
        </div>

        <span
          className="absolute top-8 left-8 font-mono text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          Frontend Engineer
        </span>
        <span
          className="absolute top-8 right-8 font-mono text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          Jakarta ◦ ID
        </span>
      </div>
    </div>
  );
}
