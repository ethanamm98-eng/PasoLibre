import Link from "next/link";

export default function CheckInLandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-xl text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Check-In</h1>
        <p className="mt-3 text-slate-500">
          Please use your invitation link to access your event check-in page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-2xl bg-[#0d4db0] px-5 py-3 text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}