import Navbar from './navbar/navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './footer/Footer';
import RegisterForm from './form/registerForm/RegisterForm'
import MainPage from './mainPage/MainPage';
import LoginForm from './form/LoginForm/LoginForm';
import InterfaceAddFilmPrivate from './interfaceAddFilmPrivate/InterfaceAddFilmPrivate';
import MyUserProfile from './profile/MyUserProfile';





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
            <Route path='/private' element={<InterfaceAddFilmPrivate/>}/>
            <Route path="/profile" element={<MyUserProfile/>}/>



          </Routes>

      



      </BrowserRouter>

    </div>
  
  )
}

export default App
