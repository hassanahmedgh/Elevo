import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Leaf, Droplets, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../components/ProductCard";
import ProductDetailOverlay from "../components/ProductDetailOverlay";
import FilterOverlay from "../components/FilterOverlay";
import type { FilterState } from "../components/FilterOverlay";
import FloatingNav from "../components/FloatingNav";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useProducts } from "../lib/products";

const pillars = [
  { icon: <Leaf size={20} />, label: "Botanical", desc: "Sourced from certified organic farms" },
  { icon: <Droplets size={20} />, label: "Pure", desc: "Zero fillers, zero compromise" },
  { icon: <Wind size={20} />, label: "Conscious", desc: "Carbon-neutral from seed to shelf" },
  { icon: <Sparkles size={20} />, label: "Ritual", desc: "Designed for intentional living" },
];

const Home: React.FC = () => {
  const { isOpen: cartOpen } = useCart();
  const { products } = useProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [gridInView, setGridInView] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>({ category: "All", priceRange: "All", mood: "All" });
  const [activeFilter, setActiveFilter] = useState("All");

  const quickFilters = ["All", "Serums", "Tonics", "Oils", "Supplements", "Ritual Sets"];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setGridInView(true); },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeFilter === "All" && filters.category === "All") return true;
    const cat = activeFilter !== "All" ? activeFilter : filters.category;
    if (cat === "Serums") return p.name.toLowerCase().includes("serum");
    if (cat === "Tonics") return p.name.toLowerCase().includes("tonic");
    if (cat === "Oils") return p.name.toLowerCase().includes("oil");
    if (cat === "Supplements") return p.subtitle.toLowerCase().includes("capsule") || p.subtitle.toLowerCase().includes("supplement");
    if (cat === "Ritual Sets") return p.name.toLowerCase().includes("set") || p.tag === "Bundle";
    return true;
  });

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${cartOpen ? "page-shifted" : "page-normal"}`}
      style={{ background: "#fdfdfd", transformOrigin: "left center" }}
    >
      <FloatingNav />
      <CartDrawer />
      {filterOpen && (
        <FilterOverlay
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onApply={setFilters}
        />
      )}
      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        style={{ background: "#fdfdfd" }}
      >
        {/* Parallax background layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.05s linear",
          }}
        >
          {/* Gradient blobs */}
          <div
            className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #d1f569 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #9da391 0%, transparent 70%)" }}
          />
        </div>

        {/* Typography layer, scrolls behind */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-center pl-8 md:pl-20 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <span
            className="font-jakarta text-xs uppercase tracking-widest mb-6 block"
            style={{ color: "#9da391" }}
          >
            Conscious Wellness · Est. 2021
          </span>
          <h1
            className="font-syne font-bold leading-none"
            style={{
              color: "#393f38",
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              letterSpacing: "-0.03em",
              maxWidth: "min(92vw, 600px)",
            }}
          >
            Live <br />
            <span style={{ color: "#d1f569", WebkitTextStroke: "2px #393f38", WebkitTextFillColor: "#d1f569" }}>
              Greener.
            </span>
          </h1>
          <p
            className="font-jakarta text-base md:text-lg mt-6 max-w-xs md:max-w-sm leading-relaxed"
            style={{ color: "#9da391" }}
          >
            Precision botanicals for the way you actually live. Clean, intentional, uncommonly effective.
          </p>
          <div className="flex items-center gap-4 mt-8 pointer-events-auto">
            <Link
              to="/shop"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-syne font-semibold text-sm magnetic-btn group"
              style={{ background: "#393f38", color: "#fdfdfd" }}
            >
              Shop the Range
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/ritual"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-jakarta text-sm transition-all hover:bg-black/5"
              style={{ color: "#393f38", border: "1px solid rgba(57,63,56,0.15)" }}
            >
              Our Ritual
            </Link>
          </div>
        </div>

        {/* Product image, right half on desktop so it never covers the headline */}
        <div
          className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <div
            className="relative"
            style={{
              width: "clamp(220px, 28vw, 420px)",
              filter: "drop-shadow(0 40px 80px rgba(209,245,105,0.4))",
            }}
          >
            <img className="w-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_1124a06e9e_95142b7091e3943b.png" alt="hero wellness glass bottle with green botanical serum floating on white background, dramatic studio " />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          style={{ transform: `translateY(${scrollY * 0.2}px) translateX(-50%)` }}
        >
          <div
            className="w-px h-12 origin-top"
            style={{
              background: "linear-gradient(to bottom, #9da391, transparent)",
              transform: `scaleY(${Math.max(0, 1 - scrollY / 200)})`,
            }}
          />
          <span className="font-jakarta text-xs" style={{ color: "#9da391" }}>scroll</span>
        </div>
      </section>

      {/* ═══ PILLARS ═══ */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className={`rise-in stagger-${i + 1} flex flex-col gap-3 p-6 rounded-3xl`}
              style={{ background: "#f7faf2" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#d1f569", color: "#393f38" }}
              >
                {p.icon}
              </div>
              <h4 className="font-syne font-semibold text-base" style={{ color: "#393f38" }}>{p.label}</h4>
              <p className="font-jakarta text-xs leading-relaxed" style={{ color: "#9da391" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className="py-16 md:py-24 px-6" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-jakarta text-xs uppercase tracking-widest mb-3" style={{ color: "#9da391" }}>
                Fresh in
              </p>
              <h2
                className="font-syne font-bold leading-none"
                style={{ color: "#393f38", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                New Arrivals
              </h2>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-2 flex-wrap">
              {quickFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 rounded-full font-jakarta text-xs transition-all duration-300"
                  style={{
                    background: activeFilter === f ? "#393f38" : "#f0f0ee",
                    color: activeFilter === f ? "#fdfdfd" : "#393f38",
                    fontWeight: activeFilter === f ? 600 : 400,
                  }}
                >
                  {f}
                </button>
              ))}
              <button
                onClick={() => setFilterOpen(true)}
                className="px-4 py-2 rounded-full font-jakarta text-xs border transition-all duration-300 hover:bg-black/5 ml-1"
                style={{ borderColor: "rgba(57,63,56,0.15)", color: "#393f38" }}
              >
                ⊕ More Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {(filteredProducts.length ? filteredProducts : products).map((product, i) => (
              <div key={product.id} className={`lime-shadow rounded-3xl`} style={{ background: "transparent" }}>
                <ProductCard
                  product={product}
                  staggerIndex={i}
                  inView={gridInView}
                  onExpand={setSelectedProduct}
                />
              </div>
            ))}
          </div>

          {/* View all CTA */}
          <div className="text-center mt-14">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-syne font-semibold text-sm magnetic-btn group"
              style={{ background: "#393f38", color: "#fdfdfd" }}
            >
              View Full Collection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ EDITORIAL BANNER ═══ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "#393f38",
              minHeight: 360,
            }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img className="w-full h-full object-cover opacity-30" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d19c06f589_7dc401e3a68e5ba9.png" alt="lush green botanical garden with morning mist, luxury wellness lifestyle editorial, wide angle" />
            </div>
            {/* Lime blob */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #d1f569 0%, transparent 65%)", transform: "translate(30%, -30%)" }}
            />

            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
              <div>
                <p className="font-jakarta text-xs uppercase tracking-widest mb-4" style={{ color: "#9da391" }}>
                  Our philosophy
                </p>
                <h2
                  className="font-syne font-bold leading-tight"
                  style={{ color: "#fdfdfd", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", maxWidth: "20ch" }}
                >
                  The ritual is the result.
                </h2>
              </div>
              <div className="max-w-xs">
                <p className="font-jakarta text-sm leading-relaxed mb-6" style={{ color: "rgba(253,253,253,0.6)" }}>
                  We believe that consistent, mindful practice, not shortcuts, creates lasting wellbeing. Every product we make serves a ritual, not a promise.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-semibold text-sm magnetic-btn group"
                  style={{ background: "#d1f569", color: "#393f38" }}
                >
                  Read Our Story
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;