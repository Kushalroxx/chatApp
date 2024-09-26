import WebSocket from "ws"

class TempQueue{
    private queue:{email:string,ws:WebSocket,action:"connect"|"disconnect"}[]
    constructor(){
        this.queue = []
    }
    enQueue(element:{email:string,ws:WebSocket,action:"connect"|"disconnect"}){
        return this.queue.push(element)
    }
    deQueue(){
        return this.queue.shift()
    }
    peek(){
        if(this.queue[0]){
            return true
        }else{
            return false
        }
    }
}
const tempQueue = new TempQueue()
export default tempQueue