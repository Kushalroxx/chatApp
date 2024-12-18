"use client"
import React, { useEffect } from "react"
import { useRecoilState } from 'recoil'
import { dataSetState, emailState, wsState } from '@/lib/atom'

function useConnectToWs() {
    const url = "ws://localhost:5000"
    const [message, setMessage] = useRecoilState(dataSetState)
    const [userEmail, setUserEmail] = useRecoilState(emailState)
    const [ws, setWs] = useRecoilState<undefined | WebSocket>(wsState)
    useEffect(() => {
        const stringEmail = localStorage.getItem("email")
        const email = stringEmail&&JSON.parse(stringEmail)
        setUserEmail(email)
        const convart = localStorage.getItem(email)
        setMessage(convart ? JSON.parse(convart) : [])
        if (!ws) {
            const connection = new WebSocket(url)
            setWs(connection)
            connection.onopen = ()=>console.log("connected");
            connection.onerror  = (e)=>console.log(e);
            connection.onmessage = (msg: any) => {
                msg = JSON.parse(msg.data)
                if (msg.from) {
                    // @ts-ignore
                    setMessage(e => [...e, msg])   
                }
            }
            connection.onclose = ()=>{
                setWs(undefined)
            }
        }

    }, [url])
    useEffect(() => {
        if (message.length >= 1) {

            localStorage.setItem(userEmail, JSON.stringify(message))
        }
    }, [message])

    const sentMessage = (message: string, email: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            // @ts-ignore
            setMessage(e => [...e, { message: message, to: email }])

            ws.send(JSON.stringify({ toEmail: email, message: message }))
        }
    }
    return { message, sentMessage }
}

export default useConnectToWs