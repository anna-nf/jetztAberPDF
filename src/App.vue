<template>
  <HelloWorld msg="Hallo Anna" />
  <PDFGenerator />
</template>

<script>
import PDFGenerator from './components/PDFGenerator.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
    PDFGenerator,
  },
};
</script>
  
<style scoped>
</style>
