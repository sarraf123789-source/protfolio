"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, ExternalLink, Globe } from "lucide-react"
export function Footer({ data }: { data?: any }) {
  const copyright = data?.footer?.copyright
  const message = data?.footer?.message
  const socials = data?.hero?.socials

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <Github size={24} />
      case "linkedin": return <Linkedin size={24} />
      case "twitter": return <Twitter size={24} />
      case "mail":
      case "email": return <Mail size={24} />
      default: return <Globe size={24} />
    }
  }

  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16 border-b border-border/50">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                RS
              </div>
              <span className="text-2xl font-black tracking-tighter">Ruchi.</span>
            </Link>
            <p className="text-muted-foreground max-w-xs font-bold leading-relaxed">
              {message}
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-4 italic max-w-xs">
              "I hereby declare that all the information mentioned above is true and correct to the best of my knowledge and belief."
            </p>
          </div>

          <div className="flex gap-4">
            {socials?.map((social: any, i: number) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                className="h-14 w-14 rounded-2xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all border border-border/50"
              >
                {getIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10">
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
            {copyright}
          </p>
          <div className="flex gap-8">
            <Link href="#about" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#contact" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
