"use client";
import { motion } from "framer-motion";
import { LuShieldCheck } from "react-icons/lu";

export default function TransSafetySection() {
  return (
    <section id="safety" className="mt-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0d4db0] mb-6">
          Safety & Harm Reduction
        </h2>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-[#0d4db0] mb-6">
            <LuShieldCheck size={22} />
            <h3 className="font-semibold text-lg">
              Important Health Considerations
            </h3>
          </div>

          <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <li>
              • Limit binder wear time and avoid sleeping while binding.
            </li>
            <li>
              • Stop use if you experience pain, breathing difficulty, or skin
              irritation.
            </li>
            <li>
              • Never reuse injection supplies.
            </li>
            <li>
              • Always follow licensed medical provider guidance for hormone
              therapy.
            </li>
            <li>
              • Seek immediate medical attention if you experience severe
              symptoms.
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}