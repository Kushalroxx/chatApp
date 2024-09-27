import { redisClient, redisPublisher } from "../db/redis.db"
import activeUser from "../utils/inMemoryDbs/activeUser"

export const disconnectControler = async(email:string)=>{
    activeUser.remove(email)
    
    if(redisClient.status == "ready"){
        try {
            await redisPublisher.publish("activeUserChannel",JSON.stringify({action:"disconnect",email}))
            
        } catch (error) {
            console.log(error)
        }

    }else{
        console.log("redis is down");
        
    }
}