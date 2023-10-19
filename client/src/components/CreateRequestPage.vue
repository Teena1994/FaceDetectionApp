<template>
  <div class="navbar">
    <ul>
      <i class="fa fa-user"></i>
      Welcome, {{ username }}
    </ul>
    <ul style="cursor: pointer;">
      <a @click="backToList"><i class="fas fa-home"></i> Home</a>
      <a @click="signOut"><i style="padding-left: 20px;" class="fa fa-sign-out"></i> SignOut</a>
    </ul>
  </div>

  <div class="form-space">

    <form v-if="!showAlert && !showProgressBar" @submit.prevent="submitUploadRequest">
      <h2 class="form-heading">Create Request</h2>

      <label>Upload the file </label>
      <input type="file" @change="handleFileUpload" required />

      <label>Enter the file name </label>
      <input type="text" v-model="filename" placeholder="Enter a name" required/>

      <div class="add-space"></div>

      <button @click="submitRequest">Submit</button>

    </form>

    <div class="progress-container" v-if="showProgressBar">
      <div class="progress-bar" :style="{ width: uploadProgress + '%' }">
      </div>
      <div>Uploading File..</div>
    </div>

    <alert v-if="showAlert" :message="alertMessage" :type="alertType" :redirectPage="redirectPage"></alert>
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
      alertType: 'info',
      username: localStorage.getItem('username'),
      user: localStorage.getItem('user'),
      uploadProgress: 0,
      showProgressBar: false,
      jwtToken: localStorage.getItem('JWT_KEY'),
      uploadRes: {}
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitUploadRequest() {
      try {
        this.simulateUpload();

        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('name', this.filename);
        formData.append('user', this.user);
        const response = await axios.post('/process-image',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${this.jwtToken}`
            }
        }
        );
        this.uploadRes = response.data;

      } catch (error) {
        console.error(error);
        this.alertMessage = (error.response && error.response.data && error.response.data.message) ?
          `${error.message}: ${error.response.data.message}` : error.message;
        this.alertType = 'error';
        this.showAlert = true;
      }
    },
    simulateUpload() {
      this.showProgressBar = true;
      const totalProgressSteps = 100;
      const percentStep = 5;
      let currentProgress = 0;

      const simulateStep = () => {
        if (currentProgress < totalProgressSteps) {
          currentProgress += percentStep;
          this.uploadProgress = Math.min(currentProgress, totalProgressSteps);
          setTimeout(simulateStep, 100);
        } else {
          if (this.uploadRes.success) {
            this.$router.push('/request-list/');
          } else {
            this.alertMessage = this.uploadRes.message;
            this.alertType = 'error';
            this.showAlert = true;
            this.redirectPage = 'login';
          }
        }
      }
      simulateStep();
    },
    backToList() {
      this.$router.push('/request-list/');
    },
    signOut() {
      this.$router.push('/');
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

.progress-container {
  padding: 20%;
  text-align: center;
  color: white;
}

.progress-bar {
  height: 50px;
  background-color: #423b73;
  width: 0;
  transition: width 0.5s;
}</style>
