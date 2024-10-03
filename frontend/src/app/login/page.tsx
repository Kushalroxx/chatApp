"use server"
import Login from '@/components/Login'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function page() {
      if(!cookies().get("token")?.value){
      return (
        <Login/>
      ) 
      }else{
        redirect("/")
      }
}

export default page