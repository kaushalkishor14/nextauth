'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose';
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


  const onSignup = async (e: any) => {
    try {
      setLoading(true)
      e.preventDefault()
      const response = await axios.post("/api/users/signup", user)

      console.log("signup success", response.data);
      toast.success("user created successfully")
      router.push("/login")


    } catch (error: any) {
      console.log("signup error");
      toast.error(error.data.message)

    }

  }

  useEffect(() => {

    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }

  }, [user])





  return (
    <div className='flex justify-center flex-col items-center min-h-screen py-2'> 
    <h1 className='text-3xl font-bold font-mono p-2 text-orange-500'>{loading? "processing...":
      "Signup"}</h1>
      <hr/>
      <label htmlFor='username'>username</label>
      <input
      className='p-2 rounded-lg border text-black border-gray-300  mb-4  focus:outline-none focus:border-gray-600'
      id='username'
      value={user.username}
      onChange={(e)=>setUser({...user, username: e.target.value})}
      placeholder='username'
      />

      <label htmlFor='email'>email</label>
      <input
      className='p-2 rounded-lg border text-black border-gray-300  mb-4  focus:outline-none focus:border-gray-600'
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user, email: e.target.value})}
      placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
      className='p-2 rounded-lg border text-black border-gray-300  mb-4  focus:outline-none focus:border-gray-600'
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user, password: e.target.value})}
      placeholder='password'
      />
    
    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg py-2 mb-4'  onClick={onSignup} >
       {buttonDisable? "processing...": "Signup"}
       </button>
       <Link href="/login">Login</Link>
    
    </div>
  )
}

export default Signup