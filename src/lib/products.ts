import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "../components/ProductCard";

export type { Product };

const COL = "products";

// Bundled catalogue — also used to seed Firestore on first run and as an
// offline fallback if the database can't be reached.
export const SEED_PRODUCTS: Product[] = [
  { id: 1, name: "Clarity Serum", subtitle: "Brightening · 30ml", price: 68, tag: "New", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_58face2f01_65fe00ea22b54e39.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a0c2dc2f23_9774243ad2840e3c.png", variant: "30ml" },
  { id: 2, name: "Forest Tonic", subtitle: "Adaptogenic Blend · 50ml", price: 54, img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_872dd3ba75_085c850857a78503.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e404c2fdf9_53d8d7196491fced.png", variant: "50ml" },
  { id: 3, name: "Dew Face Oil", subtitle: "Hydrating · 20ml", price: 92, tag: "Bestseller", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7edb615bc9_925d80e4a80cfb3c.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6a935ceb53_2816058eed1dda5a.png", variant: "20ml" },
  { id: 4, name: "Ritual Set", subtitle: "Morning Collection · 3 pieces", price: 186, tag: "Bundle", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6033e534a9_913be5271ad13c05.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2c2ffa7283_d80e36a239a72d2c.png", variant: "Set of 3" },
  { id: 5, name: "Green Elixir", subtitle: "Detox · 100ml", price: 44, img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_963aaec39f_321173025ca67da6.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e1f6304c92_3678a49f4e24960c.png", variant: "100ml" },
  { id: 6, name: "Calm Complex", subtitle: "Adaptogenic · Capsules 60ct", price: 78, img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_f1b871a8a5_4a608900c87da922.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_3c23fc89ed_f8c748c70216a8ff.png", variant: "60 capsules" },
  { id: 7, name: "Moonrise Balm", subtitle: "Night Recovery · 50ml", price: 58, tag: "New", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_08254e8448_94177eef8bc4fa44.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b86f54f45b_154caf5c0ae94596.png", variant: "50ml" },
  { id: 8, name: "Glow Mist", subtitle: "Facial Spray · 100ml", price: 36, img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d64d33eb82_b276caad1f631bb2.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_0cded32c16_b392b80017d5e368.png", variant: "100ml" },
  { id: 9, name: "Root Complex", subtitle: "Grounding Blend · 30ml", price: 84, tag: "Limited", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_4fe661e74a_bdaa2988291d9f6c.png", lifestyle_img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_0a18d31d67_6f5deaf6a1c9649b.png", variant: "30ml" },
];

export async function fetchProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COL));
  if (snap.empty) {
    // First run — seed the database with the bundled catalogue.
    await Promise.all(SEED_PRODUCTS.map((p) => setDoc(doc(db, COL, String(p.id)), p)));
    return [...SEED_PRODUCTS];
  }
  return snap.docs.map((d) => d.data() as Product).sort((a, b) => a.id - b.id);
}

export async function saveProduct(p: Product): Promise<void> {
  await setDoc(doc(db, COL, String(p.id)), p);
}

export async function removeProduct(id: number): Promise<void> {
  await deleteDoc(doc(db, COL, String(id)));
}

export function nextProductId(list: Product[]): number {
  return (list.length ? Math.max(...list.map((p) => p.id)) : 0) + 1;
}

/** Storefront hook — loads live products, falls back to seed data. */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      const p = await fetchProducts();
      setProducts(p);
      setLive(true);
    } catch (e) {
      console.warn("[Elevo] Firestore unavailable — using seed catalogue.", e);
      setLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  return { products, loading, live, reload, setProducts };
}
