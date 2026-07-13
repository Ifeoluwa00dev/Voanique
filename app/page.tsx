"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2, Sun, Moon, X } from "lucide-react";

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
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  // Screen 2 — Our Belief
  const beliefRef = useRef<HTMLDivElement>(null);
  const beliefEyebrowRef = useRef<HTMLDivElement>(null);
  const beliefTitleRef = useRef<HTMLHeadingElement>(null);
  const beliefBodyRef = useRef<HTMLParagraphElement>(null);

  // Screen 3 — Why Lips
  const whyLipsRef = useRef<HTMLDivElement>(null);
  const whyLipsEyebrowRef = useRef<HTMLDivElement>(null);
  const whyLipsTitleRef = useRef<HTMLHeadingElement>(null);
  const whyLipsBodyRef = useRef<HTMLParagraphElement>(null);

  // Screen 4 — Our First Creation
  const firstCreationRef = useRef<HTMLDivElement>(null);
  const firstCreationEyebrowRef = useRef<HTMLDivElement>(null);
  const firstCreationTitleRef = useRef<HTMLHeadingElement>(null);
  const firstCreationBodyRef = useRef<HTMLParagraphElement>(null);
  const firstCreationImageRef = useRef<HTMLDivElement>(null);

  // Screen 5 — The Invitation
  const invitationRef = useRef<HTMLDivElement>(null);
  const invitationEyebrowRef = useRef<HTMLDivElement>(null);
  const invitationTitleRef = useRef<HTMLHeadingElement>(null);
  const invitationBodyRef = useRef<HTMLParagraphElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

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
      if (heroSubRef.current) {
        gsap.fromTo(
          heroSubRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: 1.7 }
        );
      }
      if (heroCtaRef.current) {
        gsap.fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: 2.1 }
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
      const revealScreen = (sectionEl: HTMLElement | null, parts: (HTMLElement | null)[]) => {
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

      revealScreen(beliefRef.current, [beliefEyebrowRef.current, beliefTitleRef.current, beliefBodyRef.current]);
      revealScreen(whyLipsRef.current, [whyLipsEyebrowRef.current, whyLipsTitleRef.current, whyLipsBodyRef.current]);
      revealScreen(firstCreationRef.current, [
        firstCreationEyebrowRef.current,
        firstCreationTitleRef.current,
        firstCreationBodyRef.current,
      ]);

      if (firstCreationImageRef.current) {
        gsap.fromTo(
          firstCreationImageRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: firstCreationRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      revealScreen(invitationRef.current, [
        invitationEyebrowRef.current,
        invitationTitleRef.current,
        invitationBodyRef.current,
      ]);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const openRequestModal = () => setShowRequestModal(true);

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
        setShowRequestModal(false);
        setShowWelcomeModal(true);

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
    ? "linear-gradient(rgba(23,24,26,0.6), rgba(23,24,26,0.78))"
    : "linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.68))";
  const inputBg = isDark
    ? "bg-white/5 focus:bg-white/10 placeholder:text-argent/60"
    : "bg-white/60 focus:bg-white placeholder:text-graphite/60";
  const ctaButton = isDark
    ? "bg-platine text-onyx hover:bg-opacity-90 active:bg-white"
    : "bg-onyx text-platine hover:bg-opacity-90 active:bg-black";

  return (
    <div className={`min-h-screen ${bg} ${text} selection:bg-onyx selection:text-platine relative flex flex-col font-sans transition-colors duration-700`}>
      {/* MARQUEE 1 — "Where Beauty Reigns", left to right */}
      <div
        className={`fixed top-0 left-0 w-full z-50 overflow-hidden h-8 flex items-center ${
          isDark ? "bg-platine text-onyx" : "bg-onyx text-platine"
        } transition-colors duration-700`}
      >
        <div className="flex whitespace-nowrap animate-marquee-ltr">
          {Array.from({ length: 2 }).map((_, groupIdx) => (
            <div key={groupIdx} className="flex shrink-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-12 text-[10px] uppercase tracking-[0.35em] font-medium">
                  Where Beauty Reigns.
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 45s linear infinite;
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 45s linear infinite;
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

      {/* SCREEN 1 — THE ARRIVAL */}
      <section
        id="arrival"
        ref={heroRef}
        className="relative h-screen min-h-[650px] w-full flex flex-col items-center justify-center overflow-hidden px-6 pt-24 md:pt-28 pb-12"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            ref={heroBgRef}
            className="absolute -top-[10%] left-0 w-full h-[120%] opacity-90"
            style={{
              backgroundImage: `${heroOverlay}, url('/portrait.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              backgroundColor: isDark ? "#17181A" : "#FAFAF9",
            }}
          />
        </div>

        <div className="z-10 w-full max-w-2xl text-center flex flex-col items-center">
          <div ref={wordmarkRef} className="overflow-hidden select-none mb-6 opacity-0">
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
            className="w-full max-w-sm h-[1px] bg-graphite bg-opacity-30 mb-8 scale-x-0 origin-center"
          />

          <p
            ref={taglineRef}
            className={`text-xl sm:text-2xl md:text-3xl font-serif italic ${headingText} tracking-wide opacity-0 max-w-xl leading-snug`}
          >
            Where Beauty Reigns.
            <br />
            It Begins With Your Lips.
          </p>

          <p
            ref={heroSubRef}
            className="text-sm sm:text-base text-graphite opacity-0 mt-6 max-w-md leading-relaxed"
          >
            A new luxury beauty house is preparing to open its doors.
          </p>

          <div ref={heroCtaRef} className="opacity-0 mt-10">
            <button
              type="button"
              onClick={openRequestModal}
              className={`${ctaButton} px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300`}
            >
              Request Your Invitation
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 — "Luxury Lip Plumping Treatment", right to left — sits below the hero, in normal flow */}
      <div
        className={`w-full overflow-hidden h-10 flex items-center border-t border-b ${
          isDark ? "bg-onyx text-argent border-white/10" : "bg-argent/20 text-graphite border-black/5"
        } transition-colors duration-700`}
      >
        <div className="flex whitespace-nowrap animate-marquee-rtl">
          {Array.from({ length: 2 }).map((_, groupIdx) => (
            <div key={groupIdx} className="flex shrink-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-12 text-[10px] uppercase tracking-[0.35em] font-medium">
                  Luxury Lip Plumping Treatment.
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SCREEN 2 — OUR BELIEF */}
      <section
        id="our-belief"
        ref={beliefRef}
        className={`relative w-full overflow-hidden px-6 py-36 md:py-56 border-t ${border}`}
      >
        {/* Atmospheric watermark, purely textural, sits behind everything */}
        <div
          aria-hidden="true"
          className={`pointer-events-none select-none absolute inset-0 flex items-center justify-center font-serif italic ${
            isDark ? "text-white/[0.03]" : "text-black/[0.035]"
          } text-[26vw] leading-none whitespace-nowrap`}
        >
          Belief
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
          <div ref={beliefEyebrowRef} className="text-[11px] uppercase tracking-[0.35em] text-graphite font-medium">
            Our Belief
          </div>

          <h2
            ref={beliefTitleRef}
            className={`text-4xl sm:text-5xl md:text-6xl font-serif italic ${headingText} leading-[1.15] max-w-xl`}
          >
            Refinement Begins
            <br />
            With Intention.
          </h2>

          <div ref={beliefBodyRef} className="w-full flex flex-col items-center gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-sm sm:text-base text-graphite leading-loose">
                We believe beauty is rarely defined by one perfect feature.
              </p>
              <p className="text-sm sm:text-base text-graphite leading-loose">
                It is revealed through thoughtful choices.
              </p>
              <p className="text-sm sm:text-base text-graphite leading-loose">Quiet details.</p>
              <p className="text-sm sm:text-base text-graphite leading-loose">Intentional living.</p>
              <p className="text-sm sm:text-base text-graphite leading-loose">
                And the confidence to embrace what is already yours.
              </p>
            </div>

            <div className={`w-16 h-[1px] ${isDark ? "bg-platine/25" : "bg-onyx/15"}`} />

            <div className="flex flex-col gap-2">
              <p className="text-sm sm:text-base text-graphite leading-loose">
                Because true luxury is not created through excess.
              </p>
              <p className="text-sm sm:text-base text-graphite leading-loose">It lives in restraint.</p>
              <p className="text-sm sm:text-base text-graphite leading-loose">In craftsmanship.</p>
              <p className="text-sm sm:text-base text-graphite leading-loose">In intention.</p>
            </div>

            <p className={`text-xl sm:text-2xl font-serif italic ${headingText} leading-snug max-w-md pt-2`}>
              After all, the smallest details often leave the most lasting
              impression.
            </p>
          </div>
        </div>
      </section>

      {/* SCREEN 3 — WHY LIPS */}
      <section
        id="why-lips"
        ref={whyLipsRef}
        className={`w-full border-t ${border}`}
      >
        <div className="flex flex-col md:flex-row md:min-h-[85vh]">
          {/* Image — same portrait, cropped tighter to the lips for a distinct moment */}
          <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden">
            <Image
              src="/portrait.jpg"
              alt="A close, considered study of the lips"
              fill
              className="object-cover object-[center_65%]"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center gap-8 px-6 py-20 md:py-24">
            <div ref={whyLipsEyebrowRef} className="text-[11px] uppercase tracking-[0.35em] text-graphite font-medium">
              Why Lips
            </div>

            <h2
              ref={whyLipsTitleRef}
              className={`text-3xl sm:text-4xl md:text-5xl font-serif ${headingText} leading-[1.2] max-w-md`}
            >
              Among the many features that shape a face, the lips hold a
              quiet influence.
            </h2>

            <div ref={whyLipsBodyRef} className="w-full flex flex-col items-center gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-sm sm:text-base text-graphite leading-loose">They frame every smile.</p>
                <p className="text-sm sm:text-base text-graphite leading-loose">Every word.</p>
                <p className="text-sm sm:text-base text-graphite leading-loose">Every expression.</p>
              </div>

              <div className={`w-16 h-[1px] ${isDark ? "bg-platine/25" : "bg-onyx/15"}`} />

              <p className="text-sm sm:text-base text-graphite leading-loose max-w-sm">
                Long before you speak, they have already shaped the
                impression you leave.
              </p>

              <p className={`text-xl sm:text-2xl font-serif italic ${headingText} leading-snug pt-2`}>
                That is why our story begins here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 4 — OUR FIRST CREATION */}
      <section
        id="our-first-creation"
        ref={firstCreationRef}
        className={`w-full max-w-5xl mx-auto px-6 py-32 md:py-44 border-t ${border}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left flex flex-col gap-5">
            <div
              ref={firstCreationEyebrowRef}
              className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium"
            >
              Our First Creation
            </div>
            <h2 ref={firstCreationTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif ${headingText} leading-snug`}>
              Every House has a beginning.
              <br />
              Ours begins with the lips.
            </h2>
            <p ref={firstCreationBodyRef} className="text-sm sm:text-base text-graphite max-w-sm mx-auto md:mx-0 leading-loose">
              Our First Creation is a luxury lip treatment, created to
              visibly plump the lips in as little as ten minutes while
              deeply nourishing and refining one of the face&apos;s most
              expressive features.
              <br />
              <br />
              Thoughtfully crafted as the First Creation of the House.
            </p>
          </div>

          <div
            ref={firstCreationImageRef}
            className="relative flex-1 w-full max-w-sm md:max-w-none aspect-[2/3] md:aspect-[3/4] rounded-sm overflow-hidden border border-argent border-opacity-30"
          >
            <Image
              src="/before-after-result.jpg"
              alt="Before, after, and the VOANIQUÉ effect on the lips"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SCREEN 5 — THE INVITATION */}
      <section
        id="the-invitation"
        ref={invitationRef}
        className={`w-full max-w-2xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center gap-8 border-t ${border}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            ref={invitationEyebrowRef}
            className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium"
          >
            The Invitation
          </div>
          <h2 ref={invitationTitleRef} className={`text-3xl sm:text-4xl md:text-5xl font-serif italic ${headingText}`}>
            The House is preparing to open its doors.
          </h2>
          <p ref={invitationBodyRef} className="text-sm sm:text-base text-graphite max-w-md leading-relaxed">
            Request your invitation and be among the first to experience the
            world of VOANIQUÉ.
          </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          {isSubmitted ? (
            <div ref={successSectionRef} className="text-center opacity-0 flex flex-col items-center justify-center py-4">
              <div className={`w-10 h-10 rounded-full border ${isDark ? "border-platine" : "border-onyx"} flex items-center justify-center mb-5`}>
                <Check className={`w-4 h-4 ${headingText} stroke-[1.5]`} />
              </div>

              <h3 className={`text-xl sm:text-2xl font-serif ${headingText} mb-2 tracking-tight`}>
                {alreadyRegistered ? "You're already inside." : "Your invitation has been received."}
              </h3>

              <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
                We'll let you know the moment the doors open.
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
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="EMAIL ADDRESS"
                      disabled={loading}
                      required
                      className={`flex-grow px-5 py-4 border border-argent text-xs sm:text-sm tracking-wider uppercase ${inputBg} focus:outline-none focus:ring-2 focus:ring-onyx transition-all duration-300 font-mono ${headingText} h-14`}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${ctaButton} px-6 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-opacity-50 disabled:cursor-not-allowed h-14 shrink-0`}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Request Your Invitation"}
                    </button>
                  </div>

                  {error && <p className="text-xs text-red-600 font-medium tracking-wide mt-1">{error}</p>}
                </div>

                <p className="text-[10px] text-graphite leading-relaxed text-center">
                  By requesting your invitation, you agree to receive
                  opening announcements, early access invitations,
                  exclusive House updates, and occasional correspondence
                  from the House of VOANIQUÉ. We value your privacy, and
                  you may unsubscribe at any time.
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

      {/* REQUEST MODAL — triggered from the hero button */}
      {showRequestModal && !isSubmitted && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          onClick={() => setShowRequestModal(false)}
        >
          <div className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-onyx/40"} backdrop-blur-sm`} />
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md ${bg} border ${border} p-8 md:p-10 flex flex-col items-center text-center gap-6 transition-colors duration-700`}
          >
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-graphite hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-[11px] uppercase tracking-[0.3em] text-graphite font-medium">
              The Invitation
            </div>
            <h3 className={`text-2xl sm:text-3xl font-serif italic ${headingText}`}>
              Step inside.
            </h3>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <label htmlFor="modal-email-input" className="sr-only">
                Email address
              </label>
              <input
                id="modal-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="EMAIL ADDRESS"
                disabled={loading}
                required
                className={`w-full px-5 py-4 border border-argent text-xs sm:text-sm tracking-wider uppercase ${inputBg} focus:outline-none focus:ring-2 focus:ring-onyx transition-all duration-300 font-mono ${headingText} h-14`}
              />
              <button
                type="submit"
                disabled={loading}
                className={`${ctaButton} px-6 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-opacity-50 disabled:cursor-not-allowed h-14`}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Request Your Invitation"}
              </button>
              {error && <p className="text-xs text-red-600 font-medium tracking-wide">{error}</p>}
            </form>

            <p className="text-[10px] text-graphite leading-relaxed">
              By requesting your invitation, you agree to receive opening
              announcements, early access invitations, exclusive House
              updates, and occasional correspondence from the House of
              VOANIQUÉ. We value your privacy, and you may unsubscribe at
              any time.
            </p>
          </div>
        </div>
      )}

      {/* WELCOME MODAL — pops up the moment a request succeeds, from either entry point */}
      {showWelcomeModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          onClick={() => setShowWelcomeModal(false)}
        >
          <div className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-onyx/40"} backdrop-blur-sm`} />
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg ${bg} border ${border} p-8 md:p-12 flex flex-col items-center text-center gap-5 max-h-[85vh] overflow-y-auto transition-colors duration-700`}
          >
            <button
              type="button"
              onClick={() => setShowWelcomeModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-graphite hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={`w-10 h-10 rounded-full border ${isDark ? "border-platine" : "border-onyx"} flex items-center justify-center mb-1`}>
              <Check className={`w-4 h-4 ${headingText} stroke-[1.5]`} />
            </div>

            <h3 className={`text-2xl sm:text-3xl font-serif ${headingText} tracking-tight`}>
              Welcome to the House.
            </h3>

            <p className="text-sm text-graphite leading-loose max-w-sm mx-auto">
              Your invitation has been received.
              <br />
              <br />
              Before you go, we would like you to remember one thing.
              <br />
              <br />
              You have never needed permission to be beautiful.
              <br />
              <br />
              We hope you will always appreciate the beauty that is
              already yours while embracing the quiet rituals that help it
              flourish.
              <br />
              <br />
              We are honored to welcome you.
              <br />
              <br />
              Refinement Begins With Intention.
              <br />
              The House of VOANIQUÉ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}