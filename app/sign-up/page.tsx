import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import SignUpForm from "../components/SignUpForm";
import { createClient } from "../lib/supabase/server";

export default async function SignUpPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="relative py-6 md:py-1 min-h-screen md:min-h-[98vh] flex items-center justify-center bg-white px-4 pt-24 md:pt-16">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, #0d4db0 30%, #fff 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white shadow-md rounded-lg pt-24 pb-8 px-6">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-42 h-42 rounded-full overflow-hidden bg-[#0d4db0] shadow-md flex items-center justify-center border border-gray-300">
            <Link href="/">
              <Image
                src="/logo-title-2.jpg"
                alt="Logo"
                className="w-32 h-32 object-contain scale-120 cursor-pointer hover:scale-125 transition-transform duration-500"
                width={200}
                height={200}
              />
            </Link>
          </div>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
