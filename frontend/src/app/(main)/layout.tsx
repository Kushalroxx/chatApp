"use server"
import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

function layout({
    children}:{
        children:React.ReactElement
    }) {
    if (cookies().has("token")) {
        return (
        <div className="overflow-y-hidden h-screen bg-zinc-100">
      <Navbar login={cookies().has("token")}/>
      {children}
      </div>
  )
} else {
    redirect("/login")
}
}


export default layout