<template>
  <!-- <HelloWorld msg="Hallo Anna" />
  <PdfCreator /> 
  <PdfCreatorCanvg />
  <ChartAndTablePDF />
  <PDFMultipleGraphCreator />-->
  <PDFGeneratorComponent />
  <ThomasIsCool />
</template>

<script>

import PdfCreator from './components/PdfCreator.vue';
import HelloWorld from './components/HelloWorld.vue';
import PdfCreatorCanvg from './components/PdfCreatorCanvg.vue';
import PDFMultipleGraphCreator from './components/PDFMultipleGraphCreator.vue';
import ChartAndTablePDF from './components/ChartAndTablePDF.vue';
import PDFGeneratorComponent from './components/PDFGeneratorComponent.vue';
import ThomasIsCool from './components/ThomasIsCool.vue';

export default {
  components: {
    HelloWorld,
    PDFMultipleGraphCreator,
    PdfCreator,
    PdfCreatorCanvg,
    ChartAndTablePDF,
    PDFGeneratorComponent,
    ThomasIsCool
  },
};
</script>
  
<style scoped>
</style>
