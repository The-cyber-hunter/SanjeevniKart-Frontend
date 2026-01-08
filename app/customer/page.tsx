"use client";

import React, { useState } from "react";

type Veg = {
    id: number;
    name: string;
    price: number; // price per 1kg
    img: string;   // image path in /public/images/vegetables/
};

const vegetables: Veg[] = [
    { id: 1, name: "Potato", price: 24, img: "/images/vegetables/potato.jpg" },
    { id: 2, name: "Onion", price: 30, img: "/images/vegetables/onion.jpg" },
    { id: 3, name: "Tomato", price: 36, img: "/images/vegetables/tomato.jpg" },
    { id: 4, name: "Cauliflower", price: 48, img: "/images/vegetables/cauliflower.jpg" },
    { id: 5, name: "Cabbage", price: 34, img: "/images/vegetables/cabbage.jpg" },
];

export default function CustomerPage() {
    const [selected, setSelected] = useState<Record<number, number>>({});
    const [showModal, setShowModal] = useState(false);

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
            else copy[id] = 1;
            return copy;
        });
    };

    const updateQty = (id: number, qty: number) => {
        setSelected((prev) => ({ ...prev, [id]: qty }));
    };

    const selectedList = vegetables.filter((v) => selected[v.id]);

    const whatsappMessage = () => {
        let msg = `Customer Order - Sanjeevni Kart\n\n`;
        msg += `Name: ${form.name}\n`;
        msg += `Phone: ${form.phone}\n`;
        msg += `Email: ${form.email}\n`;
        msg += `Address: ${form.address}\n\n`;
        msg += `Vegetables:\n`;

        selectedList.forEach((v) => {
            msg += `- ${v.name}: ${selected[v.id]} kg\n`;
        });

        return encodeURIComponent(msg);
    };

    return (
        <main className="bg-[#f6faf7] min-h-screen text-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Navigation Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <a
                        href="/"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Home
                    </a>
                    <a
                        href="/wholesale"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Wholesale /25kg
                    </a>
                    <a
                        href="/retail"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Retail /10kg
                    </a>
                </div>

                <h1 className="text-4xl font-bold text-green-700 mb-10">
                    Customer Vegetable Order
                </h1>

                {/* Vegetable List */}
                <div className="grid md:grid-cols-2 gap-6">
                    {vegetables.map((veg) => (
                        <div
                            key={veg.id}
                            className="border border-green-100 rounded-2xl p-6 bg-white shadow hover:shadow-lg transition flex items-center gap-4"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src={veg.img}
                                    alt={veg.name}
                                    className="object-contain h-full w-full"
                                />
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
                                        <label className="text-sm text-gray-600">
                                            Quantity (kg)
                                        </label>
                                        <select
                                            value={selected[veg.id]}
                                            onChange={(e) =>
                                                updateQty(veg.id, Number(e.target.value))
                                            }
                                            className="block mt-1 border border-green-200 rounded-lg px-3 py-2 text-gray-800"
                                        >
                                            {[1, 2, 3, 4, 5].map((q) => (
                                                <option key={q} value={q}>
                                                    {q} kg
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
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
                        <h2 className="text-2xl font-bold mb-4 text-green-700">
                            Confirm Your Order
                        </h2>

                        {/* Selected Veg */}
                        <div className="mb-4 space-y-1">
                            {selectedList.map((v) => (
                                <p key={v.id}>
                                    {v.name} – {selected[v.id]} kg
                                </p>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Buyer Name"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <textarea
                                placeholder="Delivery Address"
                                className="w-full border border-green-200 px-3 py-2 rounded-lg text-gray-800"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({ ...form, address: e.target.value })
                                }
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="border border-green-300 px-5 py-2 rounded-lg"
                            >
                                Edit Vegetables
                            </button>

                            <a
                                href={`https://wa.me/919876543210?text=${whatsappMessage()}`}
                                target="_blank"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                            >
                                Proceed to buy
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
