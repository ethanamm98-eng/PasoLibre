"use client";
import { motion } from "framer-motion";
import { LuExternalLink, LuPackage } from "react-icons/lu";

const stores = [
  {
    name: "gc2b",
    description:
      "Trans-owned brand offering comfortable everyday binders designed for safety and long-term wear.",
    products: "Binders, compression tops",
    website: "https://www.gc2b.co",
  },
  {
    name: "Underworks",
    description:
      "Compression garment company known for durable binders and shaping garments.",
    products: "Binders, compression shirts",
    website: "https://www.underworks.com",
  },
  {
    name: "TomboyX",
    description:
      "Gender-inclusive apparel company offering compression tops and affirming underwear.",
    products: "Compression tops, tucking underwear",
    website: "https://tomboyx.com",
  },
  {
    name: "FLAVNT Streetwear",
    description:
      "Trans-owned apparel brand offering binders and gender-affirming basics.",
    products: "Binders, apparel",
    website: "https://www.flavnt.com",
  },
  {
    name: "Spectrum Outfitters",
    description:
      "UK-based brand known for high-quality binders and inclusive sizing.",
    products: "Binders",
    website: "https://www.spectrumoutfitters.co.uk",
  },
  {
    name: "TransTape",
    description:
      "Specialized skin-safe tape designed for chest binding and body contouring.",
    products: "Binding tape",
    website: "https://transtape.life",
  },
];

export default function TransStoresSection() {
  return (
    <section id="stores" className="mt-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0d4db0] mb-6">
          Trans Supply Stores
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-14">
          Trusted brands offering binders, binding tape, tuckers, and
          gender-affirming apparel.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-left hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4 text-[#0d4db0]">
                <LuPackage size={20} />
                <h3 className="font-semibold text-lg">{store.name}</h3>
              </div>

              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {store.description}
              </p>

              <p className="text-xs text-slate-500 mb-6">
                <strong>Products:</strong> {store.products}
              </p>

              <a
                href={store.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0d4db0] hover:underline"
              >
                Visit Website <LuExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}