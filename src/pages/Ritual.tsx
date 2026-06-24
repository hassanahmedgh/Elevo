import React, { useEffect, useRef, useState } from "react";
import FloatingNav from "../components/FloatingNav";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { ArrowRight, Sun, Moon, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const ritualSteps = [
  {
    time: "07:00",
    label: "Dawn",
    icon: <Sun size={20} />,
    name: "Morning Activation",
    desc: "Begin with our Green Elixir, a single daily dose of concentrated botanical adaptogens. Shake, pour, and pause for sixty seconds of stillness before the day begins.",
    products: ["Green Elixir", "Clarity Serum"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_f87a12a4ba_125c8166f5a2f8b5.png",
  },
  {
    time: "12:00",
    label: "Noon",
    icon: <Leaf size={20} />,
    name: "Midday Reset",
    desc: "A moment of grounding. Our Forest Tonic in water reminds your nervous system to pause. Keep it on your desk. Ritual as interruption.",
    products: ["Forest Tonic", "Calm Complex"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e81f3b3ee5_8fd9cf8d1afae712.png",
  },
  {
    time: "21:00",
    label: "Dusk",
    icon: <Moon size={20} />,
    name: "Evening Restore",
    desc: "The ritual deepens at night. Two drops of Dew Face Oil, three minutes of gentle massage. Let restoration happen while you sleep.",
    products: ["Dew Face Oil", "Moonrise Balm"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_09c1745153_49fd5fdbda392934.png",
  },
];

const Ritual: React.FC = () => {
  const { isOpen: cartOpen } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState<boolean[]>([false, false, false]);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(prev => { const next = [...prev]; next[i] = true; return next; });
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${cartOpen ? "page-shifted" : "page-normal"}`}
      style={{ background: "#fdfdfd", transformOrigin: "left center" }}
    >
      <FloatingNav />
      <CartDrawer />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6">
        {/* Background */}
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2e6e3dd7cf_e870de6cc0cde1aa.png" alt="serene botanical garden at dawn with mist and green plants, peaceful wellness atmosphere, editorial " />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(253,253,253,0.6), rgba(253,253,253,0.85), rgba(253,253,253,1))" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-8" style={{ color: "#9da391" }}>
            A daily practice
          </p>
          <h1
            className="font-syne font-bold leading-none mb-6"
            style={{ color: "#393f38", fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
          >
            The Elevo Ritual
          </h1>
          <p className="font-jakarta text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: "#9da391" }}>
            Not a supplement. Not a skincare product. A practice, designed around the rhythm of your day and the wisdom of plants.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #9da391, transparent)" }} />
          <span className="font-jakarta text-xs" style={{ color: "#9da391" }}>explore the ritual</span>
        </div>
      </section>

      {/* Step indicators */}
      <div className="sticky top-24 z-20 flex justify-center gap-8 py-4 px-6" style={{ background: "rgba(253,253,253,0.9)", backdropFilter: "blur(12px)" }}>
        {ritualSteps.map((step, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveStep(i);
              stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="flex flex-col items-center gap-1 transition-all duration-300"
          >
            <span
              className="font-jakarta text-xs font-semibold"
              style={{ color: activeStep === i ? "#393f38" : "#9da391" }}
            >
              {step.time}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: activeStep === i ? "#d1f569" : "#9da391" }}
            />
            <span
              className="font-jakarta text-xs hidden sm:block"
              style={{ color: activeStep === i ? "#9da391" : "transparent" }}
            >
              {step.label}
            </span>
          </button>
        ))}
      </div>

      {/* Ritual Steps */}
      {ritualSteps.map((step, i) => (
        <section
          key={i}
          ref={el => (stepRefs.current[i] = el)}
          className={`py-20 md:py-28 px-6 ${i % 2 === 1 ? "" : ""}`}
          style={{ background: i % 2 === 1 ? "#f7faf2" : "#fdfdfd" }}
          onMouseEnter={() => setActiveStep(i)}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image, alternates sides */}
            <div className={`${i % 2 === 1 ? "md:order-2" : ""} ${inView[i] ? "rise-in" : "opacity-0"}`}>
              <div
                className="relative overflow-hidden rounded-3xl group"
                style={{ aspectRatio: "4/5" }}
              >
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={step.img_url} />
                {/* Time badge */}
                <div
                  className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(253,253,253,0.9)", backdropFilter: "blur(8px)" }}
                >
                  <div style={{ color: "#393f38" }}>{step.icon}</div>
                  <span className="font-syne font-semibold text-sm" style={{ color: "#393f38" }}>{step.time}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`${i % 2 === 1 ? "md:order-1" : ""} ${inView[i] ? `rise-in stagger-2` : "opacity-0"}`}>
              <p className="font-jakarta text-xs uppercase tracking-widest mb-4" style={{ color: "#9da391" }}>
                Step {i + 1} · {step.label}
              </p>
              <h2
                className="font-syne font-bold mb-6"
                style={{ color: "#393f38", fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                {step.name}
              </h2>
              <p className="font-jakarta text-base leading-relaxed mb-8" style={{ color: "#9da391", lineHeight: 1.8 }}>
                {step.desc}
              </p>

              {/* Featured products */}
              <div className="flex flex-wrap gap-3 mb-8">
                {step.products.map(p => (
                  <span
                    key={p}
                    className="px-4 py-2 rounded-full font-jakarta text-sm"
                    style={{ background: "#d1f569", color: "#393f38", fontWeight: 500 }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-semibold text-sm magnetic-btn group"
                style={{ background: "#393f38", color: "#fdfdfd" }}
              >
                Shop This Step
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#f7faf2" }}>
        <p className="font-jakarta text-xs uppercase tracking-widest mb-6" style={{ color: "#9da391" }}>Begin today</p>
        <h2
          className="font-syne font-bold mb-8"
          style={{ color: "#393f38", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          Start Your Practice
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-syne font-semibold magnetic-btn group"
          style={{ background: "#393f38", color: "#fdfdfd" }}
        >
          Build Your Ritual
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Ritual;