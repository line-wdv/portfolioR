"use client";

import { useState } from "react";
import Intro from "@/components/intro/Intro";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Journey from "@/components/journey/Journey";
import TechStack from "@/components/stack/TechStack";
import Projects from "@/components/projects/Projects";
import Certificates from "@/components/certificates/Certificates";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />
      <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Journey />
          <TechStack />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
