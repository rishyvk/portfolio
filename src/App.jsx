import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";

/* --- System Components --- */

const SystemStatus = ({ entropy }) => {
  const signals = ["SYSTEM.IDLE", "SIGNAL STABLE", "AWAITING INTENT", "CORE.ACTIVE", "NODES READY"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % signals.length);
    }, 5000 + entropy * 2000);
    return () => clearInterval(interval);
  }, [entropy]);

  return (
    <div className="system-status-signal" style={{ opacity: 0.15 - (entropy * 0.05) }}>
      {signals[index]}
    </div>
  );
};

const EnergyDrift = ({ entropy }) => {
  const particles = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 2,
    duration: 15 + Math.random() * 10,
    pathIndex: i % 3
  })), []);

  return (
    <div className="energy-drift-layer">
      <svg className="energy-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {particles.map((p) => (
          <circle key={p.id} r="0.2" className="energy-dot">
            <animate
              attributeName="cx"
              values="-10;110"
              dur={`${p.duration + entropy * 5}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
            <animate
              attributeName="cy"
              values={`${20 + p.id * 8};${25 + p.id * 8};${20 + p.id * 8}`}
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.5;0"
              dur={`${p.duration + entropy * 5}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

/* --- System Hooks --- */

const useSystemEngine = (magneticStrength = 4) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * magneticStrength;
      const y = (e.clientY / window.innerHeight - 0.5) * magneticStrength;
      setMousePos({ x, y });

      // Update global vignette follow
      document.body.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.body.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    };

    const interval = setInterval(() => {
      setSessionDuration(prev => Math.min(prev + 1, 100)); // Capped at 100 for entropy calculation
    }, 60000); // Track minutes

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [magneticStrength]);

  const entropy = sessionDuration / 100; // 0 to 1 scale
  return { mousePos, entropy };
};

/* --- Mode Components --- */

