import { useState, useEffect, useRef } from 'react'

import './index.css'

import Button from '../../../components/Button'

import Table from './Table/index'

import UseFo from './userFo'

import Asied from './Asied'

import { getUsers, getcount, getshu } from '../../../ulits/request'

import { get as gget } from '../../../ulits/storage'

export default function UserControl() {
  // 获取搜索框dom元素
  const onpu = useRef(document.createElement('input'))
  // 用户数据
  const [da, setda] = useState([])
  // 总人数和指定用户人数
  const [du, setdu] = useState({ users: 0, shu: 0 })
  // 查看用户的索引
  const [index, setIndex] = useState(0)
  // 登录用户数据
  const data = gget('socketId')
  // 存储搜索框的内容
  const [inlue, setinvalue] = useState('')
  useEffect(() => {
    // 获取用户数据和指定用户人数
    get(10, 0, '')
    // 总人数
    getcount().then(
      ({
        data: {
          data: [a],
        },
      }) => {
        setdu(a)
      }
    )
  }, [])
  // 表头
  const [state, setstate] = useState(['姓名', '职务', '账号', '账号状态', '角色', '操作'])
  // 详情内容
  const listname = {
    password: {
      name: '密码',
      title: '请输入密码',
    },
    identity: {
      name: '身份证',
      title: '请输入身份证号',
    },
    jurisdiction: {
      name: '角色',
      title: '请输入部门',
    },
    name: {
      name: '名称',
      title: '请输入部门',
    },
    nickname: {
      name: '职务',
      title: '请输入部门',
    },
    phone: {
      name: '手机号码',
      title: '请输入手机号码',
    },
    status: {
      name: '状态',
      title: '请设置用户状态',
    },
    type: {
      name: '权限',
      title: '请设置用户权限1最高3最低',
    },
    id: {
      name: '用户id',
      title: '******',
    },
  }
  // 是否显示详情
  const [as, setas] = useState(true)
  // 控制是否显示详情
  function hiee(index: number) {
    index === -1 ? setas(true) : setas(!as)
    setIndex(index)
  }

  function click() {
    setinvalue(onpu.current.value)
  }
  // 获取数据
  function get(lim: number, offset: number, like?: string) {
    if (like || like == '') {
      getshu(inlue, data.type).then(({ data }) => {
        setdu((value) => {
          value.shu = data.data[0].reshu
          return value
        })
      })
    }
    getUsers(data.type, lim, offset, like).then(({ data: { data } }) => {
      data.push({
        name: null,
        nickname: null,
        password: null,
        phone: null,
        identity: null,
        jurisdiction: null,
        status: null,
        type: null,
      })
      setda(data)
    })
  }
  return (
    <div className="userbody">
      <div className="userchon">
        <div className="user_le">
          <p className="le_he">江西省</p>
          <div></div>
        </div>
        <div className="user_ri">
          <p className="le_he">
            江西省 <span className="red minsize">{du && du.users}</span> 人
          </p>
          <div className="ri_body">
            <div className="sou">
              <input type="text" placeholder="请输入关键字" ref={onpu} />
              <Button click={click} heigth="0.2083" width="0.4167">
                搜索
              </Button>
            </div>
            <div className="offtable">
              <Table listHead={state} listTabl={da} tigg={hiee} huo={get} user={data}></Table>
            </div>
            <div className="userFo">
              <UseFo tigg={hiee} length={da.length} huo={get} renshu={du.shu} inva={inlue} user={data}></UseFo>
            </div>
          </div>
        </div>
      </div>
      <Asied hie={hiee} as={as} date={da[index]} List={listname} user={data}></Asied>
    </div>
  )
}
