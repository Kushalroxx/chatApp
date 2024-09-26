import { redisClient } from "../db/redis.db"
import activeUser from "./inMemoryDbs/activeUser"

export const redisFirstLoad = async()=>{
    const allConnectedUser = await redisClient.hgetall("connectedUser")
    if(allConnectedUser){
        for(const key in allConnectedUser){
            activeUser.add(key,JSON.parse(allConnectedUser[key]))
        } 
    }
}