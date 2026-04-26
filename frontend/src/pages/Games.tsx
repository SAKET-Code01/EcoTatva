/**
 * Games.tsx — EcoTatva "Earth Control Room"
 * GDG Solution Challenge 2026
 *
 * Features:
 *  - 1.8s futuristic "ENTERING GAME MODE" transition screen
 *  - Animated SVG Earth globe with pulsing geo-hotspots
 *  - Planet Status, Active Missions, Leaderboard, Live Feed panels
 *  - Clickable action cards with real XP / energy feedback
 *  - Full neon-green cyberpunk aesthetic with Orbitron font
 *
 * Stack: React + TypeScript + Tailwind CSS + lucide-react
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap, Trophy, Bell, Settings, Globe, Leaf, TreePine,
  Waves, Factory, PawPrint, Droplets, Recycle, Bike, TrendingUp,
  Radio, ChevronRight, ZoomIn, ZoomOut, RotateCcw,
  Shield, Target, Award, Home, Map, Package, BookMarked,
  HelpCircle, Flame, Gift,
} from "lucide-react";

// ─────────────────────── Global CSS ───────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap');

.eco-font  { font-family: 'Orbitron', 'Courier New', monospace; }
.body-font { font-family: 'Rajdhani', 'Trebuchet MS', sans-serif; }

@keyframes eco-scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes eco-grid-move {
  0%   { background-position: 0 0; }
  100% { background-position: 40px 40px; }
}
@keyframes eco-neon-flicker {
  0%,100%{ opacity:1; } 92%{ opacity:1; } 93%{ opacity:0.3; }
  94%{ opacity:1; } 96%{ opacity:0.5; } 97%{ opacity:1; }
}
@keyframes eco-float {
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-7px); }
}
@keyframes eco-spin { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
@keyframes eco-spin-rev { from{ transform:rotate(0deg); } to{ transform:rotate(-360deg); } }
@keyframes eco-xp-pop {
  0%  { transform:translateY(0) scale(1); opacity:1; }
  60% { transform:translateY(-32px) scale(1.25); opacity:1; }
  100%{ transform:translateY(-54px) scale(0.9); opacity:0; }
}
@keyframes eco-fade-up {
  from{ opacity:0; transform:translateY(18px); }
  to  { opacity:1; transform:translateY(0); }
}
@keyframes eco-blink {
  0%,100%{ opacity:1; } 50%{ opacity:0; }
}
@keyframes eco-progress {
  from{ width:0%; }
  to  { width:100%; }
}
@keyframes eco-pulse-ring {
  0%  { transform:scale(0.85); opacity:1; }
  100%{ transform:scale(2.4); opacity:0; }
}

.eco-neon-text    { animation: eco-neon-flicker 7s infinite; }
.eco-float        { animation: eco-float 4s ease-in-out infinite; }
.eco-xp-pop       { animation: eco-xp-pop 0.9s ease-out forwards; }
.eco-fade-up      { animation: eco-fade-up 0.55s ease-out forwards; }

/* Scanline overlay */
.eco-scanlines::after {
  content:'';
  position:fixed;
  inset:0;
  background:repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.045) 0px,
    rgba(0,0,0,0.045) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events:none;
  z-index:9999;
}
`;

// ─────────────────────── Types ───────────────────────
interface Mission   { id:number; label:string; icon:React.ReactNode; current:number; total:number; xp:number; coins:number; color:string; }
interface Leader    { rank:number; name:string; xp:number; avatar:string; isYou?:boolean; }
interface FeedItem  { id:number; icon:React.ReactNode; text:string; time:string; color:string; }
interface ActCard   { id:string; label:string; emoji:string; energy:number; desc:string; color:string; xpReward:number; coins:number; }
interface XpBubble  { id:number; val:number; x:number; color:string; }

// ─────────────────────── Static data ───────────────────────
const MISSIONS: Mission[] = [
  { id:1, label:"Plant 100 Trees",    icon:<TreePine size={14}/>, current:60, total:100, xp:100, coins:50,  color:"#22c55e" },
  { id:2, label:"Save 50L of Water",  icon:<Droplets size={14}/>, current:30, total:50,  xp:80,  coins:40,  color:"#38bdf8" },
  { id:3, label:"Recycle 20 Items",   icon:<Recycle  size={14}/>, current:12, total:20,  xp:60,  coins:30,  color:"#a3e635" },
  { id:4, label:"Walk or Cycle 5 km", icon:<Bike     size={14}/>, current:3,  total:5,   xp:70,  coins:35,  color:"#fb923c" },
];

const LEADERS: Leader[] = [
  { rank:1, name:"GreenMaster",      xp:2560, avatar:"GM" },
  { rank:2, name:"NatureNinja",      xp:2140, avatar:"NN" },
  { rank:3, name:"EcoLegend",        xp:1890, avatar:"EL" },
  { rank:4, name:"Saket Kumar Seth", xp:1250, avatar:"SK", isYou:true },
  { rank:5, name:"PlanetSaver",      xp:1010, avatar:"PS" },
];

const FEED: FeedItem[] = [
  { id:1, icon:<Droplets size={12}/>, text:"The Ganges is 2% cleaner!",          time:"2m ago",  color:"#38bdf8" },
  { id:2, icon:<TreePine size={12}/>, text:"Amazon gained 500 new trees!",        time:"5m ago",  color:"#22c55e" },
  { id:3, icon:<Waves    size={12}/>, text:"1.3 tons of plastic removed!",        time:"8m ago",  color:"#a78bfa" },
  { id:4, icon:<Globe    size={12}/>, text:"Air improved in 12 major cities!",    time:"12m ago", color:"#fb923c" },
];

const CARDS: ActCard[] = [
  { id:"forests",   label:"PLANT FORESTS",    emoji:"🌳", energy:20, desc:"Plant trees & grow forest cover", color:"#22c55e", xpReward:120, coins:55 },
  { id:"oceans",    label:"CLEAN OCEANS",     emoji:"🌊", energy:25, desc:"Remove plastic, restore marine life", color:"#38bdf8", xpReward:140, coins:65 },
  { id:"pollution", label:"REDUCE POLLUTION", emoji:"🏭", energy:20, desc:"Cut emissions & clean the air",    color:"#fbbf24", xpReward:110, coins:50 },
  { id:"wildlife",  label:"SAVE WILDLIFE",    emoji:"🐘", energy:15, desc:"Protect species & habitats",       color:"#c084fc", xpReward:95,  coins:45 },
];

// ─────────────────────── Helpers ───────────────────────
function Bar({ v, max, color, h=5 }: { v:number; max:number; color:string; h?:number }) {
  const pct = Math.min(100, (v/max)*100);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height:h, background:"rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width:`${pct}%`, background:`linear-gradient(90deg,${color}bb,${color})`, boxShadow:`0 0 8px ${color}77` }}/>
    </div>
  );
}

function Tag({ children, color }: { children:React.ReactNode; color:string }) {
  return (
    <span className="eco-font text-[8px] font-bold px-1.5 py-0.5 rounded"
      style={{ color, background:`${color}18`, border:`1px solid ${color}40`, boxShadow:`0 0 4px ${color}28` }}>
      {children}
    </span>
  );
}

function PlanetRow({ icon, label, val, status, color }: { icon:React.ReactNode; label:string; val:string; status:string; color:string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
      <span style={{ color }} className="flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="eco-font text-[8px] text-gray-600 tracking-widest uppercase">{label}</div>
        <div className="flex items-center gap-1.5">
          <span className="body-font text-xs font-bold text-white">{val}</span>
          <span className="body-font text-[9px]" style={{ color }}>{status}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────── Globe ───────────────────────
function EarthGlobe({ sz=320 }: { sz?:number }) {
  const r = sz / 2;
  const spots = [
    { x:r+68,  y:r-42, c:"#ef4444" },  // Delhi
    { x:r-82,  y:r+18, c:"#22c55e" },  // Amazon
    { x:r-62,  y:r+72, c:"#38bdf8" },  // Pacific
    { x:r+52,  y:r+68, c:"#fb923c" },  // Savannah
  ];
  return (
    <div className="relative eco-float" style={{ width:sz, height:sz }}>
      {/* Orbital rings */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ inset:-20, border:"1px dashed rgba(34,197,94,0.14)", animation:"eco-spin 28s linear infinite" }}/>
      <div className="absolute rounded-full pointer-events-none"
        style={{ inset:-34, border:"1px dashed rgba(56,189,248,0.09)", animation:"eco-spin-rev 18s linear infinite" }}/>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow:"0 0 70px rgba(34,197,94,0.28), 0 0 130px rgba(34,197,94,0.1)" }}/>

      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} className="relative z-10">
        <defs>
          <radialGradient id="gOcean" cx="38%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#0d3a58"/>
            <stop offset="55%"  stopColor="#071625"/>
            <stop offset="100%" stopColor="#020a12"/>
          </radialGradient>
          <radialGradient id="gAtmo" cx="38%" cy="30%" r="68%">
            <stop offset="0%"   stopColor="rgba(34,197,94,0.2)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <radialGradient id="gShine" cx="30%" cy="26%" r="44%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.09)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <clipPath id="gClip"><circle cx={r} cy={r} r={r-2}/></clipPath>
          <pattern id="gLines" width="2" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="1" fill="rgba(0,0,0,0.14)"/>
          </pattern>
        </defs>

        {/* Ocean base */}
        <circle cx={r} cy={r} r={r-2} fill="url(#gOcean)"/>

        {/* Landmasses */}
        <g clipPath="url(#gClip)">
          {/* Africa */}
          <path d={`M${r+48} ${r-92} Q${r+82} ${r-82} ${r+96} ${r-58} Q${r+102} ${r-18} ${r+96} ${r+32} Q${r+84} ${r+82} ${r+68} ${r+106} Q${r+52} ${r+112} ${r+36} ${r+105} Q${r+26} ${r+88} ${r+32} ${r+55} Q${r+38} ${r+24} ${r+36} ${r-12} Q${r+38} ${r-48} ${r+44} ${r-78} Z`}
            fill="#1a5c28" opacity="0.88"/>
          {/* Europe */}
          <path d={`M${r+8} ${r-104} Q${r+32} ${r-116} ${r+52} ${r-108} Q${r+60} ${r-94} ${r+54} ${r-80} Q${r+40} ${r-74} ${r+18} ${r-78} Q${r+6} ${r-90} Z`}
            fill="#1e6b30" opacity="0.82"/>
          {/* India */}
          <path d={`M${r+78} ${r-54} Q${r+100} ${r-48} ${r+113} ${r-28} Q${r+120} ${r-4} ${r+112} ${r+22} Q${r+100} ${r+40} ${r+86} ${r+42} Q${r+74} ${r+30} ${r+70} ${r+6} Q${r+70} ${r-24} Z`}
            fill="#1f7a34" opacity="0.86"/>
          {/* South America */}
          <path d={`M${r-82} ${r-82} Q${r-56} ${r-94} ${r-40} ${r-78} Q${r-28} ${r-54} ${r-26} ${r-18} Q${r-30} ${r+32} ${r-44} ${r+82} Q${r-60} ${r+102} ${r-78} ${r+92} Q${r-92} ${r+66} ${r-96} ${r+30} Q${r-94} ${r-14} ${r-90} ${r-52} Z`}
            fill="#1a6b28" opacity="0.82"/>
          {/* N. America */}
          <path d={`M${r-112} ${r-100} Q${r-76} ${r-122} ${r-42} ${r-112} Q${r-20} ${r-100} ${r-18} ${r-80} Q${r-28} ${r-58} ${r-56} ${r-46} Q${r-88} ${r-48} ${r-114} ${r-64} Z`}
            fill="#206b2e" opacity="0.78"/>
          {/* Australia */}
          <path d={`M${r+108} ${r+22} Q${r+132} ${r+16} ${r+146} ${r+30} Q${r+150} ${r+52} ${r+138} ${r+70} Q${r+118} ${r+74} ${r+104} ${r+62} Q${r+100} ${r+44} Z`}
            fill="#1e6b30" opacity="0.78"/>
          {/* Russia/Asia */}
          <path d={`M${r+48} ${r-118} Q${r+102} ${r-132} ${r+150} ${r-120} Q${r+162} ${r-100} ${r+152} ${r-78} Q${r+120} ${r-73} ${r+84} ${r-70} Q${r+60} ${r-78} ${r+46} ${r-98} Z`}
            fill="#1a5c28" opacity="0.74"/>
        </g>

        {/* Atmosphere + shine + scanlines */}
        <circle cx={r} cy={r} r={r-2} fill="url(#gAtmo)"/>
        <circle cx={r} cy={r} r={r-2} fill="url(#gShine)"/>
        <circle cx={r} cy={r} r={r-2} fill="url(#gLines)" opacity="0.45"/>
        {/* Edge vignette */}
        <circle cx={r} cy={r} r={r-2} fill="none" stroke="rgba(0,0,0,0.72)" strokeWidth="30"/>

        {/* Hotspots */}
        {spots.map((s,i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="5" fill={s.c} opacity="0.92">
              <animate attributeName="r"       values="4;8;4"     dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.92;0.5;0.92" dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
            </circle>
            <circle cx={s.x} cy={s.y} r="13" fill="none" stroke={s.c} strokeWidth="1.4" opacity="0.38">
              <animate attributeName="r"       values="9;22;9"   dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.8+i*0.35}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>

      {/* Callout labels */}
      <div className="absolute z-20 pointer-events-none" style={{ top:"20%", right:"-2%", transform:"translateX(48%)" }}>
        <Callout color="#ef4444" title="POLLUTION ZONE" sub="Delhi, India · Worsening" icon="☣"/>
      </div>
      <div className="absolute z-20 pointer-events-none" style={{ top:"36%", left:"-2%", transform:"translateX(-48%)" }}>
        <Callout color="#22c55e" title="FOREST MISSION" sub="Amazon Rainforest" icon={<TreePine size={10}/>}/>
      </div>
      <div className="absolute z-20 pointer-events-none" style={{ bottom:"22%", left:"-2%", transform:"translateX(-46%)" }}>
        <Callout color="#38bdf8" title="OCEAN CLEANUP" sub="Pacific Ocean" icon={<Waves size={10}/>}/>
      </div>
      <div className="absolute z-20 pointer-events-none" style={{ bottom:"16%", right:"-2%", transform:"translateX(46%)" }}>
        <Callout color="#fb923c" title="WILDLIFE RESCUE" sub="African Savannah" icon={<PawPrint size={10}/>}/>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-[-46px] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
        {[{ I:ZoomIn,t:"Zoom In" },{ I:ZoomOut,t:"Zoom Out" },{ I:RotateCcw,t:"Rotate" }].map(({I,t})=>(
          <button key={t} title={t}
            className="w-8 h-8 rounded-md flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.28)", color:"#22c55e" }}>
            <I size={12}/>
            <span className="eco-font text-[6px] leading-none">{t.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Callout({ color, title, sub, icon }: { color:string; title:string; sub:string; icon:React.ReactNode }) {
  return (
    <div className="px-2 py-1 rounded-lg" style={{
      background:`${color}14`, border:`1px solid ${color}50`,
      color, boxShadow:`0 0 14px ${color}28`, backdropFilter:"blur(6px)",
    }}>
      <div className="flex items-center gap-1 eco-font text-[9px] font-bold">{icon} {title}</div>
      <div className="body-font text-[8px] opacity-75 mt-0.5">{sub}</div>
    </div>
  );
}

// ─────────────────────── Transition Screen ───────────────────────
function TransitionScreen({ onDone }: { onDone:()=>void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx,  setLineIdx]  = useState(0);
  const LINES = [
    "> Initializing Earth Monitoring Systems...",
    "> Connecting to Global Sensor Network...",
    "> Loading Eco Mission Database...",
    "> Calibrating Climate Telemetry...",
    "> ALL SYSTEMS ONLINE — Welcome, Eco Warrior.",
  ];

  useEffect(() => {
    const prog = setInterval(() => setProgress(p => { if(p>=100){clearInterval(prog);return 100;} return p+2.4; }), 36);
    LINES.forEach((_,i) => setTimeout(() => setLineIdx(i+1), i*300+150));
    const fin = setTimeout(onDone, 1800);
    return () => { clearInterval(prog); clearTimeout(fin); };
  }, []); // eslint-disable-line

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[100] eco-scanlines"
      style={{ background:"#020608" }}>
      {/* Animated grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(34,197,94,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.07) 1px,transparent 1px)",
        backgroundSize:"40px 40px",
        animation:"eco-grid-move 3s linear infinite",
      }}/>
      {/* Scanline sweep */}
      <div className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{ background:"linear-gradient(90deg,transparent,rgba(34,197,94,0.65),transparent)", animation:"eco-scanline 1.8s linear" }}/>

      <div className="relative z-10 flex flex-col items-center gap-7 px-8 text-center max-w-lg w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background:"linear-gradient(135deg,#14532d,#0c4a6e)", boxShadow:"0 0 30px rgba(34,197,94,0.55), 0 0 70px rgba(34,197,94,0.2)" }}>
            <Leaf size={28} className="text-green-400"/>
          </div>
          <div className="eco-font text-3xl font-black text-left" style={{ color:"#22c55e", textShadow:"0 0 22px rgba(34,197,94,0.85)" }}>
            EcoTatva
          </div>
        </div>

        {/* Headline */}
        <div>
          <p className="eco-font text-[10px] tracking-[0.55em] text-green-700 mb-3 uppercase eco-neon-text">
            ─── Entering Game Mode ───
          </p>
          <h1 className="eco-font font-black text-4xl md:text-5xl leading-tight eco-neon-text"
            style={{ color:"#22c55e", textShadow:"0 0 36px rgba(34,197,94,0.9), 0 0 90px rgba(34,197,94,0.35)" }}>
            EARTH CONTROL ROOM
          </h1>
          <p className="eco-font text-[10px] tracking-[0.3em] text-green-700 mt-3 uppercase">
            You control the actions. Earth feels the change.
          </p>
        </div>

        {/* Progress */}
        <div className="w-full">
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(34,197,94,0.12)" }}>
            <div className="h-full rounded-full transition-all duration-75"
              style={{ width:`${progress}%`, background:"linear-gradient(90deg,#15803d,#22c55e,#86efac)", boxShadow:"0 0 12px #22c55ebb" }}/>
          </div>
          <div className="flex justify-between mt-1">
            <span className="eco-font text-[8px] text-green-700">LOADING SYSTEMS</span>
            <span className="eco-font text-[8px] text-green-400">{Math.min(100,Math.round(progress))}%</span>
          </div>
        </div>

        {/* Boot log */}
        <div className="w-full text-left px-4 py-3 rounded-xl" style={{
          background:"rgba(0,20,8,0.85)", border:"1px solid rgba(34,197,94,0.18)",
          fontFamily:"'Courier New',monospace",
        }}>
          {LINES.slice(0,lineIdx).map((l,i) => (
            <div key={i} className="text-[10px] leading-relaxed" style={{ color:i===lineIdx-1?"#22c55e":"#166534" }}>
              {l}{i===lineIdx-1 && <span style={{ animation:"eco-blink 0.8s infinite" }}>█</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────── Action Card ───────────────────────
function ActionCard({ card, onAct, energy }: { card:ActCard; onAct:(c:ActCard)=>void; energy:number }) {
  const [hov, setHov]   = useState(false);
  const [pops,setPops]  = useState<XpBubble[]>([]);
  const canAct = energy >= card.energy;

  const handleClick = useCallback(() => {
    if(!canAct) return;
    onAct(card);
    const id = Date.now();
    setPops(p => [...p, { id, val:card.xpReward, x:20+Math.random()*60, color:card.color }]);
    setTimeout(() => setPops(p => p.filter(b => b.id!==id)), 950);
  },[card, canAct, onAct]);

  return (
    <div
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-pointer select-none transition-all duration-300"
      style={{
        background: hov && canAct
          ? `linear-gradient(160deg,${card.color}20,${card.color}0a)`
          : `linear-gradient(160deg,${card.color}0e,rgba(6,10,14,0.96))`,
        border: `1px solid ${hov && canAct ? card.color+"80" : card.color+"2e"}`,
        boxShadow: hov && canAct
          ? `0 0 32px ${card.color}40, 0 0 70px ${card.color}16, inset 0 0 24px ${card.color}0a`
          : `0 0 10px ${card.color}14`,
        transform: hov && canAct ? "translateY(-6px) scale(1.03)" : "none",
        opacity: canAct ? 1 : 0.48,
      }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={handleClick}
    >
      {/* XP popups */}
      {pops.map(b => (
        <div key={b.id} className="eco-xp-pop absolute eco-font font-black text-sm pointer-events-none z-30"
          style={{ color:b.color, left:`${b.x}%`, top:"15%", textShadow:`0 0 10px ${b.color}` }}>
          +{b.val} XP
        </div>
      ))}

      {/* Emoji */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300"
        style={{
          background:`radial-gradient(circle,${card.color}20,${card.color}06)`,
          border:`1px solid ${card.color}40`,
          boxShadow: hov ? `0 0 28px ${card.color}55` : `0 0 10px ${card.color}20`,
          transform: hov ? "scale(1.08)" : "none",
        }}>
        {card.emoji}
      </div>

      <div className="text-center">
        <div className="eco-font text-[10px] font-black tracking-widest" style={{ color:card.color }}>
          {card.label}
        </div>
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <Zap size={9} style={{ color:"#facc15" }}/>
          <span className="eco-font text-[9px] text-yellow-400 font-bold">{card.energy}</span>
        </div>
      </div>

      <p className="body-font text-[10px] text-gray-400 text-center leading-relaxed">{card.desc}</p>

      <button
        className="w-full py-1.5 rounded-xl eco-font text-[10px] font-black tracking-widest transition-all duration-200 active:scale-95"
        style={{
          background: canAct ? `linear-gradient(90deg,${card.color}30,${card.color}1e)` : "rgba(255,255,255,0.04)",
          border:`1px solid ${canAct ? card.color+"60" : "rgba(255,255,255,0.08)"}`,
          color: canAct ? card.color : "#444",
          boxShadow: hov && canAct ? `0 0 16px ${card.color}44` : "none",
        }}>
        {canAct ? "ACT NOW" : "LOW ENERGY"}
      </button>
    </div>
  );
}

// ─────────────────────── Nav Stat ───────────────────────
function NavStat({ icon, label, value, color, bar, max }: { icon:React.ReactNode; label:string; value:string; color:string; bar?:number; max?:number }) {
  return (
    <div className="flex flex-col px-3 py-1.5 rounded-lg border" style={{ background:`${color}0c`, borderColor:`${color}26`, minWidth:88 }}>
      <div className="flex items-center gap-1">
        <span style={{ color }}>{icon}</span>
        <span className="eco-font text-[8px] text-gray-500 tracking-widest">{label}</span>
      </div>
      <span className="eco-font text-[11px] font-black mt-0.5" style={{ color }}>{value}</span>
      {bar!==undefined && max!==undefined && <div className="mt-1"><Bar v={bar} max={max} color={color} h={3}/></div>}
    </div>
  );
}

// ─────────────────────── Main Component ───────────────────────
export default function Games() {
  const [transitioning, setTransitioning] = useState(true);
  const [visible,       setVisible]       = useState(false);
  const [energy,        setEnergy]        = useState(78);
  const [xp,            setXp]            = useState(1250);
  const [coins,         setCoins]         = useState(320);
  const [toast,         setToast]         = useState<string|null>(null);
  const [clock,         setClock]         = useState(new Date());
  const toastRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Clock tick
  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  },[]);

  const timeStr = clock.toLocaleTimeString("en-US",{ hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false });

  // Inject global CSS once
  useEffect(() => {
    if(document.getElementById("eco-global")) return;
    const s = document.createElement("style");
    s.id = "eco-global";
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
  },[]);

  const handleDone = useCallback(() => {
    setTransitioning(false);
    requestAnimationFrame(() => setVisible(true));
  },[]);

  const handleAct = useCallback((card:ActCard) => {
    setEnergy(e => Math.max(0, e - card.energy));
    setXp(x => x + card.xpReward);
    setCoins(c => c + card.coins);
    if(toastRef.current) clearTimeout(toastRef.current);
    setToast(`✅ +${card.xpReward} XP  ·  +${card.coins} Coins  —  ${card.label} completed!`);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  },[]);

  const MEDALS: Record<number,string> = { 1:"🥇", 2:"🥈", 3:"🥉" };

  return (
    <>
      {transitioning && <TransitionScreen onDone={handleDone}/>}

      <div className={`eco-scanlines min-h-screen flex flex-col overflow-hidden body-font transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ background:"#060a0e" }}>

        {/* Moving grid */}
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage:"linear-gradient(rgba(34,197,94,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.022) 1px,transparent 1px)",
          backgroundSize:"40px 40px",
          animation:"eco-grid-move 10s linear infinite",
        }}/>

        {/* Toast */}
        {toast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] px-5 py-2.5 rounded-xl eco-font text-[11px] font-bold text-green-300 eco-fade-up whitespace-nowrap"
            style={{ background:"rgba(4,24,12,0.96)", border:"1px solid rgba(34,197,94,0.48)", boxShadow:"0 0 28px rgba(34,197,94,0.32)" }}>
            {toast}
          </div>
        )}

        {/* ── TOP NAV ── */}
        <header className="flex-shrink-0 flex items-center justify-between px-4 py-2 z-20 relative"
          style={{ background:"rgba(4,7,11,0.98)", borderBottom:"1px solid rgba(34,197,94,0.16)", backdropFilter:"blur(12px)" }}>

          {/* Left: Logo + Title */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background:"linear-gradient(135deg,#14532d,#166534)", boxShadow:"0 0 16px rgba(34,197,94,0.48)" }}>
                <Leaf size={17} className="text-green-400"/>
              </div>
              <div>
                <div className="eco-font text-sm font-black eco-neon-text" style={{ color:"#22c55e", textShadow:"0 0 10px rgba(34,197,94,0.65)" }}>EcoTatva</div>
                <div className="eco-font text-[7px] text-green-800 tracking-widest">Play · Protect · Heal</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10 min-w-0">
              <Globe size={15} className="text-green-400 flex-shrink-0"/>
              <div className="min-w-0">
                <div className="eco-font text-[13px] font-black eco-neon-text truncate"
                  style={{ color:"#22c55e", textShadow:"0 0 18px rgba(34,197,94,0.8)" }}>EARTH CONTROL ROOM</div>
                <div className="eco-font text-[7px] text-green-800 tracking-widest truncate">YOU CONTROL THE ACTIONS · EARTH FEELS THE CHANGE</div>
              </div>
            </div>
          </div>

          {/* Centre: clock */}
          <div className="hidden lg:block eco-font text-xs font-bold flex-shrink-0 mx-4"
            style={{ color:"#22c55e", textShadow:"0 0 8px rgba(34,197,94,0.5)" }}>
            {timeStr}
          </div>

          {/* Right: Stats + avatar */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
            <NavStat icon={<Zap size={11}/>}   label="ENERGY"    value={`${energy}/100`} color="#facc15" bar={energy} max={100}/>
            <NavStat icon={<Trophy size={11}/>} label="XP POINTS" value={`${xp.toLocaleString()} XP`}  color="#a78bfa"/>
            <NavStat icon={<Gift size={11}/>}   label="ECO COINS" value={coins.toString()}  color="#22c55e"/>
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-full flex items-center justify-center eco-font text-[10px] font-black flex-shrink-0"
                style={{ background:"linear-gradient(135deg,#14532d,#0c4a6e)", border:"2px solid rgba(34,197,94,0.48)", boxShadow:"0 0 14px rgba(34,197,94,0.32)" }}>
                SK
              </div>
              <div className="hidden xl:block">
                <div className="eco-font text-[10px] font-bold text-white leading-tight">Saket Kumar Seth</div>
                <div className="eco-font text-[8px] text-green-400">Eco Warrior · Level 3</div>
                <Bar v={1260} max={2000} color="#22c55e" h={3}/>
                <div className="eco-font text-[7px] text-gray-600 mt-0.5">1,260 / 2,000 XP</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 rounded border border-white/10 text-gray-500 hover:text-green-400 hover:border-green-400/30 transition-colors"><Bell size={13}/></button>
              <button className="p-1.5 rounded border border-white/10 text-gray-500 hover:text-green-400 hover:border-green-400/30 transition-colors"><Settings size={13}/></button>
            </div>
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="flex flex-1 overflow-hidden relative z-10">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:flex flex-col w-48 flex-shrink-0 border-r overflow-y-auto gap-3 p-3"
            style={{ background:"rgba(3,7,10,0.98)", borderColor:"rgba(34,197,94,0.11)" }}>

            {/* Game Mode badge */}
            <div className="rounded-2xl p-4 text-center"
              style={{ background:"linear-gradient(160deg,rgba(34,197,94,0.16),rgba(34,197,94,0.04))", border:"1px solid rgba(34,197,94,0.38)", boxShadow:"0 0 22px rgba(34,197,94,0.1)" }}>
              <Globe size={24} className="text-green-400 mx-auto mb-2"/>
              <div className="eco-font text-[10px] font-black text-green-400 tracking-widest">GAME MODE</div>
              <div className="eco-font text-[8px] text-green-700 mt-0.5">Earth Control Room</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="eco-font text-[8px] text-green-600">ACTIVE SESSION</span>
              </div>
            </div>

            {/* Quick missions */}
            <div className="rounded-xl p-3" style={{ background:"rgba(8,12,16,0.8)", border:"1px solid rgba(255,255,255,0.05)" }}>
              <div className="eco-font text-[8px] text-gray-600 tracking-widest mb-2.5 uppercase">Today's Progress</div>
              <div className="space-y-2.5">
                {MISSIONS.slice(0,3).map(m => (
                  <div key={m.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1" style={{ color:m.color }}>
                        {m.icon}
                        <span className="body-font text-[9px] text-gray-400">{m.label.split(" ").slice(0,2).join(" ")}</span>
                      </div>
                      <span className="eco-font text-[8px]" style={{ color:m.color }}>{Math.round(m.current/m.total*100)}%</span>
                    </div>
                    <Bar v={m.current} max={m.total} color={m.color} h={4}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Green streak */}
            <div className="rounded-xl p-3 text-center"
              style={{ background:"linear-gradient(160deg,rgba(34,197,94,0.1),rgba(6,10,14,0.85))", border:"1px solid rgba(34,197,94,0.22)" }}>
              <div className="eco-font text-[8px] text-green-700 tracking-widest uppercase">Green Streak</div>
              <div className="eco-font text-4xl font-black my-1 eco-neon-text" style={{ color:"#22c55e", textShadow:"0 0 22px rgba(34,197,94,0.65)" }}>5</div>
              <div className="body-font text-[9px] text-gray-500">Days</div>
              <div className="flex justify-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_,i)=><Flame key={i} size={11} className="text-green-500"/>)}
              </div>
              <div className="eco-font text-[8px] text-green-600 mt-1.5">Keep it going!</div>
            </div>

            {/* Rank */}
            <div className="rounded-xl p-3 flex items-center gap-2"
              style={{ background:"rgba(167,139,250,0.07)", border:"1px solid rgba(167,139,250,0.18)" }}>
              <Shield size={15} className="text-purple-400 flex-shrink-0"/>
              <div>
                <div className="eco-font text-[7px] text-gray-600">GLOBAL RANK</div>
                <div className="eco-font text-xs font-black text-purple-300">#4 of 2,841</div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-w-0">

            {/* Row 1: Planet Status | Globe | Missions+Leaderboard */}
            <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_230px] gap-3">

              {/* Planet Status */}
              <div className="rounded-2xl border p-4"
                style={{ background:"rgba(4,8,12,0.88)", borderColor:"rgba(34,197,94,0.16)" }}>
                <div className="eco-font text-[10px] font-black text-white tracking-widest">PLANET STATUS</div>
                <div className="body-font text-[9px] text-gray-500 mb-3 mt-0.5">Live Environmental Overview</div>
                <PlanetRow icon={<Globe size={13}/>}      label="Air Quality"     val="62"  status="Moderate"  color="#fb923c"/>
                <PlanetRow icon={<Droplets size={13}/>}   label="Water Purity"    val="71%" status="Good"       color="#38bdf8"/>
                <PlanetRow icon={<TreePine size={13}/>}   label="Forest Cover"    val="58%" status="Improving"  color="#22c55e"/>
                <PlanetRow icon={<PawPrint size={13}/>}   label="Wildlife Safety" val="64%" status="At Risk"    color="#ef4444"/>
                <PlanetRow icon={<TrendingUp size={13}/>} label="Climate Health"  val="69%" status="Stable"     color="#a3e635"/>
                <button className="mt-4 w-full py-1.5 eco-font text-[9px] font-bold tracking-widest flex items-center justify-center gap-1 rounded-xl border transition-all hover:bg-green-400/5"
                  style={{ borderColor:"rgba(34,197,94,0.28)", color:"#22c55e" }}>
                  View Analytics <ChevronRight size={9}/>
                </button>
              </div>

              {/* Globe centre */}
              <div className="rounded-2xl border flex items-center justify-center relative overflow-hidden min-h-[370px]"
                style={{ background:"radial-gradient(ellipse at 50% 50%,rgba(34,197,94,0.04) 0%,rgba(6,10,14,0.98) 70%)", borderColor:"rgba(34,197,94,0.13)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage:"linear-gradient(rgba(34,197,94,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.028) 1px,transparent 1px)",
                  backgroundSize:"30px 30px",
                }}/>
                {/* Corner brackets */}
                {[["top-2 left-2","1px 0 0 1px"],["top-2 right-2","1px 1px 0 0"],["bottom-2 left-2","0 0 1px 1px"],["bottom-2 right-2","0 1px 1px 0"]].map(([pos,bw],i)=>(
                  <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}
                    style={{ borderWidth:bw, borderStyle:"solid", borderColor:"rgba(34,197,94,0.28)" }}/>
                ))}
                <EarthGlobe sz={310}/>
              </div>

              {/* Right stack: Missions + Leaderboard */}
              <div className="flex flex-col gap-3">
                {/* Active Missions */}
                <div className="rounded-2xl border p-3 flex flex-col gap-2"
                  style={{ background:"rgba(4,8,12,0.88)", borderColor:"rgba(34,197,94,0.16)" }}>
                  <div className="flex items-center justify-between">
                    <div className="eco-font text-[10px] font-black text-white tracking-widest">ACTIVE MISSIONS</div>
                    <button className="eco-font text-[8px] text-green-400 hover:underline">View All</button>
                  </div>
                  <div className="body-font text-[8px] text-gray-500 -mt-1">Complete missions, earn XP and coins</div>
                  {MISSIONS.map(m => (
                    <div key={m.id}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span style={{ color:m.color }} className="flex-shrink-0">{m.icon}</span>
                        <span className="body-font text-[10px] text-gray-300 flex-1 font-semibold truncate">{m.label}</span>
                        <Tag color="#a78bfa">XP {m.xp}</Tag>
                        <Tag color="#22c55e">⬡{m.coins}</Tag>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bar v={m.current} max={m.total} color={m.color}/>
                        <span className="eco-font text-[8px] text-gray-600 flex-shrink-0">{m.current}/{m.total}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl border p-3 flex flex-col gap-1.5"
                  style={{ background:"rgba(4,8,12,0.88)", borderColor:"rgba(34,197,94,0.16)" }}>
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="eco-font text-[10px] font-black text-white tracking-widest">LEADERBOARD</div>
                    <button className="eco-font text-[8px] text-green-400 hover:underline">View All</button>
                  </div>
                  <div className="body-font text-[8px] text-gray-500 -mt-1 mb-1">Top Eco Warriors</div>
                  {LEADERS.map(e => (
                    <div key={e.rank} className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200"
                      style={ e.isYou
                        ? { background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.36)", boxShadow:"0 0 10px rgba(34,197,94,0.1)" }
                        : { border:"1px solid transparent" } }>
                      <span className="text-xs w-4 text-center flex-shrink-0">
                        {MEDALS[e.rank] ?? <span className="eco-font text-[8px] text-gray-600">{e.rank}</span>}
                      </span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center eco-font text-[8px] font-black flex-shrink-0"
                        style={{ background:e.isYou?"linear-gradient(135deg,#14532d,#0c4a6e)":"rgba(255,255,255,0.05)", border:`1px solid ${e.isYou?"rgba(34,197,94,0.48)":"rgba(255,255,255,0.07)"}` }}>
                        {e.avatar}
                      </div>
                      <span className="body-font text-[10px] flex-1 font-semibold truncate" style={{ color:e.isYou?"#22c55e":"#cbd5e1" }}>
                        {e.isYou?`${e.name} (You)`:e.name}
                      </span>
                      <span className="eco-font text-[9px] font-black flex-shrink-0" style={{ color:e.isYou?"#22c55e":"#475569" }}>
                        {e.xp.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Impact bar */}
            <div className="rounded-2xl border px-4 py-2.5 flex flex-wrap items-center gap-5"
              style={{ background:"rgba(4,8,12,0.88)", borderColor:"rgba(34,197,94,0.16)" }}>
              <div className="flex items-center gap-2">
                <Target size={15} className="text-green-400"/>
                <div>
                  <div className="eco-font text-[10px] font-black text-white tracking-widest">GLOBAL IMPACT</div>
                  <div className="body-font text-[8px] text-gray-500">Together we can heal the planet!</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-5 ml-auto">
                {[
                  { icon:<TreePine size={11}/>, label:"Trees Planted",     val:"12,450",  c:"#22c55e" },
                  { icon:<Recycle  size={11}/>, label:"Waste Removed",     val:"8,230 kg",c:"#a3e635" },
                  { icon:<Droplets size={11}/>, label:"Water Saved",       val:"15.6M L", c:"#38bdf8" },
                  { icon:<PawPrint size={11}/>, label:"Species Protected",  val:"320",     c:"#fb923c" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span style={{ color:s.c }}>{s.icon}</span>
                    <div>
                      <div className="body-font text-[8px] text-gray-500">{s.label}</div>
                      <div className="eco-font text-[10px] font-black" style={{ color:s.c }}>{s.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed + Action Cards */}
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">

              {/* Live Feed */}
              <div className="rounded-2xl border p-4 flex-shrink-0 w-full lg:w-52"
                style={{ background:"rgba(4,8,12,0.88)", borderColor:"rgba(34,197,94,0.16)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Radio size={12} className="text-green-400"/>
                  <span className="eco-font text-[10px] font-black text-white tracking-widest">LIVE EARTH FEED</span>
                  <span className="ml-auto eco-font text-[8px] px-1.5 py-0.5 rounded-full animate-pulse"
                    style={{ background:"rgba(34,197,94,0.16)", color:"#22c55e" }}>● Live</span>
                </div>
                <div className="body-font text-[8px] text-gray-500 mb-3">Real-time Updates</div>
                <div className="space-y-3">
                  {FEED.map(f => (
                    <div key={f.id} className="flex items-start gap-2">
                      <span style={{ color:f.color }} className="flex-shrink-0 mt-0.5">{f.icon}</span>
                      <div>
                        <p className="body-font text-[10px] text-gray-300 leading-relaxed">{f.text}</p>
                        <span className="eco-font text-[8px] text-gray-600">{f.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Cards */}
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="text-center">
                  <div className="eco-font text-sm font-black tracking-widest eco-neon-text"
                    style={{ color:"#22c55e", textShadow:"0 0 16px rgba(34,197,94,0.65)" }}>
                    CHOOSE YOUR ACTION
                  </div>
                  <div className="body-font text-[9px] text-gray-500">
                    Use Energy <Zap size={9} className="inline text-yellow-400 align-middle"/> to make an impact
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1">
                  {CARDS.map(c => <ActionCard key={c.id} card={c} onAct={handleAct} energy={energy}/>)}
                </div>

                {/* Super Action */}
                <button
                  className="w-full py-3 rounded-2xl eco-font text-sm font-black tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]"
                  style={{
                    background:"linear-gradient(90deg,rgba(250,204,21,0.22),rgba(34,197,94,0.14),rgba(250,204,21,0.22))",
                    border:"1px solid rgba(250,204,21,0.44)",
                    color:"#facc15",
                    boxShadow:"0 0 26px rgba(250,204,21,0.2), 0 0 55px rgba(34,197,94,0.08)",
                  }}>
                  <Leaf size={18} className="text-green-400"/>
                  <span style={{ textShadow:"0 0 16px rgba(250,204,21,0.75)" }}>SUPER ACTION</span>
                  <span className="body-font text-xs text-yellow-300/55 font-normal">Big Impact · More Rewards</span>
                  <div className="flex items-center gap-1 ml-1">
                    <Zap size={12} className="text-yellow-400"/>
                    <span className="eco-font text-yellow-400 font-black">50</span>
                  </div>
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* ── BOTTOM NAV ── */}
        <nav className="flex-shrink-0 flex items-center justify-around border-t px-4 py-2 z-20 relative"
          style={{ background:"rgba(3,6,10,0.99)", borderColor:"rgba(34,197,94,0.12)" }}>
          {[
            { I:Home,       l:"Home Base",  s:"Control Center", a:true },
            { I:Map,        l:"Map",         s:"Explore World"  },
            { I:Package,    l:"Inventory",   s:"Your Items"     },
            { I:Award,      l:"Badges",      s:"Achievements"   },
            { I:BookMarked, l:"Story Mode",  s:"Quests"         },
            { I:HelpCircle, l:"Help",        s:"Support"        },
          ].map(({ I, l, s, a }) => (
            <button key={l}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 hover:bg-green-400/5 group">
              <I size={15} className={a ? "text-green-400" : "text-gray-600 group-hover:text-green-400 transition-colors"}/>
              <span className={`eco-font text-[8px] font-bold tracking-wider ${a ? "text-green-400" : "text-gray-600 group-hover:text-green-300"}`}>{l}</span>
              <span className="body-font text-[7px] text-gray-700 hidden sm:block">{s}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}