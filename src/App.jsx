import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://eryeaaomkkzyyklnfaxa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWVhYW9ta2t6eXlrbG5mYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE0NDUsImV4cCI6MjA4ODM4NzQ0NX0.WxLQQuvWLcQLfMYJ4cqj3YM9GtHsMiRVt5Dt4IK1o5c"
);

// ── THEME ──────────────────────────────────────────────────────────────────────
const G="#00E676",BL="#29B6F6",OR="#FF6D00",RED="#FF1744";
const BG="#03050B",SURFACE="#080C18",CARD="#0D1120",CARD2="#111627";
const BORDER="rgba(255,255,255,0.06)",BORDER2="rgba(255,255,255,0.10)";
const WHITE="#fff",MUTED="#6B7A99",MUTED2="#9AA3BA";
const FREE_LIMIT=3;
const SUPPORT_EMAIL="famoustechplay@gmail.com";

const fmt  = n=>`₦${new Intl.NumberFormat("en-NG").format(Math.round(n||0))}`;
const fmtK = n=>new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(n||0);
const ini  = n=>(n||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const ago  = d=>{const s=Math.floor((Date.now()-new Date(d))/1000);return s<60?"Just now":s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:`${Math.floor(s/86400)}d ago`;};

// ── ICONS ──────────────────────────────────────────────────────────────────────
const I={
  Home:    ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  Music:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Chart:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Wallet:  ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Mega:    ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  Gear:    ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Up:      ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  Plus:    ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X:       ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
  Globe:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Arrow:   ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
  Out:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Users:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Clock:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  Alert:   ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Shield:  ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Zap:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
  File:    ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Img:     ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
  Mail:    ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Insta:   ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Twitter: ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Edit:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Star:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  Bell:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Briefcase:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>,
};

// ── SHARED ────────────────────────────────────────────────────────────────────
const Logo=({size=26})=>(
  <div style={{display:"flex",alignItems:"center",gap:10}}>
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="none" stroke={G}  strokeWidth="3.5" strokeDasharray="26 58" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="18" fill="none" stroke={BL} strokeWidth="3.5" strokeDasharray="20 64" strokeLinecap="round" strokeDashoffset="-30"/>
      <circle cx="20" cy="20" r="18" fill="none" stroke={OR} strokeWidth="3.5" strokeDasharray="10 74" strokeLinecap="round" strokeDashoffset="-54"/>
      <polygon points="16,13 16,27 28,20" fill={WHITE}/>
    </svg>
    <span style={{fontWeight:800,fontSize:size*0.7,letterSpacing:"-0.8px"}}>FamousTechPlay</span>
  </div>
);

const Badge=({c=G,children})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.04em",background:`${c}15`,color:c,border:`1px solid ${c}28`}}>{children}</span>
);

const Err=({msg})=>msg?<div style={{display:"flex",gap:8,padding:"11px 14px",borderRadius:10,fontSize:13,marginBottom:14,background:"rgba(255,23,68,0.08)",border:"1px solid rgba(255,23,68,0.25)",color:"#FF6B6B"}}><I.Alert/>{msg}</div>:null;
const Suc=({msg})=>msg?<div style={{display:"flex",gap:8,padding:"11px 14px",borderRadius:10,fontSize:13,marginBottom:14,background:"rgba(0,230,118,0.08)",border:"1px solid rgba(0,230,118,0.25)",color:G}}><I.Check/>{msg}</div>:null;

const Spinner=()=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:48}}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={BORDER2} strokeWidth="3"/>
      <path d="M12 2a10 10 0 0110 10" stroke={G} strokeWidth="3" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
);

