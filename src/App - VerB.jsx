import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
    Sparkles, Zap, Video, Mic, 
    ChevronDown, ChevronUp, Copy, FileText, 
    Clapperboard, ClipboardCheck, 
    Megaphone, AlignLeft, CassetteTape, Eye, Hash, Save,
    LogOut, Play, BrainCircuit, TrendingUp, Layers, 
    Cpu, Target, MonitorPlay, StopCircle, Trash2, ShieldCheck, Network,
    Coins, PlusCircle
} from 'lucide-react';

// --- CONFIG ---
// ใส่ API Key ของพี่ตรงนี้ หรือใช้ไฟล์ .env ตามเดิมก็ได้
const API_KEY = import.meta.env.VITE_API_KEY || "YOUR_API_KEY";
const COST_PER_GEN = 5; 

// ==========================================
// 1. LANDING PAGE (หน้าร้าน + ปุ่ม Google Login)
// ==========================================
const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 selection:bg-indigo-500 selection:text-white overflow-hidden relative flex flex-col">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
            <Clapperboard className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            SEK<span className="text-indigo-400">SCRIPT</span> <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 tracking-wider font-medium">PRO</span>
          </span>
        </div>
        <button onClick={onLogin} className="px-6 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">
            เข้าสู่ระบบ
        </button>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium mb-8 backdrop-blur-md">
            <Sparkles size={12} className="text-indigo-400" /> AI Intelligence Unit
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
          ปฏิวัติวงการคอนเทนต์ <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
            ด้วยปัญญาประดิษฐ์ชั้นสูง
          </span>
        </h1>

        <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            ระบบสร้างสคริปต์วิดีโอไวรัลด้วย AI 3 ผู้เชี่ยวชาญ (นักการตลาด, นักจิตวิทยา, ผู้กำกับ) 
            เพื่อผลลัพธ์ที่แม่นยำและทรงพลังที่สุด
        </p>

        {/* Google Login Button (พระเอกของเรา) */}
        <button 
            onClick={onLogin}
            className="group relative bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 flex items-center gap-3"
        >
            {/* Google Icon SVG */}
            <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
        </button>

      </main>
    </div>
  );
};

