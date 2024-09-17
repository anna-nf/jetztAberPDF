<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <highcharts :options="lineChartOptions" ref="lineChart"></highcharts>
      </v-col>
      <v-col cols="12">
        <highcharts :options="pieChartOptions" ref="pieChart"></highcharts>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="generatePDF">Generate PDF</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

// Initialize exporting module
Exporting(Highcharts);

export default defineComponent({
  components: {
    highcharts: HighchartsVue.component
  },
  setup() {
    const items = ref([
      { id: 1, name: 'Apple', quantity: 30, price: '$1.00' },
      { id: 2, name: 'Banana', quantity: 25, price: '$1.50' },
      { id: 3, name: 'Cherry', quantity: 45, price: '$3.00' }
    ]);
    const lineChartOptions = ref({
      series: [{
        data: [1, 2, 3, 4, 5, 6],
        type: 'line'
      }]
    });
    const pieChartOptions = ref({
      series: [{
        data: [
          ['Apples', 8],
          ['Bananas', 12],
          ['Cherries', 5]
        ],
        type: 'pie'
      }]
    });

    const generatePDF = async () => {
      const doc = new jsPDF();
      doc.text("Sales Data", 10, 10);
      autoTable(doc, {
        head: [['Item', 'Quantity', 'Price']],
        body: items.value.map(item => [item.name, item.quantity, item.price]),
        startY: 20
      });
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    };

    return { items, lineChartOptions, pieChartOptions, generatePDF };
  }
});
</script>

<style scoped>
</style>
