import { redisClient, redisSubscriber } from "../db/redis.db";
import WebSocket from "ws";
import tempQueue from "./inMemoryDbs/tempQueue";
import activeUser from "./inMemoryDbs/activeUser";

export const handleSubscribe = async()=>{
    if(redisClient.status === "ready"){
        await redisSubscriber.subscribe("activeUserChannel")
        redisSubscriber.on("message",(msg)=>{
            const message:{action:"connect"|"disconnect",email:string,ws:WebSocket} = JSON.parse(msg)
            tempQueue.enQueue(message)
        })
    }
    while(tempQueue.peek()){
        const value = tempQueue.deQueue()
        if(value?.action === "connect"){
            // @ts-ignore
            activeUser.add(value?.email, value?.ws)
        }else{
            activeUser.remove(value?.email||"")
        }
    }
}