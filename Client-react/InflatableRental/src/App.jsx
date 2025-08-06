import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/features/user/Login'
import Home from './Components/features/trampoline/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import MainWrapper from './Components/features/user/MainWrapper'
import AdminNav from './Components/features/user/AdminNav'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       
      <BrowserRouter>
      <Routes>
      {/* <Route path={""} element={<Home></Home>}></Route> */}
      <Route path={"/*"} element={<MainWrapper></MainWrapper>}></Route>
      <Route path={"login"} element={<Login></Login>}></Route>
      <Route path={"login/:connect"} element={<Login></Login>}></Route>
     
      {/* <Route path={"*"} element={<NotFound></NotFound>}></Route> */}
      </Routes>
      
      </BrowserRouter>
       
    </>
  )
}

export default App