// ==========================================
// 2. SCRIPT GENERATOR (Ver. B Engine + Ver. A Credits)
// ==========================================
const ScriptGenerator = ({ onLogout }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [credits, setCredits] = useState(50); // เริ่มต้น 50 เครดิต (Ver. A Feature)
  const [showTopUp, setShowTopUp] = useState(false);
  
  const textareaRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auto-resize Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [topic]);

  // THEMES (Pastel with Strong Border/Shadow - พี่ชอบอันนี้)
  const THEMES = [
    { header: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-800', shadow: 'shadow-blue-200', icon: 'text-blue-600' },
    { header: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-800', shadow: 'shadow-rose-200', icon: 'text-rose-600' },
    { header: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-800', shadow: 'shadow-emerald-200', icon: 'text-emerald-600' },
    { header: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-800', shadow: 'shadow-amber-200', icon: 'text-amber-600' },
    { header: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-800', shadow: 'shadow-violet-200', icon: 'text-violet-600' },
  ];

  // --- ENGINE Ver. B (3 Experts Logic) ---
  const handleGenerate = async () => {
    if (!topic.trim()) return alert("กรุณาระบุหัวข้อที่ต้องการครับ");
    if (credits < COST_PER_GEN) { setShowTopUp(true); return; }

    setLoading(true);
    setResults([]);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // *** SUPER PROMPT (Ver. B) ***
      const prompt = `
        ACT AS AN ELITE TEAM OF 3 EXPERTS:
        1. 🧠 STRATEGIC MARKETER (Focus: Viral Reach & Algorithm)
        2. ❤️ NEURO-PSYCHOLOGIST (Focus: Emotional Triggers)
        3. 🎬 FILM DIRECTOR (Focus: Visual Storytelling)

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
      setCredits(prev => prev - COST_PER_GEN); // ตัดเครดิต (Ver. A Logic)

    } catch (error) {
      if (!error.message.includes('aborted')) console.error(error);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 pb-20 text-slate-900">
      
      {/* Navbar + Credit System (Ver. A Feature) */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4 items-center gap-4">
        <div 
            className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2 shadow-sm cursor-pointer hover:bg-slate-50 transition-all" 
            onClick={() => setShowTopUp(true)}
        >
            <div className="bg-yellow-400 p-1 rounded-full"><Coins size={12} className="text-yellow-900" /></div>
            {credits} Credits
        </div>

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
                         <button onClick={() => {setTopic('');}} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                </div>
                {loading ? (
                    <button onClick={() => { if(abortControllerRef.current) abortControllerRef.current.abort(); setLoading(false); }} className="w-full bg-red-500 text-white border border-red-600 py-4 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg">
                        <StopCircle className="animate-pulse" /> STOP
                    </button>
                ) : (
                    <button onClick={handleGenerate} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98]">
                        <Zap className="fill-current" /> GENERATE (Ver.B Engine)
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

            return (
                <div id={`card-${index}`} key={index} className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white border-2 ${isOpen ? `${theme.border} shadow-2xl ${theme.shadow}` : `border-white shadow-md hover:shadow-lg hover:-translate-y-1`}`}>
                    
                    <div onClick={() => toggleAccordion(index)} className={`p-6 flex justify-between items-center cursor-pointer transition-all ${isOpen ? theme.header : 'bg-transparent'}`}>
                        <div className="flex items-center gap-4 w-full">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${isOpen ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                                {index + 1}
                            </span>
                            <span className={`font-bold text-lg md:text-xl break-words flex-1 pr-4 leading-tight ${isOpen ? theme.text.replace('800','900') : 'text-slate-800'}`}>
                                {item.title_th}
                            </span>
                        </div>
                        <div className={`p-2 rounded-full shrink-0 ${isOpen ? 'bg-white/30 text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                    </div>

                    {isOpen && (
                        <div className="p-6 space-y-6 bg-white">
                            {/* Content Details (Ver.B Output) */}
                            <div className={`rounded-2xl p-6 border-2 ${theme.border} bg-white shadow-sm`}>
                                <div className="flex justify-between mb-4"><h3 className={`font-black text-xs uppercase ${theme.text}`}><Megaphone size={16} /> HOOK</h3></div>
                                <div className="text-xl font-bold">{item.hook_th}</div>
                            </div>
                            
                             <div className="rounded-2xl p-6 border border-slate-100 bg-slate-50">
                                <div className="flex justify-between mb-4"><h3 className="font-black text-xs uppercase text-slate-400"><CassetteTape size={16} /> VOICE OVER</h3></div>
                                <p className="text-lg font-medium italic text-slate-800">"{item.voiceover_th}"</p>
                            </div>

                            <div className="space-y-4 relative pl-2 pt-2">
                                <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                                {item.shots.map((shot, s) => (
                                    <div key={s} className="relative flex gap-4 items-center">
                                        <div className={`w-14 h-8 rounded-lg border-2 border-white flex items-center justify-center shrink-0 z-10 font-bold text-[10px] shadow-md ${theme.header} text-white`}>{shot.time}</div>
                                        <div className="flex-1 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-0.5 ${theme.icon}`}><Eye size={18} /></div>
                                                <p className="text-sm text-slate-700 font-bold leading-snug">{shot.visual_th}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        })}
      </div>

      {/* Top Up Modal */}
      {showTopUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowTopUp(false)}></div>
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"><Coins size={32} /></div>
                  <h2 className="text-xl font-black text-slate-900 mb-2">เติมเครดิต</h2>
                  <button onClick={() => { setCredits(prev => prev + 50); setShowTopUp(false); }} className="w-full py-3 rounded-xl bg-yellow-400 text-slate-900 font-bold hover:bg-yellow-500 transition-all shadow-lg mb-3">เติม 50 เครดิต</button>
                  <button onClick={() => setShowTopUp(false)} className="text-slate-400 text-sm hover:text-slate-600">ยกเลิก</button>
              </div>
          </div>
      )}
    </div>
  );
};

// ==========================================
// 3. APP ROOT (Login Logic)
// ==========================================
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 LOGIN FUNCTION: กดปุ๊บ เข้าปั๊บ (Bypass Network Issues)
  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <>
        {!isLoggedIn ? (
            <LandingPage onLogin={handleLogin} />
        ) : (
            <ScriptGenerator onLogout={() => setIsLoggedIn(false)} />
        )}
    </>
  );
};

export default App;