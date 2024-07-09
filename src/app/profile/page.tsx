'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BeatLoader } from 'react-spinners'
import { Checkbox } from '@/components/ui/checkbox'

export default function profilePage() {
    const router = useRouter()
    const [data, setData] = useState({
            username: "",
            email: "",
            id: "",
            isVerified: false,
            isAdmin: Boolean
        })
    const [check, setcheck] = useState(false)

    const getUserDetails = async () => {
        setcheck(true)
        try {
            const res = await axios.post('/api/users/me')
            await setData({...data, username: res.data.data.username ,email: res.data.data.email ,id: res.data.data._id, isVerified: res.data.data.isVerified})
            
            setcheck(false)
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
        
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }


  return (

    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-zinc-900 '>


        <Card className="w-[350px] bg-zinc-900 text-zinc-300">
            <CardHeader>
                <CardTitle>Profile page</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    check &&
                    <BeatLoader color='#fff' size={6} />
                }
                {
                    data.id !== "" &&
                    <div>
                        <p>
                            username : {data.username}
                            <br />
                            email : {data.email}
                        </p>
                        <div className='flex items-center mt-2'>
                            {
                                data.isVerified ?
                                <Checkbox 
                                id="verify" 
                                className='border-zinc-600 mr-2' 
                                disabled 
                                checked                       
                                /> :
                                <Checkbox 
                                id="verify" 
                                className='border-zinc-600 mr-2' 
                                disabled
                                />
                            }
                        
                        <label
                            htmlFor="verify"
                            className="text-sm font-medium leading-none"
                        >
                            Verified
                        </label>
                        </div>
                    </div>
                }
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                onClick={logout}
                className='border border-zinc-600'
                >
                    Logout
                </Button>
                <Button
                onClick={getUserDetails}
                className='border border-zinc-600'
                >
                    Get Details
                </Button>
            </CardFooter>
        </Card>

    </div>
  )
}
