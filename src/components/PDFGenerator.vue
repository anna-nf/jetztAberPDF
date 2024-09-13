<template>
  <div>
    <h1>PDF-Generator</h1>
    <h3>hi</h3>
    <v-btn
  elevation="2"
>haaalooooo</v-btn>
    <div ref="contentToCapture" class="pdf-content">
      <h2>Dieser Inhalt wird als PDF gespeichert!</h2>
      <p>Hallo ich bin ein Frontend PDF</p>
      <img src="../assets/baba-jaga.png" alt="Baba Jaga">
      <ChartComponent class="pdf-chart"/>
    </div>
    <button @click="generatePDF">PDF Erstellen</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';
import ChartComponent from './ChartComponent.vue';


const contentToCapture = ref(null);

const generatePDF = () => {
  const element = contentToCapture.value;
  element.classList.add('pdf-export');
  html2pdf()
  .from(element)
  .set({
    jsPDF: {
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    },
    html2canvas: {
      scale: 1, // Standard-Skalierung
      width: 795, // Spezifische Breite für den Canvas
      windowWidth: 795, // Simuliere eine Fensterbreite von 795 Pixeln
    }
  })
  .toPdf()
  // .save();
  .outputPdf('dataurlnewwindow')


};
</script>
<style scoped>
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}

.pdf-export .pdf-content {
  width: 795px; /* Setze die Breite auf 795 Pixel */
  max-width: 100%; /* Stelle sicher, dass es nicht über den Bildschirmrand hinausgeht */
  margin: 0 auto; /* Zentriert den Inhalt, wenn das PDF breiter als 795px ist */
}

.pdf-export .pdf-chart {
  width: 100%; /* Nimmt die volle Breite des Containers ein */
  height: auto; /* Passt die Höhe automatisch an */
}


@media print {
  .pdf-export .pdf-chart {
    width: 100%;
    height: 400px; /* Höhe festlegen, um eine gute Darstellung zu gewährleisten */
  }
}
</style>