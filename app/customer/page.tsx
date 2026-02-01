"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Head from "next/head";

type Veg = {
  id: number;
  name: string;
  price: number; // price per 1kg
  img: string;
};

const vegetables: Veg[] = [
  { id: 1, name: "Spinach (पालक)", price: 22, img: "/images/vegetables/spinach.jpg" },
  { id: 2, name: "Fenugreek (मेथी)", price: 23, img: "/images/vegetables/fenugreek.jpg" },
  { id: 3, name: "Mustard Greens (सरसों)", price: 24, img: "/images/vegetables/mustard.jpg" },
  { id: 4, name: "Lettuce (लेट्यूस)", price: 25, img: "/images/vegetables/lettuce.jpg" },
  { id: 5, name: "Cabbage (पत्तागोभी)", price: 22, img: "/images/vegetables/cabbage.jpg" },
  { id: 6, name: "Kale (काले)", price: 23, img: "/images/vegetables/kale.jpg" },
  { id: 7, name: "Coriander (धनिया)", price: 20, img: "/images/vegetables/coriander.jpg" },
  { id: 8, name: "Mint (पुदीना)", price: 21, img: "/images/vegetables/mint.jpg" },
  { id: 9, name: "Potato (आलू)", price: 22, img: "/images/vegetables/potato.jpg" },
  { id: 10, name: "Sweet Potato (शकरकंद)", price: 24, img: "/images/vegetables/sweet_potato.jpg" },
  { id: 11, name: "Carrot (गाजर)", price: 23, img: "/images/vegetables/carrot.jpg" },
  { id: 12, name: "Beetroot (चुकंदर)", price: 22, img: "/images/vegetables/beetroot.jpg" },
  { id: 13, name: "Radish (मूली)", price: 21, img: "/images/vegetables/radish.jpg" },
  { id: 14, name: "Turnip (शलगम)", price: 22, img: "/images/vegetables/turnip.jpg" },
  { id: 15, name: "Yam (रतालू / जिमीकंद)", price: 25, img: "/images/vegetables/yam.jpg" },
  { id: 16, name: "Tomato (टमाटर)", price: 23, img: "/images/vegetables/tomato.jpg" },
  { id: 17, name: "Capsicum (शिमला मिर्च)", price: 25, img: "/images/vegetables/capsicum.jpg" },
  { id: 18, name: "Brinjal (बैंगन)", price: 22, img: "/images/vegetables/brinjal.jpg" },
  { id: 19, name: "Cucumber (खीरा)", price: 22, img: "/images/vegetables/cucumber.jpg" },
  { id: 20, name: "Pumpkin (कद्दू)", price: 23, img: "/images/vegetables/pumpkin.jpg" },
  { id: 21, name: "Bottle Gourd (लौकी / दुधी)", price: 22, img: "/images/vegetables/bottle_gourd.jpg" },
  { id: 22, name: "Ridge Gourd (तुरई / तुरिया)", price: 23, img: "/images/vegetables/ridge_gourd.jpg" },
  { id: 23, name: "Bitter Gourd (करेला)", price: 24, img: "/images/vegetables/bitter_gourd.jpg" },
  { id: 24, name: "Snake Gourd (चिचिंडा / पडल)", price: 23, img: "/images/vegetables/snake_gourd.jpg" },
  { id: 25, name: "Zucchini (जुचिनी)", price: 25, img: "/images/vegetables/zucchini.jpg" },
  { id: 27, name: "Cluster Beans (गवार / गवार)", price: 23, img: "/images/vegetables/cluster_beans.jpg" },
  { id: 29, name: "Peas (मटर)", price: 22, img: "/images/vegetables/peas.jpg" },
  { id: 30, name: "Broad Beans (सेम / पापड़ी)", price: 24, img: "/images/vegetables/broad_beans.jpg" },
  { id: 31, name: "Cowpeas (लोबिया)", price: 22, img: "/images/vegetables/cowpeas.jpg" },
  { id: 32, name: "Cauliflower (फूलगोभी)", price: 24, img: "/images/vegetables/cauliflower.jpg" },
  { id: 33, name: "Broccoli (ब्रोकोली)", price: 25, img: "/images/vegetables/broccoli.jpg" },
  { id: 34, name: "Mushrooms (खुम्बी)", price: 25, img: "/images/vegetables/mushroom.jpg" },
  { id: 35, name: "Drumstick (सहजन / मोरिंगा)", price: 22, img: "/images/vegetables/drumstick.jpg" },
  { id: 36, name: "Okra / Ladyfinger (भिंडी)", price: 22, img: "/images/vegetables/okra.jpg" },
  { id: 37, name: "Ginger (अदरक)", price: 25, img: "/images/vegetables/ginger.jpg" },
  { id: 38, name: "Green Chili (हरी मिर्च)", price: 25, img: "/images/vegetables/green_chili.jpg" },
  { id: 39, name: "Garlic (लहसुन)", price: 25, img: "/images/vegetables/garlic.jpg" },
];

