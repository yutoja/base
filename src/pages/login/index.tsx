import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { logins } from '../../ulits/request'
import { danwindow } from '../../ulits/methods'
import { set } from '../../ulits/storage'
import { pass, phone } from '../../ulits/test'
import './index.css'
let rxe = {
  ['name']: phone,
  ['password']: pass,
}
let colr = ['', 'red icon-71shibai', 'greed icon-wancheng']
function Home() {
  const [as, setas] = useState(0)
  const navigate = useNavigate()
  const [count, setCount] = useState({
    name: {
      value: '',
      type: 0,
    },
    password: {
      value: '',
      type: 0,
    },
  })
  let login = () => {
    const { name, password }: any = count

    logins(name.value, password.value).then(({ data }: any) => {
      console.log()
      if (data.code === 200) {
        set('socketId', data.data[0])
        navigate('/home')
      } else {
        danwindow(data.data, 0)
      }
    })
  }
  let dataChang = ({ target }: any) => {
    const { name, value } = target
    const as = count
    as[name].value = value
    setCount(as)
  }
  function dataBlur({ target }: any) {
    const { name, value } = target
    if (!name) return
    if (rxe[name].test(value)) {
      count[name].type = 2
      setCount(count)
    } else {
      count[name].type = 1
      setCount(count)
    }

    setas(Date.now())
  }
  return (
    <div className="login">
      <div className="back"></div>
      <div className="lobody" onChange={dataChang} onBlur={dataBlur}>
        <div className="impu">
          <span className="icon-200yonghu_yonghu iconfont inco "></span>
          <input type="text" name="name" />
          <span className={`xxxx iconfont ${colr[count['name'].type]}`}></span>
        </div>
        <div className="impu">
          <span className="icon-suo iconfont inco "></span>
          <input type="password" name="password" />
          <span className={` iconfont ${colr[count['password'].type]} xxxx`}></span>
        </div>
        <Button click={login} heigth="0.2083" width="1.7480">
          登录
        </Button>
      </div>
    </div>
  )
}
export default Home
