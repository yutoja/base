import React from 'react'

import NavList from '../navList'
import { Outlet } from 'react-router-dom'
import './index.css'
export default function Control() {
  return (
    <div className="body">
      <NavList></NavList>
      <Outlet></Outlet>
    </div>
  )
}
