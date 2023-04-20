<template>
    <div id="nav" class="row">
        <div class="col s12 m4 l3">
            <router-link :to="{ name: 'Index' }">Home</router-link>
            <router-link v-if="!user" :to="{ name: 'Register Student' }">Registre-se</router-link>
        </div>
        <div class="col s12 m4 l8"></div>
        <div class="col s2 m4 l1" v-if="!user">
            <a href="#!" @click="toggleLoginModal" class="login-bnt">Login</a>
        </div>
        <div class="col s2 m4 l2 right" v-else>
            <span class="user-email">{{ user.email }}</span>
            <a href="#!" @click="sendLogout" class="login-bnt">Logout</a>
        </div>
    </div>
    <router-view/>
    <Modal v-if="showLoginModal" @close="toggleLoginModal">
        <h2>Login</h2>
        <div v-if="loginError"><p style="color: red">Usuário ou senha inválidos</p></div>
        <form @submit.prevent="sendLogin">
            <label>Email</label>
            <input type="text" placeholder="Email" v-model="email">
            <label class="password" >Senha</label>
            <input type="password" placeholder="Senha" v-model="password">
            <button class="wavs-effect weaves-dark btn-small black right">Login</button>
        </form>
    </Modal>
  </template>
  
  <script>
  import Modal from './components/modal_component.vue'
  import User from './service/user'
  import axios from 'axios'
  
  export default {
    name: 'App',
    components: { Modal },
    data() {
        return {
            showLoginModal: false,
            email: '',
            password: '',
            user: null,
            loginError: false
        }
    },
    methods: {
        toggleLoginModal() {
            this.showLoginModal = !this.showLoginModal
            this.loginError = false
        },
        getUser() {
            User.get_user('me').then(res => {
                const user = res.data

                localStorage.setItem('user', JSON.stringify(user))
                this.$store.commit('setUser', JSON.stringify(user))

                this.user = user

            }).catch(err => {
                console.log(err)
            })
        },
        sendLogin() {
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('access')
            User.login({
                email: this.email,
                password: this.password,

            }).then(res => {
                const access = res.data.access
                const refresh = res.data.refresh

                this.$store.commit('setAccess', access)
                this.$store.commit('setRefresh', refresh)

                axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)
                
                this.toggleLoginModal()
                this.getUser()
                
                this.$router.push({ name: 'Index' })
                this.loginError = false
            }).catch(err => {
                console.log(err)
                if ( err ){
                    this.loginError = true
                }
            })
            this.email = ''
            this.password = ''
        },
        sendLogout() {
            localStorage.clear()
            this.$store.commit('removeAccess')

            this.user = null

            this.$router.push({ name: 'Index' })
        },
        refreshToken() {
            const data = {
                refresh: this.$store.state.refresh
            }
            User.refresh(data).then(res => {
                const access = res.data.access

                localStorage.setItem('access', access)
                this.$store.commit('setAccess', access)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        setInterval(() => {
           this.refreshToken() 
        }, 59000);
        const user = JSON.parse(this.$store.state.user)

        if( user ) {
            this.user = user
        } else {
            this.user = null
        }

    },
    beforeCreate() {
        this.$store.commit('initializeStore')

        const access = this.$store.state.access

        if ( access ) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
        } else {
            axios.defaults.headers.common['Authorization'] = ''
        }

    }
}
  </script>
  
  <style>

    body {
        background: #c0bdbd;
    }
    #nav {
        padding: 30px;
        padding-inline-end: inherit;
        background: #2b2a2a;
    }
    #nav a {
        font-weight: bold;
        color: white;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
    }
    #nav a.router-link-exact-active {
        color: lightgreen;
        background: #111111;
        
    }
    #nav a.login-bnt {
        background: #111111;
    }
    button {
        font-weight: bold;
    }
    span.user-email{
        font-weight: bold;
        color: lightgreen;
    }

  </style>
  