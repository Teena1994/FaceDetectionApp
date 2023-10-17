<template>
  <div style="padding-top: 3%;"></div>
  <div class="container" >
    <div class="table-wrapper">
      <h2>Image Upload List</h2>

      <table>
  
      <thead>
        <th>File Name</th>
        <th>Status</th>
        <th>No. Of Faces Detected</th>
        <th>Upload Date</th>
      </thead>

      <tbody>
        <tr v-for="(request, index) in requests" :key="index">
          <td>{{ request.name }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.numFaces }}</td>
          <td> {{ request.date }} </td>
        </tr>
      </tbody>

    </table>
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [], 
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
         this.requests = response.data.requestList;
        console.log(this.requests);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center; /* Horizontally center the table within the container */
  align-items: center; /* Vertically center the table within the container */
  height: 100vh; /* Adjust the height as needed */
}

.table-wrapper {
  overflow: auto;
  max-width: 100%;
  background-color: white;
  text-align: center;
  padding: 2%;
}

tr {
  border-bottom: 1px solid;
}

th {
  background-color: #3a44dc;
  color: #fff;
  white-space: nowrap;
}

th,
td {
  text-align: center;
  padding: 0.5em 1em;
}

</style>