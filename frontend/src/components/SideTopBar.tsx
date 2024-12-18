"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

function SideTopBar() {
    const pathname = (usePathname()).split("/")[1];
    
  return (
    <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className='flex h-[40px] justify-center items-end gap-20 sm:gap-10 md:gap-20'>
    <div className='flex flex-col'>
                    <Link
                        href="/chats"
                        className={`font-bold text-xl transition-all duration-75 px-3 rounded-b-[4px] mb-1 ${pathname === "chats"
                                ? "text-blue-600"
                                : "text-zinc-700"
                            }`}
                    >
                        Chats
                    </Link>
                    <span  className={`rounded-full ml-1 ${pathname === "chats" ? " bg-blue-500" : "bg-none"}  h-1 transition-all duration-300`}></span>
                    </div>
                    <div className='flex flex-col'>
                    {/* <Link
                        href="/groups"
                        className={`font-bold text-xl transition-all duration-75 px-3 rounded-b-[4px] mb-1 ${pathname === "groups"
                                ? "text-blue-600"
                                : "text-zinc-700"
                            }`}
                    >
                        Groups
                    </Link>
                    <span  className={`rounded-full ml-1 ${pathname === "groups" ? " bg-blue-500" : "bg-none"}  h-1 transition-all duration-300`}></span> */}
                    </div>

                </motion.div>
                <div className=' h-[1px] bg-slate-300 '>
                </div>

    </>
  )
}

export default SideTopBar