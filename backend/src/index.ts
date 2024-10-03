import app from "./app";
import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { wsMiddlewere } from "./middlewere/ws.middlewere";
import { messageControler } from "./controler/message.controler";
import { connectionControler } from "./controler/connection.controler";
import { disconnectControler } from "./controler/disconnect.controler";
import { handleSubscribe } from "./utils/handleSubscribe";
import "./utils/redisReconnect"
import { serverRestart } from "./utils/handleServerStart";

new Promise(e=>setTimeout(e=>{
    handleSubscribe()
    serverRestart()
},1000))

const server = app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})
const wss = new WebSocketServer({server});
wss.on("connection", async(ws: WebSocket,req) => {
    const user:{id:string,email:string}|any = await wsMiddlewere(ws, req);
    connectionControler(user,ws)
    ws.on("message", async(message: string, isBinary: boolean,ws:WebSocket) => {
       messageControler(message,isBinary,user?.email)
    });
    ws.on("close",()=>{
        disconnectControler(user?.email)
    })
})