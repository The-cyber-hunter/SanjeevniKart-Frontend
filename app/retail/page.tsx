"use client";

import React, { useState } from "react";
import Head from "next/head";

type Veg = {
  id: number;
  name: string;
  price: number; // price per 10kg
  img: string;
};

const vegetables: Veg[] = [
  { id: 1, name: "Spinach (पालक)", price: 220, img: "/images/vegetables/spinach.jpg" },
  { id: 2, name: "Fenugreek (मेथी)", price: 230, img: "/images/vegetables/fenugreek.jpg" },
  { id: 3, name: "Mustard Greens (सरसों)", price: 240, img: "/images/vegetables/mustard.jpg" },
  { id: 4, name: "Lettuce (लेट्यूस)", price: 250, img: "/images/vegetables/lettuce.jpg" },
  { id: 5, name: "Cabbage (पत्तागोभी)", price: 220, img: "/images/vegetables/cabbage.jpg" },
  { id: 6, name: "Kale (काले)", price: 230, img: "/images/vegetables/kale.jpg" },
  { id: 7, name: "Coriander (धनिया)", price: 200, img: "/images/vegetables/coriander.jpg" },
  { id: 8, name: "Mint (पुदीना)", price: 210, img: "/images/vegetables/mint.jpg" },
  { id: 9, name: "Potato (आलू)", price: 220, img: "/images/vegetables/potato.jpg" },
  { id: 10, name: "Sweet Potato (शकरकंद)", price: 240, img: "/images/vegetables/sweet_potato.jpg" },
  { id: 11, name: "Carrot (गाजर)", price: 230, img: "/images/vegetables/carrot.jpg" },
  { id: 12, name: "Beetroot (चुकंदर)", price: 220, img: "/images/vegetables/beetroot.jpg" },
  { id: 13, name: "Radish (मूली)", price: 210, img: "/images/vegetables/radish.jpg" },
  { id: 14, name: "Turnip (शलगम)", price: 220, img: "/images/vegetables/turnip.jpg" },
  { id: 15, name: "Yam (रतालू / जिमीकंद)", price: 250, img: "/images/vegetables/yam.jpg" },
  { id: 16, name: "Tomato (टमाटर)", price: 230, img: "/images/vegetables/tomato.jpg" },
  { id: 17, name: "Capsicum (शिमला मिर्च)", price: 250, img: "/images/vegetables/capsicum.jpg" },
  { id: 18, name: "Brinjal (बैंगन)", price: 220, img: "/images/vegetables/brinjal.jpg" },
  { id: 19, name: "Cucumber (खीरा)", price: 220, img: "/images/vegetables/cucumber.jpg" },
  { id: 20, name: "Pumpkin (कद्दू)", price: 230, img: "/images/vegetables/pumpkin.jpg" },
  { id: 21, name: "Bottle Gourd (लौकी / दुधी)", price: 220, img: "/images/vegetables/bottle_gourd.jpg" },
  { id: 22, name: "Ridge Gourd (तुरई / तुरिया)", price: 230, img: "/images/vegetables/ridge_gourd.jpg" },
  { id: 23, name: "Bitter Gourd (करेला)", price: 240, img: "/images/vegetables/bitter_gourd.jpg" },
  { id: 24, name: "Snake Gourd (चिचिंडा / पडल)", price: 230, img: "/images/vegetables/snake_gourd.jpg" },
  { id: 25, name: "Zucchini (जुचिनी)", price: 250, img: "/images/vegetables/zucchini.jpg" },
  { id: 27, name: "Cluster Beans (गवार / गवार)", price: 230, img: "/images/vegetables/cluster_beans.jpg" },
  { id: 29, name: "Peas (मटर)", price: 220, img: "/images/vegetables/peas.jpg" },
  { id: 30, name: "Broad Beans (सेम / पापड़ी)", price: 240, img: "/images/vegetables/broad_beans.jpg" },
  { id: 31, name: "Cowpeas (लोबिया)", price: 220, img: "/images/vegetables/cowpeas.jpg" },
  { id: 32, name: "Cauliflower (फूलगोभी)", price: 240, img: "/images/vegetables/cauliflower.jpg" },
  { id: 33, name: "Broccoli (ब्रोकोली)", price: 250, img: "/images/vegetables/broccoli.jpg" },
  { id: 34, name: "Mushrooms (खुम्बी)", price: 250, img: "/images/vegetables/mushroom.jpg" },
  { id: 35, name: "Drumstick (सहजन / मोरिंगा)", price: 220, img: "/images/vegetables/drumstick.jpg" },
  { id: 36, name: "Okra / Ladyfinger (भिंडी)", price: 220, img: "/images/vegetables/okra.jpg" },
  { id: 37, name: "Ginger (अदरक)", price: 250, img: "/images/vegetables/ginger.jpg" },
  { id: 38, name: "Green Chili (हरी मिर्च)", price: 250, img: "/images/vegetables/green_chili.jpg" },
  { id: 39, name: "Garlic (लहसुन)", price: 250, img: "/images/vegetables/garlic.jpg" },
];

