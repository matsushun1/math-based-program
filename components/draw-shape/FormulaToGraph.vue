
<template>
  <div>
    <!-- <component :is="currentComponentName" :propOptions="chartOptions" /> -->
    <p class="text-center" style="color: #4FC3F7;">{{ getTitleOption() }}</p>
    <BarChart v-if="currentComponentName === 'BarChart'" :propOptions="getChartOptions" />
    <v-expand-transition>
      <v-form v-show="currentComponentName === 'LineChart'">
        <v-row>
          <v-col cols="2">
            <v-text-field v-model="a" label="関数: a" />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="minX" label="x範囲最小値" />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="maxX" label="x範囲最大値" />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="step" label="x範囲ステップ値" />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="b" label="関数: b" />
          </v-col>
          <v-col cols="2" align-self="center">
            <v-row justify="end">
              <v-btn color="primary" @click.stop="executeFunction()">関数実行</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-expand-transition>
    <div v-if="currentComponentName === 'LineChart'">
      <LineChart :options="chartOptions" :chartData="chartdata" />
    </div>
  </div>
</template>

<script>
import BarChart from '../chart/BarChart.vue'
import LineChart from '../chart/LineChart.vue'
import * as CalcHelperForGraph from '../../sub/helper/calc/CalcHelperForGraph'
import * as ArrayUtil from '../../sub/util/ArrayUtil'
import { COLORSTACK } from '../../sub/config/Constant'

export default {
  components: {
    BarChart,
    LineChart
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
        scales: {
          xAxes: [{
            gridLines: {color: '#BDBDBD', lineWidth: 0.5, zeroLineColor: 'contrast'},
            ticks: {max: 10, min: -5, stepSize: 1}
          }],
          yAxes: [{
            gridLines: {color: '#BDBDBD', lineWidth: 0.5, zeroLineColor: 'contrast'},
            ticks: {max: 5, min: -5, stepSize: 1}
          }]
        }
      },

      chartdata: {},
      a: 3,
      minX: 1,
      maxX: 10,
      step: 1,
      b: -24
    }
  },

  computed: {
    getChartOptions() {
      if (this.currentComponentName === 'BarChart') return this.chartOptions
      return this.chartOptions
    }
  },

  created() {
    this.executeFunction()
  },

  methods: {
    executeFunction() {
      const numberRange = ArrayUtil.getNumberRange(this.minX, this.maxX, this.step)

      const y = CalcHelperForGraph.linearFunction(this.a, numberRange, this.b)
      const colors = y.map((_, i) => COLORSTACK[i % COLORSTACK.length])
      const datasets = [{label: ['Data one'], pointBackgroundColor: colors, borderColor: 'info', borderWidth: 1, data: y, fill: false}]
      console.log(y)
      this.chartdata = {
        labels: numberRange,
        datasets
      }

    },
    getTitleOption() {
      return `y = ${this.a}x + (${this.b})`
    }

  }
}
</script>
