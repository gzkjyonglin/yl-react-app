import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from "./pages/Login"
import Login from "@/pages/Login"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Artical from "./pages/Artical"
import Publish from "./pages/Publish"
import { AuthRoute } from '@/components/AuthRoute'
// import { Button } from 'antd'

function App () {
  return (
    // 路由配置
    <BrowserRouter>
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
      {/* <Button type="primary">Primary Button</Button> */}
    </BrowserRouter>
  )
}

export default App
