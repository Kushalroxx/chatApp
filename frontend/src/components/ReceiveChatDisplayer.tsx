import React from 'react'
import ChatDisplayer from './ChatDIsplayer'

function ReceiveChatDisplayer({text}:{text:string}) {
  return (
    <div className='ml-9 mb-4'>
        <ChatDisplayer text={text}/>
    </div>
  )
}

export default ReceiveChatDisplayer