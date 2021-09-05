<template>
  <div>
  <p class="text-center" style="color: #4FC3F7;"><span class="contrast-txt-color">メイン関数: </span>{{ getTitleOption(firstAB.a, firstAB.b) }}</p>

    <v-expand-transition>
      <v-form>
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
              <v-btn color="pink lighten-2" small outlined @click.stop="clearFunction()">リセット</v-btn>
            </v-row>
          </v-col>
        </v-row>

        <!-- ダイアログ -->
        <v-dialog v-model="dialog" max-width="50%">
          <v-card>
            <v-tabs grow icons-and-text color="contrast">
              <v-tabs-slider></v-tabs-slider>

              <!-- １つ目のタブ -->
              <v-tab>
                追加の関数を実行
                <v-icon>mdi-function-variant</v-icon>
              </v-tab>

              <v-tab-item>
                <v-card>
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
                    <v-btn color="red" text @click="dialog = false">閉じる</v-btn>
                    <v-btn color="cyan" text @click.stop="addFunction()">実行</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>

              <!-- 2つめのタブ -->
              <v-tab>
                X・Y座標から関数を生成
                <v-icon>mdi-map-marker-plus-outline</v-icon>
              </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="8" v-for="(xy, i) in xyList" :key="i">
                          <v-row>
                            <v-col cols="6"><v-text-field label="X座標" v-model="xy.x" required></v-text-field></v-col>
                            <v-col cols="6"><v-text-field label="Y座標" v-model="xy.y" required></v-text-field></v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="4">
                          <v-row align="start">
                            <v-col cols="12">
                            <v-radio-group dark row v-model="intersectCondition" class="mt-0">
                              <v-radio label="平行" value="parallel" class="mt-5" style="transform: scale(0.8)" />
                              <v-radio label="直交" value="orthogonal" class="mt-5" style="transform: scale(0.8)" />
                            </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog = false">閉じる</v-btn>
                    <v-btn color="cyan" text @click.stop="createFunction()">関数生成</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>

              <!-- 3つめのタブ -->
              <v-tab>
                2点の座標の中点を直交して通る関数を生成
                <v-icon>mdi-shuffle</v-icon>
              </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" v-for="(xy, i) in twoCoordinates" :key="i"> <!-- 2点の座標 -->
                          <v-row>
                            <v-col cols="2" align-self="center"><p>{{ i + 1 }}点目</p></v-col>
                            <v-col cols="5"><v-text-field label="X座標" v-model="xy.x" required></v-text-field></v-col>
                            <v-col cols="5"><v-text-field label="Y座標" v-model="xy.y" required></v-text-field></v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row><v-col cols="12" class="d-flex justify-center"><span>2点座標をメイン関数に置き換えます</span></v-col></v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog = false">閉じる</v-btn>
                    <v-btn color="cyan" text @click.stop="createFunctionByTwoCoord()">関数生成</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>

            </v-tabs>
          </v-card>
        </v-dialog>
      </v-form>
    </v-expand-transition>

    <LineChart :options="chartOptions" :chartData="chartdata" />
  </div>
</template>

<script>
import LineChart from '../chart/LineChart.vue'
import * as CalcHelperForGraph from '../../sub/helper/calc/CalcHelperForGraph'
import * as ArrayUtil from '../../sub/util/ArrayUtil'
import * as NumberUtil from '../../sub/util/NumberUtil'
import { COLORSTACK } from '../../sub/config/Constant'

export default {
  components: {
    LineChart
  },

  props: {
    propOptions: {
      type: Object,
      required: true
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

      xyList: [
        {x: 0, y: 0}
      ],

      twoCoordinates: [
        {x: 0, y: 0},
        {x: 0, y: 0},
      ],

      intersectCondition: 'parallel',

      dialog: false,
      ticksWidthCaution: 'X, Y軸の幅が均等でないと、直交条件を視覚的に判断することができなくなります。'
    }
  },

  computed: {
    getChartOptions() {
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
      return (Math.round(firstA * secondA) == -1)
    },

    clearFunction() {
      this.firstAB.a = 3
      this.firstAB.b = -24
      this.minX = -5
      this.maxX = 40
      this.step = 1
      this.additionalFuncList = [{a: 0, b:0}]
      this.xyList.x = 0
      this.xyList.y = 0
      this.executeFunction()
    },

    createFunction() {
      this.xyList.map(xyObj => {
        const x = Number(xyObj.x)
        const y = Number(xyObj.y)

        const a = this.intersectCondition === 'parallel'
          ? this.firstAB.a
          : NumberUtil.orgTrunc((-1 / this.firstAB.a), 1) // 直交条件 a1 * a2 = -1 による

        const b =  NumberUtil.orgTrunc(((a * x) * -1), 1) + y // y = ax + b に代入 小数点第一位で

        console.log(`a: ${a}, b: ${b}`)
        this.executeFunction([{a, b}])
      })
      this.dialog = false
    },

    createFunctionByTwoCoord() { // 2点を通る直線の方程式
      // 2点の座標から傾きを求める a = yの変化量 / xの変化量
      const [firstXY, secondXY] = this.twoCoordinates.map(coord => ({x: Number(coord.x), y: Number(coord.y)}))

      const a = NumberUtil.orgTrunc((firstXY.y - secondXY.y) / (firstXY.x - secondXY.x), 1)
      // y = ax + b に代入 小数点第一位で
      const b = NumberUtil.orgTrunc(a * firstXY.x, 1) + firstXY.y
      console.log(`a: ${a}, b: ${b}`)

      // 線分の中点
      const cx = (firstXY.x + secondXY.x) / 2
      const cy = (firstXY.y + secondXY.y) / 2

      const intersectedA = NumberUtil.orgTrunc((-1 / a), 1) // 線分に直交する直線の傾き
      const intersectedB = cy - NumberUtil.orgTrunc(a * cx, 1)  // 線分に直交する直線の切片: cy- a(cx) = b
      console.log(`ia: ${intersectedA}, ib: ${intersectedB}`)


      this.firstAB.a = a
      this.firstAB.b = b
      this.executeFunction([
        {a: intersectedA, b: intersectedB}
      ])

      this.dialog = false
    },

  }
}
</script>