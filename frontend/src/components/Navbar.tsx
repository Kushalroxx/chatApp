"use client"
import React from 'react'
import { Button } from './ui'
import {motion} from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dataSetState, wsState } from '@/lib/atom'
import { closeWs } from '@/lib/closeWs'

function Navbar({login}:{login:boolean}) {
  const router = useRouter()
  const [messages, setMessages] = useRecoilState(dataSetState)
  const [ws,setWs] = useRecoilState(wsState)
  const handleButton = async() => {
    if(!login){
      router.push('/login')
    }else{
      try {       
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/signout`,{withCredentials:true})
        setMessages([])
        ws?.close()
        setWs(undefined)
        router.push("/login")
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    < motion.div initial={{y:-10,opacity:0}} animate={{opacity:1,y:0}}transition={{duration:0.2}}  className='w-screen h-16 sm:h-[73px] sticky top-0 bg-gray-50 flex justify-between items-center px-5 sm:px-16 md:px-24 shadow-sm z-30 shadow-zinc-400'>
        <h1 className='font-sans text-2xl sm:text-3xl text-gray-700 font-bold'>U<span className=' font-extrabold absolute top-4 left-22 '>Chat</span></h1>
        <Button onClick={handleButton} className='font-[900] text-lg h-10 bg-gradient-to-t from-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-600
             active:scale-95 
             transition-all duration-300'>{ login? 'Logout' : 'Login'}</Button>
    </motion.div>
  )
}

export default Navbar