import { redisClient } from "../db/redis.db";
import activeUser from "./inMemoryDbs/activeUser";

redisClient.on("ready",()=>{
    const active = activeUser.getAll()
    active.forEach((ws, email)=>{
        ws?.close()
    })
    activeUser.remove()
    })
    
