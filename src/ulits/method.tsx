import { Route, Routes } from 'react-router-dom'
import { ReactNode } from 'react'
interface IRouter {
  id: number
  path: string
  title: string
  exact?: boolean
  component?: ReactNode
  children?: IRouter[]
}
export function rendern(compents: IRouter[]) {
  return <Routes>{re(compents)}</Routes>
}
function re(arr: IRouter[], path: string = '') {
  return arr.map((value) => {
    let pp = path + value.path
    if (path.endsWith('/') && value.path.startsWith('/')) {
      pp = path + value.path.slice(1)
    }
    return (
      <Route path={`${path == '/' ? value.path : pp}`} key={value.id} element={value.component}>
        {value.children && re(value.children, pp)}
      </Route>
    )
  })
}
