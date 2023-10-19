<template>
  <div class="loader" v-if="loading">
    <div class="loader-circle"> </div>
  </div>
</template>
  
<script>
export default {
  props: {
    loading: Boolean
  },
};
</script>
  
<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-circle {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid 423b73;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>
  