<template>
    
    <form @submit.prevent="handleSubmit">
        <h2>Cadastre-se</h2>
        <label>Nome Completo</label>
        <input type="text" placeholder="Nome Completo" v-model="fullName">
        <label>Data de Nascimento</label>
        <input type="date" placeholder="Data de Nascimento" v-model="birthdate">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="email">
        <label class="password" >Senha</label>
        <input type="password" @input="checkPassword" placeholder="Senha" v-model="password">

        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <ul>
            <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
            <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
            <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
            <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character</li>
        </ul>

        <button class="wavs-effect weaves-dark btn-small black">Cadastrar</button>

    </form>

</template>

<script>
import Api from '../service/api'
import User from '../service/user'
import M from 'materialize-css'

export default {
    data(){
        return{
            fullName: '',
            birthdate: '',
            email: '',
            password: '',
            passwordError: '',
            password_length: 0,
            contains_eight_characters: false,
            contains_number: false,
            contains_uppercase: false,
            contains_special_character: false,
            valid_password: false,
            user: null,
            successMessage: false
        }
    },
    methods: {
        handleSubmit() {
            if (this.valid_password) {

                this.user = User.create({
                    email: this.email,
                    password: this.password,
                    password2: this.password
                }).then(res => {
                    this.user = res.data
                    Api.create({
                        user: this.user.id,
                        full_name: this.fullName,
                        birth_date: this.birthdate
                    }).then(res => {
                        if (res.status == 201) {
                            // reset form and display message
                            this.fullName= ''
                            this.birthdate= ''
                            this.email= ''
                            this.password= ''
                            this.password_length = 0
                            this.contains_eight_characters = false
                            this.contains_number = false
                            this.contains_uppercase = false
                            this.contains_special_character = false
                            this.valid_password = false
                            this.user = null
                            this.successMessage = false
                            M.toast({html: 'Usuário criado com sucesso!'})
                        }
                    })
                })

            } else {
                this.passwordError = 'Senha inválida!\nFavor cumprir com os requerimentos abaixo.'
            }
        },
        checkPassword() {
            // validate passsword
            this.password_length = this.password.length;
                    const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
                    
            if (this.password_length > 8) {
                this.contains_eight_characters = true;
            } else {
                this.contains_eight_characters = false;
            }
                    
            this.contains_number = /\d/.test(this.password);
            this.contains_uppercase = /[A-Z]/.test(this.password);
            this.contains_special_character = format.test(this.password);
            
            if (this.contains_eight_characters === true &&
                            this.contains_special_character === true &&
                            this.contains_uppercase === true &&
                            this.contains_number === true) {
                this.valid_password = true;			
            } else {
                this.valid_password = false;
            }
        }
    }
}

</script>

<style>

    form {
        max-width: 650px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    ul {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    li { 
        margin-bottom: 8px;
        color: #525f7f;
        position: relative;
    }

    li:before {
    content: "";
        width: 0%; height: 2px;
        background: #2ecc71;
        position: absolute;
        left: 0; top: 50%;
        display: block;
        transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .is_valid { color: rgba(136, 152, 170, 0.8); }
    .is_valid:before { width: 100%; }

    h2 {
        margin: 0 auto;
    }

</style>
  