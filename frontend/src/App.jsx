
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Main from './Pages/Main.jsx'
import Order from './Pages/Order.jsx'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Main />} />
          <Route path="/order/:tableId" element={<Order />} />
          
        </Routes>

      </Router>
  )
}

export default App