export default function RetailPage() {
  const [selected, setSelected] = useState<Record<number, string | undefined>>({});
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState("");

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



  const toggleVeg = (id: number) => {
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? "10" : undefined,
    }));
  };

  const updateQty = (id: number, value: string) => {
    if (value === "") {
      setSelected((prev) => ({ ...prev, [id]: "" }));
      return;
    }

    if (/^\d+$/.test(value)) {
      setSelected((prev) => ({ ...prev, [id]: value }));
    }
  };

  const validateQty = (id: number) => {
    const num = parseInt(selected[id] ?? "", 10);
    if (isNaN(num) || num < 10) {
      setSelected((prev) => ({ ...prev, [id]: "10" }));
    }
  };

  const selectedList = vegetables.filter(
    (v) => selected[v.id] !== null && selected[v.id] !== undefined
  );

  const totalPrice = selectedList.reduce((sum, v) => {
    const qty = Number(selected[v.id] || 0);
    const vegPrice = +(v.price * (qty / 10)).toFixed(2);
    return sum + vegPrice;
  }, 0);

  const whatsappMessage = () => {
    let msg = `Retail Order - Sanjeevni Kart\n\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    msg += `Email: ${form.email}\n`;
    msg += `Address: ${form.address}\n`;
    msg += `Pincode: ${pincode}\n\n`;
    msg += `Vegetables:\n`;

    selectedList.forEach((v) => {
      const qty = parseInt(selected[v.id] || "0", 10);
      const price = (v.price * (qty / 10)).toFixed(2);
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
        <title>Retail Vegetable Order (10kg) | Sanjeevni Kart</title>

        <meta
          name="description"
          content="Order fresh vegetables online in retail quantities starting from 10kg. Sanjeevni Kart delivers farm-fresh vegetables to selected locations with transparent pricing."
        />

        <meta
          name="keywords"
          content="retail vegetables, buy vegetables online, fresh vegetables 10kg, vegetable delivery, Sanjeevni Kart"
        />

        <link
          rel="canonical"
          href="https://www.sanjeevnikart.in/retail"
        />
      </Head>

      <main className="bg-[#2B2024] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-[#FD0053] mb-10">Retail Vegetable Order</h1>
          <section className="mb-12 text-[#FFFFFF] leading-relaxed">
            <h2 className="text-2xl font-semibold mb-3">
              Fresh Retail Vegetables in 10kg Lots
            </h2>

            <p>
              Sanjeevni Kart offers fresh, farm-sourced vegetables for retail buyers at
              transparent prices. Each vegetable can be ordered in a minimum quantity
              of <strong>10kg</strong>, making it ideal for families, small retailers,
              restaurants, and local vendors.
            </p>

            <p className="mt-3">
              Our retail vegetable delivery service ensures quality, hygiene, and fair
              pricing. Orders are currently serviceable to selected pincodes only.
              Please verify your delivery location before checkout.
            </p>

            <p className="mt-3">
              Choose from leafy greens, root vegetables, gourds, beans, and seasonal
              produce — all listed below with real-time pricing.
            </p>
          </section>


          {/* Vegetable List */}
          <div className="grid md:grid-cols-2 gap-6">
            {vegetables.map((veg) => {
              const qty = selected[veg.id] || "";
              const numQty = qty === "" ? 0 : parseInt(qty, 10);
              const vegPrice = (veg.price * (numQty / 10)).toFixed(2);
              const showError = qty !== "" && parseInt(qty, 10) < 10;


              return (
                <div
                  key={veg.id}
                  className="border border-white/10 rounded-2xl p-6 bg-[#1F171A] shadow-lg hover:shadow-xl transition flex items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
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
                        checked={selected[veg.id] !== null && selected[veg.id] !== undefined}
                        onChange={() => toggleVeg(veg.id)}
                        className="w-5 h-5 accent-[#FD0053]"
                      />
                    </div>

                    {selected[veg.id] !== null && selected[veg.id] !== undefined && (
                      <div className="mt-4">
                        <label className="text-sm text-white/60">Quantity (kg) [min 10]</label>
                        <input
                          type="number"
                          value={qty}
                          min={10}
                          onChange={(e) => updateQty(veg.id, e.target.value)}
                          onBlur={() => validateQty(veg.id)}
                          className={`block mt-1 w-28 border rounded-lg px-3 py-2 bg-[#2B2024] text-white ${showError ? "border-red-600" : "border-white/20"
                            }`}
                        />
                        {showError && <p className="text-[#FD0053] text-sm mt-1">Quantity must be at least 10 kg</p>}
                        {!showError && qty !== "" && (
                          <p className="mt-1 text-[#FFFFFF] font-semibold">
                            Price: ₹{vegPrice}
                          </p>
                        )}
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

              {/* Selected Vegetables */}
              <div className="mb-4 space-y-1">
                {selectedList.map((v) => {
                  const qty = parseInt(selected[v.id] ?? "0", 10);
                  const vegPrice = (v.price * (qty / 10)).toFixed(2);
                  return (
                    <p key={v.id} className="text-white/80">
                      {v.name} – {qty} kg – ₹{vegPrice}
                    </p>
                  );

                })}
              </div>

              {/* Total */}
              <div className="mt-4 font-bold text-lg text-[#FD0053]">
                Total to Pay: ₹{totalPrice.toFixed(2)}
              </div>


              {/* Form */}
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

              {/* Buttons */}
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
