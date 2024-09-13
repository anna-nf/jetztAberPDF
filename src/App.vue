<template>
  <HelloWorld msg="Hallo Anna" />
  <PdfCreator />
</template>

<script>

import PdfCreator from './components/PdfCreator.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
    PdfCreator
  },
};
</script>
  
<style scoped>
</style>
