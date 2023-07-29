import React from 'react'
import styles from './LoginForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../../store/thunk/Login.thunk';
import { actions } from '../../../store/slice/Auth.slice';
import { Navigate } from 'react-router-dom';




const LoginForm = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    async function handleLoginFormSubmit(event) {
        event.preventDefault();

        const username = event.target.login.value
        const password = event.target.password.value

        const credentialsData = {
            username: username,
            password: password
        }


        


        const action = await dispatch(loginThunk(credentialsData));
        const tokens = action.payload;
    }




    return (
        <>
            {user ? (<Navigate to="/" />) :
                (
                    <div className={styles.div_registration}>
                        <form className={styles.form} onSubmit={handleLoginFormSubmit}>
                            <h2 className={styles.enter_label}>Авторизация</h2>
                            <label htmlFor="login">Логин:</label>
                            <input type="text" id="login" name="login" required />

                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" name="password" required />

                            <button type="submit">Войти</button>
                            <button type="button">Забыл пароль?</button>
                        </form>
                    </div>
                )}
        </>
    );
}

export default LoginForm;
