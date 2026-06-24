import React, { useEffect, useRef, useState } from "react";
import FloatingNav from "../components/FloatingNav";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    number: "01",
    title: "Radical Transparency",
    desc: "We publish every ingredient, every sourcing decision, and every lab result. No hidden formulas. No proprietary blends.",
  },
  {
    number: "02",
    title: "Botanical Intelligence",
    desc: "We work with a small network of bioregional farms. Soil health, harvest timing, and extraction method are non-negotiable.",
  },
  {
    number: "03",
    title: "Ritual Over Routine",
    desc: "We design products that reward slow use. Our formats are intentional — never convenient for its own sake.",
  },
  {
    number: "04",
    title: "Carbon Transparency",
    desc: "We measure every gram of CO₂ in our supply chain, publish it annually, and act to reduce — not offset — our footprint.",
  },
];

const team = [
  {
    name: "Saoirse Mbeki",
    role: "Founder & Formulator",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_ce2e211b49_1c187c9b3f52afed.png",
  },
  {
    name: "Finn Adeyemi",
    role: "Head of Sourcing",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_12fe429a32_20565e10b26cec7a.png",
  },
  {
    name: "Lena Castillo",
    role: "Creative Director",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_876c121a09_fdde5beb7de2e503.png",
  },
];

const About: React.FC = () => {
  const { isOpen: cartOpen } = useCart();
  const [heroInView, setHeroInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeroInView(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${cartOpen ? "page-shifted" : "page-normal"}`}
      style={{ background: "#fdfdfd", transformOrigin: "left center" }}
    >
      <FloatingNav />
      <CartDrawer />

      {/* Hero */}
      <section className="pt-32 pb-0 px-6 overflow-hidden" ref={heroRef}>
        <div className="max-w-6xl mx-auto">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-6" style={{ color: "#9da391" }}>
            Our story
          </p>
          <h1
            className={`font-syne font-bold leading-none mb-0 ${heroInView ? "rise-in" : "opacity-0"}`}
            style={{ color: "#393f38", fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Elevo was born<br />
            <span style={{ color: "#d1f569", WebkitTextStroke: "2px #393f38", WebkitTextFillColor: "#d1f569" }}>
              in a kitchen.
            </span>
          </h1>
        </div>
      </section>

      {/* Split layout */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <div
              className="relative overflow-hidden rounded-3xl mb-6 group"
              style={{ aspectRatio: "4/5" }}
            >
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_4e6d62e340_ef8e47872e96126d.png" alt="founder in a botanical lab surrounded by plants and glass bottles, natural light, authentic wellness" />
              <div
                className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl"
                style={{ background: "rgba(253,253,253,0.9)", backdropFilter: "blur(12px)" }}
              >
                <p className="font-syne font-semibold text-sm" style={{ color: "#393f38" }}>
                  "I was tired of complexity masquerading as science. The best formulas are honest ones."
                </p>
                <p className="font-jakarta text-xs mt-2" style={{ color: "#9da391" }}>— Saoirse Mbeki, Founder</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="font-jakarta text-base leading-relaxed mb-6" style={{ color: "#393f38", opacity: 0.8, lineHeight: 1.85 }}>
              Elevo started as a personal project — a notebook filled with plant research, a weekend formulation practice, and a growing frustration with wellness brands that seemed to care more about packaging than plants.
            </p>
            <p className="font-jakarta text-base leading-relaxed mb-6" style={{ color: "#393f38", opacity: 0.8, lineHeight: 1.85 }}>
              In 2021, after three years of research partnerships with European bioregional farms and three rounds of clinical testing, we launched four products. We haven't rushed since.
            </p>
            <p className="font-jakarta text-base leading-relaxed mb-10" style={{ color: "#393f38", opacity: 0.8, lineHeight: 1.85 }}>
              Every product is made in batches of 500. Every batch is tested before it ships. And every formula is designed to earn a place in your life — not just your bathroom cabinet.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "500", label: "Units / batch" },
                { num: "47", label: "Verified farms" },
                { num: "3", label: "Years tested" },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-syne font-bold text-3xl mb-1" style={{ color: "#393f38" }}>{stat.num}</div>
                  <div className="font-jakarta text-xs" style={{ color: "#9da391" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6" style={{ background: "#f7faf2" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-4" style={{ color: "#9da391" }}>
            What we stand for
          </p>
          <h2
            className="font-syne font-bold mb-14"
            style={{ color: "#393f38", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {values.map((v, i) => (
              <div
                key={v.number}
                className="flex gap-6 p-8 border-b md:border-r transition-all duration-300 hover:bg-white group"
                style={{
                  borderColor: "rgba(157,163,145,0.15)",
                  borderRight: i % 2 === 0 ? "1px solid rgba(157,163,145,0.15)" : "none",
                }}
              >
                <span
                  className="font-syne font-bold text-5xl leading-none flex-shrink-0 opacity-20 group-hover:opacity-100 transition-all duration-500"
                  style={{ color: "#d1f569" }}
                >
                  {v.number}
                </span>
                <div>
                  <h3 className="font-syne font-semibold text-xl mb-3" style={{ color: "#393f38" }}>{v.title}</h3>
                  <p className="font-jakarta text-sm leading-relaxed" style={{ color: "#9da391", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-4" style={{ color: "#9da391" }}>
            The people
          </p>
          <h2
            className="font-syne font-bold mb-14"
            style={{ color: "#393f38", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Who We Are
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={member.name} className={`rise-in stagger-${i + 1} group`}>
                <div
                  className="relative overflow-hidden rounded-3xl mb-5"
                  style={{ aspectRatio: "3/4", background: "#f7faf2" }}
                >
                  <img
                    src={member.img_url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-syne font-semibold text-lg" style={{ color: "#393f38" }}>{member.name}</h3>
                <p className="font-jakarta text-sm" style={{ color: "#9da391" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: "#393f38" }}>
        <h2
          className="font-syne font-bold mb-6"
          style={{ color: "#fdfdfd", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          Ready to begin?
        </h2>
        <p className="font-jakarta text-base mb-10 max-w-sm mx-auto" style={{ color: "#9da391", lineHeight: 1.7 }}>
          Explore the collection and find the ritual that belongs in your life.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-syne font-semibold magnetic-btn group"
          style={{ background: "#d1f569", color: "#393f38" }}
        >
          Shop Now
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;