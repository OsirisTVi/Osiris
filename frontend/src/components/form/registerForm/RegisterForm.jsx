import React from 'react'
import styles from './RegisterForm.module.css'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { registerThunk } from '../../../store/authThunk/Register.thunks'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {

    const dispatch = useDispatch()
    const {user,errors} = useSelector(state=> state.auth)
    const navigate = useNavigate()



    const  handleRegisterFormSubmit = async (event) => {

        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value
        const repeat_password = event.target.repeat_password.value
        const username = event.target.username.value

        const registerData ={

            email:email,
            username:username,
            password:password,
            repeat_password:repeat_password

        }


        try {
          const response = await dispatch(registerThunk(registerData));
        
          if (response.error.message != "Rejected") {
            navigate('/')
            return
          }
        } catch (e) {
          console.log(e);
        }
    


      }


  return (
    <div>


{user ? (<Navigate to="/" /> ) : (<div className={styles.div_registration}>

<form className={styles.form} onSubmit={handleRegisterFormSubmit}>
  <h2>Регистрация</h2>
  <label htmlFor="email">Электронная почта::</label>
  <input type="text" id="email" name="email" required/>

  <label htmlFor="username">Имя Пользователя:</label>
  <input type="username" id="username" name="username" required />

  <label htmlFor="password">Пароль:</label>
  <input type="password" id="password" name="password" required/>

  <label htmlFor="repeat_password">Повторите пароль:</label>
  <input type="password" id="repeat_password" name="repeat_password" required/>

  <button type="submit">Регистрация</button>
</form>

{errors && (
  <div className={styles.errors}>
    {Object.keys(errors).map((fieldName, index) => (
      <h3 key={index} className={styles.error}>
        {fieldName}: {errors[fieldName]}
      </h3>
    ))}
  </div>
)}


</div>
  )
}



</div>
)
}

export default RegisterForm