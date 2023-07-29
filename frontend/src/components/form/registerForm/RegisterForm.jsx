import React from 'react'
import styles from './RegisterForm.module.css'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { registerThunk } from '../../../store/thunk/Register.thunks'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {

    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.auth)
    const navigate = useNavigate()



    const  handleRegisterFormSubmit = async (event) => {

        event.preventDefault();

        const username = event.target.username.value
        const password = event.target.password.value
        const repeat_password = event.target.repeat_password.value

        const registerData ={

            username:username,
            password:password,
            repeat_password:repeat_password
        }



        const responseRegister = await dispatch(registerThunk(registerData))
        
        await navigate('/')
    


    }









  return (
    <div>


{user ? (<Navigate to="/" /> ) : (<div className={styles.div_registration}>

<form className={styles.form} onSubmit={handleRegisterFormSubmit}>
  <h2>Регистрация</h2>
  <label htmlFor="username">Логин:</label>
  <input type="text" id="username" name="username" required/>

  <label htmlFor="password">Пароль:</label>
  <input type="password" id="password" name="password" required/>

  <label htmlFor="repeat_password">Повторите пароль:</label>
  <input type="password" id="repeat_password" name="repeat_password" required/>

  <button type="submit">Регистрация</button>
</form>
</div>
  )
}



</div>
)
}

export default RegisterForm