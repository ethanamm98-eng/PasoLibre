"use client";
import { motion } from "framer-motion";
import { LuSyringe, LuExternalLink } from "react-icons/lu";

const resources = [
  {
    name: "Planned Parenthood",
    description:
      "Offers guidance, medical supervision, and support for hormone therapy and injection training.",
    website: "https://www.plannedparenthood.org",
  },
  {
    name: "CDC",
    description:
      "Provides public health guidance on safe injection practices and harm reduction.",
    website: "https://www.cdc.gov",
  },
  {
    name: "NEXTDistro",
    description:
      "Mail-based harm reduction organization providing sterile supplies in certain areas.",
    website: "https://nextdistro.org",
  },
];

export default function NeedleResourcesSection() {
  return (
    <section id="needles" className="mt-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0d4db0] mb-6">
          Needle & Injection Resources
        </h2>

        <p className="text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-14">
          Access safe, legal injection supply information and provider-guided
          hormone therapy resources.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-left hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4 text-[#0d4db0]">
                <LuSyringe size={20} />
                <h3 className="font-semibold text-lg">{item.name}</h3>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {item.description}
              </p>

              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0d4db0] hover:underline"
              >
                Visit Website <LuExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed border-t border-slate-200 pt-6">
          Always consult a licensed medical provider before beginning hormone
          therapy. Follow local pharmacy laws and medical guidance when
          obtaining supplies.
        </div>
      </motion.div>
    </section>
  );
}
