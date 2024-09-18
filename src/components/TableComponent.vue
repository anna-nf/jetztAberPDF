<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>City Data</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'TableComponent',
    props: {
      tableData: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        headers: [
          { text: 'City', value: 'city' },
          { text: 'Country', value: 'country' },
          { text: 'Population', value: 'population' },
        ],
      };
    },
    computed: {
      items() {
        return this.tableData;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any table-specific styling if needed */
  </style>
  