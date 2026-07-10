"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2, Sparkles } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const taglineSubRef = useRef<HTMLParagraphElement>(null);

  const qaSectionRef = useRef<HTMLDivElement>(null);
  const qaTitleRef = useRef<HTMLDivElement>(null);
  const qaItemRefs = useRef<HTMLDivElement[]>([]);

  const brandStatementRef = useRef<HTMLDivElement>(null);

  const proofSectionRef = useRef<HTMLDivElement>(null);
  const proofTextRef = useRef<HTMLHeadingElement>(null);

  const tagsSectionRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<HTMLDivElement[]>([]);

  const askSectionRef = useRef<HTMLDivElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);

  const addToQaRefs = (el: HTMLDivElement | null) => {
    if (el && !qaItemRefs.current.includes(el)) {
      qaItemRefs.current.push(el);
    }
  };

  const addToTagRefs = (el: HTMLDivElement | null) => {
    if (el && !tagRefs.current.includes(el)) {
      tagRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordmarkChars =
        wordmarkRef.current?.querySelectorAll(".wordmark-char");
      if (wordmarkChars && wordmarkChars.length > 0) {
        gsap.fromTo(
          wordmarkChars,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.08,
          }
        );
      }

      if (hairlineRef.current) {
        gsap.fromTo(
          hairlineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
            delay: 0.8,
          }
        );
      }

      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 1.3,
          }
        );
      }

      if (taglineSubRef.current) {
        gsap.fromTo(
          taglineSubRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            delay: 1.9,
          }
        );
      }

      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (qaSectionRef.current) {
        if (qaTitleRef.current) {
          gsap.fromTo(
            qaTitleRef.current,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: qaSectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (qaItemRefs.current.length > 0) {
          gsap.fromTo(
            qaItemRefs.current,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: qaSectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      if (brandStatementRef.current) {
        gsap.fromTo(
          brandStatementRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: brandStatementRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (proofSectionRef.current) {
        gsap.fromTo(
          proofSectionRef.current,
          { backgroundColor: "rgba(23, 24, 26, 0)", opacity: 0.8 },
          {
            backgroundColor: "rgba(23, 24, 26, 1)",
            opacity: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: proofSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        if (proofTextRef.current) {
          gsap.fromTo(
            proofTextRef.current,
            { opacity: 0, y: 30, letterSpacing: "-0.02em" },
            {
              opacity: 1,
              y: 0,
              letterSpacing: "0em",
              duration: 1.4,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: proofSectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      if (tagsSectionRef.current && tagRefs.current.length > 0) {
        gsap.fromTo(
          tagRefs.current,
          { opacity: 0, y: 15, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tagsSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (askSectionRef.current) {
        gsap.fromTo(
          askSectionRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            delay: 2.4,
          }
        );
      }
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
        headers: {
          "Content-Type": "application/json",
        },
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

  const questions = [
    { q: "WHO ARE WE?", a: "VOANIQUÉ." },
    {
      q: "WHAT DO WE DO?",
      a: "A premium lip plumper. Fuller-looking lips in 10 minutes.",
    },
    {
      q: "WHY IS IT DIFFERENT?",
      a: "Real formulation. Real ingredients. No injections.",
    },
    {
      q: "CAN I TRUST THE BRAND?",
      a: "Real photography. Honest ingredients. Nothing hidden.",
    },
    { q: "WHAT SHOULD I DO NOW?", a: "Join Early Access." },
  ];

  return (
    <div className="min-h-screen bg-platine text-onyx selection:bg-onyx selection:text-platine relative flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-screen min-h-[650px] w-full flex flex-col items-center justify-between overflow-hidden px-6 pt-16 pb-12 md:pb-20"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            ref={heroBgRef}
            className="absolute -top-[10%] left-0 w-full h-[120%] opacity-90 transition-opacity duration-1000"
            style={{
              backgroundImage:
  "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1631237534324-4b961b17b424?fm=jpg&q=80&w=2400&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#FAFAF9",
            }}
          />
        </div>

        <div className="z-10 flex flex-col items-center gap-3">
          <Image
            src="/logo.svg"
            alt="VOANIQUÉ"
            width={90}
            height={36}
            className="opacity-90"
            priority
          />
          <div className="text-[10px] uppercase tracking-[0.25em] text-graphite font-medium">
            PRE-LAUNCH WAITLIST
          </div>
        </div>

        <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center justify-center my-auto">
          <div
            ref={wordmarkRef}
            className="overflow-hidden select-none mb-4 md:mb-6"
            id="wordmark-container"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-medium tracking-[0.05em] text-onyx inline-flex">
              {"VOANIQUÉ".split("").map((char, index) => (
                <span
                  key={index}
                  className="wordmark-char inline-block"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div
            ref={hairlineRef}
            className="w-full max-w-sm sm:max-w-md h-[1px] bg-graphite bg-opacity-30 mb-8 md:mb-10 scale-x-0 origin-center"
          />

          <p
            ref={taglineRef}
            className="text-xl sm:text-2xl md:text-3xl font-serif italic text-onyx tracking-wide opacity-0 mb-4"
          >
            A new lip ritual is coming.
          </p>

          <p
            ref={taglineSubRef}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-graphite font-medium opacity-0 mb-16 md:mb-20"
          >
            Ten minutes. No injections.
          </p>

          {/* EMAIL FORM — moved into hero, directly below the tagline */}
          <div className="w-full max-w-md mx-auto">
            {isSubmitted ? (
              <div
                ref={successSectionRef}
                className="text-center opacity-0 flex flex-col items-center justify-center py-4"
                id="success-message"
              >
                <div className="w-10 h-10 rounded-full border border-onyx flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-onyx stroke-[1.5]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-onyx mb-3 tracking-tight">
                  {alreadyRegistered
                    ? "Rejoining the Ritual."
                    : "Welcome to the Ritual."}
                </h3>

                <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
                  {alreadyRegistered
                    ? "You are already registered on the VOANIQUÉ Early Access list. Your invitation is secured, and we will let you know the moment it arrives."
                    : "You're officially on the VOANIQUÉ Early Access list. We'll let you know the moment your invitation arrives."}
                </p>
              </div>
            ) : (
              <div ref={askSectionRef} className="flex flex-col gap-4 opacity-0">
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
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "REQUEST EARLY ACCESS"
                        )}
                      </button>
                    </div>

                    {error && (
                      <p className="text-xs text-red-600 font-medium tracking-wide mt-1">
                        {error}
                      </p>
                    )}
                  </div>

                  <p className="text-[10px] text-graphite leading-relaxed text-center">
                    By joining, you consent to receive early access
                    invitations, launch announcements, and future VOANIQUÉ
                    updates. We value your privacy; unsubscribe at any time.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        
      </section>

      {/* 2. THE FIVE QUESTIONS */}
<section
  id="questions"
  ref={qaSectionRef}
  className="w-full max-w-4xl mx-auto px-6 py-28 md:py-40 flex flex-col gap-16"
>
  <div
    ref={qaTitleRef}
    className="text-xs font-light tracking-[0.4em] text-graphite uppercase text-center"
  >
    What You Should Know
  </div>

  <div className="flex flex-col">
    {questions.map((item, index) => (
      <div
        key={index}
        ref={addToQaRefs}
        className="group grid grid-cols-[auto_1fr] md:grid-cols-[100px_1fr] gap-x-6 md:gap-x-12 items-start py-10 md:py-12 border-t border-argent border-opacity-20 last:border-b transition-opacity duration-500"
      >
        <span className="text-xs font-light tracking-[0.15em] text-argent pt-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex flex-col gap-2 md:gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-graphite font-extralight">
            {item.q}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-onyx font-semibold leading-snug group-hover:text-graphite transition-colors duration-500">
            {item.a}
          </h3>
        </div>
      </div>
    ))}
  </div>
</section>

    {/* 3. BRAND STATEMENT */}
{/* <section
  id="statement"
  className="w-full bg-platine border-t border-argent border-opacity-20"
>
  <div
    ref={brandStatementRef}
    className="w-full max-w-3xl mx-auto px-6 py-36 md:py-52 text-center"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug text-onyx">
      <span className="font-bold tracking-wide">VOANIQUÉ.</span>{" "}
      A new name in luxury lip care, made for right here.
    </h2>
  </div>
</section> */}

      {/* 4. PROOF MOMENT */}
<section
  id="proof"
  ref={proofSectionRef}
  className="w-full bg-onyx text-platine overflow-hidden"
>
  <div className="w-full max-w-4xl mx-auto px-6 py-36 md:py-48 text-center flex flex-col items-center justify-center">
    <div className="mb-8">
      <Image
        src="/logo-text.png"
        alt="VOANIQUÉ"
        width={160}
        height={64}
        className="opacity-70 mx-auto brightness-0 invert"
      />
    </div>
    <h2
      ref={proofTextRef}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight max-w-3xl opacity-0"
    >
      Formulated for real results.{" "}
      <span className="font-bold">Not just a promise.</span>
    </h2>
  </div>
</section>

      {/* 5. DIFFERENTIATOR TAGS */}
      {/* <section
        id="differentiators"
        ref={tagsSectionRef}
        className="w-full bg-platine py-20 border-b border-argent border-opacity-25"
      >
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              "Thoughtful Formulation",
              "Considered Ingredients",
              "Elevated Ritual",
            ].map((tag, idx) => (
              <div
                key={idx}
                ref={addToTagRefs}
                className="px-6 py-3 rounded-full border border-argent text-onyx text-sm sm:text-base tracking-wide font-medium bg-white/40 backdrop-blur-sm shadow-xs transition-colors duration-300 hover:border-onyx hover:bg-white"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 6. FOOTER */}
      <footer className="w-full bg-platine border-t border-argent border-opacity-20 px-6 py-12 md:py-16">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="mailto:hello@voanique.com"
            className="text-xs tracking-[0.2em] font-medium text-onyx hover:text-graphite transition-colors duration-300"
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