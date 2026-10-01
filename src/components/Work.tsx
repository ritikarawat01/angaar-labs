import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArrowUpRight, Zap, Eye, Sparkles, ExternalLink, Flame, Shield, Layers, Play, Pause, ChevronRight, Activity, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Direct static ES imports for Solena images
import s01 from "../../assets/solena/01_frame_008_enhanced.jpg";
import s02 from "../../assets/solena/02_frame_009_enhanced.jpg";
import s03 from "../../assets/solena/03_frame_013_enhanced.jpg";
import s04 from "../../assets/solena/04_frame_015_enhanced.jpg";
import s05 from "../../assets/solena/05_frame_020_enhanced.jpg";
import s06 from "../../assets/solena/06_frame_023_enhanced.jpg";
import s07 from "../../assets/solena/07_frame_025_enhanced.jpg";
import s08 from "../../assets/solena/08_frame_029_enhanced.jpg";
import s09 from "../../assets/solena/09_frame_030_enhanced.jpg";
import s10 from "../../assets/solena/10_frame_033_enhanced.jpg";
import s11 from "../../assets/solena/11_frame_038_enhanced.jpg";
import s12 from "../../assets/solena/12_frame_039_enhanced.jpg";

const solenaFrames = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12];

// Direct static ES imports for Hillwood images
import h01 from "../../assets/hillwood/01_frame_001_enhanced.jpg";
import h02 from "../../assets/hillwood/02_frame_004_enhanced.jpg";
import h03 from "../../assets/hillwood/03_frame_007_enhanced.jpg";
import h04 from "../../assets/hillwood/04_frame_010_enhanced.jpg";
import h05 from "../../assets/hillwood/05_frame_013_enhanced.jpg";
import h06 from "../../assets/hillwood/06_frame_016_enhanced.jpg";
import h07 from "../../assets/hillwood/07_frame_018_enhanced.jpg";
import h08 from "../../assets/hillwood/08_frame_021_enhanced.jpg";
import h09 from "../../assets/hillwood/09_frame_024_enhanced.jpg";
import h10 from "../../assets/hillwood/10_frame_027_enhanced.jpg";
import h11 from "../../assets/hillwood/11_frame_030_enhanced.jpg";
import h12 from "../../assets/hillwood/12_frame_033_enhanced.jpg";

const hillwoodFrames = [h01, h02, h03, h04, h05, h06, h07, h08, h09, h10, h11, h12];

gsap.registerPlugin(ScrollTrigger);

