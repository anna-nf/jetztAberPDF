<template>
  <HelloWorld msg="Hallo Anna" />
  <PdfCreator />
  <PdfCreatorCanvg />
</template>

<script>

import PdfCreator from './components/PdfCreator.vue';
import HelloWorld from './components/HelloWorld.vue';
import PdfCreatorCanvg from './components/PdfCreatorCanvg.vue';

export default {
  components: {
    HelloWorld,
    PdfCreator,
    PdfCreatorCanvg
  },
};
</script>
  
<style scoped>
</style>
