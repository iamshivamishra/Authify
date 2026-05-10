"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Profile = () => {

  const router = useRouter()

  const [data, setData] = React.useState('nothing')

  const [user, setUser] = React.useState({
    username: '',
    email: ''
  })

  const getUserDetails = async () => {
    try {

      const res = await axios.get('/api/users/me')

      console.log(res.data)

      setData(res.data.data._id)

      setUser({
        username: res.data.data.username,
        email: res.data.data.email
      })

    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const logout = async () => {
    try {

      await axios.get('/api/users/logout')

      router.push('/login')

    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">

        <div className="flex justify-center mb-5">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user.username ? user.username.charAt(0).toUpperCase() : "S"}
          </div>

        </div>

        <h1 className="text-4xl font-bold text-white mb-2">
          Profile
        </h1>

        <p className="mt-2">
          {
            data === 'nothing'
              ? 'nothing'
              : (
                <Link
                  href={`/profile/${data}`}
                  className='text-blue-400 hover:underline break-all'
                >
                  {data}
                </Link>
              )
          }
        </p>

        <p className="text-zinc-400 mb-6 mt-4">
          Welcome to your profile dashboard
        </p>

        <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700">

          <div className="flex items-center justify-between py-3 border-b border-zinc-700">

            <span className="text-zinc-400">
              Username
            </span>

            <span className="text-white font-medium">
              {user.username}
            </span>

          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-700">

            <span className="text-zinc-400">
              Email
            </span>

            <span className="text-white font-medium break-all">
              {user.email}
            </span>

          </div>

          <div className="flex items-center justify-between py-3">

            <span className="text-zinc-400">
              Status
            </span>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Active
            </span>

          </div>

        </div>

        <button
          onClick={logout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl"
        >
          Get User Details
        </button>

      </div>

    </div>

  )
}

export default Profile