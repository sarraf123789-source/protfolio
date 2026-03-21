"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Section } from "./Section"
import { Mail, MapPin, Calendar, Send, CheckCircle2 } from "lucide-react"
import { useState } from "react"
export function Contact({ data }: { data?: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactInfo = data?.contact || {}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="contact" title="Get In Touch" subtitle="Let's build something exceptional together. I'm currently open to new opportunities and collaborations.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between py-8"
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-4xl font-black tracking-tighter mb-6">Contact Information</h3>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md font-medium">
                Whether you have a specific project in mind or just want to say hi, my inbox is always open.
              </p>
            </div>

            <div className="grid gap-10">
              <div className="flex items-center gap-6 group">
                <div className="h-16 w-16 rounded-[2rem] glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Send an Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-2xl font-black tracking-tight hover:text-primary transition-colors underline decoration-primary/30 decoration-2 underline-offset-8">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="h-16 w-16 rounded-[2rem] glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Located In</p>
                  <p className="text-2xl font-black tracking-tight">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="h-16 w-16 rounded-[2rem] glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Availability</p>
                  <p className="text-2xl font-black tracking-tight">{contactInfo.availability}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex gap-4">
            <div className="h-2 w-12 rounded-full bg-primary/40" />
            <div className="h-2 w-4 rounded-full bg-primary/20" />
            <div className="h-2 w-4 rounded-full bg-primary/20" />
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass p-10 md:p-14 rounded-[3.5rem] border border-border/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6 py-20"
                >
                  <div className="h-24 w-24 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter">Awesome!</h3>
                  <p className="text-xl text-muted-foreground font-medium max-w-xs">Your message has been sent successfully. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-4">Full Name</label>
                      <input name="name" required type="text" placeholder="John Doe" className="w-full bg-secondary/30 border border-border/50 px-8 py-5 rounded-[1.8rem] outline-none focus:border-primary transition-all font-bold placeholder:text-muted-foreground/30 text-lg shadow-inner" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-4">Email Address</label>
                      <input name="email" required type="email" placeholder="john@example.com" className="w-full bg-secondary/30 border border-border/50 px-8 py-5 rounded-[1.8rem] outline-none focus:border-primary transition-all font-bold placeholder:text-muted-foreground/30 text-lg shadow-inner" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-4">Your Message</label>
                    <textarea name="message" required rows={6} placeholder="Tell me about your project..." className="w-full bg-secondary/30 border border-border/50 px-8 py-5 rounded-[1.8rem] outline-none focus:border-primary transition-all font-bold placeholder:text-muted-foreground/30 text-lg resize-none shadow-inner" />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full group relative flex items-center justify-center gap-3 bg-foreground text-background px-10 py-6 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-primary/20 transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Delivering..." : "Deliver Message"}
                    {!isSubmitting && <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
