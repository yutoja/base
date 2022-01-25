import { Outlet } from 'react-router-dom'
import jj from '../../aset/123.jpg'
import Rest from './rest/index'
import './index.css'
import { get, remove } from '../../ulits/storage'
import { useState } from 'react'
export default function Home() {
  // 个人信息
  const data = get('socketId')
  if (!data) {
    window.location.href = window.location.origin
  }

  function unlogin() {
    remove('socketId')
    window.location.href = window.location.origin
  }
  const [rest, setRest] = useState(false)
  function tiggres(bl: boolean) {
    setRest(bl)
  }
  return (
    <>
      <div className="ho_header">
        <div className="he_le">
          <p>React</p>
        </div>
        <div className="he_ri">
          <div className="imgg">
            <img src={jj} />
            <ul className="userList">
              <li onClick={() => tiggres(true)}>修改密码</li>
            </ul>
          </div>

          <p>{get('socketId').nickname}</p>
          <span>|</span>
          <p className="currrr" onClick={unlogin}>
            退出
          </p>
        </div>
      </div>
      {rest && (
        <div className="restpa">
          <div className="testhead">
            <span className="testxiao" onClick={() => tiggres(false)}>
              X
            </span>
          </div>
          <Rest user={data}></Rest>
        </div>
      )}

      <Outlet></Outlet>
    </>
  )
}
