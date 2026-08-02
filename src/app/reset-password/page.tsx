import Image from "next/image";
import Link from "next/link";

import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(91,206,250,0.28), transparent 30%), radial-gradient(circle at 88% 18%, rgba(245,169,184,0.14), transparent 28%), radial-gradient(circle at 50% 120%, rgba(37,99,235,0.35), transparent 42%), linear-gradient(145deg, #03132f 0%, #06285f 30%, #0d4db0 62%, #17468f 100%)",
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#5BCEFA]/12 blur-[90px]" />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#F5A9B8]/8 blur-[100px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0.7px, transparent 0.7px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/8 shadow-[0_38px_110px_rgba(2,6,23,0.48)] backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-[680px] overflow-hidden border-r border-white/10 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(91,206,250,0.22), transparent 34%), radial-gradient(circle at 90% 14%, rgba(245,169,184,0.12), transparent 28%), linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015))",
              }}
            />

            <div className="relative">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 shadow-lg backdrop-blur-md transition hover:bg-white/15"
              >
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
                  <Image
                    src="/logo-title-4.png"
                    alt="Paso Libre"
                    width={96}
                    height={96}
                    className="h-16 w-16 scale-[1.55] object-contain"
                    priority
                  />
                </div>

                <span className="text-sm font-black tracking-[-0.02em]">
                  Paso Libre
                </span>
              </Link>
            </div>

            <div className="relative max-w-md">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.95)]" />
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-100">
                  Seguridad · Confianza · Acceso
                </p>
              </div>

              <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white">
                Secure your account with confidence.
              </h1>

              <p className="mt-5 max-w-sm text-base leading-7 text-blue-100/85">
                Create a new password and return to your Paso Libre experience
                with secure access to your account.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Use at least six characters",
                  "Choose a password you have not used before",
                  "Return to sign in after updating",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-blue-50/85"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-xs font-medium text-blue-100/60">
              Puerto Rico · Built with pride
            </p>
          </div>

          <div className="relative bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#5BCEFA]/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#0d4db0]/6 blur-3xl" />

            <div className="relative mx-auto w-full max-w-md">
              <div className="mb-7 flex justify-center lg:hidden">
                <Link
                  href="/"
                  className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-blue-100 ring-[0.8px] ring-[#0d4db0]/80 bg-white shadow-[0_18px_40px_rgba(13,77,176,0.15)]"
                >
                  <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-50 via-white to-sky-50" />

                  <Image
                    src="/logo-title-4.png"
                    alt="Paso Libre"
                    width={160}
                    height={160}
                    priority
                    className="relative h-24 w-24 scale-[1.65] object-contain transition-transform duration-500 group-hover:scale-[1.75]"
                  />
                </Link>
              </div>

              <ResetPasswordForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
