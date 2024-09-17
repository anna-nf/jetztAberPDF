<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <PieChartComponent @chart-ready="setPieChartInstance" />
        </v-col>
        <v-col cols="12" md="6">
          <LineChartComponent @chart-ready="setLineChartInstance" />
        </v-col>
      </v-row>
      <v-btn @click="generatePDF">Download PDF</v-btn>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import jsPDF from 'jspdf';
  import PieChartComponent from './PieChartComponent.vue';
  import LineChartComponent from './LineChartComponent.vue';
  
  export default {
    name: 'PDFGeneratorComponent',
    components: {
      PieChartComponent,
      LineChartComponent,
    },
    setup() {
      const pieChartInstance = ref(null);
      const lineChartInstance = ref(null);
  
      // Function to handle the event when charts are ready
      const setPieChartInstance = (instance) => {
        pieChartInstance.value = instance;
      };
  
      const setLineChartInstance = (instance) => {
        lineChartInstance.value = instance;
      };
  
      // Function to convert SVG to PNG base64
      const svgToPngBase64 = (svgString, width = 2000, height = 1400) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
  
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const pngBase64 = canvas.toDataURL('image/png');
            URL.revokeObjectURL(url);
            resolve(pngBase64);
          };
  
          img.onerror = () => {
            reject(new Error('Error loading SVG image'));
          };
  
          img.src = url;
        });
      };
  
      const generatePDF = async () => {
        try {
          const doc = new jsPDF('p', 'mm', 'a4');
  
          if (!pieChartInstance.value || !lineChartInstance.value) {
            throw new Error('Chart instances are not properly initialized.');
          }
  
          // Get the SVG data from the chart instances
          const pieChartSVG = pieChartInstance.value.getSVG();
          const lineChartSVG = lineChartInstance.value.getSVG();
  
          const pieChartBase64 = await svgToPngBase64(pieChartSVG);
          const lineChartBase64 = await svgToPngBase64(lineChartSVG);
  
          // Add PNGs to the PDF
          doc.addImage(pieChartBase64, 'PNG', 10, 10, 180, 100);
          doc.addImage(lineChartBase64, 'PNG', 10, 120, 180, 100);
  
          // Generate the PDF
          const pdfBlob = doc.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, '_blank');
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      };
  
      return {
        generatePDF,
        setPieChartInstance,
        setLineChartInstance,
      };
    },
  };
  </script>
  