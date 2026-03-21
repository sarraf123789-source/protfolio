"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { Award, ExternalLink, Calendar } from "lucide-react"
export function Certificates({ data }: { data?: any }) {
  const certificates = data?.certificates || []

  return (
    <Section id="certificates" title="Certifications" subtitle="Professional certifications and specialized training I've completed.">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates?.map((cert: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative p-8 rounded-[2.5rem] glass border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="h-14 w-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
              <Award size={28} />
            </div>

            <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
            <p className="text-muted-foreground font-bold mb-6 flex-grow">{cert.issuer}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-border/20 mt-auto">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                <Calendar size={12} className="text-primary/50" />
                {cert.date}
              </div>
              {cert.link && cert.link !== "#" && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
