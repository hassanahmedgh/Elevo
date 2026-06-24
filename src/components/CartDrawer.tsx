import React from "react";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ background: isOpen ? "rgba(57,63,56,0.18)" : "transparent", backdropFilter: isOpen ? "blur(4px)" : "none" }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: "min(420px, 92vw)",
          background: "#fdfdfd",
          boxShadow: isOpen ? "-8px 0 40px rgba(57,63,56,0.12)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <div>
            <h2 className="font-syne font-bold text-2xl" style={{ color: "#393f38" }}>Your Bag</h2>
            <p className="text-sm font-jakarta mt-0.5" style={{ color: "#9da391" }}>
              {items.length === 0 ? "Nothing yet" : `${items.reduce((s, i) => s + i.qty, 0)} item${items.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "#f0f0ee", color: "#393f38" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-8 mb-4 h-px" style={{ background: "rgba(157,163,145,0.15)" }} />

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#f5fae8" }}
              >
                <ShoppingBag size={28} style={{ color: "#d1f569" }} />
              </div>
              <p className="font-jakarta text-sm text-center" style={{ color: "#9da391" }}>
                Your bag is empty.<br />Add something beautiful.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ background: "#f5fae8" }}
                >
                  <img src={item.img_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-syne font-semibold text-sm leading-tight truncate" style={{ color: "#393f38" }}>
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: "#f0f0ee", color: "#9da391" }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                  {item.variant && (
                    <p className="text-xs font-jakarta mt-0.5" style={{ color: "#9da391" }}>{item.variant}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "#f0f0ee", color: "#393f38" }}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-jakarta text-sm font-medium w-4 text-center" style={{ color: "#393f38" }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "#d1f569", color: "#393f38" }}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="font-syne font-semibold text-sm" style={{ color: "#393f38" }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 pb-8 pt-4" style={{ borderTop: "1px solid rgba(157,163,145,0.15)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-jakarta text-sm" style={{ color: "#9da391" }}>Subtotal</span>
              <span className="font-syne font-bold text-lg" style={{ color: "#393f38" }}>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-syne font-semibold text-sm magnetic-btn group"
              style={{ background: "#393f38", color: "#fdfdfd" }}
            >
              Checkout
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="w-full mt-2 py-3 rounded-full font-jakarta text-sm text-center transition-all hover:bg-black/5"
              style={{ color: "#9da391" }}
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;