import React, { useState, useEffect } from 'react'

import Button from '../../../../components/Button'

import './index.css'

export default function UserFo(data: any) {
  const { tigg, length, huo, renshu, inva, user } = data
  // 储存页量
  const [offset, setoffset] = useState(10)
  // 分页模块
  const [buju, setbuju] = useState([1])
  // 储存页数
  const [index, setIndex] = useState(1)
  useEffect(() => {
    // 监听数据总数 页量 调整分页模块
    const i = renshu / offset
    if (i > 5) {
      if (index < 2) {
        setbuju([1, 2, 3, 4, 5])
      } else if (index > i - 2) {
        setbuju([i - 5, i - 4, i - 3, i - 2, i - 1, i])
      } else {
        setbuju([index - 2, index - 1, index, index + 1, index + 2])
      }
    } else {
      let s = []
      for (let a = 0; a < i; a++) {
        s.push(a + 1)
      }
      setbuju(s)
    }
  }, [renshu, offset])
  useEffect(() => {
    // 监听页数 页量 条件 获取数据
    huo(offset, (index - 1) * offset, inva)
  }, [offset, index, inva])
  // 设置一页容纳的数据量
  function a(e: any) {
    setoffset(e.target.value)
  }
  return (
    <>
      <div>
        {user.type <= 2 && (
          <>
            {' '}
            <Button
              click={() => {
                tigg(length - 1)
              }}
              heigth="0.2083"
              width="0.5729"
            >
              新增人员
            </Button>
            <span className="fenge"></span>
          </>
        )}

        <Button
          click={() => {
            huo(offset, (index - 1) * offset)
          }}
          heigth="0.2083"
          width="0.5729"
        >
          同步人员
        </Button>
      </div>

      <div className="fenye">
        <p>共{renshu}条</p>
        <div className="fenyy">
          <div className="fenKuan">
            <span
              className="icon-jiantouzuo iconfont"
              onClick={() => {
                setIndex((index) => {
                  if (!(index < 2)) {
                    return index - 1
                  }
                  return index
                })
              }}
            ></span>
          </div>
          {buju.map((value) => (
            <div
              className={`fenKuan ${value == index && 'check'}`}
              key={value}
              onClick={() => {
                setIndex(value)
              }}
            >
              {value}
            </div>
          ))}

          <div className="fenKuan">
            <span
              className="icon-jiantouyou iconfont"
              onClick={() => {
                setIndex((index) => {
                  if (!(index > renshu / offset)) {
                    return index + 1
                  }
                  return index
                })
              }}
            ></span>
          </div>
        </div>
        <select name="pages" id="pet-select" value={offset} onChange={a}>
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="30">30条/页</option>
          <option value="50">50条/页</option>
        </select>
      </div>
    </>
  )
}
