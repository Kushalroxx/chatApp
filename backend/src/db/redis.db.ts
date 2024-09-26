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


redisClient.on("error",(err)=>{
    console.log(err)
})
redisClient.on('end', () => {
    console.warn('Lost connection to Redis');
});
redisClient.on('connect', () => {
    console.log('connected to Redis');
});


redisPublisher.on("error",(err)=>{
    console.log(err)
})
redisPublisher.on('end', () => {
    console.warn('Lost connection to Redis');
});
redisPublisher.on('connect', () => {
    console.log('connected to Redis');
});


redisSubscriber.on("error",(err)=>{
    console.log(err)
})
redisSubscriber.on('end', () => {
    console.warn('Lost connection to Redis');
});
redisSubscriber.on('connect', () => {
    console.log('connected to Redis');
});