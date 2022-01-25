import {get} from "../ulits/storage"
export const socket = new WebSocket("ws:localhost:8889")

socket.onopen = ()=>{
  const data =  get("socketId")
  socket.send(JSON.stringify({
    type:"socketId",
    data:data.id
  }))
}
