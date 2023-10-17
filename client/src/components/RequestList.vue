<!-- <template>
  <div>
    <h2>My Requests</h2>
    <div v-for="request in requests" :key="request.id">
      <RequestItem :request="request" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RequestItem from './RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  mounted() {
    // This function will be called when the component is mounted
    this.getAllRequests();
  },
  methods: {
  async getAllRequests() {
      try {
        
        const response = await axios.get('/request-list');
        console.log(response);

      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script> -->




<template>
  <div>
      <h2>Image Upload List</h2>
      <table>
  
      <thead>
        <th>File Name</th>
        <th>Status</th>
        <th>No. Of Faces Detected</th>
      </thead>

      <tbody>
        <tr v-for="(request, index) in requests" :key="index">
          <td>{{ request.name }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.numFaces }}</td>
        </tr>
      </tbody>

    </table>
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

