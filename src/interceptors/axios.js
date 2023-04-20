import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/'

let refresh = false

axios.interceptors.response.use(res => res, async error => {
    
    if (error.response.status == 401 && !refresh) {
        refresh = true
        const {status, data} = await axios.post('user/token/refresh/', {}, {
            withCredentials: true
        })

        if (status == 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            return axios(error.config)
        }
    }
    refresh = false
    return error
} )

