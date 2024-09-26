import app from "./app";
import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { wsMiddlewere } from "./middlewere/ws.middlewere";
import { messageControler } from "./controler/message.controler";
import { connectionControler } from "./controler/connection.controler";
import { disconnectControler } from "./controler/disconnect.controler";
import { handleSubscribe } from "./utils/handleSubscribe";
import { redisFirstLoad } from "./utils/redisFirstLoad";

handleSubscribe()
redisFirstLoad()

const server = app.listen(3000, () => {
    console.log("Server started on port 3000");
})
const wss = new WebSocketServer({server});
wss.on("connection", async(ws: WebSocket,req) => {
    const user:{id:string,email:string}|any = await await wsMiddlewere(ws, req);
    connectionControler(user,ws)
    ws.on("message", async(message: string, isBinary: boolean,ws:WebSocket) => {
       messageControler(message,isBinary,user?.email)
    });
    ws.on("close",()=>{
        disconnectControler(user?.email)
    })
})