<template>
  <div>
    <v-card height="100%">
      <v-row>
        <v-col cols="6" offset="3">
          <canvas :width="canvasWidth" :height="canvasHeight" ref="canvas"></canvas>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn @click.stop="drawCircle()">描画</v-btn>
        <v-btn @click.stop="stopDraw()">停止</v-btn>
      </v-card-actions>
    </v-card>
    <div>

    </div>
  </div>
</template>

<script>
import * as NumberUtil from '../../sub/util/NumberUtil'

export default {
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 500,
      canvas: null,
      loopId: null,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.canvas = this.$refs.canvas
    })
  },

  methods: {
    drawCircle() {
      const ctx = this.canvas.getContext('2d')

      const centerX = this.canvasWidth * 0.5
      const centerY = this.canvasHeight * 0.5
      const distanceFromCenter = 100

      const circleRadius = 20

      let x = centerX
      let y = centerY
      let angle = 1
      let radian = 0
      ctx.strokeStyle = 'white'
      ctx.fillStyle = 'white'

      const loop = () => {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        radian += NumberUtil.radian(angle)

        x = distanceFromCenter * Math.cos(radian) + centerX
        y = distanceFromCenter * Math.sin(radian) + centerY

        ctx.beginPath()
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2)
        ctx.fill()

        this.loopId =  window.requestAnimationFrame(loop)
      }

      loop()
    },

    stopDraw() {
      console.log(this.loopId)
      window.cancelAnimationFrame(this.loopId)
    }

  }
}
</script>

<style lang="scss">

</style>