"use client";
import { Great_Vibes } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock3, MapPin, Heart, Music2, Send, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});
const WEDDING_DATE = new Date("2026-10-18T19:00:00+02:00").getTime();

function Countdown() {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setLeft(WEDDING_DATE - Date.now());

    const timer = setInterval(() => {
      setLeft(WEDDING_DATE - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const parts = useMemo(() => {
    const total = Math.max(0, left);

    return {
      days: Math.floor(total / 86400000),
      hours: Math.floor((total / 3600000) % 24),
      minutes: Math.floor((total / 60000) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  }, [left]);

 return (
  <div className="minimal-countdown">
    <div className="minimal-days">
      <strong>{String(parts.days).padStart(2, "0")}</strong>
      <span>DAYS</span>
    </div>

    <div className="minimal-divider">
      <span>◆</span>
      <div />
      <span>✦</span>
      <div />
      <span>◆</span>
    </div>

    <div className="minimal-time">
      <div>
        <strong>{String(parts.hours).padStart(2, "0")}</strong>
        <span>HOURS</span>
      </div>

      <b>:</b>

      <div>
        <strong>{String(parts.minutes).padStart(2, "0")}</strong>
        <span>MINUTES</span>
      </div>

      <b>:</b>

      <div>
        <strong>{String(parts.seconds).padStart(2, "0")}</strong>
        <span>SECONDS</span>
      </div>
    </div>
  </div>
);
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
 {/* const [currentPage, setCurrentPage] = useState(1);*/}
  useEffect(() => {
  if (envelopeOpened) {
    setOpened(true);
  }
}, [envelopeOpened]);
  {/*useEffect(() => {
  if (!opened) return;

  const timer = setTimeout(() => {
    setCurrentPage(2);
  }, 4000);الي بعده

  return () => clearTimeout(timer);
}, [opened]);*/}
const [autoScroll, setAutoScroll] = useState(false);
useEffect(() => {
if (!opened || !autoScroll) return;
  let autoScrolling = true;

  const interval = setInterval(() => {
    if (!autoScrolling) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (window.scrollY >= maxScroll) {
      clearInterval(interval);
      return;
    }

    window.scrollBy({
      top: 4,
      behavior: "auto",
    });
  }, 50);

  const stopAutoScroll = () => {
    autoScrolling = false;
    clearInterval(interval);
  };
window.addEventListener("touchstart", stopAutoScroll, { passive: true });
window.addEventListener("touchmove", stopAutoScroll, { passive: true });
  window.addEventListener("wheel", stopAutoScroll, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (
      ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
        e.key
      )
    ) {
      stopAutoScroll();
    }
  });

  return () => {
    clearInterval(interval);
    window.removeEventListener("wheel", stopAutoScroll);
    window.removeEventListener("touchstart", stopAutoScroll);
window.removeEventListener("touchmove", stopAutoScroll);
  };
}, [opened, autoScroll]);
  const [music, setMusic] = useState(false);
  const [submitted, setSubmitted] = useState(false);
const [roseIndex, setRoseIndex] = useState(46);

  return (
    <main>
     <AnimatePresence> 
        {!opened && (
          <motion.div
            className="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 1.3 }}
          >
<div className="video-cover">
  <video
  className="envelope-video"
  src="/video/envelope-opening.mp4"
  poster="/image/envelope-poster.jpg"
  muted
  playsInline
  preload="auto"
  onClick={(e) => {
    e.currentTarget.play();
  }}
  onEnded={() => {
    setEnvelopeOpened(true);

    const audio = document.getElementById(
      "wedding-audio"
    ) as HTMLAudioElement | null;

    audio?.play().catch(() => {});
    setMusic(true);
  }}
/>
</div>.
<div className="cover-inner">
  <div
    className="envelope"
    onClick={() => setEnvelopeOpened(true)}
    style={{
        display: "none",
    transform: envelopeOpened ? "translateY(220px)" : "translateY(0)",
    transition: "transform 1.3s ease-in-out",
  }}
    role="button"
    tabIndex={0}
    aria-label="Open invitation"
  >
   <motion.div
  className="envelope-flap"
   animate={{
    rotateX: envelopeOpened ? -180 : 0,
    opacity: envelopeOpened ? 0 : 1,
  }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
/>
{/*<motion.div
  className="invitation-card"
  initial={{ y: 40, opacity: 0, scale: 0.8 }}
  animate={
    envelopeOpened
      ? {
          y: [0, -170, -170],
          scale: [0.65, 0.65, 5],
          opacity: [0, 1,1],
        }
      : {
          y: 0,
          opacity: 0,
          scale: 0.65,
        }
  }
 transition={{
    duration: 1.2,
    delay: 0.2,
    times: [0, 0.5, 1],
  }}>
  <span>Mohamed &amp; Nada</span>
  <small>Our Wedding Invitation</small>
</motion.div>*/}
<motion.div
  className="envelope-fold-lines"
  animate={
    envelopeOpened
      ? { opacity: 0 }
      : { opacity: 1 }
  }
  transition={{
    duration: 0.7,
    delay: 0.4,
    ease: "easeInOut",
  }}
>
  <span className="fold-line fold-line-left" />
  <span className="fold-line fold-line-right" />
  <span className="fold-line fold-line-top-left" />
  <span className="fold-line fold-line-top-right" />
</motion.div>
<motion.div
  className="envelope-seal"
  animate={{ opacity: envelopeOpened ? 0 : 1 }}
  transition={{ duration: 0.25 }}
>
  ♥
</motion.div>  </div>
  {/*<motion.div
  className="opening-invitation"
  initial={{ opacity: 0, scale: 0.8, y: 80 }}
  animate={
    envelopeOpened
      ? {
          opacity: 1,
          scale: 1,
          y: -120,
        }
      : {
          opacity: 0,
          scale: 0.8,
          y: 80,
        }
  }
  transition={{ duration: 1.2, ease: "easeInOut" }}
>
  <p>TOGETHER WITH THEIR FAMILIES</p>
  <h1>
    Mohamed <span>&</span> Nada
  </h1>
  <p>are getting married</p>
  <strong>Sunday, October 18, 2026</strong>
</motion.div>*/}

  {/*<p className="cover-title">
  <span>The Wedding of</span>
  Mohamed Atef &amp; Nada El-Morsy
</p>  <p className="cover-instruction">
    Tap to open the invitation
  </p>*/}
</div>
          </motion.div>
        )}
      </AnimatePresence>

<audio
  id="wedding-audio"
  preload="auto"
  src="/audio/wedding-song.mp3"
/>
<button
  className="music-button"
  onClick={() => {
    const audio = document.getElementById(
      "wedding-audio"
    ) as HTMLAudioElement;

    if (music) {
      audio.pause();
      setMusic(false);
    } else {
      audio
  .play()
  .then(() => {
    setMusic(true);
  })
  .catch((error) => {
    console.error("Audio error:", error);
    alert("الصوت مش قادر يشتغل. افتح Console وشوف الخطأ.");
  });
    }
  }}
  aria-label="Toggle music"
>
  <Music2 size={18} />
  {music ? "Music on" : "Music"}
</button>

   <section className="hero section couple-video-section">
  <video
    className="couple-walking-video"
    src="/video/couple-walking.mp4"
    autoPlay
    muted
    playsInline
    loop
  />
  <div className="couple-video-overlay">
    <button
  type="button"
  className="scroll-trigger"
  onClick={() => setAutoScroll(true)}
  aria-label="Start scrolling"
>
  <ChevronDown size={18} />
  <span>SCROLL</span>
</button>
  <div className="couple-video-text">
  <div className="top-text">
    TOGETHER WITH THEIR FAMILIES
  </div>

<div className={`names ${greatVibes.className}`}>
  Mohamed 
  <div className="ampersand">&amp;</div>
  Nada 
</div>

  <div className="invite-text">
    INVITE YOU TO CELEBRATE THEIR WEDDING
  </div>

  <div className="divider">◆ ✦ ✦ ✦ ◆</div>

  <div className="date-text">
    18 · OCTOBER · 2026
  </div>
</div>
</div>
</section>
<section className="section wedding-info-slide">

  <motion.div
    className="wedding-intro"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    
  </motion.div>

  <div className="scene-divider">
    <span>◆</span>
    <strong>✦ ✦ ✦</strong>
    <span>◆</span>
  </div>

  <motion.div
    className="countdown-content"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <p className="countdown-title">THE COUNTDOWN BEGINS</p>
    <Countdown />
  </motion.div>

  <div className="scene-divider">
    <span>◆</span>
    <strong>✦ ✦ ✦</strong>
    <span>◆</span>
  </div>

  <motion.div
    className="save-date-content"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <span className="save-date-label">SAVE THE DATE</span>

    <h2>18 · 10 · 2026</h2>

    <img
      src="/image/save-the-date-calendar.png"
      alt="October 18, 2026"
      className="save-date-calendar"
    />

    <span className="save-date-names">
      MOHAMED &amp; NADA
    </span>

  </motion.div>
</section>

      <section className="section venue-page">
  <motion.div
    className="venue-content"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >

    {/* SCHEDULE */}
    <motion.div
      className="schedule-content"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        WEDDING DAY SCHEDULE
      </motion.p>

      <div className="schedule-timeline">

  {[
  ["6:00 PM", "Welcome"],
  ["6:30 PM", "Reception"],
  ["7:00 PM", "Groom & Bride entrance"],
  ["9:00 PM", "Break"],
  ["10:00 PM", "Second entrance"],
  ["12:00 AM", "Farewell"],
].map(([time, event], index) => (
  <motion.div
    className="schedule-timeline-item"
    key={time}
onMouseEnter={(e) => {
  const item = e.currentTarget;
  setRoseIndex(item.offsetTop + item.offsetHeight / 2);
}}    initial={{ opacity: 0, x: index % 2 === 0 ? -35 : 35 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{
      duration: 0.6,
      delay: index * 0.08,
    }}
  >
    <div className="schedule-time">{time}</div>

    <div className="schedule-dot">
      <span />
    </div>

    <div className="schedule-event">
      {event}
    </div>
  </motion.div>
))}


  
<motion.div
  className="moving-rose"
  animate={{
  top: roseIndex,
}}
  transition={{
    duration: 1.2,
    ease: [0.65, 0, 0.25, 1],
  }}
>
  <img
    src="/image/rose.png"
    alt="Burgundy rose"
  />
</motion.div>
</div>
            
    {/* DIVIDER */}
    <div className="scene-divider venue-divider">
      <span>◆</span>
      <strong>✦ ✦ ✦</strong>
      <span>◆</span>
    </div>
    </motion.div>

    {/* VENUE TITLE */}
    <p className="eyebrow">WEDDING RECEPTION VENUE</p>

    <h2>SKY RESORT, CAIRO.</h2>

    {/* IMAGE — هنغير الماب لصورة بعدين */}
   <div className="venue-image">
  <img
    src="/image/456.jpg"
    alt="Sky Resort Cairo"
  />
</div>

    {/* MAP BUTTON */}
    <div className="venue-actions">
      <a
        className="venue-button"
        href="https://maps.app.goo.gl/QiPJCyS9MbxRrUGa7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapPin size={17} />
        Open in Maps
      </a>
    </div>

  </motion.div>
</section>

      <section className="section rsvp-page">
  <motion.div
    className="rsvp-content"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
   
    <p className="eyebrow">CONFIRM ATTENDANCE</p>

    <form
  className="rsvp-form"
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const attendance = (form.elements.namedItem("attendance") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const { error } = await supabase.from("rsvps").insert({
      name,
      attendance,
      message,
    });

    if (error) {
  alert(error.message);
  return;
}

    alert("تم تأكيد حضورك ❤️");
    form.reset();
  }}
>
  
<input
  type="text"
  name="name"
  required
  placeholder="Your name*"
/>
<select name="attendance" defaultValue="yes">        <option value="yes">Yes, I'll be there ❤️</option>
        <option value="no">Sorry, I can't make it</option>
      </select>


<textarea
  name="message"
  placeholder="A message for the couple..."
/>
      <button type="submit">
        CONFIRM ATTENDANCE
      </button>
    </form>
<div
  style={{
    display: "block",
    width: "100%",
    textAlign: "center",
    color: "#C9A96E",
    fontSize: "24px",
    lineHeight: "1",
    margin: "18px 0",
  }}
>
  ◆
</div>
      <img
    src="/image/789.png"
    alt="Wedding envelope"
    className="rsvp-envelope"
  />
  </motion.div>
</section>

      <footer>
        <Heart size={20} fill="currentColor"/>
        <p>Mohamed & Nada · 2026</p>      </footer>
    </main>
  );
}