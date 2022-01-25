import './index.css'
import { restpassword } from '../../../ulits/request'
import { danwindow } from '../../../ulits/methods'
export default function Rest(as: any) {
  const { user } = as
  let data = {}
  function passChang(e: any) {
    const { name, value } = e.target
    data[name] = value
  }
  function rest() {
    if (data['news'] && data['old'] && data['news'] === data['old']) {
      restpassword(user.id, data['old']).then(({ data }) => {
        if (data.code == 200) {
          danwindow('修改成功', 1)
        } else {
          danwindow('修改失败', 0)
        }
      })
    }
  }
  return (
    <div className="rest" onChange={passChang}>
      <label htmlFor="tes">
        新密码:
        <input type="text" placeholder="请输入密码" id="tes" name="news" />
      </label>
      <label htmlFor="tse">
        新密码:
        <input type="text" placeholder="请再次输入" id="tse" name="old" />
      </label>
      <button className="restbu" onClick={rest}>
        重置密码
      </button>
    </div>
  )
}
