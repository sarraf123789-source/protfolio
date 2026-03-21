"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/content?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to fetch content:", err));
  }, []);

  if (!content) return <div className="min-h-screen bg-background flex items-center justify-center font-black text-2xl animate-pulse">Loading Your Portfolio...</div>;

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero data={content} />
      <About data={content} />
      <Skills data={content} />
      <Experience data={content} />
      <Education data={content} />
      <Certificates data={content} />
      <Projects data={content} />
      <Contact data={content} />
      <Footer data={content} />
    </main>
  );
}
