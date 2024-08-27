'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';

function VerifyEmailPage() {

  // const router = useRouter()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)


  const verifyUserEmail = async () => {

    try {
      await axios.post("api/users/verifyemail", { token })
      setVerified(true)
      setError(false)
      
    } catch (error: any) {
      setError(true)
      toast.error(error.response.data)

    }

  }

  useEffect(() => {
    setError(false)

    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const {query} = router
    // console.log(query)

    //  const urlTokenTwo = query.token && setToken(query.token as string)

  }, [])

  useEffect(() => {
    setError(false)
    if (token.length < 1) return
    verifyUserEmail()
    console.log(token)
    console.log(
      "verfiyUserEmail",
    )
  }, [token])



  return (
    <div className='flex justify-center flex-col items-center py-2 min-h-screen'>
      <h1 className='text-3xl mb-4'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black rounded-lg'>{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div>
          <h2>verified</h2>
          <Link href={'/login'}>login</Link>
        </div>
      )}
      {error && <h2>error</h2>}


    </div>
  )
}

export default VerifyEmailPage