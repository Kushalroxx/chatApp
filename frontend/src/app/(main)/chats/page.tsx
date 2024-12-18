"use client"
import SideBar from '@/components/SideBar'
import useConnectToWs from '@/lib/useConnectToWs'
import React from 'react'

function page() {
  const {message, sentMessage} = useConnectToWs()
  return (
    <div>
        <SideBar/>
    </div>
  )
}

export default page