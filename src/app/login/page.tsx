'use client';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function LoginPage() {

  const router  = useRouter()
  const[ user, setUser] = useState({
    email:"",
    password:""
  })

  const [ loading , setLoading] = useState(false)
  const[buttonDisable, setButtonDisable] = useState(false)

  const onLogin = async () =>{
    try {

      const response = await axios.post("/api/users/login", user)
      console.log(response.data)
      toast.success(response.data.message)
      router.push("/profile")
      
    } catch (error:any) {
      console.log(error.data)
      toast.error(error.data.message)
    }
  }


  useEffect(()=>{

    if(user.email.length > 0 && user.password.length > 0){

      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }

  },[])


  return (
    <div className='flex justify-center flex-col items-center min-h-screen py-2
    '>
    <h1 className='text-3xl font-bold font-mono p-2 text-orange-500'>{loading? "processing...":"login"}</h1>  
    <hr/>
    <label htmlFor="email" className='text-lg  font-mono mb-2'>email</label>
    <input
    className='border-2 text-black border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-600'
    id='email'
    value={user.email}
    onChange={(e)=>setUser({...user,email:e.target.value})}
    />

    <label htmlFor="password" className='text-lg font-mono mb-2 mt-4'>password</label>
    <input
    className='border-2 text-black border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-600 mb-4'
    id='password'
    value={user.password}
    onChange={(e)=>setUser({...user,password:e.target.value})}
    
    />

    <button className='border-2  border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-600 my-2 bg-orange-500 text-white font-mono' 
    onClick={onLogin}
    >
       {buttonDisable? "processing..." : "login"}

    </button>

    <Link href={"/signup"}>Visit to Signup page</Link>


      </div>
  )
}

export default LoginPage