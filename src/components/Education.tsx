"use client"

import { motion } from "framer-motion"
import { Section } from "./Section"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
export function Education({ data }: { data?: any }) {
    const education = data?.education || []

    return (
        <Section id="education" title="Education" subtitle="My academic foundation and continuous learning journey.">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {education?.map((edu: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group relative p-10 rounded-[2.5rem] glass border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                            <GraduationCap size={32} />
                        </div>

                        <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {edu.degree}
                        </h3>
                        <p className="text-lg font-bold text-foreground mb-4">{edu.institution}</p>

                        <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                                <Calendar size={14} className="text-primary" />
                                {edu.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
