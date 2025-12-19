import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Landing = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="sky">
        <div className="sun" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
      </div>

      <main className="content">
        <h1 className="title">Hi There!</h1>
        <p className="subtitle">
          Welcome to my "Under Development" Portfolio...
        </p>

        <div className="countdown">
          <div className="time-block">
            <span className="time-value">{timeLeft.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.hours}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.minutes}</span>
            <span className="time-label">Minutes</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeLeft.seconds}</span>
            <span className="time-label">Seconds</span>
          </div>
        </div>

        <div className="cta-row">
          <Link to="/about" className="about-link">
            <button className="about-btn">About Me</button>
          </Link>

          <Link to="/academics" className="about-link">
            <button className="about-btn secondary">Academics</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

const About = () => (
  <div className="about-page">
    <div className="about-shapes">
      <span className="shape shape-1" />
      <span className="shape shape-2" />
      <span className="shape shape-3" />
      <span className="shape shape-4" />
    </div>

    <Link to="/" className="back-link">
      ← Back to Sky
    </Link>

    <div className="about-card">
      <h2 className="about-title">Hi, I'm Rishi.V</h2>
      <p className="about-tagline">
        A self‑called “wanna be whatever you can call me”, but right now, a
        learning developer.
      </p>

      <p className="about-body">
        I enjoy building things that look cool and feel calm, while taking on
        challenges that push me out of my comfort zone.
      </p>

      <p className="about-body">
        Right now, I’m exploring new projects, sharpening my fundamentals, and
        saying yes to opportunities that help me grow.
      </p>

      <div className="about-pills">
        <span>Making</span>
        <span>The</span>
        <span>Debut</span>
        <span>in...</span>
      </div>
    </div>
  </div>
);

const Academics = () => (
  <div className="academics-page web-layout">
    <Link to="/" className="back-link back-light">
      ← Back to Sky
    </Link>

    <div className="academics-header">
      <h2 className="academics-title">Academic Moments</h2>
      <p className="academics-subtitle">
        A small board of experiences that shaped how I learn and build.
      </p>
    </div>

    <div className="academics-web">
      {/* center card */}
      <article className="academic-card center-card">
        <span className="chip">What&apos;s Next</span>
        <h3>What Comes Next?</h3>
        <p>
          More workshops, more hackathons, more late nights. This card sits in
          the middle of everything new that gets added to my journey.
        </p>
        <Link to="/whats-next" className="about-link">
          <button className="about-btn secondary whats-next-btn">
            Reveal?
          </button>
        </Link>
      </article>


      {/* top-left corner */}
      <article className="academic-card corner card-tl">
        <span className="chip">Workshop</span>
        <h3>Robotics at PSG Tech</h3>
        <p>
          Jumped into an advanced robotics workshop at PSG Tech. Most of it was
          above my level, but it pushed how I think about hardware and motion.
        </p>
      </article>

      {/* top-right corner */}
      <article className="academic-card corner card-tr">
        <span className="chip">Entrepreneurship</span>
        <h3>E‑Cell & IIT Bombay E‑Summit</h3>
        <p>
          Joined NGP’s E‑Cell &quot;The Founders Forge&quot; / Infanji and
          attended IIT Bombay’s E‑Summit, getting exposed to founders and
          startup culture.
        </p>
      </article>

      {/* bottom-left corner */}
      <article className="academic-card corner card-bl">
        <span className="chip">Paper Presentation</span>
        <h3>Karpagam Institute of Technology</h3>
        <p>
          Presented my first project idea at Karpagam – a Finch‑style system,
          but unpaid and focused on doing the job more efficiently.
        </p>
      </article>

      {/* bottom-right corner */}
      <article className="academic-card corner card-br">
        <span className="chip">Hackathon</span>
        <h3>BIT – ALMS Project</h3>
        <p>
          Built ALMS (Academic Leave Management System) at the BIT Hackathon,
          turning an academic problem into a working product idea.
        </p>
      </article>
    </div>
  </div>
);

const WhatsNext = () => (
  <div className="whats-page">
    <div className="whats-sky">
      <div className="whats-sun" />
      <div className="whats-cloud whats-cloud-1" />
      <div className="whats-cloud whats-cloud-2" />
    </div>

    <Link to="/academics" className="back-link back-light">
      ← Back to Moments
    </Link>

    <div className="whats-card">
      <h2 className="whats-title">Told ya.</h2>
      <p className="whats-tagline">It will be revealed soon.</p>
      <p className="whats-body">
        Ruko Jaara Sabar Karo!!!!!
      </p>
    </div>
  </div>
);



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/whats-next" element={<WhatsNext />} />
    </Routes>
  );
};


export default App;
