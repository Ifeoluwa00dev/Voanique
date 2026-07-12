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

  // Hero refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Door One — The Belief
  const doorOneRef = useRef<HTMLDivElement>(null);
  const doorOneEyebrowRef = useRef<HTMLDivElement>(null);
  const doorOneTitleRef = useRef<HTMLHeadingElement>(null);
  const doorOneLineRef = useRef<HTMLParagraphElement>(null);

  // Door Two — Why Lips Matter
  const doorTwoRef = useRef<HTMLDivElement>(null);
  const doorTwoEyebrowRef = useRef<HTMLDivElement>(null);
  const doorTwoTitleRef = useRef<HTMLHeadingElement>(null);
  const doorTwoLineRef = useRef<HTMLParagraphElement>(null);

  // Door Three — The First Creation
  const doorThreeRef = useRef<HTMLDivElement>(null);
  const doorThreeEyebrowRef = useRef<HTMLDivElement>(null);
  const doorThreeTitleRef = useRef<HTMLHeadingElement>(null);
  const doorThreeLineRef = useRef<HTMLParagraphElement>(null);
  const doorThreeImageRef = useRef<HTMLDivElement>(null);

  // Door Four — Why You Can Trust the House
  const doorFourRef = useRef<HTMLDivElement>(null);
  const doorFourTextRef = useRef<HTMLHeadingElement>(null);

  // Door Five — The Invitation
  const doorFiveRef = useRef<HTMLDivElement>(null);
  const doorFiveEyebrowRef = useRef<HTMLDivElement>(null);
  const doorFiveTitleRef = useRef<HTMLHeadingElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero intro ---
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" }
        );
      }
      if (hairlineRef.current) {
        gsap.fromTo(
          hairlineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.8, ease: "power2.inOut", delay: 0.8 }
        );
      }
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 1.3 }
        );
      }
      if (scrollCueRef.current) {
        gsap.fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out", delay: 2.2 }
        );
      }
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // --- Reusable reveal: fade + slight rise, nothing else ---
      const revealDoor = (sectionEl: HTMLElement | null, parts: (HTMLElement | null)[]) => {
        const els = parts.filter(Boolean) as HTMLElement[];
        if (!sectionEl || els.length === 0) return;
        gsap.fromTo(
          els,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      };

      revealDoor(doorOneRef.current, [doorOneEyebrowRef.current, doorOneTitleRef.current, doorOneLineRef.current]);
      revealDoor(doorTwoRef.current, [doorTwoEyebrowRef.current, doorTwoTitleRef.current, doorTwoLineRef.current]);
      revealDoor(doorThreeRef.current, [doorThreeEyebrowRef.current, doorThreeTitleRef.current, doorThreeLineRef.current]);

      if (doorThreeImageRef.current) {
        gsap.fromTo(
          doorThreeImageRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: doorThreeRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Door Four — the single deliberate dark moment, simple fade
      if (doorFourRef.current && doorFourTextRef.current) {
        gsap.fromTo(
          doorFourTextRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: doorFourRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      revealDoor(doorFiveRef.current, [doorFiveEyebrowRef.current, doorFiveTitleRef.current]);
    }, heroRef);

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
  const headingText = isDark ? "text-platine" : "text-onyx";
  const border = "border-argent border-opacity-20";
  const heroOverlay = isDark
    ? "linear-gradient(rgba(23,24,26,0.75), rgba(23,24,26,0.85))"
    : "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.75))";
  const inputBg = isDark
    ? "bg-white/5 focus:bg-white/10 placeholder:text-argent/60"
    : "bg-white/60 focus:bg-white placeholder:text-graphite/60";
  const ctaButton = isDark
    ? "bg-platine text-onyx hover:bg-opacity-90 active:bg-white"
    : "bg-onyx text-platine hover:bg-opacity-90 active:bg-black";

  return (
    <div className={`min-h-screen ${bg} ${text} selection:bg-onyx selection:text-platine relative flex flex-col font-sans transition-colors duration-700`}>
      {/* MARQUEE BAR — scrolls right to left, sits above the navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 overflow-hidden h-8 flex items-center ${
          isDark ? "bg-platine text-onyx" : "bg-onyx text-platine"
        } transition-colors duration-700`}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, groupIdx) => (
            <div key={groupIdx} className="flex shrink-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-12 text-[10px] uppercase tracking-[0.35em] font-medium"
                >
                  Where Beauty Reigns
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>

      {/* STICKY NAVBAR — glassmorphism background + light/dark toggle pill */}
      <nav
        className={`fixed top-8 left-0 w-full z-40 flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-md ${
          isDark ? "bg-onyx/40 border-b border-white/10" : "bg-white/40 border-b border-black/5"
        } transition-colors duration-700`}
      >
        <div className="flex items-center gap-2">
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
          className={`flex items-center gap-2 px-3 py-2 rounded-full border ${border} ${
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

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-screen min-h-[650px] w-full flex flex-col items-center justify-between overflow-hidden px-6 pt-24 md:pt-28 pb-12 md:pb-20"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            ref={heroBgRef}
            className="absolute -top-[10%] left-0 w-full h-[120%] opacity-90"
            style={{
              backgroundImage: `${heroOverlay}, url('https://images.unsplash.com/photo-1631237534324-4b961b17b424?fm=jpg&q=80&w=2400&auto=format&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: isDark ? "#17181A" : "#FAFAF9",
            }}
          />
        </div>

        <div className="z-10 flex flex-col items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-graphite font-medium">
            THE ENTRANCE
          </div>
        </div>

        <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center justify-center my-auto">
          <div ref={wordmarkRef} className="overflow-hidden select-none mb-4 md:mb-6 opacity-0">
            <Image
              src="/logo-text.png"
              alt="VOANIQUÉ"
              width={640}
              height={160}
              priority
              className={`w-auto h-16 sm:h-20 md:h-28 lg:h-32 mx-auto ${isDark ? "invert" : ""}`}
            />
          </div>

          <div
            ref={hairlineRef}
            className="w-full max-w-sm sm:max-w-md h-[1px] bg-graphite bg-opacity-30 mb-8 md:mb-10 scale-x-0 origin-center"
          />

          <p
            ref={taglineRef}
            className={`text-xl sm:text-2xl md:text-3xl font-serif italic ${headingText} tracking-wide opacity-0 max-w-2xl`}
          >
            A new luxury beauty house is preparing to open its doors.
          </p>
        </div>

        <div
          ref={scrollCueRef}
          className="z-10 text-[10px] uppercase tracking-[0.3em] text-graphite opacity-0 flex flex-col items-center gap-2"
        >
          <span>Enter</span>
          <span className="block w-[1px] h-8 bg-graphite bg-opacity-40" />
        </div>
      </section>

      {/* DOOR ONE — The Belief */}
      <section
        id="door-one"
        ref={doorOneRef}
        className="w-full max-w-3xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center gap-6"
      >
        <div ref={doorOneEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
          · The Belief
        </div>
        <h2 ref={doorOneTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif ${headingText} leading-snug`}>
          We believe beauty is intentional.
          <br />
          Considered. Never rushed.
        </h2>
        <p ref={doorOneLineRef} className="text-sm sm:text-base text-graphite max-w-md leading-relaxed">
          This is where the House begins — not with a product, but with a
          belief it intends to keep.
        </p>
      </section>

      {/* DOOR TWO — Why Lips Matter */}
      <section
        id="door-two"
        ref={doorTwoRef}
        className={`w-full max-w-3xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center gap-6 border-t ${border}`}
      >
        <div ref={doorTwoEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
          · Why Lips Matter
        </div>
        <h2 ref={doorTwoTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif italic ${headingText} leading-snug`}>
          Lips are where confidence begins.
        </h2>
        <p ref={doorTwoLineRef} className="text-sm sm:text-base text-graphite max-w-md leading-relaxed">
          Where a feeling becomes visible. It's why the House chose to begin
          exactly here.
        </p>
      </section>

      {/* DOOR THREE — The First Creation */}
      <section
        id="door-three"
        ref={doorThreeRef}
        className={`w-full max-w-5xl mx-auto px-6 py-32 md:py-44 border-t ${border}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left flex flex-col gap-5">
            <div ref={doorThreeEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
              · The First Creation
            </div>
            <h2 ref={doorThreeTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif ${headingText} leading-snug`}>
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
            className="flex-1 w-full aspect-[4/5] rounded-sm bg-gradient-to-br from-argent/40 via-platine to-graphite/20 border border-argent border-opacity-30"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* DOOR FOUR — Why You Can Trust the House (the single dark moment, always) */}
      <section id="door-four" ref={doorFourRef} className="w-full bg-onyx text-platine overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-6 py-36 md:py-48 text-center flex flex-col items-center justify-center gap-6">
          <div className="text-[11px] uppercase tracking-[0.3em] text-argent font-medium">
            · Why You Can Trust the House
          </div>
          <h2 ref={doorFourTextRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-3xl opacity-0">
            Real photography. Honest ingredients. Nothing hidden.
            <br />
            <span className="font-bold">This is how the House will always work.</span>
          </h2>
        </div>
      </section>

      {/* DOOR FIVE — The Invitation */}
      <section
        id="door-five"
        ref={doorFiveRef}
        className="w-full max-w-2xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center gap-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div ref={doorFiveEyebrowRef} className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
            · The Invitation
          </div>
          <h2 ref={doorFiveTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif italic ${headingText}`}>
            Step inside.
          </h2>
        </div>

        <div className="w-full max-w-md mx-auto">
          {isSubmitted ? (
            <div ref={successSectionRef} className="text-center opacity-0 flex flex-col items-center justify-center py-4">
              <div className={`w-10 h-10 rounded-full border ${isDark ? "border-platine" : "border-onyx"} flex items-center justify-center mb-4`}>
                <Check className={`w-4 h-4 ${headingText} stroke-[1.5]`} />
              </div>

              <h3 className={`text-2xl sm:text-3xl font-serif ${headingText} mb-3 tracking-tight`}>
                {alreadyRegistered ? "You're already inside." : "Welcome to the House."}
              </h3>

              <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
                {alreadyRegistered
                  ? "Your invitation was already received. We'll let you know the moment the doors open."
                  : "Your invitation has been received. We'll let you know the moment the doors open."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
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
                      className={`flex-grow px-5 py-4 border border-argent text-xs sm:text-sm tracking-wider uppercase ${inputBg} focus:outline-none focus:ring-2 focus:ring-onyx transition-all duration-300 font-mono ${headingText} h-14`}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${ctaButton} px-6 py-4 text-xs font-semibold tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-opacity-50 disabled:cursor-not-allowed h-14 shrink-0`}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "REQUEST AN INVITATION"}
                    </button>
                  </div>

                  {error && <p className="text-xs text-red-600 font-medium tracking-wide mt-1">{error}</p>}
                </div>

                <p className="text-[10px] text-graphite leading-relaxed text-center">
                  Be among the first to enter, when the House opens its
                  doors. By joining, you consent to receive early
                  invitations, opening announcements, and future VOANIQUÉ
                  updates. We value your privacy; unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
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