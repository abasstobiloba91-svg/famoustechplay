import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPA_URL = "https://flfjlaaajsdzbhldgvso.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmpsYWFhanNkemJobGRndnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NjQ1MzcsImV4cCI6MjA4ODQ0MDUzN30.ka2SSllYgDF4cgGkJfw4cMUac8z3OkpmZC4JF_umCIQ";
const supabase = createClient(SUPA_URL, SUPA_KEY);


const G="#00E676",BL="#29B6F6",OR="#FF6D00",
  BG="#04060C",S="#07090F",CARD="#0B0E1A",C2="#0F1221",
  W="#fff",SB="#8892A4",MT="#3D4560",
  B1="rgba(255,255,255,0.06)",B2="rgba(255,255,255,0.10)";

const DB={
  users:[
    {id:1,email:"artist@demo.com",pass:"demo",role:"artist",name:"Nova Reyes",av:"NR",plan:"Pro",genre:"Afrobeats",country:"Lagos, NG"},
    {id:2,email:"admin@demo.com",pass:"admin",role:"admin",name:"Admin User",av:"AU"},
  ],
  releases:[
    {id:1,aId:1,title:"Midnight Frequencies",type:"Album",status:"distributed",genre:"Afrobeats",earnings:7650000,streams:182400,dists:["Spotify","Apple Music","Tidal","Boomplay","Audiomack"]},
    {id:2,aId:1,title:"Neon Drift",type:"Single",status:"pending_review",genre:"Afropop",earnings:0,streams:0,dists:[]},
    {id:3,aId:1,title:"Voltage EP",type:"EP",status:"in_distribution",genre:"Afrobeats",earnings:1970000,streams:47200,dists:["Spotify","Apple Music","Boomplay"]},
  ],
  payouts:[
    {id:1,aId:1,amount:3000000,status:"paid",at:"Mar 1, 2024",method:"Bank Transfer"},
    {id:2,aId:1,amount:2500000,status:"pending",at:"May 1, 2024",method:"Opay"},
  ],
};

const SM={
  distributed:{l:"Live",c:G},
  pending_review:{l:"In Review",c:"#FFB300"},
  in_distribution:{l:"Distributing",c:BL},
  rejected:{l:"Rejected",c:"#FF1744"}
};

const fmt=n=>`₦${new Intl.NumberFormat("en-NG").format(Math.round(n))}`;
const fK=n=>new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(n);

// ── REAL DSP SVG LOGOS ──────────────────────────────────────────────────────
const DSP={
  Spotify:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  "Apple Music":({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208a5.494 5.494 0 00-.39 1.548c-.06.536-.087 1.072-.085 1.61 0 .09-.01.18-.013.27v12.76c.003.1.013.2.016.29.009.5.04 1.003.129 1.499.246 1.388.943 2.484 2.073 3.298a4.973 4.973 0 001.6.664c.53.113 1.066.163 1.606.176.055 0 .11.008.165.011h12.027c.09-.003.18-.01.27-.013.495-.009.99-.04 1.475-.116a5.048 5.048 0 003.585-2.298 5.196 5.196 0 00.88-2.508c.06-.54.084-1.082.088-1.624.001-.065.01-.13.013-.195V6.41c-.003-.09-.01-.18-.013-.27zm-6.77 9.866a2.028 2.028 0 01-1.978.038l-4.822-2.453V7.965l6.8 1.743v6.282z"/>
    </svg>
  ),
  Tidal:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004zM8.008 16.004l4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004-4.004 4.004-4.004-4.004L4.004 12z"/>
    </svg>
  ),
  Boomplay:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F50"/>
      <path d="M7 8.5a1 1 0 011-1h3.5c2.485 0 4 1.343 4 3.25 0 1.907-1.515 3.25-4 3.25H9v2.5H7V8.5zm2 3.75h2.5c1.2 0 2-.55 2-1.5s-.8-1.5-2-1.5H9v3z" fill="#fff"/>
    </svg>
  ),
  Audiomack:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF6600"/>
      <path d="M5 15l3.5-7 3 5 2-3 2 5H5z" fill="#fff" fillRule="evenodd"/>
    </svg>
  ),
  "YouTube Music":({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#FF0000"/>
      <circle cx="12" cy="12" r="4" fill="#fff"/>
      <circle cx="12" cy="12" r="2" fill="#FF0000"/>
    </svg>
  ),
  Deezer:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="3" height="8" x="1" y="10" rx="1" fill="#00C7F2"/>
      <rect width="3" height="11" x="5.5" y="7" rx="1" fill="#FF0090"/>
      <rect width="3" height="14" x="10" y="4" rx="1" fill="#FF8000"/>
      <rect width="3" height="17" x="14.5" y="1" rx="1" fill="#00C7F2"/>
      <rect width="3" height="20" x="19" y="-2" rx="1" fill="#A238FF"/>
    </svg>
  ),
  Amazon:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#232F3E"/>
      <path d="M5 14.5c3.5 1.8 9.5 2.2 13-.2" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16.5 13.5l1.5 1-1.5.5" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="4" y="11" fontSize="6.5" fill="#fff" fontFamily="sans-serif" fontWeight="bold">music</text>
    </svg>
  ),
  Pandora:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#3668FF"/>
      <text x="6" y="16" fontSize="13" fill="#fff" fontFamily="sans-serif" fontWeight="900">P</text>
    </svg>
  ),
  SoundCloud:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF5500">
      <path d="M1.175 12.225c-.015.135 0 .27 0 .405v.045c.03 1.635 1.335 2.955 2.985 2.955h10.44c1.485 0 2.7-1.215 2.7-2.7V9.225a4.35 4.35 0 00-4.35-4.35 4.32 4.32 0 00-2.58.855A5.84 5.84 0 003.79 8.01c-.105 0-.195-.015-.3-.015-1.38 0-2.52.99-2.7 2.325-.285.075-.465.36-.465.63 0 .465.315.84.735.99.045.09.105.18.105.285z"/>
    </svg>
  ),
  Anghami:({size=22})=>(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#7B2FBE"/>
      <path d="M12 6a6 6 0 100 12A6 6 0 0012 6zm0 9a3 3 0 110-6 3 3 0 010 6z" fill="#fff"/>
      <circle cx="12" cy="12" r="1.5" fill="#7B2FBE"/>
    </svg>
  ),
};

const DSP_LIST=["Spotify","Apple Music","Tidal","Boomplay","Audiomack","YouTube Music","Deezer","Amazon","Pandora","SoundCloud","Anghami"];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#04060C;color:#fff;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::-webkit-scrollbar{width:2px;}::-webkit-scrollbar-thumb{background:#3D4560;border-radius:2px;}
button,input,select,textarea{font-family:'DM Sans',sans-serif;}
input,select,textarea{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);color:#fff;border-radius:14px;padding:13px 16px;font-size:14px;outline:none;width:100%;transition:border-color .2s,box-shadow .2s;resize:vertical;}
input:focus,select:focus,textarea:focus{border-color:#00E67650;box-shadow:0 0 0 3px #00E67608;}
input::placeholder,textarea::placeholder{color:#3D4560;}
select option{background:#07090F;}
a{text-decoration:none;color:inherit;}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 #00E67630}50%{box-shadow:0 0 20px 4px #00E67640}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes borderGlow{0%,100%{border-color:rgba(0,230,118,.2)}50%{border-color:rgba(0,230,118,.5)}}
.fu{animation:fadeUp .5s cubic-bezier(.16,1,.3,1) both;}
.fi{animation:fadeIn .3s ease both;}
.d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}.d4{animation-delay:.28s}.d5{animation-delay:.35s}
.gt{background:linear-gradient(90deg,#00E676,#29B6F6,#FF6D00,#00E676);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 6s linear infinite;}
.hover-lift{transition:transform .2s,box-shadow .2s;}.hover-lift:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,.6);}
.hover-glow{transition:border-color .2s,box-shadow .2s;}.hover-glow:hover{border-color:rgba(0,230,118,.25)!important;box-shadow:0 0 0 1px rgba(0,230,118,.1);}
.spinning{animation:spin .8s linear infinite;}
`;

const Logo=({sz=26,onClick})=>(
  <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,userSelect:"none",cursor:onClick?"pointer":"default"}}>
    <div style={{position:"relative",width:sz,height:sz}}>
      <svg width={sz} height={sz} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={G}/>
            <stop offset="50%" stopColor={BL}/>
            <stop offset="100%" stopColor={OR}/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="rgba(0,230,118,0.06)" stroke="rgba(0,230,118,0.15)" strokeWidth="1"/>
        <path d="M50 8A42 42 0 0 1 90 50" stroke={G} strokeWidth="11" strokeLinecap="round"/>
        <path d="M90 50A42 42 0 0 1 28 90" stroke={BL} strokeWidth="11" strokeLinecap="round"/>
        <path d="M28 90A42 42 0 0 1 50 8" stroke={OR} strokeWidth="11" strokeLinecap="round"/>
        <polygon points="40,32 40,68 72,50" fill="#fff"/>
      </svg>
    </div>
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:sz<28?14:17,fontWeight:800,letterSpacing:"-.5px",lineHeight:1}}>FamousTechPlay</div>
      <div style={{fontSize:6.5,fontWeight:700,color:SB,letterSpacing:"1.5px",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>DISTRIBUTE · EARN · GROW</div>
    </div>
  </div>
);

const Btn=({children,onClick,v="p",sz="md",full,disabled,sx:extra={}})=>{
  const V={
    p:{background:`linear-gradient(135deg,${G} 0%,#00C853 100%)`,color:"#030A06",boxShadow:`0 4px 20px ${G}30`},
    b:{background:`linear-gradient(135deg,${BL},#0284C7)`,color:"#030810"},
    o:{background:`linear-gradient(135deg,#FF9340,${OR})`,color:"#fff",boxShadow:`0 4px 18px ${OR}30`},
    g:{background:"transparent",color:SB,border:`1px solid ${B2}`},
    gl:{background:"rgba(255,255,255,.05)",color:"#fff",border:`1px solid rgba(255,255,255,.12)`},
    r:{background:"rgba(255,23,68,.08)",color:"#FF1744",border:"1px solid rgba(255,23,68,.18)"},
    s:{background:"rgba(0,230,118,.08)",color:G,border:"1px solid rgba(0,230,118,.2)"},
  };
  const SZ={
    sm:{padding:"7px 16px",fontSize:12.5,borderRadius:10,fontWeight:600},
    md:{padding:"11px 22px",fontSize:14,borderRadius:12,fontWeight:700},
    lg:{padding:"14px 30px",fontSize:15,borderRadius:14,fontWeight:700},
    xl:{padding:"16px 38px",fontSize:16,borderRadius:16,fontWeight:700},
  };
  return(
    <button className="hover-lift" onClick={onClick} disabled={disabled}
      style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
        letterSpacing:"-.01em",border:"none",cursor:disabled?"not-allowed":"pointer",
        opacity:disabled?.45:1,width:full?"100%":undefined,transition:"all .18s",
        ...V[v],...SZ[sz],...extra}}>
      {children}
    </button>
  );
};

