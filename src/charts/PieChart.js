import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['M. Didier', 'Togocel', 'BOA Togo', 'Moov Togo', 'Togo Telecom'],
      datasets: [
        {
          label: 'Répartition du nombre de commandes par Client',
          backgroundColor: [
            // 5 colors
            '#0099ff', // blue
            '#cc66ff', // purple
            '#ffff00', // yellow
            '#ff0000', // red
            '#ffc0cb' // pink
          ],
          data: [40, 39, 20, 12, 11]
        }
      ],
      options: {
        legend: {
          position: 'right',
          //   display: false,
          labels: {
            fontSize: 10,
            boxWidth: 30
          }
        }
      }
    })
  },
  name: 'pie-chart'
}
