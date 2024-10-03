import { redisClient, redisMessageSubscriber, redisServerRestartSubscriber, redisSubscriber } from "../db/redis.db";
import WebSocket from "ws";
import tempQueue from "./inMemoryDbs/tempQueue";
import activeUser from "./inMemoryDbs/activeUser";

export const handleSubscribe = async()=>{
    if(redisClient.status === "ready"){
        await redisSubscriber.subscribe("activeUserChannel")
        redisSubscriber.on("message",(channel,msg)=>{
            if(channel === "activeUserChannel"){
                const message:{action:"connect"|"disconnect",email:string,ws:WebSocket} = JSON.parse(msg)
                tempQueue.enQueue(message)
                while(tempQueue.peek()!=undefined){
                    const value = tempQueue.deQueue()
                    if(value?.action === "connect"){
                        activeUser.add(value?.email, null)
                    }else{
                        activeUser.remove(value?.email||"")
                    }
                }
            }
        })
        await redisMessageSubscriber.subscribe("messageChannel")
        redisMessageSubscriber.on("message",(channel, msg)=>{            
            if(channel ==="messageChannel"){
                const message:{message:string,toEmail:string,fromEmail:string} = JSON.parse(msg)
                
                const toWs = activeUser.get(message.toEmail)
                if(!toWs){
                    return
                }
                toWs.send(JSON.stringify({status:"success",message:message.message,fromEmail:message.fromEmail}))
            }
        })
        await redisServerRestartSubscriber.subscribe("serverRestart")
        redisServerRestartSubscriber.on("message",(channel, msg)=>{
            if(channel==="serverRestart"){
                const {message} = JSON.parse(msg)
                console.log(message);
                
                if(message === "clean"){
                    const active = activeUser.getAll()
                    active.forEach((ws, email)=>{
                        ws?.close()
                    })                    
                    activeUser.remove()
                } 
            }
        })
    }
}