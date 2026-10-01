import { ArrowUp, Github, Instagram, Linkedin, Twitter, Sparkles, Flame, Send } from "lucide-react";
import Logo from "./Logo";

const col = (title: string, items: { name: string; href: string }[]) => (
  <div>
    <h3 className="eyebrow mb-5 !text-ink">{title}</h3>
    <ul className="space-y-3 text-sm text-muted-light">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            className="transition-colors duration-200 hover:text-flame"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 overflow-hidden border-t border-white/10 bg-bg pt-24 pb-12">
      {/* Background Volumetric Glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-ember/15 blur-[160px]" />

      <div className="shell relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-muted-light">
            The Angaar Labs is an independent digital innovation and 3D web studio. We engineer award-caliber digital flagships that burn bright and dominate categories.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              [Instagram, "Instagram", "https://instagram.com"],
              [Linkedin, "LinkedIn", "https://linkedin.com"],
              [Twitter, "Twitter", "https://twitter.com"],
              [Github, "GitHub", "https://github.com"],
            ].map(([Icon, n, href]: any) => (
              <a
                key={n}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={n}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface/80 text-muted transition-all duration-300 hover:border-flame/60 hover:bg-surface-raised hover:text-flame hover:shadow-glow"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {col("Navigation", [
          { name: "Home", href: "#home" },
          { name: "Capabilities", href: "#services" },
          { name: "Showcase", href: "#work" },
          { name: "Process", href: "#process" },
          { name: "Impact Metrics", href: "#about" },
          { name: "Client Reviews", href: "#faq" },
        ])}

        {col("Core Services", [
          { name: "3D Web & WebGL", href: "#services" },
          { name: "Creative Frontend", href: "#services" },
          { name: "E-Commerce Flagships", href: "#services" },
          { name: "Enterprise Dashboards", href: "#services" },
          { name: "Brand Identity Systems", href: "#services" },
        ])}

        {col("Direct Inquiries", [
          { name: "hello@angaarlabs.com", href: "mailto:hello@angaarlabs.com" },
          { name: "+91 8273619318", href: "tel:+918273619318" },
          { name: "New Delhi · Global Remote", href: "#home" },
        ])}

        <div>
          <h3 className="eyebrow mb-5 !text-ink">Studio Dispatch</h3>
          <p className="mb-4 text-xs text-muted">
            Receive exclusive insights on creative engineering, GLSL shader techniques, and brand architecture.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center rounded-2xl border border-white/15 bg-surface/80 p-1.5 backdrop-blur-md focus-within:border-flame/60 focus-within:shadow-glow"
          >
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input
              id="nl"
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-xs text-ink outline-none placeholder:text-muted"
            />
            <button className="btn btn-primary !rounded-xl !px-4 !py-2.5 text-xs">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="shell relative mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} The Angaar Labs. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational</span>
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-medium text-muted-light transition-colors hover:text-flame"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

