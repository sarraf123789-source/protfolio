"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Save, Lock, LayoutDashboard, User, Info, CheckCircle2, LogOut,
    Settings, BarChart3, Mail, Upload, Image as ImageIcon, Plus,
    X, Briefcase, Code, Trash2, FileText, Sparkles, MapPin, Globe, AtSign, Link as LinkIcon,
    ArrowUpRight, GraduationCap, Award
} from "lucide-react"

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState("")
    const [data, setData] = useState<any>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState("hero")
    const imageInputRef = useRef<HTMLInputElement>(null)
    const resumeInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "admin123") setIsLoggedIn(true)
        else alert("Incorrect password")
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetch(`/api/content?t=${Date.now()}`).then(res => res.json()).then(d => setData(d))
            fetchMessages()
        }
    }, [isLoggedIn])

    const fetchMessages = async () => {
        setIsLoadingMessages(true)
        try {
            const res = await fetch("/api/contact", {
                headers: { "Authorization": "Bearer portfolio-admin-2026" }
            })
            const d = await res.json()
            if (Array.isArray(d)) setMessages(d)
        } catch (err) { console.error(err) } finally { setIsLoadingMessages(false) }
    }

    const deleteMessage = async (id: string) => {
        if (!confirm("Delete this message?")) return
        try {
            const res = await fetch(`/api/contact?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer portfolio-admin-2026" }
            })
            if (res.ok) fetchMessages()
        } catch (err) { console.error(err) }
    }

    const handleSave = async () => {
        setIsSaving(true)
        setIsSuccess(false)
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer portfolio-admin-2026" },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            console.log("Save response:", res.status, result)
            if (res.ok) {
                setIsSuccess(true)
                setTimeout(() => setIsSuccess(false), 3000)
            } else {
                alert(`Save failed: ${result.error || "Unknown error"}. Status: ${res.status}`)
            }
        } catch (err) {
            console.error("Save error:", err)
            alert("Save failed: network error. Check console for details.")
        } finally { setIsSaving(false) }
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'resume') => {
        const file = e.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData })
            const result = await res.json()
            if (result.url) {
                // Construct the updated data inline (don't use setData + handleSave since setState is async)
                const updatedData = {
                    ...data,
                    hero: {
                        ...data.hero,
                        ...(type === 'photo' ? { photoUrl: result.url } : { resumeUrl: result.url })
                    }
                }
                // Update local state
                setData(updatedData)
                // Immediately save to Supabase + data.json
                setIsSaving(true)
                try {
                    const saveRes = await fetch("/api/content", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": "Bearer portfolio-admin-2026" },
                        body: JSON.stringify(updatedData)
                    })
                    if (saveRes.ok) {
                        setIsSuccess(true)
                        setTimeout(() => setIsSuccess(false), 3000)
                        alert(`${type === 'photo' ? 'Photo' : 'Resume'} uploaded and saved successfully!`)
                    } else {
                        alert("File uploaded but save failed. Please click 'Sync Changes'.")
                    }
                } catch (saveErr) {
                    alert("File uploaded but save failed. Please click 'Sync Changes'.")
                } finally { setIsSaving(false) }
            } else {
                alert("Upload failed: " + (result.error || "Unknown error"))
            }
        } catch (err) { alert("Upload failed.") } finally { setIsUploading(false) }
    }

    const addItem = (section: string, categoryIndex?: number) => {
        const newData = { ...data }
        if (section === "experience") {
            newData.experience = [{ role: "Role", company: "Company", duration: "Date", responsibilities: ["New task"] }, ...newData.experience]
        } else if (section === "projects") {
            newData.projects = [{ title: "New Project", description: "Desc", tech: ["Next.js"], github: "", demo: "", gradient: "from-blue-600/20 via-primary/10 to-transparent", icon: "App" }, ...newData.projects]
        } else if (section === "technical-skill-category") {
            newData.technicalSkills = [...newData.technicalSkills, { category: "New Category", items: ["New Item"] }]
        } else if (section === "technical-skill-item" && categoryIndex !== undefined) {
            newData.technicalSkills[categoryIndex].items.push("New Skill")
        } else if (section === "soft-skill") {
            newData.softSkills = [...(newData.softSkills || []), "New Soft Skill"]
        } else if (section === "about-paragraph") {
            newData.about.paragraphs.push("New paragraph")
        } else if (section === "education") {
            newData.education = [...(newData.education || []), { degree: "Degree Name", institution: "Institution", status: "Completed/Running" }]
        } else if (section === "certificates") {
            newData.certificates = [...(newData.certificates || []), { title: "New Certificate", issuer: "Issuer Name", date: "Year", link: "#" }]
        } else if (section === "socials") {
            newData.hero.socials = [...(newData.hero.socials || []), { platform: "Platform", url: "https://" }]
        }
        setData(newData)
    }

    const deleteItem = (section: string, index: number, itemIndex?: number) => {
        const newData = { ...data }
        if (section === "socials") newData.hero.socials.splice(index, 1)
        else if (section === "soft-skill") newData.softSkills.splice(index, 1)
        else if (section === "technical-skill-item" && itemIndex !== undefined) newData.technicalSkills[index].items.splice(itemIndex, 1)
        else if (section === "technical-skill-category") newData.technicalSkills.splice(index, 1)
        else newData[section].splice(index, 1)
        setData(newData)
    }

    if (!isLoggedIn) return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(var(--primary-rgb),0.1)_0,rgba(var(--background-rgb),0)_100%)]" />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md p-10 rounded-[2.5rem] border border-border/50 bg-secondary/30 backdrop-blur-xl text-center shadow-2xl">
                <div className="h-20 w-20 rounded-[2rem] bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
                <h1 className="text-3xl font-black mb-3">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-background border border-border px-6 py-4 rounded-2xl text-center font-bold outline-none" />
                    <button className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-lg shadow-primary/20">Login</button>
                </form>
            </motion.div>
        </div>
    )

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            <aside className="w-full lg:w-80 h-auto lg:h-screen sticky top-0 bg-secondary/5 border-b lg:border-r border-border/50 p-8 flex flex-col pt-12 items-center lg:items-start">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">RS</div>
                    <span className="font-black text-xl tracking-tighter">Control Center</span>
                </div>
                <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide w-full">
                    {[
                        { id: "hero", icon: <User size={20} />, label: "Identity" },
                        { id: "about", icon: <Info size={20} />, label: "About Me" },
                        { id: "skills", icon: <Sparkles size={20} />, label: "Skills" },
                        { id: "experience", icon: <Briefcase size={20} />, label: "Experience" },
                        { id: "projects", icon: <Code size={20} />, label: "Projects" },
                        { id: "education", icon: <GraduationCap size={20} />, label: "Education" },
                        { id: "certificates", icon: <Award size={20} />, label: "Certificates" },
                        { id: "footer", icon: <AtSign size={20} />, label: "Contact & Footer" },
                        { id: "messages", icon: <Mail size={20} />, label: "Inquiries" },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap w-full ${activeTab === item.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-secondary/40"}`}>
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
                <button onClick={() => setIsLoggedIn(false)} className="mt-auto hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-muted-foreground hover:text-destructive"><LogOut size={20} /> Logout</button>
            </aside>

            <main className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Editor Mode</p>
                            <h1 className="text-5xl font-black tracking-tighter">Modify Your Site</h1>
                        </div>
                        <button onClick={handleSave} disabled={isSaving} className="group flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-[2rem] font-black hover:shadow-2xl transition-all disabled:opacity-50">
                            {isSaving ? "Saving..." : isSuccess ? <CheckCircle2 className="text-emerald-400" /> : <Save />}
                            {isSuccess ? "Saved!" : "Sync Changes"}
                        </button>
                    </header>

                    <AnimatePresence mode="wait">
                        {activeTab === "hero" && (
                            <motion.div key="hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                {/* Identity Card */}
                                <div className="glass p-10 rounded-[3rem] border border-border/50 grid gap-10">
                                    <h2 className="text-2xl font-bold flex items-center gap-3"><User className="text-primary" /> Personal Identity</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Display Name</label>
                                            <input value={data.hero.name} onChange={e => setData({ ...data, hero: { ...data.hero, name: e.target.value } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Job Title / Role</label>
                                            <input value={data.hero.title} onChange={e => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Tagline (short subtitle)</label>
                                            <input value={data.hero.tagline} onChange={e => setData({ ...data, hero: { ...data.hero, tagline: e.target.value } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Hero Description (More Bio)</label>
                                            <textarea value={data.hero.description} onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none resize-none" rows={3} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Asset Management</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <button onClick={() => imageInputRef.current?.click()} className="flex items-center justify-center gap-3 bg-secondary/50 py-4 rounded-2xl font-bold hover:bg-secondary border border-border/50 transition-all">
                                                <ImageIcon size={20} /> {isUploading ? "Uploading..." : "Update Headshot"}
                                            </button>
                                            <button onClick={() => resumeInputRef.current?.click()} className="flex items-center justify-center gap-3 bg-secondary/50 py-4 rounded-2xl font-bold hover:bg-secondary border border-border/50 transition-all">
                                                <FileText size={20} /> {isUploading ? "Uploading..." : "Update Resume (PDF)"}
                                            </button>
                                            <input type="file" ref={imageInputRef} onChange={e => handleUpload(e, 'photo')} className="hidden" accept="image/*" />
                                            <input type="file" ref={resumeInputRef} onChange={e => handleUpload(e, 'resume')} className="hidden" accept=".pdf,.doc,.docx" />
                                        </div>
                                    </div>
                                </div>

                                {/* Socials CRUD Card */}
                                <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-8">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold flex items-center gap-3"><LinkIcon className="text-primary" /> Social Links</h2>
                                        <button onClick={() => addItem("socials")} className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg"><Plus /></button>
                                    </div>
                                    <div className="grid gap-4">
                                        {data.hero.socials?.map((social: any, idx: number) => (
                                            <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-secondary/30 p-4 rounded-2xl border border-border/50">
                                                <input value={social.platform} placeholder="Platform" onChange={e => {
                                                    const list = [...data.hero.socials]; list[idx].platform = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, socials: list } })
                                                }} className="bg-background border border-border px-4 py-2 rounded-xl outline-none flex-1 w-full" />
                                                <input value={social.url} placeholder="URL" onChange={e => {
                                                    const list = [...data.hero.socials]; list[idx].url = e.target.value;
                                                    setData({ ...data, hero: { ...data.hero, socials: list } })
                                                }} className="bg-background border border-border px-4 py-2 rounded-xl outline-none flex-[2] w-full text-xs" />
                                                <button onClick={() => deleteItem("socials", idx)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={20} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Buttons Card */}
                                <div className="glass p-10 rounded-[3rem] border border-border/50 space-y-8">
                                    <h2 className="text-2xl font-bold flex items-center gap-3"><ArrowUpRight className="text-primary" /> Action Buttons</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <p className="text-xs font-black uppercase text-primary ml-2">Primary Button</p>
                                            <input value={data.hero.primaryCTA.text} placeholder="Button Text" onChange={e => setData({ ...data, hero: { ...data.hero, primaryCTA: { ...data.hero.primaryCTA, text: e.target.value } } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none font-bold" />
                                            <input value={data.hero.primaryCTA.link} placeholder="Link (e.g. #projects)" onChange={e => setData({ ...data, hero: { ...data.hero, primaryCTA: { ...data.hero.primaryCTA, link: e.target.value } } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none text-xs" />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-xs font-black uppercase text-primary ml-2">Secondary Button</p>
                                            <input value={data.hero.secondaryCTA.text} placeholder="Button Text" onChange={e => setData({ ...data, hero: { ...data.hero, secondaryCTA: { ...data.hero.secondaryCTA, text: e.target.value } } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none font-bold" />
                                            <input value={data.hero.secondaryCTA.link} placeholder="Link (e.g. #contact)" onChange={e => setData({ ...data, hero: { ...data.hero, secondaryCTA: { ...data.hero.secondaryCTA, link: e.target.value } } })} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Rest of the tabs (About, Skills, Experience, Projects, Footer) remain the same with their full CRUD */}
                        {activeTab === "about" && (
                            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="flex justify-between items-center px-4">
                                    <h2 className="text-2xl font-bold">About Paragraphs</h2>
                                    <button onClick={() => addItem("about-paragraph")} className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg"><Plus /></button>
                                </div>
                                {data.about.paragraphs?.map((p: string, idx: number) => (
                                    <div key={idx} className="glass p-8 rounded-[2.5rem] border border-border/50 relative">
                                        <textarea value={p} onChange={e => {
                                            const list = [...data.about.paragraphs]; list[idx] = e.target.value;
                                            setData({ ...data, about: { ...data.about, paragraphs: list } })
                                        }} rows={4} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none resize-none leading-relaxed" />
                                        <button onClick={() => {
                                            const list = [...data.about.paragraphs]; list.splice(idx, 1);
                                            setData({ ...data, about: { ...data.about, paragraphs: list } })
                                        }} className="mt-4 text-xs font-black uppercase text-destructive hover:underline tracking-widest px-2">Remove Paragraph</button>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === "skills" && (
                            <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <section className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold flex items-center gap-3"><Sparkles className="text-primary" /> Technical Proficiency</h2>
                                        <button onClick={() => addItem("technical-skill-category")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg"><Plus size={18} /> New Category</button>
                                    </div>
                                    <div className="grid gap-6">
                                        {data.technicalSkills?.map((cat: any, cIdx: number) => (
                                            <div key={cIdx} className="glass p-8 rounded-[2.5rem] border border-border/50 relative group">
                                                <button onClick={() => deleteItem("technical-skill-category", cIdx)} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                                                <input value={cat.category} onChange={e => {
                                                    const list = [...data.technicalSkills]; list[cIdx].category = e.target.value;
                                                    setData({ ...data, technicalSkills: list })
                                                }} className="text-xl font-black bg-transparent border-b border-border/50 mb-6 py-2 outline-none focus:border-primary w-full max-w-sm" />
                                                <div className="flex flex-wrap gap-3">
                                                    {cat.items.map((item: string, iIdx: number) => (
                                                        <div key={iIdx} className="flex items-center gap-2 bg-secondary/50 border border-border/50 px-4 py-2 rounded-xl">
                                                            <input value={item} onChange={e => {
                                                                const list = [...data.technicalSkills]; list[cIdx].items[iIdx] = e.target.value;
                                                                setData({ ...data, technicalSkills: list })
                                                            }} className="bg-transparent outline-none font-bold text-sm w-max min-w-[100px]" />
                                                            <button onClick={() => deleteItem("technical-skill-item", cIdx, iIdx)}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                                                        </div>
                                                    ))}
                                                    <button onClick={() => addItem("technical-skill-item", cIdx)} className="h-10 w-10 flex items-center justify-center border border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary transition-all"><Plus size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-8 pt-12 border-t border-border/30">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold flex items-center gap-3"><Sparkles className="text-blue-400" /> Soft Skills</h2>
                                        <button onClick={() => addItem("soft-skill")} className="bg-secondary text-foreground px-6 py-2 rounded-xl font-bold flex items-center gap-2 border border-border"><Plus size={18} /> Add Soft Skill</button>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {data.softSkills?.map((skill: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 bg-secondary/30 border border-border/50 px-6 py-3 rounded-2xl group transition-all hover:border-primary/30">
                                                <input value={skill} onChange={e => {
                                                    const list = [...data.softSkills]; list[idx] = e.target.value;
                                                    setData({ ...data, softSkills: list })
                                                }} className="bg-transparent outline-none font-black text-xs uppercase tracking-widest w-max min-w-[150px]" />
                                                <button onClick={() => deleteItem("soft-skill", idx)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === "experience" && (
                            <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Professional Journey</h2>
                                    <button onClick={() => addItem("experience")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2"><Plus size={18} /> Add Role</button>
                                </div>
                                {data.experience?.map((exp: any, idx: number) => (
                                    <div key={idx} className="glass p-8 rounded-[2.5rem] border border-border/50 relative space-y-6 group">
                                        <button onClick={() => deleteItem("experience", idx)} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground">Role</label>
                                                <input value={exp.role} onChange={e => {
                                                    const list = [...data.experience]; list[idx].role = e.target.value;
                                                    setData({ ...data, experience: list })
                                                }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground">Company</label>
                                                <input value={exp.company} onChange={e => {
                                                    const list = [...data.experience]; list[idx].company = e.target.value;
                                                    setData({ ...data, experience: list })
                                                }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground">Duration</label>
                                                <input value={exp.duration} onChange={e => {
                                                    const list = [...data.experience]; list[idx].duration = e.target.value;
                                                    setData({ ...data, experience: list })
                                                }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Responsibilities (One per line)</label>
                                            <textarea value={exp.responsibilities.join("\n")} onChange={e => {
                                                const list = [...data.experience]; list[idx].responsibilities = e.target.value.split("\n");
                                                setData({ ...data, experience: list })
                                            }} rows={4} className="w-full bg-background border border-border px-6 py-4 rounded-2xl outline-none leading-relaxed" />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === "projects" && (
                            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">Project Portfolio</h2>
                                    <button onClick={() => addItem("projects")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2"><Plus size={18} /> Add Project</button>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    {data.projects?.map((proj: any, idx: number) => (
                                        <div key={idx} className="glass p-10 rounded-[3rem] border border-border/50 relative group space-y-8">
                                            <button onClick={() => deleteItem("projects", idx)} className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={24} /></button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Title</label>
                                                    <input value={proj.title} onChange={e => {
                                                        const list = [...data.projects]; list[idx].title = e.target.value;
                                                        setData({ ...data, projects: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Icon / Category</label>
                                                    <input value={proj.icon} onChange={e => {
                                                        const list = [...data.projects]; list[idx].icon = e.target.value;
                                                        setData({ ...data, projects: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground">Description</label>
                                                <textarea value={proj.description} onChange={e => {
                                                    const list = [...data.projects]; list[idx].description = e.target.value;
                                                    setData({ ...data, projects: list })
                                                }} rows={2} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none leading-relaxed" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">GitHub Link</label>
                                                    <input value={proj.github} onChange={e => {
                                                        const list = [...data.projects]; list[idx].github = e.target.value;
                                                        setData({ ...data, projects: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none text-xs" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Live Demo Link</label>
                                                    <input value={proj.demo} onChange={e => {
                                                        const list = [...data.projects]; list[idx].demo = e.target.value;
                                                        setData({ ...data, projects: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none text-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "education" && (
                            <motion.div key="edu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Academic Background</h2>
                                    <button onClick={() => addItem("education")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2"><Plus size={18} /> Add Education</button>
                                </div>
                                <div className="grid gap-6">
                                    {data.education?.map((edu: any, idx: number) => (
                                        <div key={idx} className="glass p-8 rounded-[2.5rem] border border-border/50 relative group space-y-6">
                                            <button onClick={() => deleteItem("education", idx)} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Degree / Qualification</label>
                                                    <input value={edu.degree} onChange={e => {
                                                        const list = [...data.education]; list[idx].degree = e.target.value;
                                                        setData({ ...data, education: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Institution Name</label>
                                                    <input value={edu.institution} onChange={e => {
                                                        const list = [...data.education]; list[idx].institution = e.target.value;
                                                        setData({ ...data, education: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Status / Date</label>
                                                    <input value={edu.status} onChange={e => {
                                                        const list = [...data.education]; list[idx].status = e.target.value;
                                                        setData({ ...data, education: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none text-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "certificates" && (
                            <motion.div key="cert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Certifications</h2>
                                    <button onClick={() => addItem("certificates")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2"><Plus size={18} /> Add Certificate</button>
                                </div>
                                <div className="grid gap-6">
                                    {data.certificates?.map((cert: any, idx: number) => (
                                        <div key={idx} className="glass p-8 rounded-[2.5rem] border border-border/50 relative group space-y-6">
                                            <button onClick={() => deleteItem("certificates", idx)} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Certificate Title</label>
                                                    <input value={cert.title} onChange={e => {
                                                        const list = [...data.certificates]; list[idx].title = e.target.value;
                                                        setData({ ...data, certificates: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Issuing Authority</label>
                                                    <input value={cert.issuer} onChange={e => {
                                                        const list = [...data.certificates]; list[idx].issuer = e.target.value;
                                                        setData({ ...data, certificates: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Year / Date</label>
                                                    <input value={cert.date} onChange={e => {
                                                        const list = [...data.certificates]; list[idx].date = e.target.value;
                                                        setData({ ...data, certificates: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Credential Link</label>
                                                    <input value={cert.link} onChange={e => {
                                                        const list = [...data.certificates]; list[idx].link = e.target.value;
                                                        setData({ ...data, certificates: list })
                                                    }} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none text-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "footer" && (
                            <motion.div key="footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="glass p-10 rounded-[3rem] border border-border/50 grid gap-10">
                                    <h2 className="text-2xl font-bold flex items-center gap-3"><Mail className="text-primary" /> Contact & Footer</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Public Email</label>
                                            <input value={data.contact.email} onChange={e => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Location</label>
                                            <input value={data.contact.location} onChange={e => setData({ ...data, contact: { ...data.contact, location: e.target.value } })} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Availability</label>
                                            <input value={data.contact.availability} onChange={e => setData({ ...data, contact: { ...data.contact, availability: e.target.value } })} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Footer Copyright</label>
                                            <input value={data.footer.copyright} onChange={e => setData({ ...data, footer: { ...data.footer, copyright: e.target.value } })} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground">Footer Catchphrase</label>
                                            <input value={data.footer.message} onChange={e => setData({ ...data, footer: { ...data.footer, message: e.target.value } })} className="w-full bg-background border border-border px-4 py-3 rounded-xl outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === "messages" && (
                            <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="flex justify-between items-center px-4">
                                    <h2 className="text-2xl font-bold flex items-center gap-3"><Mail className="text-primary" /> Received Inquiries</h2>
                                    <button onClick={fetchMessages} disabled={isLoadingMessages} className="text-xs font-black uppercase text-primary hover:underline tracking-widest px-2">Refresh</button>
                                </div>
                                {isLoadingMessages ? (
                                    <div className="text-center py-20 text-muted-foreground font-bold italic">Checking for new messages...</div>
                                ) : messages.length === 0 ? (
                                    <div className="glass p-20 rounded-[3.5rem] border border-border/50 text-center space-y-4">
                                        <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto text-muted-foreground"><Mail size={32} /></div>
                                        <p className="text-muted-foreground font-medium">Your inbox is currently empty. No messages yet!</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {messages.map((m: any) => (
                                            <div key={m.id} className="glass p-8 rounded-[2.5rem] border border-border/50 group relative">
                                                <button onClick={() => deleteMessage(m.id)} className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl">{m.name ? m.name[0] : "?"}</div>
                                                    <div>
                                                        <h3 className="text-xl font-black">{m.name}</h3>
                                                        <p className="text-sm text-primary font-bold">{m.email}</p>
                                                    </div>
                                                    <span className="md:ml-auto text-[10px] font-black uppercase tracking-widest text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className="bg-background/50 p-6 rounded-2xl border border-border/30 text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
                                                    {m.message}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
