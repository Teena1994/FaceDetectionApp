<template>
  <div class="form-space">

    <form @submit.prevent="logInSubmit" v-if="!showAlert" >
      <h2 class="form-heading">Log in</h2>

      <label>Email </label>
      <input type="email" v-model="logInEmail" required>

      <label>Password </label>
      <input type="password" v-model="logInPassword" required>
      <div v-if="logInPasswordError" class="error">{{ logInPasswordError }} </div>

      <div class="button" style="padding-top: 5%; text-align: center;">
        <button class="submit" type="submit">Log In</button>
      </div>

      <div class="signinLink">
        <router-link to="/signup">Click here to Sign Up / Register</router-link>
      </div>
    </form>

    <alert v-if="showAlert" :message="alertMessage" :type="alertType" :redirectPage="redirectPage"></alert>

  </div>
</template>
  
<script>
import axios from "axios";
import Alert from './AlertPage.vue';

export default {

  data() {
    return {
      logInEmail: '',
      logInPassword: '',
      logInPasswordError: '',
      showAlert: false,
      alertMessage: '',
      alertType: 'info',
      redirectPage: 'home'
    }
  },
  methods: {

    logInSubmit() {
      //Validate password field length
      this.logInPasswordError = this.logInPassword.length > 6 ?
        '' : 'Password should be more than 6 characters long!';

      if (!this.logInPasswordError) {
        //Navigate to main page
        this.logInDetails();
      }
    },
    async logInDetails() {
      try {

        const response = await axios.post('/login', {
          username: this.logInEmail,
          password: this.logInPassword
        });

        if(response.data.success){
          localStorage.setItem('username', `${response.data.user.firstname} ${response.data.user.lastname}` );
          localStorage.setItem('user', response.data.user.username );
          localStorage.setItem('JWT_KEY', response.data.token);

          this.$router.push('/request-list');

        }else{
          this.alertMessage = response.data.message;
          this.alertType = 'error';
          this.showAlert = true;
        }

      } catch (error) {
        console.error(error);
        this.alertMessage = (error.response && error.response.data && error.response.data.message) ? 
        `${error.message}: ${error.response.data.message}`: error.message;
        this.alertType = 'error';
        this.showAlert = true;
      }
  },
},
  components: {
    Alert
  },
}
</script>
<style>
.form-space{
  padding-top:3%;
}
.form-heading {
  color: #333;
  font-size: 24px;
  text-align: center;
}

form {
  max-width: 25%;
  margin: 30px auto;
  background: #e1dcdc;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
}

label {
  display: inline-block;
  margin: 25px 0 15px;
  text-transform: uppercase;
}

input,
select {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 6px;
  border: 1px solid #ddd;
}

button {
  background: linear-gradient(43deg, #4158D0 , #C850C0, #FFCC70) !important;
  border: 0;
  padding: 10px 20px !important;
  color: white;
  border-radius: 5px;
  width: 100% !important;
}

.submit {
  text-align: center;
}

.error {
  color: #ff0000;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

.signinLink{
  padding: 5%;
  text-align: center; 
  font-size:12px;
}
</style>