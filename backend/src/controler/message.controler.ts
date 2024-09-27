import WebSocket, { on } from "ws";
import activeUser from "../utils/inMemoryDbs/activeUser";
import { redisClient, redisMessagePublisher, redisPublisher } from "../db/redis.db";

export const messageControler = async(msg:string,isBinary:boolean,userEmail:string)=>{
    try {
        const {message, toEmail} = isBinary?msg:JSON.parse(msg)
        if(!toEmail){
            const ws:WebSocket|undefined|null = activeUser.get(userEmail)
            ws?.send(JSON.stringify({status:"error",message:"please provide a email to send msg"}))
            return
        }
        if(!message){
            const ws:WebSocket|undefined|null = activeUser.get(userEmail)
            ws?.send(JSON.stringify({status:"error",message:"please provide a message"}))
            return
        }
        if(message==="??status"){
            const online = activeUser.has(toEmail)
            const ws:WebSocket|undefined|null = activeUser.get(userEmail)
            if(!online){
                ws?.send(JSON.stringify({status:"success",message:"offline"}))
            }else{
                ws?.send(JSON.stringify({status:"success",message:"online"}))
            }
        }
                
        if(!activeUser.has(toEmail)){
            if(redisClient.status==="ready"){
                await redisClient.lpush(toEmail ,JSON.stringify({fromEmail:userEmail,message:message}))
            }else{
                const sentWs = activeUser.get(userEmail)
                sentWs?.send(JSON.stringify({status:"failed", message:"service is unavailabe"}))
                sentWs?.close()
                activeUser.remove(userEmail)
            }
            return
        }
        const reciverWs:WebSocket|undefined|null = activeUser.get(toEmail)
        if(reciverWs && reciverWs.readyState==WebSocket.OPEN){
            reciverWs.send(JSON.stringify({status:"success",message,from:userEmail}))
        }else{
            if(redisClient.status === "ready"){
                redisMessagePublisher.publish("messageChannel",JSON.stringify({toEmail,message,fromEmail:userEmail}))
            }
            return
        }
    } catch (error) {
        console.log(error);
        
        const ws:WebSocket|null|undefined = activeUser.get(userEmail)
            ws?.send(JSON.stringify({status:"error",message:"please provide a valid type of data"}))
        
    }
}