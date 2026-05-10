"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { set } from "mongoose"
import toast from "react-hot-toast"

export default function Login() {
  const router = useRouter()

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false) 

  const [loading, setLoading] = React.useState(false)


  const onLogin = async () => {
   try {
     setLoading(true);
     const response = await axios.post('/api/users/login', user)
     console.log('Login success', response.data)
     toast.success('Login success')
     router.push('/profile')
   } catch (error: any) {
    console.log('Login failed',error.message)
    toast.error(error.message);
   }finally{
    setLoading(false)
   }
  }

  useEffect(()=> {
  if(user.email.length > 0 && user.password.length > 0){
   setButtonDisabled(false)
  }else{
   setButtonDisabled(true)
  }
  },[user])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          {loading? "Logging in...": "Login to your account"}
        </p>

        {/* Email */}
        <div className="mb-5">

          <label
            htmlFor="email"
            className="block text-sm text-zinc-300 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <label
            htmlFor="password"
            className="block text-sm text-zinc-300 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          />

        </div>

        {/* Button */}
        <button
          onClick={onLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-300 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-zinc-400 mt-6">

          Don&apos;t have an account?{" "}

          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  )
}