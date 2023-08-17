import styles from './LoginForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../../store/authThunk/Login.thunk';
import { Navigate } from 'react-router-dom';




const LoginForm = () => {

    const { user,loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    async function handleLoginFormSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value

        const credentialsData = {
            username: email,
            password: password
        }

    
        await dispatch(loginThunk(credentialsData));
    }




    return (
        <>
            {user ? (<Navigate to="/" />) :
                (
                    
                    <div className={styles.div_registration}> 
                        <form className={styles.form} onSubmit={handleLoginFormSubmit}>
                            <h2 className={styles.enter_label}>Авторизация</h2>
                            <label htmlFor="email">Электронная почта:</label>
                            <input type="email" id="email" name="email" required />


                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" name="password" required />

                            <button type="submit">Войти</button>
                            <button type="button">Забыл пароль?</button>
                        </form>

                        {!loading ? <h1>Неверный логин или пароль</h1> : ''}
                    </div>
                )}
        </>
    );
}

export default LoginForm;
