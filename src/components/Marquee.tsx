const items = [
  "3D WebGL Experiences",
  "Creative Frontend Architecture",
  "High-Conversion Flagships",
  "Bespoke Brand Systems",
  "Next-Gen Digital Products",
  "Silk-Smooth Motion",
];

const Row = ({ rev, out }: { rev?: boolean; out?: boolean }) => (
  <div
    className="flex w-max"
    style={{
      animation: "marq 42s linear infinite",
      animationDirection: rev ? "reverse" : "normal",
    }}
  >
    {[0, 1, 2, 3].flatMap(() => items).map((t, i) => (
      <span
        key={i}
        className={`mx-6 flex items-center font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl ${
          out
            ? "text-transparent [-webkit-text-stroke:1px_rgba(255,200,59,.45)]"
            : "text-ink"
        }`}
      >
        <span>{t}</span>
        <span className="ml-10 text-flame drop-shadow-[0_0_12px_rgba(255,122,26,0.8)]">✦</span>
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div
      aria-hidden
      className="space-y-3 overflow-hidden border-y border-white/10 bg-surface/40 py-10 backdrop-blur-md shadow-glass"
    >
      <Row />
      <Row rev out />
    </div>
  );
}

