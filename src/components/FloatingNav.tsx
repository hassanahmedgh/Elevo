import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const FloatingNav: React.FC = () => {
  const { totalCount, toggleCart } = useCart();
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current + 10) {
        setVisible(false);
      } else if (current < lastScrollY.current - 5 || current < 60) {
        setVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Ritual", to: "/ritual" },
    { label: "About", to: "/about" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <div
      className="fixed top-6 left-1/2 z-50 transition-all duration-500"
      style={{
        transform: `translateX(-50%) translateY(${(visible || hovered) ? "0" : "-100px"})`,
        opacity: (visible || hovered) ? 1 : 0,
        pointerEvents: (visible || hovered) ? "auto" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <nav
        className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/60"
        style={{
          boxShadow: "0 8px 32px rgba(57,63,56,0.10), 0 1px 4px rgba(57,63,56,0.06)",
        }}
      >
        {/* Logo mark */}
        <Link to="/" className="mr-2 flex items-center gap-1.5 px-2 py-1">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-syne"
            style={{ background: "#d1f569", color: "#393f38" }}
          >
            V
          </div>
          <span className="font-syne font-700 text-sm hidden sm:block" style={{ color: "#393f38", fontWeight: 700 }}>
            Elevo
          </span>
        </Link>

        {/* Nav links */}
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-full text-sm font-jakarta transition-all duration-300 hidden sm:block ${
                isActive
                  ? "font-semibold"
                  : "hover:bg-black/5"
              }`}
              style={{
                color: isActive ? "#393f38" : "#9da391",
                background: isActive ? "#d1f569" : "transparent",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="relative ml-2 p-2 rounded-full hover:bg-black/5 transition-all duration-300 magnetic-btn"
          style={{ color: "#393f38" }}
          aria-label="Cart"
        >
          <ShoppingBag size={18} />
          {totalCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center font-jakarta"
              style={{ background: "#d1f569", color: "#393f38" }}
            >
              {totalCount > 9 ? "9+" : totalCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};

export default FloatingNav;