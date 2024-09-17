<template>
    <div ref="chartContainer"></div>
  </template>
  
  <script>
  import { ref, onMounted, defineExpose, nextTick } from 'vue';
  import Highcharts from 'highcharts';
  
  export default {
    name: 'BaseChart',
    props: {
      options: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const chartContainer = ref(null);
      const chartInstance = ref(null);
  
      onMounted(() => {
        nextTick(() => {
          chartInstance.value = Highcharts.chart(chartContainer.value, props.options);
  
          // Emit an event to notify the parent component that the chart is ready
          emit('chart-ready', chartInstance.value);
        });
      });
  
      defineExpose({
        chartInstance,
      });
  
      return {
        chartContainer,
      };
    },
  };
  </script>
  