"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2, Sun, Moon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Horizontal scroll container refs
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  const addPanelRef = (el: HTMLDivElement | null) => {
    if (el && !panelRefs.current.includes(el)) panelRefs.current.push(el);
  };

  // Hero-specific refs (panel 1)
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Door text refs (panels 2–6) for in-panel reveal
  const doorOneEyebrowRef = useRef<HTMLDivElement>(null);
  const doorOneTitleRef = useRef<HTMLHeadingElement>(null);
  const doorOneLineRef = useRef<HTMLParagraphElement>(null);

  const doorTwoEyebrowRef = useRef<HTMLDivElement>(null);
  const doorTwoTitleRef = useRef<HTMLHeadingElement>(null);
  const doorTwoLineRef = useRef<HTMLParagraphElement>(null);

  const doorThreeEyebrowRef = useRef<HTMLDivElement>(null);
  const doorThreeTitleRef = useRef<HTMLHeadingElement>(null);
  const doorThreeLineRef = useRef<HTMLParagraphElement>(null);
  const doorThreeImageRef = useRef<HTMLDivElement>(null);

  const doorFourTextRef = useRef<HTMLHeadingElement>(null);

  const doorFiveEyebrowRef = useRef<HTMLDivElement>(null);
  const doorFiveTitleRef = useRef<HTMLHeadingElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelRefs.current;
      const track = trackRef.current;
      const pinWrap = pinWrapRef.current;

      if (track && pinWrap && panels.length > 0) {
        const totalPanels = panels.length;

        // Horizontal scroll-jack: vertical scroll drives xPercent on the track.
        // The user still scrolls normally (wheel or touch) — this works on
        // mobile without special gesture handling, since it's driven by
        // document scroll position, not raw input events.
        const horizontalTween = gsap.to(track, {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          scrollTrigger: {
            trigger: pinWrap,
            pin: true,
            scrub: 1,
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          },
        });

        // Per-panel reveal, tied to the same horizontal scroll progress
        const revealInPanel = (parts: (HTMLElement | null)[], panelEl: HTMLElement) => {
          const els = parts.filter(Boolean) as HTMLElement[];
          if (els.length === 0) return;
          gsap.fromTo(
            els,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panelEl,
                containerAnimation: horizontalTween,
                start: "left 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        };

        // Hero (panel index 0)
        const wordmarkChars = wordmarkRef.current?.querySelectorAll(".wordmark-char");
        if (wordmarkChars && wordmarkChars.length > 0) {
          gsap.fromTo(
            wordmarkChars,
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.06 }
          );
        }
        if (hairlineRef.current) {
          gsap.fromTo(
            hairlineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.6, ease: "power2.inOut", delay: 0.6 }
          );
        }
        if (taglineRef.current) {
          gsap.fromTo(
            taglineRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: 1.1 }
          );
        }
        if (scrollCueRef.current) {
          gsap.fromTo(
            scrollCueRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.1, ease: "power2.out", delay: 1.9 }
          );
        }

        // Doors (panels 1–5)
        if (panels[1]) revealInPanel([doorOneEyebrowRef.current, doorOneTitleRef.current, doorOneLineRef.current], panels[1]);
        if (panels[2]) revealInPanel([doorTwoEyebrowRef.current, doorTwoTitleRef.current, doorTwoLineRef.current], panels[2]);
        if (panels[3]) {
          revealInPanel([doorThreeEyebrowRef.current, doorThreeTitleRef.current, doorThreeLineRef.current], panels[3]);
          if (doorThreeImageRef.current) {
            gsap.fromTo(
              doorThreeImageRef.current,
              { opacity: 0, scale: 0.96 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panels[3],
                  containerAnimation: horizontalTween,
                  start: "left 65%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
        if (panels[4] && doorFourTextRef.current) {
          gsap.fromTo(
            doorFourTextRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panels[4],
                containerAnimation: horizontalTween,
                start: "left 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (panels[5]) revealInPanel([doorFiveEyebrowRef.current, doorFiveTitleRef.current], panels[5]);
      }
    }, pinWrapRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlreadyRegistered(!!data.alreadyRegistered);
        setIsSubmitted(true);

        setTimeout(() => {
          if (successSectionRef.current) {
            gsap.fromTo(
              successSectionRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }
            );
          }
        }, 50);
        // Refresh ScrollTrigger since panel content height may have changed
        setTimeout(() => ScrollTrigger.refresh(), 150);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const bg = isDark ? "bg-onyx" : "bg-platine";
  const text = isDark ? "text-platine" : "text-onyx";
  const border = "border-argent border-opacity-20";

  return (
    <div className={`min-h-screen ${bg} ${text} selection:bg-onyx selection:text-platine relative font-sans transition-colors duration-700`}>
      {/* STICKY NAVBAR — logo + light/dark toggle pill */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="VOANIQUÉ"
            width={70}
            height={28}
            className={isDark ? "invert opacity-90" : "opacity-90"}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsDark((d) => !d)}
          aria-label="Toggle light or dark mode"
          className={`pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full border ${border} ${
            isDark ? "bg-white/5" : "bg-black/5"
          } backdrop-blur-sm transition-colors duration-500`}
        >
          <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? "opacity-30" : "opacity-100"}`} />
          <span
            className={`relative inline-flex w-8 h-4 rounded-full transition-colors duration-500 ${
              isDark ? "bg-platine/30" : "bg-onyx/20"
            }`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-current transition-transform duration-500 ${
                isDark ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
          <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-30"}`} />
        </button>
      </nav>

      {/* HORIZONTAL SCROLL-JACKED "HALLWAY" — Hero + Five Doors */}
      <div ref={pinWrapRef} className="relative w-full h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-full w-max will-change-transform">
          {/* PANEL 0 — HERO */}
          <div
            ref={addPanelRef}
            className="relative w-screen h-full flex-shrink-0 flex flex-col items-center justify-center px-6 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.75)), url('https://images.unsplash.com/photo-1631237534324-4b961b17b424?fm=jpg&q=80&w=2400&auto=format&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            <div className="z-10 text-[10px] uppercase tracking-[0.25em] text-graphite font-medium absolute top-24">
              THE ENTRANCE
            </div>

            <div className="z-10 w-full max-w-2xl text-center flex flex-col items-center">
              <div ref={wordmarkRef} className="overflow-hidden select-none mb-4 md:mb-6">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-medium tracking-[0.05em] text-onyx inline-flex">
                  {"VOANIQUÉ".split("").map((char, index) => (
                    <span key={index} className="wordmark-char inline-block">
                      {char}
                    </span>
                  ))}
                </h1>
              </div>

              <div
                ref={hairlineRef}
                className="w-full max-w-sm h-[1px] bg-graphite bg-opacity-30 mb-8 scale-x-0 origin-center"
              />

              <p
                ref={taglineRef}
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-onyx tracking-wide opacity-0 max-w-xl"
              >
                A new luxury beauty house is preparing to open its doors.
              </p>
            </div>

            <div
              ref={scrollCueRef}
              className="z-10 text-[10px] uppercase tracking-[0.3em] text-graphite opacity-0 absolute bottom-14 flex items-center gap-2"
            >
              <span>Scroll to enter</span>
              <span className="block w-8 h-[1px] bg-graphite bg-opacity-40" />
            </div>
          </div>

          {/* PANEL 1 — DOOR ONE: The Belief */}
          <div
            ref={addPanelRef}
            className={`w-screen h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 border-l ${border}`}
          >
            <div ref={doorOneEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium mb-6">
              Door One · The Belief
            </div>
            <h2 ref={doorOneTitleRef} className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug max-w-xl mb-6">
              We believe beauty is intentional.
              <br />
              Considered. Never rushed.
            </h2>
            <p ref={doorOneLineRef} className="text-sm sm:text-base text-graphite max-w-md leading-relaxed">
              This is where the House begins — not with a product, but with a
              belief it intends to keep.
            </p>
          </div>

          {/* PANEL 2 — DOOR TWO: Why Lips Matter */}
          <div
            ref={addPanelRef}
            className={`w-screen h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 border-l ${border}`}
          >
            <div ref={doorTwoEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium mb-6">
              Door Two · Why Lips Matter
            </div>
            <h2 ref={doorTwoTitleRef} className="text-3xl sm:text-4xl md:text-5xl font-serif italic leading-snug max-w-xl mb-6">
              Lips are where confidence begins.
            </h2>
            <p ref={doorTwoLineRef} className="text-sm sm:text-base text-graphite max-w-md leading-relaxed">
              Where a feeling becomes visible. It's why the House chose to
              begin exactly here.
            </p>
          </div>

          {/* PANEL 3 — DOOR THREE: The First Creation */}
          <div
            ref={addPanelRef}
            className={`w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-16 border-l ${border}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl">
              <div className="flex-1 text-center md:text-left flex flex-col gap-4">
                <div ref={doorThreeEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
                  Door Three · The First Creation
                </div>
                <h2 ref={doorThreeTitleRef} className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug">
                  Our First Creation:
                  <br />a luxury lip treatment.
                </h2>
                <p ref={doorThreeLineRef} className="text-sm sm:text-base text-graphite max-w-sm mx-auto md:mx-0 leading-relaxed">
                  Fuller-looking lips in 10 minutes. The first door the House
                  opens — not the last.
                </p>
              </div>
              <div
                ref={doorThreeImageRef}
                className="flex-1 w-full max-w-[280px] md:max-w-none aspect-[4/5] rounded-sm bg-gradient-to-br from-argent/40 via-platine to-graphite/20 border border-argent border-opacity-30"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* PANEL 4 — DOOR FOUR: Why You Can Trust the House (dark, always) */}
          <div
            ref={addPanelRef}
            className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 bg-onyx text-platine"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-argent font-medium mb-6">
              Door Four · Why You Can Trust the House
            </div>
            <h2 ref={doorFourTextRef} className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-2xl opacity-0">
              Real photography. Honest ingredients. Nothing hidden.
              <br />
              <span className="font-bold">This is how the House will always work.</span>
            </h2>
          </div>

          {/* PANEL 5 — DOOR FIVE: The Invitation */}
          <div
            ref={addPanelRef}
            className={`w-screen h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 border-l ${border}`}
          >
            <div className="flex flex-col items-center gap-3 mb-8">
              <div ref={doorFiveEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
                Door Five · The Invitation
              </div>
              <h2 ref={doorFiveTitleRef} className="text-3xl sm:text-4xl md:text-5xl font-serif italic">
                Step inside.
              </h2>
            </div>

            <div className="w-full max-w-md mx-auto">
              {isSubmitted ? (
                <div ref={successSectionRef} className="text-center opacity-0 flex flex-col items-center justify-center py-4">
                  <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center mb-4">
                    <Check className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif mb-3 tracking-tight">
                    {alreadyRegistered ? "You're already inside." : "Welcome to the House."}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
                    {alreadyRegistered
                      ? "Your invitation was already received. We'll let you know the moment the doors open."
                      : "Your invitation has been received. We'll let you know the moment the doors open."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email-input" className="sr-only">
                      Email address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="ENTER EMAIL ADDRESS"
                        disabled={loading}
                        required
                        className="flex-grow px-5 py-4 border border-argent text-xs sm:text-sm tracking-wider uppercase bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-onyx transition-all duration-300 font-mono text-onyx placeholder:text-graphite/60 h-14"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-onyx text-platine px-6 py-4 text-xs font-semibold tracking-[0.2em] transition-all duration-300 hover:bg-opacity-90 active:bg-black flex items-center justify-center gap-2 disabled:bg-opacity-50 disabled:cursor-not-allowed h-14 shrink-0"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "REQUEST AN INVITATION"}
                      </button>
                    </div>
                    {error && <p className="text-xs text-red-600 font-medium tracking-wide mt-1">{error}</p>}
                  </div>
                  <p className="text-[10px] text-graphite leading-relaxed text-center max-w-sm mx-auto">
                    Be among the first to enter, when the House opens its
                    doors. By joining, you consent to receive early
                    invitations, opening announcements, and future VOANIQUÉ
                    updates. We value your privacy; unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER — reached after the horizontal hallway ends */}
      <footer className={`w-full ${bg} border-t ${border} px-6 py-12 md:py-16 transition-colors duration-700`}>
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="mailto:hello@voanique.com"
            className="text-xs tracking-[0.2em] font-medium hover:text-graphite transition-colors duration-300"
          >
            hello@voanique.com
          </a>
          <div className="text-[10px] tracking-widest text-graphite font-light uppercase">
            © 2026 VOANIQUÉ. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}