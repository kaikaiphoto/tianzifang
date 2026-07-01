import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Compass, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Info,
  ArrowRight,
  User
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
  const [playingBackstory, setPlayingBackstory] = useState<Song | null>(null);

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D0808] via-[#661212] to-[#250303] text-[#FAF6EE] font-sans antialiased relative selection:bg-[#E8C87C] selection:text-[#4A0A0A] overflow-x-hidden">
      
      {/* Moving/Floating Golden Music Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <style>{`
          @keyframes floatUpNote {
            0% {
              transform: translateY(105vh) translateX(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: var(--op);
            }
            90% {
              opacity: var(--op);
            }
            100% {
              transform: translateY(-10vh) translateX(var(--drift)) rotate(360deg);
              opacity: 0;
            }
          }
          .floating-note-item {
            animation: floatUpNote var(--dur) linear infinite;
          }
        `}</style>
        {Array.from({ length: 32 }).map((_, i) => {
          const characters = ["♩", "♪", "♫", "♬", "∮", "♭", "𝄞", "𝄢"];
          const char = characters[i % characters.length];
          const left = (i * 3.1) % 100; // spread left values
          const delay = (i * -2.7) % 40; // varied delays
          const duration = 18 + ((i * 7.3) % 25); // varied speed
          const size = 12 + ((i * 5.1) % 20); // varied sizes
          const opacity = 0.12 + ((i * 0.04) % 0.28);
          const drift = `${-40 + ((i * 19) % 80)}px`;

          return (
            <div
              key={i}
              className="floating-note-item absolute text-[#E8C87C] font-serif"
              style={{
                left: `${left}%`,
                bottom: `-60px`,
                fontSize: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                // Pass variables
                ["--dur" as any]: `${duration}s`,
                ["--op" as any]: opacity,
                ["--drift" as any]: drift,
              }}
            >
              {char}
            </div>
          );
        })}
      </div>

      {/* Decorative Traditional Border Elements */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#E8C87C] z-50 shadow-md" />
      
      {/* Top Banner & Header */}
      <header className="relative w-full py-16 md:py-24 px-4 text-center border-b border-[#E8C87C]/20 bg-gradient-to-b from-[#2B0404]/80 to-[#4D0D0D]/40 backdrop-blur-sm overflow-hidden">
        {/* Abstract Background Ink Splash/Pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Sijun Seal Logo Accent */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-[#8A1E1E] text-[#E8C87C] flex items-center justify-center font-serif text-xl md:text-2xl font-bold tracking-widest rounded-sm shadow-2xl border-2 border-[#E8C87C] mb-6 relative"
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
            className="text-lg md:text-2xl font-serif text-[#E8C87C] tracking-[0.25em] font-medium mb-2 flex items-center gap-2 md:gap-3 drop-shadow"
          >
            <span>弓吟弦歌五十春</span>
            <span className="text-[#E8C87C]/60 text-sm md:text-lg">•</span>
            <span>金秋雅集田子坊</span>
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-[#FAF6EE] mt-3 mb-6 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {CONCERT_INFO.title}
          </motion.h1>

          {/* Divider with gold decorative pattern */}
          <div className="flex items-center gap-4 w-full max-w-md my-4">
            <div className="h-[1px] bg-[#E8C87C]/30 flex-grow" />
            <div className="w-3 h-3 rotate-45 border border-[#E8C87C] bg-[#8A1E1E]" />
            <div className="h-[1px] bg-[#E8C87C]/30 flex-grow" />
          </div>

          {/* Quick Info Box (Date, Time, Location) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-[#D5C2AA] tracking-wide w-full max-w-2xl"
          >
            <div className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black/30 rounded-md border border-[#E8C87C]/20 backdrop-blur-sm shadow-sm">
              <Calendar className="w-4 h-4 text-[#E8C87C]" />
              <span>{CONCERT_INFO.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black/30 rounded-md border border-[#E8C87C]/20 backdrop-blur-sm shadow-sm text-center">
              <MapPin className="w-4 h-4 text-[#E8C87C] flex-shrink-0" />
              <span>{CONCERT_INFO.location}</span>
            </div>
          </motion.div>

          {/* Unit Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#D5C2AA]/80 border-t border-[#E8C87C]/10 pt-6">
            <div>指导：<span className="text-[#FAF6EE] font-medium">{CONCERT_INFO.guidanceUnit[0]}</span></div>
            <div>主办：<span className="text-[#FAF6EE] font-medium">{CONCERT_INFO.hostUnit.join(" / ")}</span></div>
            <div>协办：<span className="text-[#FAF6EE] font-medium">{CONCERT_INFO.coorganizerUnit[0]}</span></div>
          </div>

        </div>
      </header>

      {/* Main Content & Tabs */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 border-b border-[#E8C87C]/20" id="tab-navigation">
          <div className="flex gap-2 md:gap-12">
            {[
              { id: "program", label: "胡琴节目单", icon: Music },
              { id: "performers", label: "演职大师风采", icon: Users },
              { id: "tianzifang", label: "相约田子坊", icon: Compass }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-3 md:px-6 text-sm md:text-base font-serif font-medium tracking-widest relative transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? "text-[#E8C87C] scale-105" 
                    : "text-[#D5C2AA] hover:text-[#FAF6EE]"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#E8C87C]" : "text-[#D5C2AA]"}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8C87C]"
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
              <div className="max-w-3xl mx-auto text-center font-serif text-[#FAF6EE] italic leading-relaxed mb-10 px-4 text-base md:text-lg opacity-90">
                “五十年风雨弓弦，半世纪国乐春华。四君雅聚，携古曲民风，和以异域爵士，邀您共话金秋乐事。”
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 bg-black/30 p-2.5 rounded-lg border border-[#E8C87C]/20 max-w-2xl mx-auto">
                {filterCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSongFilter(cat)}
                    className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm transition-all duration-200 cursor-pointer ${
                      songFilter === cat
                        ? "bg-[#E8C87C] text-[#4A0A0A] font-bold shadow-md"
                        : "text-[#D5C2AA] hover:bg-white/10 hover:text-white"
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
                      className={`p-6 rounded-lg border transition-all duration-300 relative overflow-hidden bg-[#530E0E]/40 backdrop-blur-md hover:shadow-xl ${
                        isPlaying 
                          ? "border-[#E8C87C] ring-1 ring-[#E8C87C]/50 shadow-2xl bg-[#6B1414]/60" 
                          : "border-[#E8C87C]/20 hover:border-[#E8C87C]/55"
                      }`}
                    >
                      {/* Left vertical visual accent */}
                      <div className={`absolute top-0 left-0 bottom-0 w-[4px] ${isPlaying ? "bg-[#E8C87C]" : "bg-[#E8C87C]/15"}`} />

                      {/* Top metadata */}
                      <div className="flex justify-between items-start gap-2 mb-3 pl-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8C87C] bg-black/30 px-2.5 py-0.5 rounded-full border border-[#E8C87C]/20">
                          第 {song.id} 幕 • {song.type}
                        </span>
                        {song.tag && (
                          <span className="text-[10px] text-[#4A0A0A] bg-[#E8C87C] px-2 py-0.5 rounded-sm font-serif font-bold">
                            {song.tag}
                          </span>
                        )}
                      </div>

                      {/* Song Title & Composer */}
                      <div className="pl-2 mb-4">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white flex items-center gap-2">
                          《{song.title}》
                        </h3>
                        <p className="text-xs text-[#D5C2AA] mt-1 italic">
                          {song.composer}
                        </p>
                      </div>

                      {/* Performer info */}
                      <div className="pl-2 py-2.5 px-3 bg-black/25 rounded border border-[#E8C87C]/10 mb-4 flex items-center justify-between text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#E8C87C]" />
                          <span className="text-[#D5C2AA]">演奏家：</span>
                          <span className="font-medium text-white">{song.performer}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs md:text-sm text-[#E0D5C1] pl-2 leading-relaxed mb-6">
                        {song.description}
                      </p>

                      {/* Actions footer */}
                      <div className="flex flex-wrap items-center gap-3 pl-2 border-t border-[#E8C87C]/10 pt-4">
                        {/* Audio simulate button */}
                        <button
                          onClick={() => handlePlaySong(song)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-serif tracking-widest transition-all duration-300 cursor-pointer ${
                            isPlaying 
                              ? "bg-[#E8C87C] text-[#4A0A0A] font-bold shadow-lg" 
                              : "bg-transparent border border-[#E8C87C]/40 text-[#E8C87C] hover:bg-[#E8C87C] hover:text-[#4A0A0A]"
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
                          className="flex items-center gap-1 text-xs text-[#E8C87C]/80 hover:text-[#E8C87C] font-medium transition-colors cursor-pointer"
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
                              className="w-0.5 bg-[#E8C87C]"
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
                            className="overflow-hidden mt-4 bg-black/40 rounded border border-[#E8C87C]/25 p-4 pl-6 relative"
                          >
                            <div className="absolute left-2 top-0 bottom-0 w-[1px] border-l border-dashed border-[#E8C87C]/30" />
                            <h4 className="text-sm font-serif font-bold text-[#E8C87C] mb-2 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              乐章典故
                            </h4>
                            <p className="text-xs text-[#E0D5C1] leading-relaxed italic whitespace-pre-line">
                              {song.backstory}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom small orchestra companion info banner */}
              <div className="bg-[#4D0D0D]/40 border border-[#E8C87C]/20 rounded-lg p-6 max-w-4xl mx-auto mt-12 text-center backdrop-blur-md">
                <h3 className="text-lg font-serif font-bold text-[#E8C87C] mb-3 flex justify-center items-center gap-2">
                  <Music className="w-5 h-5" />
                  小乐队伴奏团队
                </h3>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-4 text-sm text-[#D5C2AA]">
                  {CONCERT_INFO.orchestra.map((inst, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-[#E8C87C] font-medium font-serif">{inst.role}</span>
                      <span className="text-[#E8C87C]/40">•</span>
                      <span className="font-medium text-white">{inst.names.join("、")}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#D5C2AA]/60 mt-6 border-t border-[#E8C87C]/10 pt-4">
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
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  演职大师风采
                </h2>
                <div className="w-12 h-1 bg-[#E8C87C] mx-auto mb-4" />
                <p className="text-sm text-[#D5C2AA]">
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
                    className="bg-[#530E0E]/40 border border-[#E8C87C]/20 rounded-lg p-6 hover:shadow-2xl hover:border-[#E8C87C]/40 backdrop-blur-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start animate-fade-in"
                  >
                    {/* Performer Image */}
                    <div className="w-full md:w-36 flex-shrink-0 flex justify-center">
                      <div className="relative group">
                        {/* Decorative golden/red photo frame */}
                        <div className="absolute inset-0 border border-[#E8C87C]/50 scale-105 rounded-md pointer-events-none group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#250303]/40 to-transparent pointer-events-none rounded-md" />
                        <img
                          src={perf.avatar}
                          alt={perf.name}
                          referrerPolicy="no-referrer"
                          className="w-28 h-36 md:w-32 md:h-44 object-cover object-top rounded shadow-md grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>

                      {/* Performer Bio Details */}
                      <div className="space-y-3 flex-grow">
                        <div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <h3 className="text-2xl font-serif font-bold text-white">
                              {perf.name}
                            </h3>
                            <span className="text-xs text-[#E8C87C] bg-black/30 px-2.5 py-0.5 border border-[#E8C87C]/20 font-medium rounded-full">
                              {perf.title}
                            </span>
                          </div>
                        </div>

                        <div className="h-[1px] bg-[#E8C87C]/15 w-full" />

                        <p className="text-xs md:text-sm text-[#D5C2AA] leading-relaxed text-justify whitespace-pre-line">
                          {perf.bio}
                        </p>
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
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  相约田子坊 · 国乐雅集
                </h2>
                <div className="w-12 h-1 bg-[#E8C87C] mx-auto mb-4" />
                <p className="text-sm text-[#D5C2AA]">
                  这里是海派石库门里弄文化与创意灵感交汇之所，在砖石梁柱间聆听胡琴，历史与现代交相辉映。
                </p>
              </div>

              {/* Graphic Banner & Intro */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Intro details */}
                <div className="lg:col-span-7 bg-[#530E0E]/40 border border-[#E8C87C]/20 p-6 md:p-8 rounded-lg flex flex-col justify-between space-y-6 backdrop-blur-md">
                  
                  <div className="space-y-4">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#E8C87C]">
                      Cultural Center / 弄堂底蕴
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                      {TIANZIFANG_INTRO.title}
                    </h3>
                    <p className="font-serif italic text-sm text-[#FAF6EE] leading-relaxed border-l-2 border-[#E8C87C] pl-4 bg-black/20 py-3.5 pr-2 rounded-r">
                      {TIANZIFANG_INTRO.quote}
                    </p>
                    <div className="space-y-3.5 text-xs md:text-sm text-[#D5C2AA] leading-relaxed">
                      {TIANZIFANG_INTRO.paragraphs.map((p, index) => (
                        <p key={index}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8C87C]/10">
                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 bg-black/25 border border-[#E8C87C]/10 rounded-full">
                        <MapPin className="w-5 h-5 text-[#E8C87C]" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#E8C87C]">
                          演现场：{TIANZIFANG_INTRO.venueName}
                        </h4>
                        <p className="text-xs text-[#D5C2AA] mt-0.5">
                          具体地址：{TIANZIFANG_INTRO.venueAddress}
                        </p>
                        <p className="text-xs text-[#FAF6EE] mt-2 opacity-90">
                          {TIANZIFANG_INTRO.venueFeature}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Simulated visual directory mapping */}
                <div className="lg:col-span-5 bg-[#530E0E]/40 border border-[#E8C87C]/20 rounded-lg p-6 flex flex-col justify-between overflow-hidden relative min-h-[350px] backdrop-blur-md">
                  {/* Decorative faint grid background */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#E8C87C_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-serif font-bold text-[#E8C87C] flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        艺术中心馆内导览图
                      </span>
                      <span className="text-[10px] font-mono bg-black/30 border border-[#E8C87C]/20 text-[#D5C2AA] px-2.5 py-0.5 rounded-full">
                        Ta康路210弄2号
                      </span>
                    </div>

                    {/* Vector schematic of the building floor plan for an artistic vibe */}
                    <div className="border border-[#E8C87C]/15 bg-black/20 rounded-md p-4 space-y-3 relative overflow-hidden shadow-sm">
                      <div className="h-2 bg-[#E8C87C] w-full rounded-t-sm" />
                      
                      <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-serif text-[#D5C2AA]">
                        <div className="border border-dashed border-[#E8C87C]/15 p-3 rounded bg-black/10 flex flex-col justify-between min-h-[70px]">
                          <span className="text-[8px] text-[#D5C2AA]/70">1楼入口</span>
                          <span className="font-bold text-white">田子坊大堂</span>
                        </div>
                        <div className="border-2 border-[#E8C87C] p-3 rounded bg-[#611111]/80 flex flex-col justify-between min-h-[70px] relative shadow-sm">
                          <div className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-[#E8C87C] animate-ping" />
                          <span className="text-[8px] text-[#E8C87C] font-sans">2楼演厅</span>
                          <span className="font-bold text-[#E8C87C]">演奏会会场</span>
                        </div>
                        <div className="border border-dashed border-[#E8C87C]/15 p-3 rounded bg-black/10 flex flex-col justify-between min-h-[70px]">
                          <span className="text-[8px] text-[#D5C2AA]/70">2楼配套</span>
                          <span className="font-bold text-white">贵宾休息室</span>
                        </div>
                      </div>

                      {/* Schematic bottom street lines */}
                      <div className="border-t border-[#E8C87C]/10 pt-3 flex justify-between items-center text-[9px] text-[#D5C2AA] font-sans">
                        <span className="flex items-center gap-1"><ArrowRight className="w-2.5 h-2.5 text-[#E8C87C]" /> 泰康路210弄通道</span>
                        <span>← 石库门弄堂 →</span>
                      </div>
                    </div>

                    <div className="bg-black/35 border border-[#E8C87C]/10 p-4 rounded-md text-xs text-[#D5C2AA] leading-relaxed">
                      <p className="font-serif font-bold text-[#E8C87C] mb-1.5 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        乘车指南：
                      </p>
                      地铁九号线<strong>打浦桥站</strong>出站后步行约 5 分钟，自泰康路主要入口进入，穿过繁花拥簇的石库门古道，即可抵达田子坊艺术中心。
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8C87C]/10 flex justify-between items-center mt-6">
                    <span className="text-[11px] text-[#D5C2AA]/70 font-serif">上海黄浦优秀创意产业园区</span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Credits and Behind the Scenes Staff */}
        <footer className="border-t border-[#E8C87C]/10 mt-24 pt-12 pb-16 text-center text-xs text-[#D5C2AA] max-w-4xl mx-auto space-y-8" id="footer-section">
          
          {/* Scroll design staff board */}
          <div className="bg-[#530E0E]/40 p-6 rounded-md border border-[#E8C87C]/25 max-w-2xl mx-auto relative backdrop-blur-md">
            {/* Thread bound style accents */}
            <div className="absolute top-0 bottom-0 left-4 w-[1px] border-l border-dashed border-[#E8C87C]/20" />
            <div className="absolute top-0 bottom-0 right-4 w-[1px] border-r border-dashed border-[#E8C87C]/20" />
            
            <h3 className="text-base font-serif font-bold text-[#E8C87C] mb-4 tracking-widest uppercase">
              幕后功德榜 / 工作人员
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-[#D5C2AA]">
              {STAFF_CREDITS.map((cat, i) => (
                <div key={i} className="text-center font-serif">
                  <div className="text-xs text-[#E8C87C] font-medium mb-1">{cat.role}</div>
                  <div className="text-xs text-white">{cat.names.join(" • ")}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <p className="font-serif tracking-widest text-[#E8C87C] font-bold">
              弓吟弦歌五十春 • 四君胡琴演奏会
            </p>
            <p className="text-[10px] text-[#D5C2AA]/60">
              © 2025-2026 四君胡琴艺术汇汇存. All rights reserved. 
            </p>
          </div>

        </footer>

      </main>

    </div>
  );
}
