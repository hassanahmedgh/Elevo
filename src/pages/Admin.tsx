import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft,
  Plus, Pencil, Trash2, X, Leaf, TrendingUp, DollarSign,
} from "lucide-react";
import { useProducts, saveProduct, removeProduct, nextProductId } from "../lib/products";
import type { Product } from "../lib/products";
import { fetchOrders, fetchCustomers, updateOrderStatus } from "../lib/admin";
import type { Order, Customer } from "../lib/admin";

const FOREST = "#393f38";
const LIME = "#d1f569";
const SAGE = "#9da391";
const PAPER = "#fdfdfd";

type Tab = "dashboard" | "products" | "orders" | "customers";

const money = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

const Admin: React.FC = () => {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { products, live, reload, setProducts } = useProducts();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchOrders().then(setOrders).catch(() => {});
    fetchCustomers().then(setCustomers).catch(() => {});
  }, []);

  const stats = useMemo(() => {
    const liveOrders = orders.filter((o) => o.status !== "cancelled");
    const revenue = liveOrders.reduce((s, o) => s + o.total, 0);
    return {
      revenue,
      avg: liveOrders.length ? revenue / liveOrders.length : 0,
      orders: orders.length,
      products: products.length,
      customers: customers.length,
    };
  }, [orders, products, customers]);

  const openAdd = () => { setEditing(null); setShowForm(true); };
  const openEdit = (p: Product) => { setEditing(p); setShowForm(true); };

  const handleSave = async (p: Product) => {
    // optimistic local update
    setProducts((prev) => {
      const exists = prev.some((x) => x.id === p.id);
      return exists ? prev.map((x) => (x.id === p.id ? p : x)) : [...prev, p];
    });
    setShowForm(false);
    try { await saveProduct(p); await reload(); } catch { /* offline: keep local */ }
  };

  const handleDelete = async (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try { await removeProduct(id); await reload(); } catch { /* offline */ }
  };

  const handleStatus = async (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    try { await updateOrderStatus(id, status); } catch { /* offline */ }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { key: "products", label: "Products", icon: <Package size={18} /> },
    { key: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { key: "customers", label: "Customers", icon: <Users size={18} /> },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: PAPER, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 p-6 sticky top-0 h-screen" style={{ background: FOREST }}>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LIME }}>
            <Leaf size={18} color={FOREST} />
          </div>
          <span className="font-syne font-bold text-xl" style={{ color: PAPER }}>Elevo</span>
        </div>
        <nav className="flex flex-col gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left"
              style={tab === t.key
                ? { background: LIME, color: FOREST }
                : { color: "rgba(253,253,253,0.7)" }}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </nav>
        <Link to="/" className="mt-auto flex items-center gap-2 px-4 py-3 rounded-2xl text-sm" style={{ color: "rgba(253,253,253,0.6)" }}>
          <ArrowLeft size={16} /> Back to store
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b" style={{ borderColor: "rgba(57,63,56,0.08)" }}>
          <div>
            <h1 className="font-syne font-bold text-2xl md:text-3xl capitalize" style={{ color: FOREST }}>{tab}</h1>
            <p className="text-sm" style={{ color: SAGE }}>Elevo wellness · admin console</p>
          </div>
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={live ? { background: "rgba(16,185,129,0.12)", color: "#047857" } : { background: "rgba(245,158,11,0.14)", color: "#b45309" }}
          >
            ● {live ? "Firestore connected" : "Demo data, not saving"}
          </span>
        </header>

        <div className="p-6 md:p-10">
          {/* Offline banner */}
          {!live && (
            <div className="mb-6 rounded-2xl px-5 py-4 text-sm" style={{ background: "#fef3c7", border: "1px solid #fde68a", color: "#92400e" }}>
              <strong>Not connected to Firestore.</strong> Changes won't be saved. In Firebase Console → Firestore → Rules,
              publish the rules from <code>firestore.rules</code>, then reload.
            </div>
          )}

          {tab === "dashboard" && <Dashboard stats={stats} orders={orders} />}
          {tab === "products" && (
            <Products products={products} onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} />
          )}
          {tab === "orders" && <Orders orders={orders} onStatus={handleStatus} />}
          {tab === "customers" && <Customers customers={customers} />}
        </div>
      </main>

      {showForm && (
        <ProductForm
          product={editing}
          existing={products}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

/* ---------- Dashboard ---------- */
const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode }> = ({ label, value, sub, icon }) => (
  <div className="rounded-3xl p-6" style={{ background: PAPER, border: "1px solid rgba(57,63,56,0.1)" }}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm" style={{ color: SAGE }}>{label}</span>
      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: LIME, color: FOREST }}>{icon}</div>
    </div>
    <div className="font-syne font-bold text-3xl" style={{ color: FOREST }}>{value}</div>
    <div className="text-xs mt-1" style={{ color: SAGE }}>{sub}</div>
  </div>
);

