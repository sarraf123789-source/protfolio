"use client"

import { motion } from "framer-motion"

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative py-32 px-6 overflow-hidden ${className}`}>
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.02)_0,transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-4 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="h-px w-12 bg-primary/50 rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Discovery</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
