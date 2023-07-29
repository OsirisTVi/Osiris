import React from 'react'
import style from './Navbar.module.css'
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { actions } from '../../store/slice/Auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const loginGo = () => {
    navigate('/login');
  };

  const registerGo = () => {

    navigate('/register')

  }

  const handleLogout = () => {
    
    dispatch(actions.logout());

    navigate('/');
};
  
  


  return (
    <div>

        <nav className={style.nav}>
        <ul className={style.ul}>

            <li><a href="#">Osiris Tv</a></li>
            <li><a href="#">Фильмы</a></li>
            <li><a href="#">Сериалы</a></li>
            <li><a href="#">Мультфильмы</a></li>
            <li className={style.searchLi}>
                <input
                className={style.input_search}
                placeholder='Найдем все что душа пожелает'
                />
                <FaSearch className={style.searchIcon} />
            </li>
            <li><a>Смотреть 60 дней бесплатно</a></li>

            {user ? (<li><button onClick={handleLogout} >Выход</button></li>) : (
              <div className={style.enter_div}>

            <li><button onClick={loginGo}>Войти</button></li> 
            <li><button onClick={registerGo}>Создать аккаунт</button></li>
            </div> )}
            
        </ul>

        
        </nav>

    </div>
  )
}

export default Navbar