import React from 'react'
import { freeze as fr } from '../../../../ulits/request'
import './index.css'
import { danwindow } from '../../../../ulits/methods'
interface ob {
  xian: string
  type: string
}
interface ty {
  id: number
  nickname: string
  name: string
  type: string
  phone: string
  status: string
  jurisdiction: string
  identity: string
}
export default function Table(List: any) {
  const { tigg, listTabl, huo, user } = List
  function freeze(id: number, status: boolean, type: string) {
    if (type <= user.type) {
      if (id === user.id) {
        return danwindow('自己都不放过?', 1)
      }
      return danwindow('不是吧，咱俩同级', 1)
    }
    fr(id, !status).then(({ data }) => {
      if (data.code === 200) {
        danwindow(data.data, 1)
        huo(10, 0)
      }
    })
  }
  return (
    <>
      <table className="tbodysc">
        <thead className="skitth">
          <tr className="tabhead">
            {List.listHead.map((value: string, index: number) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
        {listTabl.length > 0 && (
          <tbody>
            {List.listTabl.slice(0, List.listTabl.length - 1).map(({ id, nickname, name, type, phone, status, jurisdiction }: ty, index: number) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{nickname}</td>
                <td>{phone ? phone : '暂未填写'}</td>
                <td>{status ? '正常' : '已冻结'}</td>
                <td>{jurisdiction}</td>
                <td>
                  <span
                    className="taban befo"
                    onClick={() => {
                      tigg(index)
                    }}
                  >
                    详情
                  </span>
                  <span
                    className="taban"
                    onClick={() => {
                      freeze(id, Boolean(status), type)
                    }}
                  >
                    {status ? '冻结' : '解冻'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  )
}
