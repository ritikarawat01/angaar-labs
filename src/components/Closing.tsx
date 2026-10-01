import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Star,
  Flame,
  Mail,
  Quote,
  TrendingUp,
  Cpu,
  Globe,
  Zap,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Reveal from "./Reveal";

// ─── Animated Numeric Counter ────────────────────────────────────────────────
function Num({ n, s }: { n: number; s: string }) {
  const r = useRef<HTMLSpanElement>(null);
  const v = useInView(r, { once: true });
  const [x, setX] = useState(0);

  useEffect(() => {
    if (!v) return;
    const c = animate(0, n, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => setX(Math.round(val)),
    });
    return () => c.stop();
  }, [v, n]);

  return (
    <span ref={r}>
      {x}
      {s}
    </span>
  );
}

// ─── Stats (Real impact. Real heat.) ───────────────────────────────────────────
export function Stats() {
  const statsList = [
    {
      num: 75,
      suffix: "+",
      title: "Flagship Deployments",
      desc: "Custom WebGL & digital systems deployed worldwide.",
      tag: "Global Reach",
      icon: Globe,
      accent: "#FF7A1A",
    },
    {
      num: 99,
      suffix: ".9%",
      title: "Client Satisfaction",
      desc: "Audited retention and partner approval rate.",
      tag: "Verified SLA",
      icon: TrendingUp,
      accent: "#FFC83B",
    },
    {
      num: 4,
      suffix: "x",
      title: "Average Traffic ROI",
      desc: "Surge in high-intent inbound enterprise leads.",
      tag: "Conversion",
      icon: Zap,
      accent: "#FF5500",
    },
    {
      num: 60,
      suffix: "+",
      title: "FPS WebGL Rendering",
      desc: "Smooth GPU hardware acceleration across devices.",
      tag: "Zero Lag",
      icon: Cpu,
      accent: "#FB923C",
    },
  ];

  return (
    <section id="about" className="shell relative py-32 md:py-40 overflow-hidden">
      {/* Soft Ambient Volumetric Light */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[180px]"
        style={{ background: "radial-gradient(circle, #FF5500 0%, #FF7A1A 40%, transparent 70%)" }}
      />

      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-flame shadow-[0_0_8px_#FF7A1A]" />
          <p className="eyebrow !text-flame">04 — Performance & Verified Results</p>
        </div>

        <h2 className="h-display mt-5 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.93]">
          Real impact. <br />
          <span className="ember-text">Real heat.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
          We combine obsessive aesthetic perfection with robust software engineering to deliver measurable commercial dominance for every partner.
        </p>
      </Reveal>

      {/* Clean, Refined Metrics Grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsList.map((st, i) => {
          const Icon = st.icon;
          return (
            <Reveal key={st.title} delay={i * 0.1}>
              <div
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-flame/40 hover:bg-surface/90 hover:shadow-glow"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold text-muted transition-colors group-hover:border-flame/30 group-hover:text-flame">
                      {st.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface text-muted transition-colors group-hover:border-flame/40 group-hover:text-gold">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Big Elegant Stat Value */}
                  <div className="mt-8 font-display text-[clamp(3rem,5vw,4.2rem)] font-black leading-none tracking-tight text-ink group-hover:text-white transition-colors">
                    <Num n={st.num} s={st.suffix} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {st.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-light">
                    {st.desc}
                  </p>
                </div>

                {/* Bottom Refined Accent Line */}
                <div className="mt-8 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full w-full origin-left transition-transform duration-700 group-hover:scale-x-100"
                    style={{
                      background: `linear-gradient(90deg, ${st.accent}, #FFC83B)`,
                      transform: "scaleX(0.25)",
                    }}
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── Testimonials (Cinema-Tier Editorial Showcase) ───────────────────────────
const TESTIMONIALS = [
  {
    id: "01",
    brand: "Apex Venture Studio",
    quote:
      "The Angaar Labs delivered a digital presence that completely shifted how institutional investors perceive our portfolio. Their 3D WebGL interactions are world-class, but more importantly, our inbound deal flow jumped by over 300% within the first 60 days.",
    author: "Aarav Mehta",
    title: "Founder & Managing Partner",
    company: "Apex Venture Studio",
    location: "San Francisco · London",
    outcome: "+320% Qualified Pipeline Growth",
    year: "2026",
    rating: 5,
  },
  {
    id: "02",
    brand: "Kinetix Global Labs",
    quote:
      "Obsessive attention to craft, sub-second global load times, and custom GLSL shaders that left our international customers genuinely astonished. They set a new technical benchmark that our competitors are still trying to figure out.",
    author: "Elena Rostova",
    title: "VP of Brand Architecture",
    company: "Kinetix Global Labs",
    location: "Zurich · New York",
    outcome: "Sub-Second Global Edge Load & 60 FPS",
    year: "2026",
    rating: 5,
  },
  {
    id: "03",
    brand: "Horizon Capital",
    quote:
      "They don't build generic corporate websites — they forge cinema-caliber digital artifacts. Inbound investment inquiries and executive engagement reached an all-time high immediately following the launch.",
    author: "Devon Chen",
    title: "Chief Design Officer",
    company: "Horizon Capital",
    location: "Singapore · Dubai",
    outcome: "$45M Series-B Digital Flagship",
    year: "2026",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const active = TESTIMONIALS[current];

  return (
    <section id="faq" className="shell relative py-32 md:py-40 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div
        className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-full opacity-15 blur-[160px]"
        style={{ background: "radial-gradient(circle, #FF7A1A 0%, #FF5500 40%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-flame shadow-[0_0_8px_#FF7A1A]" />
            <p className="eyebrow !text-flame">05 — Client Endorsements</p>
          </div>

          <h2 className="h-display mt-5 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.93]">
            Trusted by <br />
            <span className="ember-text">visionary founders.</span>
          </h2>
        </Reveal>

        {/* Cinematic Master Testimonial Stage */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_2fr] items-stretch">
          {/* Left Column: Brand Selector Tabs */}
          <div className="flex flex-col justify-between gap-3">
            <div className="space-y-3">
              {TESTIMONIALS.map((t, idx) => {
                const isSel = idx === current;
                return (
                  <button
                    key={t.brand}
                    onClick={() => setCurrent(idx)}
                    className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 flex items-center justify-between ${
                      isSel
                        ? "border-flame/50 bg-surface-raised shadow-glow"
                        : "border-white/10 bg-surface/40 hover:border-white/20 hover:bg-surface/70"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-semibold text-muted">
                        {t.id} / {t.year}
                      </div>
                      <div
                        className={`font-display text-lg font-bold mt-1 transition-colors ${
                          isSel ? "text-flame" : "text-ink"
                        }`}
                      >
                        {t.brand}
                      </div>
                    </div>
                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        isSel ? "bg-flame scale-125 shadow-[0_0_8px_#FF7A1A]" : "bg-white/10"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Controls */}
            <div className="hidden lg:flex items-center gap-3 pt-4">
              <button
                onClick={() => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface text-ink transition-all hover:border-flame/40 hover:text-flame"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface text-ink transition-all hover:border-flame/40 hover:text-flame"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
              <span className="font-mono text-xs text-muted ml-2">
                0{current + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Editorial Quote Display */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface/90 via-surface/60 to-surface/90 p-8 md:p-14 shadow-lift backdrop-blur-2xl flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Bar: Stars and Outcome Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="#FFC83B" color="#FFC83B" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3.5 py-1 text-xs font-semibold text-flame">
                      <TrendingUp size={13} />
                      <span>{active.outcome}</span>
                    </div>
                  </div>

                  {/* Main Cinematic Quote */}
                  <div className="relative mt-8">
                    <Quote
                      size={48}
                      className="absolute -left-2 -top-6 text-flame/10 pointer-events-none"
                    />
                    <blockquote className="relative z-10 font-display text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-ink">
                      "{active.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Author Profile Footer */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-black text-black shadow-glow"
                      style={{ background: "linear-gradient(135deg, #FFC83B 0%, #FF5500 100%)" }}
                    >
                      {active.author[0]}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink">
                        {active.author}
                      </h4>
                      <p className="font-mono text-xs text-muted-light">
                        {active.title} — {active.company}
                      </p>
                      <p className="font-mono text-[11px] text-muted">
                        {active.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 size={15} />
                    <span>Verified Client Engagement</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function Cta() {
  return (
    <section className="shell relative flex min-h-[85svh] flex-col items-center justify-center py-28 text-center">
      {/* Volumetric Flame Core */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-ember/25 via-flame/20 to-gold/10 blur-[150px]" />

      <Reveal>
        <div className="inline-flex items-center gap-2.5 rounded-full border border-flame/40 bg-surface/80 px-5 py-2 text-xs font-bold text-flame backdrop-blur-md shadow-glass">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span>Now Booking Q2 / Q3 Flagship Projects</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="h-display mx-auto mt-6 max-w-5xl text-[clamp(2.8rem,8.5vw,7.2rem)] leading-[0.93]">
          Let us forge something <br />
          <span className="ember-text">impossible to ignore.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-light md:text-xl">
          Whether you are launching a category-defining brand, engineering a 60+ FPS WebGL universe, or elevating enterprise conversion — we are ready to ignite.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-12 flex flex-wrap justify-center gap-5">
        <a href="mailto:hello@angaarlabs.com" className="btn btn-primary group !px-9 !py-4 text-base shadow-glow">
          <span>Initiate Project Consultation</span>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a href="mailto:hello@angaarlabs.com" className="btn btn-ghost !px-8 !py-4 text-base">
          <Mail size={16} className="text-flame" />
          <span>hello@angaarlabs.com</span>
        </a>
      </Reveal>
    </section>
  );
}

