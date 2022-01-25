import { useState, useRef } from 'react'
import Button from '../../../../components/Button'
import { addUser, alertuser } from '../../../../ulits/request'
import { danwindow } from '../../../../ulits/methods'
import './index.css'

interface ty {
  name: string
  data: string
  title: string
}

export default function Asied(data: any) {
  const [a, seta] = useState(0)
  const { as, hie, date, List, user } = data
  function stop(e: any) {
    e.stopPropagation()
  }
  function dacj(e: any) {
    const { value, name } = e.target
    date[name] = value
    seta(Date.now())
  }
  function mu(ob: object) {
    const da = []
    for (const key in ob) {
      if (key == 'status') continue
      da.push(
        <div key={key}>
          {List[key].name}：
          <div className="asinpu">
            <input type="text" value={ob[key] ? ob[key] : ''} placeholder={List[key].title} name={key} onChange={dacj} disabled={key == 'id'} />
            <span className=" icon-wancheng iconfont greed"></span>
          </div>
        </div>
      )
    }
    return da
  }
  function add() {
    if (date.type > 3 || date.type < 1) {
      return danwindow('请设置正常的权限', 1)
    }
    if (date.password) {
      if (date.name && date.password && date.type) {
        addUser(date).then(({ data }) => {
          if (data.code == 200) {
            danwindow(data.data, 1)
            hie(0)
          } else {
            danwindow(data.data, 0)
          }
        })
      } else {
        danwindow('请把必要的名字和密码及权限填完', 0)
      }
    } else {
      alertuser(date.id, date).then(({ data }) => {
        if (data.code == 200) {
          danwindow(data.data, 1)
          hie(0)
        } else {
          danwindow(data.data, 0)
        }
      })
    }
  }
  return (
    <div
      className={`asdie ${as && 'hi'}`}
      onClick={() => {
        hie(-1)
      }}
    >
      <div className={`zhebian ${as && 'hidd'}`} onClick={stop}>
        <div className="ashe">详情</div>
        <div className="asbody">
          {mu(date)}
          {(date?.id == user.id || user.id == 1) && (
            <div className="quedi">
              <Button click={add} width=".3906" heigth=".1823">
                确定
              </Button>
              <span className="zhonji"></span>
              <Button
                click={() => {
                  hie(0)
                }}
                width=".3906"
                heigth=".1823"
              >
                取消
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
