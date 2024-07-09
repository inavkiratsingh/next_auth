'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent
} from '@/components/ui/card'
import { BeatLoader } from 'react-spinners'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export default function SignupPage() {

  const router = useRouter()

  const [user, setUser] = useState ({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setbuttonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {

      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      toast.success(response.data)

      router.push('/login')

    } catch (error: any) {

      console.log("signup Failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    
    if(user.email.length > 0 && user.password.length > 0 && user.username.length> 0){
      setbuttonDisabled(false)
    } else {
      setbuttonDisabled(true)
    }
  }, [user])

  return (

    <div className="flex flex-col items-center justify-center w-ull min-h-screen bg-zinc-900">

      <Card className='w-[350px] bg-zinc-900 text-zinc-300'>

        <CardHeader>
          <CardTitle>Signup</CardTitle>
          {
          loading &&
          <BeatLoader size={7} color='#fff'/>
          }
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input 
                id="username" 
                placeholder="Enter your username" 
                className='bg-zinc-900 border-zinc-600' 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                />
              </div>


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
          href="/login"
          className='py-2 px-3 rounded-md border border-zinc-600'
          >Login</Link>
          {buttonDisabled ?
            <Button 
            disabled
            variant="outline" 
            className='text-zinc-800'
            onClick={onSignup}
            >
              Signup
            </Button> :
            <Button 
            variant="outline" 
            className='text-zinc-800'
            onClick={onSignup}
            >
              Signup
            </Button>
          }
          
        </CardFooter>

      </Card>

    </div>
  )
}
