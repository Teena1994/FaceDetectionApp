<template>
  <div style="padding-top:2px">
    <form @submit.prevent="handleSubmit" v-if="!showAlert">
      <h2 class="form-heading">SIGN UP</h2>

      <label>Email </label>
      <input type="email" v-model="email" required>

      <label>Password </label>
      <input type="password" v-model="password" required>
      <div v-if="passwordError" class="error">{{ passwordError }} </div>

      <label>First Name </label>
      <input type="text" v-model="firstname" required>

      <label>Last Name </label>
      <input type="text" v-model="lastname" required>

      <div style="padding-bottom: 3%"></div>

      <div>
        <button class="submit" type="submit">Sign up here</button>
        <div class="siginButton">
          <router-link to="/">Back</router-link>
        </div>
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
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      passwordError: '',
      showAlert: false,
      alertMessage: '',
      alertType: 'info',
      redirectPage: ''
    }
  },
  methods: {
    async signUpDetails() {
      try {
        const response = await axios.post('/signUp', {
          username: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname
        });
        if(response.data.success){
          this.alertMessage = 'Sign-in was successful!';
          this.alertType = 'success';
          this.redirectPage = 'login';
          this.showAlert = true;
        }else{
          this.alertMessage = response.data.message;
          this.alertType = 'error';
          this.showAlert = true;
          this.redirectPage = 'signup';
        }
      } catch (error) {
        console.error(error);
        this.alertMessage = (error.response && error.response.data && error.response.data.message) ? 
        `${error.message}: ${error.response.data.message}`: error.message;
        this.alertType = 'error';
        this.showAlert = true;
        this.redirectPage = 'signup';
      }
    },

    handleSubmit() {
      //Validate password field length
      this.passwordError = this.password.length > 6 ?
        '' : 'Password should be more than 6 characters long!';

      if (!this.passwordError) {
        this.signUpDetails();
      }
    }
  },
  components: {
    Alert
  }
}
</script>

<style>
.backButton{
  padding-bottom: 2%;
  text-align: center;
  font-size:12px;
}

.siginButton{
  padding-top: 5%; 
  text-align: center;
  font-size: 12px;
}
</style>