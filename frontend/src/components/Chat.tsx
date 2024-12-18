"use client"
import React, { useEffect, useState } from 'react'
import ChartCard from './ChartCard'
import useConnectToWs from "@/lib/useConnectToWs"
import ButtomInput from './ButtomInput'
import ChatTopBar from './ChatTopBar'

function Chat({email}:{email:string}) {
  const {message, sentMessage} = useConnectToWs()
  return (
    <div className='w-full'>
      <ChatTopBar email={email}/>
        <ChartCard dataSet={message} email={email}/>
        <ButtomInput email={email} sentMessage={sentMessage}/>
    </div>
  )
}

export default Chat