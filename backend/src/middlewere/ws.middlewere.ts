import WebSocket from "ws";
import { prisma } from "../../prisma/db";

export const wsMiddlewere = async(ws: WebSocket, req: any) => {
    const token = req.headers.cookie?req.headers.cookie["token"]:req.headers["token"];
    if(!token) {
        ws.send(JSON.stringify({status:"failed", message:"Unauthorized please provide a token"}));
        ws.close();
        return;
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
                session:token
            }
        })
        if(!user) {
            ws.send(JSON.stringify({status:"failed", message:"Unauthorized session expired"}));
            ws.close();
            return;
        }
        return {email:user.email};
    } catch (error) {
        ws.send(JSON.stringify({status:"failed", message:"Something went wrong while processing"}));
        ws.close();
        console.log(error);
        return
        
    }
}