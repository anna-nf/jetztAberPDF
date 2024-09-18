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
  
      <v-row>
        <v-col cols="12">
          <TableComponent :tableData="tableData" />
        </v-col>
      </v-row>
  
      <v-btn @click="generatePDF">Download PDF</v-btn>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import PieChartComponent from './PieChartComponent.vue';
  import LineChartComponent from './LineChartComponent.vue';
  import TableComponent from './TableComponent.vue';
  
  export default {
    name: 'PDFGeneratorComponent',
    components: {
      PieChartComponent,
      LineChartComponent,
      TableComponent,
    },
    setup() {
      const pieChartInstance = ref(null);
      const lineChartInstance = ref(null);
  
      // Dummy data for the table
      const tableData = ref([
        { city: 'Bangkok', country: 'Thailand', population: '10.7M' },
        { city: 'Hamburg', country: 'Germany', population: '1.8M' },
        { city: 'New York', country: 'USA', population: '8.4M' },
        { city: 'London', country: 'UK', population: '8.9M' },
        { city: 'Tokyo', country: 'Japan', population: '37.4M' },
      ]);
  
      // Function to handle the event when charts are ready
      const setPieChartInstance = (instance) => {
        pieChartInstance.value = instance;
      };
  
      const setLineChartInstance = (instance) => {
        lineChartInstance.value = instance;
      };
  
      // Function to convert SVG to high-resolution PNG base64
      const svgToPngBase64 = (svgString, width = 4000, height = 2800) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
  
          img.onload = () => {
            // Creating a high-resolution canvas
            const canvas = document.createElement('canvas');
            canvas.width = width; // High width for better quality
            canvas.height = height; // High height for better quality
            const ctx = canvas.getContext('2d');
            // Draw the SVG onto the canvas
            ctx.drawImage(img, 0, 0, width, height);
            // Convert the canvas to a high-quality PNG
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
  
          // Convert charts to high-resolution PNG
          const pieChartBase64 = await svgToPngBase64(pieChartSVG, 4000, 2800); // Increase resolution
          const lineChartBase64 = await svgToPngBase64(lineChartSVG, 4000, 2800); // Increase resolution
  
          // Add high-resolution PNGs to the PDF
          doc.addImage(pieChartBase64, 'PNG', 10, 10, 180, 100); // Pie chart
          doc.addImage(lineChartBase64, 'PNG', 10, 120, 180, 100); // Line chart
  
          // Add table to the PDF using jspdf-autotable (as vector)
          doc.autoTable({
            startY: 230, // Position below the charts
            head: [['City', 'Country', 'Population']],
            body: tableData.value.map((row) => [row.city, row.country, row.population]),
          });
  
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
        tableData,
      };
    },
  };
  </script>
  

  