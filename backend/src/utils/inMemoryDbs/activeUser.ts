import WebSocket from "ws"
class ActiveUser{
    private activeUsers:Map<string, WebSocket|null>
    constructor(){
        this.activeUsers = new Map()
    }
    add(email:string,ws:WebSocket|null){
        if(this.activeUsers.has(email)){
            return false
        }
        this.activeUsers.set(email,ws)
        return true
    }
    remove(email?:string){
        if(!email){
            this.activeUsers.clear()
            return true
        }else if(this.activeUsers.has(email)){
            this.activeUsers.delete(email)
            return true
        }else{
            return false
        }
    }
    get(email:string){
        if(this.activeUsers.has(email)){
            return this.activeUsers.get(email)
        }
        return
    }
    getAll(){
        return this.activeUsers
    }
    has(email:string){
        if(this.activeUsers.has(email)){
            return true
        }
        return false
    }
}

const activeUser = new ActiveUser()

export default activeUser