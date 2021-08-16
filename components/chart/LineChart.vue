
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    propOptions: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.renderChart(this.chartData, this.propOptions)
  },

  watch: {
    chartData () {
      this.renderChart(this.chartData, this.propOptions)
    }
  }
}
</script>