import { emailState } from '@/lib/atom';
import React from 'react'
import { LuUser } from "react-icons/lu";
import { useRecoilValue } from 'recoil';
import {motion} from "framer-motion"

function ChatTopBar({email}:{email:string}) {
  const userEmail = useRecoilValue(emailState)
  return (
    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.6,}} className='w-full font-extrabold text-xl flex items-center px-10 py-[10px] bg-zinc-200 shadow-lg gap-2'>
      <LuUser className='bg-gray-300 h-10 w-10 rounded-full p-1' />
      {userEmail===email?"Message your-self":email}
    </motion.div>
  )
}

export default ChatTopBar