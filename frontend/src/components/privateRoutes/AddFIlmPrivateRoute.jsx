import { Navigate,Route,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ({ element, ...rest }) => {

    const {user} = useSelector( state=> state.auth)

    return auth ? <Outlet /> : <Navigate to="/" />;


  }

export default PrivateRoute