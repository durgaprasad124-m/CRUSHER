"use client";

import { useMemo, useState } from "react";

type Material = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: string;
  accent: string;
};

const UNIT_WEIGHT = 4200;
const BUSINESS_PHONE = "+1 (800) 555-0147";
const DELIVERY_CHARGES = {
  standard: 1800,
  express: 3200,
};

const materials: Material[] = [
  {
    id: "sand",
    name: "Sand",
    description: "Clean, well-graded construction sand for masonry and plaster work.",
    price: 760,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    availability: "Ready for delivery today",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "stone-aggregate",
    name: "Stone Aggregate",
    description: "Durable aggregate mix ideal for foundations, driveways, and concrete.",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    availability: "Limited stock available",
    accent: "from-slate-600 to-zinc-700",
  },
  {
    id: "gravel",
    name: "Gravel",
    description: "Strong, drainage-friendly gravel suited for roads, slabs, and yards.",
    price: 840,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    availability: "Available in bulk",
    accent: "from-yellow-500 to-amber-600",
  },
  {
    id: "crushed-stone",
    name: "Crushed Stone",
    description: "High-strength stone for sub-base, drainage layers, and heavy fill.",
    price: 1025,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
    availability: "Available across local sites",
    accent: "from-stone-500 to-slate-700",
  },
  {
    id: "metal-aggregate",
    name: "Metal Aggregate",
    description: "Reinforced aggregate blend for structural concrete and paving work.",
    price: 1180,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    availability: "Stock arriving this week",
    accent: "from-neutral-500 to-zinc-700",
  },
  {
    id: "other-materials",
    name: "Other Materials",
    description: "Custom construction materials managed by the site administrator.",
    price: 900,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    availability: "Configured by admin",
    accent: "from-orange-500 to-yellow-500",
  },
];

const steps = [
  "Select Material",
  "Enter Quantity",
  "Add Delivery Details",
  "Confirm Order",
];

const trustPoints = [
  "Convenient ordering",
  "Transparent pricing",
  "Delivery coordination",
  "Customer support",
];

const testimonials = [
  {
    name: "Amelia R.",
    quote:
      "The ordering process was simple and the delivery was exactly on time. The material quality was excellent for our home extension.",
  },
  {
    name: "Nathan W.",
    quote:
      "Clear pricing, fast coordination, and helpful advice. We ordered gravel and sand for a large driveway project without any stress.",
  },
  {
    name: "David K.",
    quote:
      "Professional service from the first call to the final delivery. The team understood our site requirements and delivered without delay.",
  },
];

const faqs = [
  {
    question: "How do I place a material order?",
    answer:
      "Choose the material, enter the quantity in units, fill in your delivery details, and confirm the order. The team will review and arrange delivery.",
  },
  {
    question: "What does 1 unit mean?",
    answer:
      "The business convention is 1 unit = 4,200 weight units. This is shown clearly in the ordering summary before confirmation.",
  },
  {
    question: "Can I book by phone instead?",
    answer:
      "Yes. Use the call-to-book option on the site or call the business directly to arrange your order with the support team.",
  },
  {
    question: "Are delivery charges included in the estimate?",
    answer:
      "Yes. The order summary includes the material subtotal, delivery charges, and any configurable additional charge before you confirm the order.",
  },
];

const customerOrders = [
  { id: "#CR-1042", status: "Pending", total: "KSh 14,200", material: "Sand" },
  { id: "#CR-1061", status: "Preparing", total: "KSh 27,400", material: "Stone Aggregate" },
  { id: "#CR-1093", status: "Delivered", total: "KSh 19,850", material: "Crushed Stone" },
];

