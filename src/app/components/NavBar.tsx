"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiUser,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { BsCalendarWeek } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

import LanguageSelector from "./LanguageSelector";
// import DonateSelector from "./DonateSelector"; // Waiting to set up the official donation links before integrating this component

type UserType = "admin" | "member";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  is_approved: boolean;
  account_status: "active" | "suspended" | null;
};

export default function Navbar() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>("member");
  const [displayName, setDisplayName] = useState("Guest");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authenticatedProfile, setAuthenticatedProfile] =
    useState<ProfileData | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadUserState = async () => {
      try {
        setAuthLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (!session?.user) {
          setIsSignedIn(false);
          setDisplayName("Guest");
          setUserType("member");
          return;
        }

        setIsSignedIn(true);

        const fallbackName = session.user.email?.split("@")[0] || "User";

        const { data: profile, error } = await supabase
          .from("profiles")
          .select(
            "first_name, last_name, role, is_approved, account_status, language_preference"
          )
          .eq("id", session.user.id)
          .maybeSingle<ProfileData>();

        if (error || !profile) {
          setDisplayName(fallbackName);
          setUserType("member");
          setAuthenticatedProfile(null);
          return;
        }

        const fullName =
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
          fallbackName;

        const normalizedRole = (profile.role || "member").toLowerCase();
        const resolvedType: UserType =
          normalizedRole === "admin" || normalizedRole === "super_admin"
            ? "admin"
            : "member";

        setDisplayName(fullName);
        setUserType(resolvedType);
        setAuthenticatedProfile(profile);
      } catch (error) {
        console.error("Navbar auth load error:", error);
        setIsSignedIn(false);
        setDisplayName("Guest");
        setUserType("member");
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    loadUserState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserState();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileNavOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      text: "You’ll be signed out of your Paso Libre account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Stay signed in",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await supabase.auth.signOut();
      setIsSignedIn(false);
      setDisplayName("Guest");
      setUserType("member");
      setMenuOpen(false);
      setMobileNavOpen(false);

      await Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been signed out successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: "Something went wrong while signing you out.",
        confirmButtonColor: "#0d4db0",
      });
    }
  };

  const navItems = [
    { label: t?.navigation?.about || "about", path: "about" },
    { label: t?.navigation?.initiatives || "initiatives", path: "initiatives" },
    { label: t?.navigation?.contact || "contact", path: "contact" },
  ];

  const currentPath = pathname.split("/")[1];

  const authLabel = authLoading
    ? "Loading..."
    : isSignedIn
    ? t?.navigation?.loggedIn || "Logged In"
    : t?.navigation?.signIn || "Log In";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-3 w-[calc(100%-16px)] max-w-7xl rounded-3xl border border-white/10 bg-[#0d4db0]/85 px-2 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:w-[calc(100%-24px)] sm:rounded-[28px] sm:px-4">
        <div className="flex items-center justify-between gap-2 px-2 py-2.5 sm:gap-4 sm:px-3 md:px-2">
          <div className="flex min-w-0 items-center gap-3 xl:gap-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex h-12 shrink-0 items-center rounded-2xl border border-white/10 bg-white/10 px-2.5 shadow-sm backdrop-blur-sm transition hover:bg-white/15 sm:h-14.5 sm:px-3 xl:h-15.5"
            >
              <Image
                src="/logo-title-2.png"
                alt="Logo"
                width={210}
                height={60}
                priority
                className="h-auto w-30 cursor-pointer object-contain transition sm:w-38.75 md:w-42.5 xl:w-46.25"
              />
            </button>

            <ul className="relative hidden items-center justify-start gap-8 text-center text-[15px] font-light tracking-wide text-white xl:flex">
              {navItems?.map((item) => (
                <li key={item.label}>
                  <Link
                    href={`/${item.path}`}
                    className={`group relative inline-flex items-center py-2 lowercase transition ${
                      item.path === currentPath
                        ? "font-semibold underline decoration-sky-300 underline-offset-4"
                        : ""
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-linear-to-r from-sky-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2.5"
            ref={menuRef}
          >
            {/* Hide until I receive the official links for donation */}
            {/* <div className="hidden xl:block">
              <DonateSelector />
            </div> */}

            {!authenticatedProfile && (
              <div className="hidden xl:block">
                <LanguageSelector />
              </div>
            )}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                disabled={authLoading}
                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-2 py-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-70 sm:gap-3 sm:px-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 sm:h-10 sm:w-10">
                  <FiUser className="text-lg sm:text-xl" />
                </span>

                <span className="hidden text-left xl:block">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {language === "en" ? "Account" : "Cuenta"}
                  </span>
                  <span className="block text-sm font-semibold leading-tight">
                    {authLabel}
                  </span>
                </span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="fixed right-3 top-21.5 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-[min(20rem,calc(100vw-1.5rem))]"
                  >
                    {isSignedIn ? (
                      <>
                        <div className="bg-blue-50 px-4 py-3 text-xs text-gray-500">
                          {t?.navigation?.signedInAs || "Signed in as"}{" "}
                          <span className="font-semibold text-gray-700">
                            {displayName}
                          </span>
                          <div className="mt-1">
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
                                userType === "admin"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {userType.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FiUser className="text-blue-500" />
                          {t?.navigation?.profile || "Profile"}
                        </Link>

                        {userType === "admin" && (
                          <Link
                            href="/admin-dashboard"
                            className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                          >
                            <FiGrid className="text-blue-500" />
                            {t?.navigation?.dashboard || "Dashboard"}
                          </Link>
                        )}

                        <Link
                          href="/events"
                          className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100"
                          onClick={() => setMenuOpen(false)}
                        >
                          <BsCalendarWeek className="text-blue-500" />
                          {t?.navigation?.calendar || "Calendar"}
                        </Link>

                        <div className="border-t border-gray-100" />

                        <button
                          onClick={handleLogout}
                          className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-red-600 transition-all hover:bg-gray-100"
                        >
                          <FiLogOut />
                          {t?.navigation?.logout || "Logout"}
                        </button>

                        <div className="mt-1 border-t border-gray-100" />

                        <div className="px-4 py-3">
                          <p className="mb-2 text-[11px] text-gray-500">
                            {t?.navigation?.followUs || "Follow us"}
                          </p>
                          <div className="flex items-center justify-between text-gray-500">
                            <FaInstagram
                              onClick={() =>
                                window.open(
                                  "https://www.instagram.com/pasolibre.pr",
                                  "_blank"
                                )
                              }
                              className="transition-all hover:text-pink-500 cursor-pointer"
                            />
                            <FaTiktok
                              onClick={() =>
                                window.open(
                                  "https://www.tiktok.com/@pasolibre.pr",
                                  "_blank"
                                )
                              }
                              className="transition-all hover:text-black cursor-pointer"
                            />
                            <FaWhatsapp
                              onClick={() =>
                                window.open(
                                  "https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN",
                                  "_blank"
                                )
                              }
                              className="transition-all hover:text-green-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        <RiShieldUserLine className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-100 p-1 text-blue-500" />
                        {t?.navigation?.signIn || "Sign In"}
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="rounded-xl p-2 text-white transition hover:bg-white/10 xl:hidden"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              {mobileNavOpen ? (
                <FiX className="cursor-pointer" size={24} />
              ) : (
                <FiMenu className="cursor-pointer" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 w-[calc(100%-16px)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d4db0]/95 px-4 pb-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:w-[calc(100%-24px)] sm:rounded-[28px] xl:hidden"
          >
            <div className="mt-4 flex gap-3 border-b border-white/10 pb-4">
              {!authenticatedProfile && <LanguageSelector />}
              {/* Hide until I receive the official links for donation */}
              {/* <DonateSelector /> */}
            </div>

            <ul className="mt-4 flex flex-col space-y-3 pt-2 lowercase text-white">
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 border-b border-white/10 py-2"
                >
                  <FiHome className="text-sky-200" />
                  home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 border-b border-white/10 py-2"
                >
                  <FiInfo className="text-sky-200" />
                  {t?.navigation?.about || "about"}
                </Link>
              </li>

              <li>
                <Link
                  href="/initiatives"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 border-b border-white/10 py-2"
                >
                  <HiOutlineSparkles className="text-sky-200" />
                  {t?.navigation?.initiatives || "initiatives"}
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 border-b border-white/10 py-2"
                >
                  <FiMail className="text-sky-200" />
                  {t?.navigation?.contact || "contact"}
                </Link>
              </li>

              {/* {isSignedIn && (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center gap-3 border-b border-white/10 py-2"
                  >
                    <FiUser className="text-sky-200" />
                    {t?.navigation?.profile || "Profile"}
                  </Link>

                  {userType === "admin" && (
                    <Link
                      href="/admin-dashboard"
                      onClick={() => setMobileNavOpen(false)}
                      className="flex items-center gap-3 border-b border-white/10 py-2"
                    >
                      <FiGrid className="text-sky-200" />
                      {t?.navigation?.dashboard || "Dashboard"}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-b border-white/10 py-2 text-left lowercase text-red-300"
                  >
                    <FiLogOut />
                    {t?.navigation?.logout || "Logout"}
                  </button>
                </>
              )} */}

              {!isSignedIn && (
                <Link
                  href="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 border-b border-white/10 py-2"
                >
                  <RiShieldUserLine className="text-sky-200" />
                  {t?.navigation?.signIn || "Sign In"}
                </Link>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
