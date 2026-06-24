import React, { useEffect, useRef, useState } from "react";
import FloatingNav from "../components/FloatingNav";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import type { Product } from "../components/ProductCard";
import ProductDetailOverlay from "../components/ProductDetailOverlay";
import FilterOverlay from "../components/FilterOverlay";
import type { FilterState } from "../components/FilterOverlay";
import { useCart } from "../components/CartContext";
import { useProducts } from "../lib/products";
import { SlidersHorizontal, Search, X } from "lucide-react";


const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest First"];

const Shop: React.FC = () => {
  const { isOpen: cartOpen } = useCart();
  const { products: allProducts } = useProducts();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>({ category: "All", priceRange: "All", mood: "All" });
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const getFiltered = () => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category !== "All") {
      const cat = filters.category.toLowerCase();
      result = result.filter(p => {
        if (cat === "serums") return p.name.toLowerCase().includes("serum");
        if (cat === "tonics") return p.name.toLowerCase().includes("tonic");
        if (cat === "oils") return p.name.toLowerCase().includes("oil") || p.name.toLowerCase().includes("balm");
        if (cat === "supplements") return p.subtitle.toLowerCase().includes("capsule") || p.name.toLowerCase().includes("complex");
        if (cat === "ritual sets") return p.name.toLowerCase().includes("set") || p.tag === "Bundle";
        return true;
      });
    }

    if (filters.priceRange !== "All") {
      result = result.filter(p => {
        if (filters.priceRange === "Under $40") return p.price < 40;
        if (filters.priceRange === "$40–$80") return p.price >= 40 && p.price <= 80;
        if (filters.priceRange === "$80–$150") return p.price > 80 && p.price <= 150;
        if (filters.priceRange === "$150+") return p.price > 150;
        return true;
      });
    }

    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest First") result = result.filter(p => p.tag === "New").concat(result.filter(p => p.tag !== "New"));

    return result;
  };

  const filtered = getFiltered();
  const activeFilterCount = [
    filters.category !== "All",
    filters.priceRange !== "All",
    filters.mood !== "All",
  ].filter(Boolean).length;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${cartOpen ? "page-shifted" : "page-normal"}`}
      style={{ background: "#fdfdfd", transformOrigin: "left center" }}
    >
      <FloatingNav />
      <CartDrawer />
      <FilterOverlay
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: "#f7faf2" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-jakarta text-xs uppercase tracking-widest mb-4" style={{ color: "#9da391" }}>
            The Collection
          </p>
          <h1
            className="font-syne font-bold mb-4"
            style={{ color: "#393f38", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            Shop All
          </h1>
          <p className="font-jakarta text-base max-w-md" style={{ color: "#9da391", lineHeight: 1.7 }}>
            Every formula begins with a question: what does your body actually need? Browse the full range.
          </p>
        </div>
      </section>

      {/* Filter + Search Bar */}
      <section className="sticky top-0 z-30 px-6 py-4 border-b" style={{ background: "rgba(253,253,253,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(157,163,145,0.15)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#9da391" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full font-jakarta text-sm outline-none transition-all"
              style={{
                background: "#f0f0ee",
                color: "#393f38",
                border: "1px solid transparent",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#d1f569")}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} style={{ color: "#9da391" }} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-jakarta text-sm transition-all hover:bg-black/5 relative"
              style={{ background: activeFilterCount > 0 ? "#393f38" : "#f0f0ee", color: activeFilterCount > 0 ? "#fdfdfd" : "#393f38" }}
            >
              <SlidersHorizontal size={14} />
              Filter
              {activeFilterCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: "#d1f569", color: "#393f38" }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="font-jakarta text-xs hidden sm:block" style={{ color: "#9da391" }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-full font-jakarta text-xs outline-none cursor-pointer appearance-none"
                style={{ background: "#f0f0ee", color: "#393f38", border: "none" }}
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Results count */}
            <span className="font-jakarta text-xs ml-auto" style={{ color: "#9da391" }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-6" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-syne font-semibold text-2xl mb-3" style={{ color: "#393f38" }}>No products found</p>
              <p className="font-jakarta text-sm" style={{ color: "#9da391" }}>Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
              {filtered.map((product, i) => (
                <div key={product.id} className="lime-shadow rounded-3xl">
                  <ProductCard
                    product={product}
                    staggerIndex={i}
                    inView={inView}
                    onExpand={setSelectedProduct}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;