"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { Download, ExternalLink, Award } from "lucide-react"
export function About({ data }: { data?: any }) {
  const { title, paragraphs } = data?.about || {}
  const resumeUrl = data?.hero?.resumeUrl

  return (
    <Section id="about" title={title} subtitle="My mission is to build digital products that are as functional as they are beautiful.">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center md:text-left"
        >
          <div className="space-y-8">
            {paragraphs?.map((para: any, i: number) => (
              <p key={i} className={`text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium ${i === 0 ? "first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]" : ""}`}>
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-12">
            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                <Download size={20} />
                Download Resume
              </a>
            )}
            <a href="#certificates" className="flex items-center gap-2 glass px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all border border-white/10">
              <Award size={20} />
              Certifications
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
