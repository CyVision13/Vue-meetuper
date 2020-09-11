import axios from  'axios'

const axiosInstance = axios.create({
    timeout:3000,
    // headers: {'authorization': `Bearer ${(localStorage.getItem('meetuper-jwt') || '')}`}
})

axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('meetuper-jwt') || ''

    if (token){
        config.headers.authorization = `Bearer ${token}`
    }
    return config
},function(err){
    return Promise.reject(err)
})

export default axiosInstance