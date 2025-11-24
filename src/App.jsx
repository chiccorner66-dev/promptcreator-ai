import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
    Sparkles, Zap, Video, Mic, 
    ChevronDown, ChevronUp, Copy, FileText, 
    Clapperboard, ClipboardCheck, 
    Megaphone, AlignLeft, CassetteTape, Eye, Hash, Save,
    LogOut, Play, BrainCircuit, TrendingUp, Layers, 
    Cpu, Target, MonitorPlay, StopCircle, Trash2, ShieldCheck, Network,
    Mail, Lock, X, ArrowRight
} from 'lucide-react';

// --- CONFIG ---
const API_KEY = import.meta.env.VITE_API_KEY || "YOUR_API_KEY";

// ==========================================
// 1. LOGIN MODAL (หน้าต่างล็อกอิน)
// ==========================================
const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // จำลองการโหลด 1 วินาที แล้วเข้าสู่ระบบ
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess(); 
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ฉากหลังเบลอ */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* กล่อง Login */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                    <X size={20} />
                </button>

                <div className="p-8 pt-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex bg-indigo-50 p-3 rounded-2xl mb-4 shadow-inner text-indigo-600">
                            <Clapperboard size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-1">ยินดีต้อนรับกลับมา!</h2>
                        <p className="text-slate-500 text-sm">ลงชื่อเข้าใช้เพื่อเริ่มสร้างสคริปต์</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 ml-1">อีเมล</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={18} /></div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" placeholder="admin@sekscript.com" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 ml-1">รหัสผ่าน</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={18} /></div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-900 font-medium" placeholder="••••••••" />
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.98]">
                            {isLoading ? <Sparkles className="animate-spin" size={20} /> : <>เข้าสู่ระบบ <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 2. LANDING PAGE (Pastel + New Text)
// ==========================================
const LandingPage = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-50 rounded-full blur-[80px] opacity-60"></div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Clapperboard size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            SEK<span className="text-indigo-600">SCRIPT</span> <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 tracking-wider font-bold align-middle">PRO</span>
          </span>
        </div>
        <button onClick={onLoginClick} className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-indigo-600 hover:shadow-lg transition-all">
            เข้าสู่ระบบ
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold mb-8 shadow-sm animate-fade-in">
            <Cpu size={14} className="text-indigo-500" /> AI-Powered Content Engine
        </div>

        <div className="flex flex-col items-center gap-2 mb-10">
            <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.4] py-1">
              ปฏิวัติการทำ Content Marketing ของคุณ
            </h1>
            <h1 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight leading-[1.4] py-1">
              ด้วย AI ที่เน้น Hook แข็งแกร่ง
            </h1>
            <h1 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight leading-[1.4] py-1">
              และ Call to Action ที่ชัดเจน
            </h1>
        </div>

        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          ยกระดับขีดความสามารถในการแข่งขัน ด้วยแพลตฟอร์ม <span className="text-slate-900 font-bold">SekScript Pro</span> ผสานเทคโนโลยี Generative AI เข้ากับหลักการตลาดสากล เพื่อสร้างสคริปต์ที่แม่นยำ สื่อสารตรงจุด และสร้างผลลัพธ์ที่วัดผลได้จริง
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-24">
            <button onClick={onLoginClick} className="w-full md:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 hover:scale-105">
                <Zap className="fill-white" /> เริ่มต้นใช้งานฟรี
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="mb-6 p-4 bg-indigo-50 rounded-2xl w-fit text-indigo-600 group-hover:scale-110 transition-transform"><Network size={32} /></div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Strategic Omni-Intelligence</h3>
                <p className="text-slate-500 text-sm leading-relaxed">ผสานพลัง <span className="text-indigo-600 font-semibold">Big Data Analytics</span> เข้ากับอัลกอริทึม Cross-Platform เพื่อวางกลยุทธ์คอนเทนต์ที่ครอบคลุมทุกช่องทาง สร้าง Impact สูงสุด</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="mb-6 p-4 bg-pink-50 rounded-2xl w-fit text-pink-600 group-hover:scale-110 transition-transform"><BrainCircuit size={32} /></div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Neuro-Cognitive Engine</h3>
                <p className="text-slate-500 text-sm leading-relaxed">นวัตกรรมที่รวมหลัก <span className="text-pink-600 font-semibold">Behavioral Psychology</span> และ Neuromarketing คัดสรร 'Power Words' ที่กระตุ้นสมองส่วนการตัดสินใจทันที</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1 group">
                <div className="mb-6 p-4 bg-emerald-50 rounded-2xl w-fit text-emerald-600 group-hover:scale-110 transition-transform"><Cpu size={32} /></div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Algorithmic Storytelling</h3>
                <p className="text-slate-500 text-sm leading-relaxed">ศิลปะการเล่าเรื่องที่ถูกวิศวกรรมใหม่ด้วย <span className="text-emerald-600 font-semibold">Algorithmic Logic</span> เพื่อ Hack การมองเห็น (Organic Reach) และเจาะทะลุ Noise ในตลาด</p>
            </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 text-center bg-slate-50">
        <p className="text-slate-400 text-xs tracking-wider uppercase font-medium">© 2025 SekScript Pro. Designed for Creators.</p>
      </footer>
    </div>
  );
};

