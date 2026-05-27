import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

// --- IMPORTI FAILID ---
import myLogo from './logo.png'; 
import myProfileImg from './bert-profile.jpg';  

// SINU PROJEKTIDE PILDID
import proje1 from './proje1.png';
import proje2 from './proje2.png';
import proje3 from './proje3.png';
import proje4 from './proje4.png';

// ==========================================
// 1. KASUTAJA ANDMED JA SEADISTUSED
// ==========================================
const userData = {
  name: "BERT-ROBERT PÕLLUSTE",
  roles: ["Creative Developer", "UI/UX Designer", "Problem Solver"],
  bio: "I am a passionate developer who believes that code should be as beautiful as the design. I specialize in modern web solutions where functionality meets a premium user experience.",
  github: "https://github.com/polluste888?tab=repositories",
  linkedin: "https://linkedin.com",
  skills: ["React", "Node.js", "Tailwind", "Figma", "WordPress", "Git", "JavaScript", "MongoDB", "Express"],
  projects: [
    { 
      title: "KaevikuDilemmad", 
      tags: ["React", "AI"], 
      img: proje1,
      github: "https://github.com/polluste888/h-katlon",
      demo: "https://vso25polluste.ita.voco.ee/h-katlon/index.html",
      description: "An interactive web application built with React that explores moral dilemmas through an AI-driven narrative. Developed during a hackathon, it focuses on immersive storytelling and a dark, modern UI."
    },
    { 
      title: "RobiTrans OÜ", 
      tags: ["Figma", "UI/UX"], 
      img: proje2,
      github: null, 
      demo: "https://uneven-halt-90657207.figma.site",
      description: "A comprehensive brand identity and website prototype for a logistics company. Designed in Figma with a focus on professional aesthetics, trustworthiness, and seamless user-friendly navigation."
    },
    { 
      title: "Rise Entertainment", 
      tags: ["WordPress", "Design"], 
      img: proje3,
      github: null, 
      demo: "https://vso25polluste.ita.voco.ee/wordpress/",
      description: "Developed a dynamic, responsive WordPress/PHP website for an entertainment company, featuring a custom ACF-based event system, full bilingual (EE/EN) support, and optimized performance across all devices."
    },
    {
    title: "Voco Hotel", 
      tags: ["HTML", "CSS"], 
      img: proje4,
      github: "https://github.com/polluste888/Mitmeleheline_veeb", 
      demo: "https://vso25polluste.ita.voco.ee/Mitmeleheline_veeb/index.html",
      description: "built a modern, multi-page website for 'VOCO Hotel', featuring a stylish homepage with a full-width hero image and clear navigation."
    }

  ]
};

const Icons = {
  Github: () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  External: () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
  Download: () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
};

// ==========================================
// 2. TÜÜPIMISE EFEKT
// ==========================================
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return <span className="text-[#C5A028] min-h-[1em]">{words[index].substring(0, subIndex)}|</span>;
};

