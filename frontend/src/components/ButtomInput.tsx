import React, { useState } from 'react'
import { Button, Textarea } from './ui'
import { MdSend } from "react-icons/md";
import {motion} from "framer-motion"

function ButtomInput({
    sentMessage,
    email
}:{
    sentMessage:any,
    email:string
}) {
    const [value, setValue] = useState<null|string>(null)
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className='flex justify-center gap-2 absolute items-center bottom-1 w-[62%] mx-6 overflow-x-hidden'>
        <Textarea className=' border border-slate-800 rounded-2xl text-[30px] text-4xl' onChange={e=>{setValue(e.target.value)}} placeholder='chat'/>
        <Button  className='rounded-full h-12 w-14 text-2xl' type='submit' onClick={(e)=>{
      e.preventDefault()
      sentMessage(value||"", email)
      }}><MdSend/></Button>
    </motion.div>
  )
}

export default ButtomInput