const Dashboard: React.FC<{ stats: any; orders: Order[] }> = ({ stats, orders }) => {
  const chart = orders.slice(0, 7).reverse();
  const max = Math.max(1, ...chart.map((o) => o.total));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Revenue" value={money(stats.revenue)} sub={`${money(stats.avg)} avg order`} icon={<DollarSign size={16} />} />
        <StatCard label="Orders" value={String(stats.orders)} sub="all time" icon={<ShoppingCart size={16} />} />
        <StatCard label="Products" value={String(stats.products)} sub="in catalogue" icon={<Package size={16} />} />
        <StatCard label="Customers" value={String(stats.customers)} sub="registered" icon={<Users size={16} />} />
      </div>

      <div className="rounded-3xl p-6" style={{ background: FOREST }}>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={18} color={LIME} />
          <span className="font-syne font-semibold text-lg" style={{ color: PAPER }}>Recent revenue</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {chart.map((o) => (
            <div key={o.id} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-xl transition-all" style={{ height: `${(o.total / max) * 100}%`, background: LIME, minHeight: 6 }} title={`${o.id}: ${money(o.total)}`} />
              <span className="text-[10px]" style={{ color: SAGE }}>{o.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <Card title="Latest orders">
        <Table head={["Order", "Customer", "Date", "Total", "Status"]}>
          {orders.slice(0, 5).map((o) => (
            <tr key={o.id} className="border-t" style={{ borderColor: "rgba(57,63,56,0.07)" }}>
              <Td><span className="font-medium" style={{ color: FOREST }}>{o.id}</span></Td>
              <Td>{o.customer}</Td>
              <Td>{o.date}</Td>
              <Td><span className="font-semibold">{money(o.total)}</span></Td>
              <Td><StatusPill status={o.status} /></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};

/* ---------- Products ---------- */
const Products: React.FC<{ products: Product[]; onAdd: () => void; onEdit: (p: Product) => void; onDelete: (id: number) => void; }> = ({ products, onAdd, onEdit, onDelete }) => (
  <Card
    title={`Products (${products.length})`}
    action={
      <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold" style={{ background: FOREST, color: PAPER }}>
        <Plus size={16} /> Add product
      </button>
    }
  >
    <Table head={["Product", "Variant", "Price", "Tag", ""]}>
      {products.map((p) => (
        <tr key={p.id} className="border-t" style={{ borderColor: "rgba(57,63,56,0.07)" }}>
          <Td>
            <div className="flex items-center gap-3">
              <img src={p.img_url} alt={p.name} className="w-11 h-11 rounded-xl object-cover" style={{ background: "#eef1e8" }} />
              <span className="font-medium" style={{ color: FOREST }}>{p.name}</span>
            </div>
          </Td>
          <Td>{p.variant || "-"}</Td>
          <Td><span className="font-semibold">{money(p.price)}</span></Td>
          <Td>{p.tag ? <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: LIME, color: FOREST }}>{p.tag}</span> : <span style={{ color: SAGE }}>-</span>}</Td>
          <Td>
            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => onEdit(p)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(57,63,56,0.06)", color: FOREST }}><Pencil size={15} /></button>
              <button onClick={() => onDelete(p.id)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }}><Trash2 size={15} /></button>
            </div>
          </Td>
        </tr>
      ))}
    </Table>
  </Card>
);

/* ---------- Orders ---------- */
const Orders: React.FC<{ orders: Order[]; onStatus: (id: string, s: Order["status"]) => void }> = ({ orders, onStatus }) => (
  <Card title={`Orders (${orders.length})`}>
    <Table head={["Order", "Customer", "Date", "Items", "Total", "Status"]}>
      {orders.map((o) => (
        <tr key={o.id} className="border-t" style={{ borderColor: "rgba(57,63,56,0.07)" }}>
          <Td><span className="font-medium" style={{ color: FOREST }}>{o.id}</span></Td>
          <Td>{o.customer}</Td>
          <Td>{o.date}</Td>
          <Td>{o.items}</Td>
          <Td><span className="font-semibold">{money(o.total)}</span></Td>
          <Td>
            <select
              value={o.status}
              onChange={(e) => onStatus(o.id, e.target.value as Order["status"])}
              className="rounded-full px-3 py-1.5 text-xs font-medium outline-none"
              style={{ background: "rgba(57,63,56,0.06)", color: FOREST }}
            >
              {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </Td>
        </tr>
      ))}
    </Table>
  </Card>
);

/* ---------- Customers ---------- */
const Customers: React.FC<{ customers: Customer[] }> = ({ customers }) => (
  <Card title={`Customers (${customers.length})`}>
    <Table head={["Customer", "Email", "Orders", "Spent", "Joined", "Status"]}>
      {customers.map((c) => (
        <tr key={c.id} className="border-t" style={{ borderColor: "rgba(57,63,56,0.07)" }}>
          <Td>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: LIME, color: FOREST }}>{c.name[0]}</div>
              <span className="font-medium" style={{ color: FOREST }}>{c.name}</span>
            </div>
          </Td>
          <Td>{c.email}</Td>
          <Td>{c.orders}</Td>
          <Td><span className="font-semibold">{money(c.spent)}</span></Td>
          <Td>{c.joined}</Td>
          <Td><StatusPill status={c.status} /></Td>
        </tr>
      ))}
    </Table>
  </Card>
);

/* ---------- Product form modal ---------- */
const ProductForm: React.FC<{ product: Product | null; existing: Product[]; onClose: () => void; onSave: (p: Product) => void; }> = ({ product, existing, onClose, onSave }) => {
  const [form, setForm] = useState<Product>(
    product || { id: nextProductId(existing), name: "", subtitle: "", price: 0, tag: "", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_58face2f01_65fe00ea22b54e39.png", lifestyle_img_url: "", variant: "" }
  );
  const set = (k: keyof Product, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.price) return;
    onSave({ ...form, price: Number(form.price), lifestyle_img_url: form.lifestyle_img_url || form.img_url });
  };

  const field = "w-full rounded-2xl px-4 py-3 text-sm outline-none";
  const fieldStyle = { background: "#f4f6f0", border: "1px solid rgba(57,63,56,0.1)", color: FOREST } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(57,63,56,0.45)" }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl p-7" style={{ background: PAPER }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-syne font-bold text-xl" style={{ color: FOREST }}>{product ? "Edit product" : "New product"}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(57,63,56,0.06)", color: FOREST }}><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input className={field} style={fieldStyle} placeholder="Product name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <input className={field} style={fieldStyle} placeholder="Subtitle (e.g. Brightening · 30ml)" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input className={field} style={fieldStyle} type="number" placeholder="Price" value={form.price || ""} onChange={(e) => set("price", e.target.value)} />
            <input className={field} style={fieldStyle} placeholder="Variant (e.g. 30ml)" value={form.variant} onChange={(e) => set("variant", e.target.value)} />
          </div>
          <input className={field} style={fieldStyle} placeholder="Tag (New / Bestseller / Bundle…)" value={form.tag} onChange={(e) => set("tag", e.target.value)} />
          <input className={field} style={fieldStyle} placeholder="Image URL" value={form.img_url} onChange={(e) => set("img_url", e.target.value)} />
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={submit} className="flex-1 py-3 rounded-full font-semibold text-sm" style={{ background: FOREST, color: PAPER }}>Save product</button>
          <button onClick={onClose} className="px-6 py-3 rounded-full font-semibold text-sm" style={{ background: "rgba(57,63,56,0.06)", color: FOREST }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

/* ---------- shared bits ---------- */
const Card: React.FC<{ title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ title, action, children }) => (
  <div className="rounded-3xl overflow-hidden" style={{ background: PAPER, border: "1px solid rgba(57,63,56,0.1)" }}>
    <div className="flex items-center justify-between px-6 py-5">
      <h3 className="font-syne font-semibold text-lg" style={{ color: FOREST }}>{title}</h3>
      {action}
    </div>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const Table: React.FC<{ head: string[]; children: React.ReactNode }> = ({ head, children }) => (
  <table className="w-full text-sm" style={{ color: "#475247" }}>
    <thead>
      <tr style={{ background: "rgba(57,63,56,0.03)" }}>
        {head.map((h, i) => (
          <th key={i} className={`px-6 py-3 font-semibold text-xs uppercase tracking-wide ${i === head.length - 1 ? "text-right" : "text-left"}`} style={{ color: SAGE }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => <td className="px-6 py-4 align-middle">{children}</td>;

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { bg: string; c: string }> = {
    delivered: { bg: "rgba(16,185,129,0.12)", c: "#047857" },
    active: { bg: "rgba(16,185,129,0.12)", c: "#047857" },
    shipped: { bg: "rgba(59,130,246,0.12)", c: "#1d4ed8" },
    processing: { bg: "rgba(99,102,241,0.12)", c: "#4338ca" },
    pending: { bg: "rgba(245,158,11,0.14)", c: "#b45309" },
    cancelled: { bg: "rgba(239,68,68,0.12)", c: "#dc2626" },
    inactive: { bg: "rgba(57,63,56,0.08)", c: "#6b746a" },
  };
  const s = map[status] || map.inactive;
  return <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: s.bg, color: s.c }}>{status}</span>;
};

export default Admin;
