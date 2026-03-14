import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ── SUPABASE ──────────────────────────────────────────────────────────────────
const supabase = createClient(
  "https://eryeaaomkkzyyklnfaxa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWVhYW9ta2t6eXlrbG5mYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE0NDUsImV4cCI6MjA4ODM4NzQ0NX0.WxLQQuvWLcQLfMYJ4cqj3YM9GtHsMiRVt5Dt4IK1o5c"
);

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const G = "#00E676", BL = "#29B6F6", OR = "#FF6D00";
const BG = "#04060C", CARD = "#0B0E1A", BORDER = "rgba(255,255,255,0.07)";
const WHITE = "#ffffff", MUTED = "#8892A4";
const PRO_PRICE = 25000;
const FREE_RELEASE_LIMIT = 3;

const DSPs = ["Spotify","Apple Music","Boomplay","Audiomack","Tidal","YouTube Music","Deezer","Amazon Music","Pandora","SoundCloud"];

const STATUS_MAP = {
  pending_review: { label: "In Review", color: "#FFB300" },
  approved:       { label: "Approved",  color: BL },
  distributed:    { label: "Live",      color: G },
  rejected:       { label: "Rejected",  color: "#FF1744" },
};

const fmt  = n => `₦${new Intl.NumberFormat("en-NG").format(Math.round(n||0))}`;
const fmtK = n => new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(n||0);
const initials = name => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

// ── STYLES ────────────────────────────────────────────────────────────────────
const css = {
  page:    { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"system-ui,sans-serif" },
  card:    { background:CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:24 },
  input:   { width:"100%", padding:"12px 16px", background:"rgba(255,255,255,0.05)",
             border:`1px solid ${BORDER}`, borderRadius:10, color:WHITE,
             fontSize:15, outline:"none", boxSizing:"border-box" },
  btnG:    { padding:"13px 28px", background:G, color:"#000", border:"none",
             borderRadius:10, fontWeight:700, fontSize:15, cursor:"pointer", width:"100%" },
  btnGhost:{ padding:"11px 24px", background:"transparent", color:WHITE,
             border:`1px solid ${BORDER}`, borderRadius:10, fontWeight:600,
             fontSize:14, cursor:"pointer" },
  label:   { fontSize:13, color:MUTED, marginBottom:6, display:"block" },
  tag:     { display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px",
             borderRadius:20, fontSize:12, fontWeight:700 },
  topbar:  { position:"fixed", top:0, left:0, right:0, height:62, zIndex:100,
             background:"rgba(4,6,12,0.96)", backdropFilter:"blur(20px)",
             borderBottom:`1px solid ${BORDER}`, display:"flex",
             alignItems:"center", justifyContent:"space-between",
             padding:"0 24px" },
  sidebar: { position:"fixed", top:62, left:0, bottom:0, width:220,
             background:CARD, borderRight:`1px solid ${BORDER}`,
             display:"flex", flexDirection:"column", padding:"16px 0", overflowY:"auto" },
  main:    { paddingTop:82, paddingLeft:240, paddingRight:24, paddingBottom:40, minHeight:"100vh" },
  mainMob: { paddingTop:82, padding:"82px 16px 80px" },
};

// ── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = ({ size = 26 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="19" fill="none" stroke={G}  strokeWidth="4" strokeDasharray="28 60" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="19" fill="none" stroke={BL} strokeWidth="4" strokeDasharray="22 66" strokeLinecap="round" strokeDashoffset="-32"/>
      <circle cx="20" cy="20" r="19" fill="none" stroke={OR} strokeWidth="4" strokeDasharray="12 76" strokeLinecap="round" strokeDashoffset="-56"/>
      <polygon points="16,13 16,27 28,20" fill={WHITE}/>
    </svg>
    <span style={{ fontWeight:800, fontSize:size*0.72, letterSpacing:"-0.5px" }}>FamousTechPlay</span>
  </div>
);

// ── AUTH PAGE ─────────────────────────────────────────────────────────────────
const AuthPage = ({ onLogin }) => {
  const [mode, setMode]   = useState("signin");
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");
  const [msg, setMsg]     = useState("");
  const [busy, setBusy]   = useState(false);

  const handleSignUp = async () => {
    setErr(""); setMsg("");
    if (!name || !email || !pass) { setErr("Please fill in all fields."); return; }
    if (pass.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { name } } });
    if (error) { setErr(error.message); setBusy(false); return; }
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id, email, name,
        role: "artist", plan: "Free",
        av: initials(name), created_at: new Date().toISOString()
      });
      setMsg("✅ Account created! You can now sign in.");
      setMode("signin");
    }
    setBusy(false);
  };

  const handleSignIn = async () => {
    setErr(""); setMsg("");
    if (!email || !pass) { setErr("Please enter your email and password."); return; }
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) { setErr(error.message); setBusy(false); return; }
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    onLogin({
      id:    data.user.id,
      email: data.user.email,
      name:  profile?.name  || data.user.user_metadata?.name || email.split("@")[0],
      role:  profile?.role  || "artist",
      plan:  profile?.plan  || "Free",
      av:    profile?.av    || initials(profile?.name || email),
    });
    setBusy(false);
  };

  return (
    <div style={{ ...css.page, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
      <div style={{ width:"100%", maxWidth:440, padding:24 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}><Logo size={32}/></div>
        <div style={{ ...css.card }}>
          <h2 style={{ margin:"0 0 6px", fontSize:24, fontWeight:800 }}>
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p style={{ color:MUTED, fontSize:14, marginBottom:24 }}>
            {mode === "signin" ? "Sign in to your FamousTechPlay account" : "Start distributing your music worldwide — free"}
          </p>

          {err && <div style={{ background:"rgba(255,23,68,0.1)", border:"1px solid rgba(255,23,68,0.3)", borderRadius:8, padding:"12px 16px", color:"#FF6B6B", fontSize:14, marginBottom:16 }}>{err}</div>}
          {msg && <div style={{ background:"rgba(0,230,118,0.1)", border:"1px solid rgba(0,230,118,0.3)", borderRadius:8, padding:"12px 16px", color:G, fontSize:14, marginBottom:16 }}>{msg}</div>}

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {mode === "signup" && (
              <div>
                <label style={css.label}>Full Name</label>
                <input style={css.input} placeholder="Your artist name" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
            )}
            <div>
              <label style={css.label}>Email</label>
              <input style={css.input} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div>
              <label style={css.label}>Password</label>
              <input style={css.input} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&(mode==="signin"?handleSignIn():handleSignUp())}/>
            </div>
            <button style={{ ...css.btnG, opacity: busy?0.7:1 }} disabled={busy}
              onClick={mode==="signin"?handleSignIn:handleSignUp}>
              {busy ? "Please wait..." : mode==="signin" ? "Sign In" : "Create Account"}
            </button>
          </div>

          <p style={{ textAlign:"center", marginTop:20, fontSize:14, color:MUTED }}>
            {mode==="signin" ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color:G, cursor:"pointer", fontWeight:600 }}
              onClick={()=>{setMode(mode==="signin"?"signup":"signin");setErr("");setMsg("");}}>
              {mode==="signin" ? "Sign Up Free" : "Sign In"}
            </span>
          </p>
        </div>
        <p style={{ textAlign:"center", color:MUTED, fontSize:12, marginTop:16 }}>
          Distribute to 100+ platforms · Keep 100% royalties · Free forever
        </p>
      </div>
    </div>
  );
};

