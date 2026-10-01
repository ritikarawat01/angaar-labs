import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, Flame } from "lucide-react";
import Logo from "./Logo";

export const links = [
  ["Home", "home"],
  ["Capabilities", "services"],
  ["Showcase", "work"],
  ["Process", "process"],
  ["Impact", "about"],
  ["Reviews", "faq"],
] as const;

export default function Navbar({ ready }: { ready: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-ui ${
          solid
            ? "border-b border-white/10 bg-bg/85 py-3.5 backdrop-blur-xl shadow-lift"
            : "py-6"
        }`}
      >
        <nav className="shell flex items-center justify-between" aria-label="Primary">
          <Logo />

          {/* Center Navigation Pill */}
          <div className="hidden items-center rounded-full border border-white/10 bg-surface/80 px-6 py-2 shadow-glass backdrop-blur-md lg:flex">
            <ul className="flex items-center gap-7">
              {links.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "page" : undefined}
                    className={`relative text-[13px] font-medium transition-colors duration-200 hover:text-ink ${
                      active === id ? "text-flame font-semibold" : "text-muted-light"
                    }`}
                  >
                    {label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-flame shadow-glow"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Action */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="#contact"
              className="btn btn-primary !py-2.5 !px-5 text-xs tracking-wide"
            >
              <span>Start Project</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            className="rounded-xl border border-white/15 bg-surface/80 p-2.5 text-ink backdrop-blur-md transition-colors hover:border-flame/60 hover:text-flame lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-bg/95 px-6 pb-12 pt-6 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />
            <div className="relative flex items-center justify-between">
              <Logo />
              <button
                className="rounded-xl border border-white/15 bg-surface/80 p-2.5 text-ink"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="relative mt-14 flex flex-1 flex-col justify-center gap-4">
              {links.map(([label, id], i) => (
                <li key={id} className="overflow-hidden">
                  <motion.a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 py-2 font-display text-4xl font-extrabold text-ink transition-colors hover:text-flame"
                  >
                    <span className="font-sans text-xs font-bold text-ember">0{i + 1}</span>
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary relative justify-center !py-4 text-base"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

