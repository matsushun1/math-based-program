<template>
  <div>
    <v-card height="100%">
      <v-row>
        <v-col cols="6">
          <v-layout justify-center>
            <canvas :width="canvasWidth" :height="canvasHeight" style="border: 1px solid; border-color: grey;" ref="canvas" />
          </v-layout>
        </v-col>
        <v-col cols="6">
          <v-layout justify-center>
            <v-tooltip top :disabled="disableTooltipForTri">
              <template v-slot:activator="{on, attrs}">
                <canvas :width="canvasWidth" :height="canvasHeight" v-bind="attrs" v-on="on" style="border: 1px solid; border-color: grey;" ref="triangle" />
              </template>
              <span>{{ showDegree }}</span>
            </v-tooltip>
          </v-layout>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan" outlined small @click.stop="drawTriangle()"><v-icon>mdi-vector-triangle</v-icon></v-btn>
        <v-btn color="cyan" outlined small @click.stop="drawCircle()"><v-icon>mdi-play</v-icon></v-btn>
        <v-btn color="pink" outlined small @click.stop="stopDraw()"><v-icon>mdi-stop</v-icon></v-btn>
        <v-btn color="contrast" outlined small @click.stop="openCircleOpts()"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="50%">
      <v-form v-model="valid" ref="form" lazy-validation>
      <v-card>
        <v-card-title>新規作成 (座標は1-500まで)</v-card-title>
        <v-card-text>
          <v-row v-for="(xy, i) in triangleList" :key="i">
            <v-col cols="1">
              <p>{{ getTitleForTri(i) }}</p>
            </v-col>
            <v-col cols="5">
              <v-text-field label="x座標" v-model="xy.x" :rules="triRules"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field label="y座標" v-model="xy.y"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cyan" class="mr-2" small outlined @click.stop="drawTriangle()" :disabled="!valid">三角形作成</v-btn>
          <v-btn color="red" small outlined @click.stop="closeCircleOpts()">閉じる</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
    <div>

    </div>
  </div>
</template>

<script>
import {Circle} from '../../sub/class/Circle'
import * as Util from '../../sub/util/Util'
import * as NumberUtil from '../../sub/util/NumberUtil'

export default {
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 500,
      canvas: null,
      loopId: null,

      canvasTriangle: null,

      circleList: [],

      triangleList: [],
      min: 1,
      max: 500,
      valid: true,
      triangleDrawn: false,

      dialog: false,
    }
  },

  created() {
    for(let i = 0; i < 3; i++) {
      this.triangleList.push({x: 1, y: 1})
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.canvas = this.$refs.canvas
      this.canvasTriangle = this.$refs.triangle
    })
  },

  computed: {
    triRules() {
      const rules = []
      if (this.min && this.max) {
        const minMaxRule = [
          v => (v && v <= this.max) || `最大値は${this.max}です`,
          v => (v && v >= this.min) || `最小値は${this.min}です`
        ]
        rules.push(...minMaxRule)
      }
      return rules
    },

    disableTooltipForTri() {
      return !this.triangleDrawn
    },

    showDegree() {
      return this.triangleDrawn ? `tanθ（度数法）: ${this.getDegreesOfTri()}` : ''
    }
  },

  methods: {
    drawCircle() { // TODO: 指定した円を操作できるように調整する
      const circleA = new Circle(this.canvas.getContext('2d'), 'cyan', 'cyan', 1, 5)
      this.circleList.push(circleA)
      this.circleList[0].draw(this.canvasWidth, this.canvasHeight, this.canvasWidth * 0.5, this.canvasHeight * 0.5, 100)
    },

    stopDraw() {
      this.circleList[0].stopDraw()
    },

    openCircleOpts() {
      this.dialog = true
    },

    closeCircleOpts() {
      this.dialog = false
    },

    drawTriangle() {
      this.dialog = false
      const formattedTriList = this.triangleList.map(xy => {
        return Util.mapObject(
          xy,
          ([key, val]) => [key, Number(val)]
        )
      })
      const ctx = this.canvasTriangle.getContext('2d')
      // TODO: 三角形をクラス化する
      ctx.beginPath()
      formattedTriList.forEach((xy, i) => {
        i == 0
          ? ctx.moveTo(xy.x, xy.y)
          : ctx.lineTo(xy.x, xy.y)
      })
      ctx.closePath()

      ctx.strokeStyle = 'cyan'
      ctx.stroke()
      ctx.fillStyle = 'cyan'
      formattedTriList.forEach((xy, i) => {
        const text = `(${xy.x}, ${xy.y})`
        const textCoordX = i == 0
          ? xy.x - 60
          : xy.x + 10
        ctx.fillText(text, textCoordX, xy.y)
      })

      this.triangleDrawn = true
    },

    getTitleForTri(index) {
      return index == 0 ? '起点' : `${index + 1}点目`
    },

    getDegreesOfTri() {
      const strokeStart = this.triangleList[0]
      const strokeEnd = this.triangleList[2]

      const diffX = Math.abs(strokeEnd.x - strokeStart.x)
      const diffY = Math.abs(strokeEnd.y - strokeStart.y)
      return NumberUtil.calcAngleDegrees(diffX, diffY)
    }

  }
}
</script>

<style lang="scss">

</style>