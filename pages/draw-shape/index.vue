
<template>
  <v-container>
    <div><p>数学的に図形を描画する</p></div>
      <v-tabs centered icons-and-text color="contrast" background-color="transparent">
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="(tab, i) in tabs" :key="i" @click.stop="switchGraph(tab.componentName)">
          {{ tab.label }}
          <v-icon v-text="tab.icon"></v-icon>
        </v-tab>
      </v-tabs>
      <formula-to-graph :currentComponentName="componentName" class="mt-10" />
  </v-container>
</template>

<script>
import FormulaToGraph from '../../components/draw-shape/FormulaToGraph.vue'

export default {
  components: { // 図形やグラフコンポーネントを一括で管理するだけの役割に徹するため、描画のための計算は各コンポーネント内で行う
    FormulaToGraph
  },
  data() {
    return {
      tabs: [
        {label: '棒グラフ', icon: 'mdi-chart-bar-stacked', componentName: 'BarChart'},
        {label: '線グラフ', icon: 'mdi-chart-bell-curve', componentName: 'LineChart'},
        {label: '図形', icon: 'mdi-chart-bell-curve', componentName: 'LineChart'},
      ],
      componentName: '',
    }
  },

  created() {
    this.componentName = this.tabs[0].componentName
  },

  methods: {
    switchGraph(componentName) {
      this.componentName = componentName
    }
  },
}
</script>