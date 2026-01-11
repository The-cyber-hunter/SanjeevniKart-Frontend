"use client";

import React, { useState } from "react";

type Veg = {
  id: number;
  name: string;
  price: number; // price per 25kg
  img: string;
};

const vegetables: Veg[] = [
  { id: 1, name: "Spinach (पालक)", price: 550, img: "/images/vegetables/spinach.jpg" },
  { id: 2, name: "Fenugreek (मेथी)", price: 560, img: "/images/vegetables/fenugreek.jpg" },
  { id: 3, name: "Mustard Greens (सरसों)", price: 570, img: "/images/vegetables/mustard.jpg" },
  { id: 4, name: "Lettuce (लेट्यूस)", price: 575, img: "/images/vegetables/lettuce.jpg" },
  { id: 5, name: "Cabbage (पत्तागोभी)", price: 550, img: "/images/vegetables/cabbage.jpg" },
  { id: 6, name: "Kale (काले)", price: 560, img: "/images/vegetables/kale.jpg" },
  { id: 7, name: "Coriander (धनिया)", price: 540, img: "/images/vegetables/coriander.jpg" },
  { id: 8, name: "Mint (पुदीना)", price: 545, img: "/images/vegetables/mint.jpg" },
  { id: 9, name: "Potato (आलू)", price: 550, img: "/images/vegetables/potato.jpg" },
  { id: 10, name: "Sweet Potato (शकरकंद)", price: 560, img: "/images/vegetables/sweet_potato.jpg" },
  { id: 11, name: "Carrot (गाजर)", price: 560, img: "/images/vegetables/carrot.jpg" },
  { id: 12, name: "Beetroot (चुकंदर)", price: 550, img: "/images/vegetables/beetroot.jpg" },
  { id: 13, name: "Radish (मूली)", price: 540, img: "/images/vegetables/radish.jpg" },
  { id: 14, name: "Turnip (शलगम)", price: 545, img: "/images/vegetables/turnip.jpg" },
  { id: 15, name: "Yam (रतालू / जिमीकंद)", price: 575, img: "/images/vegetables/yam.jpg" },
  { id: 16, name: "Tomato (टमाटर)", price: 560, img: "/images/vegetables/tomato.jpg" },
  { id: 17, name: "Capsicum (शिमला मिर्च)", price: 575, img: "/images/vegetables/capsicum.jpg" },
  { id: 18, name: "Brinjal (बैंगन)", price: 550, img: "/images/vegetables/brinjal.jpg" },
  { id: 19, name: "Cucumber (खीरा)", price: 550, img: "/images/vegetables/cucumber.jpg" },
  { id: 20, name: "Pumpkin (कद्दू)", price: 560, img: "/images/vegetables/pumpkin.jpg" },
  { id: 21, name: "Bottle Gourd (लौकी / दुधी)", price: 550, img: "/images/vegetables/bottle_gourd.jpg" },
  { id: 22, name: "Ridge Gourd (तुरई / तुरिया)", price: 555, img: "/images/vegetables/ridge_gourd.jpg" },
  { id: 23, name: "Bitter Gourd (करेला)", price: 565, img: "/images/vegetables/bitter_gourd.jpg" },
  { id: 24, name: "Snake Gourd (चिचिंडा / पडल)", price: 555, img: "/images/vegetables/snake_gourd.jpg" },
  { id: 25, name: "Zucchini (जुचिनी)", price: 575, img: "/images/vegetables/zucchini.jpg" },
  { id: 27, name: "Cluster Beans (गवार / गवार)", price: 555, img: "/images/vegetables/cluster_beans.jpg" },
  { id: 29, name: "Peas (मटर)", price: 560, img: "/images/vegetables/peas.jpg" },
  { id: 30, name: "Broad Beans (सेम / पापड़ी)", price: 565, img: "/images/vegetables/broad_beans.jpg" },
  { id: 31, name: "Cowpeas (लोबिया)", price: 550, img: "/images/vegetables/cowpeas.jpg" },
  { id: 32, name: "Cauliflower (फूलगोभी)", price: 565, img: "/images/vegetables/cauliflower.jpg" },
  { id: 33, name: "Broccoli (ब्रोकोली)", price: 575, img: "/images/vegetables/broccoli.jpg" },
  { id: 34, name: "Mushrooms (खुम्बी)", price: 575, img: "/images/vegetables/mushroom.jpg" },
  { id: 35, name: "Drumstick (सहजन / मोरिंगा)", price: 550, img: "/images/vegetables/drumstick.jpg" },
  { id: 36, name: "Okra / Ladyfinger (भिंडी)", price: 550, img: "/images/vegetables/okra.jpg" },
  { id: 37, name: "Ginger (अदरक)", price: 560, img: "/images/vegetables/ginger.jpg" },
  { id: 38, name: "Green Chili (हरी मिर्च)", price: 560, img: "/images/vegetables/green_chili.jpg" },
  { id: 39, name: "Garlic (लहसुन)", price: 560, img: "/images/vegetables/garlic.jpg" },
];

