import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- 1. SAMM: IMPORTI OMA LOGO SIIN ---
import myLogo from './logo.png'; // Asenda see oma logo failiteega

// ==========================================
// 1. KASUTAJA ANDMED
// ==========================================
const userData = {
  name: "BERT-ROBERT PÕLLUSTE",
  logoText: "BRP", 
  title: "Full Stack Developer & Designer",
  bio: "Olen kirglik arendaja, kes usub, et kood peab olema sama ilus kui disain. Spetsialiseerun kaasaegsetele veebilahendustele, kus kohtuvad funktsionaalsus ja luksuslik kasutajakogemus. Iga piksel on minu jaoks oluline.",
  email: "bert-robert.polluste@voco.ee",
  profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", 
  github: "#",
  linkedin: "#",
  projects: [
    { 
      title: "Gold Engine", 
      desc: "Luksuslik e-kaubanduse platvorm tehisintellekti toega.", 
      tags: ["React", "Node.js", "AI"], 
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      title: "Vision Dashboard", 
      desc: "Reaalajas andmete visualiseerimine klaas-disaini stiilis.", 
      tags: ["Next.js", "Tailwind", "Framer"], 
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop" 
    }
  ]
};

const Icons = {
  Github: () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  Linkedin: () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  Arrow: () => <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
};

// ==========================================
// 3. LAADIMISEKRAAN (Sinu logoga!)
// ==========================================
const LoadingScreen = () => (
  <motion.div
    key="loader"
    className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center overflow-hidden"
    exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex items-center justify-center"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute w-40 h-40 border-t-2 border-b-2 border-[#C5A028] rounded-full"
      />
      {/* --- SINU LOGO PILT LAADIMISEL --- */}
      <img src={myLogo} alt="Logo" className="w-24 h-24 object-contain rounded-full relative z-10 shadow-[0_0_30px_rgba(197,160,40,0.4)]" />
    </motion.div>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: 200 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="h-[2px] bg-[#C5A028] mt-16 shadow-[0_0_15px_#C5A028]"
    />
    <p className="mt-6 text-[10px] uppercase tracking-[1em] text-gray-500 font-bold ml-[1em]">Loading Vision</p>
  </motion.div>
);

// ==========================================
// 4. PÕHISISU
// ==========================================
const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans selection:bg-[#C5A028] selection:text-black">
      
      {/* TAUSTAKUNST */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#C5A028]/10 blur-[120px] rounded-full" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[0%] -right-[10%] w-[50%] h-[50%] bg-[#C5A028]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* --- NAVBAR --- */}
        <nav className="fixed top-0 w-full bg-[#050505]/80 backdrop-blur-2xl z-50 border-b border-white/5 px-8 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 group cursor-pointer">
              {/* --- SINU LOGO PILT PÄISES --- */}
              <div className="w-12 h-12 overflow-hidden rounded-xl border border-[#C5A028]/30 group-hover:border-[#C5A028] transition-all duration-500 shadow-[0_0_15px_rgba(197,160,40,0.1)]">
                <img src={myLogo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tighter uppercase hidden md:block group-hover:text-[#C5A028] transition-colors">{userData.name}</span>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              <a href="#about" className="hover:text-[#C5A028] transition-colors">About</a>
              <a href="#work" className="hover:text-[#C5A028] transition-colors">Work</a>
              <a href={`mailto:${userData.email}`} className="px-4 py-2 border border-[#C5A028]/30 rounded-full hover:bg-[#C5A028] hover:text-black transition-all">Hire Me</a>
            </div>
          </div>
        </nav>

        {/* HERO SEKTSIOON */}
        <section className="pt-64 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-[#C5A028] uppercase tracking-[1em] text-[10px] font-black mb-8 pl-[1em]">Available for Projects</h2>
            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter text-white mb-12">
              BEYOND <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #C5A028' }}>CODE.</span>
            </h1>
            <div className="flex gap-4 justify-center">
               <a href={userData.github} className="p-4 border border-white/10 rounded-full hover:border-[#C5A028] hover:text-[#C5A028] transition-all"><Icons.Github /></a>
               <a href={userData.linkedin} className="p-4 border border-white/10 rounded-full hover:border-[#C5A028] hover:text-[#C5A028] transition-all"><Icons.Linkedin /></a>
            </div>
          </motion.div>
        </section>

        {/* BIO SEKTSIOON */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-4 border border-[#C5A028]/20 rounded-[2rem] -rotate-3" />
              <img src={userData.profileImg} alt="Profile" className="relative rounded-[2rem] w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-[#C5A028] font-bold uppercase tracking-widest text-sm mb-4">// BIO</h3>
              <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter text-white">I CREATE <br /> DIGITAL LEGACIES.</h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light">{userData.bio}</p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div><h4 className="text-white font-bold text-3xl italic">3+</h4><p className="text-gray-500 uppercase text-[10px] tracking-widest font-bold mt-2">Years Experience</p></div>
                <div><h4 className="text-white font-bold text-3xl italic">50+</h4><p className="text-gray-500 uppercase text-[10px] tracking-widest font-bold mt-2">Projects Done</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJEKTID */}
        <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
           <div className="flex justify-between items-end mb-20">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">PORTFOLIO<span className="text-[#C5A028]">.</span></h2>
              <p className="text-gray-500 max-w-[200px] text-[10px] uppercase font-bold tracking-widest pb-2 border-b border-[#C5A028]">Featured Selections</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              {userData.projects.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative">
                  <div className="relative overflow-hidden rounded-[2.5rem] aspect-video bg-[#111]">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                       <div>
                          <div className="flex gap-2 mb-4">
                            {p.tags.map(t => <span key={t} className="text-[9px] font-bold text-[#C5A028] border border-[#C5A028]/30 px-3 py-1 rounded-full uppercase tracking-widest">{t}</span>)}
                          </div>
                          <h3 className="text-4xl font-black text-white group-hover:text-[#C5A028] transition-colors">{p.title}</h3>
                       </div>
                       <motion.div whileHover={{ rotate: 45 }} className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white group-hover:bg-[#C5A028] group-hover:text-black transition-all">
                          <Icons.Arrow />
                       </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* JALUS */}
        <footer className="py-40 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0a0a]">
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-6xl md:text-[9rem] font-black mb-16 tracking-tighter text-white">LET'S TALK<span className="text-[#C5A028]">!</span></h2>
              <a href={`mailto:${userData.email}`} className="inline-block px-20 py-8 bg-[#C5A028] text-black font-black text-2xl rounded-full shadow-[0_20px_60px_rgba(197,160,40,0.4)] hover:scale-105 transition-transform uppercase tracking-widest">
                Get In Touch
              </a>
              <p className="mt-32 text-gray-700 text-[10px] font-black uppercase tracking-[1em]">&copy; 2026 {userData.name} • All Rights Reserved</p>
           </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" />
      ) : (
        <Portfolio key="portfolio" />
      )}
    </AnimatePresence>
  );
}