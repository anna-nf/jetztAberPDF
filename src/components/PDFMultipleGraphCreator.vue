<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <highcharts :options="pieChartOptions" ref="pieChartContainer"></highcharts>
      </v-col>
      <v-col cols="12" md="6">
        <highcharts :options="lineChartOptions" ref="lineChartContainer"></highcharts>
      </v-col>
    </v-row>
    <v-btn @click="generatePDF">Download PDF</v-btn>
  </v-container>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import Exporting from 'highcharts/modules/exporting';
import { ref, nextTick, onMounted } from 'vue';
import jsPDF from 'jspdf';

Exporting(Highcharts);

export default {
  name: 'PDFMultipleGraphCreator',
  components: {
    highcharts: HighchartsVue.component
  },
  setup() {
    const pieChartContainer = ref(null);
    const lineChartContainer = ref(null);

    let pieChartInstance = null;
    let lineChartInstance = null;

    const pieChartOptions = ref({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Browser Market Shares in 2023'
      },
      series: [{
        name: 'Browsers',
        colorByPoint: true,
        data: [
          { name: 'Chrome', y: 61.41 },
          { name: 'Internet Explorer', y: 11.84 },
          { name: 'Firefox', y: 10.85 },
          { name: 'Edge', y: 4.67 },
          { name: 'Safari', y: 4.18 },
          { name: 'Other', y: 7.05 }
        ]
      }]
    });

    const lineChartOptions = ref({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Monthly Average Temperature'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },
      series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
    });

    onMounted(() => {
      pieChartInstance = Highcharts.chart(pieChartContainer.value.$el, pieChartOptions.value);
      lineChartInstance = Highcharts.chart(lineChartContainer.value.$el, lineChartOptions.value);
    });

    // Function to convert an SVG string to base64 PNG image data with higher resolution
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
      await nextTick();

      try {
        if (!pieChartInstance || !lineChartInstance) {
          throw new Error('Chart instances are not defined.');
        }

        // Initialize jsPDF
        const doc = new jsPDF('p', 'mm', 'a4');

        // Get SVGs from both chart instances
        const pieChartSVG = pieChartInstance.getSVG();
        const lineChartSVG = lineChartInstance.getSVG();

        // Convert the SVGs to high-resolution PNG base64 (2000x1400 pixels)
        const pieChartBase64 = await svgToPngBase64(pieChartSVG, 2000, 1400);
        const lineChartBase64 = await svgToPngBase64(lineChartSVG, 2000, 1400);

        // Add the high-resolution PNG images to the PDF, scaling down to fit
        doc.addImage(pieChartBase64, 'PNG', 10, 10, 180, 100); // Pie chart
        doc.addImage(lineChartBase64, 'PNG', 10, 120, 180, 100); // Line chart

        // Save the PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

    return {
      pieChartOptions,
      lineChartOptions,
      generatePDF,
      pieChartContainer,
      lineChartContainer
    };
  }
};
</script>
