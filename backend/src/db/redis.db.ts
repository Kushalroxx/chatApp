import Redis from "ioredis";

const redisConnectionObj = {
    port: 6379,
    host: "localhost",
    retryStrategy:(times:number)=>{
        if(times>10){
            return
    }
    console.warn("reconnecting to redis");
    return 10000
}}
export const redisClient = new Redis(redisConnectionObj);
export const redisPublisher = new Redis(redisConnectionObj)
export const redisSubscriber = new Redis(redisConnectionObj)
export const redisMessageSubscriber = new Redis(redisConnectionObj)
export const redisMessagePublisher = new Redis(redisConnectionObj)


redisClient.on("error",(err)=>{
    console.log(err)
})

redisSubscriber.on("error",(err)=>{
    console.log(err)
})

redisPublisher.on("error",(err)=>{
    console.log(err)
})

redisMessageSubscriber.on("error",(err)=>{
    console.log(err)
})

redisMessagePublisher.on("error",(err)=>{
    console.log(err)
})

