import jj from '../../../aset/123.jpg'
import { useEffect, useState, useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { getUsercom } from '../../../ulits/request'
import { get } from '../../../ulits/storage'
import { socket } from '../../../webSocket'
import './index.css'
export default function Commun() {
  let [dat, setdate] = useState([])
  // 获取路由参数
  let route: any = useLocation()

  const [tiji, setTojia] = useState(false)
  // 存储指定聊天用户的焦点状态
  const [fou, setfou] = useState(false)
  // 存储指定聊天用户组件
  const ue = useRef(null)
  let id = route.state?.id
  let [Id, setId] = useState(id || 0)
  let navigate = useNavigate()
  // 个人信息
  const data = get('socketId')
  // 存储用户交互情况
  let [userList, setuserList] = useState({})
  useEffect(() => {
    // 获取历史聊天用户
    getUsercom(data.id).then(({ data }) => {
      if (data.code === 200) {
        setdate(data.data)
        let a = {}
        data.data.forEach((value: any) => {
          a[value.id] = {
            value: '',
            have: value.have,
          }
        })
        setuserList(a)
      }
    })
    window.onclick = function () {
      setTojia(false)
    }
  }, [])
  socket.onmessage = function (e) {
    const a = JSON.parse(e.data)
    // 接收者是不是自己
    if (a.beiuser === data.id) {
      userList[a.user].have = true
      tiggId(id, 0)
    }
    if (a.user === data.id) {
      tiggId(id, 0)
    }
  }
  // 跳转指定用户页面
  function ku(e: any) {
    const { value }: any = ue.current
    if (e.key == 'Enter' && fou && value % 1 === 0) {
      let state = 0
      navigate(`/home/commun/Zhubo`, {
        state: {
          id: value * 1,
          state,
        },
      })
      setTojia(false)
    }
  }
  // 切换聊天对象
  function tiggId(id: number, n: number) {
    let state = 0
    if (n === 0) {
      state = Date.now()
    }
    setId(id)
    userList[id] && (userList[id].have = false)
    setuserList(userList)
    navigate(`/home/commun/Zhubo`, {
      state: {
        id,
        state,
      },
    })
  }

  return (
    <>
      <div className="comList">
        <div className="comhead">
          最近联系人{' '}
          <span
            className="iconfont icon-tianjia"
            onClick={(e) => {
              e.stopPropagation()
              setTojia(true)
            }}
            title="与其他人聊天"
          ></span>
          {tiji && (
            <div className="tianjia">
              <input
                ref={ue}
                type="text"
                placeholder="输入id后按下回车进入页面"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onFocus={() => {
                  setfou(true)
                }}
                onBlur={() => {
                  setfou(false)
                }}
                onKeyUp={ku}
              />
            </div>
          )}
        </div>
        <ul className="liul yangshi">
          {dat.map((value: any) => (
            <li
              key={value.id}
              onClick={() => {
                tiggId(value.id, 1)
              }}
              className={`${value.id === Id ? 'chee ' : ' '} ${userList[value.id]?.have ? 'dain' : ''} `}
            >
              <img src={jj} className="image" />
              <div>
                <p className="dahe">{value.name}</p>
                <div>{value.jurisdiction}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Outlet></Outlet>
    </>
  )
}
