import * as NumberUtil from '../util/NumberUtil'

export class Circle {
  constructor(ctx, strokeStyle, fillStyle, degree, radius) {
    this.ctx = ctx
    this.strokeStyle = strokeStyle
    this.fillStyle = fillStyle
    this.degree = degree
    this.radius = radius
  }

  draw(canvasWidth, canvasHeight, centerX, centerY, distanceFromCenter) {
    console.log('start')
    let x = centerX
    let y = centerY
    let degree = 1
    let radian = 0

    this.ctx.strokeStyle = this.strokeStyle
    this.ctx.fillStyle = this.fillStyle

    const loop = () => {
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      radian += NumberUtil.radian(degree)

      x = distanceFromCenter * Math.cos(radian) + centerX
      y = distanceFromCenter * Math.sin(radian) + centerY

      this.ctx.beginPath()
      this.ctx.arc(x, y, this.radius, 0, Math.PI * 2)
      this.ctx.fill()

      this.loopId = window.requestAnimationFrame(loop)
    }

    return loop()
  }

  stopDraw() {
    console.log(this.loopId)
    window.cancelAnimationFrame(this.loopId)
  }
}