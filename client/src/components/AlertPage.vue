<template>
  <div class="alert-box">
    <div v-if="isVisible" class="alert" :class="alertType">
      {{ message }}
      <div class="alert-space"></div>
    <button @click="closeAlert">Close</button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      message: String,
      type: {
        type: String,
        default: 'info', // or 'success', 'warning', 'error', etc.
      },
      redirectPage:{
        type: String,
        default: 'home', 
      } 
    },
    data() {
      return {
        isVisible: true,
      };
    },
    computed: {
      alertType() {
        return `alert-${this.type}`;
      },
    },
    methods: {
      closeAlert() {
        this.isVisible = false;
        console.log(this.redirectPage)
        if(this.redirectPage === 'home'){
          this.$router.push('/');
          this.$router.go(0);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .alert {
    padding: 10px;
    border: 1px solid #ccc;
    background: #f9f9f9;
  }
  .alert-info {
    color: blue;
    padding: 20px;

  }
  .alert-success {
    color: green;
    padding: 20px;

  }
  .alert-warning {
    color: orange;
    padding: 20px;

  }
  .alert-error {
    color: red;
    padding: 20px;

  }
  .alert-box {
    max-width: 25%;
    margin: 30px auto;
    background: #fff;
    text-align: left;
    padding: 5%;
    border-radius: 10px;
    min-height: 21vh;
  }
  .alert-space {
    padding-bottom: 20px;
  }
  </style>
  