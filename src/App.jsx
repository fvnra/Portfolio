import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from("#hero [data-reveal]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray("main section:not(#hero)").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, appRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={appRef}>
      <Navbar />
      <main>
        <div className="bg-paper">
          <Hero />
        </div>

        <div className="bg-dark relative noise overflow-hidden">
          <About />
        </div>

        <div className="bg-paper">
          <Skills />
        </div>

        <div className="bg-dark relative noise overflow-hidden">
          <Projects />
        </div>

        <div className="bg-paper">
          <Experience />
        </div>

        <div
          style={{
            background:
              "linear-gradient(180deg, #f7f5f0 0%, #e1edf0 50%, #f7f5f0 100%)",
          }}
        >
          <Contact />
        </div>
      </main>

      <div className="bg-dark">
        <Footer />
      </div>
    </div>
  );
}
