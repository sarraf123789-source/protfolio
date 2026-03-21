"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import Link from "next/link"
export function Projects({ data }: { data?: any }) {
  const projects = data?.projects || []

  return (
    <Section id="projects" title="Featured Work" subtitle="A curation of projects where I've pushed the boundaries of web development and user experience.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects?.map((project: any, idx: number) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative flex flex-col h-full rounded-[2.5rem] bg-secondary/20 border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500"
          >
            {/* Project Preview Area */}
            <div className={`relative h-64 w-full bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass p-12 rounded-full text-primary font-black text-2xl tracking-tighter shadow-2xl shadow-primary/20 select-none"
              >
                {project.icon}
              </motion.div>

              {/* Floating tech badges on hover */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-wrap justify-center gap-2 px-6">
                  {project.tech?.map((t: any) => (
                    <span key={t} className="text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                  <Link
                    href={project.github}
                    target="_blank"
                    className="h-12 w-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Github size={20} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-10 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md uppercase tracking-wider">Project 0{idx + 1}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                <Link
                  href={project.demo}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all"
                >
                  Explore Live
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
