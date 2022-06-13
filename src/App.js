import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from "./pages/Login"
import Login from "@/pages/Login"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Artical from "./pages/Artical"
import Publish from "./pages/Publish"
import { AuthRoute } from '@/components/AuthRoute'
import { HistoryRouter, history } from './utils/history'

function App () {
  return (
    // 路由配置
    // 实现组件外的路由跳转
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path='/' element={
          <AuthRoute>
            <Layout />
          </AuthRoute>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='artical' element={<Artical></Artical>}></Route>
          <Route path='publish' element={<Publish></Publish>}></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  )
}

export default App
