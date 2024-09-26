import WebSocket from "ws";
import activeUser from "../utils/inMemoryDbs/activeUser";
import { redisClient } from "../db/redis.db";

export const messageControler = async(msg:string,isBinary:boolean,userEmail:string)=>{
    try {
        const {message, toEmail} = isBinary?msg:JSON.parse(msg)
        if(!toEmail){
            const ws:WebSocket|undefined = activeUser.get(userEmail)
            ws?.send(JSON.stringify({status:"error",message:"please provide a email to send msg"}))
        }
        const reciverWs:WebSocket|undefined = activeUser.get(toEmail)
        if(reciverWs && reciverWs.readyState==WebSocket.OPEN){
            reciverWs.send(JSON.stringify({status:"success",message,from:userEmail}))
        }else{
            if(redisClient.status==="ready"){
                await redisClient.lpush(toEmail ,JSON.stringify({fromEmail:userEmail,message:message}))
            }else{
                const sentWs = activeUser.get(userEmail)
                sentWs?.send(JSON.stringify({status:"failed", message:"service is unavailabe"}))
                sentWs?.close()
                activeUser.remove(userEmail)
            }
            
        }
    } catch (error) {
        const ws:WebSocket|undefined = activeUser.get(userEmail)
            ws?.send(JSON.stringify({status:"error",message:"please provide a valid type of data"}))
        
    }
}