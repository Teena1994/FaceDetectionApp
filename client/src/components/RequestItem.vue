<template>
  <div>
    <h3>{{ request.name }}</h3>
    <p>Status: {{ request.status }}</p>
    <p>Detected Faces: {{ request.detectedFaces }}</p>
    <p>Additional Information: {{ request.additionalInfo }}</p>
  </div>
</template>

<script>
export default {
  props: {
    request: Object,
  },
};
</script>
