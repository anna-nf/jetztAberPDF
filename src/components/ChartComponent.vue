<template>
    <div>
      <highcharts :options="chartOptions"></highcharts>
      <h4>Hallo ChartComponent</h4>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
         sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
           sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum 
           dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
           tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import HighchartsVue from 'highcharts-vue';
  import Highcharts from 'highcharts';
  
  export default defineComponent({
    components: {
      highcharts: HighchartsVue.component
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Mein erstes Chart'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
          },
          yAxis: {
            title: {
              text: 'Temperatur (°C)'
            }
          },
          series: [{
            name: 'Koh Tao',
            data: [28, 29, 30, 31, 32, 32, 31, 31, 30, 29, 29, 28]
          }, {
            name: 'Hamburg',
            data: [0, 1, 4, 9, 14, 18, 20, 20, 15, 10, 6, 3]
          }]
        }
      };
    }
  });
  </script>