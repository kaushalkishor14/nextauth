'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)

  const getUser = async () => {
    try {
      const res = await axios.post("/api/users/me")
      const userData = res.data.data
      setUserId(userData._id)
      setUsername(userData.username)
      toast.success(res.data.message)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("User logged out successfully")
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6'>
      <div className='bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center text-white'>
        <h1 className='text-4xl font-semibold text-orange-400 mb-6'>Profile Page</h1>
        <hr className='border-orange-500 mb-6' />
        {userId && username ? (
          <div className='text-lg text-gray-300'>
            <p className='mb-4'>
              <Link href={`/profile/${userId}`} className='underline hover:text-orange-400 transition-colors'>
                USER ID: {userId}
              </Link>
            </p>
            <p className='mb-4'>
              <Link href={`/profile/${username}`} className='underline hover:text-orange-400 transition-colors'>
                Username: {username}
              </Link>
            </p>
          </div>
        ) : (
          <p className='text-lg text-gray-500 mb-4'>NO DATA</p>
        )}
        <div className='flex justify-around mt-6'>
          <button onClick={logout} className='px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors'>
            Logout
          </button>
          <button onClick={getUser} className='px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors'>
            Get User Details
          </button>
        </div>
      </div>
    </div>
  )
}