export default function WholesalePage() {
  const [selected, setSelected] = useState<Record<number, string | null>>({});
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

  const toggleVeg = (id: number) => {
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === null || prev[id] === undefined ? "25" : null,
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
    if (isNaN(num) || num < 25) {
      setSelected((prev) => ({ ...prev, [id]: "25" }));
    }
  };

  const selectedList = vegetables.filter(
    (v) => selected[v.id] !== null && selected[v.id] !== undefined
  );

  const totalPrice = selectedList.reduce((sum, v) => {
    const qty = parseInt(selected[v.id] || "0", 10);
    return sum + v.price * (qty / 25);
  }, 0);

  const whatsappMessage = () => {
    let msg = `Wholesale Order - Sanjeevni Kart\n\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    msg += `Email: ${form.email}\n`;
    msg += `Address: ${form.address}\n`;
    msg += `Pincode: ${pincode}\n\n`;
    msg += `Vegetables:\n`;

    selectedList.forEach((v) => {
      const qty = parseInt(selected[v.id] || "0", 10);
      const price = (v.price * (qty / 25)).toFixed(2);
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
    <main className="bg-[#f6faf7] min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <a href="/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Home</a>
          <a href="/retail" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Retail /10kg</a>
          <a href="/customer" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">Customer /1kg</a>
        </div>

        <h1 className="text-4xl font-bold text-green-700 mb-10">Wholesale Vegetable Order</h1>

        {/* Vegetable List */}
        <div className="grid md:grid-cols-2 gap-6">
          {vegetables.map((veg) => {
            const qty = selected[veg.id] || "";
            const numQty = qty === "" ? 0 : parseInt(qty, 10);
            const vegPrice = (veg.price * (numQty / 25)).toFixed(2);
            const showError = qty !== "" && parseInt(qty, 10) < 25;

            return (
              <div key={veg.id} className="border border-green-100 rounded-2xl p-6 bg-white shadow hover:shadow-lg transition flex items-center gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={veg.img} alt={veg.name} className="object-contain h-full w-full" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{veg.name}</h3>
                      <p className="text-gray-600">₹{veg.price} / 25kg</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selected[veg.id] !== null && selected[veg.id] !== undefined}
                      onChange={() => toggleVeg(veg.id)}
                      className="w-5 h-5 accent-green-600"
                    />

                  </div>

                  {selected[veg.id] !== null && selected[veg.id] !== undefined && (
                    <div className="mt-4">
                      <label className="text-sm text-gray-600">
                        Quantity (kg) [min 25]
                      </label>

                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => updateQty(veg.id, e.target.value)}
                        onBlur={() => validateQty(veg.id)}
                        className={`block mt-1 w-28 border rounded-lg px-3 py-2 text-gray-800 ${showError ? "border-red-600" : "border-green-200"
                          }`}
                      />

                      {showError && (
                        <p className="text-red-600 text-sm mt-1">
                          Quantity must be at least 25 kg
                        </p>
                      )}

                      {!showError && qty !== "" && (
                        <p className="mt-1 text-gray-700 font-semibold">
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

        {/* Proceed Button */}
        {selectedList.length > 0 && (
          <div className="mt-12">
            <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold">Proceed</button>
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
                const qty = parseInt(selected[v.id] ?? "0", 10);
                const vegPrice = (v.price * (qty / 25)).toFixed(2);
                return <p key={v.id}>{v.name} – {qty} kg – ₹{vegPrice}</p>;
              })}
            </div>

            {/* Total */}
            <div className="mt-4 font-bold text-lg">Total to Pay: ₹{totalPrice.toFixed(2)}</div>

            {/* Form */}
            <div className="space-y-3 mt-4">
              <div>
                <input
                  type="text"
                  placeholder="Buyer Name"
                  className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {formError.name && <p className="text-red-600 text-sm mt-1">{formError.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {formError.phone && <p className="text-red-600 text-sm mt-1">{formError.phone}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {formError.email && <p className="text-red-600 text-sm mt-1">{formError.email}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Delivery Address"
                  className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                {formError.address && <p className="text-red-600 text-sm mt-1">{formError.address}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                {formError.pincode && <p className="text-red-600 text-sm mt-1">{formError.pincode}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowModal(false)} className="border border-green-300 px-5 py-2 rounded-lg">Edit Vegetables</button>
              <button onClick={handleProceed} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Proceed to buy</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
