'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import { BeatLoader } from 'react-spinners'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function LoginPage() {

  const router = useRouter()

  const [user, setUser] = useState ({
    email: "",
    password: ""
  })

  const [buttonDisabled, setbuttonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onlogin = async () => {
    try {

      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("login success", response.data);
      toast.success(response.data)

      router.push('/profile')

    } catch (error: any) {

      console.log("signup Failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    
    if(user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(false)
    } else {
      setbuttonDisabled(true)
    }
  }, [user])

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 '>


      <Card className="w-[350px] bg-zinc-900 text-zinc-300">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {
          loading ? 
          <BeatLoader size={7} color='#fff'/> : 
          <CardDescription>fill the details and login</CardDescription>
          }
          {/* <BeatLoader size={7} color='#fff'/> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                id="email" 
                placeholder="Enter your email" 
                className='bg-zinc-900 border-zinc-600' 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                type='password'
                id="password" 
                placeholder="Enter your password" 
                className='bg-zinc-900 border-zinc-600 outline-none' 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          
          <Link 
          href="/signup"
          className='py-2 px-3 rounded-md border border-zinc-600'
          >Signup</Link>
          
          {buttonDisabled ?
            <Button 
            disabled
            variant="outline" 
            className='text-zinc-800'
            onClick={onlogin}
            >
              Login
            </Button> :
            <Button 
            variant="outline" 
            className='text-zinc-800'
            onClick={onlogin}
            >
              Login
            </Button>
          }
        </CardFooter>
      </Card>

    </div>
  )
}