// ─── Floating Transparent Cinema Screen Component ────────────────────────────
function TransparentCinemaScreen({
  frames,
  title,
  domain,
  accent,
}: {
  frames: string[];
  title: string;
  domain: string;
  accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [mode, setMode] = useState<"stream" | "scrub">("stream");
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const animYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Preload all frames on mount
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  // Smooth continuous auto-scroll loop for stream mode
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (mode === "stream" && isPlaying && !isHovered && scrollTrackRef.current && containerRef.current) {
        const totalHeight = scrollTrackRef.current.scrollHeight;
        const viewHeight = containerRef.current.clientHeight;
        const maxScroll = Math.max(1, totalHeight - viewHeight);

        // Smooth cinematic crawl (~45px/s)
        animYRef.current += 45 * dt;
        if (animYRef.current > maxScroll) {
          animYRef.current = 0; // Seamless loop
        }

        scrollTrackRef.current.style.transform = `translate3d(0, -${animYRef.current}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, isPlaying, isHovered]);

  // Interactive mouse scrubbing along vertical axis
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !scrollTrackRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const yRatio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    if (mode === "stream") {
      const totalHeight = scrollTrackRef.current.scrollHeight;
      const viewHeight = containerRef.current.clientHeight;
      const maxScroll = Math.max(1, totalHeight - viewHeight);
      const targetY = yRatio * maxScroll;
      animYRef.current = targetY;
      scrollTrackRef.current.style.transform = `translate3d(0, -${targetY}px, 0)`;
    } else {
      const frameIdx = Math.min(frames.length - 1, Math.floor(yRatio * frames.length));
      setActiveFrameIndex(frameIdx);
    }
  };

  return (
    <div className="relative group/screen w-full">
      {/* Dynamic Ambient Radiant Aura */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-25 blur-3xl transition-opacity duration-700 group-hover/screen:opacity-50"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Glass Viewport Container */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0a0806]/80 backdrop-blur-2xl transition-all duration-700 hover:border-white/30"
        style={{
          boxShadow: `0 30px 80px -25px rgba(0,0,0,0.95), 0 0 0 1px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}
      >
        {/* Floating Minimal Glass Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            <span className="font-mono text-[11px] font-semibold text-white/90">{domain}</span>
          </div>

          {/* Interactive Mode & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === "stream" ? "scrub" : "stream")}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold text-ink transition-all hover:border-flame hover:text-flame"
            >
              <Layers size={11} />
              <span>{mode === "stream" ? "LIVE STREAM" : "KEYFRAMES"}</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-light transition-all hover:border-white/30 hover:text-white"
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            </button>
          </div>
        </div>

        {/* Scroll / Preview Area */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleContainerMouseMove}
          className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-black select-none cursor-ns-resize"
        >
          {/* Subtle Top & Bottom Vignettes */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-black/90 to-transparent" />

          {mode === "stream" ? (
            /* Continuous Vertical Stream */
            <div
              ref={scrollTrackRef}
              className="w-full will-change-transform"
              style={{ transition: isHovered ? "transform 60ms linear" : "none" }}
            >
              {frames.map((src, idx) => (
                <div key={idx} className="relative w-full border-b border-white/5 bg-[#080706]">
                  <img
                    src={src}
                    alt={`${title} - View ${idx + 1}`}
                    className="w-full object-cover block"
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Keyframe Mode */
            <div className="relative h-full w-full">
              {frames.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeFrameIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${title} - View ${idx + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Right Floating Progress Bar */}
          <div className="pointer-events-none absolute right-3 top-4 bottom-14 z-30 w-1 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
            <div
              className="w-full rounded-full transition-all duration-100"
              style={{
                background: `linear-gradient(180deg, ${accent} 0%, #FF5500 100%)`,
                boxShadow: `0 0 10px ${accent}`,
                height: mode === "stream" ? "20%" : `${100 / frames.length}%`,
                transform:
                  mode === "stream"
                    ? `translateY(${Math.min(400, (animYRef.current / (frames.length * 350)) * 400)}%)`
                    : `translateY(${activeFrameIndex * 100}%)`,
              }}
            />
          </div>

          {/* Bottom Live HUD Floating Capsule */}
          <div className="pointer-events-none absolute bottom-3 inset-x-3 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3.5 py-1 text-[11px] font-mono font-medium text-white backdrop-blur-md shadow-lg">
              <Eye size={12} className="text-flame animate-pulse" />
              <span>
                {isHovered ? "SCRUBBING WEBSITE" : mode === "stream" ? "AUTONOMOUS WALKTHROUGH" : `KEYFRAME ${activeFrameIndex + 1}/${frames.length}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/20 px-3 py-1 font-mono text-[10px] font-bold text-flame backdrop-blur-md">
              <Sparkles size={11} />
              <span>{frames.length} RETINA VIEWS</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Frame Rail */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2.5 backdrop-blur-xl">
          <span className="font-mono text-[10px] text-muted-light uppercase tracking-wider">
            Keyframe Inspect:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {frames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMode("scrub");
                  setActiveFrameIndex(idx);
                }}
                onMouseEnter={() => {
                  if (mode === "scrub") setActiveFrameIndex(idx);
                }}
                className={`h-6 min-w-6 rounded-md border px-1.5 font-mono text-[10px] font-bold transition-all ${
                  mode === "scrub" && activeFrameIndex === idx
                    ? "border-flame bg-flame text-black shadow-[0_0_10px_#FF7A1A]"
                    : "border-white/10 bg-white/5 text-muted-light hover:border-white/30 hover:text-white"
                }`}
              >
                {(idx + 1).toString().padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2 Flagship Projects Data ────────────────────────────────────────────────
const FLAGSHIPS = [
  {
    slug: "solena",
    index: "01",
    tagline: "Ultra-Luxury Spatial Showcase",
    title: "Solena Architectural Sanctuary",
    category: "3D Spatial Architecture & Walkthrough",
    domain: "solena.sanctuary.design",
    description: "A cinematic spatial flagship and real-time 3D walkthrough engineered for an ultra-luxury coastal estate. Integrates dynamic sunlight orientation shaders, buttery WebGL frame transitions, and bespoke acoustic engineering.",
    accent1: "#FF7A1A",
    stats: "+480% Inbound Growth",
    metrics: [
      { label: "Pipeline Surge", value: "+480%" },
      { label: "WebGL FPS", value: "120 FPS" },
      { label: "Core Web Vitals", value: "100/100" },
    ],
    tags: ["Three.js", "WebGL Shaders", "Spatial Audio", "GSAP Motion", "Vite"],
    frames: solenaFrames,
  },
  {
    slug: "hillwood",
    index: "02",
    tagline: "Bespoke Lifestyle Platform",
    title: "Hillwood Luxury Living",
    category: "Bespoke Estates & Spatial Commerce",
    domain: "hillwood.living.estates",
    description: "High-fashion lifestyle platform with fluid editorial storytelling, full-bleed interactive room tours, micro-inertia physics, and sub-second page rendering for high-net-worth real estate buyers.",
    accent1: "#FFC83B",
    stats: "+390% Engagement Lift",
    metrics: [
      { label: "Dwell Time", value: "5m 42s" },
      { label: "Conversion Lift", value: "+390%" },
      { label: "First Paint", value: "0.32s" },
    ],
    tags: ["React 19", "Headless CMS", "Interactive Canvas", "Lenis Smooth Scroll"],
    frames: hillwoodFrames,
  },
];

export default function Work() {
  const secRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle reveal animations for each flagship stage
      gsap.utils.toArray<HTMLElement>(".flagship-stage").forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 80%",
            },
          }
        );
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={secRef}
      className="relative flex flex-col justify-center overflow-hidden py-24 md:py-36"
    >
      {/* Ambient Glowing Atmospheric Spheres */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-[650px] w-[650px] rounded-full opacity-20 blur-[200px]"
        style={{ background: "radial-gradient(circle, #FF7A1A 0%, #FF5500 45%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute left-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full opacity-15 blur-[180px]"
        style={{ background: "radial-gradient(circle, #FFC83B 0%, #8B2200 50%, transparent 75%)" }}
      />

      {/* Cyber Grid Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,122,26,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,122,26,.8) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Section Header ── */}
      <div className="shell mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-flame shadow-[0_0_8px_#FF7A1A]" />
            <p className="eyebrow !text-flame">02 — Selected Works & Flagships</p>
          </div>
          <h2 className="h-display mt-4 text-[clamp(2.6rem,7vw,5.8rem)] leading-[0.93]">
            Selected <span className="ember-text">Flagships.</span>
          </h2>
        </div>
        <div className="max-w-md space-y-2">
          <p className="text-sm leading-relaxed text-muted-light md:text-base">
            Two category-defining digital flagships forged with uncompromising craft, fluid 120 FPS WebGL motion, and bespoke real estate architecture.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-flame">
            <Sparkles size={13} />
            <span>Interactive viewports • Move cursor or scrub frames to explore</span>
          </div>
        </div>
      </div>

      {/* ── 2 Flagships Transparent Stages ── */}
      <div className="shell space-y-24 md:space-y-36">
        {FLAGSHIPS.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={item.slug}
              className={`flagship-stage relative flex flex-col gap-12 lg:gap-16 items-center ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Massive Translucent Watermark Numeral */}
              <span
                className={`pointer-events-none absolute -top-16 font-mono text-[140px] md:text-[200px] font-black leading-none opacity-[0.04] select-none ${
                  isEven ? "left-0" : "right-0"
                }`}
                style={{ color: item.accent1 }}
              >
                {item.index}
              </span>

              {/* ── Editorial Story & Metadata Column ── */}
              <div className="flex-1 space-y-6 z-10">
                {/* Protocol Tag & Verified Outcome Pill */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-ink backdrop-blur-md">
                    <span
                      className="inline-block h-2 w-2 rounded-full animate-pulse"
                      style={{ background: item.accent1, boxShadow: `0 0 8px ${item.accent1}` }}
                    />
                    <span>FLAGSHIP // {item.index} — {item.tagline.toUpperCase()}</span>
                  </div>

                  <div
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1 font-bold"
                    style={{
                      color: item.accent1,
                      borderColor: `${item.accent1}40`,
                      background: `${item.accent1}15`,
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>{item.stats}</span>
                  </div>
                </div>

                {/* Big Display Title */}
                <h3 className="h-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                  {item.title}
                </h3>

                {/* Narrative Paragraph */}
                <p className="text-base sm:text-lg leading-relaxed text-muted-light max-w-xl">
                  {item.description}
                </p>

                {/* ── Verified Performance Metrics Grid ── */}
                <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
                  {item.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-mono text-[10px] text-muted-light uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span
                        className="font-mono text-xl sm:text-2xl font-black tracking-tight"
                        style={{ color: item.accent1 }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills & Action Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="group/btn inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-bold text-ink backdrop-blur-md transition-all duration-300 hover:border-transparent hover:text-black hover:shadow-glow"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = item.accent1;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <span>INQUIRE CASE STUDY</span>
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* ── Cinema Screen Column ── */}
              <div className="flex-1 w-full z-10">
                <TransparentCinemaScreen
                  frames={item.frames}
                  title={item.title}
                  domain={item.domain}
                  accent={item.accent1}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}





