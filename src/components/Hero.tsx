"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, Twitter, Globe, User } from "lucide-react"
import Link from "next/link"
import content from "@/lib/data.json"

export function Hero() {
  const { name, title, tagline, description, primaryCTA, secondaryCTA, socials, photoUrl } = content.hero

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <Github size={20} />
      case "linkedin": return <Linkedin size={20} />
      case "twitter": return <Twitter size={20} />
      case "mail":
      case "email": return <Mail size={20} />
      default: return <Globe size={20} />
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter mb-8 leading-[0.95]"
            >
              Web <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Developer.
              </span>
            </motion.h1>

            <div className="space-y-4 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl font-bold tracking-tight text-foreground"
              >
                Hi, I'm {name} — <span className="text-muted-foreground font-medium">{title}</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-muted-foreground max-w-xl font-medium leading-relaxed"
              >
                {tagline}
              </motion.p>
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="text-base text-muted-foreground/80 max-w-xl leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 mb-12"
            >
              <Link
                href={primaryCTA.link}
                className="group relative flex items-center gap-2 bg-foreground text-background px-10 py-4 rounded-[1.8rem] font-black text-lg hover:shadow-2xl hover:shadow-primary/20 transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
              >
                {primaryCTA.text}
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-4">
                {socials?.map((social, i) => (
                  <Link
                    key={i}
                    href={social.url}
                    target="_blank"
                    className="h-12 w-12 rounded-2xl glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  >
                    {getIcon(social.platform)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[80px] group-hover:scale-110 transition-transform duration-700" />

            <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-[3rem] border-4 border-background shadow-2xl bg-secondary/30 backdrop-blur-sm">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
                  <User size={100} strokeWidth={1} className="text-primary/10" />
                </div>
              )}
              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
