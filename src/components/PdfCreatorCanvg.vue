<template>
    <v-container>
        <h2 class="text-red">pdf Creator mit Canvg:</h2>
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
          <highcharts
            :options="chartOptions"
            ref="lineChart"
          ></highcharts>
  
          <!-- Pie Chart -->
          <highcharts
            :options="pieChartOptions"
            ref="pieChart"
          ></highcharts>
  
          <v-btn color="primary" @click="openPDFInNewTab">
            PDF In Neuem Tab Öffnen
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref} from 'vue';
  import { jsPDF } from 'jspdf';
  import { Canvg } from 'canvg'; 
  import HighchartsVue from 'highcharts-vue';
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  import { chartData } from '../data/chartData'; 
  import { pieChartData } from '../data/pieChartData'; 
  
  Exporting(Highcharts);
  
  export default {
    components: {
      highcharts: HighchartsVue.component
    },
    setup() {
      const pdfTitle = ref('');
      const pdfContent = ref('');
      const lineChart = ref(null);
      const pieChart = ref(null);
  
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
  
      const pieChartOptions = ref({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Browser Marktanteile 2023'
        },
        series: pieChartData.series
      });
  
      const openPDFInNewTab = async () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(pdfTitle.value, 10, 10);
        doc.setFontSize(12);
        doc.text(pdfContent.value, 10, 30);
  
        await addChartToPDF(lineChart.value.chart.getSVG(), 10, 50, 180, 80, doc);
        await addChartToPDF(pieChart.value.chart.getSVG(), 10, 150, 150, 80, doc);
  
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      };
  
      const addChartToPDF = async (svg, x, y, width, height, doc) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const v = Canvg.fromString(ctx, svg);
        v.start();
  
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for rendering to complete
  
        const imageUrl = canvas.toDataURL('image/png');
        doc.addImage(imageUrl, 'PNG', x, y, width, height);
      };
  
      return {
        pdfTitle,
        pdfContent,
        chartOptions,
        pieChartOptions,
        openPDFInNewTab,
        lineChart,
        pieChart
      };
    }
  };
  </script>
  