import React, { Component } from 'react'
import './index.css'
interface type {
  title: string
  visibility: boolean
  name: string
}
export default class Input extends Component<type> {
  state = {
    type: true,
  }
  constructor(props: type) {
    super(props)
  }
  tigge = () => {
    const { type } = this.state
    this.setState({
      type: !type,
    })
  }
  render(): React.ReactNode {
    const { title, visibility, name } = this.props
    const { type } = this.state
    return (
      <div className="shuru">
        <label htmlFor={name}>{title}：</label>
        <div className="shuru_la">
          <input type={type ? 'text' : 'password'} name={name} id={name} />
          {visibility ? <span className={`${type ? 'icon-kejian' : 'icon-yincang'} iconfont`} onClick={this.tigge}></span> : <></>}
        </div>
      </div>
    )
  }
}
