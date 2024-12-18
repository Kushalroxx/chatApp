import { atom } from "recoil";
import { string } from "zod";

export const dataSetState = atom<Array<{from:string,message:string,to:string}>>({
    key:"dataSet",
    default:[]
    
})
export const emailState = atom({
    key:"email",
    default:""
})
export const wsState = atom<WebSocket|undefined>({
    key:"ws",
    default:undefined
})