const Landing = () => {
  const [hoveredID, setHoveredID] = useState(null);
  const { mousePos, entropy } = useSystemEngine(6);

  return (
    <div className="system-mode sky-mode" style={{ filter: `brightness(${1 - entropy * 0.2})` }}>
      <EnergyDrift entropy={entropy} />
      <SystemStatus entropy={entropy} />

      <div className="scene-background">
        <div className="abstract-sun" style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }} />
        <div className="abstract-clouds">
          {[1, 2, 3].map(i => (
            <div key={i} className={`abstract-cloud cloud-${i}`} style={{ transform: `translate(${mousePos.x * (i * 0.5)}px, ${mousePos.y * (i * 0.5)}px)` }} />
          ))}
        </div>
      </div>

      <main className="content-core">
        <div
          className="system-card intro-card"
          onMouseEnter={() => setHoveredID('intro')}
          onMouseLeave={() => setHoveredID(null)}
          style={{ transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` }}
        >
          <span className="mode-label">System.Idle</span>
          <h1 className="title">Hi There!</h1>
          <p className="subtitle">Welcome to my "Under Development" Portfolio...</p>

          <div className="system-cta-row">
            <Link to="/about" className="system-btn-link"><button className="system-btn">About Me</button></Link>
            <Link to="/academics" className="system-btn-link"><button className="system-btn secondary">Academics</button></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

const About = () => {
  const [hoveredID, setHoveredID] = useState(null);
  const { mousePos, entropy } = useSystemEngine(4);

  return (
    <div className="system-mode about-mode" style={{ filter: `brightness(${0.9 - entropy * 0.2})` }}>
      <EnergyDrift entropy={entropy} />
      <SystemStatus entropy={entropy} />
      <Link to="/" className="back-link">// system.exit()</Link>

      <div className="scene-background">
        <div className="grounded-glow" style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }} />
      </div>

      <main className="content-core">
        <article
          className={`system-card about-card ${hoveredID ? 'hovered' : 'idle'}`}
          onMouseEnter={() => setHoveredID('about')}
          onMouseLeave={() => setHoveredID(null)}
          style={{ transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` }}
        >
          <span className="mode-label">System.Reflection</span>
          <h2 className="title">Hi, I'm Rishi.V</h2>
          <p className="tagline">A learning developer building things that look cool and feel calm.</p>
          <p className="body-text">I enjoy taking on challenges that push me out of my comfort zone and sharpening my fundamentals.</p>

          <div className="pills-row">
            {['Making', 'The', 'Debut', 'in...'].map(p => (
              <span key={p} className="system-pill">{p}</span>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

const Academics = () => {
  const [hoveredID, setHoveredID] = useState(null);
  const [focusedID, setFocusedID] = useState(null);
  const { mousePos, entropy } = useSystemEngine(8);

  const cards = [
    { id: "tl", type: "Hardware", title: "Robotics at PSG Tech", desc: "Challenged my technical limits through hardware and motion engineering." },
    { id: "tr", type: "Venture", title: "IIT Bombay E‑Summit", desc: "Exposed to high-dimensional founder thinking and startup system architecture." },
    { id: "ml", type: "Network", title: "PeerZone Node", desc: "Architecting a decentralized educational node focused on peer-to-peer exchange." },
    { id: "mr", type: "Intelligence", title: "ManuScript Engine", desc: "Developing a generative architecture for academic synthesis." },
    { id: "bl", type: "Signal", title: "Karpagam Synthesis", desc: "First project deployment: an efficiency system for optimized throughput." },
    { id: "br", type: "Product", title: "ALMS System", desc: "Reverse-engineered academic friction into a streamlined LMS." },
  ];

  const getCardState = (id) => {
    if (focusedID === id) return "focused";
    if (focusedID && focusedID !== id) return "dormant";
    if (hoveredID === id) return "hover";
    if (hoveredID && hoveredID !== id) return "dormant";
    return "idle";
  };

  return (
    <div className={`system-mode engine-mode ${focusedID ? "focus-active" : ""}`} style={{ filter: `brightness(${1 - entropy * 0.1})` }}>
      <EnergyDrift entropy={entropy} />
      <SystemStatus entropy={entropy} />
      <Link to="/" className="back-link">// system.exit()</Link>

      <div className="mode-header">
        <h2 className="title">Interactive System</h2>
        <p className="subtitle">Experience nodes react to intent. Signal energy flows from core.</p>
      </div>

      <div
        className="engine-scene"
        style={{ transform: `perspective(2000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) ${focusedID ? 'translateZ(-100px)' : ''}` }}
      >
        <svg className="connector-svg" viewBox="0 0 1100 520">
          {[
            { id: "tl", x: 160, y: 80 }, { id: "tr", x: 940, y: 80 },
            { id: "ml", x: 160, y: 260 }, { id: "mr", x: 940, y: 260 },
            { id: "bl", x: 160, y: 440 }, { id: "br", x: 940, y: 440 }
          ].map((pos) => {
            const cx = 550;
            const cy = 260;
            const pathD = `M ${cx} ${cy} C ${cx + (pos.x - cx) * 0.45} ${cy} ${cx + (pos.x - cx) * 0.55} ${pos.y} ${pos.x} ${pos.y}`;
            const isActive = hoveredID === pos.id || focusedID === pos.id;
            return (
              <g key={pos.id} className={isActive ? "active" : "idle-node"}>
                <path d={pathD} className="connector-path" />
                <circle r="1.5" className="signal-dot">
                  <animateMotion dur={isActive ? `${0.8 + entropy * 0.5}s` : `${3 + entropy * 2}s`} repeatCount="indefinite" path={pathD} />
                </circle>
              </g>
            );
          })}
        </svg>

        <article className={`system-card core-card ${hoveredID || focusedID ? "active" : ""}`}>
          <span className="mode-label">System.Brain</span>
          <h3>Origin of Intent</h3>
          <p>The system origin. Redirect energy flow by focusing on a node.</p>
          {focusedID && <button onClick={() => setFocusedID(null)} className="reset-btn">system.reset()</button>}
        </article>

        {cards.map((card) => (
          <article
            key={card.id}
            className={`system-card node-card card-${card.id} ${getCardState(card.id)}`}
            onMouseEnter={() => setHoveredID(card.id)}
            onMouseLeave={() => setHoveredID(null)}
            onClick={() => setFocusedID(focusedID === card.id ? null : card.id)}
          >
            <span className="mode-label">{card.type}</span>
            <h3 className="node-title">{card.title}</h3>
            <p className="node-desc">{card.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="global-system-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
      </Routes>
    </div>
  );
};

export default App;
