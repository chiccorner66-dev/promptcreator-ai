import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
    Sparkles, Zap, Video, Mic, 
    ChevronDown, ChevronUp, Copy, FileText, 
    Clapperboard, ClipboardCheck, 
    Megaphone, AlignLeft, CassetteTape, Eye, Hash, Save,
    LogOut, Play, BrainCircuit, TrendingUp, Layers, 
    Cpu, Target, MonitorPlay, StopCircle, Trash2, ShieldCheck, Network,
    Coins, PlusCircle, User, Globe
} from 'lucide-react';

// --- FIREBASE IMPORTS (ของจริง) ---
import { auth, db } from './firebase'; 
import { 
    signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup 
} from 'firebase/auth';
import { 
    doc, getDoc, setDoc, updateDoc, onSnapshot 
} from 'firebase/firestore';

// --- CONFIG ---
const API_KEY = import.meta.env.VITE_API_KEY || "YOUR_API_KEY";
const COST_PER_GEN = 5; 

// ==========================================
// 1. LANDING PAGE (Google Popup Login)
// ==========================================
const LandingPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // ฟังก์ชันเรียก Google Popup ของจริง
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        
        // เช็ค/สร้าง User ใน Database
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            // ถ้าเป็น User ใหม่ แจก 50 เครดิต
            await setDoc(userRef, { 
                credits: 50, 
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                joinedAt: new Date() 
            });
        }
    } catch (error) {
        console.error("Login Failed:", error);
        alert("การเข้าสู่ระบบล้มเหลว: " + error.message);
    } finally {
        setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative flex flex-col">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-50 rounded-full blur-[80px] opacity-60"></div>
      </div>

      <nav className="max-w-7xl mx-auto w-full px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg"><Clapperboard size={24} /></div>
          <span className="text-2xl font-black tracking-tight text-slate-900">SEK<span className="text-indigo-600">SCRIPT</span> PRO</span>
        </div>
        <button 
            onClick={handleGoogleLogin} 
            disabled={isLoggingIn}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-70"
        >
            {isLoggingIn ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบ'}
        </button>
      </nav>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 pb-20">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold mb-8 shadow-sm">
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

        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            ยกระดับขีดความสามารถในการแข่งขัน ด้วยแพลตฟอร์ม <span className="text-slate-900 font-bold">SekScript Pro</span> ผสานเทคโนโลยี Generative AI เข้ากับหลักการตลาดสากล เพื่อสร้างสคริปต์ที่แม่นยำ สื่อสารตรงจุด และสร้างผลลัพธ์ที่วัดผลได้จริง
        </p>

        {/* Google Login Button (Big) */}
        <button 
            onClick={handleGoogleLogin} 
            disabled={isLoggingIn}
            className="group relative bg-white border-2 border-slate-100 text-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:border-indigo-200 transition-all flex items-center gap-3 disabled:opacity-70"
        >
            {isLoggingIn ? (
                <Sparkles className="animate-spin text-indigo-600" /> 
            ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            )}
            Sign in with Google
        </button>

      </main>
    </div>
  );
};

