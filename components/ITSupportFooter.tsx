"use client";
import { FiMail } from "react-icons/fi";
import {
  Headset,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function ITSupportFooter() {
  return (
    <footer
      className="
      relative overflow-hidden rounded-[1.9rem]
      border border-white/70
      bg-white/90 backdrop-blur-xl
      shadow-[0_24px_70px_rgba(15,23,42,0.08)]
      p-6 md:p-8 lg:p-10
    "
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_24%)]" />

      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Content */}
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div
            className="
            relative flex h-16 w-16 shrink-0 items-center justify-center
            rounded-3xl border border-blue-100
            bg-linear-to-br from-blue-50 to-indigo-100
            text-blue-700
            shadow-[0_10px_30px_rgba(59,130,246,0.16)]
          "
          >
            <Headset size={28} />

            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md border border-blue-100">
              <Sparkles size={12} className="text-blue-600" />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <ShieldCheck size={13} />
              Dedicated Support
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Contact IT Support
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-[15px]">
              Need help with administrator access, announcements, attendance,
              events, or platform tools? Our support team is available to assist
              you with operational and technical issues.
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:min-w-107.5">
          {/* Email */}
          <a
            href="mailto:ethan.a.mm98@gmail.com"
            className="group relative overflow-hidden rounded-3xl
            border border-white/70
            bg-white/80 backdrop-blur-xl p-4
            shadow-[0_12px_35px_rgba(15,23,42,0.06)]
            transition-all duration-300 hover:-translate-y-1
            hover:shadow-[0_18px_45px_rgba(59,130,246,0.14)]
          "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%)] opacity-0 transition group-hover:opacity-100" />

            <div className="relative flex items-center gap-4">
              <div
                className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-linear-to-br from-blue-100 to-indigo-100
                text-blue-700
                shadow-sm
              "
              >
                <FiMail size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Email Support
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                   Ethan Developer
                </p>
              </div>

              <ArrowRight
                size={16}
                className="text-blue-600 transition group-hover:translate-x-1"
              />
            </div>
          </a>

          {/* Phone */}
          {/* <a
            href="tel:+17870000000"
            className="
            group relative overflow-hidden
            rounded-[1.5rem]
            border border-white/70
            bg-white/80 backdrop-blur-xl
            p-4
            shadow-[0_12px_35px_rgba(15,23,42,0.06)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_18px_45px_rgba(59,130,246,0.14)]
          "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_28%)] opacity-0 transition group-hover:opacity-100" />

            <div className="relative flex items-center gap-4">
              <div
                className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-linear-to-br from-indigo-100 to-blue-100
                text-indigo-700
                shadow-sm
              "
              >
                <FiPhone size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Phone Support
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  (804) 484-5620
                </p>
              </div>

              <ArrowRight
                size={16}
                className="text-indigo-600 transition group-hover:translate-x-1"
              />
            </div>
          </a> */}
        </div>
      </div>
    </footer>
  );
}