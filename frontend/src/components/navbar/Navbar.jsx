import { useSelector } from 'react-redux';
import { authActions } from '../../store/slice/Auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { updateTokenThunk } from '../../store/thunk/Update_token.thunk';
import style from './Navbar.module.css'
import { FaSearch } from 'react-icons/fa';
import { userProfileThunk } from '../../store/userThunk/UserProfile.thunk';


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


  const handleMainPage =() => {

    navigate('/')
  }




  const handleLogout = () => {
    
    dispatch(authActions.logout());
    navigate('/');
};



const handleUserProfile = async () => {


  try {
    navigate('/profile/');
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

    
};









  return (
    <div className={style.navbarContainer}>

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

            {user ? ( <div>

              <div className={style.mainPageButtonContainer}>
                    <li><button onClick={handleMainPage}>Главная</button></li>
                    </div>
              
                     <div className={style.buttonContainer}>
                      <li><button onClick={handleLogout} >Выход</button></li>
                    <li><button onClick={handleUserProfile}>Профиль</button></li>
                    </div>

                    </div>) : (
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