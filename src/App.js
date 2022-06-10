import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from "./pages/Login"
import Login from "@/pages/Login"
import Layout from "./pages/Layout"
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
          </AuthRoute>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      {/* <Button type="primary">Primary Button</Button> */}
    </BrowserRouter>
  )
}

export default App
