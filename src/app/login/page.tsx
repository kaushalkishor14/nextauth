'use client';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function LoginPage() {

  const router  = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log(response.data)
      toast.success(response.data.message)
      router.push("/profile")
    } catch (error: any) {
      console.log(error.data)
      toast.error(error.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [user.email, user.password])

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6'>
      <div className='flex flex-col items-center w-full max-w-md p-8 rounded-lg bg-gray-800 shadow-lg text-white'>
        <h1 className='text-4xl font-semibold text-orange-400 mb-6'>
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className='border-orange-500 mb-6 w-full' />
        
        <label htmlFor="email" className='text-white font-semibold text-lg mb-2 self-start'>Email</label>
        <input
          className='border-2 text-black border-indigo-400 p-2 rounded-lg focus:outline-none focus:border-indigo-600 w-full mb-4 bg-gray-200'
          id='email'
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Enter your email'
        />
        
        <label htmlFor="password" className='text-white font-semibold text-lg mb-2 self-start'>Password</label>
        <input
          className='border-2 border-indigo-400 text-black p-2 rounded-lg focus:outline-none focus:border-indigo-600 w-full mb-6 bg-gray-200'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Enter your password'
        />

        <button
          className={`border-2 p-2 rounded-lg focus:outline-none focus:border-gray-600 w-full mb-4 bg-green-500 text-white font-mono hover:bg-green-700 hover:scale-105 transition-transform ${buttonDisable ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={onLogin}
          disabled={buttonDisable}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <Link className='text-md font-semibold text-red-500 hover:text-red-700 transition-colors' href={"/signup"}>
          Visit Signup Page
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
