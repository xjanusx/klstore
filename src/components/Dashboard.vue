<template>
  <v-layout>
    <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-toolbar flat class="mb-3">
          <v-toolbar-title>
            Statistiques
          </v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex xs3 ma-2>
        <v-card :hover=true :ripple=true>
          <v-card-text>Répartition du nombre de commandes par Client</v-card-text>
          <pie-chart></pie-chart>
        </v-card>
      </v-flex>
      <v-flex xs3 ma-2>
        <v-card :hover=true :ripple=true>
          <v-card-text>Commandes par Types et Quantités demandés</v-card-text>
          <polar-chart></polar-chart>
        </v-card>
      </v-flex>
      <v-flex xs3 ma-2>
        <v-card :hover=true :ripple=true>
          <v-card-text></v-card-text>
          <bar-chart></bar-chart>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 height="100px" class="mt-3">
        <v-card :hover=true :ripple=true>
          <!-- <v-card-text>Evolution du chiffre d'affaires en M. F CFA par période (2017)</v-card-text> -->
          <line-chart :height="50" :options="{responsive:false}"></line-chart>
        </v-card>
      </v-flex>
  </v-layout>
  </v-container>
  </v-layout>
</template>


<script>
import BarChart from '../charts/BarChart.js'
import LineChart from '../charts/LineChart.js'
import PieChart from '../charts/PieChart.js'
import PolarChart from '../charts/PolarChart.js'
export default {
  data () {
    return {
    }
  },
  components: {
    BarChart,
    LineChart,
    PieChart,
    PolarChart
  }
}
</script>
