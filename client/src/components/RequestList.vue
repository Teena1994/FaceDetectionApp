<template>
<div id="app">
        <div class="navbar">
            <ul>
              <i class="fa fa-user"></i>
              Welcome, {{ username }}
            </ul>
            <ul style="cursor: pointer;">
              <a @click="backToList"><i  class="fas fa-home"></i> Home</a>
              <a @click="signOut"><i  style="padding-left: 20px;" class="fa fa-sign-out"></i> SignOut</a>
          </ul>
        </div>
        <div class="dashboard">

        <div style="display:flex;">
          <button class="button-style" @click="backToUpload">
            <i class="fa fa-backward" aria-hidden="true"></i>
            <div style="padding-left: 20px;">Create an upload request</div>
          </button>
          <h2 class="table-heading">Image Upload Status</h2>
        </div>
        <div style="padding:20px;"></div>

            <table class="image-table">
                <thead>
                    <tr>
                        <th>Image Name</th>
                        <th>Status</th>
                        <th>Number of Faces Detected</th>
                        <th>Upload Date</th>

                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(request, index) in requestList" :key="index">
                    <td>{{ request.name }}</td>
                    <td>{{ request.status }}</td>
                    <td>{{ request.numFaces }}</td>
                    <td> {{ request.date }} </td>
                  </tr>
                </tbody>
                <div v-if="noData" class="noDataDisplay"> No image Uploads for processing..</div>

            </table>
        </div>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: localStorage.getItem('username'),
      noData: false,
      requestList: [], 
    };
  },
  mounted() {
    // This function will be called when the component is mounted
    this.getAllRequests();
  },
  computed: {
    formattedDateTime() {
      return this.formatDate(this.currentDate);
    },
  },
  methods: {
    async getAllRequests() {
      try { 
        const response = await axios.get('/request-list');
        this.requestList = response.data.requestList;
        if((this.requestList).length == 0){
          this.noData = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    backToList(){
      this.$router.push('/request-list/');
    },
    signOut(){
      this.$router.push('/');
    },
    backToUpload(){
      this.$router.push('/dashboard');
    }
  }
};
</script>
<style>
    body {
        font-family: Arial, sans-serif;
    }
    .table-heading {
      color: white;
      text-align: center;
      padding-left: 10%;
    }
    .navbar {
        background-color: #423b73;
        color: #fff;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        pointer:
    }

    .dashboard {
        margin: 20px;
    }

    .image-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
    }

    .image-table th, .image-table td {
        border: 1px solid white;
        padding: 8px;
        text-align: center;
    }

    .image-table th {
        background-color: #423b73;
        color: white;
    }

    .image-table tbody tr:nth-child(odd) {
        background-color: white;
    }

    .image-table tbody tr:hover {
        background-color: #e0e0e0;
    }
    .button-style{
    background: #423b73 !important;
    width: 28% !important;
    cursor: pointer;
    }
    .noDataDisplay{
      padding: 20px !important;
      text-align: center !important;
    }
</style>
