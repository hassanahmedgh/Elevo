import React, { useState } from "react";
import { X, Plus, Minus, ArrowRight, Star } from "lucide-react";
import { useCart } from "./CartContext";
import type { Product } from "./ProductCard";

interface ProductDetailOverlayProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailOverlay: React.FC<ProductDetailOverlayProps> = ({ product, onClose }) => {
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images = [product.img_url, product.lifestyle_img_url];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        img_url: product.img_url,
        variant: product.variant,
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(57,63,56,0.25)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row relative"
        style={{ maxHeight: "90vh", boxShadow: "0 40px 80px rgba(57,63,56,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "#f0f0ee", color: "#393f38" }}
        >
          <X size={16} />
        </button>

        {/* Image panel */}
        <div className="md:w-1/2 flex-shrink-0 relative overflow-hidden" style={{ background: "#f5fae8", minHeight: 300 }}>
          <img
            src={images[activeImg]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ minHeight: 300 }}
          />
          {/* Thumbnail switcher */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className="w-12 h-12 rounded-xl overflow-hidden border-2 transition-all"
                style={{
                  borderColor: activeImg === idx ? "#d1f569" : "transparent",
                  opacity: activeImg === idx ? 1 : 0.6,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {product.tag && (
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-jakarta font-semibold mb-4"
                style={{ background: "#d1f569", color: "#393f38" }}
              >
                {product.tag}
              </span>
            )}
            <h2 className="font-syne font-bold text-3xl mb-2 leading-tight" style={{ color: "#393f38" }}>
              {product.name}
            </h2>
            <p className="font-jakarta text-sm mb-1" style={{ color: "#9da391" }}>{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 my-4">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} fill={s <= 4 ? "#d1f569" : "none"} stroke={s <= 4 ? "#d1f569" : "#9da391"} />
              ))}
              <span className="font-jakarta text-xs ml-1" style={{ color: "#9da391" }}>4.8 · 124 reviews</span>
            </div>

            <p className="font-jakarta text-sm leading-relaxed mb-6" style={{ color: "#393f38", opacity: 0.8 }}>
              A carefully formulated ritual essential, crafted from responsibly sourced botanicals. 
              Pure in composition, intentional in effect — designed to integrate seamlessly into your daily wellness practice.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Vegan", "Cruelty-Free", "Sustainably Sourced", "Clinically Tested"].map(b => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs font-jakarta"
                  style={{ background: "#f0f0ee", color: "#393f38" }}
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-syne font-bold text-3xl" style={{ color: "#393f38" }}>
                ${product.price}
              </span>
            </div>
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full px-4 py-2" style={{ background: "#f0f0ee" }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "#e0e0dc", color: "#393f38" }}
              >
                <Minus size={12} />
              </button>
              <span className="font-syne font-semibold text-base w-4 text-center" style={{ color: "#393f38" }}>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "#d1f569", color: "#393f38" }}
              >
                <Plus size={12} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-syne font-semibold text-sm magnetic-btn transition-all duration-300"
              style={{
                background: added ? "#d1f569" : "#393f38",
                color: added ? "#393f38" : "#fdfdfd",
              }}
            >
              {added ? "Added!" : "Add to Bag"}
              {!added && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailOverlay;