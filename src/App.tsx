import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, 
  MapPin, 
  Calendar, 
  Users, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Info,
  Clock,
  ArrowRight,
  User,
  Heart,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { 
  CONCERT_INFO, 
  PERFORMERS, 
  SONGS, 
  STAFF_CREDITS, 
  TIANZIFANG_INTRO,
  Song,
  Performer
} from "./data";

export default function App() {
  // Navigation states & filter states
  const [activeTab, setActiveTab] = useState<"program" | "performers" | "tianzifang">("program");
  const [songFilter, setSongFilter] = useState<string>("all");
  
  // Audio playing simulation
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playingBackstory, setPlayingBackstory] = useState<Song | null>(null);

  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "model" | "system"; text: string }>>([
    {
      role: "model",
      text: "【琴音墨客】：尊贵的客官，幸会！吾乃‘琴音墨客’，在此静候您的雅鉴。此番‘弓吟弦歌五十春’胡琴演奏会聚首四位国乐名家，于田子坊艺术中心同台献艺。您对哪首曲目（如阿炳不朽之作《二泉映月》、或者是跨界惊艳的《All of Me》）或演奏家心生好奇？且告知于我，吾自当为您抚弦细说。"
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Unique song filters
  const filterCategories = ["all", "二胡齐奏", "二胡独奏", "低音二胡独奏", "板胡独奏"];

  const filteredSongs = SONGS.filter(song => {
    if (songFilter === "all") return true;
    if (songFilter === "二胡齐奏") return song.type === "二胡齐奏";
    if (songFilter === "二胡独奏") return song.type === "二胡独奏";
    if (songFilter === "低音二胡独奏") return song.type === "低音二胡独奏";
    if (songFilter === "板胡独奏") return song.type === "板胡独奏" || song.type.includes("板胡");
    return true;
  });

  // Handle playing simulation
  const handlePlaySong = (song: Song) => {
    if (playingSongId === song.id) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(song.id);
      // Automatically prompt the user to ask about this song in AI chat if they want
      const addSystemNotify = setTimeout(() => {
        setIsChatOpen(true);
        askAIChat(`请为我细细品鉴《${song.title}》这首曲子，它有何艺术特色和文化内涵？`);
      }, 800);
    }
  };

  // AI chat call
  const askAIChat = async (question: string) => {
    if (!question.trim()) return;

    // Add user message to UI
    const newMessages = [...chatMessages, { role: "user" as const, text: question }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: newMessages.slice(1, -1) // Exclude initial welcome and current message
        })
      });

      const data = await response.json();
      if (data.text) {
        setChatMessages(prev => [...prev, { role: "model" as const, text: data.text }]);
      } else {
        setChatMessages(prev => [...prev, { role: "model" as const, text: "【琴音墨客】：弦音微乱，未能参透主人的心意。不知是否可换个问题，或者请您检查后台配置？" }]);
      }
    } catch (e) {
      console.error(e);
      setChatMessages(prev => [...prev, { role: "model" as const, text: "【琴音墨客】：山高路远，琴音受阻。请确保您的网络通畅，并确认 GEMINI_API_KEY 已于后台正确配置。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#2C2621] font-sans antialiased relative selection:bg-[#8A1E1E] selection:text-white overflow-x-hidden">
      
      {/* Decorative Traditional Border Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#8A1E1E] z-50" />
      
      {/* Top Banner & Header */}
      <header className="relative w-full py-12 md:py-20 px-4 text-center border-b border-[#E3DEC3] bg-radial from-[#FDFBF7] to-[#FAF7F0] overflow-hidden">
        {/* Abstract Background Ink Splash/Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Sijun Seal Logo Accent */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-[#8A1E1E] text-white flex items-center justify-center font-serif text-xl md:text-2xl font-bold tracking-widest rounded-sm shadow-xl border-2 border-[#D4AF37] mb-6 relative"
            style={{ writingMode: "vertical-rl" }}
            id="site-seal"
          >
            四君胡琴
          </motion.div>

          {/* Majestic Calligraphy Titles */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-serif text-[#8A1E1E] tracking-[0.25em] font-medium mb-2 flex items-center gap-2 md:gap-3"
          >
            <span>弓吟弦歌五十春</span>
            <span className="text-[#B89047] text-sm md:text-lg">•</span>
            <span>金秋雅集田子坊</span>
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-[#2C2621] mt-3 mb-6 relative drop-shadow-sm"
          >
            {CONCERT_INFO.title}
          </motion.h1>

          {/* Divider with gold decorative pattern */}
          <div className="flex items-center gap-4 w-full max-w-md my-4">
            <div className="h-[1px] bg-[#E3DEC3] flex-grow" />
            <div className="w-3 h-3 rotate-45 border-2 border-[#B89047] bg-[#FAF7F0]" />
            <div className="h-[1px] bg-[#E3DEC3] flex-grow" />
          </div>

          {/* Quick Info Box (Date, Time, Location) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-[#5C5246] tracking-wide"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F3ECE0] rounded-sm border border-[#E3DEC3]">
              <Calendar className="w-4 h-4 text-[#8A1E1E]" />
              <span>{CONCERT_INFO.time}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F3ECE0] rounded-sm border border-[#E3DEC3] text-left">
              <MapPin className="w-4 h-4 text-[#8A1E1E] flex-shrink-0" />
              <span>{CONCERT_INFO.location}</span>
            </div>
          </motion.div>

          {/* Unit Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#8C7E6C] border-t border-[#E3DEC3]/50 pt-6">
            <div>指导：<span className="text-[#4A3E31] font-medium">{CONCERT_INFO.guidanceUnit[0]}</span></div>
            <div>主办：<span className="text-[#4A3E31] font-medium">{CONCERT_INFO.hostUnit.join(" / ")}</span></div>
            <div>协办：<span className="text-[#4A3E31] font-medium">{CONCERT_INFO.coorganizerUnit[0]}</span></div>
          </div>

        </div>
      </header>

      {/* Main Content & Tabs */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16 relative">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 border-b border-[#E3DEC3]" id="tab-navigation">
          <div className="flex gap-4 md:gap-12">
            {[
              { id: "program", label: "胡琴节目单", icon: Music },
              { id: "performers", label: "演职大师风采", icon: Users },
              { id: "tianzifang", label: "相约田子坊", icon: Compass }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-3 md:px-6 text-sm md:text-base font-serif font-medium tracking-widest relative transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "text-[#8A1E1E] scale-105" 
                    : "text-[#8C7E6C] hover:text-[#5C5246]"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#8A1E1E]" : "text-[#8C7E6C]"}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8A1E1E]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PROGRAM LIST */}
          {activeTab === "program" && (
            <motion.div
              key="program-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="program-section"
            >
              
              {/* Introduction Quote */}
              <div className="max-w-3xl mx-auto text-center font-serif text-[#5C5246] italic leading-relaxed mb-10 px-4">
                “五十年风雨弓弦，半世纪国乐春华。四君雅聚，携古曲民风，和以异域爵士，邀您共话金秋乐事。”
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 bg-[#F3ECE0]/50 p-2 rounded-lg border border-[#E3DEC3]/60 max-w-2xl mx-auto">
                {filterCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSongFilter(cat)}
                    className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm transition-all duration-200 cursor-pointer ${
                      songFilter === cat
                        ? "bg-[#8A1E1E] text-white shadow-sm"
                        : "text-[#5C5246] hover:bg-[#F3ECE0] hover:text-[#2C2621]"
                    }`}
                  >
                    {cat === "all" ? "全部乐章" : cat}
                  </button>
                ))}
              </div>

              {/* Songs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="songs-grid">
                {filteredSongs.map((song, index) => {
                  const isPlaying = playingSongId === song.id;
                  return (
                    <motion.div
                      key={song.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className={`p-6 rounded-lg border transition-all duration-300 relative overflow-hidden bg-white hover:shadow-md ${
                        isPlaying 
                          ? "border-[#8A1E1E] ring-1 ring-[#8A1E1E]/50 shadow-md" 
                          : "border-[#E3DEC3]/80 hover:border-[#B89047]"
                      }`}
                    >
                      {/* Left vertical visual accent */}
                      <div className={`absolute top-0 left-0 bottom-0 w-[4px] ${isPlaying ? "bg-[#8A1E1E]" : "bg-[#E3DEC3]/50"}`} />

                      {/* Top metadata */}
                      <div className="flex justify-between items-start gap-2 mb-3 pl-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#B89047] bg-[#FAF6EE] px-2.5 py-0.5 rounded-full border border-[#E3DEC3]">
                          第 {song.id} 幕 • {song.type}
                        </span>
                        {song.tag && (
                          <span className="text-[10px] text-white bg-[#8A1E1E]/90 px-2 py-0.5 rounded-sm font-serif">
                            {song.tag}
                          </span>
                        )}
                      </div>

                      {/* Song Title & Composer */}
                      <div className="pl-2 mb-4">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C2621] flex items-center gap-2">
                          《{song.title}》
                        </h3>
                        <p className="text-xs text-[#8C7E6C] mt-1">
                          {song.composer}
                        </p>
                      </div>

                      {/* Performer info */}
                      <div className="pl-2 py-2.5 px-3 bg-[#FAF7F0] rounded border border-[#E3DEC3]/60 mb-4 flex items-center justify-between text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#8A1E1E]" />
                          <span className="text-[#5C5246]">演奏家：</span>
                          <span className="font-medium text-[#2C2621]">{song.performer}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs md:text-sm text-[#5C5246] pl-2 leading-relaxed mb-6">
                        {song.description}
                      </p>

                      {/* Actions footer */}
                      <div className="flex flex-wrap items-center gap-3 pl-2 border-t border-[#E3DEC3]/40 pt-4">
                        {/* Audio simulate button */}
                        <button
                          onClick={() => handlePlaySong(song)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-serif tracking-widest transition-all duration-300 ${
                            isPlaying 
                              ? "bg-[#8A1E1E] text-white" 
                              : "bg-[#FAF6EE] border border-[#E3DEC3] text-[#8A1E1E] hover:bg-[#8A1E1E] hover:text-white hover:border-[#8A1E1E]"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                              正在品鉴中
                            </>
                          ) : (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              品鉴琴音
                            </>
                          )}
                        </button>

                        {/* Backstory toggle */}
                        <button
                          onClick={() => setPlayingBackstory(playingBackstory?.id === song.id ? null : song)}
                          className="flex items-center gap-1 text-xs text-[#B89047] hover:text-[#8A1E1E] font-medium transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{playingBackstory?.id === song.id ? "收起典故" : "曲目典故"}</span>
                        </button>
                      </div>

                      {/* Simulated interactive sound waveform when playing */}
                      {isPlaying && (
                        <div className="absolute right-4 bottom-4 flex items-end gap-0.5 h-8 select-none pointer-events-none">
                          {[0.7, 1.2, 0.4, 0.9, 1.5, 0.8, 1.3, 0.5, 1.1, 0.6].map((speed, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: ["10%", "100%", "10%"] }}
                              transition={{
                                duration: speed,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-0.5 bg-[#8A1E1E]"
                              style={{ height: "100%" }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Collapsible Story Scroll Panel */}
                      <AnimatePresence>
                        {playingBackstory?.id === song.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-4 bg-[#FDFBF7] rounded border border-[#E3DEC3]/80 p-4 pl-6 relative"
                          >
                            <div className="absolute left-2 top-0 bottom-0 w-[1px] border-l border-dashed border-[#B89047]" />
                            <h4 className="text-sm font-serif font-bold text-[#8A1E1E] mb-2 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
                              乐章典故
                            </h4>
                            <p className="text-xs text-[#5C5246] leading-relaxed italic whitespace-pre-line">
                              {song.backstory}
                            </p>
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => {
                                  setIsChatOpen(true);
                                  askAIChat(`我想了解关于《${song.title}》更深入的演绎背景，可以再给我讲讲吗？`);
                                }}
                                className="flex items-center gap-1 text-[10px] text-[#8A1E1E] hover:underline font-medium"
                              >
                                咨询 AI 向导 <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom small orchestra companion info banner */}
              <div className="bg-[#F3ECE0]/50 border border-[#E3DEC3] rounded-lg p-6 max-w-4xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-serif font-bold text-[#2C2621] mb-3 flex justify-center items-center gap-2">
                  <Music className="w-5 h-5 text-[#8A1E1E]" />
                  小乐队伴奏团队
                </h3>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-4 text-sm text-[#5C5246]">
                  {CONCERT_INFO.orchestra.map((inst, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-[#8A1E1E] font-medium font-serif">{inst.role}</span>
                      <span className="text-[#8C7E6C]">•</span>
                      <span className="font-medium text-[#2C2621]">{inst.names.join("、")}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#8C7E6C] mt-6 border-t border-[#E3DEC3]/50 pt-4">
                  * 备注：出场顺序以年少者为先，年长者为后顺龄排列，不分先后。
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: PERFORMERS BIO */}
          {activeTab === "performers" && (
            <motion.div
              key="performers-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="performers-section"
            >
              
              {/* Headings */}
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2621] mb-2">
                  演职大师风采
                </h2>
                <div className="w-12 h-1 bg-[#8A1E1E] mx-auto mb-4" />
                <p className="text-sm text-[#5C5246]">
                  四位顶级演奏大家，毕生浸润在胡琴世界。精微的弓弦之术，勾勒东方国乐之风骨。
                </p>
              </div>

              {/* Performer list */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {PERFORMERS.map((perf, index) => (
                  <motion.div
                    key={perf.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white border border-[#E3DEC3] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Performer Image */}
                    <div className="w-full md:w-36 flex-shrink-0 flex justify-center">
                      <div className="relative group">
                        {/* Decorative golden/red photo frame */}
                        <div className="absolute inset-0 border border-[#B89047] scale-105 rounded-md pointer-events-none group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-md" />
                        <img
                          src={perf.avatar}
                          alt={perf.name}
                          referrerPolicy="no-referrer"
                          className="w-28 h-36 md:w-32 md:h-44 object-cover object-top rounded shadow-md grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Performer Bio Details */}
                    <div className="space-y-3 flex-grow">
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h3 className="text-2xl font-serif font-bold text-[#2C2621]">
                            {perf.name}
                          </h3>
                          <span className="text-xs text-[#8A1E1E] bg-[#FAF6EE] px-2.5 py-0.5 border border-[#E3DEC3] font-medium rounded-full">
                            {perf.title}
                          </span>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#E3DEC3]/60 w-full" />

                      <p className="text-xs md:text-sm text-[#5C5246] leading-relaxed text-justify whitespace-pre-line">
                        {perf.bio}
                      </p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setIsChatOpen(true);
                            askAIChat(`我想多了解一些关于胡琴演奏家“${perf.name}”大师的艺术成就与故事特色，可以讲讲吗？`);
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#8A1E1E] hover:text-[#B89047] font-medium transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
                          咨询其演奏特色
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}

          {/* TAB 3: TIANZIFANG GUIDE */}
          {activeTab === "tianzifang" && (
            <motion.div
              key="tianzifang-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 max-w-5xl mx-auto"
              id="tianzifang-section"
            >
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2621] mb-2">
                  相约田子坊 · 国乐雅集
                </h2>
                <div className="w-12 h-1 bg-[#8A1E1E] mx-auto mb-4" />
                <p className="text-sm text-[#5C5246]">
                  这里是海派石库门里弄文化与创意灵感交汇之所，在砖石梁柱间聆听胡琴，历史与现代交相辉映。
                </p>
              </div>

              {/* Graphic Banner & Intro */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Intro details */}
                <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-lg border border-[#E3DEC3] flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#B89047]">
                      Cultural Center / 弄堂底蕴
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#8A1E1E] leading-tight">
                      {TIANZIFANG_INTRO.title}
                    </h3>
                    <p className="font-serif italic text-sm text-[#8C7E6C] leading-relaxed border-l-2 border-[#B89047] pl-4 bg-[#FAF6EE] py-3.5 pr-2 rounded-r">
                      {TIANZIFANG_INTRO.quote}
                    </p>
                    <div className="space-y-3.5 text-xs md:text-sm text-[#5C5246] leading-relaxed">
                      {TIANZIFANG_INTRO.paragraphs.map((p, index) => (
                        <p key={index}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E3DEC3]/60">
                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 bg-[#FAF6EE] border border-[#E3DEC3] rounded-full">
                        <MapPin className="w-5 h-5 text-[#8A1E1E]" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#2C2621]">
                          演现场：{TIANZIFANG_INTRO.venueName}
                        </h4>
                        <p className="text-xs text-[#8C7E6C] mt-0.5">
                          具体地址：{TIANZIFANG_INTRO.venueAddress}
                        </p>
                        <p className="text-xs text-[#5C5246] mt-2">
                          {TIANZIFANG_INTRO.venueFeature}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Simulated visual directory mapping */}
                <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#E3DEC3] rounded-lg p-6 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
                  {/* Decorative faint grid background */}
                  <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#8A1E1E_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-serif font-bold text-[#8A1E1E] flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        艺术中心馆内导览图
                      </span>
                      <span className="text-[10px] font-mono bg-white border border-[#E3DEC3] text-[#8C7E6C] px-2.5 py-0.5 rounded-full">
                        Ta康路210弄2号
                      </span>
                    </div>

                    {/* Vector schematic of the building floor plan for an artistic vibe */}
                    <div className="border border-[#E3DEC3] bg-white rounded-md p-4 space-y-3 relative overflow-hidden shadow-sm">
                      <div className="h-2 bg-[#8A1E1E] w-full rounded-t-sm" />
                      
                      <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-serif text-[#5C5246]">
                        <div className="border border-dashed border-[#E3DEC3] p-3 rounded bg-[#FAF7F0] flex flex-col justify-between min-h-[70px]">
                          <span className="text-[8px] text-[#8C7E6C]">1楼入口</span>
                          <span className="font-bold">田子坊大堂</span>
                        </div>
                        <div className="border-2 border-[#B89047] p-3 rounded bg-[#FDFBF7] flex flex-col justify-between min-h-[70px] relative shadow-sm">
                          <div className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-[#8A1E1E] animate-ping" />
                          <span className="text-[8px] text-[#8A1E1E] font-sans">2楼演厅</span>
                          <span className="font-bold text-[#8A1E1E]">演奏会会场</span>
                        </div>
                        <div className="border border-dashed border-[#E3DEC3] p-3 rounded bg-[#FAF7F0] flex flex-col justify-between min-h-[70px]">
                          <span className="text-[8px] text-[#8C7E6C]">2楼配套</span>
                          <span className="font-bold">贵宾休息室</span>
                        </div>
                      </div>

                      {/* Schematic bottom street lines */}
                      <div className="border-t border-[#E3DEC3] pt-3 flex justify-between items-center text-[9px] text-[#8C7E6C] font-sans">
                        <span className="flex items-center gap-1"><ArrowRight className="w-2.5 h-2.5 text-[#8A1E1E]" /> 泰康路210弄通道</span>
                        <span>← 石库门弄堂 →</span>
                      </div>
                    </div>

                    <div className="bg-[#8A1E1E]/5 border border-[#8A1E1E]/20 p-4 rounded-md text-xs text-[#5C5246] leading-relaxed">
                      <p className="font-serif font-bold text-[#8A1E1E] mb-1.5 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        乘车指南：
                      </p>
                      地铁九号线<strong>打浦桥站</strong>出站后步行约 5 分钟，自泰康路主要入口进入，穿过繁花拥簇的石库门古道，即可抵达田子坊艺术中心。
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E3DEC3]/60 flex justify-between items-center mt-6">
                    <span className="text-[11px] text-[#8C7E6C] font-serif">上海黄浦优秀创意产业园区</span>
                    <button
                      onClick={() => {
                        setIsChatOpen(true);
                        askAIChat("我打算去田子坊艺术中心听音乐会，能推荐一下周边的特色美食或游玩路线吗？");
                      }}
                      className="text-xs text-[#8A1E1E] font-medium hover:underline flex items-center gap-0.5"
                    >
                      游玩路线咨询 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Credits and Behind the Scenes Staff */}
        <footer className="border-t border-[#E3DEC3] mt-24 pt-12 pb-16 text-center text-xs text-[#8C7E6C] max-w-4xl mx-auto space-y-8" id="footer-section">
          
          {/* Scroll design staff board */}
          <div className="bg-[#FAF6EE] p-6 rounded-md border border-[#E3DEC3] max-w-2xl mx-auto relative">
            {/* Thread bound style accents */}
            <div className="absolute top-0 bottom-0 left-4 w-[1px] border-l border-dashed border-[#B89047]" />
            <div className="absolute top-0 bottom-0 right-4 w-[1px] border-r border-dashed border-[#B89047]" />
            
            <h3 className="text-base font-serif font-bold text-[#2C2621] mb-4 tracking-widest uppercase">
              幕后功德榜 / 工作人员
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-[#5C5246]">
              {STAFF_CREDITS.map((cat, i) => (
                <div key={i} className="text-center font-serif">
                  <div className="text-xs text-[#8A1E1E] font-medium mb-1">{cat.role}</div>
                  <div className="text-xs text-[#2C2621]">{cat.names.join(" • ")}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <p className="font-serif tracking-widest text-[#2C2621] font-bold">
              弓吟弦歌五十春 • 四君胡琴演奏会
            </p>
            <p className="text-[10px] text-[#A09382]">
              © 2025-2026 四君胡琴艺术汇汇存. All rights reserved. 
            </p>
          </div>

        </footer>

      </main>

      {/* Floating AI Assistant Trigger & Widget */}
      <div className="fixed bottom-6 right-6 z-40" id="ai-assistant-widget">
        
        {/* Toggle button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#8A1E1E] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-[#D4AF37] focus:outline-none relative group"
        >
          {isChatOpen ? (
            <ChevronDown className="w-6 h-6 animate-pulse" />
          ) : (
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          )}
          {/* Pulsing glow ring when closed */}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] text-[9px] text-[#8A1E1E] font-bold items-center justify-center">AI</span>
            </span>
          )}
        </motion.button>

        {/* Sliding chat container */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute bottom-16 right-0 w-[92vw] sm:w-[400px] h-[550px] bg-white border border-[#E3DEC3] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Chat Header styled like a calligraphy scroll banner */}
              <div className="bg-[#8A1E1E] text-white p-4 flex justify-between items-center border-b border-[#B89047]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#8A1E1E] flex items-center justify-center font-bold font-serif text-sm border border-[#D4AF37]">
                    墨
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm tracking-widest text-[#FAF6EE]">
                      琴音墨客 AI 向导
                    </h3>
                    <p className="text-[10px] text-[#FAF6EE]/80">
                      为您解构国乐精粹与每一抹弦律
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4 bg-[#FAF7F0]/30 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-lg text-xs leading-relaxed border ${
                        msg.role === "user"
                          ? "bg-[#8A1E1E] text-white border-[#8A1E1E] rounded-br-none"
                          : "bg-white text-[#2C2621] border-[#E3DEC3] rounded-bl-none shadow-sm font-serif"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-[#8C7E6C] p-3 rounded-lg border border-[#E3DEC3] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A1E1E] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A1E1E] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A1E1E] animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Preset suggestion prompts */}
              <div className="px-3 py-2 bg-[#FAF6EE] border-t border-[#E3DEC3]/60 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                {[
                  { label: "品鉴《二泉映月》", q: "请为我讲讲阿炳的低音二胡不朽杰作《二泉映月》背后的历史故事与演奏神韵。" },
                  { label: "中西跨界胡琴", q: "《All of Me》是一首格莱美流行金曲，用二胡该怎么进行中西跨界演绎？" },
                  { label: "什么是板胡", q: "节目单里徐正宏老师拉的《月牙五更》使用的是‘板胡’。这与普通二胡有什么音色区别？" },
                  { label: "演奏家特色", q: "苑杰、徐正宏、邓伟民、万年芳四位胡琴名家，在演艺道路上各有什么闪光特色？" }
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => askAIChat(s.q)}
                    className="text-[10px] bg-white hover:bg-[#8A1E1E]/5 text-[#5C5246] hover:text-[#8A1E1E] border border-[#E3DEC3] px-2.5 py-1 rounded transition-all cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatInput.trim()) {
                    askAIChat(chatInput);
                  }
                }}
                className="p-3 bg-white border-t border-[#E3DEC3] flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="请输入您的国乐疑惑（如：二胡音色）..."
                  className="flex-grow text-xs px-3 py-2 border border-[#E3DEC3] rounded focus:outline-none focus:ring-1 focus:ring-[#8A1E1E] text-[#2C2621]"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="bg-[#8A1E1E] text-white p-2 rounded hover:bg-[#721818] transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
