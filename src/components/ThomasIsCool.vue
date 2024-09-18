<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Thomas is Cool Component</h1>
          <h3>No jsPDF Library</h3>
        </v-col>
      </v-row>
  
      <v-row>
        <!-- Line Chart Column -->
        <v-col cols="12" md="6">
          <div ref="lineChartContainer" ></div>
        </v-col>
  
        <!-- Pie Chart Column -->
        <v-col cols="12" md="6">
          <div ref="pieChartContainer" ></div>
        </v-col>
      </v-row>
  
      <!-- Third chart that is hidden in the UI -->
      <div ref="hiddenChartContainer" class="d-none" ></div>
  
      <v-row>
        <v-col cols="12">
          <v-btn @click="exportChartsAsSVG" color="primary" class="mt-4">
            Export Charts
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Highcharts, { Chart } from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  import Accessibility from 'highcharts/modules/accessibility';

  
  Exporting(Highcharts);  
  Accessibility(Highcharts);

  let lineChartInstance = ref<Chart | null>(null);
  let pieChartInstance = ref<Chart | null>(null);
  let hiddenChartInstance = ref<Chart | null>(null); 

    // Refs to the chart containers
const lineChartContainer = ref<HTMLElement | null>(null);
  const pieChartContainer = ref<HTMLElement | null>(null);
  const hiddenChartContainer = ref<HTMLElement | null>(null);
  
  // Function to export all three charts as SVG
  function exportChartsAsSVG() {
    if (!lineChartInstance.value || !pieChartInstance.value || !hiddenChartInstance.value) {
      console.error('Chart instances are not initialized.');
      return;
    }
  
    // Get the SVG data from all three chart instances
    const lineChartSVG = lineChartInstance.value.getSVG();
    const pieChartSVG = pieChartInstance.value.getSVG();
    const hiddenChartSVG = hiddenChartInstance.value.getSVG();
  
    // Combine all three SVGs into one
    const combinedSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1800" height="800">
        <g transform="translate(0, 0)">
          ${lineChartSVG}
        </g>
        <g transform="translate(600, 0)">
          ${pieChartSVG}
        </g>
        <g transform="translate(0, 400)">
          ${hiddenChartSVG}
        </g>
      </svg>
    `;
  
    // Create a blob from the combined SVG data
    const blob = new Blob([combinedSVG], { type: 'image/svg+xml;charset=utf-8' });
  
    // Generate a URL for the blob
    const url = URL.createObjectURL(blob);
  
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'charts.svg';
  
    // Append the link to the document, trigger it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  
    // Revoke the blob URL to free up resources
    URL.revokeObjectURL(url);
  }
  
  // Function to initialize the line chart
  function initLineChart() {
    // Ensure the container exists before initializing the chart
    if (lineChartContainer.value) {
      lineChartInstance.value = Highcharts.chart(lineChartContainer.value, {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Line Chart'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        series: [
          {
            name: 'Sales',
            data: [1, 3, 2, 5, 4]
          }
        ]
      });
    }
  }
  
  // Function to initialize the pie chart
  function initPieChart() {
    if (pieChartContainer.value) {
      pieChartInstance.value = Highcharts.chart(pieChartContainer.value, {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Pie Chart'
        },
        series: [
          { 
            name: 'Share',
            colorByPoint: true,
            data: [
              { name: 'Category A', y: 40 },
              { name: 'Category B', y: 30 },
              { name: 'Category C', y: 20 },
              { name: 'Category D', y: 10 }
            ]
          }
        ]
      });
    }
  }
  
  // Function to initialize the hidden chart 
  function initHiddenChart() {
    if (hiddenChartContainer.value) {
      hiddenChartInstance.value = Highcharts.chart(hiddenChartContainer.value, {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Hidden Chart (Bar Chart)'
        },
        xAxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        series: [
          {
            name: 'Revenue',
            data: [150, 200, 250, 300]
          }
        ]
      });
    }
  }
  
  // Initialize all charts when the component is mounted
  onMounted(() => {
    initLineChart();
    initPieChart();
    initHiddenChart();
  });
  </script>
  

  