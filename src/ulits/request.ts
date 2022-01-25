import request from "./ulis"
interface ty {
  password:string
  nickname?: string
  name: string
  type?: string
  phone?: number
  status?: string
  jurisdiction?: string
  identity?: string
}
// 登录
export const logins = (name:string,password:string):any=>{
   return request({
     url:"/api/login",
     method:"post",
     params:{
         name,
         password
     }
   })
}
// 获取数据
export const getUsers = (type:number,limit:number,offset:number,like?:string)=>{
 return request({
    url:"/api/getAll",
    params:{
      type,
      limit,
      offset,
      like,
      time:Date.now()
    }
  })
}
// 添加用户
export const addUser = (data:ty)=>{
   return request({
     url:"/api/add",
     method:"post",
     params:data
   })
}
// 获取用户数量
export const getcount = ()=>{
  return request({
    url:"/api/getcount",
  })
}
// 用户解冻或冻结
export const freeze = (id:number,status:boolean)=>{
  return request({
    url:"/api/alter/freeze",
    params:{
      id,
      status
    }
  })
}
// 获取用户列表
export const getUsercom = (id:number)=>{
  return request({
    url:"/news/getUser",
    params:{
      id
    }
  })
}
// 获取聊天信息
export const getchat = (id:number,beId:number, limit:number,offset:number)=>{
  return request({
    url:"/news/get",
    params:{
      id,
      beId,
      limit,
      offset,
      item:Date.now()
    }
  })
}
// 修改用户信息
export const alertuser = (id:number,data:any)=>{
  return request({
    url:"/api/alertUser",
    method:"POST",
    params:{
      id,
      data
    }
  })
}
// 获取用户
export const getUser =  (id:number)=>{
  return request({
    url:"/api/getUser",
    params:{
      id
    }
  })
}
// 符合条件的用户数量
export const getshu = (like?:string,type?:number)=>{
  return request({
    url:"/api/getshu",
    params:{
      like,
      type
    }
  })
}
// 符合条件的用户数量
export const restpassword = (id:number,password:number)=>{
  return request({
    url:"/api/alter/password",
    params:{
      id,
      password
    }
  })
}