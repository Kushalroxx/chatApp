import Chat from '@/components/Chat'
import SideBar from '@/components/SideBar'
import React from 'react'

async function page({params}:{
        params:Promise<{email:string}>
}) {
        const email = decodeURIComponent((await params).email)
        console.log(email);
        
        return (<div className='h-full w-full flex bg-zinc-100'>
                <SideBar />
                {email? <Chat email={email} /> : ""}
                
        </div>
        )}
export default page