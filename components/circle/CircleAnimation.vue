<template>
  <div>
    <v-card height="100%">
      <v-row>
        <v-col cols="6" offset="3">
          <canvas :width="canvasWidth" :height="canvasHeight" ref="canvas"></canvas>
        </v-col>
      </v-row>
      <v-card-actions>
        <span></span>
        <v-btn color="contrast" outlined small @click.stop="dialog = true">作成</v-btn>
        <v-btn color="cyan" outlined small @click.stop="drawCircle()">描画</v-btn>
        <v-btn color="pink" outlined small @click.stop="stopDraw()">停止</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title>新規作成</v-card-title>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-dialog>
    <div>

    </div>
  </div>
</template>

<script>
import {Circle} from '../../sub/class/Circle'

export default {
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 500,
      canvas: null,
      loopId: null,

      circleList: [],

      dialog: false,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.canvas = this.$refs.canvas
    })
  },

  methods: {
    drawCircle() { // TODO: 指定した円を操作できるように調整する
      const circleA = new Circle(this.canvas.getContext('2d'), 'cyan', 'cyan', 1, 5)
      this.circleList.push(circleA)
      this.circleList[0].draw(this.canvasWidth, this.canvasHeight, this.canvasWidth * 0.5, this.canvasHeight * 0.5, 100)
    },

    stopDraw() {
      this.circleList[0].stopDraw()
    }

  }
}
</script>

<style lang="scss">

</style>