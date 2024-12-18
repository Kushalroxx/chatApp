export const closeWs = (ws:WebSocket|undefined)=>{
    
    try {
        ws?.close()
        console.log("connection cloased");
        
    } catch (error) {
        
    }

}
