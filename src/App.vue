<template>
  <!-- <HelloWorld msg="Hallo Anna" />
  <PdfCreator /> 
  <PdfCreatorCanvg />
  <ChartAndTablePDF />-->
  <PDFMultipleGraphCreator />
</template>

<script>

import PdfCreator from './components/PdfCreator.vue';
import HelloWorld from './components/HelloWorld.vue';
import PdfCreatorCanvg from './components/PdfCreatorCanvg.vue';
import PDFMultipleGraphCreator from './components/PDFMultipleGraphCreator.vue';
import ChartAndTablePDF from './components/ChartAndTablePDF.vue';

export default {
  components: {
    HelloWorld,
    PDFMultipleGraphCreator,
    PdfCreator,
    PdfCreatorCanvg,
    ChartAndTablePDF
  },
};
</script>
  
<style scoped>
</style>
