"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { Briefcase } from "lucide-react"
import content from "@/lib/data.json"

export function Experience() {
  const experiences = content.experience

  return (
    <Section id="experience" title="Professional Journey" subtitle="My professional experience and growth in the tech industry.">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {experiences?.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 border-l-2 border-primary/20 hover:border-primary/50 transition-colors py-4"
            >
              {/* Timeline Dot */}
              <div className="absolute top-6 -left-[9px] h-4 w-4 rounded-full bg-background border-2 border-primary" />

              <div className="glass p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Briefcase size={20} className="text-primary" />
                      {exp.role}
                    </h3>
                    <p className="text-primary font-bold mt-1">{exp.company}</p>
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-4">
                  {exp.responsibilities?.map((task, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
