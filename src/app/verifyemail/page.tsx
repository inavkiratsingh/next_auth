'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { 
    Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
 } from '@/components/ui/card'
import { BeatLoader } from 'react-spinners'
import { Checkbox } from '@/components/ui/checkbox'


function verifyEmailPage() {

    // const router = useRouter()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUser =  async () => {
        try {
            console.log(token);
            
            await axios.post('/api/users/verifyemail', {token})
            console.log("verified");
            
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
            console.log("not");
            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // ? practice with next js
        // const {query} = router;
        // const urlToken = query.token


    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUser()
        }
    }, [token])

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 '>


    <Card className="w-[350px] bg-zinc-900 text-zinc-300">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
        </CardHeader>
        <CardContent>
            <p className='w-full overflow-hidden text-wrap'>{token ? `${token}` : "no token"}</p>
            {/* {verified && ( */}
                
            {/* )} */}
        </CardContent>
        <CardFooter>
                <div className='mt-5 flex items-center justify-between w-full'>

                    <div>
                        <Checkbox id="verify" className='border-zinc-600 mr-2' disabled checked/>
                        <label
                            htmlFor="verify"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Verified
                        </label>
                    </div>
                    
                    <Link 
                    className='px-3 py-2 border border-zinc-600 rounded-md'
                    href="/login">Login</Link>
                </div>
        </CardFooter>
    </Card>

    </div>
  )
}

export default verifyEmailPage