// ==========================================
// 2. SCRIPT GENERATOR (Real Logic)
// ==========================================
const ScriptGenerator = ({ user, onLogout }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [globalLang, setGlobalLang] = useState('th'); 
  const [copyStatus, setCopyStatus] = useState({}); 
  const [credits, setCredits] = useState(0); 
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const textareaRef = useRef(null);
  const profileMenuRef = useRef(null);

  // --- Realtime Credits ---
  useEffect(() => {
    if (user?.uid) {
        const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
            if (doc.exists()) setCredits(doc.data().credits || 0);
        });
        return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [topic]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const THEMES = [
     { name: 'cyan',    main: 'bg-cyan-500',    light: 'bg-cyan-50',    border: 'border-cyan-200',    text: 'text-cyan-900' },
     { name: 'rose',    main: 'bg-rose-500',    light: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-900' },
     { name: 'green',   main: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900' },
     { name: 'amber',   main: 'bg-amber-500',   light: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-900' },
     { name: 'violet',  main: 'bg-violet-500',  light: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-900' },
     { name: 'blue',    main: 'bg-blue-500',    light: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-900' },
     { name: 'orange',  main: 'bg-orange-500',  light: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-900' },
     { name: 'lime',    main: 'bg-lime-500',    light: 'bg-lime-50',    border: 'border-lime-200',    text: 'text-lime-900' },
     { name: 'fuchsia', main: 'bg-fuchsia-500', light: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-900' },
     { name: 'indigo',  main: 'bg-indigo-500',  light: 'bg-indigo-50',  border: 'border-indigo-200',  text: 'text-indigo-900' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("กรุณาระบุหัวข้อครับ");
    if (credits < COST_PER_GEN) return alert("เครดิตไม่พอครับ (ลองเติมเงินจำลองดู)");

    setLoading(true);
    setResults([]);
    
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

      const result = await model.generateContent(prompt);
      const text = result.response.text().replace(/```json|```/g, '').trim();
      setResults(JSON.parse(text));
      
      // ตัดเครดิตจริง
      if (user?.uid) {
        await updateDoc(doc(db, "users", user.uid), { credits: credits - COST_PER_GEN });
      }

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopySpecific = (text, id) => {
      navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [id]: true });
      setTimeout(() => setCopyStatus({ ...copyStatus, [id]: false }), 2000);
  };

  const handleSaveFile = (item) => {
      const content = `TITLE: ${item.title_th}\nHOOK: ${item.hook_th}\nVOICE OVER: "${item.voiceover_th}"\n\nSHOTS:\n${item.shots.map(s => `[${s.time}] ${s.visual_th}`).join('\n')}`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `SCRIPT_${item.title_th.substring(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const toggleAccordion = (index) => { setExpandedIndex(expandedIndex === index ? null : index); };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 pb-20 text-slate-900">
      
      {/* Navbar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8 relative z-20">
         <div className="font-black text-xl tracking-tight flex items-center gap-2 text-slate-800">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg"><Clapperboard size={20} /></div> 
            SEK<span className="text-indigo-600">SCRIPT</span> PRO
         </div>

         {/* Profile Avatar */}
         <div className="relative" ref={profileMenuRef}>
            <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="rounded-full border-2 border-white shadow-sm hover:shadow-md transition-all overflow-hidden w-10 h-10 focus:outline-none"
            >
                {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-indigo-100 text-indigo-600 flex items-center justify-center"><User size={20} /></div>
                )}
            </button>

            {/* Profile Popup */}
            {showProfileMenu && (
                <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                    <div className="flex justify-center mb-3">
                        <div className="flex bg-slate-50 rounded-full p-1 border border-slate-100">
                            <button onClick={() => setGlobalLang('th')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${globalLang === 'th' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'}`}>TH</button>
                            <button onClick={() => setGlobalLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${globalLang === 'en' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'}`}>EN</button>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-50 mx-auto mb-2" />
                        <h3 className="font-bold text-slate-900 text-sm">{user.displayName}</h3>
                        <p className="text-[10px] text-slate-400 truncate px-2">{user.email}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1.5 text-yellow-700 text-xs font-bold"><Coins size={14} /> เครดิตคงเหลือ</div>
                        <div className="text-xl font-black text-yellow-800">{credits}</div>
                    </div>
                    <div className="space-y-1.5">
                        <button onClick={() => {
                             const userRef = doc(db, "users", user.uid);
                             updateDoc(userRef, { credits: credits + 50 });
                             alert('เติมเงินสำเร็จ! (จำลอง)');
                        }} className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"><PlusCircle size={14} /> เติมเครดิต</button>
                        <button onClick={onLogout} className="w-full py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs transition-all flex items-center justify-center gap-1.5"><LogOut size={14} /> ออกจากระบบ</button>
                    </div>
                </div>
            )}
         </div>
      </div>

      {/* Header & Input */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">INTELLIGENT SCRIPT ENGINE</h1>
        <p className="text-slate-500 text-sm font-medium">สร้างสคริปต์ไวรัลด้วย AI 3 ผู้เชี่ยวชาญ</p>
      </div>
      <div className="max-w-3xl mx-auto mb-10">
         <div className="relative bg-white border border-slate-200 rounded-3xl p-3 shadow-xl shadow-indigo-50">
            <textarea 
                value={topic} onChange={(e) => setTopic(e.target.value)}
                placeholder="ระบุหัวข้อคอนเทนต์ที่ต้องการ..."
                className="w-full p-4 pr-12 text-lg bg-slate-50 text-slate-900 rounded-2xl border-2 border-transparent focus:border-indigo-100 focus:bg-white transition-all resize-none min-h-[100px] outline-none"
            />
            <div className="absolute top-3 right-3 flex gap-1">
                <button onClick={() => setTopic('')} className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-all"><Trash2 size={18} /></button>
            </div>
            {loading ? (
                <button className="w-full mt-2 bg-slate-200 text-slate-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-wait"><Sparkles className="animate-spin" /> กำลังระดมสมอง...</button>
            ) : (
                <button onClick={handleGenerate} className="w-full mt-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98]"><Zap className="fill-current" /> สร้างสคริปต์ (-{COST_PER_GEN} Credits)</button>
            )}
         </div>
      </div>

      {/* Results */}
      <div className="space-y-5 max-w-3xl mx-auto">
        {results.map((item, index) => {
            const theme = THEMES[index % 10];
            const isOpen = expandedIndex === index;
            const displayTitle = globalLang === 'th' ? item.title_th : item.title_en;
            
            return (
                <div key={index} onClick={() => toggleAccordion(index)} className={`rounded-2xl overflow-hidden transition-all bg-white border-2 cursor-pointer ${isOpen ? theme.border + ' shadow-xl' : 'border-white shadow-md hover:shadow-lg'}`}>
                    <div className={`p-5 flex justify-between items-center ${isOpen ? theme.light : 'bg-white'}`}>
                        <div className="flex items-center gap-4">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${isOpen ? 'bg-white ' + theme.text : 'bg-slate-100 text-slate-500'}`}>{index+1}</span>
                            <span className={`font-bold text-lg md:text-xl ${isOpen ? theme.text : 'text-slate-800'}`}>{displayTitle}</span>
                        </div>
                        {isOpen ? <ChevronUp className={theme.text} /> : <ChevronDown className="text-slate-400" />}
                    </div>
                    {isOpen && (
                        <div className="p-6 bg-white border-t border-slate-50 cursor-default">
                           <div className="flex justify-end gap-2 mb-6">
                                <button onClick={(e) => {e.stopPropagation(); handleSaveFile(item)}} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"><FileText size={14} /> บันทึก</button>
                                <button onClick={(e) => {e.stopPropagation(); handleCopySpecific(JSON.stringify(item), `all-${index}`)}} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">{copyStatus[`all-${index}`] ? <ClipboardCheck size={14} /> : <Copy size={14} />} คัดลอก</button>
                           </div>

                           {/* Hook */}
                           <div className={`p-5 rounded-2xl ${theme.light} border ${theme.border} mb-6`}>
                                <div className={`text-xs font-bold uppercase mb-2 flex items-center gap-2 ${theme.text}`}><Megaphone size={14}/> Concept Hook</div>
                                <div className={`text-lg font-bold ${theme.text}`}>"{globalLang === 'th' ? item.hook_th : item.hook_en}"</div>
                           </div>

                           {/* Description */}
                           <div className="mb-6">
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2"><AlignLeft size={14}/> Description</div>
                                <p className="text-sm text-slate-600 leading-relaxed">{globalLang === 'th' ? item.description_th : item.description_en}</p>
                           </div>

                           {/* Hashtags */}
                           <div className="mb-6">
                                <div className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2"><Hash size={14}/> Hashtags</div>
                                <div className="flex flex-wrap gap-2">{item.hashtags.map((tag, t) => (<span key={t} className="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs border border-slate-200 font-medium">{tag}</span>))}</div>
                           </div>

                           {/* Voice Over */}
                           <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 mb-8">
                                <div className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2"><CassetteTape size={14}/> Voice Over</div>
                                <p className="text-base font-medium text-slate-800 italic">"{globalLang === 'th' ? item.voiceover_th : item.voiceover_en}"</p>
                           </div>

                           {/* Timeline (Black Pills) */}
                           <div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><Video size={14}/> Scenes</div>
                                <div className="space-y-4 relative pl-4">
                                    <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                                    {item.shots.map((shot, s) => {
                                         const displayVisual = globalLang === 'th' ? shot.visual_th : shot.visual_en;
                                         return (
                                            <div key={s} className="relative flex items-center gap-4">
                                                <div className="w-14 h-7 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md shrink-0 z-10">{shot.time}</div>
                                                <div className="flex-1 bg-white border border-slate-100 p-3 rounded-xl shadow-sm flex items-center gap-3"><Eye size={16} className="text-slate-400 shrink-0" /><span className="text-sm text-slate-700 font-medium">{displayVisual}</span></div>
                                            </div>
                                         )
                                    })}
                                </div>
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
// 4. APP ROOT
// ==========================================
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => { await signOut(auth); };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return !user ? <LandingPage onLoginSuccess={() => {}} /> : <ScriptGenerator user={user} onLogout={handleLogout} />;
};

export default App;