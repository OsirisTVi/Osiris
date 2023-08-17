import axios from 'axios';




let isRefreshing = false; 
export const API_URL = 'http://localhost:8000/api'



export const $regApi = axios.create({
    baseURL: API_URL,
    withCredentials:true,

  });

export const $Api = axios.create({
    baseURL: API_URL,
    withCredentials:true

});


$Api.interceptors.request.use((config) =>
{

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config
})










$Api.interceptors.response.use((config) => {

    return config
}, async (error) => {

    const originalRequest = error.config



    if(error.response.status == 401 && error.config && !error.config._isRetry && !isRefreshing ){

        originalRequest._isRetry = true
        isRefreshing = true;

        try{

        const response = await $Api.post(`/user/token/refresh/`,{withCredentials:true})
        localStorage.setItem('token',response.data.access)
        isRefreshing = false;
        return $Api.request(originalRequest)

        }

        catch(e){
            console.log('не авторизован')
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            isRefreshing = false


        }


    }

    return Promise.reject(error);

})



