import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  options: {
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Evolution du Chiffre d\'affaires par Période (M de F CFA)',
          backgroundColor: '#f87979',
          data: [12, 6, 8, 9, 7, 12, 9, 8, 4, 2, 1, 11]
        }
      ],
      options: this.options
    })
  },
  name: 'line-chart'
}
