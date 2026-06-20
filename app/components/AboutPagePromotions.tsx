"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LuCalendarDays,
  LuClipboardCheck,
  LuFileText,
  LuUserPlus,
} from "react-icons/lu";

export default function AboutMembersAccessSection() {
  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Soft Light Gradients */}
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-sky-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -right-32 w-150 h-150 bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#0d4db0]/10 bg-linear-to-br from-white via-sky-50/40 to-indigo-50/40 shadow-[0_20px_60px_rgba(13,77,176,0.08)] p-12 md:p-20"
        >
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#0d4db0] tracking-tight leading-tight">
                Acceso exclusivo para miembros
              </h2>

              <p className="mt-6 text-slate-600 font-light text-lg leading-relaxed">
                Crea tu cuenta y desbloquea herramientas esenciales para tu
                experiencia en el club. Nuestro sistema te permite mantenerte
                organizado, participar en eventos y gestionar tu asistencia
                fácilmente.
              </p>

              <motion.a
                href="/register"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 inline-flex items-center gap-3 bg-[#0d4db0] text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <LuUserPlus className="text-xl" />
                Crear cuenta
              </motion.a>

              <p className="mt-4 text-sm text-slate-500 font-light">
                Solo los miembros registrados pueden acceder a estas funciones.
              </p>
            </div>

            {/* Right Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <LuCalendarDays />,
                  title: "Eventos",
                  desc: "Explora y confirma tu participación en próximas actividades.",
                },
                {
                  icon: <LuClipboardCheck />,
                  title: "Asistencia",
                  desc: "Registra y consulta tu historial de participación.",
                },
                {
                  icon: <LuFileText />,
                  title: "Formularios",
                  desc: "Completa inscripciones y documentos importantes en línea.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl p-6 border border-[#0d4db0]/10 shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-indigo-100 text-[#0d4db0] text-2xl mb-4 group-hover:scale-110 transition duration-500">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-[#0d4db0] text-lg mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
