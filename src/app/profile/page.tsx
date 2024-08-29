'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProfilePage() {

  const router = useRouter()
  const [data, setData] = useState("NO DATA")

  const getUser = async () => {
    try {
      const res = await axios.post("/api/users/me")
      console.log(res.data.data._id)
      setData(res.data.data._id)
      toast.success(res.data.message)
    } catch (error: any) {

      // console.log(error.data)
      toast.error(error.message)

    }
  }

  const logout = async () => {

    try {

      await axios.get("/api/users/logout")
      toast.success("user logged out successfully")
      router.push('/login')


    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)

    }

  }

  return (
    <div className='flex justify-center items-center h-screen flex-col '>
      <h1 className='text-3xl text-orange-500'>PROFILE PAGE</h1>
      <hr />
      <h2 className='text-lg text-orange-500 mb-4 ' >{data === "NO DATA" ? "NO DATA" :
        <Link href={`/profile/${data}`}>USER ID: {data}</Link>}
      </h2>
      <button onClick={logout} className=' font-mono text-lg text-white  mt-4 mb-4 hover:text-orange-700 bg-red-400 rounded-lg p-2 '>
        LOGOUT</button>
      <button onClick={getUser} className='text-lg text-green-500 hover:text-orange-700 bg-blue-200 rounded-lg p-2 '>
        Get User Details</button>
    </div>
  )
}
