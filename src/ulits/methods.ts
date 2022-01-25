export const danwindow = function(value:string, type:number) {
  const a = document.createElement('div')
  const b = document.createElement('span')
  a.className = ' dohuan huanda'
  b.className = `iconfont  ${type ?'icon-wancheng':'icon-71shibai maxred'}`
  a.innerText = value
  a.appendChild(b)
  document.body.appendChild(a)
  let d = setTimeout(() => {
    document.body.removeChild(a)
    clearTimeout(d)
    
  }, 2000)
}

export const time = (time:number)=>{
  const date = new Date(time)
  const da = new Date().getDate()
  const now = Date.now()
  // 日期
  const day = date.getDate()
  const jday = day > 9 ? day : '0' + day
  // 小时
  const hours = date.getHours()
  const jhours = hours > 9 ? hours : '0' + hours
  // 分
  const Minutes = date.getMinutes()
  const jMinutes = Minutes > 9 ? Minutes : '0' + Minutes
  //月
  const Month = (date.getMonth() + 1)
 const jmouth =  Month > 9 ? Month : '0' + Month
  //秒
  const Seconds = date.getSeconds()
  const jSeconds =  Seconds > 9 ? Seconds : '0' + Seconds
  
if(da-day<1){
  return `${jhours}:${jMinutes}:${jSeconds}`
}else if(da-day<2){
  return `昨天 ${jhours}:${jMinutes}:${jSeconds}`
}else if(da-day<3){
  return `前天 ${jhours}:${jMinutes}:${jSeconds}`
}else{
  return `${date.getFullYear()}-${jmouth}-${jday} ${jhours}:${jMinutes}:${jSeconds}`
}
}