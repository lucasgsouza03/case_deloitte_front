import axios from 'axios'

export default {

    create:(data) => {
        return axios.post('user/register/', data)
    },
    login:(data) => {
        return axios.post('user/token/', data, {
            withCredentials: true
        })
    },
    refresh:(data) => {
        return axios.post('user/token/refresh/', data)
    },
    get_user:(user_id) => {
        return axios.get('user/' + user_id)
    }

}