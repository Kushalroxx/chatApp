"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Card } from './ui';

function ChatDisplayer({text}:{text:string}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shownText, setShownText] = useState("")
    const maxText = 300
    useEffect(() => {        
     if(text?.length >maxText){
        setIsExpanded(true)
        setShownText(text?.slice(0, maxText)+"...")
     }else{
        setShownText(text)
     }
    }, [text])
  return (
    <motion.div initial={{y:15, opacity:0}} animate={{y:0, opacity:1}} transition={{
        duration:0.3,
        ease:'linear'
    }}>
    <Card className='inline-block max-w-sm break-words py-3 px-5'>
        <p className='text-gray-700'>{shownText}</p>
             <motion.button 
             whileHover={{scale:1.03,
                transition:{duration:0.2}
             }}
             className={`${isExpanded? "block":"hidden"}`}
             onClick={e=>{
                e.preventDefault()
                setIsExpanded(e=>!e)
                setShownText(text)
             }}><span  className='mt-4 text-blue-700 font-semibold hover:text-blue-600'>read more</span></motion.button>
    </Card>
    </motion.div>
  )
}

export default ChatDisplayer