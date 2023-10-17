<template>
  <div style="padding-top:3%">

    <form @submit.prevent="logInSubmit">
      <h2 class="form-heading">Log in</h2>

      <label>Email </label>
      <input type="email" v-model="email" required>

      <label>Password </label>
      <input type="password" v-model="password" required>
      <div v-if="passwordError" class="error">{{ passwordError }} </div>

      <div class="button" style="padding-top: 5%; text-align: center;">
        <button class="submit" type="submit">Log In</button>
      </div>

      <div style="padding: 5%;text-align: center; font-size:12px;">
        <router-link to="/signup">Click here to Sign Up / Register</router-link>
      </div>
    </form>

  </div>
</template>
  
<script>
export default {

  data() {
    return {
      email: '',
      password: '',
      passwordError: ''
    }
  },
  methods: {

    logInSubmit() {
      //Validate password field length
      this.passwordError = this.password.length > 6 ?
        '' : 'Password should be more than 6 characters long!';

      if (!this.passwordError) {
        console.log(this.email);
        console.log(this.password);
        this.$router.push('/dashboard');
      }
    }
  }

}
</script>
<style>

.form-heading {
  color: #333;
  font-size: 24px;
  text-align: center;
}

form {
  max-width: 25%;
  margin: 30px auto;
  background: #fff;
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