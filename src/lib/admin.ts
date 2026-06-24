import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "active" | "inactive" | "pending";
  joined: string;
}

export const SEED_ORDERS: Order[] = [
  { id: "ORD-2041", customer: "Aria Bennett", date: "2026-06-22", total: 160, status: "delivered", items: 2 },
  { id: "ORD-2040", customer: "Noah Fields", date: "2026-06-22", total: 92, status: "shipped", items: 1 },
  { id: "ORD-2039", customer: "Mia Soto", date: "2026-06-21", total: 264, status: "processing", items: 3 },
  { id: "ORD-2038", customer: "Liam Carter", date: "2026-06-21", total: 44, status: "pending", items: 1 },
  { id: "ORD-2037", customer: "Eva Lindqvist", date: "2026-06-20", total: 186, status: "delivered", items: 1 },
  { id: "ORD-2036", customer: "Jonah Reed", date: "2026-06-20", total: 130, status: "cancelled", items: 2 },
  { id: "ORD-2035", customer: "Sofia Marino", date: "2026-06-19", total: 78, status: "delivered", items: 1 },
];

export const SEED_CUSTOMERS: Customer[] = [
  { id: "CUS-101", name: "Aria Bennett", email: "aria@example.com", orders: 6, spent: 742, status: "active", joined: "2025-02" },
  { id: "CUS-102", name: "Noah Fields", email: "noah@example.com", orders: 2, spent: 168, status: "active", joined: "2025-09" },
  { id: "CUS-103", name: "Mia Soto", email: "mia@example.com", orders: 11, spent: 1486, status: "active", joined: "2024-07" },
  { id: "CUS-104", name: "Liam Carter", email: "liam@example.com", orders: 1, spent: 44, status: "pending", joined: "2026-06" },
  { id: "CUS-105", name: "Eva Lindqvist", email: "eva@example.com", orders: 4, spent: 612, status: "active", joined: "2025-04" },
  { id: "CUS-106", name: "Jonah Reed", email: "jonah@example.com", orders: 3, spent: 0, status: "inactive", joined: "2025-11" },
];

async function fetchSeeded<T extends { id: string }>(col: string, seed: T[]): Promise<T[]> {
  const snap = await getDocs(collection(db, col));
  if (snap.empty) {
    await Promise.all(seed.map((s) => setDoc(doc(db, col, s.id), s)));
    return [...seed];
  }
  return snap.docs.map((d) => d.data() as T);
}

export const fetchOrders = () => fetchSeeded<Order>("orders", SEED_ORDERS);
export const fetchCustomers = () => fetchSeeded<Customer>("customers", SEED_CUSTOMERS);

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await updateDoc(doc(db, "orders", id), { status });
}
