
<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    propLabels: {
      type: Array,
      default: () => ['1', '2']
    },
    propDataSets: {
      type: Array,
      default: () => [
        {label: ['Data one'], backgroundColor: '#4FC3F7', data: [40, 30]}
      ]
    },
    propOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartdata: {
        labels: this.propLabels,
        datasets: this.propDataSets
      },
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.propOptions)
  }
}
</script>