export default function CustomerPage() {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });

  /* ---------- Quantity Logic ---------- */
  const toggleVeg = (id: number) => {
    setSelected((prev: Record<number, string>) => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = "0.5"; // default 0.5kg
      return copy;
    });
  };

  const updateQty = (id: number, value: string) => {
    setSelected((prev: Record<number, string>) => ({ ...prev, [id]: value }));
  };

  const validateQty = (id: number) => {
    const num = parseFloat(selected[id] || "0");
    if (isNaN(num) || num < 0.5) {
      setSelected((prev: Record<number, string>) => ({ ...prev, [id]: "0.5" }));
    }
  };

  /* ---------- Helpers ---------- */
  const selectedList = vegetables.filter(
    (v) => selected[v.id] !== undefined
  );

  const getQty = (id: number) => parseFloat(selected[id] || "0");

  const getVegPrice = (v: Veg) => {
    const qty = getQty(v.id);
    const delivery = qty < 3 && qty > 0 ? 10 : 0;
    return v.price * qty + delivery;
  };

  const totalPrice = selectedList.reduce(
    (sum, v) => sum + getVegPrice(v),
    0
  );

  const whatsappMessage = () => {
    let msg = `Customer Order - Sanjeevni Kart\n\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    msg += `Email: ${form.email}\n`;
    msg += `Address: ${form.address}\n`;
    msg += `Pincode: ${pincode}\n\n`;
    msg += `Vegetables:\n`;
    selectedList.forEach((v) => {
      const qty = getQty(v.id);
      const price = getVegPrice(v).toFixed(2);
      msg += `- ${v.name}: ${qty} kg – ₹${price}\n`;
    });
    msg += `\nTotal to Pay: ₹${totalPrice.toFixed(2)}`;
    return encodeURIComponent(msg);
  };

  const handleProceed = () => {
    let hasError = false;
    const newErrors = { name: "", phone: "", email: "", address: "", pincode: "" };

    if (!form.name) {
      newErrors.name = "Buyer name is required";
      hasError = true;
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    }

    if (!form.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!form.address) {
      newErrors.address = "Delivery address is required";
      hasError = true;
    }

    if (!pincode) {
      newErrors.pincode = "Pincode is required";
      hasError = true;
    } else if (pincode !== "821115") {
      newErrors.pincode = "No deliveries are available to this pincode location.";
      hasError = true;
    }

    setFormError(newErrors);

    if (hasError) return; // Stop if any error

    // If everything is fine, proceed to WhatsApp
    window.open(`https://wa.me/916206895209?text=${whatsappMessage()}`, "_blank");
  };


  return (
    <>
      <Head>
        <title>Customer Vegetable Order(1kg) | Sanjeevni Kart</title>

        <meta
          name="description"
          content="Order fresh vegetables online starting from 0.5kg. Sanjeevni Kart delivers farm-fresh vegetables with transparent pricing and fast local delivery."
        />

        <meta
          name="keywords"
          content="buy vegetables online, fresh vegetables 1kg, local vegetable delivery, Sanjeevni Kart, vegetables near me"
        />

        <link
          rel="canonical"
          href="https://www.sanjeevnikart.in/customer"
        />
      </Head>

      <main className="bg-[#2B2024] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-[#FD0053] mb-10">Customer Vegetable Order</h1>
          <section className="mb-12 text-[#FFFFFF] leading-relaxed">
            <h2 className="text-2xl font-semibold mb-3">
              Fresh Vegetables Delivered in Small Quantities
            </h2>

            <p>
              Sanjeevni Kart allows customers to buy fresh vegetables online in flexible
              quantities starting from <strong>0.5kg</strong>. This service is ideal for
              households, individuals, and daily cooking needs.
            </p>

            <p className="mt-3">
              All vegetables are sourced fresh, hygienically handled, and priced
              transparently per kilogram. Orders below 3kg may include a small delivery
              charge to ensure fair logistics.
            </p>

            <p className="mt-3">
              Select from leafy greens, root vegetables, gourds, beans, and seasonal
              produce listed below. Delivery is currently available to selected pincodes
              only.
            </p>
          </section>


          {/* Vegetable List */}
          <div className="grid md:grid-cols-2 gap-6">
            {vegetables.map((veg) => {
              const qtyStr = selected[veg.id] ?? "";
              const qty = qtyStr === "" ? 0 : parseFloat(qtyStr);
              const vegPrice = getVegPrice(veg).toFixed(2);

              return (
                <div
                  key={veg.id}
                  className="border border-white/10 rounded-2xl p-6 bg-[#1F171A] shadow-lg hover:shadow-xl transition flex items-center gap-4">
                  <div className="w-24 h-24 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={veg.img} alt={veg.name} className="object-contain h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{veg.name}</h3>
                        <p className="text-white/70">₹{veg.price} / 10kg</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selected[veg.id] !== undefined}
                        onChange={() => toggleVeg(veg.id)}
                        className="w-5 h-5 accent-[#FD0053]"
                      />
                    </div>

                    {selected[veg.id] !== undefined && (
                      <div className="mt-4">
                        <label className="text-sm text-white/60">Quantity (kg)</label>
                        <input
                          type="number"
                          min={0.5}
                          step={0.5}
                          value={qtyStr}
                          onChange={(e) => updateQty(veg.id, e.target.value)}
                          onBlur={() => validateQty(veg.id)}
                          className="block mt-1 w-28 border border-white/20 rounded-lg px-3 py-2 bg-[#2B2024] text-white"
                        />
                        <p className="mt-2 text-white/80 font-semibold flex items-center gap-2">
                          Price: ₹{vegPrice}
                          {qty < 3 && qty > 0 && (
                            <span className="text-red-600 font-bold flex items-center gap-1">
                              <AlertTriangle size={16} /> incl. ₹10 Delivery
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proceed */}
          {selectedList.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-[#A80139] to-[#FD0053] text-white px-10 py-4 rounded-lg font-semibold hover:opacity-90"
              >
                Proceed</button>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1F171A] w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-[#FD0053]">Confirm Your Order</h2>

              <div className="mb-4 space-y-1">
                {selectedList.map((v) => {
                  const qty = getQty(v.id);
                  const vegPrice = (v.price * qty).toFixed(2);
                  const delivery = qty < 3 ? 10 : 0;
                  return (
                    <p key={v.id} className="text-white/80">
                      {v.name} – {qty} kg – ₹{vegPrice}
                      {delivery > 0 && (
                        <span className="text-[#FD0053] font-bold ml-2 animate-pulse">
                          + ₹10 Delivery
                        </span>
                      )}
                    </p>
                  );
                })}
              </div>

              <div className="mt-4 font-bold text-lg text-[#FD0053]">
                Total to Pay: ₹{totalPrice.toFixed(2)}
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <input
                    type="text"
                    placeholder="Buyer Name"
                    className="w-full border border-white/20 bg-[#2B2024] px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FD0053]"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {formError.name && <p className="text-red-600 text-sm mt-1">{formError.name}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-white/20 bg-[#2B2024] px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FD0053]"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  {formError.phone && <p className="text-red-600 text-sm mt-1">{formError.phone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-white/20 bg-[#2B2024] px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FD0053]"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {formError.email && <p className="text-red-600 text-sm mt-1">{formError.email}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="Delivery Address"
                    className="w-full border border-white/20 bg-[#2B2024] px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FD0053]"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                  {formError.address && <p className="text-red-600 text-sm mt-1">{formError.address}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full border border-white/20 bg-[#2B2024] px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FD0053]"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  {formError.pincode && <p className="text-red-600 text-sm mt-1">{formError.pincode}</p>}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setShowModal(false)} className="border border-white/30 px-5 py-2 rounded-lg text-white hover:bg-white/10">Edit Vegetables</button>
                <button onClick={handleProceed} className="bg-gradient-to-r from-[#A80139] to-[#FD0053] text-white px-6 py-2 rounded-lg hover:opacity-90">Proceed to buy</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