// ==========================================
// 3. PROJECT SLIDER KOMPONENT
// ==========================================
const ProjectSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const projects = userData.projects;

  const nextProject = () => {
    setShowMore(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setShowMore(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const current = projects[currentIndex];

  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
            Work<span className="text-[#C5A028]">.</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Project {currentIndex + 1} of {projects.length}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={prevProject} className="p-5 border border-white/10 rounded-full hover:border-[#C5A028] text-white transition-all group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={nextProject} className="p-5 border border-white/10 rounded-full hover:border-[#C5A028] text-white transition-all group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl min-h-[600px] flex flex-col md:flex-row">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col md:flex-row w-full"
          >
            <div className="w-full md:w-1/2 p-6">
              <div className="h-[300px] md:h-full rounded-[2.5rem] overflow-hidden">
                <img src={current.img} alt={current.title} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex gap-2 mb-6">
                {current.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-[#C5A028]/10 text-[#C5A028] px-4 py-2 rounded-full border border-[#C5A028]/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-6 tracking-tighter">
                {current.title}
              </h3>

              <div className="relative mb-10">
                <p className={`text-gray-400 text-lg leading-relaxed transition-all ${showMore ? '' : 'line-clamp-2'}`}>
                  {current.description}
                </p>
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="text-[#C5A028] text-[10px] font-black uppercase tracking-widest mt-4 hover:underline"
                >
                  {showMore ? 'Read Less -' : 'Read More +'}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <a href={current.demo} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#C5A028] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                  View Live <Icons.External />
                </a>
                {current.github && (
                  <a href={current.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-white/10 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                    Source Code <Icons.Github />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ==========================================
// 4. KONTAKT JA ÜLDINE PORTFOLIO
// ==========================================
const ContactSection = ({ contactRef }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => { setStatus('Message Sent!'); form.current.reset(); }, () => { setStatus('Error!'); })
      .finally(() => setIsSending(false));
  };

  return (
    <section ref={contactRef} id="contact" className="py-32 px-6 max-w-4xl mx-auto">
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl">
        <h2 className="text-5xl font-black mb-8 text-white uppercase italic">Let's build <br /> <span className="text-[#C5A028]">together.</span></h2>
        <form ref={form} onSubmit={sendEmail} className="grid gap-6 text-white">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" name="user_name" placeholder="Name" required className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A028]" />
            <input type="email" name="user_email" placeholder="Email" required className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A028]" />
          </div>
          <textarea name="message" rows="4" placeholder="Your Message..." required className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#C5A028] resize-none" />
          <button type="submit" disabled={isSending} className="bg-[#C5A028] text-black font-black py-5 rounded-2xl hover:opacity-90 transition-all uppercase tracking-widest text-sm">
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="text-center text-[#C5A028] font-bold text-xs mt-4 uppercase tracking-widest">{status}</p>}
        </form>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const scrollToContact = (e) => {
    e.preventDefault();
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans selection:bg-[#C5A028] selection:text-black overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#C5A028]/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-[#050505]/80 backdrop-blur-2xl z-50 border-b border-white/5 px-8 py-5">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 group">
              <img src={myLogo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl tracking-tighter uppercase hidden md:block">{userData.name}</span>
            </div>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              <a href="#about" className="hover:text-[#C5A028]">About</a>
              <a href="#work" className="hover:text-[#C5A028]">Work</a>
              <a href="/bert-cv.pdf" target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 hover:text-[#C5A028] border-r border-white/10 pr-8">
                CV <Icons.Download />
              </a>
              <button onClick={scrollToContact} className="px-5 py-2 bg-[#C5A028] text-black rounded-full font-black hover:scale-105 transition-all">Hire Me</button>
            </div>
          </div>
        </nav>

        <section className="pt-64 pb-32 px-6 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-6xl md:text-[8rem] font-black leading-[0.9] tracking-tighter text-white mb-12 uppercase italic">
              Digital <br /> <Typewriter words={userData.roles} />
            </h1>
            <div className="flex gap-4 justify-center">
               <a href={userData.github} target="_blank" rel="noreferrer" className="p-4 border border-white/10 rounded-full hover:border-[#C5A028] hover:text-[#C5A028] transition-all"><Icons.Github /></a>
            </div>
          </motion.div>
        </section>

        {/* SKILLS MARQUEE */}
        <div className="py-12 bg-white/[0.02] border-y border-white/5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...userData.skills, ...userData.skills, ...userData.skills].map((skill, i) => (
              <span key={i} className="text-5xl font-black text-white/10 uppercase italic mx-12 tracking-tighter">
                {skill} <span className="text-[#C5A028] ml-4 opacity-50">/</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-xl">
            <img src={myProfileImg} alt="Bert-Robert" className="rounded-[2rem] w-full h-[550px] object-cover shadow-2xl transition-all duration-700" />
            <div>
              <h3 className="text-[#C5A028] font-bold uppercase tracking-[0.5em] text-xs mb-6">// ABOUT ME</h3>
              <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light italic">"{userData.bio}"</p>
              <button onClick={scrollToContact} className="px-10 py-5 border border-[#C5A028] text-[#C5A028] rounded-full font-black hover:bg-[#C5A028] hover:text-black transition-all uppercase tracking-widest text-xs">Start a Project</button>
            </div>
          </div>
        </section>

        {/* PROJECT SLIDER KUTSUMINE */}
        <ProjectSlider />

        <ContactSection contactRef={contactRef} />

        <footer className="py-20 text-center border-t border-white/5">
           <p className="text-gray-700 text-[10px] font-black uppercase tracking-[1em]">&copy; 2026 {userData.name}</p>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div 
          key="loader" 
          className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.img 
            src={myLogo} alt="Logo" className="w-24 h-24 mb-8"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative overflow-hidden mb-4">
            <motion.span className="text-6xl font-black text-white/10 italic tracking-tighter">
              {progress}%
            </motion.span>
          </div>
          <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#C5A028]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <motion.p className="mt-6 text-[8px] uppercase tracking-[0.5em] text-gray-500 font-bold">
            Initialising Experience
          </motion.p>
        </motion.div>
      ) : <Portfolio key="portfolio" />}
    </AnimatePresence>
  );
}