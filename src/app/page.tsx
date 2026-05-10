"use client"

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const checkUser = async () => {

      try {

        await axios.get('/api/users/me')

        setIsLoggedIn(true)

      } catch (error) {

        setIsLoggedIn(false)

      }
    }

    checkUser()

  }, [])

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-zinc-800">

        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-blue-500">
          Authify
        </h1>

        <div className="flex items-center gap-3">

          {
            !isLoggedIn && (
              <>
                <Link
                  href="/login"
                  className="px-4 sm:px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition text-sm sm:text-base"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Signup
                </Link>
              </>
            )
          }

          {
            isLoggedIn && (
              <Link
                href="/profile"
                className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Profile
              </Link>
            )
          }

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-5 sm:px-8 py-24 sm:py-32">

        <div className="bg-blue-600/20 border border-blue-500 text-blue-400 px-4 py-2 rounded-full mb-6 text-sm sm:text-base">
          Secure Authentication System
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-5xl leading-tight">
          Build Modern Authentication
          <span className="text-blue-500"> With Next.js</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-6 leading-7 sm:leading-8">
          Complete authentication system using Next.js, MongoDB, JWT,
          bcrypt, middleware, protected routes and email verification.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">

          {
            !isLoggedIn && (
              <>
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/20"
                >
                  Get Started
                </Link>

                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-zinc-700 hover:bg-zinc-900 transition text-base sm:text-lg"
                >
                  Login
                </Link>
              </>
            )
          }

          {
            isLoggedIn && (
              <Link
                href="/profile"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/20"
              >
                Go to Profile
              </Link>
            )
          }

        </div>

      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-8 pb-24 max-w-7xl mx-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition">
          <div className="text-5xl mb-5">🔐</div>

          <h2 className="text-2xl font-bold mb-3">
            JWT Authentication
          </h2>

          <p className="text-zinc-400 leading-7">
            Secure login system using JWT tokens and HTTP-only cookies.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition">
          <div className="text-5xl mb-5">📧</div>

          <h2 className="text-2xl font-bold mb-3">
            Email Verification
          </h2>

          <p className="text-zinc-400 leading-7">
            Verify user accounts with Mailtrap and Nodemailer integration.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500 transition">
          <div className="text-5xl mb-5">🛡️</div>

          <h2 className="text-2xl font-bold mb-3">
            Protected Routes
          </h2>

          <p className="text-zinc-400 leading-7">
            Middleware based route protection for secure pages and APIs.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 text-center text-zinc-500 text-sm sm:text-base px-4">
        © 2026 Authify. All rights reserved.
      </footer>

    </div>
  );
}