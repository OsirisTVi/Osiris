import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { userProfileThunk } from '../../store/userThunk/UserProfile.thunk'
import { useDispatch } from 'react-redux'
import styles from './MyUserProfile.module.css'
import { userChangeThunk } from '../../store/userThunk/UserChangeProfile.thunk'



function MyUserProfile() {

  const {userDataProfile} = useSelector(state=>state.userProfile)
  const dispatch = useDispatch()
  const [profileLoading,setProfileLoading] = useState(false)



  const handleChangeProfile = () => {

    setProfileLoading((prevLoading) => !prevLoading);

  
  }


  const handleFormChangeUserInfo =  async (event) => {

    event.preventDefault()


    const age = event.target.age.value
    const username = event.target.username.value


    const changeData = {
      ...(age !== '' ? { age } : {}),
      ...(username !== '' ? { username } : {}),
    };

    
    try{

    
    dispatch(userChangeThunk(changeData))
    setProfileLoading((prevLoading) => !prevLoading);

    }
    catch(e){
      console.log(e)


    }
  }


  const fetchUserProfile = useCallback(() => {
    try {
      dispatch(userProfileThunk());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);



  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);




  return (
    <div>

      {!profileLoading ? (
              <div className={styles.borderUserProfile}>
              <h3>Ваша почта: {userDataProfile.email} </h3>
              <h3>Ваш айди {userDataProfile.id} </h3>
              <h3>Ваш никнейм : {userDataProfile.username} </h3>
              <h3>Ваш возраст: {userDataProfile.age ? userDataProfile.age : '...'}</h3>
    
              <h3>Аватар: <img className={styles.userAvatar} src={`data:image/png;base64,${userDataProfile.photo}`} alt="Avatar"/> </h3>
              <button  onClick={handleChangeProfile} className={styles.changeUserProfile}>Изменить инфо...</button>
    
          </div>
      ) : (<div>
        <form onSubmit={handleFormChangeUserInfo}>

        <label htmlFor="age">возраст:</label>
        <input  id='age' name='age' type="text"/>

        <label htmlFor="username">никнейм:</label>
        <input  id='username' name='username' type="text"/>

        <button type='submit'>Принить изменения</button>
        </form>

        <button  onClick={handleChangeProfile} className={styles.changeUserProfile}>отменить изменения</button>

        </div>)}

    </div>

    
  )
}

export default MyUserProfile