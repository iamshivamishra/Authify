"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { set } from "mongoose"
import toast from "react-hot-toast"

const Signup = () => {

  const router = useRouter()

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
   try {
    setLoading(true);
   const response = await axios.post('/api/users/signup', user)
   console.log('Signup success', response.data)
   router.push('/login')
   } catch (error: any) {
    console.log('Signup failed',error.message)
    toast.error(error.message);
   } finally{
    setLoading(false)
   }
  }

  useEffect( ()=> {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
     setButtonDisabled(false) 
    }else{
      setButtonDisabled(true)
    }
  },[user])


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          {loading? "Loding...." : "Sign up to continue"}
        </p>

        {/* Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-sm text-zinc-300 mb-2"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

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
            placeholder="Enter email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
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
            placeholder="Enter password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl"
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-center text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Signup