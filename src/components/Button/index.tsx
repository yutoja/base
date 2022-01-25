import React, { Component } from 'react'
import './index.css'

interface BU {
  children: string
  click: any
  color?: string
  background?: string
  heigth?: string
  width?: string
}

export default class Input extends Component<BU> {
  render(): React.ReactNode {
    const { children, click, color = 'white', background = '#1890ff', heigth = '0.1563', width = '0.4617rem' } = this.props
    return (
      <>
        <button onClick={click} className="butt" style={{ color: `${color}`, background: `${background}`, height: `${heigth}rem`, width: `${width}rem` }}>
          {children}
        </button>
      </>
    )
  }
}
