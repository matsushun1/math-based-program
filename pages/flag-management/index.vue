
<template>
  <v-container>
      <div>
        <p>フラグによる状態管理</p>
      </div>
      <v-row>
        <!-- 画面左側 -->
        <v-col cols="6">
          <v-data-table class="pa-2"
            dense
            :headers="headers"
            :items="equipFlgs"
            :show-group-by="true"
          >
            <template v-slot:item.shouldEquip="{ item }"> <!-- eslintに引っかかっているが無視 -->
              <v-switch @click.stop="equipItem(item.radix10)" />
            </template>
          </v-data-table>
        </v-col>

        <!-- 画面右側 -->
          <v-col cols="2" align-self="center">
            <v-row>
              <v-icon class="pt-2" style="font-size: 120px;">mdi-human-handsdown </v-icon>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-card tile>
              <v-list disabled>
                <v-subheader>現在の状態</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(item, i) in equipFlgs" :key="i">
                    <v-list-item-content>
                      <v-list-item-icon>
                        <v-icon v-text="item.icon" :color="showColorIfEquipped(item)" />
                      </v-list-item-icon>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

      </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {text: '内容', align: 'start', sortable: true, value: 'flgContent'},
        {text: '10進数', sortable: true, value: 'radix10'},
        {text: '2進数', sortable: true, value: 'radix2'},
        {text: '無効 / 有効', sortable: false, value: 'shouldEquip'},
      ],
      equipFlgs: [
        {flgContent: '硬貨を持っている', radix10: 1, radix2: '00000001', icon: 'mdi-bitcoin'},
        {flgContent: '剣を装備している', radix10: 2, radix2: '00000010', icon: 'mdi-sword'},
        {flgContent: '盾を装備している', radix10: 4, radix2: '00000100', icon: 'mdi-shield-half-full'},
        {flgContent: '鎧を装備している', radix10: 8, radix2: '00001000', icon: 'mdi-football-helmet'}
      ],
      equipFlag: 0,
    }
  },

  computed: {
    showColorIfEquipped() {
      return (item) => (this.equipFlag & item.radix10) ? 'white' : 'grey'
    }
  },

  methods: {
    equipItem(itemRadix10) {
      const itemAleadyEquipped = (itemRadix10 & this.equipFlag) // AND（マスクをかけて、選択した状態を取り出す）
      if (itemAleadyEquipped == itemRadix10) {
        this.equipFlag &= ~itemAleadyEquipped // 選択した状態を解除する。1.選択した状態を反転 2.既存の累積状態とAND計算を行う
      } else {
        this.equipFlag |= itemRadix10 // 選択した状態を新たに加える。OR（いずれかが1なら1をセットする）
      }
    }
  }
}
</script>