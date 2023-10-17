<template>
  <div style="padding-top:1%">
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

      <div class="button" style="padding-top: 5%; text-align: center;">
        <button class="submit" type="submit">Sign up here</button>
      </div>
      <div style="padding: 3%;text-align: center; font-size:12px;">
        <router-link to="/">Back</router-link>
      </div>

    </form>

    <alert
      v-if="showAlert"
      :message="alertMessage"
      :type="alertType"
    ></alert>

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
        alert('Sign-in was successful!');

        console.log(response.data);
        this.$router.push('/');

      } catch (error) {
        console.error(error);
      }
    },
    
    handleSubmit() {
      //Validate password field length
      this.passwordError = this.password.length > 6 ?
        '' : 'Password should be more than 6 characters long!';

      if (!this.passwordError) {
        console.log(this.email);
        console.log(this.password);
        console.log(this.firstname);
        console.log(this.lastname);
        this.showSuccessAlert();

      } 
    },
    showSuccessAlert() {
      this.alertMessage = 'Sign-in was successful!';
      this.alertType = 'success';
      this.showAlert = true;
      this.$router.push('/');
    }

  },
  components: {
    Alert
  },

}
</script>
<style>
.form-heading {
  color: #333;
  font-size: 20px;
  text-align: center;
}

form {
  max-width: 25%;
  margin: 30px auto;
  background: #fff;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
  font-size: 14px;
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
  border: none;
  padding: 10px 6px;
  border: 1px solid #ddd;
}

button {
  background: #0842a0;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  width:100%;
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
</style>