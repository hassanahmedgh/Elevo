import React, { useState } from "react";
import { X } from "lucide-react";

export type FilterState = {
  category: string;
  priceRange: string;
  mood: string;
};

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (f: FilterState) => void;
}

const categories = ["All", "Serums", "Tonics", "Oils", "Supplements", "Ritual Sets"];
const priceRanges = ["All", "Under $40", "$40–$80", "$80–$150", "$150+"];
const moods = ["All", "Energise", "Calm", "Restore", "Protect", "Glow"];

const FilterOverlay: React.FC<FilterOverlayProps> = ({ isOpen, onClose, filters, onApply }) => {
  const [local, setLocal] = useState<FilterState>(filters);

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const handleReset = () => {
    const reset: FilterState = { category: "All", priceRange: "All", mood: "All" };
    setLocal(reset);
    onApply(reset);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(24px)", background: "rgba(253,253,253,0.85)" }}
    >
      <div className="w-full max-w-3xl px-6 py-12 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "#f0f0ee", color: "#393f38" }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <p className="font-jakarta text-xs uppercase tracking-widest mb-8" style={{ color: "#9da391" }}>
          Filter & Sort
        </p>

        {/* Category */}
        <div className="mb-10">
          <h3 className="font-syne font-bold text-2xl mb-5" style={{ color: "#393f38" }}>Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setLocal((p) => ({ ...p, category: c }))}
                className="px-5 py-2.5 rounded-full font-jakarta text-sm transition-all duration-300"
                style={{
                  background: local.category === c ? "#393f38" : "#f0f0ee",
                  color: local.category === c ? "#fdfdfd" : "#393f38",
                  fontWeight: local.category === c ? 600 : 400,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-10">
          <h3 className="font-syne font-bold text-2xl mb-5" style={{ color: "#393f38" }}>Price</h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map((p) => (
              <button
                key={p}
                onClick={() => setLocal((prev) => ({ ...prev, priceRange: p }))}
                className="px-5 py-2.5 rounded-full font-jakarta text-sm transition-all duration-300"
                style={{
                  background: local.priceRange === p ? "#d1f569" : "#f0f0ee",
                  color: "#393f38",
                  fontWeight: local.priceRange === p ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="mb-12">
          <h3 className="font-syne font-bold text-2xl mb-5" style={{ color: "#393f38" }}>Ritual Mood</h3>
          <div className="flex flex-wrap gap-3">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setLocal((prev) => ({ ...prev, mood: m }))}
                className="px-5 py-2.5 rounded-full font-jakarta text-sm transition-all duration-300"
                style={{
                  background: local.mood === m ? "#393f38" : "#f0f0ee",
                  color: local.mood === m ? "#fdfdfd" : "#393f38",
                  fontWeight: local.mood === m ? 600 : 400,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleApply}
            className="px-10 py-3.5 rounded-full font-syne font-semibold text-sm magnetic-btn"
            style={{ background: "#393f38", color: "#fdfdfd" }}
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3.5 rounded-full font-jakarta text-sm transition-all hover:bg-black/5"
            style={{ color: "#9da391" }}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;