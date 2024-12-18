"use client"
import { AnimatePresence, motion } from 'framer-motion'
import SideTopBar from './SideTopBar'
import { useRecoilValue } from 'recoil'
import { dataSetState } from '@/lib/atom'
import SideMenuBodyCard from './SideMenuBodyCard'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function SideBar() {
    const [cardTitles, setCardTitles] = useState(new Set())
    const messages = useRecoilValue(dataSetState)
    const router = usePathname()
    useEffect(() => {
        messages.forEach(msg=>{
      setCardTitles(e=>{
        const newSet = new Set(e)
        if(newSet.has(msg.from||msg.to)){
            newSet.delete(msg.from||msg.to)
            newSet.add(msg.from||msg.to)   
        }else{
            newSet.add(msg.from||msg.to)
        }
        return newSet
    })
    })
    }, [messages])
    
    return (
        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className='h-[88vh]'>
            <div className='w-screen md:w-[440px] sm:w-[250px] bg-gray-50 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thumb-zinc-300 scrollbar-thin py-2 shadow-lg shadow-zinc-400 border-r-2 border-zinc-300'>
                <SideTopBar/>
                <AnimatePresence mode="sync">{
                    // @ts-ignore
                   
                    [...cardTitles].reverse().map((e,i)=>{return(
                        <motion.div layout key={e} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{type:"spring",stiffness:300,damping:20}} exit={{opacity:0,y:-10,scale:0.5}}>
                        <SideMenuBodyCard key={e} email={e}/>
                        </motion.div>  
                        )})
                    }
                    </AnimatePresence>   
                </div>   
        </motion.div>
    )
}

export default SideBar