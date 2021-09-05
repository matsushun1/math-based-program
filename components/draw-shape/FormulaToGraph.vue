
<template>
  <div>
    <!-- <component :is="currentComponentName" :propOptions="chartOptions" /> -->
    <BarChart v-if="currentComponentName === 'BarChart'" :propOptions="getChartOptions" />
    <formula-to-line-chart v-if="currentComponentName === 'LineChart'" :propOptions="getChartOptions" />
  </div>
</template>

<script>
import BarChart from '../chart/BarChart.vue'
import FormulaToLineChart from '../chart/FormulaToLineChart.vue'

export default {
  components: {
    BarChart,
    FormulaToLineChart
  },

  props: {
    currentComponentName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {fontColor: '#4FC3F7'}
        },
        scales: {
          xAxes: [{
            gridLines: {color: '#BDBDBD', lineWidth: 0.5, zeroLineColor: 'contrast',  tickMarkLength: 10},
            ticks: {suggestedMax: 10, suggestedMin: -10, stepSize: 1}
          }],
          yAxes: [{
            gridLines: {color: '#BDBDBD', lineWidth: 0.5, zeroLineColor: 'contrast'},
            ticks: {max: 10, min: -5, stepSize: 1}
          }]
        }
      },
    }
  },

  computed: {
    getChartOptions() {
      return this.chartOptions
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables.scss';

</style>
