
<template>
  <div>
    <!-- <component :is="currentComponentName" :propOptions="chartOptions" /> -->
    <p class="text-center" style="color: #4FC3F7;"><span class="contrast-txt-color">メイン関数: </span>{{ getTitleOption(firstAB.a, firstAB.b) }}</p>
    <BarChart v-if="currentComponentName === 'BarChart'" :propOptions="getChartOptions" />
    <v-expand-transition>
      <v-form v-show="currentComponentName === 'LineChart'">
        <v-row>
          <v-col cols="2">
            <v-text-field v-model="firstAB.a" label="関数: a" />
          </v-col>
          <v-col cols="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="minX" label="x範囲最小値" v-on="on" v-bind="attrs" />
              </template>
              <span>{{ ticksWidthCaution }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="maxX" label="x範囲最大値" v-on="on" v-bind="attrs" />
              </template>
              <span>{{ ticksWidthCaution }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="step" label="x範囲ステップ値" v-on="on" v-bind="attrs" />
              </template>
              <span>{{ ticksWidthCaution }}</span>
            </v-tooltip>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="firstAB.b" label="関数: b" />
          </v-col>
          <v-col cols="2" align-self="start">
            <v-row class="mb-1">
              <v-btn color="contrast" small outlined @click.stop="openOptionModal()">オプション<v-icon class="pl-2" small>mdi-dock-window</v-icon></v-btn>
            </v-row>
            <v-row>
              <v-btn color="cyan" class="mr-2" small outlined @click.stop="executeFunction()">実行</v-btn>
              <v-btn color="pink lighten-2" small outlined @click.stop="executeFunction()">リセット</v-btn>
            </v-row>
          </v-col>
        </v-row>

        <!-- ダイアログ -->
        <v-dialog v-model="dialog" max-width="50%">
          <v-card>
            <v-card-title><span class="text-h5">関数を追加する</span></v-card-title>
            <v-card-text>
            <v-container>
              <v-row>
                  <v-col cols="8" v-for="(func, i) in additionalFuncList" :key="i">
                    <v-row>
                      <v-col cols="6"><v-text-field label="関数: a" v-model="func.a" required></v-text-field></v-col>
                      <v-col cols="6"><v-text-field label="関数: b" v-model="func.b" required></v-text-field></v-col>
                    </v-row>
                  </v-col>
                <v-col cols="4" align-self="center">
                  <v-icon fab large @click.stop="addForm()">mdi-plus-circle-outline</v-icon>
                  <v-icon fab large @click.stop="removeForm()">mdi-minus-circle-outline</v-icon>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
          <v-btn
            color="cyan"
            text
            @click="addFunction()"
          >
            実行
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-dialog>
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

      chartdata: {},
      firstAB: {a: 3, b: -24},
      minX: -5,
      maxX: 40,
      step: 1,

      additionalFuncList: [
        {a: 0, b: 0}
      ],

      dialog: false,
      ticksWidthCaution: 'X, Y軸の幅が均等でないと、直交条件を視覚的に判断することができなくなります。'
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
    executeFunction(additionalFuncList) {
      const numberRange = ArrayUtil.getNumberRange(this.minX, this.maxX, this.step)

      const abList = additionalFuncList ? [this.firstAB, ...additionalFuncList] : [this.firstAB]
      const datasets = abList.map((abObj, i) => {
        const y = CalcHelperForGraph.linearFunction(Number(abObj.a), numberRange, Number(abObj.b))
        const colors = y.map((_, i) => COLORSTACK[i % COLORSTACK.length])

        let title = `${this.getTitleOption(abObj.a, abObj.b)}`
        if (i != 0) {
          const condition = this.isParallelCond(abObj.a, abList[0].a) ? '平行' : this.isOrthogonalCond(abObj.a, abList[0].a) ? '直交' : '平行でも直行でもない'
          title += ` | メイン関数に対して: ${condition}`
        }
        return {
          label: [title],
          pointBackgroundColor: colors,
          borderColor: 'contrast',
          borderWidth: 1,
          backgroundColor: colors[i % COLORSTACK.length],
          data: y,
          fill: false
        }
      })

      this.chartdata = {
        labels: [...numberRange],
        datasets
      }
    },

    getTitleOption(a, b) {
      return `y = ${a}x + (${b})`
    },

    openOptionModal() {
      this.dialog = true
    },

    addForm() {
      if (this.additionalFuncList.length > 5) return
      const additionalForm = {
        a: 0,
        b: 0
      }
      this.additionalFuncList.push(additionalForm)
    },

    removeForm() {
      if (this.additionalFuncList.length == 1) return
      this.additionalFuncList.pop()
    },

    addFunction() {
      this.executeFunction(this.additionalFuncList)
      this.dialog = false
    },

    isParallelCond(firstA, secondA) {
      return firstA == secondA
    },

    isOrthogonalCond(firstA, secondA) {
      console.log('firstA: ' + firstA)
      console.log('secondA: ' + secondA)
      return (firstA * secondA == -1)
    },

    showTicksWidthCaution() {

    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
</style>
