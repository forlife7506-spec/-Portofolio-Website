import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/Preloader";
import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { RocketScroll } from "@/components/RocketScroll";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova — Interactive 3D Portfolio" },
      {
        name: "description",
        content:
          "Cinematic dark portfolio with interactive star field and a staggered glass project showcase.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="relative min-h-screen bg-[#0a0a0a] text-foreground">
        <StarField />
        {!loading && <RocketScroll />}
        <div
          className={`relative z-10 transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}
        >
          <Navbar />
          <main>
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <ProcessSection />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
