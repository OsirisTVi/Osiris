import { useSelector } from 'react-redux'



function MainPage() {



    const {user} = useSelector(state => state.auth)

    


  return (
    <div>
    {user ? (<h2>
        This is a main Page !!!!! and you are logged as {user.username}</h2>) : (<h2>Not User</h2>) }

    </div>
  )
}

export default MainPage