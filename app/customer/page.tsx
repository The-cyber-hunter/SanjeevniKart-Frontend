"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

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
];

export default function CustomerPage() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [showModal, setShowModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const toggleVeg = (id: number) => {
    setSelected((prev) => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = 0.5; // default 0.5 kg
      return copy;
    });
  };

  const updateQty = (id: number, qty: number) => {
    setSelected((prev) => ({ ...prev, [id]: Math.max(0.5, qty) }));
  };

  const selectedList = vegetables.filter((v) => selected[v.id]);

  const getVegPrice = (v: Veg) => {
    const qty = selected[v.id] || 0;
    const delivery = qty < 3 && qty > 0 ? 10 : 0;
    return v.price * qty + delivery;
  };

  const totalPrice = selectedList.reduce((sum, v) => sum + getVegPrice(v), 0);

  const whatsappMessage = () => {
    let msg = `Customer Order - Sanjeevni Kart\n\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    msg += `Email: ${form.email}\n`;
    msg += `Address: ${form.address}\n`;
    msg += `Pincode: ${pincode}\n\n`;
    msg += `Vegetables:\n`;

    selectedList.forEach((v) => {
      const qty = selected[v.id];
      const price = getVegPrice(v).toFixed(2);
      msg += `- ${v.name}: ${qty} kg – ₹${price}\n`;
    });

    msg += `\nTotal to Pay: ₹${totalPrice.toFixed(2)}`;

    return encodeURIComponent(msg);
  };

  const handleProceed = () => {
    if (pincode !== "821115") {
      setPincodeError("No deliveries are available to this pincode location.");
      return;
    }
    setPincodeError("");
    // Open WhatsApp
    window.open(`https://wa.me/916206895209?text=${whatsappMessage()}`, "_blank");
  };

  return (
    <main className="bg-[#f6faf7] min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <a href="/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Home</a>
          <a href="/wholesale" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Wholesale /25kg</a>
          <a href="/retail" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Retail /10kg</a>
        </div>

        <h1 className="text-4xl font-bold text-green-700 mb-10">Customer Vegetable Order</h1>

        {/* Vegetable List */}
        <div className="grid md:grid-cols-2 gap-6">
          {vegetables.map((veg) => {
            const qty = selected[veg.id] || 0;
            const vegPrice = getVegPrice(veg).toFixed(2);

            return (
              <div key={veg.id} className="border border-green-100 rounded-2xl p-6 bg-white shadow hover:shadow-lg transition flex items-center gap-4">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={veg.img} alt={veg.name} className="object-contain h-full w-full" />
                </div>

                {/* Text & Checkbox */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{veg.name}</h3>
                      <p className="text-gray-600">₹{veg.price} / 1kg</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!selected[veg.id]}
                      onChange={() => toggleVeg(veg.id)}
                      className="w-5 h-5 accent-green-600"
                    />
                  </div>

                  {selected[veg.id] && (
                    <div className="mt-4">
                      <label className="text-sm text-gray-600">Quantity (kg)</label>
                      <input
                        type="number"
                        min={0.5}
                        step={0.5}
                        value={qty}
                        onChange={(e) => updateQty(veg.id, Number(e.target.value))}
                        className="block mt-1 w-28 border border-green-200 rounded-lg px-3 py-2 text-gray-800"
                      />
                      {/* Live Price */}
                      <p className="mt-2 text-gray-800 font-semibold">
                        Price: ₹{vegPrice} {qty < 3 && qty > 0 && <span className="text-red-600 font-bold flex items-center gap-1"><AlertTriangle size={16} /> incl. ₹10 Delivery</span>}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Proceed Button */}
        {selectedList.length > 0 && (
          <div className="mt-12">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold"
            >
              Proceed
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-green-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Confirm Your Order</h2>

            {/* Selected Vegetables */}
            <div className="mb-4 space-y-1">
              {selectedList.map((v) => {
                const qty = selected[v.id];
                const vegPrice = (v.price * qty).toFixed(2);
                const deliveryCharge = qty < 3 ? 10 : 0;
                return (
                  <p key={v.id}>
                    {v.name} – {qty} kg – ₹{vegPrice}
                    {deliveryCharge > 0 && (
                      <span className="text-red-600 font-bold ml-2 animate-pulse">
                        + ₹10 Delivery
                      </span>
                    )}
                  </p>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-4 font-bold text-lg">
              Total to Pay: ₹{totalPrice.toFixed(2)}
            </div>

            {/* Form */}
            <div className="space-y-3 mt-4">
              <input type="text" placeholder="Buyer Name" className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="tel" placeholder="Phone Number" className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea placeholder="Delivery Address" className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              {/* Pincode Input */}
              <input
                type="text"
                placeholder="Pincode"
                className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              {pincodeError && (
                <p className="text-red-600 font-semibold mt-1">{pincodeError}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowModal(false)} className="border border-green-300 px-5 py-2 rounded-lg">Edit Vegetables</button>
              <button
                onClick={handleProceed}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Proceed to buy
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
