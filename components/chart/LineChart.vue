
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
    'chartData': {
      handler: (newValue) => {
        console.log(newValue)
        this.$data._chart.destroy()
        this.renderChart(newValue, this.propOptions)
      }
    }
  }
}
</script>