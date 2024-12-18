import React from 'react'
import ChatDisplayer from './ChatDIsplayer'

function SentChatDisplayer({text}:{text:string}) {
  return (
    <div className='flex justify-end mr-9 mb-4'>
        <ChatDisplayer text={text}/>
    </div>
  )
}

export default SentChatDisplayer