const Badge=({s})=>{
  const m=SM[s]||{l:s,c:SB};
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:6,background:`${m.c}10`,
      border:`1px solid ${m.c}22`,borderRadius:999,padding:"4px 11px",
      fontSize:11,fontWeight:700,color:m.c,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".03em"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:m.c,flexShrink:0,
        animation:s==="distributed"?"glow 2s infinite":s==="in_distribution"?"pulse 1.5s infinite":"none"}}/>
      {m.l}
    </span>
  );
};

const DspTag=({name,size=18})=>{
  const Icon=DSP[name];
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.04)",
      border:`1px solid ${B1}`,borderRadius:8,padding:"5px 10px",fontSize:11.5,
      fontWeight:500,color:SB,whiteSpace:"nowrap"}}>
      {Icon&&<Icon size={size}/>}{name}
    </span>
  );
};

// ── NAVIGATION ──────────────────────────────────────────────────────────────
const Nav=({page,go})=>{
  const[sc,setSc]=useState(false);
  const[mob,setMob]=useState(window.innerWidth<768);
  const[mn,setMn]=useState(false);
  useEffect(()=>{
    const a=()=>setSc(window.scrollY>20),b=()=>setMob(window.innerWidth<768);
    window.addEventListener("scroll",a);window.addEventListener("resize",b);
    return()=>{window.removeEventListener("scroll",a);window.removeEventListener("resize",b);};
  },[]);
  const nv=p=>{go(p);setMn(false);window.scrollTo(0,0);};
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,
      height:66,display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 clamp(16px,4vw,56px)",
      background:sc?"rgba(4,6,12,.92)":"transparent",
      backdropFilter:sc?"blur(24px)":"none",
      borderBottom:sc?`1px solid ${B1}`:"none",
      transition:"all .3s"}}>
      <Logo sz={26} onClick={()=>nv("home")}/>
      {!mob?(
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {[["home","Home"],["careers","Careers"],["contact","Contact"]].map(([id,l])=>(
            <button key={id} onClick={()=>nv(id)}
              style={{padding:"8px 16px",borderRadius:10,fontSize:14,fontWeight:page===id?600:400,
                cursor:"pointer",color:page===id?"#fff":SB,
                background:page===id?"rgba(255,255,255,.07)":"transparent",
                border:page===id?`1px solid ${B1}`:"1px solid transparent",
                transition:"all .15s",fontFamily:"inherit"}}>
              {l}
            </button>
          ))}
          <div style={{width:1,height:20,background:B1,margin:"0 8px"}}/>
          <Btn sz="sm" onClick={()=>nv("login")}>Artist Login →</Btn>
        </div>
      ):(
        <>
          <button onClick={()=>setMn(!mn)}
            style={{width:38,height:38,background:"rgba(255,255,255,.05)",border:`1px solid ${B1}`,
              borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",
              justifyContent:"center",gap:5,cursor:"pointer"}}>
            {[1,2,3].map(i=><span key={i} style={{width:i===2?10:16,height:1.5,background:SB,borderRadius:1,display:"block"}}/>)}
          </button>
          {mn&&(
            <div className="fi" style={{position:"fixed",inset:0,top:66,background:"rgba(4,6,12,.97)",
              backdropFilter:"blur(24px)",zIndex:199,display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",gap:10}}>
              {[["home","Home"],["careers","Careers"],["contact","Contact"]].map(([id,l])=>(
                <button key={id} onClick={()=>nv(id)}
                  style={{padding:"16px 48px",fontSize:28,fontWeight:800,cursor:"pointer",
                    color:page===id?G:"#fff",background:"transparent",border:"none",
                    fontFamily:"'Syne',sans-serif",letterSpacing:"-.5px"}}>
                  {l}
                </button>
              ))}
              <div style={{height:1,width:60,background:B1,margin:"12px 0"}}/>
              <Btn sz="lg" onClick={()=>nv("login")}>Artist Login →</Btn>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

const Footer=({go})=>(
  <footer style={{background:S,borderTop:`1px solid ${B1}`,padding:"52px clamp(16px,5vw,72px) 32px"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:36,marginBottom:44}}>
        <div>
          <Logo sz={24} onClick={()=>go("home")}/>
          <p style={{fontSize:13,color:SB,lineHeight:1.75,marginTop:14,maxWidth:200}}>Africa's premier free music distribution platform.</p>
        </div>
        {[["Platform",["Features","Platforms","Analytics","Payouts"]],
          ["Company",["About","Careers","Blog","Press"]],
          ["Support",["Help Center","Contact","Privacy","Terms"]]].map(([t,items])=>(
          <div key={t}>
            <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".12em",textTransform:"uppercase",
              marginBottom:14,fontFamily:"'JetBrains Mono',monospace"}}>{t}</div>
            {items.map(it=>(
              <div key={it} style={{fontSize:13,color:SB,marginBottom:10,cursor:"pointer",transition:"color .14s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                onMouseLeave={e=>e.currentTarget.style.color=SB}>{it}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{borderTop:`1px solid ${B1}`,paddingTop:24,display:"flex",
        justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:12.5,color:MT}}>© 2024 FamousTechPlay. All rights reserved.</div>
        <div style={{height:2,width:48,background:`linear-gradient(90deg,${G},${BL},${OR})`,borderRadius:1}}/>
        <div style={{fontSize:12.5,color:MT}}>Made with ♥ in Lagos 🇳🇬</div>
      </div>
    </div>
  </footer>
);

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const Home=({go})=>{
  const dspPairs=DSP_LIST.map(n=>({name:n,Icon:DSP[n]}));

  const feats=[
    {i:"∞",t:"Upload Free. Forever.",d:"No fees, no hidden charges. Keep every naira you earn.",a:G},
    {i:"◉",t:"100+ Global Platforms",d:"Spotify, Apple Music, Boomplay, Audiomack & 97 more in 150+ countries.",a:BL},
    {i:"₦",t:"Multi-Currency Payouts",d:"NGN, USD, GBP, EUR. Opay, Palmpay, Wise — withdraw your way.",a:OR},
    {i:"◈",t:"Real-Time Analytics",d:"Track streams, revenue and listener demographics live.",a:G},
    {i:"⚡",t:"2–3 Day Distribution",d:"Reviewed, approved, and live on all platforms in days — not weeks.",a:BL},
    {i:"◆",t:"100% Rights Retained",d:"Your masters, your publishing, your identity. Always.",a:OR},
  ];

  const steps=[
    {n:"01",t:"Upload",d:"Submit your music, cover art and metadata. We review within 48 hours.",c:G},
    {n:"02",t:"We Distribute",d:"Your music goes live on 100+ platforms simultaneously, worldwide.",c:BL},
    {n:"03",t:"Get Paid",d:"Earnings land in your dashboard. Withdraw to bank, Opay, or Palmpay.",c:OR},
  ];

  const testi=[
    {name:"Daveed Ayo",g:"Afrobeats · Lagos",q:"FamousTechPlay had my music on Boomplay and Spotify in 2 days. Now I earn monthly in naira with zero stress.",av:"DA",c:G},
    {name:"Kemi Sounds",g:"Highlife · Enugu",q:"Withdrew to my Opay instantly. No drama, no waiting. I've tried DistroKid — this is easier and free.",av:"KS",c:BL},
    {name:"T.Rill",g:"Amapiano · Abuja",q:"Hit the Boomplay Top 100 last month. All from a free upload. No artist should be paying for distribution in 2024.",av:"TR",c:OR},
  ];

  const compare=[
    ["Upload Fee","FREE","$22.99/yr","$9.99/release"],
    ["Nigerian Platforms","✓ All","Partial","Partial"],
    ["NGN Direct Payouts","✓ Yes","✗ No","✗ No"],
    ["Opay / Palmpay","✓ Yes","✗ No","✗ No"],
    ["African Focus","✓ Built-in","✗ No","✗ No"],
  ];

  return(
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",padding:"100px clamp(16px,5vw,72px) 72px",
        position:"relative",overflow:"hidden",textAlign:"center"}}>
        {/* Background mesh */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          background:`
            radial-gradient(ellipse 70% 60% at 50% 0%,rgba(0,230,118,0.06) 0%,transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 80%,rgba(41,182,246,0.05) 0%,transparent 60%),
            radial-gradient(ellipse 40% 35% at 20% 70%,rgba(255,109,0,0.04) 0%,transparent 60%)
          `}}/>
        {/* Grid overlay */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:`linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)`,
          backgroundSize:"60px 60px"}}/>

        <div style={{position:"relative",zIndex:1}}>
          <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(0,230,118,0.07)",border:"1px solid rgba(0,230,118,0.2)",
            borderRadius:999,padding:"7px 18px",marginBottom:28}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:G,
              animation:"glow 2s infinite",display:"block",flexShrink:0}}/>
            <span style={{fontSize:11,fontWeight:700,color:G,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".06em"}}>
              FREE FOREVER · 100% ROYALTIES · NO CONTRACTS
            </span>
          </div>

          <h1 className="fu d1" style={{fontFamily:"'Syne',sans-serif",
            fontSize:"clamp(38px,8.5vw,88px)",fontWeight:900,
            letterSpacing:"-4px",lineHeight:.88,marginBottom:24,maxWidth:880}}>
            Your Music.<br/>
            <span style={{color:G}}>Your Money.</span><br/>
            <span className="gt">Your World.</span>
          </h1>

          <p className="fu d2" style={{fontSize:"clamp(15px,2vw,18px)",color:SB,lineHeight:1.75,
            maxWidth:520,margin:"0 auto 36px"}}>
            Africa's first completely free music distribution platform. Upload once — reach Spotify, Apple Music, Boomplay and 100+ platforms worldwide.
          </p>

          <div className="fu d3" style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:52}}>
            <Btn sz="xl" onClick={()=>go("login")}>Start Distributing Free →</Btn>
            <Btn v="gl" sz="xl" onClick={()=>go("contact")}>Talk to Us</Btn>
          </div>

          {/* Stats bar */}
          <div className="fu d4" style={{display:"flex",gap:"clamp(12px,3vw,40px)",flexWrap:"wrap",
            justifyContent:"center",padding:"20px 28px",
            background:"rgba(255,255,255,0.025)",backdropFilter:"blur(20px)",
            border:`1px solid ${B1}`,borderRadius:20,marginBottom:52,display:"inline-flex"}}>
            {[["₦3B+","Paid out"],["10M+","Streams"],["2,000+","Artists"],["100+","Platforms"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",padding:"0 8px"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(22px,4vw,36px)",
                  fontWeight:900,letterSpacing:"-1.5px",lineHeight:1}}>{v}</div>
                <div style={{fontSize:12,color:SB,marginTop:4,fontWeight:500}}>{l}</div>
              </div>
            ))}
          </div>

          {/* DSP ticker */}
          <div className="fu d5" style={{width:"100%",overflow:"hidden",
            WebkitMaskImage:"linear-gradient(90deg,transparent,black 10%,black 90%,transparent)"}}>
            <div style={{display:"flex",gap:10,animation:"ticker 24s linear infinite",width:"max-content"}}>
              {[...dspPairs,...dspPairs].map(({name,Icon},i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:7,
                  background:"rgba(255,255,255,0.04)",border:`1px solid ${B1}`,
                  borderRadius:10,padding:"7px 14px",whiteSpace:"nowrap"}}>
                  {Icon&&<Icon size={16}/>}
                  <span style={{fontSize:12,fontWeight:500,color:SB}}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DSP GRID */}
      <section style={{padding:"72px clamp(16px,5vw,72px)",background:S,
        borderTop:`1px solid ${B1}`,borderBottom:`1px solid ${B1}`}}>
        <div style={{maxWidth:1080,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:MT,letterSpacing:".12em",
            textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>
            Distribute to 100+ platforms including
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:24}}>
            {DSP_LIST.map(name=>{
              const Icon=DSP[name];
              return(
                <div key={name} className="hover-lift" style={{display:"flex",alignItems:"center",gap:9,
                  background:CARD,border:`1px solid ${B1}`,borderRadius:12,
                  padding:"10px 18px",cursor:"default"}}>
                  {Icon&&<Icon size={20}/>}
                  <span style={{fontSize:13,fontWeight:500,color:"#fff"}}>{name}</span>
                </div>
              );
            })}
            <div style={{display:"flex",alignItems:"center",gap:9,
              background:CARD,border:`1px solid ${B1}`,borderRadius:12,padding:"10px 18px"}}>
              <span style={{fontSize:13,fontWeight:600,color:SB}}>+ 89 more</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"88px clamp(16px,5vw,72px)"}}>
        <div style={{maxWidth:1060,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:".12em",
            textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:12}}>How It Works</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4.5vw,48px)",
            fontWeight:900,letterSpacing:"-2.5px",marginBottom:52}}>
            Three steps to <span style={{color:G}}>global distribution</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
            {steps.map((s,i)=>(
              <div key={i} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,
                borderRadius:20,padding:30,position:"relative",overflow:"hidden",textAlign:"left"}}>
                <div style={{position:"absolute",top:-10,right:-6,fontFamily:"'Syne',sans-serif",
                  fontSize:88,fontWeight:900,color:`${s.c}06`,lineHeight:1,userSelect:"none"}}>{s.n}</div>
                <div style={{width:48,height:48,borderRadius:14,background:`${s.c}12`,
                  border:`1px solid ${s.c}20`,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:22,marginBottom:18,fontFamily:"'Syne',sans-serif",fontWeight:900,
                  color:s.c,flexShrink:0}}>{s.n}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,
                  letterSpacing:"-.5px",marginBottom:10}}>{s.t}</div>
                <p style={{fontSize:14,color:SB,lineHeight:1.7}}>{s.d}</p>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${s.c},transparent)`,opacity:.7}}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"80px clamp(16px,5vw,72px)",background:S,
        borderTop:`1px solid ${B1}`,borderBottom:`1px solid ${B1}`}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <div style={{fontSize:11,fontWeight:700,color:BL,letterSpacing:".12em",
              textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:12}}>Platform Features</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,46px)",
              fontWeight:900,letterSpacing:"-2px"}}>
              Built for African artists.<br/><span style={{color:BL}}>By people who understand.</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14}}>
            {feats.map((f,i)=>(
              <div key={i} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,
                borderRadius:18,padding:26,display:"flex",gap:18,alignItems:"flex-start"}}>
                <div style={{width:46,height:46,borderRadius:13,background:`${f.a}10`,
                  border:`1px solid ${f.a}18`,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,fontWeight:900,color:f.a,fontFamily:"'Syne',sans-serif",flexShrink:0}}>{f.i}</div>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
                    letterSpacing:"-.3px",marginBottom:8}}>{f.t}</div>
                  <p style={{fontSize:13.5,color:SB,lineHeight:1.65}}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{padding:"88px clamp(16px,5vw,72px)"}}>
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(22px,4vw,40px)",
              fontWeight:900,letterSpacing:"-2px",marginBottom:10}}>The honest comparison</h2>
            <p style={{fontSize:14.5,color:SB}}>Why artists are switching to FamousTechPlay.</p>
          </div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <div style={{background:CARD,border:`1px solid ${B2}`,borderRadius:20,overflow:"hidden",minWidth:440}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",
                background:C2,borderBottom:`1px solid ${B1}`,padding:"14px 20px",gap:12}}>
                {["Feature",<span style={{color:G,fontFamily:"'JetBrains Mono',monospace"}}>FamousTechPlay</span>,"DistroKid","TuneCore"].map((h,i)=>(
                  <div key={i} style={{fontSize:11,fontWeight:700,color:i===0?MT:"#fff",
                    fontFamily:"'JetBrains Mono',monospace",textAlign:i>0?"center":"left"}}>{h}</div>
                ))}
              </div>
              {compare.map((row,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",
                  padding:"13px 20px",gap:12,
                  borderBottom:i<compare.length-1?`1px solid ${B1}`:undefined,
                  background:i%2===0?"transparent":"rgba(255,255,255,0.018)"}}>
                  <div style={{fontSize:13.5,fontWeight:500,color:"#fff"}}>{row[0]}</div>
                  {row.slice(1).map((v,j)=>(
                    <div key={j} style={{textAlign:"center",fontSize:13,fontWeight:j===0?700:400,
                      color:j===0?G:v.startsWith("✗")?MT:SB}}>{v}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"80px clamp(16px,5vw,72px)",background:S,
        borderTop:`1px solid ${B1}`,borderBottom:`1px solid ${B1}`}}>
        <div style={{maxWidth:1060,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:OR,letterSpacing:".12em",
              textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:12}}>Artist Stories</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,44px)",
              fontWeight:900,letterSpacing:"-2px"}}>Trusted by artists <span style={{color:OR}}>across Africa</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>
            {testi.map((t,i)=>(
              <div key={i} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,
                borderRadius:20,padding:28,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-4,left:20,fontSize:56,
                  color:t.c,fontFamily:"Georgia,serif",lineHeight:1,opacity:.4}}>"</div>
                <p style={{fontSize:14,color:SB,lineHeight:1.8,marginBottom:22,
                  marginTop:28,fontStyle:"italic",position:"relative"}}>{t.q}</p>
                <div style={{display:"flex",alignItems:"center",gap:12,
                  borderTop:`1px solid ${B1}`,paddingTop:18}}>
                  <div style={{width:40,height:40,borderRadius:11,
                    background:`linear-gradient(135deg,${t.c}20,${t.c}08)`,
                    color:t.c,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",
                    justifyContent:"center",border:`1px solid ${t.c}18`,
                    fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{t.av}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{t.name}</div>
                    <div style={{fontSize:11,color:MT,marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>{t.g}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"72px clamp(16px,5vw,72px) 88px"}}>
        <div style={{maxWidth:740,margin:"0 auto",textAlign:"center",
          background:`linear-gradient(145deg,${CARD},${C2})`,
          border:`1px solid ${B2}`,borderRadius:28,
          padding:"52px clamp(20px,5vw,64px)",position:"relative",overflow:"hidden",
          animation:"borderGlow 4s ease-in-out infinite"}}>
          <div style={{position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",
            width:320,height:320,borderRadius:"50%",
            background:`radial-gradient(${G}08,transparent 70%)`,pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${G}10`,
              border:`1px solid ${G}22`,borderRadius:999,padding:"6px 16px",marginBottom:20}}>
              <span style={{fontSize:11,fontWeight:700,color:G,fontFamily:"'JetBrains Mono',monospace"}}>JOIN 2,000+ ARTISTS</span>
            </div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,5vw,48px)",
              fontWeight:900,letterSpacing:"-2.5px",lineHeight:1,marginBottom:16}}>
              Ready to take your music <span className="gt">global?</span>
            </h2>
            <p style={{fontSize:15,color:SB,lineHeight:1.7,marginBottom:30,maxWidth:380,margin:"0 auto 30px"}}>
              Free forever. No credit card. No contracts. Just your music — everywhere.
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
              <Btn sz="xl" onClick={()=>go("login")}>Get Started Free →</Btn>
              <Btn v="gl" sz="xl" onClick={()=>go("contact")}>Talk to Us</Btn>
            </div>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
              {["✓ Free forever","✓ 100% royalties","✓ No contracts","✓ Nigerian support"].map(t=>(
                <span key={t} style={{fontSize:12.5,color:SB}}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ── CONTACT ────────────────────────────────────────────────────────────────
const Contact=()=>{
  const[f,sf]=useState({name:"",email:"",topic:"",msg:""});
  const[sent,setSent]=useState(false);
  const[ld,setLd]=useState(false);
  const[mob,setMob]=useState(window.innerWidth<768);
  const[openFaq,setOpenFaq]=useState(null);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const up=(k,v)=>sf(p=>({...p,[k]:v}));
  const L=({c})=><div style={{fontSize:12.5,fontWeight:600,color:SB,marginBottom:7}}>{c}</div>;
  const faqs=[
    {q:"How long does distribution take?",a:"Your music typically goes live within 2–3 business days after approval."},
    {q:"Is it really free?",a:"Yes — completely free, forever. No monthly fees. We keep 0% of your royalties."},
    {q:"How do I withdraw earnings?",a:"Request payouts to your Nigerian bank, Opay, Palmpay, Kuda, Wise or PayPal."},
    {q:"Do you support Afrobeats?",a:"Absolutely. Built for Afrobeats, Afropop, Highlife, Amapiano, Alté and all African genres."},
  ];
  return(
    <div style={{minHeight:"100vh",paddingTop:90}}>
      <section style={{padding:"52px clamp(16px,5vw,72px) 56px",textAlign:"center",
        background:`linear-gradient(180deg,${S},${BG})`,borderBottom:`1px solid ${B1}`}}>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,5.5vw,52px)",
          fontWeight:900,letterSpacing:"-2.5px",lineHeight:1,marginBottom:12}}>
          Get in <span style={{color:G}}>touch</span>
        </h1>
        <p style={{fontSize:15,color:SB,lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>Real humans. Fast responses. We're here to help you distribute and grow.</p>
      </section>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"56px clamp(16px,5vw,56px) 88px"}}>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"minmax(230px,1fr) minmax(260px,1.2fr)",gap:28,alignItems:"start"}}>
          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,marginBottom:16}}>Reach us directly</h2>
            {[{i:"✉",l:"Email",v:"support@famoustechplay.com",s:"Response within 24h",c:G},
              {i:"💬",l:"WhatsApp",v:"+234 800 FTP HELP",s:"Mon–Sat, 9am–8pm WAT",c:"#25D366"},
              {i:"📍",l:"Office",v:"Victoria Island, Lagos",s:"By appointment only",c:BL}].map((c,i)=>(
              <div key={i} className="hover-glow" style={{display:"flex",gap:14,padding:"14px 16px",
                background:CARD,border:`1px solid ${B1}`,borderRadius:14,marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:11,background:`${c.c}10`,
                  border:`1px solid ${c.c}18`,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:18,flexShrink:0}}>{c.i}</div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".08em",
                    textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:3}}>{c.l}</div>
                  <div style={{fontSize:13.5,fontWeight:600,marginBottom:2}}>{c.v}</div>
                  <div style={{fontSize:11.5,color:MT}}>{c.s}</div>
                </div>
              </div>
            ))}
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,margin:"22px 0 12px"}}>Follow us</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:9}}>
              {[["📸","Instagram","@famoustechplay","#E1306C"],["𝕏","X / Twitter","@famoustechplay","#1DA1F2"],
                ["🎵","TikTok","@famoustechplay","#FF0050"],["▶","YouTube","FamousTechPlay","#FF0000"]].map(([ic,n,h,c])=>(
                <div key={n} className="hover-glow" style={{display:"flex",gap:10,padding:"11px 13px",
                  background:CARD,border:`1px solid ${B1}`,borderRadius:12,alignItems:"center",cursor:"pointer"}}>
                  <div style={{width:32,height:32,borderRadius:8,background:`${c}12`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:14,fontWeight:700,color:c,border:`1px solid ${c}18`,flexShrink:0}}>{ic}</div>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:12.5,fontWeight:700}}>{n}</div>
                    <div style={{fontSize:10,color:MT,fontFamily:"'JetBrains Mono',monospace",marginTop:1}}>{h}</div>
                  </div>
                </div>
              ))}
            </div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,margin:"22px 0 12px"}}>FAQ</h2>
            {faqs.map((fq,i)=>(
              <div key={i} style={{background:CARD,border:`1px solid ${B1}`,borderRadius:13,marginBottom:8,overflow:"hidden"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  style={{width:"100%",padding:"14px 18px",display:"flex",justifyContent:"space-between",
                    alignItems:"center",cursor:"pointer",background:"none",border:"none",
                    textAlign:"left",color:"#fff",fontFamily:"inherit"}}>
                  <span style={{fontSize:14,fontWeight:600,flex:1,paddingRight:10}}>{fq.q}</span>
                  <span style={{fontSize:20,color:SB,transform:openFaq===i?"rotate(45deg)":"none",
                    transition:"transform .2s",flexShrink:0,display:"inline-block"}}>+</span>
                </button>
                {openFaq===i&&<div style={{padding:"0 18px 14px",fontSize:13.5,color:SB,lineHeight:1.7}}>{fq.a}</div>}
              </div>
            ))}
          </div>
          <div>
            {sent?(
              <div style={{background:CARD,border:`1px solid ${G}22`,borderRadius:20,
                padding:"36px 24px",textAlign:"center"}}>
                <div style={{fontSize:44,marginBottom:14}}>✅</div>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:900,marginBottom:8}}>Message Sent!</h3>
                <p style={{fontSize:14,color:SB,lineHeight:1.7,marginBottom:20}}>Our team will get back to you within 24 hours.</p>
                <Btn v="g" onClick={()=>{setSent(false);sf({name:"",email:"",topic:"",msg:""});}}>Send Another</Btn>
              </div>
            ):(
              <div style={{background:CARD,border:`1px solid ${B1}`,borderRadius:20,
                padding:"24px 24px 28px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${G},${BL},${OR})`}}/>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,marginBottom:18,paddingTop:6}}>Send a Message</h3>
                <div style={{display:"flex",flexDirection:"column",gap:13}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:11}}>
                    <div><L c="Name"/><input value={f.name} onChange={e=>up("name",e.target.value)} placeholder="Ada Okonkwo"/></div>
                    <div><L c="Email"/><input type="email" value={f.email} onChange={e=>up("email",e.target.value)} placeholder="ada@email.com"/></div>
                  </div>
                  <div><L c="Topic"/>
                    <select value={f.topic} onChange={e=>up("topic",e.target.value)}>
                      <option value="">Select a topic...</option>
                      {["Distribution Help","Payout Question","Account Access","Technical Issue","Partnership","General"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><L c="Message"/><textarea rows={5} value={f.msg} onChange={e=>up("msg",e.target.value)} placeholder="How can we help?"/></div>
                  <Btn full sz="lg" disabled={!f.name||!f.email||!f.msg||ld}
                    onClick={()=>{if(!f.name||!f.email||!f.msg)return;setLd(true);setTimeout(()=>{setLd(false);setSent(true);},1300);}}>
                    {ld?<><span className="spinning" style={{width:14,height:14,border:"2px solid rgba(0,0,0,.3)",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block"}}/>Sending…</>:"Send Message →"}
                  </Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CAREERS ─────────────────────────────────────────────────────────────────
const Careers=()=>{
  const[app,setApp]=useState(null);
  const[f,sf]=useState({name:"",email:"",exp:"",cover:""});
  const[sent,setSent]=useState(false);
  const[ld,setLd]=useState(false);
  const up=(k,v)=>sf(p=>({...p,[k]:v}));
  const roles=[
    {id:1,t:"Backend Engineer",d:"Engineering",l:"Lagos/Remote",a:G,desc:"Build and scale our distribution infrastructure with Node.js, PostgreSQL, Redis and AWS.",sk:["Node.js","PostgreSQL","AWS"]},
    {id:2,t:"Product Designer",d:"Design",l:"Lagos/Remote",a:BL,desc:"Design beautiful experiences for artists — from first upload to million-stream catalogues.",sk:["Figma","User Research","Prototyping"]},
    {id:3,t:"Artist Relations",d:"Partnerships",l:"Lagos",a:OR,desc:"Be the face of FamousTechPlay to Nigeria's top independent artists.",sk:["Music Industry","Afrobeats","Relationship Mgmt"]},
    {id:4,t:"Marketing Lead",d:"Marketing",l:"Lagos",a:BL,desc:"Own our growth in Nigeria and West Africa. Lead campaigns, manage socials.",sk:["Growth","Social Media","Content"]},
    {id:5,t:"Support Specialist",d:"Support",l:"Lagos/Remote",a:OR,desc:"Help artists solve problems fast and feel supported at every step.",sk:["Communication","CRM","Problem Solving"]},
  ];
  const L=({c})=><div style={{fontSize:12.5,fontWeight:600,color:SB,marginBottom:7}}>{c}</div>;
  const r=roles.find(x=>x.id===app)||{t:"Open Application",d:"Any",a:OR,desc:"Tell us why you'd be a great fit.",sk:[]};

  if(sent)return(
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",
      flexDirection:"column",textAlign:"center",padding:20,paddingTop:88}}>
      <div style={{fontSize:56,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>🎉</div>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:900,letterSpacing:"-1px",marginBottom:12}}>Application Received!</h2>
      <p style={{fontSize:15,color:SB,lineHeight:1.7,maxWidth:360,marginBottom:24}}>Our team will reach out within 5–7 business days.</p>
      <Btn v="g" onClick={()=>{setSent(false);setApp(null);sf({name:"",email:"",exp:"",cover:""});}}>← View All Roles</Btn>
    </div>
  );

  if(app!==null)return(
    <div style={{minHeight:"100vh",padding:"90px clamp(16px,5vw,64px) 80px"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>
        <button onClick={()=>setApp(null)}
          style={{fontSize:13.5,color:SB,marginBottom:22,cursor:"pointer",display:"flex",
            alignItems:"center",gap:7,background:"none",border:"none",fontFamily:"inherit",
            fontWeight:500,transition:"color .14s"}}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"}
          onMouseLeave={e=>e.currentTarget.style.color=SB}>← Back to careers</button>
        <div style={{background:CARD,border:`1px solid ${B2}`,borderRadius:20,padding:22,
          marginBottom:16,borderTop:`3px solid ${r.a}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            flexWrap:"wrap",gap:10,marginBottom:10}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:900}}>{r.t}</h2>
            <span style={{background:`${r.a}10`,color:r.a,border:`1px solid ${r.a}20`,
              borderRadius:999,padding:"4px 12px",fontSize:11,fontWeight:700,
              fontFamily:"'JetBrains Mono',monospace"}}>{r.d}</span>
          </div>
          <p style={{fontSize:13.5,color:SB,lineHeight:1.65}}>{r.desc}</p>
        </div>
        <div style={{background:CARD,border:`1px solid ${B1}`,borderRadius:20,padding:22}}>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,marginBottom:18}}>Your Application</h3>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:11}}>
              <div><L c="Full Name"/><input value={f.name} onChange={e=>up("name",e.target.value)} placeholder="Ada Okonkwo"/></div>
              <div><L c="Email"/><input type="email" value={f.email} onChange={e=>up("email",e.target.value)} placeholder="ada@email.com"/></div>
            </div>
            <div><L c="Applying for"/><input value={r.t} disabled style={{opacity:.5}}/></div>
            <div><L c="Years of Experience"/>
              <select value={f.exp} onChange={e=>up("exp",e.target.value)}>
                <option value="">Select...</option>
                {["0–1 years","1–3 years","3–5 years","5–10 years","10+ years"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div><L c="Why FamousTechPlay?"/><textarea rows={4} value={f.cover} onChange={e=>up("cover",e.target.value)} placeholder="Tell us about yourself and why you want to join..."/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Btn v="g" onClick={()=>setApp(null)} full>Cancel</Btn>
              <Btn full disabled={!f.name||!f.email||ld}
                onClick={()=>{if(!f.name||!f.email)return;setLd(true);setTimeout(()=>{setLd(false);setSent(true);},1400);}}>
                {ld?<><span className="spinning" style={{width:14,height:14,border:"2px solid rgba(0,0,0,.3)",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block"}}/>Sending…</>:"Submit →"}
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",paddingTop:90}}>
      <section style={{padding:"52px clamp(16px,5vw,72px) 60px",textAlign:"center",
        background:`linear-gradient(180deg,${S},${BG})`,borderBottom:`1px solid ${B1}`}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${BL}10`,
          border:`1px solid ${BL}22`,borderRadius:999,padding:"6px 16px",marginBottom:16}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:BL,flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:700,color:BL,fontFamily:"'JetBrains Mono',monospace"}}>{roles.length} OPEN ROLES</span>
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,5.5vw,54px)",
          fontWeight:900,letterSpacing:"-2.5px",lineHeight:.95,marginBottom:14}}>
          Build the future of<br/><span className="gt">African music</span>
        </h1>
        <p style={{fontSize:15,color:SB,lineHeight:1.75,maxWidth:420,margin:"0 auto"}}>Join a small, ambitious team putting African artists on every stage in the world.</p>
      </section>
      <section style={{padding:"56px clamp(16px,5vw,72px) 88px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,30px)",fontWeight:900,
            letterSpacing:"-.8px",marginBottom:22}}>Open Positions</h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {roles.map(r=>(
              <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,
                borderRadius:16,padding:"20px 22px",borderLeft:`3px solid ${r.a}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  flexWrap:"wrap",gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",marginBottom:7}}>
                      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16.5,fontWeight:800}}>{r.t}</h3>
                      <span style={{background:`${r.a}10`,color:r.a,border:`1px solid ${r.a}18`,
                        borderRadius:999,padding:"3px 10px",fontSize:10.5,fontWeight:700,
                        fontFamily:"'JetBrains Mono',monospace"}}>{r.d}</span>
                      <span style={{fontSize:11.5,color:MT,fontFamily:"'JetBrains Mono',monospace"}}>{r.l}</span>
                    </div>
                    <p style={{fontSize:13.5,color:SB,lineHeight:1.6,marginBottom:10}}>{r.desc}</p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {r.sk.map(sk=>(
                        <span key={sk} style={{fontSize:10.5,color:MT,background:`${r.a}07`,
                          borderRadius:6,padding:"3px 8px",border:`1px solid ${r.a}12`,
                          fontFamily:"'JetBrains Mono',monospace"}}>{sk}</span>
                      ))}
                    </div>
                  </div>
                  <Btn onClick={()=>setApp(r.id)} sz="sm" sx={{flexShrink:0}}>Apply →</Btn>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,background:CARD,border:`1px solid ${B2}`,borderRadius:16,
            padding:22,textAlign:"center",borderTop:`2px solid ${OR}`}}>
            <div style={{fontSize:24,marginBottom:8}}>💌</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,marginBottom:6}}>Don't see your role?</h3>
            <p style={{fontSize:13.5,color:SB,lineHeight:1.6,marginBottom:14}}>We're always looking for exceptional people who care about African music.</p>
            <Btn v="o" onClick={()=>setApp(0)}>Send Open Application →</Btn>
          </div>
        </div>
      </section>
    </div>
  );
};

// ── LOGIN ────────────────────────────────────────────────────────────────────
const Login=({go,onLogin})=>{
  const[mode,setMode]=useState("signin");
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[name,setName]=useState("");
  const[err,setErr]=useState("");
  const[msg,setMsg]=useState("");
  const[ld,setLd]=useState(false);
  const[mob,setMob]=useState(window.innerWidth<768);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

  const doSignIn=async()=>{
    if(!email||!pass)return;
    setLd(true);setErr("");
    try{
      const d=await supa.auth.signInWithPassword({email,password:pass});
      if(d.error){
        setErr(d.error.message||"Invalid email or password.");
        setLd(false);return;
      }
      const token=d.access_token;
      const userId=d.user?.id;
      // Get profile for role
      let profile=await supa.auth.getProfile(userId,token);
      // If no profile yet, use user metadata
      if(!profile){
        profile={
          id:userId,
          name:d.user?.user_metadata?.name||email.split("@")[0],
          role:d.user?.user_metadata?.role||"artist",
          plan:"Free",
          avatar_initials:(d.user?.user_metadata?.name||"U").slice(0,2).toUpperCase()
        };
      }
      // Store session in memory
      const userData={
        id:userId,
        email:d.user?.email,
        name:profile.name||email.split("@")[0],
        role:profile.role||"artist",
        plan:profile.plan||"Free",
        av:profile.avatar_initials||(profile.name||"U").slice(0,2).toUpperCase(),
        token
      };
      onLogin(userData);
    }catch(e){
      setErr("Connection error. Please check your internet and try again.");
      setLd(false);
    }
  };

  const doSignUp=async()=>{
    if(!email||!pass||!name)return;
    if(pass.length<6){setErr("Password must be at least 6 characters.");return;}
    setLd(true);setErr("");
    try{
      const d=await supa.auth.signUp({email,password:pass,options:{data:{name}}});
      if(d.error){setErr(d.error.message||"Could not create account.");setLd(false);return;}
      if(d.data?.user){
        await supa.from("profiles").upsert({
          id:d.data.user.id,email,name,role:"artist",plan:"Free",av:name.slice(0,2).toUpperCase()
        });
      }
      setLd(false);
      setMsg("✅ Account created! You can now sign in.");
      setMode("signin");
    }catch(e){
      setErr("Connection error. Please try again.");
      setLd(false);
    }
  };

  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:mob?"column":"row",overflow:"hidden"}}>
      {!mob&&(
        <div style={{flex:"0 0 46%",background:S,display:"flex",flexDirection:"column",
          justifyContent:"center",padding:"60px clamp(32px,5vw,72px)",
          position:"relative",overflow:"hidden",borderRight:`1px solid ${B1}`}}>
          <div style={{position:"absolute",top:-100,right:-80,width:400,height:400,borderRadius:"50%",background:`radial-gradient(${G}07,transparent 65%)`,pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:-80,left:-60,width:300,height:300,borderRadius:"50%",background:`radial-gradient(${BL}05,transparent 65%)`,pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{cursor:"pointer",marginBottom:52}} onClick={()=>go("home")}><Logo sz={28}/></div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,letterSpacing:"-2px",lineHeight:1.05,marginBottom:16}}>
              Distribute your music.<br/><span style={{color:G}}>Keep everything.</span>
            </h1>
            <p style={{fontSize:14.5,color:SB,lineHeight:1.75,marginBottom:36,maxWidth:340}}>
              Join 2,000+ Nigerian artists already earning on Spotify, Boomplay, Apple Music & 97 more platforms — completely free.
            </p>
            {[["🎵","100+ platforms worldwide"],["₦","Multi-currency payouts"],["🔒","100% royalties kept"],["⚡","Live in 2–3 business days"]].map(([ic,t])=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:32,height:32,borderRadius:9,background:`${G}10`,border:`1px solid ${G}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{ic}</div>
                <span style={{fontSize:14,color:SB}}>{t}</span>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:32,flexWrap:"wrap"}}>
              {["Spotify","Apple Music","Boomplay","Audiomack"].map(name=>{
                const Icon=DSP[name];
                return(
                  <div key={name} style={{width:36,height:36,borderRadius:10,background:B1,border:`1px solid ${B1}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {Icon&&<Icon size={18}/>}
                  </div>
                );
              })}
              <div style={{width:36,height:36,borderRadius:10,background:B1,border:`1px solid ${B1}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:MT,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>+97</div>
            </div>
          </div>
        </div>
      )}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:mob?"88px 20px 40px":"44px 32px",minHeight:mob?"100vh":undefined,position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 50%,${G}04,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{width:"100%",maxWidth:400,position:"relative",zIndex:1}}>
          {mob&&<div style={{display:"flex",justifyContent:"center",marginBottom:32}}><Logo sz={26} onClick={()=>go("home")}/></div>}
          <button onClick={()=>go("home")}
            style={{fontSize:13,color:MT,marginBottom:28,cursor:"pointer",display:"flex",alignItems:"center",gap:6,background:"none",border:"none",fontFamily:"inherit",fontWeight:500,transition:"color .14s"}}
            onMouseEnter={e=>e.currentTarget.style.color=SB}
            onMouseLeave={e=>e.currentTarget.style.color=MT}>← Back to website</button>

          {/* Tab switcher */}
          <div style={{display:"flex",background:C2,borderRadius:14,padding:4,marginBottom:28,border:`1px solid ${B1}`}}>
            {[["signin","Sign In"],["signup","Create Account"]].map(([m,l])=>(
              <button key={m} onClick={()=>{setMode(m);setErr("");setMsg("");}}
                style={{flex:1,padding:"10px",borderRadius:11,fontSize:13.5,fontWeight:700,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .18s",
                  background:mode===m?"rgba(255,255,255,0.08)":"transparent",
                  color:mode===m?"#fff":SB}}>
                {l}
              </button>
            ))}
          </div>

          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:900,letterSpacing:"-1px",marginBottom:6}}>
            {mode==="signin"?"Welcome back":"Join FamousTechPlay"}
          </h2>
          <p style={{fontSize:14,color:SB,marginBottom:24}}>
            {mode==="signin"?"Sign in to your account":"Create your free artist account"}
          </p>

          {msg&&(
            <div style={{background:"rgba(0,230,118,.07)",border:`1px solid ${G}25`,borderRadius:12,padding:"11px 15px",fontSize:13.5,color:G,marginBottom:18,lineHeight:1.6}}>{msg}</div>
          )}
          {err&&(
            <div style={{background:"rgba(255,23,68,.07)",border:"1px solid rgba(255,23,68,.18)",borderRadius:12,padding:"11px 15px",fontSize:13.5,color:"#FF1744",marginBottom:18,lineHeight:1.5}}>{err}</div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {mode==="signup"&&(
              <div>
                <div style={{fontSize:12.5,fontWeight:600,color:SB,marginBottom:7}}>Your Name</div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ada Okonkwo"/>
              </div>
            )}
            <div>
              <div style={{fontSize:12.5,fontWeight:600,color:SB,marginBottom:7}}>Email</div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                onKeyDown={e=>e.key==="Enter"&&(mode==="signin"?doSignIn():doSignUp())}/>
            </div>
            <div>
              <div style={{fontSize:12.5,fontWeight:600,color:SB,marginBottom:7}}>Password</div>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
                onKeyDown={e=>e.key==="Enter"&&(mode==="signin"?doSignIn():doSignUp())}/>
              {mode==="signup"&&<div style={{fontSize:11,color:MT,marginTop:5}}>Minimum 6 characters</div>}
            </div>
            <Btn full sz="lg"
              disabled={mode==="signin"?(!email||!pass||ld):(!email||!pass||!name||ld)}
              onClick={mode==="signin"?doSignIn:doSignUp}>
              {ld?(
                <><span className="spinning" style={{width:14,height:14,border:"2px solid rgba(0,0,0,.3)",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block"}}/>
                {mode==="signin"?"Signing in…":"Creating account…"}</>
              ):mode==="signin"?"Sign In →":"Create Free Account →"}
            </Btn>
          </div>

          {mode==="signin"&&(
            <>
              <div style={{margin:"22px 0",display:"flex",alignItems:"center",gap:10}}>
                <div style={{flex:1,height:1,background:B1}}/>
                <span style={{fontSize:10.5,color:MT,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".05em"}}>OR</span>
                <div style={{flex:1,height:1,background:B1}}/>
              </div>
              <p style={{fontSize:12.5,color:MT,textAlign:"center"}}>
                Don't have an account?{" "}
                <span onClick={()=>{setMode("signup");setErr("");}} style={{color:G,cursor:"pointer",fontWeight:600}}>Sign up free →</span>
              </p>
            </>
          )}
          {mode==="signup"&&(
            <p style={{fontSize:12,color:MT,marginTop:16,textAlign:"center",lineHeight:1.6}}>
              By creating an account you agree to our Terms of Service. Already have one?{" "}
              <span onClick={()=>{setMode("signin");setErr("");}} style={{color:G,cursor:"pointer",fontWeight:600}}>Sign in</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ArtistDash=({user,onLogout})=>{
  const[tab,setTab]=useState("overview");
  const[mob,setMob]=useState(window.innerWidth<768);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const rels=DB.releases.filter(r=>r.aId===user.id);
  const pays=DB.payouts.filter(p=>p.aId===user.id);
  const totE=rels.reduce((s,r)=>s+r.earnings,0);
  const totS=rels.reduce((s,r)=>s+r.streams,0);
  const ml=mob?0:210;

  const SideBtn=({id,ic,l})=>(
    <button onClick={()=>setTab(id)}
      style={{width:"100%",display:"flex",alignItems:"center",gap:12,
        padding:"11px 20px",cursor:"pointer",fontFamily:"inherit",border:"none",
        background:tab===id?`${G}08`:"transparent",
        borderLeft:tab===id?`2px solid ${G}`:"2px solid transparent",
        color:tab===id?"#fff":SB,fontSize:14,fontWeight:tab===id?600:400,
        transition:"all .14s",textAlign:"left"}}>
      <span style={{fontSize:17}}>{ic}</span>{l}
    </button>
  );
  const MobBtn=({id,ic,l})=>(
    <button onClick={()=>setTab(id)}
      style={{flex:1,padding:"10px 6px",display:"flex",flexDirection:"column",alignItems:"center",
        gap:3,cursor:"pointer",background:"none",border:"none",
        color:tab===id?G:MT,transition:"color .14s"}}>
      <span style={{fontSize:19}}>{ic}</span>
      <span style={{fontSize:9.5,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".03em"}}>{l}</span>
    </button>
  );

  return(
    <div style={{minHeight:"100vh",background:BG}}>
      {/* Topbar */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:60,
        background:"rgba(4,6,12,.95)",backdropFilter:"blur(24px)",
        borderBottom:`1px solid ${B1}`,zIndex:100,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 clamp(14px,3vw,28px)"}}>
        <Logo sz={22}/>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:9,
            background:`linear-gradient(135deg,${G}20,${BL}10)`,color:G,
            fontWeight:800,fontSize:12,display:"flex",alignItems:"center",
            justifyContent:"center",border:`1px solid ${G}16`,
            fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{user.av}</div>
          {!mob&&<div>
            <div style={{fontSize:13.5,fontWeight:600,lineHeight:1}}>{user.name}</div>
            <div style={{fontSize:10,color:OR,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{user.plan} Plan</div>
          </div>}
          <Btn v="g" sz="sm" onClick={onLogout}>Logout</Btn>
        </div>
      </div>
      {/* Sidebar */}
      {!mob&&(
        <div style={{position:"fixed",top:60,left:0,bottom:0,width:210,
          background:S,borderRight:`1px solid ${B1}`,padding:"20px 0",overflowY:"auto"}}>
          {[["overview","🏠","Overview"],["releases","🎵","Releases"],
            ["earnings","📊","Earnings"],["payouts","💳","Payouts"]].map(([id,ic,l])=>(
            <SideBtn key={id} id={id} ic={ic} l={l}/>
          ))}
          <div style={{position:"absolute",bottom:20,left:0,right:0,padding:"0 16px"}}>
            <div style={{background:CARD,border:`1px solid ${B1}`,borderRadius:12,padding:"12px 14px"}}>
              <div style={{fontSize:10,color:MT,fontFamily:"'JetBrains Mono',monospace",marginBottom:6,fontWeight:700}}>NEED HELP?</div>
              <div style={{fontSize:12.5,color:SB,lineHeight:1.6,marginBottom:10}}>Contact our artist support team anytime.</div>
              <Btn v="s" sz="sm" full>Get Support</Btn>
            </div>
          </div>
        </div>
      )}
      {/* Content */}
      <div style={{marginLeft:ml,padding:`76px clamp(14px,3vw,30px) ${mob?"88px":"40px"}`,minHeight:"100vh"}}>

        {tab==="overview"&&(
          <div>
            <div className="fu" style={{marginBottom:26}}>
              <div style={{fontSize:11,color:MT,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,letterSpacing:".06em",marginBottom:6}}>DASHBOARD</div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(22px,3.5vw,34px)",fontWeight:900,letterSpacing:"-1.2px"}}>Welcome back, {user.name.split(" ")[0]} 👋</h1>
            </div>
            <div className="fu d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
              {[[fmt(totE),"Total Earnings",G,"💰"],[fK(totS),"Total Streams",BL,"🎵"],[`${rels.length}`,"Releases",OR,"📀"],["2,000+","Community",G,"🌍"]].map(([v,l,a,ic])=>(
                <div key={l} style={{background:CARD,border:`1px solid ${B1}`,borderRadius:16,padding:18,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,right:0,width:70,height:70,borderRadius:"50%",background:`radial-gradient(${a}12,transparent 70%)`,pointerEvents:"none"}}/>
                  <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {l}<span style={{fontSize:16}}>{ic}</span>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,2.8vw,28px)",fontWeight:900,letterSpacing:"-1px"}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="fu d2">
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,marginBottom:14}}>Recent Releases</div>
              {rels.slice(0,3).map(r=>(
                <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
                  <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${G}18,${BL}10)`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎵</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14.5,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{r.title}</div>
                    <div style={{fontSize:12,color:SB}}>{r.type} · {r.genre}</div>
                  </div>
                  <Badge s={r.status}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="releases"&&(
          <div>
            <div className="fu" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>My Releases</h2>
              <Btn sz="sm">+ Upload New</Btn>
            </div>
            <div className="fu d1" style={{display:"flex",flexDirection:"column",gap:12}}>
              {rels.map(r=>(
                <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:16,padding:"18px 20px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:15,flexWrap:"wrap"}}>
                    <div style={{width:52,height:52,borderRadius:13,background:`linear-gradient(135deg,${G}18,${BL}10)`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🎵</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:5}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{r.title}</div>
                        <Badge s={r.status}/>
                      </div>
                      <div style={{fontSize:12.5,color:SB,marginBottom:12}}>{r.type} · {r.genre}</div>
                      <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:r.dists.length>0?12:0}}>
                        <div style={{fontSize:12.5}}><span style={{color:MT,fontFamily:"'JetBrains Mono',monospace"}}>Earnings: </span><span style={{color:G,fontWeight:700}}>{fmt(r.earnings)}</span></div>
                        <div style={{fontSize:12.5}}><span style={{color:MT,fontFamily:"'JetBrains Mono',monospace"}}>Streams: </span><span style={{fontWeight:600}}>{fK(r.streams)}</span></div>
                      </div>
                      {r.dists.length>0&&(
                        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                          {r.dists.map(name=>{
                            const Icon=DSP[name];
                            return(
                              <span key={name} style={{display:"inline-flex",alignItems:"center",gap:5,
                                background:"rgba(255,255,255,0.04)",border:`1px solid ${B1}`,
                                borderRadius:7,padding:"4px 9px",fontSize:11.5,color:SB}}>
                                {Icon&&<Icon size={14}/>}{name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="earnings"&&(
          <div>
            <div className="fu" style={{marginBottom:22}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>Earnings</h2>
            </div>
            <div className="fu d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
              {[[fmt(totE),"Total Lifetime",G],[fmt(1970000),"This Month",BL],[fmt(7650000),"Best Release",OR]].map(([v,l,a])=>(
                <div key={l} style={{background:CARD,border:`1px solid ${B1}`,borderRadius:16,padding:18,borderTop:`2px solid ${a}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>{l}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(16px,2.5vw,26px)",fontWeight:900,color:a}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="fu d2" style={{display:"flex",flexDirection:"column",gap:10}}>
              {rels.filter(r=>r.earnings>0).map(r=>(
                <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:38,height:38,borderRadius:10,background:`${G}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🎵</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14.5,fontWeight:600}}>{r.title}</div>
                    <div style={{fontSize:12,color:SB,marginTop:2}}>{fK(r.streams)} streams · {r.type}</div>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:900,color:G,flexShrink:0}}>{fmt(r.earnings)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="payouts"&&(
          <div>
            <div className="fu" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:12}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>Payouts</h2>
              <Btn v="b" sz="sm">Request Payout</Btn>
            </div>
            <div className="fu d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:22}}>
              {[[fmt(totE-5500000),"Available",G],[fmt(2500000),"Pending",OR],[fmt(3000000),"Paid Out",BL]].map(([v,l,a])=>(
                <div key={l} style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:16,borderTop:`2px solid ${a}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:8}}>{l}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(15px,2.2vw,24px)",fontWeight:900,color:a}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="fu d2" style={{display:"flex",flexDirection:"column",gap:10}}>
              {pays.map(p=>(
                <div key={p.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:38,height:38,borderRadius:10,background:p.status==="paid"?`${G}10`:`${OR}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{p.status==="paid"?"✓":"⏳"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14.5,fontWeight:700}}>{fmt(p.amount)}</div>
                    <div style={{fontSize:12,color:SB,marginTop:2}}>{p.method} · {p.at}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:p.status==="paid"?G:OR,background:p.status==="paid"?`${G}10`:`${OR}10`,border:`1px solid ${p.status==="paid"?G:OR}22`,borderRadius:999,padding:"4px 11px",fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{p.status==="paid"?"Paid":"Pending"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {mob&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(4,6,12,.97)",
          borderTop:`1px solid ${B1}`,display:"flex",zIndex:100}}>
          {[["overview","🏠","Home"],["releases","🎵","Releases"],["earnings","📊","Earnings"],["payouts","💳","Payouts"]].map(([id,ic,l])=>(
            <MobBtn key={id} id={id} ic={ic} l={l}/>
          ))}
        </div>
      )}
    </div>
  );
};

// ── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDash=({user,onLogout})=>{
  const[tab,setTab]=useState("overview");
  const[mob,setMob]=useState(window.innerWidth<768);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const ml=mob?0:210;

  return(
    <div style={{minHeight:"100vh",background:BG}}>
      <div style={{position:"fixed",top:0,left:0,right:0,height:60,
        background:"rgba(4,6,12,.95)",backdropFilter:"blur(24px)",
        borderBottom:`1px solid ${B1}`,zIndex:100,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 clamp(14px,3vw,28px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo sz={22}/>
          <span style={{background:`${OR}10`,color:OR,border:`1px solid ${OR}22`,
            borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:700,
            fontFamily:"'JetBrains Mono',monospace",letterSpacing:".04em"}}>ADMIN</span>
        </div>
        <Btn v="g" sz="sm" onClick={onLogout}>Logout</Btn>
      </div>
      {!mob&&(
        <div style={{position:"fixed",top:60,left:0,bottom:0,width:210,
          background:S,borderRight:`1px solid ${B1}`,padding:"20px 0"}}>
          {[["overview","🏠","Overview"],["releases","🎵","All Releases"],
            ["artists","👥","Artists"],["payouts","💳","Payouts"]].map(([id,ic,l])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:12,
                padding:"11px 20px",cursor:"pointer",fontFamily:"inherit",border:"none",
                background:tab===id?`${OR}08`:"transparent",
                borderLeft:tab===id?`2px solid ${OR}`:"2px solid transparent",
                color:tab===id?"#fff":SB,fontSize:14,fontWeight:tab===id?600:400,
                transition:"all .14s",textAlign:"left"}}>
              <span style={{fontSize:17}}>{ic}</span>{l}
            </button>
          ))}
        </div>
      )}
      <div style={{marginLeft:ml,padding:`76px clamp(14px,3vw,30px) ${mob?"88px":"40px"}`,minHeight:"100vh"}}>

        {tab==="overview"&&(
          <div>
            <div className="fu" style={{marginBottom:26}}>
              <div style={{fontSize:11,color:MT,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,letterSpacing:".06em",marginBottom:6}}>ADMIN PANEL</div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,30px)",fontWeight:900,letterSpacing:"-.8px"}}>Platform Overview</h2>
            </div>
            <div className="fu d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
              {[["2,000+","Total Artists",G],["127","Releases This Month",BL],["14","Pending Review",OR],[fmt(12800000),"Total Payouts",G]].map(([v,l,a])=>(
                <div key={l} style={{background:CARD,border:`1px solid ${B1}`,borderRadius:16,padding:18,borderTop:`2px solid ${a}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:MT,letterSpacing:".07em",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>{l}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,2.5vw,28px)",fontWeight:900,color:a}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,marginBottom:14}}>Pending Review</div>
            {DB.releases.filter(r=>r.status==="pending_review").map(r=>(
              <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:10,flexWrap:"wrap"}}>
                <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${G}18,${BL}10)`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎵</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14.5,fontWeight:600}}>{r.title}</div>
                  <div style={{fontSize:12,color:SB,marginTop:2}}>{r.type} · {r.genre}</div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <Btn sz="sm" v="s">✓ Approve</Btn>
                  <Btn sz="sm" v="r">✗ Reject</Btn>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="releases"&&(
          <div>
            <div className="fu" style={{marginBottom:22}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>All Releases</h2>
            </div>
            <div className="fu d1" style={{display:"flex",flexDirection:"column",gap:10}}>
              {DB.releases.map(r=>(
                <div key={r.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"15px 18px",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                      <div style={{fontSize:15,fontWeight:700}}>{r.title}</div><Badge s={r.status}/>
                    </div>
                    <div style={{fontSize:12.5,color:SB}}>{r.type} · {r.genre} · {fmt(r.earnings)} earned · {fK(r.streams)} streams</div>
                  </div>
                  {r.status==="pending_review"&&(
                    <div style={{display:"flex",gap:8,flexShrink:0}}>
                      <Btn sz="sm" v="s">Approve</Btn>
                      <Btn sz="sm" v="r">Reject</Btn>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="artists"&&(
          <div>
            <div className="fu" style={{marginBottom:22}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>Artists</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
              {DB.users.filter(u=>u.role==="artist").map(u=>{
                const uR=DB.releases.filter(r=>r.aId===u.id);
                return(
                  <div key={u.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:18,padding:20}}>
                    <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:16}}>
                      <div style={{width:46,height:46,borderRadius:13,
                        background:`linear-gradient(135deg,${G}20,${BL}10)`,color:G,fontWeight:800,
                        fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",
                        border:`1px solid ${G}16`,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{u.av}</div>
                      <div>
                        <div style={{fontWeight:700,fontSize:15}}>{u.name}</div>
                        <div style={{fontSize:10.5,color:OR,fontFamily:"'JetBrains Mono',monospace",marginTop:3}}>{u.plan} Plan</div>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:9}}>
                      {[[uR.length,"Releases"],[fmt(uR.reduce((s,r)=>s+r.earnings,0)),"Earnings"]].map(([v,l])=>(
                        <div key={l} style={{background:C2,borderRadius:10,padding:"10px 13px"}}>
                          <div style={{fontSize:10,color:MT,fontFamily:"'JetBrains Mono',monospace",marginBottom:4,fontWeight:700}}>{l}</div>
                          <div style={{fontSize:14.5,fontWeight:700}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="payouts"&&(
          <div>
            <div className="fu" style={{marginBottom:22}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:"-.8px"}}>Payout Requests</h2>
            </div>
            <div className="fu d1" style={{display:"flex",flexDirection:"column",gap:10}}>
              {DB.payouts.map(p=>(
                <div key={p.id} className="hover-glow" style={{background:CARD,border:`1px solid ${B1}`,borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:15,fontWeight:700,marginBottom:3}}>{fmt(p.amount)}</div>
                    <div style={{fontSize:12,color:SB}}>{p.method} · {p.at}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:p.status==="paid"?G:OR,
                    background:p.status==="paid"?`${G}10`:`${OR}10`,
                    border:`1px solid ${p.status==="paid"?G:OR}22`,
                    borderRadius:999,padding:"4px 12px",fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>
                    {p.status==="paid"?"Paid":"Pending"}
                  </span>
                  {p.status==="pending"&&(
                    <div style={{display:"flex",gap:8,flexShrink:0}}>
                      <Btn sz="sm" v="s">Approve</Btn>
                      <Btn sz="sm" v="r">Decline</Btn>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {mob&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(4,6,12,.97)",
          borderTop:`1px solid ${B1}`,display:"flex",zIndex:100}}>
          {[["overview","🏠","Home"],["releases","🎵","Releases"],["artists","👥","Artists"],["payouts","💳","Payouts"]].map(([id,ic,l])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{flex:1,padding:"10px 6px",display:"flex",flexDirection:"column",
                alignItems:"center",gap:3,cursor:"pointer",background:"none",border:"none",
                color:tab===id?OR:MT,transition:"color .14s"}}>
              <span style={{fontSize:19}}>{ic}</span>
              <span style={{fontSize:9.5,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


export default function App(){
  const[page,setPage]=useState("home");
  const[user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    // Check existing Supabase session on load
    supabase.auth.getSession().then(async({data:{session}})=>{
      if(session){
        const{data:profile}=await supabase.from("profiles").select("*").eq("id",session.user.id).single();
        if(profile){
          setUser({
            id:session.user.id,
            email:session.user.email,
            name:profile.name||session.user.email.split("@")[0],
            role:profile.role||"artist",
            plan:profile.plan||"Free",
            av:profile.avatar_initials||(profile.name||"U").slice(0,2).toUpperCase(),
          });
          setPage("dashboard");
        }
      }
      setLoading(false);
    });
    // Listen for auth changes
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{
      if(!session){setUser(null);setPage("home");}
    });
    return()=>subscription.unsubscribe();
  },[]);

  const go=p=>{setPage(p);window.scrollTo(0,0);};
  const onLogin=u=>{setUser(u);setPage("dashboard");};
  const onLogout=async()=>{
    await supabase.auth.signOut();
    setUser(null);
    go("home");
  };

  const isPub=["home","careers","contact"].includes(page);

  if(loading)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <div className="spinning" style={{width:32,height:32,border:`2px solid ${B1}`,borderTopColor:G,borderRadius:"50%",margin:"0 auto 16px"}}/>
        <div style={{fontSize:13,color:MT,fontFamily:"'JetBrains Mono',monospace"}}>Loading…</div>
      </div>
    </div>
  );

  return(
    <>
      <style>{CSS}</style>
      {isPub&&<Nav page={page} go={go}/>}
      {page==="home"&&<Home go={go}/>}
      {page==="careers"&&<Careers/>}
      {page==="contact"&&<Contact/>}
      {page==="login"&&!user&&<Login go={go} onLogin={onLogin}/>}
      {page==="dashboard"&&user?.role==="artist"&&<ArtistDash user={user} onLogout={onLogout}/>}
      {page==="dashboard"&&user?.role==="admin"&&<AdminDash user={user} onLogout={onLogout}/>}
      {page==="dashboard"&&user&&!["artist","admin"].includes(user.role)&&<ArtistDash user={user} onLogout={onLogout}/>}
      {isPub&&<Footer go={go}/>}
    </>
  );
}
