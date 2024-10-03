"use client"
import React from 'react'
import { Button } from './ui'
import {motion} from 'framer-motion'

function Navbar({login}:{login:boolean}) {
  return (
    < motion.div initial={{y:-10,opacity:0}} animate={{opacity:1,y:0}}transition={{duration:0.2}}  className='w-screen h-16 sm:h-[73px] sticky top-0 bg-gray-50 flex justify-between items-center px-5 sm:px-16 md:px-24'>
        <h1 className='font-sans text-2xl sm:text-3xl text-gray-700 font-bold'>U<span className=' font-extrabold absolute top-4 left-22 '>Chat</span></h1>
        <Button className='text-lg sm:text-xl bg-blue-600 hover:bg-blue-700 font-bold'>{ login? 'Logout' : 'Login'}</Button>
    </motion.div>
  )
}

export default Navbar