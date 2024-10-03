import { redisClient, redisServerRestartPublisher } from "../db/redis.db";
export const serverRestart = async()=>{
    if(redisClient.status === "ready"){
        await redisServerRestartPublisher.publish("serverRestart",JSON.stringify({message:"clean"}))
    }
}