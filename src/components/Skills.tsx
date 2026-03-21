"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { Layers, Database, Terminal, Sparkles, Globe, ArrowUpRight, CheckCircle2, Server, Lock, Palette, Lightbulb, FileText, ShoppingCart, Home } from "lucide-react"
export function Skills({ data }: { data?: any }) {
  const technicalSkills = data?.technicalSkills || []
  const softSkills = data?.softSkills || []

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend": return <Layers size={24} />
      case "backend": return <Server size={24} />
      case "styling & ui": return <Palette size={24} />
      case "database": return <Database size={24} />
      case "authentication": return <Lock size={24} />
      case "tools & platforms": return <Terminal size={24} />
      case "concepts": return <Lightbulb size={24} />
      case "documentation": return <FileText size={24} />
      default: return <CheckCircle2 size={24} />
    }
  }

  return (
    <Section id="skills" title="Professional Expertise" subtitle="A multi-disciplinary blend of technical mastery and essential soft skills.">
      <div className="space-y-24">
        {/* Technical Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalSkills.map((category: any, idx: number) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative flex flex-col p-8 rounded-[2rem] glass border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="h-14 w-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                {getIcon(category.category)}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-4">{category.category}</h3>
              <ul className="space-y-3">
                {category.items.map((skill: any) => (
                  <li key={skill} className="flex items-center gap-2 text-muted-foreground font-bold text-xs tracking-tight group-hover:text-foreground transition-colors">
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="glass p-10 rounded-[3rem] border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/50 rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Soft Skills</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {softSkills.map((skill: any, idx: number) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-4 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center border border-border/50 group-hover:border-primary/50 group-hover:text-primary transition-all shadow-xl">
                    <Sparkles size={18} className="opacity-40 group-hover:opacity-100" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center group-hover:text-foreground transition-colors">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
