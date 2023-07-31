import axios from 'axios';




const getAccessToken = () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    return authTokens ? authTokens.access_token : null;

};


const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', 
});


instance.interceptors.request.use(
(config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

export default instance