import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#393f38" }}>
      {/* Large decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-syne font-800 text-[clamp(80px,18vw,220px)] leading-none whitespace-nowrap"
          style={{ color: "rgba(209,245,105,0.04)", fontWeight: 800 }}
        >
          ELEVO
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* Top section */}
        <div className="text-center mb-16">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-6" style={{ color: "#9da391" }}>
            Stay in the ritual
          </p>
          <h2
            className="font-syne font-bold leading-none mb-8"
            style={{
              color: "#fdfdfd",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Stay in Touch.
          </h2>
          <p className="font-jakarta text-base mb-10 max-w-md mx-auto" style={{ color: "#9da391", lineHeight: 1.7 }}>
            Seasonal rituals, new arrivals, and quiet invitations, delivered when it matters.
          </p>

          {/* Email form */}
          {submitted ? (
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
              style={{ background: "#d1f569" }}
            >
              <span className="font-syne font-semibold" style={{ color: "#393f38" }}>
                You're in. See you soon. ✦
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 w-full px-6 py-3.5 rounded-full font-jakarta text-sm bg-transparent border outline-none transition-all focus:border-[#d1f569]"
                style={{
                  borderColor: "rgba(157,163,145,0.3)",
                  color: "#fdfdfd",
                  caretColor: "#d1f569",
                }}
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-full font-syne font-semibold text-sm magnetic-btn"
                style={{ background: "#d1f569", color: "#393f38" }}
              >
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "rgba(157,163,145,0.15)" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-syne font-bold text-sm"
              style={{ background: "#d1f569", color: "#393f38" }}
            >
              V
            </div>
            <span className="font-syne font-bold text-lg" style={{ color: "#fdfdfd" }}>Elevo</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: "Ritual", to: "/ritual" },
              { label: "About", to: "/about" },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-jakarta text-sm transition-all hover:opacity-100 opacity-60"
                style={{ color: "#fdfdfd" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="font-jakarta text-xs" style={{ color: "#9da391" }}>
            © {new Date().getFullYear()} Elevo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;