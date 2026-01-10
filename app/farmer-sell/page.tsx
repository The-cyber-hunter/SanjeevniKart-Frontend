"use client";

import React, { useState } from "react";

type Veg = {
    id: number;
    name: string;
    price: number; // price per kg
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
    { id: 27, name: "Cluster Beans (गवार)", price: 23, img: "/images/vegetables/cluster_beans.jpg" },
    { id: 29, name: "Peas (मटर)", price: 22, img: "/images/vegetables/peas.jpg" },
    { id: 30, name: "Broad Beans (सेम / पापड़ी)", price: 24, img: "/images/vegetables/broad_beans.jpg" },
    { id: 31, name: "Cowpeas (लोबिया)", price: 22, img: "/images/vegetables/cowpeas.jpg" },
    { id: 32, name: "Cauliflower (फूलगोभी)", price: 24, img: "/images/vegetables/cauliflower.jpg" },
    { id: 33, name: "Broccoli (ब्रोकोली)", price: 25, img: "/images/vegetables/broccoli.jpg" },
    { id: 34, name: "Mushrooms (खुम्बी)", price: 25, img: "/images/vegetables/mushroom.jpg" },
    { id: 35, name: "Drumstick (सहजन)", price: 22, img: "/images/vegetables/drumstick.jpg" },
    { id: 36, name: "Okra (भिंडी)", price: 22, img: "/images/vegetables/okra.jpg" },
    { id: 37, name: "Ginger (अदरक)", price: 25, img: "/images/vegetables/ginger.jpg" },
    { id: 38, name: "Green Chili (हरी मिर्च)", price: 25, img: "/images/vegetables/green_chili.jpg" },
    { id: 39, name: "Garlic (लहसुन)", price: 25, img: "/images/vegetables/garlic.jpg" },
];

const allowedPincode = "821115";

export default function SellingPage() {
    const [selected, setSelected] = useState<Record<number, string>>({});
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
    });
    const [pincodeError, setPincodeError] = useState("");

    /* ---------------- Quantity Handling (UPDATED) ---------------- */

    const toggleVeg = (id: number) => {
        setSelected((prev) => {
            const copy = { ...prev };
            if (copy[id]) delete copy[id];
            else copy[id] = "5"; // default 5kg
            return copy;
        });
    };

    const updateQty = (id: number, value: string) => {
        if (value === "") {
            setSelected((prev) => ({ ...prev, [id]: "" }));
            return;
        }
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setSelected((prev) => ({ ...prev, [id]: value }));
        }
    };

    const validateQty = (id: number) => {
        const num = parseFloat(selected[id]);
        if (isNaN(num) || num < 5) {
            setSelected((prev) => ({ ...prev, [id]: "5" }));
        }
    };

    /* ------------------------------------------------------------- */

    const selectedList = vegetables.filter(
        (v) => selected[v.id] && selected[v.id] !== ""
    );

    const whatsappMessage = () => {
        let msg = `Selling Order - Sanjeevni Kart\n\nFarmer Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPickup Address: ${form.address}\n\nVegetables:\n`;
        selectedList.forEach((v) => {
            const qty = parseFloat(selected[v.id]);
            msg += `- ${v.name}: ${qty} kg – ₹${(v.price * qty).toFixed(2)}\n`;
        });
        const total = selectedList
            .reduce((sum, v) => sum + v.price * parseFloat(selected[v.id]), 0)
            .toFixed(2);
        msg += `\nTotal Expected Payment: ₹${total}`;
        return encodeURIComponent(msg);
    };

    const handleProceed = () => {
        if (form.pincode !== allowedPincode) {
            setPincodeError("Sorry! No Pickup available to this pincode location.");
            return;
        }
        setPincodeError("");
        window.open(
            `https://wa.me/916206895209?text=${whatsappMessage()}`,
            "_blank"
        );
    };

    return (
        <main className="bg-[#f6faf7] min-h-screen text-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex justify-start mb-8">
                    <a
                        href="/"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Back to the Home page!
                    </a>
                </div>

                <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
                    Sell your vegetables!
                </h1>

                {/* Vegetable List */}
                <div className="grid md:grid-cols-2 gap-6">
                    {vegetables.map((veg) => {
                        const qty =
                            selected[veg.id] === "" || !selected[veg.id]
                                ? 0
                                : parseFloat(selected[veg.id]);

                        return (
                            <div
                                key={veg.id}
                                className="border border-green-100 rounded-2xl p-6 bg-white shadow flex gap-4"
                            >
                                <img
                                    src={veg.img}
                                    alt={veg.name}
                                    className="w-24 h-24 object-contain"
                                />

                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-semibold">{veg.name}</h3>
                                            <p className="text-gray-600">₹{veg.price} / kg</p>
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
                                            <label className="text-sm text-gray-600">
                                                Quantity (kg)
                                            </label>
                                            <input
                                                type="number"
                                                min={5}
                                                step={1}
                                                value={selected[veg.id]}
                                                onChange={(e) =>
                                                    updateQty(veg.id, e.target.value)
                                                }
                                                onBlur={() => validateQty(veg.id)}
                                                className="block mt-1 w-28 border border-green-200 rounded-lg px-3 py-2"
                                            />
                                            <p className="mt-1 font-semibold">
                                                Expected Payment: ₹{(veg.price * qty).toFixed(2)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedList.length > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold"
                        >
                            Proceed
                        </button>
                    </div>
                )}
            </div>

            {/* ---------------- Modal (FORM RESTORED) ---------------- */}
            {showModal && (
                <div className="fixed inset-0 bg-green-900/20 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-green-700">
                            Confirm Your Selling Order
                        </h2>

                        {/* Selected Veg */}
                        <div className="mb-4 space-y-1">
                            {selectedList.map((v) => (
                                <p key={v.id}>
                                    {v.name} – {selected[v.id]} kg – ₹
                                    {(v.price * parseFloat(selected[v.id])).toFixed(2)}
                                </p>
                            ))}
                        </div>

                        <div className="mt-4 font-bold text-lg">
                            Total Expected Payment: ₹
                            {selectedList
                                .reduce(
                                    (sum, v) =>
                                        sum + v.price * parseFloat(selected[v.id]),
                                    0
                                )
                                .toFixed(2)}
                        </div>

                        {/* Farmer Form */}
                        <div className="space-y-3 mt-4">
                            <input
                                type="text"
                                placeholder="Farmer Name"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <textarea
                                placeholder="Pickup Address"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({ ...form, address: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Pincode"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg"
                                value={form.pincode}
                                onChange={(e) =>
                                    setForm({ ...form, pincode: e.target.value })
                                }
                            />
                            {pincodeError && (
                                <p className="text-red-600 font-semibold">
                                    {pincodeError}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="border border-green-300 px-5 py-2 rounded-lg"
                            >
                                Edit Vegetables
                            </button>
                            <button
                                onClick={handleProceed}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                            >
                                Proceed To Sell
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
