import React from 'react'
import Footer from './components/Footer'
import Home from './pages/Home'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import AddItems from './pages/AddItems'
import UpdateItems from './pages/UpdateItems'
import Login from './pages/Login'

const App = () => {
  return (
    <>
        <BrowserRouter>
    <Routes>
    <Route exact path='/login' element={<Login/>} />
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/update/:id' element={<UpdateItems/>} />
    </Routes>
    {/* <AddItems/> */}
    </BrowserRouter>
    </>
    
    // <Categories/>
  )
}

export default App