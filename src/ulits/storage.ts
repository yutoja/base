export const set = (name:string,data:any):void=>{

    sessionStorage.setItem(name,JSON.stringify(data))
}
export const get = (name:string):any=>{
 const data:any =  sessionStorage.getItem(name)
 return JSON.parse(data)
 
}
export const remove = (name:string):void=>{
  sessionStorage.removeItem(name)
}
export const clear = ():void=>{
  sessionStorage.clear()
}