const statusStyles: { [key: string]: string } = {
  Pending: "bg-amber-100 text-amber-700",
  Preparing: "bg-sky-100 text-sky-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Accepted: "bg-indigo-100 text-indigo-700",
  Dispatched: "bg-violet-100 text-violet-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function Home() {
  const [selectedMaterialId, setSelectedMaterialId] = useState("sand");
  const [quantity, setQuantity] = useState(3);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    materialId: "sand",
    quantity: 3,
    address: "",
    city: "",
    instructions: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [deliveryCharge, setDeliveryCharge] = useState(DELIVERY_CHARGES.standard);

  const selectedMaterial = useMemo(
    () =>
      materials.find((material) => material.id === selectedMaterialId) ?? materials[0],
    [selectedMaterialId],
  );

  const activeMaterial = useMemo(
    () => materials.find((material) => material.id === form.materialId) ?? selectedMaterial,
    [form.materialId, selectedMaterial],
  );

  const subtotal = quantity * selectedMaterial.price;
  const totalWeight = quantity * UNIT_WEIGHT;
  const estimatedTotal = subtotal + deliveryCharge;

  const formSubtotal = form.quantity * (activeMaterial?.price ?? 0);
  const formWeight = form.quantity * UNIT_WEIGHT;
  const formTotal = formSubtotal + deliveryCharge;

  const handleQuantityChange = (nextValue: number) => {
    const safeValue = Math.max(1, nextValue);
    setQuantity(safeValue);
    setForm((current) => ({ ...current, quantity: safeValue }));
  };

  const openBooking = (materialId?: string) => {
    const target = materialId ?? selectedMaterialId;
    setForm((current) => ({
      ...current,
      materialId: target,
      quantity: quantity,
    }));
    setSelectedMaterialId(target);
    setIsBookingOpen(true);
    setOrderReference("");
  };

  const validate = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!/^\+?[0-9\s()-]{10,15}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!form.address.trim()) nextErrors.address = "Delivery address is required.";
    if (!form.city.trim()) nextErrors.city = "City or locality is required.";
    if (!form.materialId) nextErrors.materialId = "Material is required.";
    if (form.quantity <= 0) nextErrors.quantity = "Quantity must be greater than zero.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const orderId = `CR-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1,
    ).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    setOrderReference(orderId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-extrabold text-white">
              C
            </div>
            <div>
              <p className="text-lg font-black tracking-wide text-white">CRUSHER</p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Materials Co.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-200 lg:flex">
            <a href="#home" className="transition hover:text-orange-400">Home</a>
            <a href="#materials" className="transition hover:text-orange-400">Materials</a>
            <a href="#how-it-works" className="transition hover:text-orange-400">How It Works</a>
            <a href="#orders" className="transition hover:text-orange-400">My Orders</a>
            <a href="#contact" className="transition hover:text-orange-400">Contact</a>
            <a href="#login" className="transition hover:text-orange-400">Login</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}
              className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-orange-400 hover:text-orange-300 sm:inline-flex"
            >
              Call to Book
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
            >
              Order Now
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-slate-950 text-white">
          <img
            src="/stone-crusher.jpg"
            alt="Crushed stone material pile"
            className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/50" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-200">
                Trusted local construction supply
              </div>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Building Your Dream? We&apos;ll Deliver the Materials.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-200">
                Order quality construction materials with ease. Choose your materials,
                select your quantity, and get them delivered directly to your construction
                site.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
                >
                  Order Materials
                </button>
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
                >
                  Call to Book
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-black text-white">1500+</p>
                  <p className="text-sm text-slate-300">Orders delivered</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-black text-white">4.9/5</p>
                  <p className="text-sm text-slate-300">Customer rating</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-black text-white">24/7</p>
                  <p className="text-sm text-slate-300">Support coverage</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-md">
              <div className="mb-4 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                <img
                  src="/stone-crusher.jpg"
                  alt="Crushed stone product photo"
                  className="h-44 w-full object-cover"
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Quick order</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Build your order</h2>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
                  In stock
                </span>
              </div>

              <label className="mb-2 block text-sm font-medium text-slate-200">Material</label>
              <select
                value={selectedMaterialId}
                onChange={(event) => setSelectedMaterialId(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none ring-0"
              >
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Units</p>
                  <p className="mt-1 text-lg font-bold text-white">{quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xl text-white"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xl text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-sm text-slate-100">
                <div className="flex items-center justify-between">
                  <span>Material subtotal</span>
                  <strong>{`KSh ${subtotal.toLocaleString()}`}</strong>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Delivery charge</span>
                  <strong>{`KSh ${deliveryCharge.toLocaleString()}`}</strong>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-bold text-white">
                  <span>Estimated total</span>
                  <span>{`KSh ${estimatedTotal.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
                <span>1 Unit = 4,200 weight units</span>
                <span className="font-semibold text-orange-300">{totalWeight.toLocaleString()} weight units</span>
              </div>

              <button
                type="button"
                onClick={() => openBooking(selectedMaterialId)}
                className="mt-6 w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
              >
                Order {selectedMaterial.name}
              </button>
            </aside>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Materials catalogue</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Popular construction materials</h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              Sample pricing • Configurable by admin
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {materials.map((material) => (
              <article key={material.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-60 overflow-hidden">
                  <img src={material.image} alt={material.name} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${material.accent} opacity-25`} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                    {material.availability}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{material.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">Price per unit</p>
                    </div>
                    <div className="rounded-xl bg-orange-50 px-3 py-2 text-right">
                      <p className="text-xl font-black text-orange-600">
                        KSh {material.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="min-h-[72px] text-sm leading-6 text-slate-600">{material.description}</p>

                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <span className="text-sm text-slate-600">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-slate-700 shadow-sm"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-base font-bold text-slate-900">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-base font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => openBooking(material.id)}
                      className="flex-1 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Order Now
                    </button>
                    <a
                      href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-600"
                    >
                      Call to Book
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">How it works</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Fast and simple ordering</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-[26px] border border-white/10 bg-white/5 p-6 text-left">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {index === 0 && "Choose the right material for your site and project needs."}
                    {index === 1 && "Set the number of units and review the quantity calculation."}
                    {index === 2 && "Add your delivery address, city, and any site instructions."}
                    {index === 3 && "Confirm the order and the team will coordinate the delivery."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="orders" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">My orders</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">Track your order status</h2>
            </div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-600 sm:inline-flex"
            >
              Create new order
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {customerOrders.map((order) => (
              <div key={order.id} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Order reference</p>
                    <h3 className="text-xl font-bold text-slate-900">{order.id}</h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status] || "bg-slate-100 text-slate-700"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>Material: <span className="font-semibold text-slate-900">{order.material}</span></p>
                  <p>Total: <span className="font-semibold text-slate-900">{order.total}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-stone-200/80 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Why choose us</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Built for reliable material delivery</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trustPoints.map((point) => (
                <div key={point} className="rounded-[26px] border border-slate-200 bg-white p-6 text-center shadow-md shadow-slate-200/50">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-600">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{point}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {point === "Convenient ordering" && "Simple order placement designed for busy contractors and homeowners."}
                    {point === "Transparent pricing" && "Clear rate breakdowns with configurable delivery charges and service fees."}
                    {point === "Delivery coordination" && "Flexible scheduling and reliable transport to your construction site."}
                    {point === "Customer support" && "Friendly assistance for quantity questions, stock checks, and order updates."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[30px] shadow-xl shadow-slate-300/60">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Truck delivering construction materials"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Delivery process</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Real delivery, clear coordination</h2>
              <div className="mt-8 space-y-5">
                {[
                  "Confirm material availability and order details.",
                  "Schedule pickup or delivery based on the project site.",
                  "Track dispatch and arrival with the support team.",
                  "Receive the delivery and verify completion on-site.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <p className="pt-2 text-base leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Testimonials</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Customers trust our supply service</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 text-orange-400">★★★★★</div>
                  <p className="text-base leading-7 text-slate-200">“{testimonial.quote}”</p>
                  <div className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">Frequently asked questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-stone-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Contact</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Need help with your order?</h2>
              <div className="mt-8 space-y-4 text-slate-300">
                <p className="text-lg font-medium text-white">Business phone: <a href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`} className="text-orange-300">{BUSINESS_PHONE}</a></p>
                <p>Address: 46 Concrete Road, Industrial Area, Nairobi</p>
                <p>Support: support@crushermaterials.co.ke</p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white">Get a quick quote</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Material</p>
                  <p className="mt-2 text-lg font-bold text-white">{selectedMaterial.name}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Delivery charge</p>
                  <p className="mt-2 text-lg font-bold text-white">KSh {deliveryCharge.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  Request a booking
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-lg font-black text-slate-900">CRUSHER</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Reliable delivery of sand, stone, gravel, and construction aggregates for homes, builders, and contractors.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#home" className="hover:text-orange-600">Home</a></li>
              <li><a href="#materials" className="hover:text-orange-600">Materials</a></li>
              <li><a href="#how-it-works" className="hover:text-orange-600">How It Works</a></li>
              <li><a href="#contact" className="hover:text-orange-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-orange-600">Privacy</a></li>
              <li><a href="#" className="hover:text-orange-600">Terms</a></li>
              <li><a href="#" className="hover:text-orange-600">Delivery Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}>{BUSINESS_PHONE}</a></li>
              <li>support@crushermaterials.co.ke</li>
              <li>46 Concrete Road, Nairobi</li>
            </ul>
          </div>
        </div>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl shadow-slate-950/40">
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600"
            >
              ×
            </button>

            {orderReference ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
                  ✓
                </div>
                <h3 className="text-3xl font-black text-slate-900">Order request received</h3>
                <p className="mt-4 text-slate-600">
                  Your order reference is <span className="font-bold text-slate-900">{orderReference}</span>.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  This demo captures the front-end flow. A real backend should persist and verify the order before confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="mt-8 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Booking form</p>
                  <h3 className="mt-2 text-3xl font-black text-slate-900">Place your order</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                      <input
                        value={form.fullName}
                        onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
                      <input
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                        placeholder="+254 700 000 000"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Material</label>
                      <select
                        value={form.materialId}
                        onChange={(event) => setForm({ ...form, materialId: event.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                      >
                        {materials.map((material) => (
                          <option key={material.id} value={material.id}>
                            {material.name}
                          </option>
                        ))}
                      </select>
                      {errors.materialId && <p className="mt-1 text-sm text-red-600">{errors.materialId}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Quantity in units</label>
                      <input
                        type="number"
                        min={1}
                        value={form.quantity}
                        onChange={(event) => {
                          const nextValue = Number(event.target.value) || 1;
                          setForm({ ...form, quantity: Math.max(1, nextValue) });
                        }}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                      />
                      {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Delivery address</label>
                    <textarea
                      value={form.address}
                      onChange={(event) => setForm({ ...form, address: event.target.value })}
                      className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                      placeholder="Street name, plot number, or site location"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">City or locality</label>
                    <input
                      value={form.city}
                      onChange={(event) => setForm({ ...form, city: event.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                      placeholder="Nairobi"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Delivery instructions (optional)</label>
                    <textarea
                      value={form.instructions}
                      onChange={(event) => setForm({ ...form, instructions: event.target.value })}
                      className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                      placeholder="Gate code, loading instructions, or site notes"
                    />
                  </div>

                  <div className="rounded-[24px] bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Material</span>
                      <span className="font-semibold text-slate-900">{activeMaterial.name}</span>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Price per unit</span>
                      <span className="font-semibold text-slate-900">KSh {activeMaterial.price.toLocaleString()}</span>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Total units</span>
                      <span className="font-semibold text-slate-900">{form.quantity}</span>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Calculated weight</span>
                      <span className="font-semibold text-slate-900">{formWeight.toLocaleString()} weight units</span>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Estimated cost</span>
                      <span className="font-semibold text-slate-900">KSh {formSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                      <span className="text-sm text-slate-500">Delivery charges</span>
                      <span className="font-semibold text-slate-900">KSh {deliveryCharge.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                      <span>Estimated total</span>
                      <span>KSh {formTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsBookingOpen(false)}
                      className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <a
                      href={`tel:${BUSINESS_PHONE.replace(/\s+/g, "")}`}
                      className="rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-center font-semibold text-orange-700"
                    >
                      Call to Book
                    </a>
                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-white"
                    >
                      Confirm Order
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
