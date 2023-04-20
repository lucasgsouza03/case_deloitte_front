import axios from 'axios'

export default {

    listCards:() => {
        return axios.get('api/cards/')
    },
    create:(data) => {
        return axios.post('api/student/', data)
    },
    paginate:(next_page) => {
        return axios.get(next_page)
    }

}