// ==========================================
// 3. SCRIPT GENERATOR (Pastel + Full Features)
// ==========================================
const ScriptGenerator = ({ onLogout }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [globalLang, setGlobalLang] = useState('th'); 
  const [copyStatus, setCopyStatus] = useState({}); 
  
  const textareaRef = useRef(null);
  const abortControllerRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [topic]);

  // Pastel Themes with Strong Border/Shadow
  const THEMES = [
    { name: 'blue',    header: 'bg-blue-100',    bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-800',    shadow: 'shadow-blue-200',    icon: 'text-blue-600',    hover_border: 'hover:border-blue-300',    hover_bg: 'hover:bg-blue-50' },
    { name: 'rose',    header: 'bg-rose-100',    bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-800',    shadow: 'shadow-rose-200',    icon: 'text-rose-600',    hover_border: 'hover:border-rose-300',    hover_bg: 'hover:bg-rose-50' },
    { name: 'emerald', header: 'bg-emerald-100', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', shadow: 'shadow-emerald-200', icon: 'text-emerald-600', hover_border: 'hover:border-emerald-300', hover_bg: 'hover:bg-emerald-50' },
    { name: 'amber',   header: 'bg-amber-100',   bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   shadow: 'shadow-amber-200',   icon: 'text-amber-600',   hover_border: 'hover:border-amber-300',   hover_bg: 'hover:bg-amber-50' },
    { name: 'violet',  header: 'bg-violet-100',  bg: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-800',  shadow: 'shadow-violet-200',  icon: 'text-violet-600',  hover_border: 'hover:border-violet-300',  hover_bg: 'hover:bg-violet-50' },
    { name: 'cyan',    header: 'bg-cyan-100',    bg: 'bg-cyan-50',    border: 'border-cyan-200',    text: 'text-cyan-800',    shadow: 'shadow-cyan-200',    icon: 'text-cyan-600',    hover_border: 'hover:border-cyan-300',    hover_bg: 'hover:bg-cyan-50' },
    { name: 'orange',  header: 'bg-orange-100',  bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-800',  shadow: 'shadow-orange-200',  icon: 'text-orange-600',  hover_border: 'hover:border-orange-300',  hover_bg: 'hover:bg-orange-50' },
    { name: 'lime',    header: 'bg-lime-100',    bg: 'bg-lime-50',    border: 'border-lime-200',    text: 'text-lime-800',    shadow: 'shadow-lime-200',    icon: 'text-lime-600',    hover_border: 'hover:border-lime-300',    hover_bg: 'hover:bg-lime-50' },
    { name: 'fuchsia', header: 'bg-fuchsia-100', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-800', shadow: 'shadow-fuchsia-200', icon: 'text-fuchsia-600', hover_border: 'hover:border-fuchsia-300', hover_bg: 'hover:bg-fuchsia-50' },
    { name: 'indigo',  header: 'bg-indigo-100',  bg: 'bg-indigo-50',  border: 'border-indigo-200',  text: 'text-indigo-800',  shadow: 'shadow-indigo-200',  icon: 'text-indigo-600',  hover_border: 'hover:border-indigo-300',  hover_bg: 'hover:bg-indigo-50' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("กรุณาระบุหัวข้อที่ต้องการครับ");
    setLoading(true);
    setResults([]);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        ACT AS AN ELITE TEAM OF 3 EXPERTS (The "SekScript Intelligence Unit"):
        1. 🧠 STRATEGIC OMNI-INTELLIGENCE (Marketer)
        2. ❤️ NEURO-COGNITIVE ENGINE (Psychologist)
        3. 🎬 ALGORITHMIC STORYTELLING (Director)

        TOPIC: "${topic}"
        TASK: Create 10 Viral Short Video Scripts (Max 15s).
        OUTPUT JSON ARRAY ONLY (Include BOTH Thai and English):
        [
          {
            "title_th": "Thai Headline", "title_en": "English Headline",
            "hook_th": "Thai Hook", "hook_en": "English Hook",
            "description_th": "Thai Caption", "description_en": "English Caption",
            "hashtags": ["#tag1", "#tag2"],
            "voiceover_th": "Thai Voice", "voiceover_en": "English Voice",
            "shots": [
               { "time": "0-5s", "visual_th": "Thai Visual", "visual_en": "English Visual" },
               { "time": "5-10s", "visual_th": "Thai Visual", "visual_en": "English Visual" },
               { "time": "10-15s", "visual_th": "Thai Visual", "visual_en": "English Visual" }
            ]
          }
        ]
      `;

      const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] }, { signal });
      const text = result.response.text().replace(/```json|```/g, '').trim();
      setResults(JSON.parse(text));
      setExpandedIndex(0);

    } catch (error) {
      if (!error.message.includes('aborted')) console.error(error);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
      if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          setLoading(false);
      }
  };

  const handleClearInput = () => {
      setTopic('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleCopyInput = () => {
      navigator.clipboard.writeText(topic);
      alert("คัดลอกโจทย์เรียบร้อย");
  };

  const formatScriptContent = (item, language) => {
    const isTh = language === 'th';
    let content = `TITLE: ${isTh ? item.title_th : item.title_en}\n`;
    content += `CONCEPT: ${isTh ? item.hook_th : item.hook_en}\n`;
    content += `DESCRIPTION: ${isTh ? item.description_th : item.description_en}\n`;
    content += `HASHTAGS: ${item.hashtags.join(' ')}\n\n`;
    content += `--- VOICE OVER ---\n"${isTh ? item.voiceover_th : item.voiceover_en}"\n\n`;
    content += `--- VISUALS ---\n`;
    item.shots.forEach(shot => {
        content += `[${shot.time}] 🎥 ${isTh ? shot.visual_th : shot.visual_en}\n`;
    });
    return content;
  }

  const handleSaveFile = (item) => {
    const content = formatScriptContent(item, globalLang);
    const title = globalLang === 'th' ? item.title_th : item.title_en;
    const safeTitle = title.replace(/[^a-z0-9ก-๙\s-]/gi, '').trim().substring(0, 30);
    const fileName = `SEKSCRIPT_${safeTitle}.txt`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySpecific = (text, id) => {
      navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [id]: true });
      setTimeout(() => setCopyStatus({ ...copyStatus, [id]: false }), 2000);
  };

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
        setExpandedIndex(null);
    } else {
        setExpandedIndex(index);
        setTimeout(() => {
            const element = document.getElementById(`card-${index}`);
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 20;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 pb-20 text-slate-900">
      
      {/* Navbar */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-500 hover:text-red-600 hover:bg-red-50 font-bold text-xs shadow-sm border border-slate-200 transition-all">
            <LogOut size={14} /> LOGOUT
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                <Clapperboard className="text-indigo-600" size={28} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                SEK<span className="text-indigo-600">SCRIPT</span> PRO
            </h1>
        </div>
        <p className="text-slate-500 text-sm font-bold tracking-widest">INTELLIGENT SCRIPT GENERATION SYSTEM</p>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-xl shadow-indigo-100 relative group">
            <div className="relative p-2 flex flex-col gap-3">
                <div className="relative">
                    <textarea 
                        ref={textareaRef}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="ระบุหัวข้อคอนเทนต์ (พิมพ์ได้หลายบรรทัด)..."
                        className="w-full p-4 pr-24 text-lg bg-slate-50 text-slate-900 placeholder-slate-400 outline-none resize-none min-h-[100px] rounded-2xl border-2 border-transparent focus:border-indigo-100 focus:bg-white transition-all"
                        rows={1}
                    />
                    <div className="absolute top-3 right-3 flex gap-1">
                        <button onClick={handleCopyInput} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Copy size={18} /></button>
                        <button onClick={handleClearInput} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                </div>
                {loading ? (
                    <button onClick={handleStop} className="w-full bg-red-500 text-white border border-red-600 py-4 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        <StopCircle className="animate-pulse" /> หยุดการทำงาน (STOP)
                    </button>
                ) : (
                    <button onClick={handleGenerate} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98]">
                        <Zap className="fill-current" /> สร้างสคริปต์ (GENERATE)
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {results.map((item, index) => {
            const theme = THEMES[index % THEMES.length];
            const isOpen = expandedIndex === index;
            const displayTitle = globalLang === 'th' ? item.title_th : item.title_en;
            const displayHook = globalLang === 'th' ? item.hook_th : item.hook_en;
            const displayDesc = globalLang === 'th' ? item.description_th : item.description_en;
            const displayVoice = globalLang === 'th' ? item.voiceover_th : item.voiceover_en;
            const displayHashtags = item.hashtags.join(' ');

            return (
                <div 
                    id={`card-${index}`} 
                    key={index} 
                    className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border-2 ${isOpen ? `${theme.border} shadow-2xl ${theme.shadow}` : `border-white shadow-md ${theme.hover_border} ${theme.hover_bg} hover:shadow-lg hover:-translate-y-1`}`}
                >
                    
                    {/* Header */}
                    <div onClick={() => toggleAccordion(index)} className={`p-6 flex justify-between items-center cursor-pointer transition-all ${isOpen ? theme.header : 'bg-transparent'}`}>
                        <div className="flex items-center gap-4 w-full">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${isOpen ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                                {index + 1}
                            </span>
                            <span className={`font-bold text-lg md:text-xl break-words flex-1 pr-4 leading-tight ${isOpen ? theme.text.replace('800','900') : 'text-slate-800'}`}>
                                {displayTitle}
                            </span>
                        </div>
                        <div className={`p-2 rounded-full shrink-0 ${isOpen ? 'bg-white/30 text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                    </div>

                    {/* Body */}
                    {isOpen && (
                        <div className="p-6 space-y-6 bg-white">
                            
                            {/* Toolbar */}
                            <div className="flex flex-wrap justify-between items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                                    <button onClick={() => setGlobalLang('th')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${globalLang === 'th' ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>TH</button>
                                    <button onClick={() => setGlobalLang('en')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${globalLang === 'en' ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>EN</button>
                                </div>
                                <button onClick={() => handleSaveFile(item)} className="p-2.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 border border-slate-200 transition-all shadow-sm" title="Save">
                                    <Save size={20} />
                                </button>
                            </div>

                            {/* Concept Box */}
                            <div className={`rounded-2xl p-6 border-2 ${theme.border} ${theme.bg} relative group shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className={`font-black text-xs uppercase tracking-widest flex items-center gap-2 ${theme.text}`}>
                                        <Megaphone size={16} /> CONCEPT HOOK
                                    </h3>
                                    <button onClick={() => handleCopySpecific(displayHook, `hook-${index}`)} className="p-2 rounded-lg bg-white hover:bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-100 shadow-sm">
                                        {copyStatus[`hook-${index}`] ? <ClipboardCheck size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <div className={`text-xl font-bold leading-relaxed ${theme.text}`}>"{displayHook}"</div>
                            </div>

                            {/* Description */}
                            <div className="rounded-2xl p-6 border border-slate-100 bg-slate-50 relative group hover:border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-400"><AlignLeft size={16} /> DESCRIPTION</h3>
                                    <button onClick={() => handleCopySpecific(displayDesc, `desc-${index}`)} className="p-2 rounded-lg bg-white hover:bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-200 shadow-sm">
                                        {copyStatus[`desc-${index}`] ? <ClipboardCheck size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed text-sm">{displayDesc}</p>
                            </div>

                            {/* Hashtags */}
                            <div className="rounded-2xl p-6 border border-slate-100 bg-slate-50 relative group hover:border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-400"><Hash size={16} /> HASHTAGS</h3>
                                    <button onClick={() => handleCopySpecific(displayHashtags, `hash-${index}`)} className="p-2 rounded-lg bg-white hover:bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-200 shadow-sm">
                                        {copyStatus[`hash-${index}`] ? <ClipboardCheck size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.hashtags.map((tag, t) => (
                                        <span key={t} className={`px-3 py-1.5 rounded-lg text-xs font-bold bg-white border ${theme.border} ${theme.text} shadow-sm`}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Voice Over */}
                            <div className="rounded-2xl p-6 border border-slate-100 bg-slate-50 relative group hover:border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-400"><CassetteTape size={16} /> VOICE OVER</h3>
                                    <button onClick={() => handleCopySpecific(displayVoice, `voice-${index}`)} className="p-2 rounded-lg bg-white hover:bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-200 shadow-sm">
                                        {copyStatus[`voice-${index}`] ? <ClipboardCheck size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <p className="text-slate-800 text-lg font-medium leading-relaxed italic">"{displayVoice}"</p>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-4 relative pl-2 pt-2">
                                <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                                {item.shots.map((shot, s) => {
                                    const displayVisual = globalLang === 'th' ? shot.visual_th : shot.visual_en;
                                    return (
                                        <div key={s} className="relative flex gap-4 items-center">
                                            <div className={`w-14 h-8 rounded-lg border-2 border-white flex items-center justify-center shrink-0 z-10 font-bold text-[10px] shadow-md ${theme.header} text-white`}>
                                                {shot.time}
                                            </div>
                                            <div className="flex-1 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-0.5 ${theme.icon}`}><Eye size={18} /></div>
                                                    <p className="text-sm text-slate-700 font-bold leading-snug">{displayVisual}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 3. APP ROOT
// ==========================================
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
        {showLoginModal && (
            <LoginModal 
                onClose={() => setShowLoginModal(false)} 
                onLoginSuccess={() => {
                    setIsLoggedIn(true);
                    setShowLoginModal(false);
                }} 
            />
        )}

        {!isLoggedIn ? (
            <LandingPage onLoginClick={() => setShowLoginModal(true)} />
        ) : (
            <ScriptGenerator onLogout={() => setIsLoggedIn(false)} />
        )}
    </>
  );
};

export default App;