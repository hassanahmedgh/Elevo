import React, { useRef, useState } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { useCart } from "./CartContext";

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  tag?: string;
  img_url: string;
  lifestyle_img_url: string;
  variant?: string;
}

interface ProductCardProps {
  product: Product;
  staggerIndex?: number;
  onExpand?: (product: Product) => void;
  inView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, staggerIndex = 0, onExpand, inView = true }) => {
  const { addItem, openCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [flyActive, setFlyActive] = useState(false);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const [btnMagnetPos, setBtnMagnetPos] = useState({ x: 0, y: 0 });

  const staggerClass = `stagger-${Math.min(staggerIndex + 1, 8)}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.04;
    const dy = (e.clientY - cy) * 0.04;
    setMagnetPos({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
    setBtnMagnetPos({ x: 0, y: 0 });
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    setBtnMagnetPos({ x: dx, y: dy });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlyActive(true);
    setTimeout(() => {
      setFlyActive(false);
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        img_url: product.img_url,
        variant: product.variant,
      });
      openCart();
    }, 600);
  };

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer select-none ${inView ? `rise-in ${staggerClass}` : "opacity-0"}`}
      style={{
        transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)`,
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExpand?.(product)}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-3xl mb-4"
        style={{
          aspectRatio: "3/4",
          background: "#f5fae8",
        }}
      >
        {/* Tag */}
        {product.tag && (
          <div
            className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-jakarta font-semibold"
            style={{ background: "#d1f569", color: "#393f38" }}
          >
            {product.tag}
          </div>
        )}

        {/* Primary image */}
        <img
          src={product.img_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Lifestyle hover image (morph) */}
        <img
          src={product.lifestyle_img_url}
          alt={`${product.name} lifestyle`}
          className="img-morph-overlay rounded-3xl"
          style={{ borderRadius: "inherit" }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4"
          style={{ background: "linear-gradient(to top, rgba(57,63,56,0.3), transparent)" }}
        >
          <button
            className="w-full py-3 rounded-full font-syne font-semibold text-sm flex items-center justify-center gap-2 magnetic-btn relative overflow-hidden"
            style={{
              background: "#fdfdfd",
              color: "#393f38",
              transform: `translate(${btnMagnetPos.x}px, ${btnMagnetPos.y}px)`,
            }}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={() => setBtnMagnetPos({ x: 0, y: 0 })}
            onClick={handleAddToCart}
          >
            {/* Flying ghost icon */}
            {flyActive && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fly-to-cart pointer-events-none">
                <ShoppingBag size={18} style={{ color: "#393f38" }} />
              </span>
            )}
            <Plus size={15} className={flyActive ? "opacity-0" : ""} />
            <span className={flyActive ? "opacity-0" : ""}>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="font-syne font-semibold text-base leading-tight group-hover:underline underline-offset-2"
              style={{ color: "#393f38" }}
            >
              {product.name}
            </h3>
            <p className="font-jakarta text-xs mt-0.5" style={{ color: "#9da391" }}>
              {product.subtitle}
            </p>
          </div>
          <span className="font-syne font-bold text-base flex-shrink-0 ml-2" style={{ color: "#393f38" }}>
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;