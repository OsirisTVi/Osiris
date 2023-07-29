import { useState } from 'react'
import style from './App.module.css'
import Navbar from './navbar/navbar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Register from './register/Register';
import Footer from './footer/Footer';
import RegisterForm from './form/registerForm/RegisterForm'
import MainPage from './mainPage/MainPage';
import LoginForm from './form/LoginForm/LoginForm';




function App() {

  return (

    <div>

      <BrowserRouter>

      <Navbar/>
      <Footer/>
      



      <Routes>
           <Route path="/" element={<MainPage/>} /> 
            <Route path="/login" element={<LoginForm/>} /> 
            <Route path="/register" element={<RegisterForm/>}/>

          </Routes>

      



      </BrowserRouter>

    </div>
  
  )
}

export default App