const Tile=({label,value,sub,color=G})=>(
  <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:20,flex:1,minWidth:130}}>
    <div style={{fontSize:11,fontWeight:700,color:MUTED,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>{label}</div>
    <div style={{fontSize:26,fontWeight:800,color,letterSpacing:"-0.5px"}}>{value}</div>
    {sub&&<div style={{fontSize:12,color:MUTED,marginTop:4}}>{sub}</div>}
  </div>
);

const inp={width:"100%",padding:"12px 14px",background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:10,color:WHITE,fontSize:14,outline:"none",boxSizing:"border-box"};
const lbl={fontSize:11,color:MUTED,marginBottom:6,display:"block",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"};

// ── UPLOAD PROGRESS BAR ───────────────────────────────────────────────────────
const ProgressBar=({pct,color=G,label})=>(
  <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
      <span style={{fontSize:12,color:MUTED2}}>{label}</span>
      <span style={{fontSize:12,color,fontWeight:700}}>{Math.round(pct)}%</span>
    </div>
    <div style={{height:6,background:BORDER2,borderRadius:6,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${color},${color}cc)`,
        borderRadius:6,transition:"width 0.3s ease"}}/>
    </div>
  </div>
);

const UploadStep=({step,current,label})=>{
  const done=current>step,active=current===step;
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,opacity:done||active?1:0.35}}>
      <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,
        background:done?G:active?`${G}20`:"transparent",
        border:`2px solid ${done?G:active?G:BORDER}`,
        color:done?"#000":active?G:MUTED}}>
        {done?<I.Check/>:step}
      </div>
      <span style={{fontSize:13,fontWeight:active?600:400,color:active?WHITE:MUTED2}}>{label}</span>
      {active&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 0110 10" stroke={G} strokeWidth="2.5" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.7s" repeatCount="indefinite"/>
        </path>
        <circle cx="12" cy="12" r="10" stroke={BORDER2} strokeWidth="2.5"/>
      </svg>}
    </div>
  );
};



// ── NOTIFICATION BELL ────────────────────────────────────────────────────────
const NotificationBell=({userId})=>{
  const[notifs,setNotifs]=useState([]);
  const[open,setOpen]=useState(false);
  const ref=useRef(null);

  useEffect(()=>{
    fetchN();
    const sub=supabase.channel("notifs_"+userId)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${userId}`},
        p=>{setNotifs(prev=>[p.new,...prev]);})
      .subscribe();
    return()=>sub.unsubscribe();
  },[userId]);

  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  const fetchN=async()=>{
    const{data}=await supabase.from("notifications").select("*")
      .eq("user_id",userId).order("created_at",{ascending:false}).limit(25);
    setNotifs(data||[]);
  };

  const markRead=async id=>{
    await supabase.from("notifications").update({read:true}).eq("id",id);
    setNotifs(prev=>prev.map(n=>n.id===id?{...n,read:true}:n));
  };

  const markAll=async()=>{
    await supabase.from("notifications").update({read:true}).eq("user_id",userId).eq("read",false);
    setNotifs(prev=>prev.map(n=>({...n,read:true})));
  };

  const unread=notifs.filter(n=>!n.read).length;
  const tColor={approved:G,rejected:RED,distributed:G,payout_paid:G,payout_rejected:RED,message:BL};

  return(
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)}
        style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",
          width:36,height:36,background:open?`${G}12`:"transparent",
          border:`1px solid ${open?G:BORDER}`,borderRadius:8,
          color:unread>0?G:MUTED,cursor:"pointer",transition:"all .15s"}}>
        <I.Bell/>
        {unread>0&&(
          <span style={{position:"absolute",top:-5,right:-5,minWidth:18,height:18,
            background:RED,borderRadius:9,display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:10,fontWeight:800,color:WHITE,
            border:`2px solid ${BG}`,padding:"0 4px"}}>
            {unread>9?"9+":unread}
          </span>
        )}
      </button>
      {open&&(
        <div style={{position:"absolute",top:46,right:0,width:340,maxHeight:460,
          background:CARD,border:`1px solid ${BORDER2}`,borderRadius:16,
          boxShadow:"0 24px 64px rgba(0,0,0,0.7)",zIndex:500,
          display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            padding:"14px 16px",borderBottom:`1px solid ${BORDER}`,flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontWeight:700,fontSize:15}}>Notifications</span>
              {unread>0&&<Badge c={RED}>{unread} new</Badge>}
            </div>
            {unread>0&&<button onClick={markAll}
              style={{background:"none",border:"none",color:G,cursor:"pointer",fontSize:12,fontWeight:600}}>
              Mark all read
            </button>}
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {notifs.length===0
              ?<div style={{padding:"40px 16px",textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:12}}>🔔</div>
                  <div style={{color:MUTED,fontSize:14}}>No notifications yet</div>
                  <div style={{color:MUTED,fontSize:12,marginTop:4}}>We'll notify you about your releases and payouts</div>
                </div>
              :notifs.map(n=>(
                <div key={n.id} onClick={()=>markRead(n.id)}
                  style={{padding:"14px 16px",borderBottom:`1px solid ${BORDER}`,cursor:"pointer",
                    background:n.read?"transparent":`${G}04`,
                    display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,marginTop:4,
                    background:n.read?MUTED:(tColor[n.type]||G),
                    boxShadow:n.read?"none":`0 0 6px ${tColor[n.type]||G}`}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:n.read?400:600,lineHeight:1.55,color:n.read?MUTED2:WHITE}}>{n.message}</div>
                    <div style={{fontSize:11,color:MUTED,marginTop:4}}>{ago(n.created_at)}</div>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${BORDER}`,flexShrink:0,
            fontSize:11,color:MUTED,textAlign:"center"}}>
            Notifications are cleared after 30 days
          </div>
        </div>
      )}
    </div>
  );
};

// ── AUTH ──────────────────────────────────────────────────────────────────────
const AuthPage=({onLogin,onBack})=>{
  const[mode,setMode]=useState("signin");
  const[name,setName]=useState(""),  [email,setEmail]=useState(""),  [pass,setPass]=useState("");
  const[err,setErr]=useState(""),    [msg,setMsg]=useState(""),        [busy,setBusy]=useState(false);

  const doSignUp=async()=>{
    setErr("");setMsg("");
    if(!name.trim()||!email.trim()||!pass){setErr("Please fill all fields.");return;}
    if(pass.length<6){setErr("Password must be at least 6 characters.");return;}
    setBusy(true);
    try{
      const authPromise=supabase.auth.signUp({email:email.trim(),password:pass,options:{data:{name:name.trim()}}});
      const timeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error("Connection timed out. Please check your internet and try again.")),10000));
      const{data,error}=await Promise.race([authPromise,timeout]);
      if(error){setErr(error.message);setBusy(false);return;}
      if(data.user){
        await supabase.from("profiles").upsert({
          id:data.user.id,email:email.trim(),name:name.trim(),
          role:"artist",plan:"Free",av:ini(name),created_at:new Date().toISOString()
        });
        setMsg("Account created! You can now sign in.");setMode("signin");
      }
    }catch(e){
      setErr(e.message||"Connection failed. Please try again.");
    }
    setBusy(false);
  };

  const doSignIn=async()=>{
    setErr("");setMsg("");
    if(!email.trim()||!pass){setErr("Please enter your email and password.");return;}
    setBusy(true);
    try{
      // Race auth against 10s timeout
      const authPromise=supabase.auth.signInWithPassword({email:email.trim(),password:pass});
      const timeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error("Connection timed out. Please check your internet and try again.")),10000));
      const{data,error}=await Promise.race([authPromise,timeout]);
      if(error){setErr(error.message);setBusy(false);return;}
      // Fetch profile with 5s timeout
      const profilePromise=supabase.from("profiles").select("*").eq("id",data.user.id).single();
      const profileTimeout=new Promise(res=>setTimeout(()=>res({data:null}),5000));
      const{data:p}=await Promise.race([profilePromise,profileTimeout]);
      onLogin({
        id:data.user.id,
        email:data.user.email,
        name:p?.name||data.user.user_metadata?.name||email.split("@")[0],
        role:p?.role||"artist",
        plan:p?.plan||"Free",
        av:p?.av||ini(p?.name||email)
      });
    }catch(e){
      setErr(e.message||"Connection failed. Please try again.");
    }
    setBusy(false);
  };

  return(
    <div style={{minHeight:"100vh",background:BG,color:WHITE,fontFamily:"system-ui,sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{padding:"20px 40px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:WHITE,padding:0}}><Logo/></button>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${BORDER2}`,color:MUTED2,padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
      </nav>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{width:"100%",maxWidth:420}}>
          <h1 style={{textAlign:"center",fontSize:28,fontWeight:800,letterSpacing:"-0.8px",marginBottom:8}}>
            {mode==="signin"?"Welcome back":"Create account"}
          </h1>
          <p style={{textAlign:"center",color:MUTED,fontSize:15,marginBottom:28}}>
            {mode==="signin"?"Sign in to your dashboard":"Start distributing your music worldwide"}
          </p>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,padding:32}}>
            <Err msg={err}/><Suc msg={msg}/>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {mode==="signup"&&<div><label style={lbl}>Artist / Full Name</label><input style={inp} placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/></div>}
              <div><label style={lbl}>Email Address</label><input style={inp} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
              <div><label style={lbl}>Password</label><input style={inp} type="password" placeholder="Min. 6 characters" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(mode==="signin"?doSignIn():doSignUp())}/></div>
              <button onClick={mode==="signin"?doSignIn:doSignUp} disabled={busy}
                style={{padding:"13px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:busy?"not-allowed":"pointer",opacity:busy?0.7:1}}>
                {busy?"Please wait...":(mode==="signin"?"Sign In":"Create Account")}
              </button>
            </div>
            <p style={{textAlign:"center",marginTop:20,fontSize:14,color:MUTED}}>
              {mode==="signin"?"No account? ":"Have an account? "}
              <span style={{color:G,cursor:"pointer",fontWeight:600}} onClick={()=>{setMode(mode==="signin"?"signup":"signin");setErr("");setMsg("");}}>
                {mode==="signin"?"Sign Up Free":"Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── ARTIST DASHBOARD ──────────────────────────────────────────────────────────
const ArtistDash=({user,onLogout})=>{
  const[tab,setTab]=useState("overview");
  const[releases,setReleases]=useState([]);
  const[payouts,setPayouts]=useState([]);
  const[loading,setLoading]=useState(true);
  const[mob,setMob]=useState(window.innerWidth<768);

  // upload
  const[showUpload,setShowUpload]=useState(false);
  const[uTitle,setUTitle]=useState(""),  [uType,setUType]=useState("Single");
  const[uGenre,setUGenre]=useState(""),  [uArtist,setUArtist]=useState(user.name);
  const[uFile,setUFile]=useState(null),  [uCover,setUCover]=useState(null);
  const[uBusy,setUBusy]=useState(false), [uErr,setUErr]=useState(""), [uMsg,setUMsg]=useState("");
  const[uStep,setUStep]=useState(0);
  const[uAudioPct,setUAudioPct]=useState(0);
  const[uCoverPct,setUCoverPct]=useState(0);

  // payout
  const[showPayout,setShowPayout]=useState(false);
  const[pAmount,setPAmount]=useState(""),  [pMethod,setPMethod]=useState("bank");
  const[pBank,setPBank]=useState(""),      [pAcctName,setPAcctName]=useState("");
  const[pAcct,setPAcct]=useState(""),      [pPhone,setPPhone]=useState("");
  const[pBusy,setPBusy]=useState(false),   [pMsg,setPMsg]=useState("");

  // promo
  const[promoMsg,setPromoMsg]=useState(""), [promoBusy,setPromoBusy]=useState(false), [promoSent,setPromoSent]=useState(false);

  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

  // ── REAL-TIME subscriptions ────────────────────────────────────────────────
  useEffect(()=>{
    fetchData();
    const relSub=supabase.channel("artist_releases_"+user.id)
      .on("postgres_changes",{event:"*",schema:"public",table:"releases",filter:`user_id=eq.${user.id}`},()=>fetchData())
      .subscribe();
    const paySub=supabase.channel("artist_payouts_"+user.id)
      .on("postgres_changes",{event:"*",schema:"public",table:"payouts",filter:`user_id=eq.${user.id}`},()=>fetchData())
      .subscribe();
    return()=>{relSub.unsubscribe();paySub.unsubscribe();};
  },[]);

  const fetchData=async()=>{
    const[{data:r},{data:p}]=await Promise.all([
      supabase.from("releases").select("*").eq("user_id",user.id).order("created_at",{ascending:false}),
      supabase.from("payouts").select("*").eq("user_id",user.id).order("created_at",{ascending:false}),
    ]);
    setReleases(r||[]);setPayouts(p||[]);setLoading(false);
  };

  const totalEarned=releases.reduce((s,r)=>s+(r.earnings||0),0);
  const totalStreams=releases.reduce((s,r)=>s+(r.streams||0),0);
  const totalPaid=payouts.filter(p=>p.status==="paid").reduce((s,p)=>s+p.amount,0);
  const totalPending=payouts.filter(p=>p.status==="pending").reduce((s,p)=>s+p.amount,0);
  const balance=Math.max(0,totalEarned-totalPaid-totalPending);
  const canUpload=user.plan==="Pro"||releases.length<FREE_LIMIT;

  const validateAudio=f=>{
    if(!f)return null;
    const ext=f.name.split(".").pop().toLowerCase();
    if(!["mp3","wav"].includes(ext))return"Audio must be MP3 or WAV only.";
    if(f.size>500*1024*1024)return"Audio must be under 500MB.";
    return null;
  };

  const validateCover=f=>new Promise(res=>{
    if(!f){res(null);return;}
    const ext=f.name.split(".").pop().toLowerCase();
    if(!["jpg","jpeg","png"].includes(ext)){res("Artwork must be JPG or PNG.");return;}
    if(f.size>20*1024*1024){res("Artwork must be under 20MB.");return;}
    const img=new Image();
    img.onload=()=>{
      if(img.width!==3000||img.height!==3000)res(`Artwork must be exactly 3000×3000px. Yours is ${img.width}×${img.height}px.`);
      else res(null);
    };
    img.onerror=()=>res("Could not read image.");
    img.src=URL.createObjectURL(f);
  });

  const onAudioChange=async e=>{
    const f=e.target.files[0];if(!f)return;
    const err=validateAudio(f);
    if(err){setUErr(err);e.target.value="";}else{setUFile(f);setUErr("");}
  };

  const onCoverChange=async e=>{
    const f=e.target.files[0];if(!f)return;
    const err=await validateCover(f);
    if(err){setUErr(err);e.target.value="";}else{setUCover(f);setUErr("");}
  };

  const handleUpload=async()=>{
    setUErr("");setUMsg("");
    if(!uTitle.trim()||!uGenre.trim()){setUErr("Title and genre are required.");return;}
    if(!uFile){setUErr("Please select an audio file (MP3 or WAV).");return;}
    if(!uCover){setUErr("Please upload cover artwork (3000×3000px JPG/PNG).");return;}
    if(!canUpload){setUErr(`Free plan allows ${FREE_LIMIT} releases. Upgrade to Pro for unlimited.`);return;}

    setUBusy(true);setUStep(1);setUAudioPct(0);setUCoverPct(0);
    let audio_url=null,cover_url=null;

    // get auth token
    const{data:{session}}=await supabase.auth.getSession();
    const token=session?.access_token||"";

    // Step 2: upload audio
    setUStep(2);
    const aExt=uFile.name.split(".").pop().toLowerCase();
    const aPath=`${user.id}/${Date.now()}_audio.${aExt}`;
    const aCT=aExt==="wav"?"audio/wav":"audio/mpeg";

    // Upload audio with XHR progress tracking
    try{
      await new Promise((resolve,reject)=>{
        const url=`https://eryeaaomkkzyyklnfaxa.supabase.co/storage/v1/object/music/${aPath}`;
        const xhr=new XMLHttpRequest();
        xhr.upload.onprogress=e=>{if(e.lengthComputable)setUAudioPct(Math.round((e.loaded/e.total)*100));};
        xhr.onload=()=>{
          if(xhr.status===200||xhr.status===201)resolve();
          else reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`));
        };
        xhr.onerror=()=>reject(new Error("Network error during audio upload"));
        xhr.open("POST",url);
        xhr.setRequestHeader("Authorization",`Bearer ${token}`);
        xhr.setRequestHeader("apikey","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWVhYW9ta2t6eXlrbG5mYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE0NDUsImV4cCI6MjA4ODM4NzQ0NX0.WxLQQuvWLcQLfMYJ4cqj3YM9GtHsMiRVt5Dt4IK1o5c");
        xhr.setRequestHeader("Content-Type",aCT);
        xhr.setRequestHeader("x-upsert","false");
        xhr.send(uFile);
      });
      setUAudioPct(100);
    }catch(e){setUErr("Audio upload failed: "+e.message);setUBusy(false);setUStep(0);return;}
    const{data:aUrl}=supabase.storage.from("music").getPublicUrl(aPath);
    audio_url=aUrl.publicUrl;

    // Step 3: upload cover with progress
    setUStep(3);
    const cExt=uCover.name.split(".").pop().toLowerCase();
    const cPath=`${user.id}/${Date.now()}_cover.${cExt}`;
    const cCT=`image/${cExt==="jpg"?"jpeg":cExt}`;
    try{
      await new Promise((resolve,reject)=>{
        const url=`https://eryeaaomkkzyyklnfaxa.supabase.co/storage/v1/object/covers/${cPath}`;
        const xhr=new XMLHttpRequest();
        xhr.upload.onprogress=e=>{if(e.lengthComputable)setUCoverPct(Math.round((e.loaded/e.total)*100));};
        xhr.onload=()=>{
          if(xhr.status===200||xhr.status===201)resolve();
          else reject(new Error(`Cover upload failed (${xhr.status}): ${xhr.responseText}`));
        };
        xhr.onerror=()=>reject(new Error("Network error during cover upload"));
        xhr.open("POST",url);
        xhr.setRequestHeader("Authorization",`Bearer ${token}`);
        xhr.setRequestHeader("apikey","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWVhYW9ta2t6eXlrbG5mYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE0NDUsImV4cCI6MjA4ODM4NzQ0NX0.WxLQQuvWLcQLfMYJ4cqj3YM9GtHsMiRVt5Dt4IK1o5c");
        xhr.setRequestHeader("Content-Type",cCT);
        xhr.setRequestHeader("x-upsert","false");
        xhr.send(uCover);
      });
      setUCoverPct(100);
    }catch(e){setUErr("Cover upload failed: "+e.message);setUBusy(false);setUStep(0);return;}
    const{data:cUrl}=supabase.storage.from("covers").getPublicUrl(cPath);
    cover_url=cUrl.publicUrl;

    // Step 4: save to DB
    setUStep(4);
    const{error:rErr}=await supabase.from("releases").insert({
      user_id:user.id,title:uTitle.trim(),artist_name:uArtist.trim()||user.name,
      type:uType,genre:uGenre.trim(),status:"pending_review",
      earnings:0,streams:0,audio_url,cover_url,dsps:[],
      created_at:new Date().toISOString(),
    });
    if(rErr){setUErr("Submission failed: "+rErr.message);setUBusy(false);setUStep(0);return;}

    // Done
    setUStep(5);
    setUMsg("Release submitted! We'll review and distribute within 2–3 business days.");
    setUTitle("");setUGenre("");setUFile(null);setUCover(null);setUType("Single");
    setUBusy(false);
    setTimeout(()=>{setShowUpload(false);setUMsg("");setUStep(0);},3500);
  };

  const handlePayout=async()=>{
    setPMsg("");
    const amt=Number(pAmount);
    if(!pAmount||isNaN(amt)||amt<5000){setPMsg("err:Minimum payout is ₦5,000.");return;}
    if(amt>balance){setPMsg("err:Amount exceeds available balance of "+fmt(balance));return;}
    if(pMethod==="bank"&&(!pBank.trim()||!pAcct.trim()||!pAcctName.trim())){setPMsg("err:Fill all bank details.");return;}
    if(pMethod==="mobile"&&!pPhone.trim()){setPMsg("err:Enter your mobile number.");return;}
    setPBusy(true);
    const{error}=await supabase.from("payouts").insert({
      user_id:user.id,amount:amt,status:"pending",method:pMethod,
      bank_name:pBank.trim(),account_name:pAcctName.trim(),
      account_number:pAcct.trim(),phone:pPhone.trim(),
      created_at:new Date().toISOString(),
    });
    if(error){setPMsg("err:"+error.message);setPBusy(false);return;}
    setPMsg("ok:Payout request submitted! Processed within 48 hours.");
    setPAmount("");setPBank("");setPAcctName("");setPAcct("");setPPhone("");
    setPBusy(false);
    setTimeout(()=>{setShowPayout(false);setPMsg("");},3000);
  };

  const handlePromo=async()=>{
    if(!promoMsg.trim())return;
    setPromoBusy(true);
    await supabase.from("promo_requests").insert({
      user_id:user.id,artist_name:user.name,message:promoMsg.trim(),
      status:"pending",created_at:new Date().toISOString(),
    });
    setPromoSent(true);setPromoBusy(false);
  };

  const stCfg={
    pending_review:{label:"In Review",c:"#FFB300"},
    approved:{label:"Approved",c:BL},
    distributed:{label:"Live",c:G},
    rejected:{label:"Rejected",c:RED},
  };

  const Btn=({id,Ic,label})=>(
    <button onClick={()=>setTab(id)} style={{
      display:"flex",alignItems:"center",gap:12,padding:"10px 20px",width:"100%",
      background:tab===id?`${G}10`:"transparent",
      borderLeft:tab===id?`2px solid ${G}`:"2px solid transparent",
      color:tab===id?WHITE:MUTED,border:"none",cursor:"pointer",
      fontSize:14,fontWeight:tab===id?600:400,transition:"all .15s",textAlign:"left"}}>
      <Ic/>{label}
    </button>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,color:WHITE,fontFamily:"system-ui,sans-serif"}}>
      {/* TOPBAR */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:60,zIndex:100,
        background:"rgba(3,5,11,0.96)",backdropFilter:"blur(24px)",
        borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 20px"}}>
        <Logo size={22}/>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Badge c={user.plan==="Pro"?OR:G}>{user.plan==="Pro"?"PRO":"FREE"}</Badge>
          <NotificationBell userId={user.id}/>
          <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${G}30,${BL}20)`,
            border:`1px solid ${G}35`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:G}}>{user.av}</div>
          <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:6,
            padding:"7px 14px",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,cursor:"pointer",fontSize:13}}>
            <I.Out/>Sign out
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      {!mob&&(
        <div style={{position:"fixed",top:60,left:0,bottom:0,width:216,
          background:SURFACE,borderRight:`1px solid ${BORDER}`,display:"flex",flexDirection:"column",padding:"20px 0",overflowY:"auto"}}>
          <div style={{padding:"0 20px 12px",fontSize:10,fontWeight:700,color:MUTED,letterSpacing:"0.1em",textTransform:"uppercase"}}>Dashboard</div>
          <Btn id="overview"  Ic={I.Home}   label="Overview"/>
          <Btn id="releases"  Ic={I.Music}  label="My Releases"/>
          <Btn id="earnings"  Ic={I.Chart}  label="Earnings"/>
          <Btn id="payouts"   Ic={I.Wallet} label="Payouts"/>
          <Btn id="promo"     Ic={I.Mega}   label="Promotion"/>
          <Btn id="profile"   Ic={I.Gear}   label="Settings"/>
          <div style={{flex:1}}/>
          {user.plan==="Free"&&(
            <div style={{margin:"0 16px 16px",padding:16,background:`${OR}10`,border:`1px solid ${OR}22`,borderRadius:14}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><I.Zap/><span style={{fontWeight:700,fontSize:13,color:OR}}>Upgrade to Pro</span></div>
              <div style={{color:MUTED,fontSize:12,marginBottom:12,lineHeight:1.5}}>Unlimited releases · Priority distribution · Assigned agent</div>
              <button style={{width:"100%",padding:"9px 0",background:OR,color:"#000",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}
                onClick={()=>setTab("upgrade")}>Upgrade — ₦25k/mo</button>
            </div>
          )}
        </div>
      )}

      {/* MAIN */}
      <div style={{paddingTop:76,paddingLeft:mob?16:232,paddingRight:mob?16:28,paddingBottom:mob?80:40}}>
        <div style={{maxWidth:920}}>

          {tab==="overview"&&(
            <div>
              <div style={{marginBottom:28}}>
                <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>Good day, {user.name.split(" ")[0]}</h2>
                <p style={{margin:0,color:MUTED,fontSize:14}}>Here's your music performance overview.</p>
              </div>
              {loading?<Spinner/>:<>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
                  <Tile label="Total Earnings"    value={fmt(totalEarned)}   sub="All time"/>
                  <Tile label="Total Streams"     value={fmtK(totalStreams)} sub="Across all platforms"/>
                  <Tile label="Available Balance" value={fmt(balance)}       sub="Ready to withdraw" color={BL}/>
                  <Tile label="Releases"          value={releases.length}
                    sub={user.plan==="Free"?`${FREE_LIMIT-releases.length} of ${FREE_LIMIT} remaining`:"Unlimited"}
                    color={user.plan==="Pro"?OR:G}/>
                </div>
                <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:24}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                    <h3 style={{margin:0,fontSize:16,fontWeight:700}}>Recent Releases</h3>
                    <button onClick={()=>setShowUpload(true)}
                      style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",
                        background:G,color:"#000",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      <I.Plus/>New Release
                    </button>
                  </div>
                  {releases.length===0
                    ?<div style={{textAlign:"center",padding:"48px 0"}}>
                        <div style={{color:G,display:"flex",justifyContent:"center",marginBottom:16}}><I.Music/></div>
                        <div style={{fontWeight:600,marginBottom:6}}>No releases yet</div>
                        <div style={{color:MUTED,fontSize:14,marginBottom:20}}>Upload your first track and go live on 100+ platforms</div>
                        <button onClick={()=>setShowUpload(true)} style={{padding:"10px 24px",background:G,color:"#000",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer"}}>Upload Now</button>
                      </div>
                    :releases.slice(0,5).map(r=>(
                      <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${BORDER}`,gap:12}}>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          {r.cover_url
                            ?<img src={r.cover_url} alt="" style={{width:44,height:44,borderRadius:8,objectFit:"cover"}}/>
                            :<div style={{width:44,height:44,borderRadius:8,background:`${G}10`,border:`1px solid ${G}20`,display:"flex",alignItems:"center",justifyContent:"center",color:G,flexShrink:0}}><I.Music/></div>}
                          <div>
                            <div style={{fontWeight:600,fontSize:15}}>{r.title}</div>
                            <div style={{color:MUTED,fontSize:12,marginTop:2}}>{r.type} · {r.genre} · {ago(r.created_at)}</div>
                          </div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <Badge c={(stCfg[r.status]||{c:MUTED}).c}>{(stCfg[r.status]||{label:r.status}).label}</Badge>
                          <div style={{color:G,fontWeight:700,fontSize:14,marginTop:4}}>{fmt(r.earnings)}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>}
            </div>
          )}

          {tab==="releases"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <div><h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>My Releases</h2><p style={{margin:0,color:MUTED,fontSize:14}}>{releases.length} release{releases.length!==1?"s":""}</p></div>
                <button onClick={()=>setShowUpload(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 20px",background:G,color:"#000",border:"none",borderRadius:9,fontWeight:700,fontSize:14,cursor:"pointer"}}><I.Plus/>Upload</button>
              </div>
              {user.plan==="Free"&&releases.length>=FREE_LIMIT&&(
                <div style={{background:`${OR}08`,border:`1px solid ${OR}22`,borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,color:OR,fontSize:14}}><I.Alert/><span><strong>Free plan limit reached.</strong> Upgrade to Pro for unlimited releases.</span></div>
                  <button onClick={()=>setTab("upgrade")} style={{padding:"7px 16px",background:OR,color:"#000",border:"none",borderRadius:7,fontWeight:700,fontSize:13,cursor:"pointer"}}>Upgrade</button>
                </div>
              )}
              {loading?<Spinner/>:releases.length===0
                ?<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,textAlign:"center",padding:"64px 0"}}>
                    <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>No releases yet</div>
                    <button onClick={()=>setShowUpload(true)} style={{padding:"11px 28px",background:G,color:"#000",border:"none",borderRadius:9,fontWeight:700,cursor:"pointer"}}>Upload Now</button>
                  </div>
                :releases.map(r=>(
                  <div key={r.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:20,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,flexWrap:"wrap"}}>
                      <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                        {r.cover_url?<img src={r.cover_url} alt="" style={{width:56,height:56,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                          :<div style={{width:56,height:56,borderRadius:10,background:`${G}08`,border:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,flexShrink:0}}><I.Music/></div>}
                        <div>
                          <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{r.title}</div>
                          <div style={{color:MUTED,fontSize:13,marginBottom:8}}>{r.type} · {r.genre} · {new Date(r.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                          {r.dsps?.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{r.dsps.map(d=><Badge key={d} c={BL}>{d}</Badge>)}</div>}
                          {r.audio_url&&<a href={r.audio_url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,color:BL,fontSize:12,marginTop:8,textDecoration:"none"}}><I.File/> Preview audio</a>}
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <Badge c={(stCfg[r.status]||{c:MUTED}).c}>{(stCfg[r.status]||{label:r.status}).label}</Badge>
                        <div style={{fontWeight:800,fontSize:18,color:G,marginTop:8}}>{fmt(r.earnings)}</div>
                        <div style={{color:MUTED,fontSize:12,marginTop:2}}>{fmtK(r.streams)} streams</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {tab==="earnings"&&(
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>Earnings</h2>
              <p style={{margin:"0 0 24px",color:MUTED,fontSize:14}}>Track your revenue across all platforms.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
                <Tile label="Total Earned"  value={fmt(totalEarned)}  sub="All time"/>
                <Tile label="Total Streams" value={fmtK(totalStreams)} sub="All platforms"/>
                <Tile label="Paid Out"      value={fmt(totalPaid)}    sub="Successfully paid"   color={BL}/>
                <Tile label="In Processing" value={fmt(totalPending)} sub="Being processed"     color={OR}/>
              </div>
              <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:24}}>
                <h3 style={{margin:"0 0 16px",fontSize:15,fontWeight:700}}>Breakdown by Release</h3>
                {loading?<Spinner/>:releases.length===0?<div style={{textAlign:"center",padding:"32px 0",color:MUTED}}>No releases yet</div>
                  :releases.map(r=>(
                    <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${BORDER}`,gap:12}}>
                      <div><div style={{fontWeight:600}}>{r.title}</div><div style={{color:MUTED,fontSize:12,marginTop:2}}>{fmtK(r.streams)} streams · {r.type} · {r.genre}</div></div>
                      <div style={{fontWeight:700,color:G,fontSize:16}}>{fmt(r.earnings)}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {tab==="payouts"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <div><h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>Payouts</h2><p style={{margin:0,color:MUTED,fontSize:14}}>Withdraw earnings to your bank or mobile money</p></div>
                <button onClick={()=>setShowPayout(true)} style={{padding:"10px 20px",background:G,color:"#000",border:"none",borderRadius:9,fontWeight:700,fontSize:14,cursor:"pointer"}}>Request Payout</button>
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
                <Tile label="Available"   value={fmt(balance)}       sub="Ready to withdraw" color={G}/>
                <Tile label="Total Earned" value={fmt(totalEarned)} sub="All time"/>
                <Tile label="Processing"  value={fmt(totalPending)} sub="Pending payouts"    color={OR}/>
                <Tile label="Total Paid"  value={fmt(totalPaid)}    sub="All paid out"       color={BL}/>
              </div>
              {loading?<Spinner/>:payouts.length===0
                ?<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,textAlign:"center",padding:"48px 0",color:MUTED}}>No payout requests yet</div>
                :payouts.map(p=>(
                  <div key={p.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:18,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:17,color:G}}>{fmt(p.amount)}</div>
                      <div style={{color:MUTED,fontSize:13,marginTop:3}}>
                        {p.method==="bank"?`${p.bank_name} · ${p.account_name} · ${p.account_number}`:`Mobile · ${p.phone}`}
                        {" · "}{new Date(p.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
                      </div>
                    </div>
                    <Badge c={p.status==="paid"?G:p.status==="rejected"?RED:OR}>
                      {p.status==="paid"?"Paid":p.status==="rejected"?"Rejected":"Processing"}
                    </Badge>
                  </div>
                ))
              }
            </div>
          )}

          {tab==="promo"&&(
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>Promotion</h2>
              <p style={{margin:"0 0 24px",color:MUTED,fontSize:14}}>{user.plan==="Pro"?"Get your music promoted across our channels.":"Pro feature — upgrade to access promotion."}</p>
              {user.plan!=="Pro"
                ?<div style={{background:CARD,border:`1px solid ${OR}25`,borderRadius:16,textAlign:"center",padding:"56px 24px"}}>
                    <div style={{width:56,height:56,borderRadius:"50%",background:`${OR}12`,border:`1px solid ${OR}25`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",color:OR}}><I.Mega/></div>
                    <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Pro Feature</div>
                    <div style={{color:MUTED,marginBottom:24,fontSize:14,maxWidth:380,margin:"0 auto 24px",lineHeight:1.6}}>Upgrade to Pro to request promotion, get an assigned agent, free materials and a free social post every month.</div>
                    <button onClick={()=>setTab("upgrade")} style={{padding:"13px 32px",background:OR,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer"}}>Upgrade to Pro</button>
                  </div>
                :promoSent
                  ?<div style={{background:CARD,border:`1px solid ${G}25`,borderRadius:16,textAlign:"center",padding:"56px 24px"}}>
                      <div style={{width:56,height:56,borderRadius:"50%",background:`${G}12`,border:`1px solid ${G}25`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",color:G}}><I.Check/></div>
                      <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Request Sent!</div>
                      <div style={{color:MUTED,fontSize:14}}>Our team will reach out within 24 hours.</div>
                    </div>
                  :<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:28}}>
                      <label style={lbl}>Tell us about this release</label>
                      <textarea value={promoMsg} onChange={e=>setPromoMsg(e.target.value)}
                        placeholder="Which release? Target audience? Specific platforms? Any other details..."
                        style={{...inp,minHeight:130,resize:"vertical",lineHeight:1.6}}/>
                      <button onClick={handlePromo} disabled={promoBusy||!promoMsg.trim()}
                        style={{marginTop:14,width:"100%",padding:"13px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",opacity:promoBusy?0.7:1}}>
                        {promoBusy?"Sending...":"Submit Promotion Request"}
                      </button>
                    </div>
              }
            </div>
          )}

          {tab==="profile"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>Account Settings</h2>
              <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:28}}>
                <div style={{display:"flex",alignItems:"center",gap:16,paddingBottom:24,borderBottom:`1px solid ${BORDER}`,marginBottom:24}}>
                  <div style={{width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${G}30,${BL}20)`,border:`2px solid ${G}30`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20,color:G}}>{user.av}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:18}}>{user.name}</div>
                    <div style={{color:MUTED,fontSize:14,marginTop:2}}>{user.email}</div>
                    <div style={{marginTop:6}}><Badge c={user.plan==="Pro"?OR:G}>{user.plan} Plan</Badge></div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  {[["Name",user.name],["Email",user.email],["Plan",user.plan],["Role","Artist"]].map(([k,v])=>(
                    <div key={k}><label style={lbl}>{k}</label><div style={{...inp,color:MUTED2,cursor:"default"}}>{v}</div></div>
                  ))}
                </div>
                {user.plan==="Free"&&<button onClick={()=>setTab("upgrade")} style={{marginTop:20,width:"100%",padding:"12px",background:OR,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><I.Zap/>Upgrade to Pro — ₦25,000/month</button>}
              </div>
            </div>
          )}

          {tab==="upgrade"&&(
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800}}>Plans & Pricing</h2>
              <p style={{margin:"0 0 32px",color:MUTED,fontSize:14}}>Choose the plan that works for you.</p>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:18,padding:28,flex:1,minWidth:260}}>
                  <div style={{fontWeight:800,fontSize:18,marginBottom:8}}>Free</div>
                  <div style={{fontSize:34,fontWeight:900,letterSpacing:"-1px",marginBottom:4}}>₦0</div>
                  <div style={{color:MUTED,fontSize:13,marginBottom:24}}>Forever free</div>
                  {["Up to 3 releases","All 100+ platforms","Keep 100% royalties","Bank & mobile payouts"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,fontSize:14,color:MUTED2}}><span style={{color:G,flexShrink:0}}><I.Check/></span>{f}</div>
                  ))}
                  <div style={{marginTop:24,padding:"12px",textAlign:"center",border:`1px solid ${BORDER}`,borderRadius:9,color:MUTED,fontSize:13}}>Current plan</div>
                </div>
                <div style={{background:`linear-gradient(145deg,${CARD},${CARD2})`,border:`1px solid ${OR}40`,borderRadius:18,padding:28,flex:1,minWidth:260,position:"relative"}}>
                  <div style={{position:"absolute",top:-12,right:20,background:OR,color:"#000",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:800}}>MOST POPULAR</div>
                  <div style={{fontWeight:800,fontSize:18,marginBottom:8,color:OR}}>Pro</div>
                  <div style={{fontSize:34,fontWeight:900,letterSpacing:"-1px",marginBottom:4}}>₦25,000</div>
                  <div style={{color:MUTED,fontSize:13,marginBottom:24}}>per month</div>
                  {["Unlimited releases","Priority distribution","Assigned promotion agent","Free promotional materials","Free social post monthly","Higher payout priority","Dedicated support"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,fontSize:14}}><span style={{color:OR,flexShrink:0}}><I.Check/></span>{f}</div>
                  ))}
                  <button onClick={()=>window.open("https://paystack.com/pay/famoustechplay-pro","_blank")}
                    style={{marginTop:24,width:"100%",padding:"13px",background:OR,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    Upgrade Now <I.Arrow/>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOB NAV */}
      {mob&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(3,5,11,0.97)",backdropFilter:"blur(20px)",borderTop:`1px solid ${BORDER}`,display:"flex",zIndex:100}}>
          {[["overview",I.Home,"Home"],["releases",I.Music,"Music"],["earnings",I.Chart,"Earn"],["payouts",I.Wallet,"Pay"],["promo",I.Mega,"Promo"]].map(([id,Ic,lb])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",background:"none",border:"none",color:tab===id?G:MUTED}}>
              <Ic/><span style={{fontSize:10,fontWeight:700}}>{lb}</span>
            </button>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,width:"100%",maxWidth:500,padding:28,maxHeight:"92vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div><h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:800}}>Upload New Release</h3><p style={{margin:0,color:MUTED,fontSize:13}}>MP3/WAV · 3000×3000px artwork required</p></div>
              {!uBusy&&<button onClick={()=>{setShowUpload(false);setUErr("");setUMsg("");setUStep(0);}} style={{background:"none",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,padding:6,cursor:"pointer",display:"flex"}}><I.X/></button>}
            </div>

            {/* PROGRESS UI */}
            {uBusy&&(
              <div style={{background:SURFACE,borderRadius:14,padding:20,marginBottom:20,border:`1px solid ${BORDER}`}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:16,color:WHITE}}>Uploading your release...</div>
                <UploadStep step={1} current={uStep} label="Validating files"/>
                <UploadStep step={2} current={uStep} label={`Uploading audio${uAudioPct>0&&uAudioPct<100?` · ${uAudioPct}%`:uAudioPct===100?" · Done":""}`}/>
                {uStep>=2&&uAudioPct>0&&uAudioPct<100&&<ProgressBar pct={uAudioPct} color={G} label="Audio file"/>}
                <UploadStep step={3} current={uStep} label={`Uploading artwork${uCoverPct>0&&uCoverPct<100?` · ${uCoverPct}%`:uCoverPct===100?" · Done":""}`}/>
                {uStep>=3&&uCoverPct>0&&uCoverPct<100&&<ProgressBar pct={uCoverPct} color={BL} label="Cover artwork"/>}
                <UploadStep step={4} current={uStep} label="Saving release details"/>
                <UploadStep step={5} current={uStep} label="Complete!"/>
                {uStep===5&&<div style={{marginTop:14,padding:"12px 14px",background:`${G}10`,border:`1px solid ${G}25`,borderRadius:10,color:G,fontSize:13,fontWeight:600}}>Your release has been submitted for review!</div>}
              </div>
            )}

            <Err msg={uErr}/><Suc msg={uMsg}/>

            {!uBusy&&(
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div><label style={lbl}>Release Title *</label><input style={inp} placeholder="Song or album title" value={uTitle} onChange={e=>setUTitle(e.target.value)}/></div>
                <div><label style={lbl}>Artist Name *</label><input style={inp} placeholder="Artist name" value={uArtist} onChange={e=>setUArtist(e.target.value)}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div><label style={lbl}>Type</label>
                    <select style={inp} value={uType} onChange={e=>setUType(e.target.value)}>
                      {["Single","EP","Album","Mixtape"].map(t=><option key={t} style={{background:CARD}}>{t}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Genre *</label><input style={inp} placeholder="e.g. Afrobeats" value={uGenre} onChange={e=>setUGenre(e.target.value)}/></div>
                </div>
                {/* Audio upload zone */}
                <div>
                  <label style={lbl}>Audio File * (MP3 or WAV only)</label>
                  <label htmlFor="audioIn" style={{display:"block",padding:20,background:SURFACE,border:`2px dashed ${uFile?G:BORDER2}`,borderRadius:12,cursor:"pointer",textAlign:"center",transition:"border-color .2s"}}>
                    <div style={{color:uFile?G:MUTED,display:"flex",justifyContent:"center",marginBottom:8}}><I.File/></div>
                    {uFile
                      ?<><div style={{fontWeight:600,fontSize:14,color:G,marginBottom:4}}>{uFile.name}</div><div style={{color:MUTED,fontSize:12}}>{(uFile.size/1024/1024).toFixed(1)} MB · Click to change</div></>
                      :<><div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Choose audio file</div><div style={{color:MUTED,fontSize:12}}>MP3 or WAV · Max 500MB</div></>
                    }
                    <input id="audioIn" type="file" accept=".mp3,.wav,audio/mpeg,audio/wav" style={{display:"none"}} onChange={onAudioChange}/>
                  </label>
                </div>
                {/* Cover upload zone */}
                <div>
                  <label style={lbl}>Cover Artwork * (3000×3000px JPG/PNG)</label>
                  <label htmlFor="coverIn" style={{display:"block",padding:20,background:SURFACE,border:`2px dashed ${uCover?BL:BORDER2}`,borderRadius:12,cursor:"pointer",textAlign:"center",transition:"border-color .2s"}}>
                    <div style={{color:uCover?BL:MUTED,display:"flex",justifyContent:"center",marginBottom:8}}><I.Img/></div>
                    {uCover
                      ?<><div style={{fontWeight:600,fontSize:14,color:BL,marginBottom:4}}>{uCover.name}</div><div style={{color:MUTED,fontSize:12}}>{(uCover.size/1024/1024).toFixed(1)} MB · 3000×3000px · Click to change</div></>
                      :<><div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Choose artwork</div><div style={{color:MUTED,fontSize:12}}>JPG or PNG · Exactly 3000×3000px · Max 20MB</div></>
                    }
                    <input id="coverIn" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" style={{display:"none"}} onChange={onCoverChange}/>
                  </label>
                </div>
                <div style={{background:`${OR}08`,border:`1px solid ${OR}18`,borderRadius:10,padding:"12px 14px",fontSize:12,color:MUTED,lineHeight:1.6}}>
                  <strong style={{color:OR}}>Distribution requirements:</strong> Audio must be MP3 or WAV. Artwork must be exactly 3000×3000px JPG/PNG. Files not meeting these standards are rejected by DSPs.
                </div>
                <button onClick={handleUpload}
                  style={{padding:"14px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <I.Up/> Submit for Distribution
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAYOUT MODAL */}
      {showPayout&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,width:"100%",maxWidth:460,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div><h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:800}}>Request Payout</h3><p style={{margin:0,color:MUTED,fontSize:13}}>Available: <strong style={{color:G}}>{fmt(balance)}</strong></p></div>
              <button onClick={()=>{setShowPayout(false);setPMsg("");}} style={{background:"none",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,padding:6,cursor:"pointer",display:"flex"}}><I.X/></button>
            </div>
            {pMsg&&(pMsg.startsWith("ok:")?<Suc msg={pMsg.slice(3)}/>:<Err msg={pMsg.slice(4)}/>)}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label style={lbl}>Amount (₦) *</label><input style={inp} type="number" placeholder="Minimum ₦5,000" value={pAmount} onChange={e=>setPAmount(e.target.value)}/></div>
              <div>
                <label style={lbl}>Payment Method</label>
                <div style={{display:"flex",gap:8}}>
                  {[["bank","Bank Transfer"],["mobile","Mobile Money"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setPMethod(v)} style={{flex:1,padding:"11px",background:pMethod===v?`${G}15`:SURFACE,border:`1px solid ${pMethod===v?G:BORDER}`,borderRadius:9,color:pMethod===v?G:MUTED,cursor:"pointer",fontSize:13,fontWeight:pMethod===v?700:400}}>{l}</button>
                  ))}
                </div>
              </div>
              {pMethod==="bank"
                ?<>
                  <div><label style={lbl}>Bank Name *</label><input style={inp} placeholder="e.g. GTBank" value={pBank} onChange={e=>setPBank(e.target.value)}/></div>
                  <div><label style={lbl}>Account Name *</label><input style={inp} placeholder="Account holder name" value={pAcctName} onChange={e=>setPAcctName(e.target.value)}/></div>
                  <div><label style={lbl}>Account Number *</label><input style={inp} placeholder="10-digit account number" maxLength={10} value={pAcct} onChange={e=>setPAcct(e.target.value)}/></div>
                </>
                :<div><label style={lbl}>Mobile Number (Opay/Palmpay) *</label><input style={inp} placeholder="e.g. 08012345678" value={pPhone} onChange={e=>setPPhone(e.target.value)}/></div>
              }
              <button onClick={handlePayout} disabled={pBusy} style={{padding:"13px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:pBusy?"not-allowed":"pointer",opacity:pBusy?0.7:1}}>
                {pBusy?"Submitting...":"Submit Payout Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── MESSAGE ALL ARTISTS ──────────────────────────────────────────────────────
const MessageAllArtists=({users,sendNotification})=>{
  const[msg,setMsg]=useState("");
  const[busy,setBusy]=useState(false);
  const[sent,setSent]=useState(false);

  const send=async()=>{
    if(!msg.trim())return;
    setBusy(true);
    const artists=users.filter(u=>u.role==="artist"||u.role==="team_admin");
    await Promise.all(artists.map(u=>sendNotification(u.id,"message",msg.trim(),{message:msg.trim()})));
    setMsg("");setSent(true);setBusy(false);
    setTimeout(()=>setSent(false),3000);
  };

  return(
    <div>
      {sent&&<Suc msg="Message sent to all artists!"/>}
      <div style={{display:"flex",gap:8}}>
        <input style={{...inp,flex:1,fontSize:13}} placeholder="Type a message to all artists..."
          value={msg} onChange={e=>setMsg(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}/>
        <button onClick={send} disabled={busy||!msg.trim()}
          style={{padding:"11px 18px",background:BL,color:"#000",border:"none",
            borderRadius:9,fontWeight:700,cursor:"pointer",
            opacity:busy||!msg.trim()?0.5:1,whiteSpace:"nowrap",fontSize:13}}>
          {busy?"Sending...":"Send"}
        </button>
      </div>
    </div>
  );
};

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
const AdminDash=({user,onLogout})=>{
  const[tab,setTab]=useState("overview");
  const[users,setUsers]=useState([]);
  const[releases,setReleases]=useState([]);
  const[payouts,setPayouts]=useState([]);
  const[promos,setPromos]=useState([]);
  const[loading,setLoading]=useState(true);
  const[mob,setMob]=useState(window.innerWidth<768);
  // edit release
  const[editRel,setEditRel]=useState(null);
  const[relEarnings,setRelEarnings]=useState("");
  const[relStreams,setRelStreams]=useState("");
  const[relDsps,setRelDsps]=useState("");
  const[relBusy,setRelBusy]=useState(false);
  const[relMsg,setRelMsg]=useState("");
  // team modal
  const[showTeam,setShowTeam]=useState(false);
  const[teamEmail,setTeamEmail]=useState("");
  const[teamBusy,setTeamBusy]=useState(false);
  const[teamMsg,setTeamMsg]=useState("");

  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

  // ── REAL-TIME subscriptions ────────────────────────────────────────────────
  useEffect(()=>{
    fetchAll();
    const subs=[
      supabase.channel("admin_profiles").on("postgres_changes",{event:"*",schema:"public",table:"profiles"},()=>fetchAll()).subscribe(),
      supabase.channel("admin_releases").on("postgres_changes",{event:"*",schema:"public",table:"releases"},()=>fetchAll()).subscribe(),
      supabase.channel("admin_payouts").on("postgres_changes",{event:"*",schema:"public",table:"payouts"},()=>fetchAll()).subscribe(),
      supabase.channel("admin_promos").on("postgres_changes",{event:"*",schema:"public",table:"promo_requests"},()=>fetchAll()).subscribe(),
    ];
    return()=>subs.forEach(s=>s.unsubscribe());
  },[]);

  const fetchAll=async()=>{
    setLoading(true);
    const[{data:u},{data:r},{data:p},{data:pr}]=await Promise.all([
      supabase.from("profiles").select("*").order("created_at",{ascending:false}),
      supabase.from("releases").select("*").order("created_at",{ascending:false}),
      supabase.from("payouts").select("*").order("created_at",{ascending:false}),
      supabase.from("promo_requests").select("*").order("created_at",{ascending:false}),
    ]);
    setUsers(u||[]);setReleases(r||[]);setPayouts(p||[]);setPromos(pr||[]);setLoading(false);
  };

  const sendNotification=async(userId,type,message,emailData={})=>{
    // 1. In-app notification
    await supabase.from("notifications").insert({
      user_id:userId,type,message,read:false,
      created_at:new Date().toISOString()
    });
    // 2. Email notification
    try{
      const artist=users.find(u=>u.id===userId);
      if(artist?.email){
        await supabase.functions.invoke("send-notification",{
          body:{
            to:artist.email,
            artistName:artist.name,
            type,
            ...emailData
          }
        });
      }
    }catch(e){console.warn("Email send failed:",e.message);}
  };

  const updateRelease=async(id,fields,userId,notifType,notifMsg)=>{
    await supabase.from("releases").update(fields).eq("id",id);
    if(userId&&notifMsg)await sendNotification(userId,notifType,notifMsg,{releaseTitle:fields.status?"":"",...(notifMsg.includes("LIVE")?{releaseTitle:releases.find(r=>r.id===id)?.title||"your release"}:{releaseTitle:releases.find(r=>r.id===id)?.title||"your release"})});
    fetchAll();
  };
  const updatePayout=async(id,status)=>{await supabase.from("payouts").update({status}).eq("id",id);fetchAll();};
  const updatePromo=async(id,status)=>{await supabase.from("promo_requests").update({status}).eq("id",id);fetchAll();};

  const saveRelEdit=async()=>{
    if(!editRel)return;
    setRelBusy(true);setRelMsg("");
    const fields={};
    if(relEarnings!=="")fields.earnings=Number(relEarnings);
    if(relStreams!=="")fields.streams=Number(relStreams);
    if(relDsps!=="")fields.dsps=relDsps.split(",").map(d=>d.trim()).filter(Boolean);
    const{error}=await supabase.from("releases").update(fields).eq("id",editRel.id);
    if(error){setRelMsg("err:"+error.message);}else{setRelMsg("ok:Updated!");fetchAll();setTimeout(()=>{setEditRel(null);setRelMsg("");},1500);}
    setRelBusy(false);
  };

  const makeTeamAdmin=async()=>{
    if(!teamEmail.trim()){setTeamMsg("err:Enter an email.");return;}
    setTeamBusy(true);setTeamMsg("");
    const{data:profile,error}=await supabase.from("profiles").select("id,name").eq("email",teamEmail.trim()).single();
    if(error||!profile){setTeamMsg("err:User not found. They must sign up first.");setTeamBusy(false);return;}
    const{error:upErr}=await supabase.from("profiles").update({role:"team_admin"}).eq("id",profile.id);
    if(upErr){setTeamMsg("err:"+upErr.message);setTeamBusy(false);return;}
    setTeamMsg("ok:"+profile.name+" is now a Team Admin.");
    setTeamEmail("");fetchAll();setTeamBusy(false);
  };

  const stCfg={pending_review:{label:"In Review",c:"#FFB300"},approved:{label:"Approved",c:BL},distributed:{label:"Live",c:G},rejected:{label:"Rejected",c:RED}};
  const pending=releases.filter(r=>r.status==="pending_review");
  const pendingPay=payouts.filter(p=>p.status==="pending");
  const pendingPromo=promos.filter(p=>p.status==="pending");

  const Btn=({id,Ic,label,badge})=>(
    <button onClick={()=>setTab(id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",width:"100%",background:tab===id?`${G}10`:"transparent",borderLeft:tab===id?`2px solid ${G}`:"2px solid transparent",color:tab===id?WHITE:MUTED,border:"none",cursor:"pointer",fontSize:14,fontWeight:tab===id?600:400,transition:"all .15s"}}>
      <span style={{display:"flex",alignItems:"center",gap:12}}><Ic/>{label}</span>
      {badge>0&&<span style={{background:RED,color:WHITE,borderRadius:10,padding:"2px 8px",fontSize:11,fontWeight:700}}>{badge}</span>}
    </button>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,color:WHITE,fontFamily:"system-ui,sans-serif"}}>
      <div style={{position:"fixed",top:0,left:0,right:0,height:60,zIndex:100,background:"rgba(3,5,11,0.96)",backdropFilter:"blur(24px)",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}><Logo size={22}/><Badge c={OR}>ADMIN</Badge></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setShowTeam(true)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`${OR}15`,border:`1px solid ${OR}30`,borderRadius:8,color:OR,cursor:"pointer",fontSize:13,fontWeight:600}}><I.Users/>Team</button>
          <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,cursor:"pointer",fontSize:13}}><I.Out/>Sign out</button>
        </div>
      </div>

      {!mob&&(
        <div style={{position:"fixed",top:60,left:0,bottom:0,width:216,background:SURFACE,borderRight:`1px solid ${BORDER}`,display:"flex",flexDirection:"column",padding:"20px 0"}}>
          <div style={{padding:"0 20px 12px",fontSize:10,fontWeight:700,color:MUTED,letterSpacing:"0.1em",textTransform:"uppercase"}}>Admin Panel</div>
          <Btn id="overview" Ic={I.Chart}  label="Overview"/>
          <Btn id="pending"  Ic={I.Clock}  label="Pending Reviews" badge={pending.length}/>
          <Btn id="releases" Ic={I.Music}  label="All Releases"/>
          <Btn id="artists"  Ic={I.Users}  label="All Artists"/>
          <Btn id="payouts"  Ic={I.Wallet} label="Payouts"          badge={pendingPay.length}/>
          <Btn id="promos"   Ic={I.Mega}   label="Promo Requests"   badge={pendingPromo.length}/>
        </div>
      )}

      <div style={{paddingTop:76,paddingLeft:mob?16:232,paddingRight:mob?16:28,paddingBottom:40}}>
        <div style={{maxWidth:960}}>

          {tab==="overview"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
                <h2 style={{margin:0,fontSize:22,fontWeight:800}}>Platform Overview</h2>
                <div style={{display:"flex",alignItems:"center",gap:6,color:G,fontSize:13}}>
                  <svg width="8" height="8"><circle cx="4" cy="4" r="4" fill={G}><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle></svg>
                  Live — updates in real-time
                </div>
              </div>
              {loading?<Spinner/>:<>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
                  <Tile label="Total Artists"   value={users.filter(u=>u.role==="artist").length}/>
                  <Tile label="Total Releases"  value={releases.length}/>
                  <Tile label="Live Releases"   value={releases.filter(r=>r.status==="distributed").length} color={G}/>
                  <Tile label="Pending Reviews" value={pending.length}       color={OR}/>
                  <Tile label="Pro Members"     value={users.filter(u=>u.plan==="Pro").length}              color={OR}/>
                  <Tile label="Pending Payouts" value={pendingPay.length}    color={RED}/>
                </div>
                {pending.length>0&&(
                  <div style={{background:CARD,border:`1px solid ${OR}25`,borderRadius:16,padding:24,marginBottom:20}}>
                    <h3 style={{margin:"0 0 16px",fontSize:15,fontWeight:700,color:OR,display:"flex",alignItems:"center",gap:8}}><I.Clock/>Pending Reviews ({pending.length})</h3>
                    {pending.slice(0,5).map(r=>{
                      const artist=users.find(u=>u.id===r.user_id);
                      return(
                        <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${BORDER}`,gap:12,flexWrap:"wrap"}}>
                          <div style={{display:"flex",gap:12,alignItems:"center"}}>
                            {r.cover_url&&<img src={r.cover_url} alt="" style={{width:40,height:40,borderRadius:6,objectFit:"cover"}}/>}
                            <div>
                              <div style={{fontWeight:600}}>{r.title}</div>
                              <div style={{color:MUTED,fontSize:12,marginTop:2}}>{r.type} · {r.genre} · {artist?.name||"Unknown"} · {ago(r.created_at)}</div>
                              {r.audio_url&&<a href={r.audio_url} target="_blank" rel="noreferrer" style={{color:BL,fontSize:12,textDecoration:"none"}}>Preview →</a>}
                            </div>
                          </div>
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>updateRelease(r.id,{status:"approved"},r.user_id,"approved",`Your release "${r.title}" has been approved and is being prepared for distribution.`)} style={{padding:"8px 16px",background:`${G}18`,color:G,border:`1px solid ${G}35`,borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>Approve</button>
                            <button onClick={()=>updateRelease(r.id,{status:"rejected"},r.user_id,"rejected",`Your release "${r.title}" was not approved. Please contact support for more information.`)} style={{padding:"8px 16px",background:`${RED}10`,color:"#FF6B6B",border:`1px solid ${RED}25`,borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>Reject</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>}
            </div>
          )}

          {tab==="pending"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>Pending Reviews ({pending.length})</h2>
              {loading?<Spinner/>:pending.length===0
                ?<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,textAlign:"center",padding:"56px 0",color:MUTED}}>No pending releases</div>
                :pending.map(r=>{
                  const artist=users.find(u=>u.id===r.user_id);
                  return(
                    <div key={r.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:22,marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
                        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                          {r.cover_url&&<img src={r.cover_url} alt="" style={{width:56,height:56,borderRadius:10,objectFit:"cover",flexShrink:0}}/>}
                          <div>
                            <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{r.title}</div>
                            <div style={{color:MUTED,fontSize:13,marginBottom:6}}>{r.type} · {r.genre} · by {artist?.name||"Unknown"}</div>
                            <div style={{color:MUTED,fontSize:12}}>{ago(r.created_at)}</div>
                            <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap"}}>
                              {r.audio_url&&<a href={r.audio_url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:4,color:BL,fontSize:12,textDecoration:"none"}}><I.File/>Audio</a>}
                              {r.cover_url&&<a href={r.cover_url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:4,color:MUTED2,fontSize:12,textDecoration:"none"}}><I.Img/>Artwork</a>}
                            </div>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                          <button onClick={()=>updateRelease(r.id,{status:"approved"},r.user_id,"approved",`Your release "${r.title}" has been approved and is being prepared for distribution.`)} style={{padding:"10px 20px",background:`${G}18`,color:G,border:`1px solid ${G}35`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>✓ Approve</button>
                          <button onClick={()=>updateRelease(r.id,{status:"distributed"},r.user_id,"distributed",`Your release "${r.title}" is now LIVE on Spotify, Apple Music, Boomplay and all platforms. Start sharing! 🎉`)} style={{padding:"10px 20px",background:`${BL}12`,color:BL,border:`1px solid ${BL}30`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>Mark Live</button>
                          <button onClick={()=>updateRelease(r.id,{status:"rejected"},r.user_id,"rejected",`Your release "${r.title}" was not approved. Please contact support for more information.`)} style={{padding:"10px 20px",background:`${RED}10`,color:"#FF6B6B",border:`1px solid ${RED}25`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>✕ Reject</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}

          {tab==="releases"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>All Releases ({releases.length})</h2>
              {loading?<Spinner/>:releases.map(r=>{
                const artist=users.find(u=>u.id===r.user_id);
                return(
                  <div key={r.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:18,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                      <div style={{display:"flex",gap:12,alignItems:"center"}}>
                        {r.cover_url?<img src={r.cover_url} alt="" style={{width:44,height:44,borderRadius:8,objectFit:"cover"}}/>
                          :<div style={{width:44,height:44,borderRadius:8,background:`${G}08`,border:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,flexShrink:0}}><I.Music/></div>}
                        <div>
                          <div style={{fontWeight:600}}>{r.title}</div>
                          <div style={{color:MUTED,fontSize:13}}>{r.type} · {r.genre} · {artist?.name||"Unknown"} · {ago(r.created_at)}</div>
                          {r.dsps?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:4}}>{r.dsps.map(d=><Badge key={d} c={BL}>{d}</Badge>)}</div>}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <Badge c={(stCfg[r.status]||{c:MUTED}).c}>{(stCfg[r.status]||{label:r.status}).label}</Badge>
                        <span style={{color:G,fontWeight:700}}>{fmt(r.earnings)}</span>
                        <span style={{color:MUTED,fontSize:12}}>{fmtK(r.streams)}</span>
                        <button onClick={()=>{setEditRel(r);setRelEarnings(r.earnings||"");setRelStreams(r.streams||"");setRelDsps((r.dsps||[]).join(", "));setRelMsg("");}}
                          style={{display:"flex",alignItems:"center",gap:4,padding:"6px 12px",background:`${G}10`,border:`1px solid ${G}25`,borderRadius:7,cursor:"pointer",color:G,fontSize:12,fontWeight:600}}>
                          <I.Edit/>Update
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab==="artists"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>All Artists ({users.filter(u=>u.role==="artist"||u.role==="team_admin").length})</h2>
              {loading?<Spinner/>:users.filter(u=>u.role!=="admin").map(u=>{
                const uR=releases.filter(r=>r.user_id===u.id);
                const uE=uR.reduce((s,r)=>s+(r.earnings||0),0);
                return(
                  <div key={u.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:18,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${G}25,${BL}15)`,border:`1px solid ${G}25`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:G,fontSize:14}}>
                        {u.av||ini(u.name)}
                      </div>
                      <div>
                        <div style={{fontWeight:600}}>{u.name}</div>
                        <div style={{color:MUTED,fontSize:13}}>{u.email} · {u.created_at?ago(u.created_at):"recently"}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                      <Badge c={u.plan==="Pro"?OR:G}>{u.plan}</Badge>
                      {u.role==="team_admin"&&<Badge c={BL}>Team Admin</Badge>}
                      <span style={{color:MUTED,fontSize:13}}>{uR.length} releases</span>
                      <span style={{color:G,fontWeight:700}}>{fmt(uE)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab==="payouts"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>Payout Requests</h2>
              {loading?<Spinner/>:payouts.length===0
                ?<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,textAlign:"center",padding:"56px 0",color:MUTED}}>No payout requests yet</div>
                :payouts.map(p=>{
                  const artist=users.find(u=>u.id===p.user_id);
                  return(
                    <div key={p.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:22,marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                        <div>
                          <div style={{fontWeight:800,fontSize:20,color:G,marginBottom:4}}>{fmt(p.amount)}</div>
                          <div style={{color:MUTED2,fontSize:13,marginBottom:4}}>{artist?.name||"Unknown"}</div>
                          <div style={{color:MUTED,fontSize:13}}>{p.method==="bank"?`${p.bank_name} · ${p.account_name} · ${p.account_number}`:`Mobile: ${p.phone}`}</div>
                          <div style={{color:MUTED,fontSize:12,marginTop:4}}>{new Date(p.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                        </div>
                        {p.status==="pending"
                          ?<div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                              <button onClick={async()=>{await supabase.from("payouts").update({status:"paid"}).eq("id",p.id);await sendNotification(p.user_id,"payout_paid",`Your payout of ${fmt(p.amount)} has been processed and sent to your account.`,{amount:fmt(p.amount),bankName:p.method==="bank"?p.bank_name:"Mobile Money"});fetchAll();}} style={{padding:"9px 18px",background:`${G}18`,color:G,border:`1px solid ${G}35`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>Mark Paid</button>
                              <button onClick={async()=>{await supabase.from("payouts").update({status:"rejected"}).eq("id",p.id);await sendNotification(p.user_id,"payout_rejected",`Your payout request of ${fmt(p.amount)} was rejected. Please contact support.`,{amount:fmt(p.amount)});fetchAll();}} style={{padding:"9px 18px",background:`${RED}10`,color:"#FF6B6B",border:`1px solid ${RED}25`,borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>Reject</button>
                            </div>
                          :<Badge c={p.status==="paid"?G:RED}>{p.status==="paid"?"✓ Paid":"✕ Rejected"}</Badge>
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )}

          {tab==="promos"&&(
            <div>
              <h2 style={{margin:"0 0 24px",fontSize:22,fontWeight:800}}>Promo Requests</h2>
              {loading?<Spinner/>:promos.length===0
                ?<div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,textAlign:"center",padding:"56px 0",color:MUTED}}>No promo requests yet</div>
                :promos.map(p=>(
                  <div key={p.id} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:22,marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:12,flexWrap:"wrap"}}>
                      <div><div style={{fontWeight:700,fontSize:15}}>{p.artist_name}</div><div style={{color:MUTED,fontSize:12,marginTop:2}}>{ago(p.created_at)}</div></div>
                      <Badge c={p.status==="done"?G:OR}>{p.status==="done"?"Completed":"Pending"}</Badge>
                    </div>
                    <div style={{background:SURFACE,borderRadius:8,padding:"12px 14px",fontSize:14,color:MUTED2,lineHeight:1.65}}>{p.message}</div>
                    {p.status==="pending"&&<button onClick={()=>updatePromo(p.id,"done")} style={{marginTop:12,padding:"9px 18px",background:`${G}18`,color:G,border:`1px solid ${G}35`,borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>Mark Done</button>}
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>

      {/* EDIT RELEASE MODAL */}
      {editRel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,width:"100%",maxWidth:460,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div><h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:800}}>Update Release</h3><p style={{margin:0,color:MUTED,fontSize:13}}>{editRel.title}</p></div>
              <button onClick={()=>setEditRel(null)} style={{background:"none",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,padding:6,cursor:"pointer",display:"flex"}}><I.X/></button>
            </div>
            {relMsg&&(relMsg.startsWith("ok:")?<Suc msg={relMsg.slice(3)}/>:<Err msg={relMsg.slice(4)}/>)}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div>
                <label style={lbl}>Status</label>
                <select style={inp} defaultValue={editRel.status} onChange={e=>updateRelease(editRel.id,{status:e.target.value})}>
                  {["pending_review","approved","distributed","rejected"].map(s=><option key={s} style={{background:CARD}}>{s}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Earnings (₦)</label><input style={inp} type="number" placeholder="0" value={relEarnings} onChange={e=>setRelEarnings(e.target.value)}/></div>
              <div><label style={lbl}>Streams</label><input style={inp} type="number" placeholder="0" value={relStreams} onChange={e=>setRelStreams(e.target.value)}/></div>
              <div><label style={lbl}>DSPs (comma separated)</label><input style={inp} placeholder="Spotify, Apple Music, Boomplay" value={relDsps} onChange={e=>setRelDsps(e.target.value)}/></div>
              <button onClick={saveRelEdit} disabled={relBusy} style={{padding:"13px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",opacity:relBusy?0.7:1}}>
                {relBusy?"Saving...":"Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEAM ADMIN MODAL */}
      {showTeam&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,width:"100%",maxWidth:500,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div><h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:800}}>Team Management</h3><p style={{margin:0,color:MUTED,fontSize:13}}>Team admins can update releases, process payouts and view all users</p></div>
              <button onClick={()=>{setShowTeam(false);setTeamMsg("");}} style={{background:"none",border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED,padding:6,cursor:"pointer",display:"flex"}}><I.X/></button>
            </div>
            {teamMsg&&(teamMsg.startsWith("ok:")?<Suc msg={teamMsg.slice(3)}/>:<Err msg={teamMsg.slice(4)}/>)}
            <div style={{marginBottom:24}}>
              <label style={lbl}>Promote user to Team Admin</label>
              <div style={{display:"flex",gap:10}}>
                <input style={{...inp,flex:1}} type="email" placeholder="their@email.com" value={teamEmail} onChange={e=>setTeamEmail(e.target.value)}/>
                <button onClick={makeTeamAdmin} disabled={teamBusy} style={{padding:"12px 20px",background:OR,color:"#000",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",opacity:teamBusy?0.7:1,whiteSpace:"nowrap"}}>
                  {teamBusy?"...":"Add Admin"}
                </button>
              </div>
              <div style={{color:MUTED,fontSize:12,marginTop:8}}>The user must already have an account on FamousTechPlay.</div>
            </div>
            <div style={{background:SURFACE,borderRadius:12,padding:16}}>
              <div style={{fontSize:12,fontWeight:700,color:MUTED,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>Current Team Admins</div>
              {users.filter(u=>u.role==="team_admin").length===0
                ?<div style={{color:MUTED,fontSize:13}}>No team admins yet.</div>
                :users.filter(u=>u.role==="team_admin").map(u=>(
                  <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${BORDER}`}}>
                    <div><div style={{fontWeight:600,fontSize:14}}>{u.name}</div><div style={{color:MUTED,fontSize:12}}>{u.email}</div></div>
                    <button onClick={async()=>{await supabase.from("profiles").update({role:"artist"}).eq("id",u.id);fetchAll();}}
                      style={{padding:"5px 12px",background:`${RED}10`,color:"#FF6B6B",border:`1px solid ${RED}25`,borderRadius:7,cursor:"pointer",fontSize:12}}>Remove</button>
                  </div>
                ))
              }
            </div>
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,fontWeight:700,color:MUTED,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Send Message to All Artists</div>
              <MessageAllArtists users={users} sendNotification={sendNotification}/>
            </div>
            <div style={{marginTop:16,padding:"14px",background:`${BL}08`,border:`1px solid ${BL}20`,borderRadius:10,fontSize:12,color:MUTED,lineHeight:1.6}}>
              <strong style={{color:BL}}>Team Admin permissions:</strong> Can update release status, earnings, streams, DSPs · Process and approve payouts · View all artist info · Cannot manage team or delete data.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage=({onGetStarted})=>{
  const[mob,setMob]=useState(window.innerWidth<768);
  const[navPage,setNavPage]=useState("home");
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

  const features=[
    {Ic:I.Globe,   title:"100+ Platforms Worldwide",     desc:"Spotify, Apple Music, Boomplay, Audiomack, Tidal, YouTube Music, Deezer, Amazon Music and 92+ more DSPs globally."},
    {Ic:I.Shield,  title:"Keep 100% of Your Royalties",  desc:"We never take a cut. Every naira your music earns goes directly to you — no hidden deductions."},
    {Ic:I.Zap,     title:"Go Live in 2–3 Business Days", desc:"Fast-tracked distribution to all major platforms. Start earning almost immediately after approval."},
    {Ic:I.Chart,   title:"Real-Time Analytics",          desc:"Monitor streams, revenue and listener data across every platform from one clean, live dashboard."},
    {Ic:I.Wallet,  title:"Fast, Flexible Payouts",       desc:"Request payouts to your Nigerian bank account or Opay/Palmpay mobile money. Processed within 48 hours."},
    {Ic:I.Mega,    title:"Pro Promotion Support",        desc:"Pro members get an assigned promotion agent, free materials and a free social media post every month."},
  ];

  const dsps=["Spotify","Apple Music","Boomplay","Audiomack","Tidal","YouTube Music","Deezer","Amazon Music"];

  const jobs=[
    {title:"Artist Relations Manager",     type:"Full-time",  loc:"Lagos, Nigeria",  desc:"Be the primary point of contact for our artists. Manage onboarding, support, and ensure artists get the best experience on our platform."},
    {title:"Distribution Operations Lead", type:"Full-time",  loc:"Remote",          desc:"Oversee the end-to-end distribution pipeline, coordinate with DSPs, and ensure releases meet quality standards across all platforms."},
    {title:"Marketing & Growth Associate", type:"Full-time",  loc:"Lagos, Nigeria",  desc:"Drive artist acquisition and platform growth through social media, content, partnerships and community building."},
    {title:"Finance & Royalties Analyst",  type:"Full-time",  loc:"Lagos / Remote",  desc:"Manage royalty collection, processing and disbursements. Work closely with DSPs on financial reporting and artist payouts."},
  ];

  if(navPage==="careers")return(
    <div style={{minHeight:"100vh",background:BG,color:WHITE,fontFamily:"system-ui,sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,height:64,zIndex:100,background:"rgba(3,5,11,0.94)",backdropFilter:"blur(24px)",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)"}}>
        <button onClick={()=>setNavPage("home")} style={{background:"none",border:"none",cursor:"pointer",color:WHITE,padding:0}}><Logo size={22}/></button>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setNavPage("home")} style={{padding:"8px 16px",background:"none",border:`1px solid ${BORDER2}`,color:MUTED2,borderRadius:8,cursor:"pointer",fontSize:13}}>← Back</button>
          <button onClick={onGetStarted} style={{padding:"9px 20px",background:G,color:"#000",border:"none",borderRadius:9,cursor:"pointer",fontSize:14,fontWeight:700}}>Get Started Free</button>
        </div>
      </nav>
      <div style={{paddingTop:100,paddingBottom:80,padding:`100px clamp(16px,4vw,48px) 80px`,maxWidth:800,margin:"0 auto"}}>
        <Badge c={G}>We're hiring</Badge>
        <h1 style={{fontSize:mob?32:48,fontWeight:900,letterSpacing:"-1.5px",margin:"16px 0 12px"}}>Join FamousTechPlay</h1>
        <p style={{color:MUTED2,fontSize:17,marginBottom:48,lineHeight:1.7}}>Help us build the future of music distribution for African artists. We're a fast-growing team passionate about empowering independent creators.</p>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {jobs.map(j=>(
            <div key={j.title} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:28}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:12}}>
                <div>
                  <div style={{fontWeight:800,fontSize:18,marginBottom:6}}>{j.title}</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <Badge c={G}>{j.type}</Badge>
                    <Badge c={MUTED}>{j.loc}</Badge>
                  </div>
                </div>
                <a href={`mailto:${SUPPORT_EMAIL}?subject=Application: ${encodeURIComponent(j.title)}&body=Hi FamousTechPlay team,%0A%0AI'd like to apply for the ${encodeURIComponent(j.title)} position.%0A%0AAbout me:%0A%0AExperience:%0A%0AWhy FamousTechPlay:%0A`}
                  style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:G,color:"#000",borderRadius:9,fontWeight:700,fontSize:13,textDecoration:"none"}}>
                  <I.Mail/>Apply Now
                </a>
              </div>
              <p style={{color:MUTED2,fontSize:14,lineHeight:1.7,margin:0}}>{j.desc}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:40,padding:24,background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>Don't see your role?</div>
          <p style={{color:MUTED,fontSize:14,marginBottom:16}}>Send us your CV and tell us how you'd contribute to our mission.</p>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Open Application&body=Hi FamousTechPlay team,%0A%0AI'd love to be part of the team.%0A`}
            style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 24px",background:`${G}15`,color:G,border:`1px solid ${G}30`,borderRadius:9,fontWeight:700,fontSize:14,textDecoration:"none"}}>
            <I.Mail/>Send Open Application
          </a>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,color:WHITE,fontFamily:"system-ui,sans-serif",overflowX:"hidden"}}>
      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,height:64,zIndex:100,background:"rgba(3,5,11,0.94)",backdropFilter:"blur(24px)",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)"}}>
        <Logo size={22}/>
        <div style={{display:"flex",alignItems:"center",gap:mob?8:16}}>
          {!mob&&<button onClick={()=>setNavPage("careers")} style={{background:"none",border:"none",color:MUTED2,cursor:"pointer",fontSize:14}}>Careers</button>}
          {!mob&&<a href={`mailto:${SUPPORT_EMAIL}`} style={{color:MUTED2,fontSize:14,textDecoration:"none"}}>Support</a>}
          <button onClick={onGetStarted} style={{padding:"8px 16px",background:"transparent",border:`1px solid ${BORDER2}`,color:MUTED2,borderRadius:9,cursor:"pointer",fontSize:14}}>Sign In</button>
          <button onClick={onGetStarted} style={{padding:"9px 20px",background:G,color:"#000",border:"none",borderRadius:9,cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>Get Started Free <I.Arrow/></button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{paddingTop:130,paddingBottom:80,padding:`130px clamp(16px,4vw,48px) 80px`,textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:80,left:"50%",transform:"translateX(-50%)",width:700,height:400,background:`radial-gradient(${G}14,transparent 68%)`,borderRadius:"50%",pointerEvents:"none",filter:"blur(60px)"}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",background:`${G}10`,border:`1px solid ${G}22`,borderRadius:20,fontSize:13,color:G,fontWeight:600,marginBottom:28,position:"relative"}}>
          <I.Zap/> Distributing to 100+ platforms worldwide
        </div>
        <h1 style={{fontSize:mob?"36px":"clamp(48px,6.5vw,76px)",fontWeight:900,letterSpacing:"-2.5px",lineHeight:1.04,margin:"0 auto 20px",maxWidth:820,position:"relative"}}>
          Your Music Deserves<br/><span style={{color:G}}>the World.</span>
        </h1>
        <p style={{fontSize:mob?16:19,color:MUTED2,maxWidth:560,margin:"0 auto 44px",lineHeight:1.7,position:"relative"}}>
          Distribute your music to Spotify, Apple Music, Boomplay and 100+ platforms. Keep every naira you earn. Free forever.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:64,position:"relative"}}>
          <button onClick={onGetStarted} style={{padding:"16px 40px",background:G,color:"#000",border:"none",borderRadius:12,fontWeight:800,fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>Start Distributing Free <I.Arrow/></button>
          <button onClick={onGetStarted} style={{padding:"16px 32px",background:"transparent",color:WHITE,border:`1px solid ${BORDER2}`,borderRadius:12,fontWeight:600,fontSize:17,cursor:"pointer"}}>Sign In</button>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",position:"relative"}}>
          {dsps.map(d=><div key={d} style={{padding:"7px 16px",background:"rgba(255,255,255,0.04)",border:`1px solid ${BORDER}`,borderRadius:20,fontSize:13,color:MUTED2}}>{d}</div>)}
          <div style={{padding:"7px 16px",background:`${G}10`,border:`1px solid ${G}25`,borderRadius:20,fontSize:13,color:G}}>+ 92 more</div>
        </div>
      </div>

      {/* STATS */}
      <div style={{borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,background:SURFACE,padding:"44px clamp(16px,4vw,48px)"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:28}}>
          {[["₦3B+","Paid to artists"],["10M+","Total streams"],["2,000+","Independent artists"],["100+","DSP platforms"],["48hrs","Payout processing"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:mob?28:34,fontWeight:900,color:G,letterSpacing:"-1px"}}>{v}</div>
              <div style={{color:MUTED,fontSize:13,marginTop:5,fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{padding:`88px clamp(16px,4vw,48px)`,maxWidth:1060,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <h2 style={{fontSize:mob?28:42,fontWeight:900,letterSpacing:"-1.5px",margin:"0 0 14px"}}>Everything you need to succeed</h2>
          <p style={{color:MUTED,fontSize:16,maxWidth:480,margin:"0 auto"}}>Built specifically for African artists. Designed for global reach.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:20}}>
          {features.map(f=>(
            <div key={f.title} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:28}}>
              <div style={{width:44,height:44,borderRadius:12,background:`${G}10`,border:`1px solid ${G}18`,display:"flex",alignItems:"center",justifyContent:"center",color:G,marginBottom:18}}><f.Ic/></div>
              <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>{f.title}</div>
              <div style={{color:MUTED,fontSize:14,lineHeight:1.7}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div style={{background:SURFACE,borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,padding:`88px clamp(16px,4vw,48px)`}}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <h2 style={{fontSize:mob?28:42,fontWeight:900,letterSpacing:"-1.5px",margin:"0 0 14px"}}>Simple, transparent pricing</h2>
            <p style={{color:MUTED,fontSize:16,margin:0}}>No hidden fees. No surprises. Keep everything you earn.</p>
          </div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:20,padding:32,flex:1,minWidth:260}}>
              <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Free</div>
              <div style={{fontSize:38,fontWeight:900,letterSpacing:"-1px",marginBottom:4}}>₦0</div>
              <div style={{color:MUTED,fontSize:14,marginBottom:28}}>Forever free</div>
              {["Up to 3 releases","All 100+ platforms","Keep 100% royalties","Bank & mobile payouts","Standard distribution speed"].map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,fontSize:14,color:MUTED2}}><span style={{color:G,flexShrink:0}}><I.Check/></span>{f}</div>
              ))}
              <button onClick={onGetStarted} style={{marginTop:24,width:"100%",padding:"13px",background:G,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer"}}>Get Started Free</button>
            </div>
            <div style={{background:`linear-gradient(150deg,${CARD},${CARD2})`,border:`1px solid ${OR}45`,borderRadius:20,padding:32,flex:1,minWidth:260,position:"relative"}}>
              <div style={{position:"absolute",top:-14,right:20,background:OR,color:"#000",padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:800,letterSpacing:"0.05em"}}>MOST POPULAR</div>
              <div style={{fontWeight:800,fontSize:20,marginBottom:8,color:OR}}>Pro</div>
              <div style={{fontSize:38,fontWeight:900,letterSpacing:"-1px",marginBottom:4}}>₦25,000</div>
              <div style={{color:MUTED,fontSize:14,marginBottom:28}}>per month</div>
              {["Unlimited releases","Priority distribution","Assigned promotion agent","Free promotional materials","Free social post monthly","Higher payout priority","Dedicated support"].map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,fontSize:14}}><span style={{color:OR,flexShrink:0}}><I.Check/></span>{f}</div>
              ))}
              <button onClick={onGetStarted} style={{marginTop:24,width:"100%",padding:"13px",background:OR,color:"#000",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>Upgrade to Pro <I.Arrow/></button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:`88px clamp(16px,4vw,48px)`,textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:`radial-gradient(${G}10,transparent 70%)`,borderRadius:"50%",pointerEvents:"none",filter:"blur(60px)"}}/>
        <h2 style={{fontSize:mob?28:52,fontWeight:900,letterSpacing:"-2px",margin:"0 0 16px",position:"relative"}}>Ready to go worldwide?</h2>
        <p style={{color:MUTED2,fontSize:17,maxWidth:520,margin:"0 auto 44px",lineHeight:1.7,position:"relative"}}>Join thousands of artists already earning on Spotify, Apple Music, Boomplay and beyond.</p>
        <button onClick={onGetStarted} style={{padding:"18px 52px",background:G,color:"#000",border:"none",borderRadius:14,fontWeight:800,fontSize:18,cursor:"pointer",position:"relative",display:"inline-flex",alignItems:"center",gap:10}}>
          Start for Free Today <I.Arrow/>
        </button>
      </div>

      {/* FOOTER */}
      <div style={{borderTop:`1px solid ${BORDER}`,padding:"40px clamp(16px,4vw,48px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32,maxWidth:1060,margin:"0 auto"}}>
          <div>
            <Logo size={22}/>
            <p style={{color:MUTED,fontSize:13,marginTop:12,maxWidth:280,lineHeight:1.7}}>Empowering African artists to distribute their music worldwide and keep 100% of their earnings.</p>
            <div style={{display:"flex",gap:12,marginTop:16}}>
              <a href="https://instagram.com/famoustechplay" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED2,textDecoration:"none"}}><I.Insta/></a>
              <a href="https://x.com/famoustechplay" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED2,textDecoration:"none"}}><I.Twitter/></a>
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,background:SURFACE,border:`1px solid ${BORDER}`,borderRadius:8,color:MUTED2,textDecoration:"none"}}><I.Mail/></a>
            </div>
          </div>
          <div style={{display:"flex",gap:48,flexWrap:"wrap"}}>
            <div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:16,color:MUTED2}}>Product</div>
              {[["Get Started",onGetStarted],["Sign In",onGetStarted],["Pricing",onGetStarted]].map(([l,fn])=>(
                <div key={l} style={{marginBottom:10}}><button onClick={fn} style={{background:"none",border:"none",color:MUTED,cursor:"pointer",fontSize:14,padding:0}}>{l}</button></div>
              ))}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:16,color:MUTED2}}>Company</div>
              {[["Careers",()=>setNavPage("careers")],["Support",()=>window.open(`mailto:${SUPPORT_EMAIL}`,"_blank")]].map(([l,fn])=>(
                <div key={l} style={{marginBottom:10}}><button onClick={fn} style={{background:"none",border:"none",color:MUTED,cursor:"pointer",fontSize:14,padding:0}}>{l}</button></div>
              ))}
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:16,color:MUTED2}}>Contact</div>
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{color:MUTED,fontSize:14,textDecoration:"none",display:"block",marginBottom:10}}>{SUPPORT_EMAIL}</a>
              <a href="https://instagram.com/famoustechplay" target="_blank" rel="noreferrer" style={{color:MUTED,fontSize:14,textDecoration:"none",display:"block",marginBottom:10}}>Instagram</a>
              <a href="https://x.com/famoustechplay" target="_blank" rel="noreferrer" style={{color:MUTED,fontSize:14,textDecoration:"none",display:"block"}}>X (Twitter)</a>
            </div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${BORDER}`,marginTop:32,paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,maxWidth:1060,margin:"32px auto 0"}}>
          <div style={{color:MUTED,fontSize:13}}>© {new Date().getFullYear()} FamousTechPlay. All rights reserved.</div>
          <div style={{color:MUTED,fontSize:13}}>Distribute · Earn · Grow</div>
        </div>
      </div>
    </div>
  );
};

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[user,setUser]=useState(null);
  const[checking,setChecking]=useState(true);
  const[page,setPage]=useState("home");

  const loadProfile=async(sessionUser)=>{
    if(!sessionUser){setUser(null);setChecking(false);return;}
    try{
      const{data:p}=await supabase.from("profiles").select("*").eq("id",sessionUser.id).single();
      if(p){
        setUser({id:sessionUser.id,email:sessionUser.email,
          name:p.name,role:p.role,plan:p.plan,av:p.av||ini(p.name)});
      } else {
        // Profile missing — create it then set user
        const name=sessionUser.user_metadata?.name||sessionUser.email.split("@")[0];
        await supabase.from("profiles").upsert({
          id:sessionUser.id,email:sessionUser.email,name,
          role:"artist",plan:"Free",av:ini(name),created_at:new Date().toISOString()
        });
        setUser({id:sessionUser.id,email:sessionUser.email,
          name,role:"artist",plan:"Free",av:ini(name)});
      }
    }catch(e){
      console.error("Profile load error:",e);
    }
    setChecking(false);
  };

  useEffect(()=>{
    // Safety timeout — never show loading screen more than 4 seconds
    const timeout=setTimeout(()=>setChecking(false),4000);

    // Check existing session on load
    supabase.auth.getSession().then(({data:{session}})=>{
      clearTimeout(timeout);
      loadProfile(session?.user||null);
    }).catch(()=>{
      clearTimeout(timeout);
      setChecking(false);
    });

    // Listen for auth changes (sign in / sign out)
    const{data:{subscription}}=supabase.auth.onAuthStateChange(async(event,session)=>{
      if(event==="SIGNED_OUT"||!session){
        setUser(null);setChecking(false);
      } else if(event==="SIGNED_IN"||event==="TOKEN_REFRESHED"){
        await loadProfile(session.user);
      }
    });
    return()=>{subscription.unsubscribe();clearTimeout(timeout);};
  },[]);

  const handleLogout=async()=>{await supabase.auth.signOut();setUser(null);setPage("home");};

  if(checking)return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif"}}>
      <div style={{textAlign:"center"}}><Logo size={34}/><div style={{color:MUTED,marginTop:20,fontSize:14}}>Loading...</div></div>
    </div>
  );

  if(user&&(user.role==="admin"||user.role==="team_admin"))return<AdminDash user={user} onLogout={handleLogout}/>;
  if(user)return<ArtistDash user={user} onLogout={handleLogout}/>;
  if(page==="auth")return<AuthPage onLogin={setUser} onBack={()=>setPage("home")}/>;
  return<HomePage onGetStarted={()=>setPage("auth")}/>;
}
