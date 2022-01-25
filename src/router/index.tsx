import { ReactNode, lazy } from 'react'
import { Suspense } from 'react'
const Home = lazy(() => import('../pages/Home/index'))
const Login = lazy(() => import('../pages/login/index'))
const Control = lazy(() => import('../pages/control/index'))
const UserControl = lazy(() => import('../pages/bodyList/userControl'))
const Commun = lazy(() => import('../pages/bodyList/communicate'))
const Wang = lazy(() => import('../pages/bodyList/communicate/wang'))
const Zhubo = lazy(() => import('../pages/bodyList/communicate/zhubo'))
interface IRouter {
  id: number
  path: string
  title: string
  exact?: boolean
  component?: ReactNode
  children?: IRouter[]
}
function zlayz(com: ReactNode) {
  return <Suspense fallback={<h1>loading.....</h1>}>{com}</Suspense>
}
export const router: IRouter[] = [
  {
    id: 1,
    path: '/home',
    title: 'Home',
    exact: true,
    component: zlayz(<Home />),
    children: [
      {
        id: 11,
        path: '/',
        title: 'Control',
        exact: true,
        component: zlayz(<Control />),
        children: [
          {
            id: 111,
            path: '/',
            title: 'UserControl',
            exact: true,
            component: zlayz(<UserControl />),
          },
          {
            id: 112,
            path: '/commun',
            title: 'Commun',
            exact: true,
            component: zlayz(<Commun />),
            children: [
              {
                id: 1111,
                path: '/',
                title: 'Wang',
                exact: true,
                component: zlayz(<Wang />),
              },
              {
                id: 1112,
                path: '/Zhubo',
                title: 'Zhubo',
                exact: true,
                component: zlayz(<Zhubo />),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    path: '/',
    title: 'Login',
    exact: true,
    component: zlayz(<Login />),
  },
]
