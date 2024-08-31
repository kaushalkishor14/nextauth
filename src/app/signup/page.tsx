'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

function Signup() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async (e: React.FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault()
      const response = await axios.post("/api/users/signup", user)

      console.log("Signup success", response.data);
      toast.success("User created successfully")
      router.push("/login")

    } catch (error: any) {
      console.log("Signup error", error);
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisable(!(user.email && user.password && user.username))
  }, [user])

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6'>
      <div className='flex flex-col items-center w-full max-w-md p-8 rounded-lg bg-gray-800 shadow-lg'>
        <h1 className='text-4xl font-bold text-orange-500 mb-6'>{loading ? "Processing..." : "Signup"}</h1>
        <hr className='border-orange-500 mb-6 w-full' />

        <label htmlFor='username' className='text-white font-semibold text-lg mb-2 self-start'>Username</label>
        <input
          className='p-2 rounded-lg border-2 text-black border-indigo-400 w-full mb-4 focus:outline-none focus:border-indigo-600 bg-gray-200'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='Enter your username'
        />

        <label htmlFor='email' className='text-white font-semibold text-lg mb-2 self-start'>Email</label>
        <input
          className='p-2 rounded-lg border-2 text-black border-gray-300 w-full mb-4 focus:outline-none focus:border-indigo-600 bg-gray-200'
          id='email'
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Enter your email'
        />

        <label htmlFor='password' className='text-white font-semibold text-lg mb-2 self-start'>Password</label>
        <input
          className='p-2 rounded-lg border-2 text-black border-gray-300 w-full mb-6 focus:outline-none focus:border-indigo-600 bg-gray-200'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Enter your password'
        />

        <button
          type='submit'
          className={`w-full py-2 rounded-lg text-white font-mono transition-transform ${buttonDisable ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 hover:scale-105"}`}
          onClick={onSignup}
          disabled={buttonDisable}
        >
          {loading ? "Processing..." : "Signup"}
        </button>

        <Link href="/login" className='text-lg font-semibold text-red-500 hover:text-red-700 transition-colors mt-4'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default Signup
