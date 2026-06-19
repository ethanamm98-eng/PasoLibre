import React from "react";

const features = [
  {
    title: "Custom Club Pages",
    desc: "Build pages tailored to your walking club’s needs.",
  },
  {
    title: "Event & Walk Listings",
    desc: "Show upcoming walks, events, and camps.",
  },
  {
    title: "Photo Gallery",
    desc: "Display memorable moments from club walks and trips.",
  },
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {features.map((item, i) => (
          <div key={i} className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
