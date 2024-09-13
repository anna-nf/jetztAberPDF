<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="pdfTitle"
            label="PDF Titel"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="pdfContent"
            label="PDF Inhalt"
            rows="5"
            outlined
          ></v-textarea>
          <!-- Line Chart -->
          <div ref="chartContainer">
            <highcharts :options="chartOptions"></highcharts>
          </div>
  
          <!-- Pie Chart -->
          <div ref="pieChartContainer" class="mt-5">
            <highcharts :options="pieChartOptions"></highcharts>
          </div>
  
          <v-btn color="primary" @click="openPDFInNewTab">
            PDF In Neuem Tab Öffnen
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  import HighchartsVue from 'highcharts-vue';
  import Highcharts from 'highcharts';
  import { chartData } from '../data/chartData'; 
  import { pieChartData } from '../data/pieChartData'; 
  
  export default {
    components: {
      highcharts: HighchartsVue.component
    },
    setup() {
      const pdfTitle = ref('');
      const pdfContent = ref('');
      const chartContainer = ref(null);
      const pieChartContainer = ref(null);
  
      // Line-Chart-Optionen
      const chartOptions = ref({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Temperaturvergleich 2023'
        },
        xAxis: {
          categories: chartData.categories
        },
        yAxis: {
          title: {
            text: 'Temperatur (°C)'
          }
        },
        series: chartData.series
      });
  
      // Pie-Chart-Optionen
      const pieChartOptions = ref({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Browser Marktanteile 2023'
        },
        series: pieChartData.series
      });
  
      const openPDFInNewTab = () => {
        const doc = new jsPDF();
  
        // Setze den Titel und den Inhalt des PDFs
        doc.setFontSize(18);
        doc.text(pdfTitle.value, 10, 10);
        doc.setFontSize(12);
        doc.text(pdfContent.value, 10, 30);
  
        // Konvertiere den Line-Chart in ein Bild und füge es in das PDF ein
        html2canvas(chartContainer.value).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 10, 50, 180, 80); 
  
          // Konvertiere den Pie-Chart in ein Bild und füge es in das PDF ein
          html2canvas(pieChartContainer.value).then((pieCanvas) => {
            const pieImgData = pieCanvas.toDataURL('image/png');
            doc.addImage(pieImgData, 'PNG', 10, 150, 150, 80); 
  
            // Generiere das PDF als Blob und öffne es in einem neuen Tab
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank'); 
          });
        });
      };
  
      return {
        pdfTitle,
        pdfContent,
        chartOptions,
        pieChartOptions,
        chartContainer,
        pieChartContainer,
        openPDFInNewTab
      };
    }
  };
  </script>
  

  