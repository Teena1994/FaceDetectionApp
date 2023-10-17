<template>
    <div style="padding-top:3%">
  
      <form @submit.prevent="logInSubmit">
        <h2 class="form-heading">Create Request</h2>
  
        <label>Upload the file </label>
        <input type="file" @change="handleFileUpload" />

        <label>Enter the file name </label>
        <input type="text" v-model="filename" placeholder="Enter a name" />
        
        <div class="add-space"></div>

        <button @click="submitRequest">Submit</button>

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
      filename: '',
      selectedFile: null,
      showAlert: false, 
      alertMessage: '',
      alertType: 'info'
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      console.log(event.target)
      console.log(this.selectedFile)
    },
    async submitRequest() {
    try {
        const formData = new FormData();
        formData.append('image', this.selectedFile); 
        formData.append('name', this.filename);
            const response = await axios.post('/process-image', 
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data'}
            });
            this.$router.push('/request-list/');


       // this.showSuccessAlert();

        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    },
    showSuccessAlert() {
      this.alertMessage = 'Sign-in was successful!';
      this.alertType = 'success';
      this.showAlert = true;
      this.$router.push('/request-list/');
    }

  },
  components: {
    Alert
  }
};
</script>
<style>
 .add-space {
    padding-bottom: 20px;
  }
</style>
