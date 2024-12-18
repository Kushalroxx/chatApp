"use client"
import {motion} from "framer-motion"
import { dataSetState, emailState } from '@/lib/atom';
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useRecoilValue } from 'recoil';
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideMenuBodyCard({email}:{email:string}) {
  const pathName = usePathname()
  const isActive = pathName === `/chats/${email}`
  const myEmail = useRecoilValue(emailState)
  const [displayMsg, setDisplayMsg] = useState("fdaff ")
  const messages = useRecoilValue(dataSetState)
  useEffect(() => {
    for(let i = 0; i < messages?.length; i++){
      const revMsgs = [...messages].reverse()
       if(revMsgs[i].from===email||revMsgs[i].to===email){
          setDisplayMsg(revMsgs[i].message)
        break;
      }
    }
    
  }, [messages])
  
  return (
    <Link href={`/chats/${email}`}>
    <motion.div whileHover={{y:-1, scale:1.01}} transition={{type:"spring",stiffness:150,bounce:0}} className={` cursor-pointer flex items-center gap-2 h-16  ${isActive?"bg-gray-700":"bg-gray-200 hover:bg-neutral-300"}`}>
        <div className='text-zinc-600 bg-zinc-50 ml-7 rounded-full flex justify-center items-center w-14 h-14 text-2xl'>
        <FaUser/>
        </div>
        <div className={`text-lg ${isActive?"text-white font-semibold":"text-zinc-900"}`}>{myEmail === email? "Message your-self":email}
          <br />
          <div className={`text-sm font-semibold ${isActive?"text-gray-100":"text-gray-700"}`}>
          {displayMsg.length>35?displayMsg.slice(0,35)+"...":displayMsg}
          </div>
        </div>
    </motion.div>
    </Link>
  )
}

export default SideMenuBodyCard