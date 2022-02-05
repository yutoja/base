import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { time } from '../../../../ulits/methods'
import jj from '../../../../aset/123.jpg'
import { get } from '../../../../ulits/storage'
import { getchat, getUser } from '../../../../ulits/request'
import { socket } from '../../../../webSocket'
let enter = false
let arr: any[] = []
let user: any
export default function Zhubo(vl: any) {
  let yu = 0
  let {
    state: { id, state },
  }: any = useLocation()
  let [a, seta] = useState(1)
  const data = get('socketId')
  let yong = useRef(document.createElement('div'))
  let [value, setvalue] = useState('')
  let [huo, setHuo] = useState(true)
  let [date, setData] = useState([])
  useEffect(() => {
    getUser(id).then(({ data: { data } }) => {
      user = data[0]
    })
    // 获取聊天信息
    getchat(id, data.id, date.length ? date.length + 1 : 10, 0).then(({ data }: any) => {
      setData((value) => {
        const { scrollTop, clientHeight, scrollHeight } = yong.current
        // 判断是否获取新数据后滚动
        if (scrollHeight - (scrollTop + clientHeight) < 30) {
          Promise.resolve().then((value) => {
            yong.current.scrollTop = yong.current.scrollHeight
          })
        } else {
          // 聊天页面卷入长度不变
          Promise.resolve().then((value) => {
            yong.current.scrollTop = scrollTop
          })
        }
        return data.data
      })
    })
  }, [id, state])
  // 判断当前消息是否与上一条时间间隔过大
  function max(time: number) {
    if (time - yu > 86400) {
      yu = time
      return true
    }
    return false
  }
  // 发送信息
  function send() {
    if (!value) return
    socket.send(
      JSON.stringify({
        user: data.id,
        beiuser: id,
        text: value,
      })
    )
    // 发送信息回到底部
    yong.current.scrollTop = yong.current.scrollHeight
    setvalue('')
  }
  // 监听输入框
  function chang(e: any) {
    setvalue(e.target.value)
  }
  // 输入框获得焦点
  function fou(e: any) {
    enter = true
  }
  // 输入框失去焦点
  function blu(e: any) {
    enter = false
  }
  window.onkeyup = function (e: any) {
    arr = arr.filter((value) => value !== e.key)
    if (e.key === 'Enter' && !arr.includes('Control') && enter) {
      send()
    }
  }
  window.onkeydown = (e: any) => {
    arr.push(e.key)
    if (arr.includes('Control') && arr.includes('Enter')) {
      setvalue((value) => value + '\n')
    }
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  // 用户滚动至顶端刷新数据
  function liscroll(e: any) {
    if (e.target.scrollTop == 0 && huo) {
      setHuo(false)
      getchat(id, data.id, 10, date.length).then(({ data }: any) => {
        if (data.code == 200) {
          setHuo(true)
          setData((value) => {
            const dat = data.data
            return dat.concat(value)
          })
        }
      })
    }
  }
  return (
    <>
      <div className="combody">
        <p className="bohe">{user?.nickname}</p>
        <div className="comzhu">
          <div className="look yangshi" ref={yong} onScroll={liscroll}>
            {date.length > 0 &&
              date.map((value: any) => {
                if (value.user == data.id) {
                  return (
                    <div className="lookRight" key={value.id}>
                      {max(value.time) && <div className="looktishi">{time(value.time)}</div>}
                      <div className="looknei liwo">
                        <div className="lookroun">{value.text}</div>
                        <img src={jj} className="liaoimh" />
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="lookLeft " key={value.id}>
                    {max(value.time) && <div className="looktishi">{time(value.time)}</div>}
                    <div className="looknei liwo">
                      <img src={jj} className="liaoimh" />
                      <div className="lookroun">{value.text}</div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="send">
            <textarea className="text yangshi" onChange={chang} value={value} onFocus={fou} onBlur={blu}></textarea>
            <div className="sends">
              按Enter发送,按Ctrl+Enter换行
              <button className="seed" onClick={send}>
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
