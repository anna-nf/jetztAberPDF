<template>
    <BaseChart :options="pieChartOptions" />
  </template>
  
  <script>
  import BaseChart from './BaseChart.vue';
  
  export default {
    name: 'PieChartComponent',
    components: {
      BaseChart,
    },
    setup() {
      const pieChartOptions = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Browser Market Shares in 2023',
        },
        series: [
          {
            name: 'Browsers',
            colorByPoint: true,
            data: [
              { name: 'Chrome', y: 61.41 },
              { name: 'Internet Explorer', y: 11.84 },
              { name: 'Firefox', y: 10.85 },
              { name: 'Edge', y: 4.67 },
              { name: 'Safari', y: 4.18 },
              { name: 'Other', y: 7.05 },
            ],
          },
        ],
      };
  
      return {
        pieChartOptions,
      };
    },
  };
  </script>
  