"use client"
import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion"
import ReceiveChatDisplayer from './ReceiveChatDisplayer'
import SentChatDisplayer from './SentChatDisplayer'

function ChartCard({
  dataSet,
  email
}: {
  dataSet: { from: string, to: string, message: string }[],
  email: string
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dataSet])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-5 mt-2 h-[66%] overflow-y-scroll w-full"
    >
      {dataSet.map((e: any, index: number) =>
        e?.from === email ? (
          <ReceiveChatDisplayer key={index} text={e.message} />
        ) : e?.to === email ? (
          <SentChatDisplayer key={index} text={e.message} />
        ) : null
      )}
      <div ref={bottomRef}></div>
    </motion.div>
  )
}

export default ChartCard
