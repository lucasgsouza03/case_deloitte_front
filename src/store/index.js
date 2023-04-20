import { createStore } from 'vuex'

export default createStore({
    state: {
        access: '',
        refresh: '',
        user: null
    },
    mutations: {
        initializeStore(state) {
            if ( localStorage.getItem('access')) {
                state.access = localStorage.getItem('access')
                state.refresh = localStorage.getItem('refresh')
                state.user = localStorage.getItem('user')
            } else {
                state.access = ''
                state.refresh = ''
                state.user = null
            }
        },
        
        setAccess(state, access) {
            state.access = access
        },

        setRefresh(state, refresh) {
            state.refresh = refresh
        },
        setUser(state, user) {
            state.user = user
        },
        removeAccess(state) {
            state.user = null
            state.access = ''
            state.refresh = ''
        }
    },
    actions: {

    },
    modules: {

    }
})