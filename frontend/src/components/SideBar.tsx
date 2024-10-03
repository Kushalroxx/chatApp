"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

function SideBar() {
    const pathname = usePathname()
    return (
        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='h-[88vh]'>
            <div className='w-screen md:w-[340px] sm:w-[250px] bg-gray-50 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thumb-zinc-300 scrollbar-thin py-2'>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='flex h-10 justify-center items-end gap-20 sm:gap-10'>
                    <div className='flex flex-col'>
                    <Link
                        href="/chats"
                        className={`font-bold text-xl transition-all duration-75 px-3 rounded-b-[4px] ${pathname === "/chats"
                                ? "text-blue-600"
                                : "text-zinc-700"
                            }`}
                    >
                        Chats
                    </Link>
                    <span  className={`rounded-full ml-1 ${pathname === "/chats" ? " bg-blue-500" : "bg-none"}  h-1 transition-all duration-300`}></span>
                    </div>
                    <div className='flex flex-col'>
                    <Link
                        href="/groups"
                        className={`font-bold px-3 text-xl transition-all duration-75 text-zinc-800 ${pathname === "/groups"
                                ? "text-blue-500"
                                : "text-zinc-700"
                            }`}
                    >
                        Groups
                    </Link>
                    <span  className={`rounded-full ml-1 ${pathname === "/groups" ? " bg-blue-500" : "bg-none"}  h-1 transition-all duration-300`}></span>
                    </div>

                </motion.div>
                <div className='h-[1px] bg-slate-300 '></div>
            </div>
        </motion.div>
    )
}

export default SideBar