// ── ARTIST DASHBOARD ──────────────────────────────────────────────────────────
const ArtistDash = ({ user, onLogout }) => {
  const [tab, setTab]         = useState("overview");
  const [releases, setReleases] = useState([]);
  const [payouts, setPayouts]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [mob, setMob]           = useState(window.innerWidth < 768);

  // Upload form
  const [showUpload, setShowUpload]   = useState(false);
  const [uTitle, setUTitle]           = useState("");
  const [uType, setUType]             = useState("Single");
  const [uGenre, setUGenre]           = useState("");
  const [uFile, setUFile]             = useState(null);
  const [uCover, setUCover]           = useState(null);
  const [uBusy, setUBusy]             = useState(false);
  const [uErr, setUErr]               = useState("");
  const [uMsg, setUMsg]               = useState("");

  // Payout form
  const [showPayout, setShowPayout]   = useState(false);
  const [pAmount, setPAmount]         = useState("");
  const [pMethod, setPMethod]         = useState("bank");
  const [pBank, setPBank]             = useState("");
  const [pAcct, setPAcct]             = useState("");
  const [pPhone, setPPhone]           = useState("");
  const [pBusy, setPBusy]             = useState(false);
  const [pMsg, setPMsg]               = useState("");

  // Promo form
  const [showPromo, setShowPromo]     = useState(false);
  const [promoMsg, setPromoMsg]       = useState("");
  const [promoBusy, setPromoBusy]     = useState(false);
  const [promoSent, setPromoSent]     = useState(false);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: r }, { data: p }] = await Promise.all([
      supabase.from("releases").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("payouts").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]);
    setReleases(r || []);
    setPayouts(p || []);
    setLoading(false);
  };

  const totalEarnings = releases.reduce((s, r) => s + (r.earnings || 0), 0);
  const totalStreams   = releases.reduce((s, r) => s + (r.streams  || 0), 0);
  const canUpload      = user.plan === "Pro" || releases.length < FREE_RELEASE_LIMIT;

  const handleUpload = async () => {
    setUErr(""); setUMsg("");
    if (!uTitle || !uGenre) { setUErr("Please fill in title and genre."); return; }
    if (!canUpload) { setUErr(`Free plan allows ${FREE_RELEASE_LIMIT} releases. Upgrade to Pro for unlimited.`); return; }
    setUBusy(true);
    let audio_url = null, cover_url = null;

    if (uFile) {
      try {
        const ext  = uFile.name.split(".").pop();
        const path = `${user.id}/${Date.now()}_audio.${ext}`;
        const { error: upErr } = await supabase.storage.from("music").upload(path, uFile);
        if (upErr) {
          // If storage fails, still allow metadata submission
          console.warn("Audio upload warning:", upErr.message);
        } else {
          const { data: urlData } = supabase.storage.from("music").getPublicUrl(path);
          audio_url = urlData.publicUrl;
        }
      } catch(e) { console.warn("Audio upload skipped:", e.message); }
    }

    if (uCover) {
      try {
        const ext  = uCover.name.split(".").pop();
        const path = `${user.id}/${Date.now()}_cover.${ext}`;
        const { error: cvErr } = await supabase.storage.from("covers").upload(path, uCover);
        if (!cvErr) {
          const { data: cvUrl } = supabase.storage.from("covers").getPublicUrl(path);
          cover_url = cvUrl.publicUrl;
        }
      } catch(e) { console.warn("Cover upload skipped:", e.message); }
    }

    const { error } = await supabase.from("releases").insert({
      user_id: user.id, title: uTitle, type: uType, genre: uGenre,
      status: "pending_review", earnings: 0, streams: 0,
      audio_url, cover_url, dsps: [],
      created_at: new Date().toISOString(),
    });

    if (error) { setUErr("Failed to submit: " + error.message); setUBusy(false); return; }
    setUMsg("✅ Release submitted for review!");
    setUTitle(""); setUGenre(""); setUFile(null); setUCover(null); setUType("Single");
    fetchData();
    setUBusy(false);
    setTimeout(() => { setShowUpload(false); setUMsg(""); }, 2000);
  };

  const handlePayout = async () => {
    setPMsg("");
    if (!pAmount || isNaN(pAmount) || Number(pAmount) < 5000) { setPMsg("❌ Minimum payout is ₦5,000"); return; }
    if (pMethod === "bank" && (!pBank || !pAcct)) { setPMsg("❌ Enter bank name and account number"); return; }
    if (pMethod === "mobile" && !pPhone) { setPMsg("❌ Enter your mobile money number"); return; }
    setPBusy(true);
    const { error } = await supabase.from("payouts").insert({
      user_id: user.id, amount: Number(pAmount),
      status: "pending", method: pMethod,
      bank_name: pBank, account_number: pAcct, phone: pPhone,
      created_at: new Date().toISOString(),
    });
    if (error) { setPMsg("❌ " + error.message); setPBusy(false); return; }
    setPMsg("✅ Payout request submitted!");
    setPAmount(""); setPBank(""); setPAcct(""); setPPhone("");
    fetchData();
    setPBusy(false);
    setTimeout(() => { setShowPayout(false); setPMsg(""); }, 2000);
  };

  const handlePromo = async () => {
    if (!promoMsg) return;
    setPromoBusy(true);
    await supabase.from("promo_requests").insert({
      user_id: user.id, artist_name: user.name,
      message: promoMsg, status: "pending",
      created_at: new Date().toISOString(),
    });
    setPromoSent(true);
    setPromoBusy(false);
  };

  const NavBtn = ({ id, icon, label }) => (
    <button onClick={() => setTab(id)} style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"11px 20px", width:"100%",
      background: tab===id ? `${G}12` : "transparent",
      borderLeft: tab===id ? `3px solid ${G}` : "3px solid transparent",
      color: tab===id ? WHITE : MUTED,
      border:"none", borderLeft: tab===id ? `3px solid ${G}` : "3px solid transparent",
      cursor:"pointer", fontSize:14, fontWeight: tab===id ? 600 : 400,
      textAlign:"left",
    }}>
      <span style={{ fontSize:18 }}>{icon}</span>{label}
    </button>
  );

  const StatCard = ({ label, value, sub }) => (
    <div style={{ ...css.card, flex:1, minWidth:140 }}>
      <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</div>
      <div style={{ fontSize:28, fontWeight:800, color:G }}>{value}</div>
      {sub && <div style={{ color:MUTED, fontSize:12, marginTop:4 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={css.page}>
      {/* TOPBAR */}
      <div style={css.topbar}>
        <Logo size={22}/>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ ...css.tag, background: user.plan==="Pro" ? `${OR}18` : `${G}12`,
            color: user.plan==="Pro" ? OR : G,
            border:`1px solid ${user.plan==="Pro" ? OR : G}30` }}>
            {user.plan}
          </div>
          <div style={{ width:36, height:36, borderRadius:"50%", background:`${G}20`,
            border:`1px solid ${G}40`, display:"flex", alignItems:"center",
            justifyContent:"center", fontWeight:700, fontSize:14, color:G }}>
            {user.av}
          </div>
          <button onClick={onLogout} style={{ ...css.btnGhost, padding:"8px 16px", fontSize:13 }}>Logout</button>
        </div>
      </div>

      {/* SIDEBAR — desktop */}
      {!mob && (
        <div style={css.sidebar}>
          <div style={{ padding:"0 16px 16px", color:MUTED, fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Menu</div>
          <NavBtn id="overview"  icon="🏠" label="Overview"/>
          <NavBtn id="releases"  icon="🎵" label="My Releases"/>
          <NavBtn id="earnings"  icon="₦"  label="Earnings"/>
          <NavBtn id="payouts"   icon="💳" label="Payouts"/>
          <NavBtn id="promo"     icon="📣" label="Promotion"/>
          <NavBtn id="profile"   icon="⚙️" label="Profile"/>
          {user.plan === "Free" && (
            <div style={{ margin:"auto 16px 16px", padding:16,
              background:`${OR}10`, border:`1px solid ${OR}25`, borderRadius:12 }}>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>Upgrade to Pro</div>
              <div style={{ color:MUTED, fontSize:12, marginBottom:12 }}>₦25,000/month · Unlimited releases · Priority distribution</div>
              <button style={{ ...css.btnG, background:OR, fontSize:13, padding:"10px 0" }}
                onClick={() => setTab("upgrade")}>Upgrade Now</button>
            </div>
          )}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={mob ? css.mainMob : css.main}>
        <div style={{ maxWidth:900 }}>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div>
              <h2 style={{ marginBottom:4 }}>Welcome back, {user.name.split(" ")[0]} 👋</h2>
              <p style={{ color:MUTED, marginBottom:24 }}>Here's how your music is performing.</p>
              {loading ? <div style={{ color:MUTED }}>Loading...</div> : (
                <>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
                    <StatCard label="Total Earnings"  value={fmt(totalEarnings)}       sub="All time"/>
                    <StatCard label="Total Streams"   value={fmtK(totalStreams)}        sub="Across all platforms"/>
                    <StatCard label="Releases"        value={releases.length}           sub={user.plan==="Free" ? `${FREE_RELEASE_LIMIT - releases.length} remaining on Free` : "Unlimited"}/>
                    <StatCard label="Plan"            value={user.plan}                 sub={user.plan==="Free" ? "Upgrade for unlimited" : "Pro member"}/>
                  </div>
                  <div style={{ ...css.card, marginBottom:24 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                      <h3 style={{ margin:0 }}>Recent Releases</h3>
                      <button style={{ ...css.btnG, width:"auto", padding:"9px 20px", fontSize:13 }}
                        onClick={() => setShowUpload(true)}>+ New Release</button>
                    </div>
                    {releases.length === 0
                      ? <div style={{ textAlign:"center", padding:"40px 0", color:MUTED }}>
                          <div style={{ fontSize:40, marginBottom:12 }}>🎵</div>
                          <div style={{ fontWeight:600, marginBottom:8 }}>No releases yet</div>
                          <div style={{ fontSize:14 }}>Upload your first track and start distributing worldwide</div>
                        </div>
                      : releases.slice(0,5).map(r => (
                          <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                            padding:"12px 0", borderBottom:`1px solid ${BORDER}` }}>
                            <div>
                              <div style={{ fontWeight:600 }}>{r.title}</div>
                              <div style={{ color:MUTED, fontSize:13 }}>{r.type} · {r.genre}</div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ ...css.tag, background:`${(STATUS_MAP[r.status]||{color:MUTED}).color}18`,
                                color:(STATUS_MAP[r.status]||{color:MUTED}).color,
                                border:`1px solid ${(STATUS_MAP[r.status]||{color:MUTED}).color}30`, marginBottom:4 }}>
                                {(STATUS_MAP[r.status]||{label:r.status}).label}
                              </div>
                              <div style={{ color:G, fontSize:13 }}>{fmt(r.earnings)}</div>
                            </div>
                          </div>
                        ))
                    }
                  </div>
                </>
              )}
            </div>
          )}

          {/* RELEASES */}
          {tab === "releases" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <h2 style={{ margin:0 }}>My Releases</h2>
                <button style={{ ...css.btnG, width:"auto", padding:"10px 22px" }}
                  onClick={() => setShowUpload(true)}>+ Upload Release</button>
              </div>
              {user.plan === "Free" && (
                <div style={{ ...css.card, background:`${OR}08`, border:`1px solid ${OR}25`, marginBottom:16 }}>
                  <span style={{ color:OR, fontWeight:600 }}>Free Plan: </span>
                  <span style={{ color:MUTED, fontSize:14 }}>{releases.length}/{FREE_RELEASE_LIMIT} releases used · </span>
                  <span style={{ color:OR, cursor:"pointer", fontWeight:600 }} onClick={()=>setTab("upgrade")}>Upgrade to Pro for unlimited →</span>
                </div>
              )}
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : releases.length === 0
                  ? <div style={{ ...css.card, textAlign:"center", padding:"60px 0" }}>
                      <div style={{ fontSize:48, marginBottom:16 }}>🎵</div>
                      <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>No releases yet</div>
                      <div style={{ color:MUTED, marginBottom:24 }}>Upload your first track and go live worldwide in 2–3 days</div>
                      <button style={{ ...css.btnG, width:"auto", padding:"12px 32px", margin:"0 auto", display:"block" }}
                        onClick={() => setShowUpload(true)}>Upload Now</button>
                    </div>
                  : releases.map(r => (
                      <div key={r.id} style={{ ...css.card, marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                          <div>
                            <div style={{ fontWeight:700, fontSize:17, marginBottom:4 }}>{r.title}</div>
                            <div style={{ color:MUTED, fontSize:14 }}>{r.type} · {r.genre} · {new Date(r.created_at).toLocaleDateString()}</div>
                            {r.dsps?.length > 0 && (
                              <div style={{ marginTop:8, display:"flex", gap:6, flexWrap:"wrap" }}>
                                {r.dsps.map(d => (
                                  <span key={d} style={{ ...css.tag, background:`${BL}12`, color:BL, border:`1px solid ${BL}25`, fontSize:11 }}>{d}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign:"right" }}>
                            <div style={{ ...css.tag, background:`${(STATUS_MAP[r.status]||{color:MUTED}).color}15`,
                              color:(STATUS_MAP[r.status]||{color:MUTED}).color,
                              border:`1px solid ${(STATUS_MAP[r.status]||{color:MUTED}).color}30`, marginBottom:8 }}>
                              {(STATUS_MAP[r.status]||{label:r.status}).label}
                            </div>
                            <div style={{ fontWeight:700, color:G }}>{fmt(r.earnings)}</div>
                            <div style={{ color:MUTED, fontSize:12 }}>{fmtK(r.streams)} streams</div>
                          </div>
                        </div>
                      </div>
                    ))
              }
            </div>
          )}

          {/* EARNINGS */}
          {tab === "earnings" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Earnings</h2>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
                <StatCard label="Total Earned"    value={fmt(totalEarnings)} sub="All time"/>
                <StatCard label="Total Streams"   value={fmtK(totalStreams)} sub="Across all platforms"/>
                <StatCard label="Paid Out"        value={fmt(payouts.filter(p=>p.status==="paid").reduce((s,p)=>s+p.amount,0))} sub="Successfully paid"/>
                <StatCard label="Pending Payout"  value={fmt(payouts.filter(p=>p.status==="pending").reduce((s,p)=>s+p.amount,0))} sub="Being processed"/>
              </div>
              <div style={css.card}>
                <h3 style={{ margin:"0 0 16px" }}>Earnings by Release</h3>
                {releases.length === 0
                  ? <div style={{ color:MUTED, textAlign:"center", padding:"32px 0" }}>No releases yet</div>
                  : releases.map(r => (
                      <div key={r.id} style={{ display:"flex", justifyContent:"space-between",
                        padding:"12px 0", borderBottom:`1px solid ${BORDER}` }}>
                        <div>
                          <div style={{ fontWeight:600 }}>{r.title}</div>
                          <div style={{ color:MUTED, fontSize:13 }}>{fmtK(r.streams)} streams</div>
                        </div>
                        <div style={{ fontWeight:700, color:G }}>{fmt(r.earnings)}</div>
                      </div>
                    ))
                }
              </div>
            </div>
          )}

          {/* PAYOUTS */}
          {tab === "payouts" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <h2 style={{ margin:0 }}>Payouts</h2>
                <button style={{ ...css.btnG, width:"auto", padding:"10px 22px" }}
                  onClick={() => setShowPayout(true)}>Request Payout</button>
              </div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:16 }}>
                <div style={{ ...css.card, flex:1, minWidth:180 }}>
                  <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Available Balance</div>
                  <div style={{ fontSize:28, fontWeight:800, color:G }}>{fmt(totalEarnings - payouts.filter(p=>p.status!=="rejected").reduce((s,p)=>s+p.amount,0))}</div>
                </div>
                <div style={{ ...css.card, flex:1, minWidth:180 }}>
                  <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Total Earned</div>
                  <div style={{ fontSize:28, fontWeight:800, color:WHITE }}>{fmt(totalEarnings)}</div>
                </div>
                <div style={{ ...css.card, flex:1, minWidth:180 }}>
                  <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Pending Payout</div>
                  <div style={{ fontSize:28, fontWeight:800, color:OR }}>{fmt(payouts.filter(p=>p.status==="pending").reduce((s,p)=>s+p.amount,0))}</div>
                </div>
                <div style={{ ...css.card, flex:1, minWidth:180 }}>
                  <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Total Paid Out</div>
                  <div style={{ fontSize:28, fontWeight:800, color:BL }}>{fmt(payouts.filter(p=>p.status==="paid").reduce((s,p)=>s+p.amount,0))}</div>
                </div>
              </div>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : payouts.length === 0
                  ? <div style={{ ...css.card, textAlign:"center", padding:"40px 0", color:MUTED }}>No payout requests yet</div>
                  : payouts.map(p => (
                      <div key={p.id} style={{ ...css.card, marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <div style={{ fontWeight:600 }}>{fmt(p.amount)}</div>
                          <div style={{ color:MUTED, fontSize:13 }}>{p.method === "bank" ? `Bank Transfer · ${p.bank_name} · Acct: ${p.account_number}` : `Mobile Money · ${p.phone}`} · {new Date(p.created_at).toLocaleDateString()}</div>
                        </div>
                        <div style={{ ...css.tag,
                          background: p.status==="paid" ? `${G}15` : `${OR}15`,
                          color: p.status==="paid" ? G : OR,
                          border:`1px solid ${p.status==="paid" ? G : OR}30` }}>
                          {p.status === "paid" ? "Paid" : "Pending"}
                        </div>
                      </div>
                    ))
              }
            </div>
          )}

          {/* PROMOTION */}
          {tab === "promo" && (
            <div>
              <h2 style={{ marginBottom:8 }}>Request Promotion</h2>
              <p style={{ color:MUTED, marginBottom:24 }}>
                {user.plan === "Pro"
                  ? "As a Pro member you get a free post on our socials for your first release each month."
                  : "Upgrade to Pro to get free promotional materials and social media posts."}
              </p>
              {user.plan !== "Pro"
                ? <div style={{ ...css.card, textAlign:"center", padding:"48px 24px" }}>
                    <div style={{ fontSize:40, marginBottom:16 }}>📣</div>
                    <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>Pro Feature</div>
                    <div style={{ color:MUTED, marginBottom:24 }}>Upgrade to Pro to request promotion, get an assigned agent and free promotional materials.</div>
                    <button style={{ ...css.btnG, width:"auto", padding:"12px 32px", margin:"0 auto", display:"block", background:OR }}
                      onClick={() => setTab("upgrade")}>Upgrade to Pro — ₦25,000/month</button>
                  </div>
                : promoSent
                  ? <div style={{ ...css.card, textAlign:"center", padding:"48px 24px" }}>
                      <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                      <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>Request Sent!</div>
                      <div style={{ color:MUTED }}>Our team will reach out within 24 hours with your promotional materials.</div>
                    </div>
                  : <div style={css.card}>
                      <label style={css.label}>Tell us about this release</label>
                      <textarea value={promoMsg} onChange={e=>setPromoMsg(e.target.value)}
                        placeholder="Which release? Any specific platforms or audience you want to target? Any other info..."
                        style={{ ...css.input, minHeight:120, resize:"vertical" }}/>
                      <button style={{ ...css.btnG, marginTop:16, opacity:promoBusy?0.7:1 }}
                        disabled={promoBusy} onClick={handlePromo}>
                        {promoBusy ? "Sending..." : "Submit Promotion Request"}
                      </button>
                    </div>
              }
            </div>
          )}

          {/* PROFILE */}
          {tab === "profile" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Profile</h2>
              <div style={css.card}>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
                  <div style={{ width:64, height:64, borderRadius:"50%",
                    background:`${G}20`, border:`2px solid ${G}40`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontWeight:800, fontSize:22, color:G }}>{user.av}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:20 }}>{user.name}</div>
                    <div style={{ color:MUTED }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {[["Name", user.name], ["Email", user.email], ["Plan", user.plan], ["Role", user.role]].map(([k,v])=>(
                    <div key={k}>
                      <label style={css.label}>{k}</label>
                      <div style={{ ...css.input, color:MUTED, cursor:"default" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* UPGRADE */}
          {tab === "upgrade" && (
            <div>
              <h2 style={{ marginBottom:8 }}>Upgrade to Pro</h2>
              <p style={{ color:MUTED, marginBottom:24 }}>Unlock the full FamousTechPlay experience</p>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {/* Free card */}
                <div style={{ ...css.card, flex:1, minWidth:260 }}>
                  <div style={{ fontWeight:800, fontSize:20, marginBottom:4 }}>Free</div>
                  <div style={{ fontSize:28, fontWeight:800, marginBottom:16 }}>₦0 <span style={{ fontSize:14, color:MUTED }}>/month</span></div>
                  {["Up to 3 releases","All 100+ platforms","Keep 100% royalties","Standard distribution speed"].map(f=>(
                    <div key={f} style={{ display:"flex", gap:8, marginBottom:10, color:MUTED, fontSize:14 }}>
                      <span style={{ color:G }}>✓</span>{f}
                    </div>
                  ))}
                  <div style={{ ...css.btnGhost, textAlign:"center", marginTop:16, opacity:0.5, cursor:"default" }}>Current Plan</div>
                </div>
                {/* Pro card */}
                <div style={{ ...css.card, flex:1, minWidth:260, border:`1px solid ${OR}50`, position:"relative" }}>
                  <div style={{ position:"absolute", top:-12, right:16, ...css.tag, background:OR, color:"#000", fontSize:11 }}>MOST POPULAR</div>
                  <div style={{ fontWeight:800, fontSize:20, marginBottom:4, color:OR }}>Pro</div>
                  <div style={{ fontSize:28, fontWeight:800, marginBottom:16 }}>₦25,000 <span style={{ fontSize:14, color:MUTED }}>/month</span></div>
                  {[
                    "Unlimited releases",
                    "Priority distribution (faster live)",
                    "Free promotion on our socials",
                    "Free promotional materials",
                    "Assigned promotion agent",
                    "First release of the month promoted free",
                    "Higher payout priority",
                  ].map(f=>(
                    <div key={f} style={{ display:"flex", gap:8, marginBottom:10, fontSize:14 }}>
                      <span style={{ color:OR }}>✓</span>{f}
                    </div>
                  ))}
                  <button style={{ ...css.btnG, background:OR, marginTop:16 }}
                    onClick={() => window.open("https://paystack.com/pay/famoustechplay-pro","_blank")}>
                    Upgrade Now — ₦25,000/month
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOB NAV */}
      {mob && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0,
          background:"rgba(4,6,12,0.97)", borderTop:`1px solid ${BORDER}`,
          display:"flex", zIndex:100 }}>
          {[["overview","🏠","Home"],["releases","🎵","Music"],["earnings","₦","Earn"],["payouts","💳","Pay"],["promo","📣","Promo"]].map(([id,ic,lb])=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              flex:1, padding:"10px 4px", display:"flex", flexDirection:"column",
              alignItems:"center", gap:3, cursor:"pointer", background:"none", border:"none",
              color: tab===id ? G : MUTED, fontSize:10, fontWeight:700 }}>
              <span style={{ fontSize:20 }}>{ic}</span>{lb}
            </button>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ ...css.card, width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ margin:0 }}>Upload New Release</h3>
              <button onClick={()=>setShowUpload(false)} style={{ background:"none", border:"none", color:MUTED, fontSize:22, cursor:"pointer" }}>✕</button>
            </div>
            {uErr && <div style={{ background:"rgba(255,23,68,0.1)", border:"1px solid rgba(255,23,68,0.3)", borderRadius:8, padding:"10px 14px", color:"#FF6B6B", fontSize:13, marginBottom:12 }}>{uErr}</div>}
            {uMsg && <div style={{ background:"rgba(0,230,118,0.1)", border:"1px solid rgba(0,230,118,0.3)", borderRadius:8, padding:"10px 14px", color:G, fontSize:13, marginBottom:12 }}>{uMsg}</div>}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={css.label}>Title *</label>
                <input style={css.input} placeholder="Song or album title" value={uTitle} onChange={e=>setUTitle(e.target.value)}/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={css.label}>Type</label>
                  <select style={{ ...css.input }} value={uType} onChange={e=>setUType(e.target.value)}>
                    {["Single","EP","Album","Mixtape"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={css.label}>Genre *</label>
                  <input style={css.input} placeholder="e.g. Afrobeats" value={uGenre} onChange={e=>setUGenre(e.target.value)}/>
                </div>
              </div>
              <div>
                <label style={css.label}>Audio File (MP3/WAV)</label>
                <input type="file" accept="audio/*" style={{ ...css.input, padding:"10px" }}
                  onChange={e=>setUFile(e.target.files[0])}/>
              </div>
              <div>
                <label style={css.label}>Cover Art (JPG/PNG)</label>
                <input type="file" accept="image/*" style={{ ...css.input, padding:"10px" }}
                  onChange={e=>setUCover(e.target.files[0])}/>
              </div>
              <button style={{ ...css.btnG, opacity:uBusy?0.7:1 }} disabled={uBusy} onClick={handleUpload}>
                {uBusy ? "Uploading..." : "Submit for Distribution"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYOUT MODAL */}
      {showPayout && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ ...css.card, width:"100%", maxWidth:440 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ margin:0 }}>Request Payout</h3>
              <button onClick={()=>setShowPayout(false)} style={{ background:"none", border:"none", color:MUTED, fontSize:22, cursor:"pointer" }}>✕</button>
            </div>
            {pMsg && <div style={{ padding:"10px 14px", borderRadius:8, fontSize:13, marginBottom:12,
              background: pMsg.startsWith("✅") ? "rgba(0,230,118,0.1)" : "rgba(255,23,68,0.1)",
              color: pMsg.startsWith("✅") ? G : "#FF6B6B",
              border: `1px solid ${pMsg.startsWith("✅") ? G : "#FF1744"}30` }}>{pMsg}</div>}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={css.label}>Amount (₦)</label>
                <input style={css.input} type="number" placeholder="Min ₦5,000" value={pAmount} onChange={e=>setPAmount(e.target.value)}/>
              </div>
              <div>
                <label style={css.label}>Payment Method</label>
                <select style={css.input} value={pMethod} onChange={e=>setPMethod(e.target.value)}>
                  <option value="bank">Bank Transfer</option>
                  <option value="mobile">Mobile Money (Opay/Palmpay)</option>
                </select>
              </div>
              {pMethod === "bank" ? <>
                <div>
                  <label style={css.label}>Bank Name</label>
                  <input style={css.input} placeholder="e.g. GTBank" value={pBank} onChange={e=>setPBank(e.target.value)}/>
                </div>
                <div>
                  <label style={css.label}>Account Number</label>
                  <input style={css.input} placeholder="10-digit account number" value={pAcct} onChange={e=>setPAcct(e.target.value)}/>
                </div>
              </> : (
                <div>
                  <label style={css.label}>Mobile Number</label>
                  <input style={css.input} placeholder="e.g. 08012345678" value={pPhone} onChange={e=>setPPhone(e.target.value)}/>
                </div>
              )}
              <button style={{ ...css.btnG, opacity:pBusy?0.7:1 }} disabled={pBusy} onClick={handlePayout}>
                {pBusy ? "Submitting..." : "Submit Payout Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
const AdminDash = ({ user, onLogout }) => {
  const [tab, setTab]       = useState("overview");
  const [users, setUsers]   = useState([]);
  const [releases, setReleases] = useState([]);
  const [payouts, setPayouts]   = useState([]);
  const [promos, setPromos]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [mob, setMob]           = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: u }, { data: r }, { data: p }, { data: pr }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("releases").select("*").order("created_at", { ascending: false }),
      supabase.from("payouts").select("*").order("created_at", { ascending: false }),
      supabase.from("promo_requests").select("*").order("created_at", { ascending: false }),
    ]);
    setUsers(u || []);
    setReleases(r || []);
    setPayouts(p || []);
    setPromos(pr || []);
    setLoading(false);
  };

  const updateRelease = async (id, status) => {
    await supabase.from("releases").update({ status }).eq("id", id);
    fetchAll();
  };

  const updatePayout = async (id, status) => {
    await supabase.from("payouts").update({ status }).eq("id", id);
    fetchAll();
  };

  const NavBtn = ({ id, icon, label, badge }) => (
    <button onClick={() => setTab(id)} style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"11px 20px", width:"100%",
      background: tab===id ? `${G}12` : "transparent",
      borderLeft: tab===id ? `3px solid ${G}` : "3px solid transparent",
      color: tab===id ? WHITE : MUTED,
      border:"none", cursor:"pointer", fontSize:14,
      fontWeight: tab===id ? 600 : 400, textAlign:"left",
    }}>
      <span style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:18 }}>{icon}</span>{label}
      </span>
      {badge > 0 && <span style={{ background:"#FF1744", color:WHITE, borderRadius:10,
        padding:"2px 8px", fontSize:11, fontWeight:700 }}>{badge}</span>}
    </button>
  );

  const StatCard = ({ label, value }) => (
    <div style={{ ...css.card, flex:1, minWidth:140 }}>
      <div style={{ color:MUTED, fontSize:12, fontWeight:600, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</div>
      <div style={{ fontSize:28, fontWeight:800, color:G }}>{value}</div>
    </div>
  );

  const pending = releases.filter(r => r.status === "pending_review");
  const pendingPayouts = payouts.filter(p => p.status === "pending");

  return (
    <div style={css.page}>
      <div style={css.topbar}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Logo size={22}/>
          <span style={{ ...css.tag, background:`${OR}18`, color:OR, border:`1px solid ${OR}30` }}>ADMIN</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ color:MUTED, fontSize:14 }}>{user.name}</span>
          <button onClick={onLogout} style={{ ...css.btnGhost, padding:"8px 16px", fontSize:13 }}>Logout</button>
        </div>
      </div>

      {!mob && (
        <div style={css.sidebar}>
          <div style={{ padding:"0 16px 16px", color:MUTED, fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Admin</div>
          <NavBtn id="overview"  icon="📊" label="Overview"/>
          <NavBtn id="pending"   icon="⏳" label="Pending Reviews" badge={pending.length}/>
          <NavBtn id="releases"  icon="🎵" label="All Releases"/>
          <NavBtn id="artists"   icon="👥" label="All Artists"/>
          <NavBtn id="payouts"   icon="💳" label="Payouts" badge={pendingPayouts.length}/>
          <NavBtn id="promos"    icon="📣" label="Promo Requests" badge={promos.filter(p=>p.status==="pending").length}/>
        </div>
      )}

      <div style={mob ? css.mainMob : css.main}>
        <div style={{ maxWidth:960 }}>

          {tab === "overview" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Admin Overview</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div> : (
                <>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
                    <StatCard label="Total Artists"        value={users.filter(u=>u.role==="artist").length}/>
                    <StatCard label="Total Releases"       value={releases.length}/>
                    <StatCard label="Pending Reviews"      value={pending.length}/>
                    <StatCard label="Pending Payouts"      value={pendingPayouts.length}/>
                    <StatCard label="Pro Members"          value={users.filter(u=>u.plan==="Pro").length}/>
                    <StatCard label="Total Payouts"        value={fmt(payouts.filter(p=>p.status==="paid").reduce((s,p)=>s+p.amount,0))}/>
                  </div>
                  {pending.length > 0 && (
                    <div style={{ ...css.card, border:`1px solid ${OR}30` }}>
                      <h3 style={{ margin:"0 0 16px", color:OR }}>⏳ Releases Awaiting Approval ({pending.length})</h3>
                      {pending.map(r => {
                        const artist = users.find(u => u.id === r.user_id);
                        return (
                          <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                            padding:"12px 0", borderBottom:`1px solid ${BORDER}`, flexWrap:"wrap", gap:8 }}>
                            <div>
                              <div style={{ fontWeight:600 }}>{r.title}</div>
                              <div style={{ color:MUTED, fontSize:13 }}>{r.type} · {r.genre} · by {artist?.name || "Unknown"}</div>
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={() => updateRelease(r.id, "approved")}
                                style={{ padding:"8px 18px", background:`${G}20`, color:G,
                                  border:`1px solid ${G}40`, borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 }}>
                                Approve
                              </button>
                              <button onClick={() => updateRelease(r.id, "rejected")}
                                style={{ padding:"8px 18px", background:"rgba(255,23,68,0.1)", color:"#FF6B6B",
                                  border:"1px solid rgba(255,23,68,0.3)", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 }}>
                                Reject
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {tab === "pending" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Pending Release Reviews</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : pending.length === 0
                  ? <div style={{ ...css.card, textAlign:"center", padding:"48px 0", color:MUTED }}>No pending releases 🎉</div>
                  : pending.map(r => {
                      const artist = users.find(u => u.id === r.user_id);
                      return (
                        <div key={r.id} style={{ ...css.card, marginBottom:12 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                            <div>
                              <div style={{ fontWeight:700, fontSize:17 }}>{r.title}</div>
                              <div style={{ color:MUTED, fontSize:14, marginBottom:8 }}>{r.type} · {r.genre}</div>
                              <div style={{ fontSize:13, color:MUTED }}>Artist: <span style={{ color:WHITE }}>{artist?.name || "Unknown"}</span> · Submitted: {new Date(r.created_at).toLocaleDateString()}</div>
                              {r.audio_url && <a href={r.audio_url} target="_blank" rel="noreferrer" style={{ color:BL, fontSize:13, display:"block", marginTop:6 }}>🎵 Listen to audio</a>}
                              {r.cover_url && <a href={r.cover_url} target="_blank" rel="noreferrer" style={{ color:BL, fontSize:13, display:"block", marginTop:4 }}>🖼️ View cover art</a>}
                            </div>
                            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                              <button onClick={() => updateRelease(r.id, "approved")}
                                style={{ padding:"10px 20px", background:`${G}20`, color:G,
                                  border:`1px solid ${G}40`, borderRadius:8, cursor:"pointer", fontWeight:700 }}>
                                ✓ Approve
                              </button>
                              <button onClick={() => updateRelease(r.id, "rejected")}
                                style={{ padding:"10px 20px", background:"rgba(255,23,68,0.1)", color:"#FF6B6B",
                                  border:"1px solid rgba(255,23,68,0.3)", borderRadius:8, cursor:"pointer", fontWeight:700 }}>
                                ✕ Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
              }
            </div>
          )}

          {tab === "releases" && (
            <div>
              <h2 style={{ marginBottom:24 }}>All Releases ({releases.length})</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : releases.map(r => {
                    const artist = users.find(u => u.id === r.user_id);
                    return (
                      <div key={r.id} style={{ ...css.card, marginBottom:10, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                        <div>
                          <div style={{ fontWeight:600 }}>{r.title}</div>
                          <div style={{ color:MUTED, fontSize:13 }}>{r.type} · {r.genre} · {artist?.name || "Unknown"} · {new Date(r.created_at).toLocaleDateString()}</div>
                        </div>
                        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                          <div style={{ ...css.tag,
                            background:`${(STATUS_MAP[r.status]||{color:MUTED}).color}15`,
                            color:(STATUS_MAP[r.status]||{color:MUTED}).color,
                            border:`1px solid ${(STATUS_MAP[r.status]||{color:MUTED}).color}30` }}>
                            {(STATUS_MAP[r.status]||{label:r.status}).label}
                          </div>
                          <span style={{ color:G, fontWeight:600 }}>{fmt(r.earnings)}</span>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          )}

          {tab === "artists" && (
            <div>
              <h2 style={{ marginBottom:24 }}>All Artists ({users.filter(u=>u.role==="artist").length})</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : users.filter(u=>u.role==="artist").map(u => {
                    const uRels = releases.filter(r => r.user_id === u.id);
                    const uEarn = uRels.reduce((s,r)=>s+(r.earnings||0),0);
                    return (
                      <div key={u.id} style={{ ...css.card, marginBottom:10, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ width:40, height:40, borderRadius:"50%", background:`${G}20`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontWeight:700, color:G }}>{u.av || initials(u.name)}</div>
                          <div>
                            <div style={{ fontWeight:600 }}>{u.name}</div>
                            <div style={{ color:MUTED, fontSize:13 }}>{u.email} · Joined {new Date(u.created_at||Date.now()).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                          <span style={{ ...css.tag, background:`${u.plan==="Pro"?OR:G}15`, color:u.plan==="Pro"?OR:G, border:`1px solid ${u.plan==="Pro"?OR:G}30` }}>{u.plan}</span>
                          <span style={{ color:MUTED, fontSize:13 }}>{uRels.length} releases</span>
                          <span style={{ color:G, fontWeight:600 }}>{fmt(uEarn)}</span>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          )}

          {tab === "payouts" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Payout Requests</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : payouts.length === 0
                  ? <div style={{ ...css.card, textAlign:"center", padding:"48px 0", color:MUTED }}>No payout requests yet</div>
                  : payouts.map(p => {
                      const artist = users.find(u => u.id === p.user_id);
                      return (
                        <div key={p.id} style={{ ...css.card, marginBottom:10 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                            <div>
                              <div style={{ fontWeight:700, fontSize:17, color:G }}>{fmt(p.amount)}</div>
                              <div style={{ color:MUTED, fontSize:13 }}>
                                {artist?.name || "Unknown"} · {p.method === "bank"
                                  ? `Bank: ${p.bank_name} · ${p.account_number}`
                                  : `Mobile: ${p.phone}`
                                } · {new Date(p.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            {p.status === "pending"
                              ? <div style={{ display:"flex", gap:8 }}>
                                  <button onClick={() => updatePayout(p.id, "paid")}
                                    style={{ padding:"9px 18px", background:`${G}20`, color:G,
                                      border:`1px solid ${G}40`, borderRadius:8, cursor:"pointer", fontWeight:600 }}>
                                    Mark Paid
                                  </button>
                                  <button onClick={() => updatePayout(p.id, "rejected")}
                                    style={{ padding:"9px 18px", background:"rgba(255,23,68,0.1)", color:"#FF6B6B",
                                      border:"1px solid rgba(255,23,68,0.3)", borderRadius:8, cursor:"pointer", fontWeight:600 }}>
                                    Reject
                                  </button>
                                </div>
                              : <div style={{ ...css.tag,
                                  background: p.status==="paid" ? `${G}15` : "rgba(255,23,68,0.1)",
                                  color: p.status==="paid" ? G : "#FF6B6B",
                                  border:`1px solid ${p.status==="paid" ? G : "#FF1744"}30` }}>
                                  {p.status === "paid" ? "✓ Paid" : "✕ Rejected"}
                                </div>
                            }
                          </div>
                        </div>
                      );
                    })
              }
            </div>
          )}

          {tab === "promos" && (
            <div>
              <h2 style={{ marginBottom:24 }}>Promotion Requests</h2>
              {loading ? <div style={{ color:MUTED }}>Loading...</div>
                : promos.length === 0
                  ? <div style={{ ...css.card, textAlign:"center", padding:"48px 0", color:MUTED }}>No promo requests yet</div>
                  : promos.map(p => {
                      return (
                        <div key={p.id} style={{ ...css.card, marginBottom:10 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                            <div>
                              <div style={{ fontWeight:600 }}>{p.artist_name}</div>
                              <div style={{ color:MUTED, fontSize:13 }}>{new Date(p.created_at).toLocaleDateString()}</div>
                            </div>
                            <div style={{ ...css.tag,
                              background: p.status==="done" ? `${G}15` : `${OR}15`,
                              color: p.status==="done" ? G : OR,
                              border:`1px solid ${p.status==="done" ? G : OR}30` }}>
                              {p.status === "done" ? "Completed" : "Pending"}
                            </div>
                          </div>
                          <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:8, padding:"12px 14px", fontSize:14, color:MUTED, lineHeight:1.6 }}>
                            {p.message}
                          </div>
                          {p.status === "pending" && (
                            <button onClick={async()=>{await supabase.from("promo_requests").update({status:"done"}).eq("id",p.id);fetchAll();}}
                              style={{ marginTop:10, padding:"8px 18px", background:`${G}18`, color:G,
                                border:`1px solid ${G}35`, borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 }}>
                              Mark as Done
                            </button>
                          )}
                        </div>
                      );
                    })
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        if (profile) {
          setUser({
            id:    session.user.id,
            email: session.user.email,
            name:  profile.name,
            role:  profile.role,
            plan:  profile.plan,
            av:    profile.av || initials(profile.name),
          });
        }
      }
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (checking) return (
    <div style={{ ...css.page, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center" }}>
        <Logo size={36}/>
        <div style={{ color:MUTED, marginTop:16 }}>Loading...</div>
      </div>
    </div>
  );

  if (!user)         return <AuthPage onLogin={setUser}/>;
  if (user.role === "admin") return <AdminDash user={user} onLogout={handleLogout}/>;
  return <ArtistDash user={user} onLogout={handleLogout}/>;
}
