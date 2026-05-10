"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("token")
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center bg-black px-4'>

      <div className='w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center'>

        <div className='flex justify-center mb-5'>
          <div className='w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg'>
            ✉
          </div>
        </div>

        <h1 className='text-4xl font-bold text-white mb-3'>
          Verify Email
        </h1>

        <p className='text-zinc-400 mb-6'>
          Please verify your email address
        </p>

        <div className='bg-zinc-800 border border-zinc-700 rounded-xl p-4 break-all text-sm text-zinc-300 mb-6'>
          {token ? token : 'No Token Found'}
        </div>

        {verified && (
          <div className='bg-green-500/10 border border-green-500 rounded-xl p-4 mb-4'>
            <h2 className='text-green-400 text-lg font-semibold mb-2'>
              Email Verified Successfully
            </h2>

            <Link
              href='/login'
              className='inline-block mt-2 bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-xl text-white font-medium'
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className='bg-red-500/10 border border-red-500 rounded-xl p-4'>
            <h2 className='text-red-400 text-lg font-semibold'>
              Invalid or Expired Token
            </h2>
          </div>
        )}

      </div>

    </div>
  )
}

export default Page