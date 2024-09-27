import activeUser from "../utils/inMemoryDbs/activeUser"
import { redisClient,redisPublisher } from "../db/redis.db"
import WebSocket from "ws"

export const connectionControler = async(user:{email:string}, ws:WebSocket)=>{
    if(!user){
        return
    }
    activeUser.add(user.email, ws)
    ws.send(JSON.stringify({status:"success", message:"connected sucessfully"}))
    if (redisClient.status==="ready") {
        let recivedMessages
        try {
            recivedMessages = await redisClient.lrange(user.email,0,-1)
            await redisClient.del(user.email)
            
        } catch (error) {
            
        }
        if(recivedMessages){
            recivedMessages.forEach((e)=>{
                const obj :{fromEmail:string,message:string}= JSON.parse(e)
                ws.send(JSON.stringify({status:"success",message:obj.message,fromEmail:obj.fromEmail}))
            })
        }
    }
        
    if(redisClient.status=="ready"){
        try {            
            await redisPublisher.publish("activeUserChannel",JSON.stringify({action:"connect",email:user.email}))
            return
        } catch (error) {
            console.log(error)
            return
        }
    }else{
        ws.send(JSON.stringify({status:"failed",message:"service is unavailable"}))
        ws.close()
    }
    
}