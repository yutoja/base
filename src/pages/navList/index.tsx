import { Link, useLocation } from 'react-router-dom'
import './index.css'
export default function NavList() {
  const { pathname } = useLocation()
  return (
    <div className="NavList">
      <ul className="Nav_ul">
        <li className={`${pathname == '/home' ? 'casaa' : ''}`}>
          <Link to="/home">用户管理</Link>
        </li>
        <li className={`${pathname.includes('/home/commun') ? 'casaa' : ''}`}>
          <Link to="/home/commun">用户沟通</Link>
        </li>
      </ul>
    </div>
  )
}
