import { PolarArea, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: PolarArea,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Sac Papier', 'Porte Clés', 'Panier Ramadan', 'Verres à Vin', 'Paquet St Valentin', 'Horloges Murales', 'Stylos', 'Casquettes'],
      datasets: [
        {
          label: 'Evolution des types de commandes par période',
          backgroundColor: [
            // 5 colors
            '#0a99cf', // blue
            '#cc66ff', // purple
            '#ffff00', // yellow
            '#1fdf00', // yellow
            '#afffcc', // yellow
            '#0ccdfd', // yellow
            '#ff0000', // red
            '#ffc0cb' // pink
          ],
          data: [400, 230, 125, 390, 1410, 200, 1200, 1000]
        }
      ]
    })
  },
  name: 'polar-chart'
}
